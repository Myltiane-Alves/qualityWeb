import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";

const ResumoDashBoardContabilidade = lazy(() => import("../componets/Contabilidade/Components/ResumoContabilidade/ResumoDashBoardContabilidade").then(module => ({ default: module.ResumoDashBoardContabilidade })));
const ActionPesquisaVendasMarca = lazy(() => import("../componets/Contabilidade/Components/ActionVendasMarca/actionPesquisaVendasMarca").then(module => ({ default: module.ActionPesquisaVendasMarca })));
const ActionPesquisaVendasContingencia = lazy(() => import("../componets/Contabilidade/Components/ActionVendas/actionPesquisaVendasContingencia").then(module => ({ default: module.ActionPesquisaVendasContingencia })));
const ActionPesquisaVendasXML = lazy(() => import("../componets/Contabilidade/Components/ActionVendasXML/actionPesquisaVendasXML").then(module => ({ default: module.ActionPesquisaVendasXML })));

export const DashBoardContabilidade = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
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


  let component = null;

  switch (componentToShow) {
    case "/contabilidade/ResumoDashBoardContabilidade":
      component = <ResumoDashBoardContabilidade />;
      break;
    case "/contabilidade/ActionPesquisaVendasMarca":
      component = <ActionPesquisaVendasMarca />;
      break;
    case "/contabilidade/ActionPesquisaVendasContingencia":
      component = <ActionPesquisaVendasContingencia />;
      break;
    case "/contabilidade/ActionPesquisaVendasXML":
      component = <ActionPesquisaVendasXML />;
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
                              {resumoVisivel && !componentToShow && (
                                <ResumoDashBoardContabilidade />
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