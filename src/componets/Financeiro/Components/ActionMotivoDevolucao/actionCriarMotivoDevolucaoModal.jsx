import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";;
import { post, put } from "../../../../api/funcRequest";

export const ActionCriarMotivoDevolucaoModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [motivoDevolucao, setMotivoDevolucao] = useState('')
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
    if(!motivoDevolucao || motivoDevolucao.length < 8) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: 'O campo Motivo de Devolução deve ter no mínimo 8 caracteres!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const createData = {
      DSMOTIVO: motivoDevolucao,
      IDUSUARIO: usuarioLogado.id,
      IDUSUARIO: usuarioLogado.id,
    }

    const response = await post('/criar-motivo-devolucao', createData)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Motivo de Devolução criado com sucesso!',
      customClass: {
        container: 'custom-swal',
      },
      showConfirmButton: false,
      timer: 15000
    })

    const textDados = JSON.stringify(createData);
    let textoFuncao = `FINANCEIRO/EMPRESAS/MOTIVO DEVOLUÇÃO`;


    const postData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: textoFuncao,
      DADOS: textDados,
      IP: ipUsuario
    }

    const responsePost = await post('/log-web', postData)
    handleClose();
    
    return responsePost.data;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
      customClass: { container: 'custom-swal' },
      showConfirmButton: false,
      timer: 1500
    });
  }



  // Falta Entender a função formataMitivoDevolucao para implementar aqui


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
            title={'Criar Novo Motivo de Devolução'}

            handleClose={handleClose}
          />

          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group">
                <div className="row">
                  
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"Motivo Devolução"}
                      type="text"
                      placeholder={"Digite o motivo de devolução"}
                      value={motivoDevolucao}
                      onChangeModal={(e) => setMotivoDevolucao(e.target.value)}
                      // {...register("motivoDevolucao", { required: true, minLength: 8 })}
                    />
                    {/* {errors.motivoDevolucao && (
                      <span className="text-danger">Motivo de Devolução deve ter no mínimo 8 caracteres!</span>
                    )} */}
                  </div>

                </div>
              </div>

            </form>
          </Modal.Body>


          <FooterModal

            ButtonTypeCadastrar={ButtonTypeModal}
            onClickButtonCadastrar={handleSubmit(onSubmit)}
            textButtonCadastrar={"Criar"}
            corCadastrar={"success"}

            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}
          />
        </div>
      </Modal>
    </Fragment>
  )
}

