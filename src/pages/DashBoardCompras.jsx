import React, { Fragment, useEffect, useState, Suspense, lazy, } from "react"
import { useNavigate } from "react-router-dom"
import { FooterMain } from "../componets/Footer";
import { MenuButton } from "../componets/Buttons/menuButton";
import { HeaderMain } from "../componets/Header";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
const ComprasActionListaDistribuicaoMercadoria = lazy(() => import("../componets/Compras/comprasActionListaDistribuicaoMercadoria").then(module => ({ default: module.ComprasActionListaDistribuicaoMercadoria })));
const ComprasFornecedor = lazy(() => import("../componets/Compras/Components/ActionFonecedores/comprasFornecedor").then(module => ({ default: module.ComprasFornecedor })));
const ComprasFabricante = lazy(() => import("../componets/Compras/Components/ActionFabricantes/comprasFabricante").then(module => ({ default: module.ComprasFabricante })));
const PesquisaCondicaoPagamento = lazy(() => import("../componets/Compras/Components/ActionCondicaoPagamentos/pesquisaCondicaoPagamento").then(module => ({ default: module.PesquisaCondicaoPagamento })));
const ActionPDFPedidoResumido = lazy(() => import("../componets/Compras/Components/ActionHome/comprasActionPDFPedidoResumido").then(module => ({ default: module.ActionPDFPedidoResumido })));
const ActionPDFPedidoDetalhado = lazy(() => import("../componets/Compras/Components/ActionHome/comprasActionPDFPedidoDetalhado").then(module => ({ default: module.ActionPDFPedidoDetalhado })));
const ActionPesquisaProduto = lazy(() => import("../componets/Compras/Components/ActionImagemProduto/ActionPesquisaProduto").then(module => ({ default: module.ActionPesquisaProduto })));
const PesquisaTransportador = lazy(() => import("../componets/Compras/Components/ActionTransportador/pesquisaTransportador").then(module => ({ default: module.PesquisaTransportador })));
const PesquisaGrupoEstrutura = lazy(() => import("../componets/Compras/Components/ActionGrupoEstrutura/pesquisaGrupoEstrutura").then(module => ({ default: module.PesquisaGrupoEstrutura })));
const ActionPesquisaSubGrupoEstrutura = lazy(() => import("../componets/Compras/Components/ActionSubGrupoEstrutura/pesquisaSubGrupoEstrutura").then(module => ({ default: module.ActionPesquisaSubGrupoEstrutura })));
const ActionPesquisaUnidadeMedida = lazy(() => import("../componets/Compras/Components/ActionUnidadeMedida/pesquisaUnidadeMedida").then(module => ({ default: module.ActionPesquisaUnidadeMedida })));
const ActionPesquisaEstilos = lazy(() => import("../componets/Compras/Components/ActionEstilos/actionPesquisaEstilos").then(module => ({ default: module.ActionPesquisaEstilos })));
const ActionPesquisaCores = lazy(() => import("../componets/Compras/Components/ActionCores/actionPesquisaCores").then(module => ({ default: module.ActionPesquisaCores })));
const ActionPesquisaTiposTecidos = lazy(() => import("../componets/Compras/Components/ActionTipoTecidos/actionPesquisaTipoTecidos").then(module => ({ default: module.ActionPesquisaTiposTecidos })));
const ActionPesquisaCategoriaPedido = lazy(() => import("../componets/Compras/Components/ActionCategoriaPedido/actionPesquisaCategoriaPedido").then(module => ({ default: module.ActionPesquisaCategoriaPedido })));
const ActionPesquisaNovoPedido = lazy(() => import("../componets/Compras/Components/ActionNovoPedido/actionPesquisaNovoPedido").then(module => ({ default: module.ActionPesquisaNovoPedido })));
const ActionPesquisaHome = lazy(() => import("../componets/Cadastro/Components/ActionHome/actionPesquisaHome").then(module => ({ default: module.ActionPesquisaHome })));

export const DashBoardCompras = ({ }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [componentToShow, setComponentToShow] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);

      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {

      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {

  }, [usuarioLogado]);

  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }


  let component = null;

  switch (componentToShow) {
    case "/compras/ActionPesquisaHome":
      component = <ActionPesquisaHome />
      break;
    case "/compras/ActionPesquisaNovoPedido":
      component = <ActionPesquisaNovoPedido />;
      break;
    case "/compras/ActionPesquisaProduto":
      component = <ActionPesquisaProduto />;
      break;
    case "/compras/ComprasActionListaDistribuicaoMercadoria":
      component = <ComprasActionListaDistribuicaoMercadoria />;
      break;
    case "/compras/ComprasFornecedor":
      component = <ComprasFornecedor />;
      break;
    case "/compras/ComprasFabricante":
      component = <ComprasFabricante />;
      break;

    case "/compras/PesquisaTransportador":
      component = <PesquisaTransportador />;
      break;
    case "/compras/PesquisaCondicaoPagamento":
      component = <PesquisaCondicaoPagamento />;
      break;
    case "/compras/ActionPesquisaCategoriaPedido":
      component = <ActionPesquisaCategoriaPedido />;
      break;
    case "/compras/PesquisaGrupoEstrutura":
      component = <PesquisaGrupoEstrutura />;
      break;
    case "/compras/ActionPesquisaSubGrupoEstrutura":
      component = <ActionPesquisaSubGrupoEstrutura />;
      break;
    case "/compras/ActionPesquisaUnidadeMedida":
      component = <ActionPesquisaUnidadeMedida />;
      break;
    case "/compras/ActionPesquisaCores":
      component = <ActionPesquisaCores />;
      break;
    case "/compras/ActionPesquisaEstilos":
      component = <ActionPesquisaEstilos />;
      break;
    case "/compras/ActionPesquisaTiposTecidos":
      component = <ActionPesquisaTiposTecidos />;
      break;
    case "/compras/ActionPDFPedidoResumido":
      component = <ActionPDFPedidoResumido />
      break;
    case "/compras/ActionPDFPedidoDetalhado":
      component = <ActionPDFPedidoDetalhado />
      break;
    default:
      component = null;
      break;
  }


  return (

    <Fragment>
      {usuarioLogado && (
        <SidebarProvider>

          <div className="page-wrapper">
            <div className="page-inner">
              <MenuSidebarAdmin
                componentToShow={componentToShow}
                handleShowComponent={handleShowComponent}
              />
              <div className="page-content-wrapper">
                <HeaderMain />

                <main id="js-page-content" role="main" className="page-content">
                  <div className="row">
                    <div className="col-xl-12">
                      <div id="panel-1" className="panel">
                        <div className="panel-container show">
                          <div className="panel-content">
                            <Suspense fallback={<div>Loading...</div>}>
                              <ActionPesquisaHome />
                              {componentToShow && component}
                            </Suspense>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>

                <Fragment>
                  <MenuButton />
                  <FooterMain />
                </Fragment>
              </div>
            </div>
          </div>
        </SidebarProvider>
      )}

    </Fragment>
  )
}
