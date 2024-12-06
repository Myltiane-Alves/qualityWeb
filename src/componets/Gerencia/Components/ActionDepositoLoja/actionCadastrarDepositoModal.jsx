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
import { getDataAtual } from "../../../../utils/dataAtual";
import { getDataHoraAtual } from "../../../../utils/horaAtual";
import { useQuery } from "react-query";
import Swal from "sweetalert2";


export const ActionCadastrarDepositoModal = ({ show, handleClose, }) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [dsHistorio, setDSHistorio] = useState('');
  const [numeroDocDeposito, setNumeroDocDeposito] = useState('');
  const [valorDeposito, setValorDeposito] = useState(0);
  const [contaBancoSelecionada, setContaBancoSelecionada] = useState(null);
  const [horarioAtual, setHorarioAtual] = useState('');
  const [dataMovCaixa, setDataMovCaixa] = useState('');
  const [empresa, setEmpresa] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [ipUsuario, setIpUsuario] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
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
    const dataAtual = getDataAtual()
    const horaAtual = getDataHoraAtual()
    setData(dataAtual)
    setHora(horaAtual)
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

  const { data: dadosContaBanco = [], error: errorContaBanco, isLoading: isLoadingContaBanco } = useQuery(
    'contaBanco',
    async () => {
      const response = await get(`/contaBanco`);
      return response.data;
    },
    {enabled: true, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const onSubmit = async (data) => {
    if (contaBancoSelecionada && dsHistorio && numeroDocDeposito && valorDeposito && dataMovCaixa && horarioAtual) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      });
      return; 
    }

    const putData = {
      IDEMPRESA: usuarioLogado.IDEMPRESA,
      IDUSR: usuarioLogado.id,
      IDCONTABANCO: contaBancoSelecionada,
      DTDEPOSITO: dataMovCaixa,
      DTMOVIMENTOCAIXA: hora,
      DSHISTORIO: dsHistorio,
      NUDOCDEPOSITO: numeroDocDeposito,
      VRDEPOSITO: valorDeposito,

      STATIVO: 'True',
      STCANCELADO: 'False',
    }

    try {
      
      const response = await post('/cadastrar-deposito-loja', putData)

      Swal.fire({
        title: 'Cadastro',
        text: 'Depósito cadastrado com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      setDSHistorio('');
      setNumeroDocDeposito('');
      setValorDeposito(0);
      setContaBancoSelecionada(null);
      setHorarioAtual('');
      setDataMovCaixa('');
      

      const textDados = JSON.stringify(putData)
      let textoFuncao = 'GERENCIA/CADASTRO DEPOSITO ';


      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }
      console.log('postData', postData);
      const responsePost = await post('/log-web', postData)
     
      handleClose();
    
      
      return responsePost.data;
    } catch (error) {
      console.error('Erro ao tentar cadastrar o depósito:', error);
      Swal.fire({
        title: 'Cadastro',
        text: 'Erro ao Tentar Cadastrar Depósito',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

    }
  }

  const handleChangeContaBanco = (e) => {
    setContaBancoSelecionada(e.value);
  };

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

        <div className="" role="document">
          <div className="">

            <HeaderModal
              title={"Dados do Depósitos da Loja"}
              subTitle={"Cadastrar Depósitos da Loja"}
              handleClose={handleClose}
            />
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                  <div className="row">

                    <div className="col-sm-6 col-xl-10">

                      <InputFieldModal
                        label={"Empresa"}
                        type="text"
                        readOnly={true}
                        value={usuarioLogado?.NOFANTASIA}
                        onChangeModal={(e) => setEmpresa(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-3">

                      <InputFieldModal

                        type="date"
                        label={"Data Depósito"}
                        value={data}
                        onChangeModal={(e) => setData(e.target.value)}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-3">

                      <InputFieldModal
                        label={"Hora Depósito"}
                        type="datetime-local"
                        value={hora}
                        onChangeModal={(e) => setHora(e.target.value)}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6 mt-4">
                      <label className="form-label" htmlFor={""}>Conta</label>
                      <Select
                        options={[
                          { value: '', label: 'Selecione uma conta' },
                          ...dadosContaBanco.map((item) => {
                            return {
                              value: item.IDBANCO,
                              label: item.DSCONTABANCO
                            }

                          })
                        ]}
                        defaultValue={contaBancoSelecionada}
                        onChange={handleChangeContaBanco}
                      />

                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-8">

                      <InputFieldModal
                        label={"Histórico"}
                        type="text"
                        readOnly={false}
                        value={dsHistorio}
                        onChangeModal={(e) => setDSHistorio(e.target.value)}
                        {...register("historico", { required: "Campo obrigatório Informe o Histórico", })}
                      />
                      {errors.historico && <span className="text-danger">{errors.historico.message}</span>}
                    </div>
                    <div className="col-sm-6 col-xl-4">

                      <InputFieldModal
                        label={"Nº Doc Depósito"}
                        type="text"
                        readOnly={false}
                        onChangeModal={(e) => setNumeroDocDeposito(e.target.value)}
                        value={numeroDocDeposito}
                        {...register("docDeposito", { required: "Campo obrigatório Informe o Nº Doc Depósito", })}
                      />
                      {errors.docDeposito && <span className="text-danger">{errors.docDeposito.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-4">

                      <InputFieldModal
                        label={"Valor Depósito"}
                        type="number"
                        value={valorDeposito}
                        onChangeModal={(e) => {
                          const valor = e.target.value.replace(".", "").replace(",", ".");
                          setValorDeposito(valor)
                        }}
                        {...register("vrDeposito", { required: "Campo obrigatório Informe o Valor do Depósito" })}
                        readOnly={false}
                      />
                      {errors.vrDeposito && <span className="text-danger">{errors.vrDeposito.message}</span>}
                    </div>
                    <div className="col-sm-6 col-xl-4">

                      <InputFieldModal
                        label={"Data Movimento de Caixa"}
                        type="date"
                        value={dataMovCaixa}
                        onChangeModal={(e) => setDataMovCaixa(e.target.value)}
                        {...register("dtMovimentoCaixa", { required: "Campo obrigatório Informe a Data Movimento", })}
                        readOnly={false}
                      />
                      {errors.dtMovimentoCaixa && <span className="text-danger">{errors.dtMovimentoCaixa.message}</span>}
                    </div>
                    <div className="col-sm-6 col-xl-4 ">

                      <InputFieldModal
                        label={"Hora Movimento de Caixa"}
                        type="time"
                        value={horarioAtual}
                        onChangeModal={(e) => setHorarioAtual(e.target.value)}
                        {...register("hrMovimentoCaixa", { required: "Campo obrigatório Informe a Hora Movimento", })}
                        readOnly={false}
                      />

                      {errors.hrMovimentoCaixa && <span className="text-danger">{errors.hrMovimentoCaixa.message}</span>}

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
          </div>
        </div>
      </Modal>

    </Fragment>
  )
}