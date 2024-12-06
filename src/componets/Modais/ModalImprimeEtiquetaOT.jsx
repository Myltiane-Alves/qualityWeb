import React, { Fragment } from "react"
import { AiFillPrinter, AiOutlineCloseCircle } from "react-icons/ai"


export const ModalImprimeEtiquetaOT = () => {
  return (

    <Fragment>
      <div className="modal fade" id="impEtiquetaOT" role="dialog" aria-hidden="true">
        <div id="dialogModalEtiquetaOT" className="modal-dialog modal-lg" role="document" style={{ alignContent: "center" }}>
          <div id="contentModalEtiquetaOT" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                {/* <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()"> */}
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" >
                  <span className="fal fa-print pr-1"></span>
                  <AiFillPrinter size={20} />
                  Imprimir
                </button>

              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>

            </div>
            <div className="modal-subheader hidden-print" >

              <hr style={{ border: "1px solid" }} />

              <h2 className="modal-title " style={{ textAlign: "center" }}>
                Etiqueta
              </h2>
              <br />
            </div>
            <div className="modal-body p-0 m-3">
              <div id="etiquetaImp"></div>

            </div>

            <hr style={{ border: "1px solid", width: "100%" }} />

            <div className="modal-footer hidden-print" style={{ margin: "auto" }}>
              <div>
                {/* <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()"> */}
                <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir">
                  <AiFillPrinter size={20} />
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )

}