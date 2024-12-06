import { Fragment, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import Select from 'react-select';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import { post } from "../../../../api/funcRequest"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { useNavigate } from "react-router-dom";

export const ActionCadastrarTipoTecidosModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [descricao, setDescricao] = useState('')
  const [statusSelecionado, setStatusSelecionado] = useState([])
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
    if(response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }

  const onSubmit = async () => {
    const postData = {
      IDTPTECIDO,
      DSTIPOTECIDO,
      STATIVO: statusSelecionado,
    }

    const response = await post('/cadastrarTipoTecidos', postData)
      .then(response => {

        // Limpar os campos do formulário


        console.log(response, 'despesa cadastrada com sucesso front end!')
      })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

      .catch(error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      })
  }

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value)
  }

  const handleChangeSubGrupo = (e) => {
    setSubGrupoSelecionado(e.value)
  }
  const handleChangeDescricao = (e) => {
    setDescricao(e.target.value);
  };

  const optionsStatus = [
    { value: 'True', label: 'ATIVO' },
    { value: 'False', label: 'INATIVO' }
  ]

  return (

    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        class="modal-content"
        size="xl"
        centered
      >

        <HeaderModal
          title={"Tipo de Tecidos"}
          subTitle={"Inclusão"}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form action="">
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Descrição *"}
                    type={"text"}
                    id={"DSTIPOTEIDO"}
                    value={descricao}
                    onChangeModal={handleChangeDescricao}

                    {...register("DSTIPO TEIDO", { required: "Campo obrigatório Informe a Descrição do Tipo de Tecido", })}
                    required={true}
                  />
                </div>
          
                <div className="col-sm-6 col-xl-6">

                  <label htmlFor="">Situação *</label>
                  <Select

                    defaultValue={statusSelecionado}
                    options={optionsStatus.map((item) => {
                      return {
                        value: item.value,
                        label: item.label
                      }
                    })}
                    onChange={handleChangeStatus}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <h3 className="form-label" htmlFor="vrfat">* Campos Obrigatórios *</h3>
            </div>
            <FooterModal
              ButtonTypeFechar={ButtonTypeModal}
              onClickButtonFechar={handleClose}
              textButtonFechar={"Fechar"}
              corFechar={"secondary"}

              ButtonTypeCadastrar={ButtonTypeModal}
              onClickButtonCadastrar
              textButtonCadastrar={"Salvar"}
              corCadastrar={"success"}
            />

          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}