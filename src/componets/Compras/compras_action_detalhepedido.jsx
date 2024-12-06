import { Fragment } from "react"


export const ComprasActionDetalhePedido = () => {
  return (

    <Fragment>

      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <h2 id="NomeFantasiaData">
              </h2>
              <div className="panel-toolbar">
                <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>
              </div>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <div id="resultadodetalhepedido">
                  <div style={{textAlign: "center"}}>
                    <button className="btn btn-lg btn-info" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Dados Sendo Processados...</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}