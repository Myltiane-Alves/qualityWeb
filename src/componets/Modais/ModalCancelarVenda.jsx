import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalCancelarVenda = () => {
  return (

    <Fragment>
      <div className="modal fade" id="cancelVenda" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Cancelamento da Vendas
                <small className="m-0 text-muted">
                  As Vendas só poderão ser canceladas até 24 depois de ser emitida
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formCancelVenda" name="formCancelVenda" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCancelVenda" name="formCancelVenda" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcancelvenda">

                </div>
                <div className="modal-footer" id="footercancelvenda">
                  {/* <button type="button" className="btn btn-success" onclick="cancelar_vendas()">Cancelar Venda</button> */}
                  <button type="button" className="btn btn-success" >Cancelar Venda</button>
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