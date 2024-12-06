import React, { Fragment } from "react"
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal"
import { FooterModal } from "../Modais/FooterModal/footerModal"
import { ButtonTypeModal } from "../Buttons/ButtonTypeModal"
import Modal from 'react-bootstrap/Modal';
import { InputFieldModal } from "../Buttons/InputFieldModal";

export const InformaticaActionUpdateFuncDescontoModal = ({show, handleClose}) => {
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

            <HeaderModal
              title={"Dados do Funcionário"}
              subTitle={"Cadastrar ou Atualizar Informações do Funcionário"}
              handleClose={handleClose}
            />


            <Modal.Body>

              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-xl-12">
                    
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={true}
                      label="Empresa"
                      value={""}
                      onChangeModal

                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-4 col-xl-4">
              

                    <InputFieldModal
                    type="text"
                    className="form-control input"
                    readOnly={true}
                    label="CPF"
                    value={""}
                    onChangeModal

                  />
                  </div>
                  <div className="col-sm-8 col-xl-8">
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={true}
                      label="Funcionário"
                      value={""}
                      onChangeModal

                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-12 col-xl-12">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    readOnly={true}
                    label="Motivo do Desconto"
                    value={""}
                    onChangeModal

                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-3 col-xl-4">
      
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={true}
                      label="% Desconto Autorizado"
                      value={""}
                      onChangeModal

                    />
                  </div>
                  <div className="col-sm-3 col-xl-4">
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={true}
                      label="Início Desconto"
                      value={""}
                      onChangeModal

                    />
                  </div>
                  <div className="col-sm-3 col-xl-4">

                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={true}
                      label="Fim Desconto"
                      value={""}
                      onChangeModal

                    />
                  </div>
                </div>
              </div>
              <FooterModal
                ButtonTypeFechar={ButtonTypeModal}
                textButtonFechar={"Fechar"}
                onClickButtonFechar={handleClose}
                corFechar="secondary"

                ButtonTypeCadastrar={ButtonTypeModal}
                textButtonCadastrar={"Atualizar"}
                onClickButtonCadastrar
                corCadastrar="success"

              />
            </Modal.Body>
          </Modal>


    </Fragment>
  )
}

{/* <script>
  $("#percDescFuncAlt").mask('#.##0,00', {reverse: true});
</script> */}