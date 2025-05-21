import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"

const ActionPesquisaPromocao = lazy(() => import("../componets/Promocao/ActionPromocao/actionPesquisaPromocao").then(module => ({ default: module.ActionPesquisaPromocao })));


export const DashBoardPromocao = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [componentToShow, setComponentToShow] = useState("");
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);


  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }

 
  let component = null;

  switch (componentToShow) {
    case "/promocoes/ActionPesquisaPromocao":
      component = <ActionPesquisaPromocao  />;
      break;
    default:
      component = null;
      break;
  }


  return (
    <Fragment>

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

    </Fragment>
  )
}