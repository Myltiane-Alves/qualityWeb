import { Fragment } from "react"


export const ComprasActionCadProdutosPromocao = () => {
  return (

    <Fragment>

      <div id="resultadocadprodpromocao"></div>

      <div className="form-group">
        <div className="row">
          <input type="hidden" name="IdResPromo" id="IdResPromo" value="" />
          <div className="col-sm-6 col-xl-8">
            <label className="form-label" htmlFor="noforn">Fornecedor</label>
            <div className="input-group">
              {/* <select className="select form-control" name="idfornpromo" id="idfornpromo" onChange="selecionafabricante();"> */}
              <select className="select form-control" name="idfornpromo" id="idfornpromo">
                <option value=""> </option>

              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="nofab">Fabricante</label>
            <div className="input-group">
              <select className="select form-control" name="idfabpromo" id="idfabpromo">
                <option value=""> </option>

              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-3 col-xl-3">
            <label className="form-label" htmlFor="tpgestmerc">Grupo Estrutura Mercadologica</label>
            <div className="input-group">
              {/* <select className="select2 form-control" name="idgrupoestruturaselect" id="idgrupoestruturaselect" onChange="selecionasubestrutura();" multiple> */}
              <select className="select2 form-control" name="idgrupoestruturaselect" id="idgrupoestruturaselect" multiple>
                <option value=""></option>
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-xl-3">
            <label className="form-label" htmlFor="tpestmerc">Estrutura Mercadologica</label>
            <div className="input-group">
              <select className="select2 form-control" name="idestruturaselect" id="idestruturaselect" multiple>
                <option value=""> </option>
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-xl-3">
            <label className="form-label" htmlFor="promodesc">Descrição</label>
            <div className="input-group">
              <input type="text" id="descprodpromo" name="descprodpromo" className="form-control input" value="" />
            </div>
          </div>
          <div className="col-sm-3 col-xl-3">
            <label className="form-label" htmlFor="promodesccodbarras">Cod. Barras</label>
            <div className="input-group">
              <input type="text" id="codbarraprodpromocao" name="codbarraprodpromocao" className="form-control input" value="" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            {/* <button className="btn btn-primary" type="button" onclick="selecionaprodpromo()"><span className="fal fa-search mr-1"></span>Pesquisar</button> */}
            <button className="btn btn-primary" type="button"><span className="fal fa-search mr-1"></span>Pesquisar</button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div id="prodlist"></div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>
                  Lista de Produtos da Origem Cadastrados
                </h2>
                <div className="panel-toolbar">
                  <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>

                </div>
              </div>

              <div className="panel-container show">
                <div className="panel-content">
                  <div id="prodorigemlist">
                    {/* <!-- datatable start --> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>
                  Lista de Produtos do Destino Cadastrados
                </h2>
                <div className="panel-toolbar">
                  <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>

                </div>
              </div>

              <div className="panel-container show">
                <div className="panel-content">
                  <div id="proddestinolist">
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