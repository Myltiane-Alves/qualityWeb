import React, { Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import { FormularioCadastroCNPJ } from "./formularioCadastroCNPJ";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";

export const ActionCadastroClienteVoucherCNPJ = ({ show, handleClose }) => {

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
          title={"Cadastro do Cliente Jurídico"}
          subTitle={"Cadastro e atualização de dados do Cliente"}
          handleClose={handleClose}
        />

        <Modal.Body>

          <FormularioCadastroCNPJ handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}