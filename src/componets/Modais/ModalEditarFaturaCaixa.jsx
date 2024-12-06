import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalEditarFaturaCaixa = () => {
  return (

    <Fragment>
      <div className="modal fade" id="editeFaturaCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Faturas dos Caixas
                <small className="m-0 text-muted">
                  Editar Fatura de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>
            </div>
            {/* <form id="formEditeFaturaCaixaLoja" name="formEditeFaturaCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formEditeFaturaCaixaLoja" name="formEditeFaturaCaixaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaleditefaturacaixa">

                </div>
                <div className="modal-footer" id="footereditefaturacaixa">
                  {/* <button id="buttoneditefaturacaixa" type="button" className="btn btn-success" onclick="editar_fatura_caixa()">Confirmar Alteração</button> */}
                  <button id="buttoneditefaturacaixa" type="button" className="btn btn-success">Confirmar Alteração</button>
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