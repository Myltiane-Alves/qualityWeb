import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalCancelarFaturaCaixa = () => {
  return (

    <Fragment>
      <div className="modal fade" id="cancelFaturaCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Faturas dos Caixas
                <small className="m-0 text-muted">
                  Cancelar Fatura de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>
            </div>
            {/* <form id="formCancelaFaturaCaixaLoja" name="formCancelaFaturaCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCancelaFaturaCaixaLoja" name="formCancelaFaturaCaixaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcancelafaturacaixa">

                </div>
                <div className="modal-footer" id="footercancelafaturacaixa">
                  {/* <button id="buttoncancelafaturacaixa" type="button" className="btn btn-success" onclick="cancela_fatura_caixa()">Confirmar Cancelamento</button> */}
                  <button id="buttoncancelafaturacaixa" type="button" className="btn btn-success" >Confirmar Cancelamento</button>
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