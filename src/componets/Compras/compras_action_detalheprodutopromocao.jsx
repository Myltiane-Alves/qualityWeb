import { Fragment } from "react"


export const ComprasActionDetalheProdutoPromocao = () => {
  return (

    <Fragment>

      <div className="row">
        <div className="col-xl-6">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <h2 id="textopromoprod">

                <small className="m-0 text-muted">
                  Produtos de Origem
                </small>
              </h2>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <div id="resultadodetalhepromocaoprodorigem">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div id="panel-2" className="panel">
            <div className="panel-hdr">
              <h2 id="textopromoprod2">

                <small className="m-0 text-muted">
                  Produtos de Destino
                </small>
              </h2>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <div id="resultadodetalhepromocaoproddestino">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
