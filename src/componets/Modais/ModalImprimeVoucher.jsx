import React, { Fragment } from "react"
import { AiOutlineCloseCircle, AiOutlineFilePdf } from "react-icons/ai"


export const ModalImprimeVoucher = () => {
  return (

    <Fragment>
      <div className="modal fade" id="impVoucher" role="dialog" aria-hidden="true">
        <div id="dialogModalVoucher" className="modal-dialog modal-md" role="document" style={{ alignContent: "center" }}>
          <div id="contentModalVoucher" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                {/* <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" onclick="impVoucher()"> */}
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir">

                  <AiFillPrinter size={20} />
                  Imprimir
                </button>

                {/* <button id="btnPDF" type="button" className="btn btn-danger btn-sm hidden-print p-1 fw-700" title="PDF" onclick="exportPDF()"> */}
                <button id="btnPDF" type="button" className="btn btn-danger btn-sm hidden-print p-1 fw-700" title="PDF">

                  <AiOutlineFilePdf size={20} />
                  PDF
                </button>
              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <AiOutlineCloseCircle size={20} />

              </button>

            </div>
            <div className="modal-subheader hidden-print" >

              <hr style={{ border: "1px solid" }} />

              <h2 className="modal-title " style={{ textAlign: "center" }}>
                Voucher
              </h2>
              <br />
            </div>
            <div className="modal-body p-0 ml-2">
              <div id="VoucherImp"></div>

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )

}