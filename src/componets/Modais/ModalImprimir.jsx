import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalImprimir = () => {
  return (

    <Fragment>
      <div className="modal fade" id="imprimiDados" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title TituloModalImprimir">
                Impressão de Recibos
                <small className="m-0 text-muted">
                  Imprimir Despesa
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formImprimir" name="formImprimir" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formImprimir" name="formImprimir" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalimprimir">

                </div>
                <div className="modal-footer" id="footerimprimir">
                  {/* <button id="buttonimprimir" type="button" className="btn btn-success" onclick="imprimir_dados()">Confirmar Impressão</button> */}
                  <button id="buttonimprimir" type="button" className="btn btn-success" >Confirmar Impressão</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )

}