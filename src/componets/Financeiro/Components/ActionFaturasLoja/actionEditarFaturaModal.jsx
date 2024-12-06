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

export const ActionEditarFaturaModal = ({ show, handleClose, dadosDetalheFaturaCaixa }) => {
  const { register, handleSubmit, errors } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [horarioAtual, setHorarioAtual] = useState('');
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
  const [vrDespesa, setVrDespesa] = useState('');
  const [codAutorizacao, setCodAutorizacao] = useState('');
  const [codPix, setCodPix] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('')
  const [stPixSelecionado, setStPixSelecionado] = useState('')
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
    const valorInicial = dadosDetalheFaturaCaixa[0]?.VRRECEBIDO ? parseFloat(dadosDetalheFaturaCaixa[0].VRRECEBIDO) : '';
    setVrDespesa(valorInicial);
  }, [dadosDetalheFaturaCaixa]);
  
  const hanleChangeDespesa = (e) => {
    const valor = e.target.value;
    setVrDespesa(valor);
    console.log(valor, 'valor')
  }

  useEffect(() => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    setHorarioAtual(formattedTime);
  }, []);


  const onSubmit = async (data) => {
    const putData = {
      IDDETALHEFATURA: dadosDetalheFaturaCaixa[0].IDDETALHEFATURA,
      NUCODAUTORIZACAO: codAutorizacao,
      VRRECEBIDO:  parseFloat(vrDespesa),
      NUAUTORIZACAO: codPix,
      STPIX: stPixSelecionado,
      STCANCELADO: statusSelecionado,
    }

   
    const response = await put('/atualizarFatura', putData)
    .then(response => {
        handleClose();
      console.log(response, 'despesa cadastrada com sucesso front end!')
    })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Atualizado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

    const postData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: `FINANCEIRO/EMPRESAS/ALTERACAO CONFIGURACAO PIX IDEMPRESA: ${dadosPixPDV[0]?.IDEMPRESA}`,
      DADOS: dados,
      IP: ipUsuario
    }

    .catch (error => {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
        showConfirmButton: false,
        timer: 1500 
      });
      console.log(error)
    })

    const responsePost = await post('/logWeb', postData)
    handleClose();
    return responsePost;
  }

  const OptionsStatus = [
    {id:  0,  value: "True", label: "CANCELADO" },
    {id:  1,  value: "False", label: "ATIVO" },
  ]
  const OptionsPIX = [
    {id:  0,  value: "True", label: "SIM" },
    {id:  1,  value: "False", label: "NÃO" },
  ]

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

                    <div class="col-sm-6 col-xl-6">
                      <InputFieldModal
                        className="form-control input"
                        readOnly={true}
                        label="Empresa"
                        value={dadosDetalheFaturaCaixa[0]?.NOFANTASIA}
                      />

                    </div>
                    <div class="col-sm-6 col-xl-6">
                      <InputFieldModal
                        className="form-control input"
                        readOnly={true}
                        label="Caixa - Código Autorização da Fatura"
                        value={`${dadosDetalheFaturaCaixa[0]?.IDDETALHEFATURA} - ${dadosDetalheFaturaCaixa[0]?.DSCAIXA} - ${dadosDetalheFaturaCaixa[0]?.NUCODAUTORIZACAO}`}
                      />

                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">


                    <div class="col-sm-6 col-xl-3">

                      <InputFieldModal
                        type="text"
                        className="form-control input"
                        readOnly={true}
                        label="Código Autorização"
                        value={dadosDetalheFaturaCaixa[0]?.NUCODAUTORIZACAO || codAutorizacao}
                      />
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <InputFieldModal
                        type="text"
                        className="form-control input"
                        readOnly={true}
                        label="Código PIX"
                        value={dadosDetalheFaturaCaixa[0]?.NUAUTORIZACAO || codPix}
                      />
                    </div>
               
                   
                    <div class="col-sm-6 col-xl-2">
                      <label htmlFor="">PIX</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={OptionsPIX[0] || stPixSelecionado}

                        name="color"
                        options={OptionsPIX}
                      />

                    </div>
                    <div class="col-sm-6 col-xl-3">
                      <label htmlFor="">Status</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={OptionsStatus[0] || statusSelecionado}

                        name="color"
                        options={OptionsStatus}
                      />

                    </div>
                  </div>
                </div>
              
                <div class="form-group">
                  <div className="row">

                  <div class="col-sm-6">
                  <InputFieldModal
                      id="VrValorDespesa"
                      type="text"
                      className="form-control input"
                      value={vrDespesa}
                      onChangeModal={hanleChangeDespesa}
                      label="Valor da Fatura"
                      placeholder="R$ 0,00"
                    />
                  </div>
                  </div>
                </div>
                 
                <FooterModal
                  ButtonTypeFechar={ButtonTypeModal}
                  onClickButtonFechar={handleClose}
                  textButtonFechar={"Fechar"}
                  corFechar={"secondary"}
                
                  ButtonTypeCadastrar={ButtonTypeModal}
                  onClickButtonCadastrar={onSubmit}
                  textButtonCadastrar={"Confimar Alteração"}
                  corCadastrar={"success"}
                />
              </form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

