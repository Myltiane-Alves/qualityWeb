import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../../api/funcRequest";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import Select from 'react-select';
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import { getDataAtual } from "../../../../utils/dataAtual";

export const ActionCadastrarAdiantamentoSalarial = ({ show, handleClose, }) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [textoMotivo, setTextoMotivo] = useState('')
  const [valorDesconto, setValorDesconto] = useState(0)
  const [status, setStatus] = useState('')
  const [usuarioSelecionado, setUsuarioSelecionado] = useState()
  const [dataLancamento, setDataLancamento] = useState('')
  const [ipUsuario, setIpUsuario] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const data = getDataAtual()
    setDataLancamento(data);
    getIPUsuario();
  }, [usuarioLogado]);


  const getIPUsuario = async () => {
    const response = await fetch('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
 
  }, [navigate]);


  const { data: dadosFuncionarios = [], error: errorFuncionario, isLoading: isLoadingFuncionario } = useQuery(
    'todos-funcionario',
    async () => {
      const response = await get(`/todos-funcionario?idEmpresa=${usuarioLogado.IDEMPRESA}`);
      console.log('response', response.data)
      return response.data;
    },
    {enabled: true, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

  const onSubmit = async (data) => {
    const postData = {
      IDEMPRESA: usuarioLogado.IDEMPRESA,
      IDFUNCIONARIO: usuarioSelecionado,
      DTLANCAMENTO: dataLancamento,
      TXTMOTIVO: textoMotivo,
      VRVALORDESCONTO: valorDesconto,
      STATIVO: status,
      IDUSR: usuarioLogado.id,

    }

    try {
      const response = await post('/adiantamento-salarial', postData)
      
      Swal.fire({
        title: 'Cadastro',
        text: 'Adiantamento Salarial Cadastrado com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
      
      setTextoMotivo('');
      setValorDesconto('');
      setStatus('');


      const textDados = JSON.stringify(postData)
      let textoFuncao = 'GERENCIA/CADASTRO DE ADIANTAMENTO SALARIAL';


      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', createData)
     
      handleClose();
    
      
      return responsePost.data;
    } catch (error) {
      console.error('Erro ao tentar cadastrar o adiantamento salarial:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Erro ao Tentar Cadastrar Adiantamento Salarial',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

    }

  }

  const handleChangeUsuario = (e) => {
    setUsuarioSelecionado(e.value);
  }

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        id="CadadiantamentoSalario"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >



        <HeaderModal
          title={"Adiantamento de Salário"}
          subTitle={"Lançar Adiantamento de Salário"}
          handleClose={handleClose}
        />
      
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div class="modal-body" id="resulmodaladiantamentosalario">

              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 col-xl-10">
                    <InputFieldModal
                      id="nomeempAdiantamento"
                      className="form-control input"
                      readOnly={true}
                      label="Empresa"
                      value={usuarioLogado?.NOFANTASIA}
                    />

                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 col-xl-8">
                    <label className="form-label" htmlFor={""}>Funcionários</label>


                    <Select
                      defaultValue={usuarioSelecionado}
                      options={[
                        { value: '', label: 'Selecione...' },
                        ...dadosFuncionarios.map((item) => {
                          return {
                            value: item.ID,
                            label: `${item.ID} - ${item.NOFUNCIONARIO}`
                          }
                        })]}
                      onChange={handleChangeUsuario}
                    />

                  </div>
                  <div class="col-sm-6 col-xl-4">
                    <InputFieldModal
                      id="IDLancamento"
                      type="date"
                      className="form-control input"
                      readOnly={true}
                      label="Data Lançamento"
                      value={dataLancamento}
                      onChangeModal={(e) => setDataLancamento(e.target.value)}
                    />
                  </div>
                </div>
              </div>
             
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 col-xl-12">
                    <InputFieldModal
                      type="textarea"
                      className="form-control input"
                      id="txtMotivo"
                      label="Descrição - Motivo *"
                      value={textoMotivo}
                      onChangeModal={(e) => setTextoMotivo(e.target.value)}
                      {...register("txtMotivo", { required: "Campo obrigatório Informe Motivo", })}
                    />
                     {errors.txtMotivo && <span className="text-danger">{errors.txtMotivo.message}</span>}
                  </div>
                  <div class="col-sm-6 col-xl-4">
                    <InputFieldModal
                      id="VrValorDesconto"
                      type="text"
                      className="form-control input"

                      label="Valor *"
                      placeholder="R$ 0,00"
                      value={valorDesconto}
                      onChangeModal={(e) => setValorDesconto(e.target.value)}
                      {...register("valorDesconto", { required: "Campo obrigatório Informe o Valor", })}
                    />
                    {errors.valorDesconto && <span className="text-danger">{errors.valorDesconto.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <FooterModal
              ButtonTypeCadastrar={ButtonTypeModal}
              onClickButtonCadastrar={onSubmit}
              textButtonCadastrar={"Cadastrar"}
              corCadastrar="success"

              ButtonTypeFechar={ButtonTypeModal}
              textButtonFechar={"Fechar"}
              onClickButtonFechar={handleClose}
              corFechar="secondary"
            />

          </form>

        </Modal.Body>

      </Modal>
    </Fragment>
  )
}