import { Fragment } from "react"


export const CadastroActionCopiarPedidoParaNota = () => {
  return (

    <Fragment>

      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <h2>
                <span className="fw-300"><i> Produtos Para Nota Fiscal de Entrada</i></span>
              </h2>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <div className="row">
                  <div id="resultadoProdParaNFE" className="col-sm-12 col-xl-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}