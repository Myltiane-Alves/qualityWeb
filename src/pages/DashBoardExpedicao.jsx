import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
const ActionPesquisaFaturamentoOT = lazy(() => import("../componets/Expedicao/Components/ActionFaturamentoOT/actionPesquisaFaturamentoOT").then(module => ({ default: module.ActionPesquisaFaturamentoOT })));
const ActionPesquisaOT = lazy(() => import("../componets/Expedicao/Components/ActionExpedicaoOrdemTransferencia/ActionPesquisaOT").then(module => ({ default: module.ActionPesquisaOT })));

export const DashBoardExpedicao = ({ }) => {
  const [actionVisivel, setActionVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
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
        setUsuarioLogado(parsedUsuario);
        // console.log(parsedUsuario, 'dashboardAdministrativo');
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
    case "/expedicao/ActionPesquisaOT":
      component = <ActionPesquisaOT />;
      break;
    case "/expedicao/ActionPesquisaFaturamentoOT":
      component = <ActionPesquisaFaturamentoOT />
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
                            {actionVisivel && !componentToShow && <ActionPesquisaOT />}
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