import React, { Fragment } from "react"


export const ModalCadastro = () => {
  return (

    <Fragment>


      {/* <!-- Modal Adiconar Produtos Avulsos --> */}
      <div className="modal fade" id="addprodutosavulso" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Produtos Avulso
                <small className="m-0 text-muted">
                  Inclusão de Produtos Avulso
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddProdAvulso" name="formAddProdAvulso" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddProdAvulso" name="formAddProdAvulso" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaladdprodavulso">

                </div>
                <div className="modal-footer" id="footeraddprodavulso">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_produto_avulso()">Cadastrar</button> */}
                  <button type="button" className="btn btn-success">Cadastrar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- Modal Editar Produtos Avulsos --> */}
      <div className="modal fade" id="editprodutosavulso" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedidoedit">
                Produtos Avulso
                <small className="m-0 text-muted">
                  Alteração de Produtos Avulso
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddProdAvulsoedit" name="formAddProdAvulsoedit" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddProdAvulsoedit" name="formAddProdAvulsoedit" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaladdprodavulsoedit">

                </div>
                <div className="modal-footer" id="footeraddprodavulsoedit">
                  {/* <button type="button" className="btn btn-success" onclick="editar_produto_avulso()">Salvar</button> */}
                  <button type="button" className="btn btn-success">Salvar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Editar Produtos Pedidos --> */}
      <div className="modal fade" id="editprodutopedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedidoedit">
                Produtos Pedido
                <small className="m-0 text-muted">
                  Alteração de Produtos do Pedido
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddProdPedidoedit" name="formAddProdPedidoedit" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddProdPedidoedit" name="formAddProdPedidoedit" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaladdprodpedidoedit">

                </div>
                <div className="modal-footer" id="footeraddprodpedidoedit">
                  {/* <button type="button" className="btn btn-success" onclick="editar_produto_pedido()">Salvar</button> */}
                  <button type="button" className="btn btn-success" >Salvar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Editar Intens Pedidos --> */}
      <div className="modal fade" id="edititempedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedidoedit">
                Itens do Pedido
                <small className="m-0 text-muted">
                  Alteração de Itens do Pedido
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddItemPedidoedit" name="formAddItemPedidoedit" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddItemPedidoedit" name="formAddItemPedidoedit" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaladditempedidoedit">

                </div>
                <div className="modal-footer" id="footeradditempedidoedit">
                  {/* <button type="button" className="btn btn-success" onclick="editar_item_pedido()">Salvar</button> */}
                  <button type="button" className="btn btn-success" >Salvar</button>
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
            <form id="formAddFornecedor" name="formAddFornecedor" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalfornecedor">

                </div>
                <div className="modal-footer" id="footeraddfornecedor">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_fornecedor(1)">Incluir</button> */}
                  <button type="button" className="btn btn-success" >Incluir</button>
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
            <form id="formAddCondPag" name="formAddCondPag" method="post" encType="multipart/form-data" >
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
                Grupo Extrutura Mercadólogica
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
            <form id="formAddUnidMed" name="formAddUnidMed" method="post" encType="multipart/form-data">
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
            <form id="formAddCores" name="formAddCores" method="post" encType="multipart/form-data" >
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

      {/* <!-- Modal Cores --> */}
      <div className="modal fade" id="Cadextmerc" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Extrutura Mercadológica
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

      {/* <!-- Modal Cadadastro Produtos Pedidos --> */}
      <div className="modal fade" id="CadProdPedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltitulopedido">
                Produtos do Pedido
                <small className="m-0 text-muted">
                  Inclusão e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAddCadProdPed" name="formAddCadProdPed" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAddCadProdPed" name="formAddCadProdPed" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcadprodped">

                </div>
                <div className="modal-footer" id="footeraddcadprodped">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_produto_pedido(1)">Cadastrar</button> */}
                  <button type="button" className="btn btn-success" >Cadastrar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
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

      {/* <!-- Modal NFEs Vinculadas --> */}
      <div className="modal fade" id="alterarVinculoNFEPedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltituloVinculoNFE">
                NFE Vinculadas
                <small className="m-0 text-muted">
                  Exclusão de Vínculo e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="listaNFEPedido">
            </div>
            <div className="modal-footer" id="footerAlterarVinculoNFEPedido">
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Pedidos Vinculados --> */}
      <div className="modal fade" id="alterarVinculoPedidoNFE" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltituloPedidoVinculadoNFE">
                Pedidos Vinculados a NFE
                <small className="m-0 text-muted">
                  Exclusão de Vínculo e Alteração
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="listaPedidoVinculadoNFE">
            </div>
            <div className="modal-footer" id="footerPedidoVinculadoNFE">
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Produtos NFEs Vinculadas --> */}
      <div className="modal fade" id="listaProdutosNFEPedido" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modaltituloVinculoNFE">
                NFEs Vinculadas
                <small className="m-0 text-muted">
                  Conciliação de Produtos
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="tabelaProdutosNFEPedido">
            </div>
            <div className="modal-footer" id="">
              {/* <button id="btnConciliar" type="button" className="btn btn-success btn-xs d-none" value="8" style={{width: "110px"}} onclick="conciliarDadosProdPedProdNFE();"><i className="fal fa-check"></i> CONCILIAR </button> */}
              <button id="btnConciliar" type="button" className="btn btn-success btn-xs d-none" value="8" style={{width: "110px"}} ><i className="fal fa-check"></i> CONCILIAR </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhe Impressão Pedido Compras --> */}
      <div className="modal fade" id="modalImpressaoPedido" tabIndex={-1} role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
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

      {/* <!-- Modal Detalhe Produtos da NFE --> */}
      <div className="modal fade" id="modalListaProdNFE" tabIndex={-1} role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Produtos da Nota Fiscal
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div id="resultadoListaProdNFE">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Etiqueta Produto--> */}
      <div className="modal fade" id="modalImpEtiquetaProd" role="dialog" aria-hidden="true">
        <div id="dialogModaImpEtiquetaProd" className="modal-dialog modal-xl" role="document" style={{alignContent: "center"}}>
          <div id="contentModaImpEtiquetaProd" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                {/* <button id="btnPrint" type="button" className="btn btn-info btn-sm hidden-print p-1 fw-700" title="Imprimir Etiquetas" onclick="impEtiquetaProdutos()"> */}
                <button id="btnPrint" type="button" className="btn btn-info btn-sm hidden-print p-1 fw-700" title="Imprimir Etiquetas" >
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>
              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>

            </div>
            {/* <style>
              .etiqueta-page {
                display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              margin: 10px;
              width: 29cm !important;
              height: 12cm;
              background: white;
              -webkit-box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
              box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
              background-size: cover;
              padding: 2rem 0 0 2rem;
            }

              .etiqueta-card {
                width: calc(33.3% - 0.25in);
              height: 10.5cm;
              margin-right: 20px;
              margin-bottom: 0.5in;
              padding: 60px 25px 10px !important;
              box-sizing: border-box;
              border: 0.5px solid #000;
              display: flex;
              flex-direction: column;
              justify-content: left;
              align-items: left;
            }

              .dsProd{
                height: 200px !important;
            }

              .tamanho{
                border: 1px solid black;
              width: 50px;
              text-align: center;
              padding-top: 10px;
            }

              .preco{
                display: flex !important;
              justify-content: right !important;
              align-items: flex-end !important;
              width: 115px !important;
            }
            </style> */}
            <div className="modal-subheader hidden-print" >

              <hr style={{border: "1px solid"}} />

                <h2 className="modal-title " style={{textAlign: "center"}}>
                  Etiquetas
                </h2>
                <br />
                </div>
                <div className="modal-body p-0 ml-2">
                  <div id="resultadoImpEtiquetaProd" >
                    <div className="etiqueta-page" >
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* <!-- Modal Lista Produtos --> */}
        <div className="modal fade" id="modalListaProdutos" tabIndex={-1} role="dialog" aria-hidden="true" style={{overflow: "hidden auto"}}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 id="tituloListaProdutos" className="modal-title">
                  Visualização de Produtos
                </h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><i className="fal fa-times"></i></span>
                </button>
              </div>
              <div id="resultadoModalListaProdutos" className="modal-body"></div>
              <div id="footerModalListaProdutos" className="modal-footer"></div>
            </div>
          </div>
        </div>

        {/* <!-- Modal Generico --> */}
        <div className="modal fade" id="modalGenerico" tabIndex={-1} role="dialog" aria-hidden="true" style={{overflow: "hidden auto;"}}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 id="tituloGenerico" className="modal-title">

                </h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><i className="fal fa-times"></i></span>
                </button>
              </div>
              <div id="resultadoModalGenerico" className="modal-body"></div>
              <div id="footerModalGenerico" className="modal-footer"></div>
            </div>
          </div>
        </div>
    </Fragment>
  )
}