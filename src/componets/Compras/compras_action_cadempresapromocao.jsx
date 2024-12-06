import { Fragment } from "react"


export const ComprasActionCadEmpresaPromocao = () => {
  return (

    <Fragment>
      <div id="resultadocademppromocao"></div>

      <div className="form-group">
        <div className="row">
          <input type="hidden" name="IdResPromoEmp" id="IdResPromoEmp" value="" />
          <div className="col-sm-4 col-xl-4">
            <label className="form-label" htmlFor="tpmarcavenda">Marca</label>
            <div className="input-group">
              <select className="select2 form-control" name="idmarcaselect" id="idmarcaselect" multiple>

              </select>
            </div>
          </div>
          <div className="col-sm-8 col-xl-8">
            <br />
            {/* <button className="btn btn-primary" type="button" onclick="selecionaempresamarca()"><span className="fal fa-search mr-1"></span>Pesquisar</button> */}
            <button className="btn btn-primary" type="button" ><span className="fal fa-search mr-1"></span>Pesquisar</button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div id="emplist"></div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>
                  Lista de Empresas Cadastrados
                </h2>
                <div className="panel-toolbar">
                  <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>

                </div>
              </div>

              <div className="panel-container show">
                <div className="panel-content">
                  <div id="cadempresaslist">
                    {/* <!-- datatable start --> */}

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
