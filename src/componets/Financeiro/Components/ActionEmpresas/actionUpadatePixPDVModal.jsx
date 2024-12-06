import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { put } from "../../../../api/funcRequest";

export const ActionUpdatePixPDVModal = ({ show, handleClose, dadosPixPDV }) => {
  const { register, handleSubmit, errors } = useForm();
  const [pixSelecionado, setPixSelecionado] = useState('')
  const [faturaSelecionado, setFaturaSelecionado] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
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
    const response = await fetch('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }


  const onSubmit = async (data) => {
    if (usuarioLogado && usuarioLogado.id == '2010') {
      
      const putData = {
        IDEMPRESA: dadosPixPDV[0]?.IDEMPRESA,
        IDPSPPIX: pixSelecionado,
        IDPSPPIXFATURA: faturaSelecionado,
        USER: usuarioLogado.id
      }
      let dados = JSON.stringify(putData)
      const response = await put('/atualizarConfiguracaoPixPDV', putData)
      Swal.fire({
        title: 'Sucesso',
        text: 'Despesa alterada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: `FINANCEIRO/EMPRESAS/ALTERACAO CONFIGURACAO PIX IDEMPRESA: ${dadosPixPDV[0]?.IDEMPRESA}`,
        DADOS: dados,
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', postData)
      handleClose()
      return responsePost.data
    } else {
      // return alert('Usuário sem autorização para realizar a operação! Fale com o responsável do Financeiro(Wendell)')
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro!',
        text: 'Usuário sem autorização para realizar a operação!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 4000 
      });
    }

  }



  const handleChangeBanco = (e) => {
    setPixSelecionado(e.value)
  }

  const handleChangeFatura = (e) => {
    setFaturaSelecionado(e.value)
  }

  const optionsBancos = [
    { value: '1', label: 'Itaú' },
    { value: '2', label: 'Santander' },
  ]

  return (

    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
      >

        <div style={{ padding: "10px" }}>

          <HeaderModal
            title={`Configuração Pix Loja: ${dadosPixPDV[0]?.NOFANTASIA}`}
            handleClose={handleClose}
          />

          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"Nº LOJA"}
                      type="text"
                      readOnly={true}
                      value={dadosPixPDV[0]?.IDEMPRESA}

                    />
                  </div>
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"LOJA"}
                      type="text"
                      readOnly={true}
                      value={dadosPixPDV[0]?.NOFANTASIA}
                    />
                  </div>

                </div>

                <div className="form-group mt-4">
                  <div className="row">
                    <div className="col-sm-6 col-xl-6">

                      <label> Config. Pix Venda </label>
                      <Select
                        defaultValue={[optionsBancos[0] || pixSelecionado]}
                        options={optionsBancos.map((item) => {
                          return {
                            value: item.value,
                            label: item.label

                          }
                        })}
                        onChange={handleChangeBanco}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">
                      <label>Config. Pix Fatura</label>
                      <Select
                        defaultValue={[optionsBancos[1] || faturaSelecionado]}
                        options={optionsBancos.map((item) => {
                          return {
                            value: item.value,
                            label: item.label
                          }
                        })}
                        onChange={handleChangeFatura}

                      />

                    </div>

                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>


          <FooterModal

            ButtonTypeCadastrar={ButtonTypeModal}
            onClickButtonCadastrar={handleSubmit(onSubmit)}
            textButtonCadastrar={"Atualizar"}
            corCadastrar={"success"}

            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Cancelar e Fechar"}
            corFechar={"secondary"}
          />
        </div>
      </Modal>
    </Fragment>
  )
}

