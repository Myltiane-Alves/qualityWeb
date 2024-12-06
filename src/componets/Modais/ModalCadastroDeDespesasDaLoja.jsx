import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalCadastroDeDespesasDaLoja = () => {
  return (

    <Fragment>
      <div className="modal fade" id="cadDespesa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Despesa da Loja
                <small className="m-0 text-muted">
                  Cadastrar Despesas da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i>  </span>
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formDespesaLoja" name="formDespesaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDespesaLoja" name="formDespesaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldespesa">

                </div>
                <div className="modal-footer" id="footerdespesa">
                  {/* <button id="buttoncaddespesa" type="button" className="btn btn-success" onclick="cadastrar_despesa()">Cadastrar Despesa</button> */}
                  <button id="buttoncaddespesa" type="button" className="btn btn-success">Cadastrar Despesa</button>
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