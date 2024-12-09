import React, { Fragment, useEffect, useState,Suspense, lazy, } from "react"
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";

const ActionPesquisaHome = lazy(() => import("../componets/Cadastro/Components/ActionHome/actionPesquisaHome").then(module => ({ default: module.ActionPesquisaHome })));
const ActionPesquisaNFE = lazy(() => import("../componets/Cadastro/Components/ActionNotasFiscais/actionPesquisaNostasNFE").then(module => ({ default: module.ActionPesquisaNFE })));
const ActionPesquisaProdutosAvulso = lazy(() => import("../componets/Cadastro/Components/ActionProdutosAvulso/actionPesquisaProdutosAvulso").then(module => ({ default: module.ActionPesquisaProdutosAvulso })));
const ActionPesquisaEstilos = lazy(() => import("../componets/Cadastro/Components/ActionEstilos/actionPesquisaEstilos").then(module => ({ default: module.ActionPesquisaEstilos })));
const ActionPesquisaAlteracaoPreco = lazy(() => import("../componets/Cadastro/Components/ActionAlteracaoPrecoProduto/actionPesquisaAlteracaoPreco").then(module => ({ default: module.ActionPesquisaAlteracaoPreco })));
const ActionPesquisaProdutoEtiqueta = lazy(() => import("../componets/Cadastro/Components/ActionProdutoEtiqueta/actionPesquisaProdutoEtiqueta").then(module => ({ default: module.ActionPesquisaProdutoEtiqueta })));

export const DashBoardCadastro = ({ }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const navigate = useNavigate();
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
  const [resumoVisivel, setResumoVisivel] = useState(true);
  const [componentToShow, setComponentToShow] = useState("");

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
      // Navegar para a tela de login se não houver usuário armazenado
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // console.log(usuarioLogado, 'dashboardAdministrativo');
  }, [usuarioLogado]);

  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }


  let component = null;

  switch (componentToShow) {
    case "/cadastro/ActionPesquisaHome":
      component = < ActionPesquisaHome />;
      break;
    case "/cadastro/ReceberNFePedido":
      component = <CadastroActionProdutosAvulso />;
      break;
    case "/cadastro/ActionPesquisaProdutosAvulso":
      component = <ActionPesquisaProdutosAvulso />;
      break;
    case "/cadastro/ActionPesquisaEstilos":
      component = <ActionPesquisaEstilos />;
      break;
    case "/cadastro/ActionPesquisaNFE":
      component = <ActionPesquisaNFE />;
      break;
    case "/cadastro/ActionPesquisaProdutoEtiqueta":
      component = <ActionPesquisaProdutoEtiqueta />;
      break;

    case "/cadastro/ActionPesquisaAlteracaoPreco":
      component = <ActionPesquisaAlteracaoPreco />;
      break;
    case "/cadastro/ActionPesquisaPreco":
      component;
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
                            {resumoVisivel && !componentToShow && (

                              <ActionPesquisaHome />
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