import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalAtualizaStatusVoucher = () => {
  return (

    <Fragment>
      <div className="modal fade" id="detStatusVoucher" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                Detalhes do Voucher
                <small className="m-0 text-muted">
                  Detalhes e Atualização de Status
                </small>
              </h2>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            <div className="modal-body detDadosVoucher">

            </div>
            {/* <form id="formdetStatusVoucher" name="formdetStatusVoucher" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formdetStatusVoucher" name="formdetStatusVoucher" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resultadoModalStatusVoucher">

                </div>
                <div className="modal-footer" id="footerdetStatusVoucher">
                  {/* <button id="btnUpdateVoucher" type="button" className="btn btn-success d-none" onclick="atualizaStatusVoucher()">Atualizar</button> */}
                  <button id="btnUpdateVoucher" type="button" className="btn btn-success d-none" >Atualizar</button>
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