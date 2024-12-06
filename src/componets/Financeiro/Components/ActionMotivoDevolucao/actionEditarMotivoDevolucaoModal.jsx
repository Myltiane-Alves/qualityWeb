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
import { post, put } from "../../../../api/funcRequest";
import axios from "axios";

export const ActionEditarMotivoDevolucaoModal = ({ show, handleClose, dadosDetalheMotivoDevolucao }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [statusSelecionado, setStatusSelecionado] = useState('')
  const [faturaSelecionado, setFaturaSelecionado] = useState('')
  const [motivo, setMotivo] = useState('')
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
    const response = await axios.get('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }

  useEffect(() => {
    if (dadosDetalheMotivoDevolucao) {
      setStatusSelecionado({ value: dadosDetalheMotivoDevolucao[0]?.STATIVO, label: dadosDetalheMotivoDevolucao[0]?.STATIVO });
      setMotivo(dadosDetalheMotivoDevolucao[0]?.DSMOTIVO);
    }
  }, [dadosDetalheMotivoDevolucao]);

  const hanleChangeMotivo = (e) => {
    setMotivo(e.target.value);
    console.log(e.target.value.length, 'valor')
  }


  const onSubmit = async () => {

    setIsSubmitting(true);

    const putData = {
      IDUSUARIO: usuarioLogado.id,
      IDMOTIVODEVOLUCAO: dadosDetalheMotivoDevolucao[0]?.IDMOTIVODEVOLUCAO,
      DSMOTIVO: motivo,
      STATIVO: statusSelecionado?.value,
    }

    try {

      const response = await put('/atualizar-motivo-devolucao', putData)

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Motivo de Devolução Atualizado com sucesso!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000
      });

      const textDados = JSON.stringify(putData);
      let textoFuncao = `FINANCEIRO/EMPRESAS/MOTIVO DEVOLUÇÃO: ${dadosDetalheMotivoDevolucao[0]?.IDMOTIVODEVOLUCAO}`;


      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      handleClose();

      const responsePost = await post('/log-web', postData)

      return responsePost.data;
    } catch (error) {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  

  const handleChangeBanco = (e) => {
    setStatusSelecionado(e)
  }

  const optionsStatus = [
    { id: 0, value: 'True', label: 'Ativo' },
    { id: 1, value: 'False', label: 'Inativo' },
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

        <div style={{ padding: "10px" }}>

          <HeaderModal
            title={`Visualização dos Detalhes do Motivo de Devolução`}

            handleClose={handleClose}
          />

          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"Data e Hora Criação"}
                      type="text"
                      readOnly={true}
                      value={dadosDetalheMotivoDevolucao[0]?.DTCRIACAO}

                    />
                  </div>
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"Data e Hora Alteração"}
                      type="text"
                      readOnly={true}
                      value={dadosDetalheMotivoDevolucao[0]?.DTULTALTERACAO}
                    />
                  </div>

                </div>
                <div className="row mt-4">

                  <div className="col-sm-6 col-xl-6">

                    <label> Status Motivo </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      options={optionsStatus}
                      value={statusSelecionado}
                      onChange={(option) => setStatusSelecionado(option)}
                    />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                      label={"ID Motivo"}
                      type="text"
                      readOnly={true}
                      value={dadosDetalheMotivoDevolucao[0]?.IDMOTIVODEVOLUCAO || motivo}
                    />

                  </div>

                </div>
                <div className="row mt-4">
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"Motivo Devolução"}
                      type="text"
                      value={motivo}
                      onChangeModal={(e) => setMotivo(e.target.value)}
                    // {...register("motivo", { required: true, minLength: 8 })}
                    />
                    {/* {errors.motivo && <span className="text-danger">Motivo de Devolução deve ter no mínimo 8 caracteres!</span>} */}
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

