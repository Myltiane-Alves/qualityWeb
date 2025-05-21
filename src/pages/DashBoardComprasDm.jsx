import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom";
import { FooterMain } from "../componets/Footer";
import { MenuButton } from "../componets/Buttons/menuButton";
import { HeaderMain } from "../componets/Header";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { useQuery } from "react-query";
import { get } from "../api/funcRequest";
const ActionComprasADMHome = lazy(() => import("../componets/ComprasADM/Components/ActionHome/actionComprasHome").then(module => ({ default: module.ActionComprasADMHome })));
const ActionPesquisaDistribuicaoHistorico = lazy(() => import("../componets/ComprasADM/Components/ActionDistribuicaoHistorico/actionPesquisaDistribuicaoHistorico").then(module => ({ default: module.ActionPesquisaDistribuicaoHistorico })));
const ActionPesquisaProduto = lazy(() => import("../componets/ComprasADM/Components/ActionImagemProduto/ActionPesquisaProduto").then(module => ({ default: module.ActionPesquisaProduto })));
const ActionPesquisaPromocao = lazy(() => import("../componets/ComprasADM/Components/ActionPromocoes/actionPesquisaPromocao").then(module => ({ default: module.ActionPesquisaPromocao })));

export const DashBoardComprasDM = () => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [componentToShow, setComponentToShow] = useState("");
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
  
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

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario',
    async () => {
      const response = await get(`/menus-usuario?idUsuario=${usuarioLogado?.id}&idModulo=${selectedModule?.id}`);
      
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 5 * 60 * 1000, }
  );

  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }

  let component = null;

  switch (componentToShow) {
    case "/comprasadm/ActionComprasADMHome":
      component = <ActionComprasADMHome />
      break;
    case "/comprasadm/ActionPesquisaDistribuicaoHistorico":
      component = <ActionPesquisaDistribuicaoHistorico />
      break;
    case "/comprasadm/ActionPesquisaPromocao":
      component = <ActionPesquisaPromocao />
      break;
    case "/comprasadm/ActionPesquisaProduto":
      component = <ActionPesquisaProduto />
      break;
    default:
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
                              {actionVisivel && !resumoVisivel && !componentToShow && (
                                <ActionComprasADMHome />
                              )}

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
