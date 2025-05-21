import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { useQuery } from "react-query";
import { get } from "../api/funcRequest";

const ActionPesquisaPromocao = lazy(() => import("../componets/Promocao/ActionPromocao/actionPesquisaPromocao").then(module => ({ default: module.ActionPesquisaPromocao })));

export const DashBoardPromocao = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [componentToShow, setComponentToShow] = useState("");
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
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
  const permissaoUsuario = selectedModule.menuPai.menuFilho;
  const {   
    ID, 
  } = permissaoUsuario[0] || {};

  let component = null;

  switch (componentToShow) {
    case "/promocoes/ActionPesquisaPromocao":
      component = <ActionPesquisaPromocao usuarioLogado={usuarioLogado} ID={ID} />;
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
    
              <div className="page-content-wrapper">
     

                <main id="js-page-content" role="main" className="page-content">
                  <div className="row">
                    <div className="col-xl-12">
                      <div id="panel-1" className="panel">
                        <div className="panel-container show">
                          <div className="panel-content">
                            <Suspense fallback={<div>Loading...</div>}>
                              {actionVisivel && !resumoVisivel && !componentToShow && (
                                <ActionPesquisaPromocao/>

                              )}

                              {componentToShow && component}
                            </Suspense>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>

              </div>
            </div>
          </div>
        </SidebarProvider>
      )}
    </Fragment>
  )
}