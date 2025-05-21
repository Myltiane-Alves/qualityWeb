import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
import { get } from "../api/funcRequest";
import { useQuery } from "react-query";
const InformaticaActionHome = lazy(() => import("../componets/Informatica/Components/ActionHome/informaticaActionHome").then(module => ({ default: module.InformaticaActionHome })));
const ActionPesquisaVendas = lazy(() => import("../componets/Informatica/Components/ActionListaVendas/actionPequisaVendas").then(module => ({ default: module.ActionPesquisaVendas })));
const ActionPesquisaFuncionarios = lazy(() => import("../componets/Informatica/Components/ActionFuncionarios/actionPesquisaFuncionarios").then(module => ({ default: module.ActionPesquisaFuncionarios })));
const ActionPesquisaProdutosPreco = lazy(() => import("../componets/Informatica/Components/ActionProdutoPreco/actionPesquisaProdutosPreco").then(module => ({ default: module.ActionPesquisaProdutosPreco })));
const ActionPesquisaVendasAlloc = lazy(() => import("../componets/Informatica/Components/ActionVendasAlloc/actionPesquisaVendasAlloc").then(module => ({ default: module.ActionPesquisaVendasAlloc })));
const ActionPesquisaVendasContigencia = lazy(() => import("../componets/Informatica/Components/ActionVendasContigencia/actionPesquisaVendasContigencia").then(module => ({ default: module.ActionPesquisaVendasContigencia })));
const ActionPesquisaCliente = lazy(() => import("../componets/Informatica/Components/ActionCliente/actionPesquisaCliente").then(module => ({ default: module.ActionPesquisaCliente })));
const ActionPesquisaExportarDadosCSVCredSystem = lazy(() => import("../componets/Informatica/Components/ActionExportarDadosCSV/actionPesquisaExportarDadosCSVCredSystem").then(module => ({ default: module.ActionPesquisaExportarDadosCSVCredSystem })));
const ActionPesquisaLinkRelatorioBi = lazy(() => import("../componets/Informatica/Components/ActionLinkRelatorioBI/actionPesquisaLinkRelatorioBI").then(module => ({ default: module.ActionPesquisaLinkRelatorioBi })));
const ActionPesquisaRelatorioBI = lazy(() => import("../componets/Informatica/Components/ActionRelatorioBI/actionPesquisaRelatorioBI").then(module => ({ default: module.ActionPesquisaRelatorioBI })));
const ActionPesquisaDuplicarPermissao = lazy(() => import("../componets/Informatica/Components/ActionPermissao/actionPesquisaPerfilPermissao").then(module => ({ default: module.ActionPesquisaPerfilPermissao })));

export const DashBoardInformatica = () => {
  const [actionVisivel, setActionVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
  const [componentToShow, setComponentToShow] = useState("");
  const navigate = useNavigate();

  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {

  }, [usuarioLogado]);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario',
    async () => {
      const response = await get(`/menus-usuario?idUsuario=${usuarioLogado?.id}&idModulo=${selectedModule?.id}`);
      
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 5 * 60 * 1000, }
  );

  let component = null;

  switch (componentToShow) {
    case "/informatica/InformaticaActionHome":
      component = <InformaticaActionHome />;
      break;
    case "/informatica/ActionPesquisaVendas":
      component = <ActionPesquisaVendas />;
      break;
    case "/informatica/ActionPesquisaFuncionarios":
      component = <ActionPesquisaFuncionarios />;
      break;
    case "/informatica/ActionPesquisaProdutosPreco":
      component = <ActionPesquisaProdutosPreco />;
      break;
    case "/informatica/ActionPesquisaVendasAlloc":
      component = <ActionPesquisaVendasAlloc />;
      break;
    case "/informatica/ActionPesquisaVendasContigencia":
      component = <ActionPesquisaVendasContigencia />;
      break;
    case "/informatica/ActionPesquisaCliente":
      component = <ActionPesquisaCliente />;
      break;
    case "/informatica/ActionPesquisaExportarDadosCSVCredSystem":
      component = <ActionPesquisaExportarDadosCSVCredSystem />;
      break;
    case "/informatica/ActionPesquisaRelatorioBI":
      component = <ActionPesquisaRelatorioBI />;
      break;
    case "/informatica/ActionPesquisaLinkRelatorioBi":
      component = <ActionPesquisaLinkRelatorioBi />;
      break;
    case "/informatica/ActionPesquisaDuplicarPermissao":
      component = <ActionPesquisaDuplicarPermissao />;
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
            <HeaderMain optionsModulos={optionsModulos}/>

            <main id="js-page-content" role="main" className="page-content">
              <div className="row">
                <div className="col-xl-12">
                  <div id="panel-1" className="panel">
                    <div className="panel-container show">
                      <div className="panel-content">
                        <Suspense fallback={<div>Loading...</div>}>
                        {actionVisivel && !componentToShow && (<InformaticaActionHome />)}

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
