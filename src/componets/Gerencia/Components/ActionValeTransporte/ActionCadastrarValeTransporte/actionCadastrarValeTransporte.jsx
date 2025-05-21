import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { FormularioCadastrar } from "./formularioCadastrar";
import { HeaderModal } from "../../../../Modais/HeaderModal/HeaderModal";

export const ActionCadastrarValeTransporte = ({show, handleClose, usuarioLogado, optionsModulos}) => {

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

          <HeaderModal
            title={"Dados do Vale Trasnporte da Loja"}
            subTitle={"Cadastrar Vale Trasnporte da Loja"}
            handleClose={handleClose}
          />

          <Modal.Body>
            <FormularioCadastrar handleClose={handleClose} usuarioLogado={usuarioLogado} optionsModulos={optionsModulos} />
          </Modal.Body>

        </Modal>
    </Fragment>
  )
}