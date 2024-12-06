import { Fragment, useState } from "react"
import { Modal } from "react-bootstrap"
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import Select from 'react-select';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { post } from "../../../../api/funcRequest";

export const ActionCadastroCategoriaPedidoModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [statusSelecionado, setStatusSelecionado] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tipoCategoriaSelecionado, setTipoCategoriaSelecionado] = useState('')


  const onSubmit = async () => {
    const postData = {
      IDCATEGORIAPEDIDO,
      DSCATEGORIAPEDIDO: descricao,
      TIPOPEDIDO: tipoCategoriaSelecionado,
      STATIVO: statusSelecionado,
    }

    const response = await post('/cadastrarCategoriaPedidos', postData)
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

  const handleChangeTipoCategoria = (e) => {
    setTipoCategoriaSelecionado(e.value)
  }

  const options = [
    { value: 'True', label: 'ATIVO' },
    { value: 'False', label: 'INATIVO' },

  ]
  const optionsTipoCategoria = [
    { value: 'VESTUARIO', label: 'VESTUARIO' },
    { value: 'CALCADOS', label: 'CALCADOS' },
    { value: 'ARTIGOS', label: 'ARTIGOS' },

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
          title={"Condições de Pagamento"}
          subTitle={"Editar Pagamento"}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form>
            <div className="form-group">
              <div className="row">

                <div className="col-sm-6 col-lg-6">

                  <InputFieldModal
                    label={"Descrição *"}
                    type={"text"}
                    id={"desccatpedido"}
                    value={descricao}
                    onChangeModal={(e) => setDescricao(e.target.value)}
                    {...register("desccatpedido", { required: "Campo obrigatório Informe a Descrição da Categoria do Pedido.", })}
                    required={true}
                    placeholder={"Informe a Descrição da Categoria do Pedido."}
                    readOnly={false}
                  />
                </div>
                <div className="col-sm-6 col-lg-6">

                  <label htmlFor="">Tipo Categoria *</label>
                  <Select
                    defaultValue={tipoCategoriaSelecionado}
                    options={optionsTipoCategoria.map((item) => {
                      return {
                        value: item.value,
                        label: item.label
                      }
                    })}
                    onChangeModal={handleChangeTipoCategoria}
                  />
                </div>

              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-lg-6">

                  <label htmlFor="">Situação *</label>
                  <Select
                    defaultValue={statusSelecionado}
                    options={options.map((item) => {
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

