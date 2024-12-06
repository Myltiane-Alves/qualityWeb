import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalObservacaoOrdemDeTransferencia = () => {
  return (

    <Fragment>
      <div className="modal fade" id="observacaoot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Observação da Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>
            </div>
            <div className="modal-body" id="resultadoobservacaoot">

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )

}