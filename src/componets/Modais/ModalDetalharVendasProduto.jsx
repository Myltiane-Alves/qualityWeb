import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalDetalharVendasProduto = () => {
  return (

    <Fragment>
      <div className="modal fade" id="detVendaproduto" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe da Venda
                <small className="m-0 text-muted">
                  Relação de Produtos da Venda
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>
            </div>
            {/* <form id="formDetVendaProduto" name="formDetVendaProduto" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVendaProduto" name="formDetVendaProduto" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldetvendaproduto">

                </div>
                <div className="modal-footer" id="footerdetvendaproduto">
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