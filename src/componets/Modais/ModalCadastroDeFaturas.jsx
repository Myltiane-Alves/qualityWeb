import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalCadastroDeFaturas = () => {
  return (

    <Fragment>
      <div className="modal fade" id="cadFatura" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Fatura da Loja
                <small className="m-0 text-muted">
                  Recebimento de Faturas da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formFaturaLoja" name="formFaturaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formFaturaLoja" name="formFaturaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalfatura">

                </div>
                <div className="modal-footer" id="footerfatura">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_fatura_caixa()">Receber Fatura</button> */}
                  <button type="button" className="btn btn-success" >Receber Fatura</button>
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