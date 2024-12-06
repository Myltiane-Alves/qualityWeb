import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { get, post } from "../../../../api/funcRequest";
import { getDataHoraAtual } from "../../../../utils/horaAtual";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import axios from "axios";
import { getHoraAtual } from "../../../../utils/dataAtual";

export const ActionCadastrarDespesasModal = ({ show, handleClose, }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [dsHistorio, setDSHistorio] = useState('');
  const [dsPagoA, setDsPagoA] = useState('');
  const [vrDespesa, setVrDespesa] = useState('');
  const [hora, setHora] = useState('');
  const [dtDespesa, setDtDespesa] = useState('');
  const [despesaSelecionada, setDespesaSelecionada] = useState('')
  const [tpNota, setTpNota] = useState('');
  const [nuNotaFiscal, setNuNotaFiscal] = useState('');
  const [categoriaRecDesp, setCategoriaRecDesp] = useState('')
  const [ipUsuario, setIpUsuario] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const horaAtual = getHoraAtual()
    const dataAtual = getDataHoraAtual()
    setHora(horaAtual)
    setDtDespesa(dataAtual)
  }, [])

  useEffect(() => {
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if(response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }

  const { data: dadosReceitaDespesa = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch } = useQuery(
    'categoria-receita-despesa',
    async () => {
      const response = await get(`/categoria-receita-despesa`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const onSubmit = async (data) => {
    if (despesaSelecionada && dsHistorio && dsPagoA && tpNota && nuNotaFiscal && vrDespesa) {
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

    const postData = {
      IDEMPRESA: usuarioLogado.IDEMPRESA,
      IDUSR: usuarioLogado.id,
      DTDESPESA: dtDespesa,
      IDCATEGORIARECEITADESPESA: despesaSelecionada?.value,
      DSHISTORIO: dsHistorio,
      DSPAGOA: dsPagoA,
      TPNOTA: tpNota?.value,
      NUNOTAFISCAL: nuNotaFiscal,
      VRDESPESA: vrDespesa,
      STATIVO: 'True',
      STCANCELADO: 'False',

    }

    try {
      const response = await post('/cadastrar-despesa-loja', postData)
      Swal.fire({
        title: 'Cadastro',
        text: 'Despesa cadastrado com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
   
      setDtDespesa('')
      setCategoriaRecDesp('')
      setDSHistorio('')
      setDsPagoA('')
      setTpNota('')
      setNuNotaFiscal('')
      setVrDespesa('')

      const textDados = JSON.stringify(postData)
      let textoFuncao = 'GERENCIA/CADASTRO DE DESPESA';
  
  
      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }
  
      const responsePost = await post('/log-web', createData)
  
      
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        title: 'Cadastro',
        text: 'Erro ao Tentar Cadastrar Despesa',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

    }
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

  const Options = [
    { id: 0, value: "Selecione", label: "Selecione" },
    { id: 1, value: "NFCe", label: "NFCe" },
    { id: 2, value: "NFe", label: "NFe" },
  ]

  const handleChangeDespesa = (selectedOption) => {
    setDespesaSelecionada(selectedOption); 
  };

  const handleChangeNota = (selectedOption) => {
    setTpNota(selectedOption);
  };
  return (
    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <div className="" role="document">
          <div className="">

            <HeaderModal
              title={"Dados da Despesa da Loja"}
              subTitle={"Cadastrar Despesas da Loja"}
              handleClose={handleClose}
            />
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div class="form-group">
                  <div class="row">
    
                    <div class="col-sm-6 col-xl-10">
                      <InputFieldModal
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


                    <div class="col-sm-6 col-xl-4">

                      <InputFieldModal
                        type="datetime"
                        className="form-control input"
                        readOnly={true}
                        label="Data Despesa"
                        value={usuarioLogado?.DATA_HORA_SESSAO}
                      />
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <InputFieldModal
                        type="datetime"
                        className="form-control input"
                        readOnly={true}
                        label="Hora Despesa"
                        value={hora}
                      />
                    </div>

                    <div class="col-sm-6 col-xl-4 ">
                      <label className="form-label" htmlFor={""}>Despesa</label>
                      <Select
                        
                        label={"Despesa"}
                        options={dadosReceitaDespesa.map((item) => ({
                          value: item.IDCATEGORIARECDESP,
                          label: `${item.IDCATEGORIARECDESP} - ${item.DSCATEGORIA}`
                        }))}
                        value={despesaSelecionada}
                        onChange={handleChangeDespesa}
                       
                      />
                      {/* {errors.despesa && (
                        <span className="text-danger">Selecione a Despesa</span>
                      )} */}
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">

                    <div class="col-sm-6 col-xl-6">
                      <InputFieldModal
                        type="text"
                        id={"historico"}
                        label="Histórico"
                        className="form-control input"
                        readOnly={false}
                        value={dsHistorio}
                        onChangeModal={(e) => setDSHistorio(e.target.value)}
                        {...register("historico", { required: "Campo obrigatório Informe o Histórico", })}
                      />
                      {/* {errors.historico && (
                        <span className="text-danger">Informe o Histórico</span>
                      )} */}
                    </div>
                    <div class="col-sm-6 col-xl-6">
                      <InputFieldModal
                        id="pagoa"
                        type="text"
                        className="form-control input"
                        readOnly={false}
                        value={dsPagoA}
                        onChangeModal={(e) => setDsPagoA(e.target.value)}
                        {...register("pagoa", { required: "Campo obrigatório Informe a Quem foi Pago", })}
                        label="Pago á"
                      />
                      {/* {errors.pagoa && (
                        <span className="text-danger">Informe a quem foi Pago</span>
                      )} */}
                    </div>
                  </div>
                </div>
                <div class="form-group">
                    <div class="row mt-3">
                      <div class="col-sm-6 col-xl-4">
                        <label htmlFor="">Tipo Nota</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={Options[0]}
                          value={tpNota}
                          onChange={handleChangeNota}
                          name="color"
                          options={Options}
                        />
                        {/* {errors.tipoNota && (
                          <span className="text-danger">Selecione o Tipo de Nota</span>
                        )} */}
                      </div>
                      <div class="col-sm-6 col-xl-6">

                      <InputFieldModal
                        id="VrValorDesconto"
                        placeholder="R$ 0,00"
                        label="Valor Despesa"
                        type="text"
                        className="form-control input"
                        readOnly={false}
                        value={vrDespesa}
                        onChangeModal={(e) => setVrDespesa(e.target.value)}
                        {...register("vrDespesa", { required: true })}
                      />
                      {/* {errors.vrDespesa && (
                        <span className="text-danger">Adicione um valor para despesa</span>
                      )} */}

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