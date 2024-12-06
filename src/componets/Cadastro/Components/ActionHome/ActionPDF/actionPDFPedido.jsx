import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Modal } from "react-bootstrap"
import { HeaderModal } from "../../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../../Modais/FooterModal/footerModal";
import { ActionNotaPDF } from "./actionNotaPDF";
import { ActionListaDetalhe } from "./actionListaDetalhe";


export const ActionPDFPedido = ({ show, handleClose, dadosPedido, dadosDetalhePedido }) => {

  // console.log(dadosPedido, 'dadosPedido');
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
          title={"Transportador"}
          subTitle={"Inclusão"}
          handleClose={handleClose}
        />


        <Modal.Body>

          <ActionNotaPDF dadosPedido={dadosPedido} />
          <ActionListaDetalhe dadosDetalhePedido={dadosDetalhePedido} />
        </Modal.Body>
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
      </Modal>


    </Fragment>
  )
}