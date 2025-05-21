import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormularioEditarCliente } from './formularioEditar';
import { HeaderModal } from '../../../../Modais/HeaderModal/HeaderModal';

export const ActionEditarClienteModal = ({ show, handleClose, dadosCampanhaCliente }) => {

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
          title={"Atualizar Cliente"}
          subTitle={"Atualizar Cliente"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <FormularioEditarCliente dadosCampanhaCliente={dadosCampanhaCliente} handleClose={handleClose} />
        </Modal.Body>

      </Modal>
    </Fragment>
  );
};