import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from '../../../Modais/HeaderModal/HeaderModal';
import { InputFieldModal } from '../../../Buttons/InputFieldModal';
import { FooterModal } from '../../../Modais/FooterModal/footerModal';
import { ButtonTypeModal } from '../../../Buttons/ButtonTypeModal';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';
import { get, post } from '../../../../api/funcRequest';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';
import { getDataAtual } from '../../../../utils/dataAtual';
import { formatarValor } from '../../../../utils/formatarValor';

export const ActionCadastrarPromocaoModal = ({ show, handleClose }) => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const [descricao, setDescricao] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [percentDesconto, setPercentDesconto] = useState(0)
  const [qtdApartir, setQtdApartir] = useState(0)
  const [qtdLimite, setQtdLimite] = useState(0)
  const [vrDescPromo, setVrDescPromo] = useState(0)
  const [vrApartir, setVrApartir] = useState(0)
  const [vrLimite, setVrLimite] = useState(0)
  const [produtoPromocao, setProdutoPromocao] = useState('')
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
      DSPROMO: descricao,
      DTINICIOPROMO: dataInicio,
      DTFIMPROMO: dataFim,
      QTDAPARTIRDE: parseFloat(qtdApartir),
      QTDLIMITEDE: parseFloat(qtdLimite),
      VRPRECODESCONTO: parseFloat(vrDescPromo),
      VRPERCDESCONTO: parseFloat(percentDesconto),
      VRAPARTIRDE: parseFloat(vrApartir),
      VRLIMITEDE: parseFloat(vrLimite),
      STATIVO: 'True',
      IDGRUPO: parseInt(marcaSelecionada),
      PRODUTOS: '',
      EMPRESAS: empresaSelecionada,
    }];

    try {
      const response = await post('/cadastrar-produto-promocao', postData);
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
      let textoFuncao = 'MARKETING/CADASTRO PROMOÇÃO';

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
          title={"Cadastrar Promoção"}
          subTitle={"Cadastrar Produto Promoção"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={(selectedOptions) => setEmpresaSelecionada(selectedOptions.map(option => option.value))}


                />
              </div>

            </div>


            <div className="row mt-4">
              <div className="col-sm-6 col-md-6 col-xl-6">
                <InputFieldModal
                  label={"Descrição da Promoção"}
                  type="text"
                  id={"dsCampanha"}
                  value={[descricao]}
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


            <div className="row mt-4">
              <div className="col-sm-6 col-md-3 col-xl-3">
                <InputFieldModal
                  label={"QTD A partir de"}
                  type="text"
                  id={"qtdApartir"}
                  value={qtdApartir}
                  onChangeModal={(e) => setQtdApartir(e.target.value)}
                  {...register("qtdApartir", { required: "Campo obrigatório Informe a Quantidade", })}
                />
                {errors.qtdApartir && <span className="text-danger">{errors.qtdApartir.message}</span>}
              </div>
              <div className="col-sm-6 col-md-3 col-xl-3">
                <InputFieldModal
                  label={"QTD A limite de"}
                  type="text"
                  id={"qtdLimite"}
                  value={qtdLimite}
                  onChangeModal={(e) => setQtdLimite(e.target.value)}
                  {...register("qtdLimite", { required: "Campo obrigatório Informe a Quantidade Limite", })}
                />
                {errors.qtdLimite && <span className="text-danger">{errors.qtdLimite.message}</span>}
              </div>
              <div className="col-sm-6 col-md-3 col-xl-3">
                <InputFieldModal
                  label={"Vr Desconto"}
                  type="text"
                  id={"vrDescPromo"}
                  {...register("vrDescPromo", { 
                    required: "Campo obrigatório Informe o Valor do Desconto", 
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Informe um valor válido"
                    }
                  })}
                  value={vrDescPromo}
                  onChangeModal={(e) => setVrDescPromo(formatarValor(e.target.value))}
                />
                {errors.vrDescPromo && <span className="text-danger">{errors.vrDescPromo.message}</span>}
              </div>
              <div className="col-sm-6 col-md-3 col-xl-3">
                <InputFieldModal
                  label={"% Desconto"}
                  type="text"
                  id={"percentDesconto"}
                  value={percentDesconto}
                  onChangeModal={(e) => setPercentDesconto(formatarValor(e.target.value))}
                  {...register("percentDesconto", { required: "Campo obrigatório Informe o Percentual de Desconto", })}
                />
                {errors.percentDesconto && <span className="text-danger">{errors.percentDesconto.message}</span>}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-6 col-md-3 col-xl-3">
                <InputFieldModal
                  label={"Vr A partir de"}
                  type="text"
                  id={"vrApartir"}
                  value={vrApartir}
                  onChangeModal={(e) => setVrApartir(formatarValor(e.target.value))}
                  {...register("vrApartir", { required: "Campo obrigatório Informe o Valor ", })}
                />
                {errors.vrApartir && <span className="text-danger">{errors.vrApartir.message}</span>}
              </div>
              <div className="col-sm-6 col-md-3 col-xl-3">
                <InputFieldModal
                  label={"Vr Limite de"}
                  type="text"
                  id={"vrLimite"}
                  value={vrLimite}
                  onChangeModal={(e) => setVrLimite(formatarValor(e.target.value))}
                  {...register("vrLimite", { required: "Campo obrigatório Informe o Valor ", })}
                />
                {errors.vrLimite && <span className="text-danger">{errors.vrLimite.message}</span>}
              </div>
              <div className="col-sm-6 col-md-6 col-xl-6">
                <InputFieldModal
                  label={"Cód.Barras / Nome Produto"}
                  type="text"
                  id={"produtoPromocao"}
                  value={produtoPromocao}
                  onChangeModal={(e) => setProdutoPromocao(e.target.value)}
                  {...register("produtoPromocao", { required: "Campo obrigatório Informe o Cód Barras / Nome do Produto ", })}
                />
                {errors.produtoPromocao && <span className="text-danger">{errors.produtoPromocao.message}</span>}
              </div>
            </div>

          </form>
        </Modal.Body>

        <FooterModal
          ButtonTypeConfirmar={ButtonTypeModal}
          textButtonConfirmar={"Cadastrar"}
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