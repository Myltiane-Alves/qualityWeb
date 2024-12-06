import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalConferirOrdemDeTransferenciaPesquisarProduto = () => {
  return (

    <Fragment>
      <div className="modal fade" id="conferirabrirpesqproduto" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Pesquisar Produto
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6 col-xl-10">
                  <label className="form-label" htmlFor="pesqProduto">Informe a Descrição ou Código de Barras do Produto</label>
                  <div className="input-group">
                    <input type="text" id="conferirpesqProduto" name="conferirpesqProduto" className="form-control input" value="" />&nbsp;&nbsp;

                    {/* <button className="btn btn-primary" type="button" onclick="conferirpesquisarProduto()"> */}
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" id="conferirresultado">

            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )

}