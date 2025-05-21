import React, { Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FormularioCadastroCPF } from "./formularioCadastroCPF";

export const ActionCadastroClienteVoucherCPF = ({ show, handleClose }) => {

  return (

    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <HeaderModal
          title={"Cadastro do Cliente"}
          subTitle={"Cadastro e atualização de dados do Cliente"}
          handleClose={handleClose}
        />

        <Modal.Body>

          <FormularioCadastroCPF handleClose={handleClose} />
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}