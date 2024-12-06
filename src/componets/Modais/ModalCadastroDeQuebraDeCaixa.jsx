import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalCadastroDeQuebraDeCaixa = () => {
  return (

    <Fragment>
      <div className="modal fade" id="cadQuebraCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Lançar Quebra de Caixa da Loja
                <small className="m-0 text-muted">
                  Cadastrar Quebra de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>
            </div>
            {/* <form id="formQuebraCaixaLoja" name="formQuebraCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formQuebraCaixaLoja" name="formQuebraCaixaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalquebracaixa">

                </div>
                <div className="modal-footer" id="footerquebracaixa">
                  {/* <button id="buttoncadquebracaixa" type="button" className="btn btn-success" onclick="cadastrar_quebra_caixa()">Cadastrar Quebra de Caixa</button> */}
                  <button id="buttoncadquebracaixa" type="button" className="btn btn-success">Cadastrar Quebra de Caixa</button>
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