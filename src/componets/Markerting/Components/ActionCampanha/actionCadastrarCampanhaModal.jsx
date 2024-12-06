import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from '../../../Modais/HeaderModal/HeaderModal';
import { InputFieldModal } from '../../../Buttons/InputFieldModal';
import { FooterModal } from '../../../Modais/FooterModal/footerModal';
import { ButtonTypeModal } from '../../../Buttons/ButtonTypeModal';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';
import { get, post, put } from '../../../../api/funcRequest';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';
import { getDataAtual } from '../../../../utils/dataAtual';

export const ActionCadastrarCampanhaModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [descricao, setDescricao] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [percentDesconto, setPercentDesconto] = useState(0)
  const [ipUsuario, setIpUsuario] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    getIPUsuario();

  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/');
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  };


  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataInicio(dataInicial)
    setDataFim(dataFinal)

  }, [])

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    ['listaEmpresaComercial', marcaSelecionada],
    async () => {
      if (marcaSelecionada) {
        const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
        return response.data;
      } else {
        return [];
      }
    },
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);



  const onSubmit = async (data) => {
    if (!descricao || !percentDesconto || !empresaSelecionada) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Preencha os campos! Descrição e Desconto e Empresa são obrigatórios!`,
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    const postData = [{
      DSCAMPANHA: descricao,
      IDOPERADOR: usuarioLogado.id,
      DTINICIO: dataInicio,
      DTFINAL: dataFim,
      VRPERCDESCONTO: parseFloat(percentDesconto),
      EMPRESAS: empresaSelecionada,
    }];

    try {
      const response = await post('/cadastra-campanha', postData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });

      const textDados = JSON.stringify(postData);
      let textoFuncao = 'MARKETING/CADASTRO DE CLIENTE';

      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario,
      };

      const responsePost = await post('/log-web', createData);
      // handleClose();
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro ao Cadastrar Cleinte!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };



  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <HeaderModal
          title={"Atualizar Cliente"}
          subTitle={"Atualizar Cliente"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-xl-6">
                  <InputFieldModal
                    label={"Descrição da Campanha"}
                    type="text"
                    id={"dsCampanha"}
                    value={descricao}
                    onChangeModal={(e) => setDescricao(e.target.value)}
                    {...register("dsCampanha", { required: "Campo obrigatório Informe a Descrição", })}
                  />

                  {errors.dsCampanha && <span className="text-danger">{errors.dsCampanha.message}</span>}
                </div>

                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Data Início"}
                    type="date"
                    id={"dtInicio"}
                    value={dataInicio}
                    onChangeModal={(e) => setDataInicio(e.target.value)}
                    {...register("dtInicio", { required: "Campo obrigatório Informe a Data Início", })}
                  />
                  {errors.dtInicio && <span className="text-danger">{errors.dtInicio.message}</span>}
                </div>
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Data Fim"}
                    type="date"
                    id={"dtFim"}
                    value={dataFim}
                    onChangeModal={(e) => setDataFim(e.target.value)}
                    {...register("dtFim", { required: "Campo obrigatório Informe a Data Fim", })}
                  />
                  {errors.dtFim && <span className="text-danger">{errors.dtFim.message}</span>}
                </div>

              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6 col-xl-6">
                <label className="form-label" htmlFor={""}>Por Marca</label>
                <Select
                  closeMenuOnSelect={false}
                  options={optionsMarcas.map((item) => ({
                    value: item.IDGRUPOEMPRESARIAL,
                    label: item.GRUPOEMPRESARIAL
                  }
                  ))}
                  value={optionsMarcas.find(option => option.value === marcaSelecionada)}
                  onChange={(e) => setMarcaSelecionada(e.value)}
                />
              </div>
              <div className="col-sm-6 col-xl-6">
                <label className="form-label" htmlFor={""}>Por Empresa</label>
                <Select
                  closeMenuOnSelect={false}
                  options={optionsEmpresas.map((item) => ({
                    value: item.IDEMPRESA,
                    label: item.NOFANTASIA
                  }
                  ))}
                  isMulti
                  defaultValue={[empresaSelecionada]}
                  // Mudança no campo de seleção de empresas
                  onChange={(selectedOptions) => setEmpresaSelecionada(selectedOptions.map(option => option.value))}


                />
              </div>

            </div>
            <div className="row mt-4">
              <div className="col-sm-6 col-md-6 col-xl-6">
                <InputFieldModal
                  label={"Percentual de Desconto"}
                  type="text"
                  id={"percentDesconto"}
                  value={percentDesconto}
                  onChangeModal={(e) => setPercentDesconto(e.target.value)}
                  {...register("percentDesconto", { required: "Campo obrigatório Informe o Percentual de Desconto", })}
                />
                {errors.percentDesconto && <span className="text-danger">{errors.percentDesconto.message}</span>}
              </div>
            </div>

          </form>
        </Modal.Body>

        <FooterModal
          ButtonTypeConfirmar={ButtonTypeModal}
          textButtonConfirmar={"Atualizar"}
          onClickButtonConfirmar={onSubmit}
          corConfirmar={"success"}

          ButtonTypeFechar={ButtonTypeModal}
          textButtonFechar={"Fechar"}
          onClickButtonFechar={handleClose}
          corFechar="secondary"
        />
      </Modal>
    </Fragment>
  );
};