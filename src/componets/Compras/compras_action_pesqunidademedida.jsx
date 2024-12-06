import { Fragment } from "react"


export const ComprasActionPesqUnidadeMedida = () => {
  return (

    <Fragment>

      <div className="row">
          <div className="col-xl-12">
              <div id="panel-1" className="panel">
                  <div className="panel-hdr">
                      <h2>
                          Lista de Unidades de Medidas
                      </h2>
                      <div className="panel-toolbar">
                          <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>
                          
                      </div>
                  </div>
                  <div className="panel-container show">
                      <div className="panel-content">
                          <div id="resultado">
                              {/* <!-- datatable start --> */}
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Fragment>
  )
}
