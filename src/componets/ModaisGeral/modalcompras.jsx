import React, { Fragment } from "react"


export const ModalCompras = () => {
  return (

    <Fragment>


      {/* <!-- Modal Adiconar Produtos no Pedido --> */}
      <div className="modal fade" id="addprodutospedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Pedido
                <small className="m-0 text-muted">
                  Inclusão de Itens do Pedido
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddProdPedido" name="formAddProdPedido" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddProdPedido" name="formAddProdPedido" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaladdprodpedido">

                </div>
                <div className="modal-footer" id="footeraddprodpedido">
                  {/* <button type="button" className="btn btn-success" onclick="incluir_produto_pedido()">Incluir</button> */}
                  <button type="button" className="btn btn-success" >Incluir</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Vinculo Fabricante Fornecedor --> */}
      <div className="modal fade" id="CadVincFabForn" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Vínculo Fabricante / Fornecedor
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddVincFabForn" name="formAddVincFabForn" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddVincFabForn" name="formAddVincFabForn" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalvincfabforn">

                </div>
                <div className="modal-footer" id="footeraddvincfabforn">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_vinc_fabforn(1)">Incluir</button> */}
                  <button type="button" className="btn btn-success" >Incluir</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Fabricante --> */}
      <div className="modal fade" id="Cadfabricante" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Fabricantes
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddFabricante" name="formAddFabricante" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddFabricante" name="formAddFabricante" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalfabricante">

                </div>
                <div className="modal-footer" id="footeraddfabricante">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_fabricante(1)">Incluir</button> */}
                  <button type="button" className="btn btn-success" >Incluir</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Fornecedor --> */}
      <div className="modal fade" id="Cadfornecedor" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Fornecedores
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddFornecedor" name="formAddFornecedor" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddFornecedor" name="formAddFornecedor" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalfornecedor">

                </div>
                <div className="modal-footer" id="footeraddfornecedor">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_fornecedor(1)">Incluir</button> */}
                  <button type="button" className="btn btn-success">Incluir</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Transportador --> */}
      <div className="modal fade" id="Cadtransportador" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Transportador
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddTransportador" name="formAddTransportador" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddTransportador" name="formAddTransportador" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaltransportador">

                </div>
                <div className="modal-footer" id="footeraddtransportador">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Condição Pagamento --> */}
      <div className="modal fade" id="Cadcondpag" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Condições de Pagamento
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddCondPag" name="formAddCondPag" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddCondPag" name="formAddCondPag" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalcondpaq">

                </div>
                <div className="modal-footer" id="footeraddcondpag">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Categoria Pedidos --> */}
      <div className="modal fade" id="Cadcatpedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Categoria de Pedidos
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddCatPed" name="formAddCatPed" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddCatPed" name="formAddCatPed" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalcatped">

                </div>
                <div className="modal-footer" id="footeraddcatped">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Grupo Extrutura Mercadologica --> */}
      <div className="modal fade" id="Cadgrupoext" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Grupo Estrutura Mercadológica
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddGrupoExt" name="formAddGrupoExt" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddGrupoExt" name="formAddGrupoExt" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalgrupoext">

                </div>
                <div className="modal-footer" id="footeraddgrupoext">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Unidade Medida --> */}
      <div className="modal fade" id="Cadunidmed" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Unidades de Medida
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddUnidMed" name="formAddUnidMed" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddUnidMed" name="formAddUnidMed" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalunidmed">

                </div>
                <div className="modal-footer" id="footeraddunidmed">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cores --> */}
      <div className="modal fade" id="Cadcores" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Cores
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddCores" name="formAddCores" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddCores" name="formAddCores" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalcores">

                </div>
                <div className="modal-footer" id="footeraddcores">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Estrutura Mercadologica --> */}
      <div className="modal fade" id="Cadextmerc" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Estrutura Mercadológica
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddExtMerc" name="formAddExtMerc" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddExtMerc" name="formAddExtMerc" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalextmerc">

                </div>
                <div className="modal-footer" id="footeraddextmerc">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Estilos --> */}
      <div className="modal fade" id="Cadestilos" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltituloestilo">
                Estilos
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddEstilos" name="formAddEstilos" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddEstilos" name="formAddEstilos" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalestilos">

                </div>
                <div className="modal-footer" id="footeraddestilos">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Tecidos --> */}
      <div className="modal fade" id="Cadtecidos" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulotecidos">
                Tipos de Tecidos
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddTecidos" name="formAddTecidos" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddTecidos" name="formAddTecidos" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaltecidos">

                </div>
                <div className="modal-footer" id="footeraddtecidos">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhe Pedido Compras --> */}
      <div className="modal fade" id="modaldetalhepedido" tabIndex={-1} role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe do Pedido de Compra
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetalhePedido" name="formDetalhePedido" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetalhePedido" name="formDetalhePedido" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodaldetalhepedido">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhe Impressão Pedido Compras --> */}
      <div className="modal fade" id="modalImpressaoPedido" tabIndex={-1} role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-xl" role="document" style={{ left: "-10%" }}>
          <div className="modal-content" style={{ width: "1500px" }}>
            <div className="modal-header">
              <h4 className="modal-title">
                Impressão Pedido
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div id="resultadoImpressaoPedidos">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhe Promoção --> */}
      <div className="modal fade" id="modaldetalhepromocao" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulodetalhepromo">

              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetalhePromocao" name="formDetalhePromocao" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetalhePromocao" name="formDetalhePromocao" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodaldetalhepromocao">

                </div>
                <div className="modal-footer" id="footerdetalhepromocao">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal GEnerico Compras --> */}
      <div className="modal fade" id="modalGenerico" tabIndex={-1} role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title modalGenericoTitle">

              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadoModalGenerico">
            </div>
            <div id="footerModalGenerico">
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}