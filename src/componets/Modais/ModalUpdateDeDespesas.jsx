import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalUpdateDeDespesas = () => {
  return (

    <Fragment>
      <div className="modal fade" id="editDespesa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Despesa da Loja
                <small className="m-0 text-muted">
                  Editar Despesas da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formEditDespesaLoja" name="formEditDespesaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formEditDespesaLoja" name="formEditDespesaLoja" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaleditdespesa">

                </div>
                <div className="modal-footer" id="footerdespesa">
                  {/* <button id="buttoneditdespesa" type="button" className="btn btn-success" onclick="ajustar_despesa()">Editar Despesa</button> */}
                  <button id="buttoneditdespesa" type="button" className="btn btn-success" >Editar Despesa</button>
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