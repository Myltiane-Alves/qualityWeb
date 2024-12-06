import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"


export const ModalQuantidadeVolumeOT = () => {
  return (

    <Fragment>
      <div className="modal fade" id="volumeot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Informar os Volumes da OT
                <small className="m-0 text-muted">
                  Preencher com a Quantidade e Descrição dos Volumes
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            {/* <form id="formSD" name="formSD" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadovolumeot">

                </div>
                <div className="modal-footer" id="footervolumeot">

                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )

}