import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalDetalharRecebimento = () => {
  return (

    <Fragment>
      <div className="modal fade" id="detVendaRecebimento" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe da Venda
                <small className="m-0 text-muted">
                  Relação de Recebimentos da Venda
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formDetVendaRecebimento" name="formDetVendaRecebimento" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVendaRecebimento" name="formDetVendaRecebimento" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldetvendarecebimento">

                </div>
                <div className="modal-footer" id="footerdetvendarecebimento">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

    </Fragment>
  )

}