import { Fragment } from "react"


export const CadastroActionEditItemPedidoModal = () => {
  return (

    <Fragment>

      <div id="resultadoitempedido"></div>

      <div className="form-group">
        <input type="hidden" name="idDetItemPedido" id="idDetItemPedido" value="" />
        <input type="hidden" name="idResItemPedido" id="idResItemPedido" value="" />
        <div className="row">
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="qtdpedidoprod">Quantidade</label>
            <div className="input-group">
              <input type="text" id="qtdprodpedido" name="qtdprodpedido" className="form-control" value="0" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="qtdpedidoprod">QTD Caixas</label>
            <div className="input-group">
              <input type="text" id="qtdcxprodpedido" name="qtdcxprodpedido" className="form-control" value="0" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="txtrefer">Referência</label>
            <div className="input-group">
              <input type="text" id="refproduto" name="refproduto" className="form-control" value="" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="noprod">Descrição Produto</label>
            <div className="input-group">
              <input type="text" id="dsprodpedido" name="dsprodpedido" className="form-control" value="" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tppedido">Categoria Produto</label>
            <div className="input-group">
              {/* <select className="select form-control" name="idtipopedidoedit" id="idtipopedidoedit" readOnly> */}
              <select className="select form-control" name="idtipopedidoedit" id="idtipopedidoedit" >
                <option value="">Selecione...</option>
                <option value="VESTUARIO">VESTUARIO</option>
                <option value="CALCADOS">CALÇADOS</option>
                <option value="ARTIGOS">ARTIGOS</option>
                <option value="ACESSORIOS">ACESSÓRIOS</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-6">
            <label className="form-label" htmlFor="nofab">Fornecedor</label>
            <div className="input-group">
              <input type="text" id="dsfornedit" name="dsfornedit" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="nofab">Fabricante</label>
            <div className="input-group">
              <input type="text" id="dsfabedit" name="dsfabedit" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpunid">Unidade</label>
            <div className="input-group">
              <select className="select form-control" name="unidprod" id="unidprod">
                <option value=""> </option>

              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpcor">Cor</label>
            <div className="input-group">
              <select className="select form-control" name="corprodcad" id="corprodcad">
                <option value=""> </option>

              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tptecidoav">Tipo de Tecido</label>
            <div className="input-group">
              <select className="select form-control" name="tptecidoprodcad" id="tptecidoprodcad">
                <option value=""> </option>

              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <label className="form-label" htmlFor="tpestrut">Estrutura</label>
            <div className="input-group">
              <input type="text" id="dsestredit" name="dsestredit" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="tpestilo">Estilos</label>
            <div className="input-group">
              <input type="text" id="dsestiedit" name="dsestiedit" className="form-control" value="" readOnly />
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <label className="form-label" htmlFor="tpcats">Categorias</label>
            <div className="input-group">
              <select className="select form-control" name="categoriasprod" id="categoriasprod">
                <option value=""> </option>

              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-xl-4">
            <label className="form-label" htmlFor="locexp">Local Exposição</label>
            <div className="input-group">
              <select className="select form-control" name="localexp" id="localexp">
                <option value=""> </option>

              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="ecommercest">E-commerce</label>
            <div className="input-group">
              <select className="select form-control" name="stecommerce" id="stecommerce">
                <option value="True">SIM</option>
                <option value="False">NÃO</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="redesocialst">Rede Social</label>
            <div className="input-group">
              <select className="select form-control" name="stredesocial" id="stredesocial" >
                <option value="True">SIM</option>
                <option value="False">NÃO</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="vrcustounit">Vr Custo</label>
            <div className="input-group">
              <input type="text" id="vrunitcusto" name="vrunitcusto" className="form-control" value="0" />
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <label className="form-label" htmlFor="vrvendunit">Vr Venda</label>
            <div className="input-group">
              <input type="text" id="vrunitvenda" name="vrunitvenda" className="form-control" value="0" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

// <script>
//   $("#vrunitcusto").mask('#.##0,00', {reverse: true});
//   $("#vrunitvenda").mask('#.##0,00', {reverse: true});
// </script>
