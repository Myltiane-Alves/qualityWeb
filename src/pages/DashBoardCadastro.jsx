import React, { Fragment, useEffect, useState,Suspense, lazy, } from "react"
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
import { get } from "../api/funcRequest";
import { useQuery } from "react-query";

const ActionPesquisaHome = lazy(() => import("../componets/Cadastro/Components/ActionHome/actionPesquisaHome").then(module => ({ default: module.ActionPesquisaHome })));
const ActionPesquisaNFE = lazy(() => import("../componets/Cadastro/Components/ActionNotasFiscais/actionPesquisaNotasNFE").then(module => ({ default: module.ActionPesquisaNFE })));
const ActionPesquisaProdutosAvulso = lazy(() => import("../componets/Cadastro/Components/ActionProdutosAvulso/actionPesquisaProdutosAvulso").then(module => ({ default: module.ActionPesquisaProdutosAvulso })));
const ActionPesquisaEstilos = lazy(() => import("../componets/Cadastro/Components/ActionEstilos/actionPesquisaEstilos").then(module => ({ default: module.ActionPesquisaEstilos })));
const ActionPesquisaAlteracaoPreco = lazy(() => import("../componets/Cadastro/Components/ActionAlteracaoPrecoProduto/actionPesquisaAlteracaoPreco").then(module => ({ default: module.ActionPesquisaAlteracaoPreco })));
const ActionPesquisaProdutoEtiqueta = lazy(() => import("../componets/Cadastro/Components/ActionProdutoEtiqueta/actionPesquisaProdutoEtiqueta").then(module => ({ default: module.ActionPesquisaProdutoEtiqueta })));
const ActionPesquisaPreco = lazy(() => import("../componets/Cadastro/Components/ActionListaPreco/actionPesquisaPreco").then(module => ({ default: module.ActionPesquisaPreco })));

export const DashBoardCadastro = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
  const [resumoVisivel, setResumoVisivel] = useState(true);
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

  // case "/cadastro/ReceberNFePedido":
  //   component = <CadastroActionProdutosAvulso />;
  //   break;
  switch (componentToShow) {
    case "/cadastro/ActionPesquisaHome":
      component = < ActionPesquisaHome />;
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
      component = <ActionPesquisaPreco />;
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