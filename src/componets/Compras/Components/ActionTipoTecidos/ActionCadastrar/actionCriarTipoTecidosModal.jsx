import { Fragment } from "react"
import { Modal } from "react-bootstrap"
import { HeaderModal } from "../../../../Modais/HeaderModal/HeaderModal";
import { FormularioCriarTecido } from "./formularioCriarTecido";

export const ActionCriarTipoTecidosModal = ({ show, handleClose }) => {

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
          subTitle={"Alteração"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <FormularioCriarTecido handleClose={handleClose}/>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}