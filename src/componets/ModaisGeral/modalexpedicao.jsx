import React, { Fragment } from "react"


export const ModalExpedicao = () => {
  return (

    <Fragment>


      {/* <!-- Modal Faturamento Ordem de Transferência --> */}
      <div className="modal fade" id="fot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Faturamento Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadofot">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Ordem de Transferência --> */}
      <div className="modal fade" id="ot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Controle Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadoot">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Observacao Ordem de Transferência --> */}
      <div className="modal fade" id="observacaoot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Observação da Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadoobservacaoot">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Imprime Etiqueta OT --> */}
      <div className="modal fade" id="impEtiquetaOT" role="dialog" aria-hidden="true">
        <div id="dialogModalEtiquetaOT" className="modal-dialog modal-lg" role="document" style={{ alignContent: "center" }}>
          <div id="contentModalEtiquetaOT" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                {/* <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()"> */}
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir">
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>

              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
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
                <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir" >
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Quantidade Volume OT --> */}
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
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
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

      {/* <!-- Modal Conferir Volume OT --> */}
      <div className="modal fade" id="conferirvolumeot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Conferir os Volumes da OT
                <small className="m-0 text-muted">
                  Efetuar a Leitura dos Códigos de Barras
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formSD" name="formSD" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadoconferirvolumeot">

                </div>
                <div className="modal-footer" id="footerconferirvolumeot">

                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Conferir Ordem de Transferência --> */}
      <div className="modal fade" id="cot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Conferir Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadocot">

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}