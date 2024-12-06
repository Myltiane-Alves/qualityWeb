import { Fragment } from "react"


export const CadastroActionCadProdPedidoModal = () => {
  return (

    <Fragment>

      <div id="resultadoprodpedidocad"></div>

      <div className="form-group">
        <input type="hidden" name="IDDetPedidoCad" id="IDDetPedidoCad" value="" />
        <input type="hidden" name="IDResPedidoCad" id="IDResPedidoCad" value="" />
        <input type="hidden" name="stAtivo" id="stAtivo" value="True" />
        <input type="hidden" name="StCancel" id="StCancel" value="False" />
        <input type="hidden" name="stRedSocial" id="stRedSocial" value="" />
        <input type="hidden" name="stEcommerce" id="stEcommerce" value="" />
        <input type="hidden" name="IdLocalExp" id="IdLocalExp" value="" />
        <input type="hidden" name="NuContadorSub" id="NuContadorSub" value="" />
        <div className="row">
          <div className="col-sm-6 col-xl-6">
            <label className="form-label" htmlFor="forpedcad">Fornecedor</label>
            <div className="input-group">
              <input type="text" id="nomeforpedcad" name="nomeforpedcad" className="form-control input" value="" readOnly />
              <input type="hidden" name="IDFornCad" id="IDFornCad" value="" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-6">
            <label className="form-label" htmlFor="nofab">Fabricante</label>
            <div className="input-group">
              <input type="text" id="fabprodcad" name="fabprodcad" className="form-control" value="" readOnly />
              <input type="hidden" name="IDFabCad" id="IDFabCad" value="" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="noprod">Descrição Produto</label>
            <div className="input-group">
              <input type="text" id="dsprodpedidocad" name="dsprodpedidocad" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="obsprod">Obs Produto</label>
            <div className="input-group">
              <input type="text" id="obsprodpedidocad" name="obsprodpedidocad" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-1">
            <label className="form-label" htmlFor="qtdpedidoprod">QTD</label>
            <div className="input-group">
              <input type="text" id="qtdprodpedidocad" name="qtdprodpedidocad" className="form-control" value="0" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="txtrefer">Ref.</label>
            <div className="input-group">
              <input type="text" id="refprodutocad" name="refprodutocad" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-1">
            <label className="form-label" htmlFor="tpunid">Unid</label>
            <div className="input-group">
              <input type="text" id="unidprodcad" name="unidprodcad" className="form-control" value="" readOnly />
              <input type="hidden" name="IDUnidCad" id="IDUnidCad" value="" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpcor">Cor</label>
            <div className="input-group">
              <select className="select2 form-control" name="corprodcad" id="corprodcad">
                <option value=""> </option>

              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tptecido">Tipo de Tecido</label>
            <div className="input-group">
              <select className="select2 form-control" name="tptecidoprodcad" id="tptecidoprodcad">
                <option value=""> </option>

              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <label className="form-label" htmlFor="tpcat">Categoria Grade</label>
            <div className="input-group">
              <input type="text" id="categoriaprodcad" name="categoriaprodcad" className="form-control" value="" readOnly />
              <input type="hidden" name="IDCategCad" id="IDCategCad" value="" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <label className="form-label" htmlFor="tpestrut">Estrutura</label>
            <div className="input-group">
              <input type="text" id="estruturaprodcad" name="estruturaprodcad" className="form-control" value="" readOnly />
              <input type="hidden" name="IDEstMCad" id="IDEstMCad" value="" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpestilo">Estilos</label>
            <div className="input-group">
              <input type="text" id="estiloprodcad" name="estiloprodcad" className="form-control" value="" readOnly />
              <input type="hidden" name="IDEstCad" id="IDEstCad" value="" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpcatprod">Categorias</label>
            <div className="input-group">
              <input type="text" id="dscategoriasprod" name="dscategoriasprod" className="form-control" value="" readOnly />
              <input type="hidden" name="idcategorias" id="idcategorias" value="" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpcat">Estoque Ideal</label>
            <div className="input-group">
              <input type="number" id="qtdestideal" name="qtdestideal" className="form-control" value="0" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpncm">NCM</label>
            <div className="input-group">
              <select className="select2 form-control" name="idncm" id="idncm">
                <option value=""> </option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <label className="form-label" htmlFor="tpprod">Tipo Produto</label>
            <div className="input-group">
              <select className="select2 form-control" name="idtipoprod" id="idtipoprod">
                <option value=""> </option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <label className="form-label" htmlFor="tpfiscal">Tipo Fiscal</label>
            <div className="input-group">
              <select className="select2 form-control" name="idtipofiscal" id="idtipofiscal">
                <option value=""> </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="vrtotalunit">PRÉVIA DOS PRODUTOS</label>
          </div>
          <div className="col-sm-6 col-xl-8" id="buttonprevia">

          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div id="resultadoprevprod">
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}


{/* <script>
</script> */}
