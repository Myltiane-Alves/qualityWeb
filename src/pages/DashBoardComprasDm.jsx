import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom";
import { FooterMain } from "../componets/Footer";
import { MenuButton } from "../componets/Buttons/menuButton";
import { HeaderMain } from "../componets/Header";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
const ActionComprasADMHome = lazy(() => import("../componets/ComprasADM/Components/ActionHome/actionComprasHome").then(module => ({ default: module.ActionComprasADMHome })));
const ActionPesquisaDistribuicaoHistorico = lazy(() => import("../componets/ComprasADM/Components/ActionDistribuicaoHistorico/actionPesquisaDistribuicaoHistorico").then(module => ({ default: module.ActionPesquisaDistribuicaoHistorico })));
const ActionPesquisaProdutoImagem = lazy(() => import("../componets/ComprasADM/Components/ActionImagemProduto/ActionPesquisaProdutoImagem").then(module => ({ default: module.ActionPesquisaProdutoImagem })));
const ActionPesquisaPromocao = lazy(() => import("../componets/ComprasADM/Components/ActionPromocoes/actionPesquisaPromocao").then(module => ({ default: module.ActionPesquisaPromocao })));

export const DashBoardComprasDM = ({}) => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
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
    case "/comprasadm/ActionComprasADMHome":
      component = <ActionComprasADMHome />
      break;
    case "/comprasadm/ActionPesquisaDistribuicaoHistorico":
      component = <ActionPesquisaDistribuicaoHistorico />
      break;
    case "/comprasadm/ActionPesquisaPromocao":
      component = <ActionPesquisaPromocao />
      break;
    case "/comprasadm/ActionPesquisaProdutoImagem":
      component = <ActionPesquisaProdutoImagem />
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
                <HeaderMain />

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
