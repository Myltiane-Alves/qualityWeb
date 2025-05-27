import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormularioCadatrarPromocao } from './formularioCadastrar';
import { HeaderModal } from '../../../Modais/HeaderModal/HeaderModal';
import { ActionListaPromocoesAtivas } from './actionListaPromocaoAtivas';

export const ActionPromocaoModal = ({dadosPromocoesAtivas, show, handleClose }) => {

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
          title={"Cadastrar Promoção"}
          subTitle={"Cadastrar Produto Promoção"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <ActionListaPromocoesAtivas dadosPromocoesAtivas={dadosPromocoesAtivas}/>
        </Modal.Body>
        
      </Modal>
    </Fragment>
  );
};