import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalCadastroDeValeTransporteDaLoja = () => {
  return (

    <Fragment>
      <div className="modal fade" id="cadValeTransp" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Vale Transporte da Loja
                <small className="m-0 text-muted">
                  Cadastrar Vale Transporte da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formValeTranspLoja" name="formValeTranspLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formValeTranspLoja" name="formValeTranspLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalvaletransp">

                </div>
                <div className="modal-footer" id="footervaletransp">
                  {/* <button id="buttoncadvaletransp" type="button" className="btn btn-success" onclick="cadastrar_vale_transporte()">Cadastrar Vale Transporte</button> */}
                  <button id="buttoncadvaletransp" type="button" className="btn btn-success" >Cadastrar Vale Transporte</button>
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