import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
const InputField = lazy(() => import("../componets/Buttons/Input").then(module => ({ default: module.InputField })));
const ButtonSearch = lazy(() => import("../componets/Buttons/ButtonSearch").then(module => ({ default: module.ButtonSearch })));
const ActionMain = lazy(() => import("../componets/Actions/actionMain").then(module => ({ default: module.ActionMain })));
const ActionPesquisaVendasDigitalMarca = lazy(() => import("../componets/Markerting/Components/ActionVendasDigitais/ActionPesquisaVendasDigitalMarca").then(module => ({ default: module.ActionPesquisaVendasDigitalMarca })));
const ActionPesquisaPromocao = lazy(() => import("../componets/Markerting/Components/ActionListaPromocao/actionPesquisaPromocao").then(module => ({ default: module.ActionPesquisaPromocao })));
const ActionPesquisaCampanha = lazy(() => import("../componets/Markerting/Components/ActionCampanha/actionPesquisaCampanha").then(module => ({ default: module.ActionPesquisaCampanha })));
const ActionPesquisaCliente = lazy(() => import("../componets/Markerting/Components/ActionCliente/actionPesquisaCliente").then(module => ({ default: module.ActionPesquisaCliente })));

export const DashBoardMarketing = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [clickContador, setClickContador] = useState(0);
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

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setResumoVisivel(false)
    } else {
      setResumoVisivel(true)
    }
  }

  let component = null;

  switch (componentToShow) {
    case "/marketing/ActionPesquisaVendasDigitalMarca":
      component = <ActionPesquisaVendasDigitalMarca />;
      break;
    case "/marketing/ActionPesquisaPromocao":
      component = <ActionPesquisaPromocao />;
      break;
    case "/marketing/ActionPesquisaCampanha":
      component = <ActionPesquisaCampanha />;
      break;
    case "/marketing/ActionPesquisaCliente":
      component = <ActionPesquisaCliente />;
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
                              {actionVisivel && !resumoVisivel && !componentToShow && (
                                <ActionPesquisaVendasDigitalMarca />

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