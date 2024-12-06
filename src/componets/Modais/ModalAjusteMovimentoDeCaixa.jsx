import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalAjusteMovimentoDeCaixa = () => {
  return (

    <Fragment>
      <div className="modal fade" id="ajusteMovCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Movimento de Caixa da Loja
                <small className="m-0 text-muted">
                  Ajustar Movimento de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>
            </div>
            {/* <form id="formAjusteMovCaixaLoja" name="formAjusteMovCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAjusteMovCaixaLoja" name="formAjusteMovCaixaLoja" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalajustemovcaixa">

                </div>
                <div className="modal-footer" id="footerajustemovcaixa">
                  {/* <button id="buttonajustemovcaixa" type="button" className="btn btn-success" onclick="ajustar_mov_caixa()">Ajustar Movimentação do Caixa</button> */}
                  <button id="buttonajustemovcaixa" type="button" className="btn btn-success" >Ajustar Movimentação do Caixa</button>
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