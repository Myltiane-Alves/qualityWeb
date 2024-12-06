import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../../../../api/funcRequest";
import Swal from 'sweetalert2';
import { formatMoeda } from "../../../../utils/formatMoeda";
import axios from "axios";
import { useQuery } from "react-query";



export const ActionAjusteDespesasModal = ({ show, handleClose, dadosDespesasLojaDetalhe }) => {
  const { register, handleSubmit, errors } = useForm();
  const [horarioAtual, setHorarioAtual] = useState('');
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
  const [dsHistorio, setDsHistorio] = useState('');
  const [dsPagoA, setDsPagoA] = useState('');
  const [vrDespesa, setVrDespesa] = useState('');
  const [tpNota, setTpNota] = useState('');
  const [nuNotaFiscal, setNuNotaFiscal] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);                
  const [ipUsuario, setIpUsuario] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  const { data: dadosReceitaDespesa = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
    'categoria-receita-despesa',
    async () => {
      const response = await get(`/categoria-receita-despesa`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );



  useEffect(() => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    setHorarioAtual(formattedTime);
  }, []);

  useEffect(() => {
    if (dadosDespesasLojaDetalhe) {
      setDespesaSelecionada({ value: dadosDespesasLojaDetalhe[0]?.IDCATEGORIARECEITADESPESA, label: dadosDespesasLojaDetalhe[0]?.DSCATEGORIARECDESP });
      setDsHistorio(dadosDespesasLojaDetalhe[0]?.DSHISTORICO);
      setDsPagoA(dadosDespesasLojaDetalhe[0]?.DSPAGOA);
      setTpNota({ value: dadosDespesasLojaDetalhe[0]?.TPNOTA, label: dadosDespesasLojaDetalhe[0]?.TPNOTA });
      setNuNotaFiscal(dadosDespesasLojaDetalhe[0]?.NUNOTAFISCAL);
      setVrDespesa(dadosDespesasLojaDetalhe[0]?.VRDESPESA);
    }
  }, [dadosDespesasLojaDetalhe]);

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

    setIsSubmitting(true);

    const postData = {
      
      IDCATEGORIARECEITADESPESA: despesaSelecionada?.value,
      VRDESPESA: vrDespesa,
      DSPAGOA: dsPagoA,
      DSHISTORIO: dsHistorio,
      TPNOTA: tpNota?.value,
      NUNOTAFISCAL: nuNotaFiscal,
      IDUSRCACELAMENTO: usuarioLogado.id,
      DSMOTIVOCANCELAMENTO: ' Despesa Editada',
      IDDESPESASLOJA: dadosDespesasLojaDetalhe[0]?.IDDESPESASLOJA,

    }

    try {
      const response = await put('/editar-despesa', postData)
      Swal.fire({
        title: 'Sucesso',
        text: 'Despesa alterada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
   

      const textDados = JSON.stringify(postData)
      let textoFuncao = 'FINANCEIRO/ATUALIZAÇÃO DE DESPESA';
  
  
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
      Swal.fire({
        title: 'Erro',
        text: 'Erro ao Tentar Editar Despesa',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChangeDespesa = (selectedOption) => {
    setDespesaSelecionada(selectedOption); 
  };

  const handleChangeTpNota = (selectedOption) => {
    setTpNota(selectedOption);
  };
  const Options = [
    
    {id:  0,  value: "NFCe", label: "NFCe" },
    {id:  1,  value: "NFe", label: "NFe" },
  ]
  
  console.log(despesaSelecionada)
 
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
                        value={horarioAtual}
                      />
                    </div>
                    
                    <div class="col-sm-6 col-xl-4 mt-4">
                      <label htmlFor="">Despesa</label>

                      <Select
                        label={"Despesa"}
                        options={dadosReceitaDespesa.map((item) => ({
                          value: item.IDCATEGORIARECDESP,
                          label: `${item.IDCATEGORIARECDESP} - ${item.DSCATEGORIA}`
                        }))}
                        defaultValue={despesaSelecionada}
                        onChange={(e) => setDespesaSelecionada(e)}
                      
                      />
                    </div>
                     
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">

                    <div class="col-sm-6 col-xl-6">              
                      <InputFieldModal
                        type="text"
                        className="form-control input"
                        readOnly={false}
                        value={dsHistorio}
                        onChangeModal={(e) => setDsHistorio(e.target.value)}
                        label="Histórico"
                      />

                    </div>
                    <div class="col-sm-6 col-xl-6">
                      <InputFieldModal
                        id="TXTMotivo"
                        type="text"
                        className="form-control input"
                        readOnly={false}
                        value={dsPagoA}
                        onChangeModal={(e) => setDsPagoA(e.target.value)}
                        label="Pago á"
                      />

                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-sm-6 col-xl-4">
                      <label htmlFor="">Tipo Nota</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        options={Options}
                        value={tpNota}
                        onChange={(option) => setTpNota(option)}
                        name="color"
                      />

                    </div>
                    <InputFieldModal
                      id="vrValorDesconto"
                      type="text"
                      className="form-control input"
                      value={vrDespesa}
                      onChangeModal={(e) => setVrDespesa(e.target.value)}
                      label="Valor Despesa"
                      placeholder="R$ 0,00"
                    />
                  </div>
                </div>
                 
                <FooterModal
                 

                  ButtonTypeFechar={ButtonTypeModal}
                  onClickButtonFechar={handleClose}
                  textButtonFechar={"Fechar"}
                  corFechar={"secondary"}
                
                  ButtonTypeCadastrar={ButtonTypeModal}
                  onClickButtonCadastrar={() => {}}
                  textButtonCadastrar={"Editar Despesa"}
                  corCadastrar={"success"}
                  disabled={isSubmitting}
                />
              </form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

