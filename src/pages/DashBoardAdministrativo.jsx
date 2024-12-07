import React, { Fragment, useEffect, useState, Suspense, lazy, } from "react"
import { useNavigate } from "react-router-dom"
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
import { HeaderMain } from "../componets/Header";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
const ResumoDashBoardAdministrativo = lazy(() => import('../componets/Administrativo/ResumoAdministrativo/ResumoDashBoardAdministrativo').then(module => ({ default: module.ResumoDashBoardAdministrativo })));
const ActionPesquisaExtratoContaCorenteLoja = lazy(() => import("../componets/Administrativo/Components/ActionExtratoDeContaCorrente/actionPesquisaExtratoContaCorrenteLoja").then(module => ({ default: module.ActionPesquisaExtratoContaCorenteLoja })));
const ActionPesquisaRecebimentosLoja = lazy(() => import("../componets/Administrativo/Components/ActionListaRecebimentosLoja/actionPesquisaRecebimentosLoja").then(module => ({ default: module.ActionPesquisaRecebimentosLoja })));
const ActionPesquisaVendasMarca = lazy(() => import("../componets/Administrativo/Components/ActionListaVendasMarca/actionPesquisaVendasMarca").then(module => ({ default: module.ActionPesquisaVendasMarca })));
const ActionPesquisaVendasDigitalMarca = lazy(() => import("../componets/Administrativo/Components/ActionVendasDigitalMarca/actionPesquisaVendasDigitalMarca").then(module => ({ default: module.ActionPesquisaVendasDigitalMarca })));
const ActionPesquisaVendasVendedor = lazy(() => import("../componets/Administrativo/Components/ActionVendasVendedor/actionPesquisaVendasVendedor").then(module => ({ default: module.ActionPesquisaVendasVendedor })));
const ActionPesquisaVendasConvenio = lazy(() => import("../componets/Administrativo/Components/ActionListaVendasConvenio/actionPesquisaVendasConvenio").then(module => ({ default: module.ActionPesquisaVendasConvenio })));
const ActionPesquisaVendasCanceladas = lazy(() => import("../componets/Administrativo/Components/ActionVendasCanceladas/actionPesquisaVendasCanceladas").then(module => ({ default: module.ActionPesquisaVendasCanceladas })));
const ActionPesquisaVendasContigencia = lazy(() => import("../componets/Administrativo/Components/ActionVendasContigencia/actionPesquisaVendasContigencia").then(module => ({ default: module.ActionPesquisaVendasContigencia })));
const ActionPesquisaVendasDescontoFuncionario = lazy(() => import("../componets/Administrativo/Components/ActionDescontoFuncionario/actionPesquisaVendasDescontoFuncionario").then(module => ({ default: module.ActionPesquisaVendasDescontoFuncionario })));
const ActionPesquisaQuebraCaixaLoja = lazy(() => import("../componets/Administrativo/Components/ActionQuebraCaixaLoja/actionPesquisaQuebraCaixaLoja").then(module => ({ default: module.ActionPesquisaQuebraCaixaLoja })));

const ActionPesquisaEstoqueLoja = lazy(() => import("../componets/Administrativo/Components/ActionEstoqueLoja/actionPesquisaEstoqueLoja").then(module => ({ default: module.ActionPesquisaEstoqueLoja })));
const ActionPesquisaPrimeiroBalanco = lazy(() => import("../componets/Administrativo/Components/ActionListaPrimeiroBalanco/actionPesquisaPrimeiroBalanco").then(module => ({ default: module.ActionPesquisaPrimeiroBalanco })));
const ActionPesquisaBalancoPorLoja = lazy(() => import("../componets/Administrativo/Components/ActionListaBalancoPorLoja/actionPesquisaBalancoPorLoja").then(module => ({ default: module.ActionPesquisaBalancoPorLoja })));
const ActionPesquisaBalancoAvulso = lazy(() => import("../componets/Administrativo/Components/ActionListaBalancoAvulso/actionPesquisaBalancoAvulso").then(module => ({ default: module.ActionPesquisaBalancoAvulso })));
const ActionPesquisaAlterarVendaVendedor = lazy(() => import("../componets/Administrativo/Components/ActionAlterarVendaVendedor/actionPesquisaAlterarVendaVendedor").then(module => ({ default: module.ActionPesquisaAlterarVendaVendedor })));
const ActionPesquisaVendas = lazy(() => import("../componets/Administrativo/Components/ActionVendas/actionPesquisaVendas").then(module => ({ default: module.ActionPesquisaVendas })));
const ActionPesquisaProdutosPreco = lazy(() => import("../componets/Administrativo/Components/ActionProdutoPreco/actionPesquisaProdutosPreco").then(module => ({ default: module.ActionPesquisaProdutosPreco })));
const ActionPesquisaVendasVouchers = lazy(() => import("../componets/Administrativo/Components/ActionVendasVouchers/actionPesquisaVendasVouchers").then(module => ({ default: module.ActionPesquisaVendasVouchers })));
const ActionPesquisaConsultaVouchers = lazy(() => import("../componets/Administrativo/Components/ActionConsultaVoucher/actionPesquisaConsultaVouchers").then(module => ({ default: module.ActionPesquisaConsultaVouchers })));
const ActionPesquisaVoucherResumido = lazy(() => import("../componets/Administrativo/Components/ActionVoucherResumido/actionPesquisaVoucherResumido").then(module => ({ default: module.ActionPesquisaVoucherResumido })));
const ActionPesquisaAlteracaoPreco = lazy(() => import("../componets/Administrativo/Components/ActionAlteracaoPreco/actionPesquisaAlteracaoPreco").then(module => ({ default: module.ActionPesquisaAlteracaoPreco })));


export const DashBoardAdministrativo = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
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
    case "/administrativo/ResumoDashBoardAdministrativo":
      component = <ResumoDashBoardAdministrativo />;
      break;
    case "/administrativo/ActionPesquisaExtratoContaCorenteLoja":
      component = <ActionPesquisaExtratoContaCorenteLoja />;
      break;
    case "/administrativo/ActionPesquisaRecebimentosLoja":
      component = <ActionPesquisaRecebimentosLoja />;
      break;
    case "/administrativo/ActionPesquisaVendasMarca":
      component = <ActionPesquisaVendasMarca />;
      break;
    case "/administrativo/ActionPesquisaVendasDigitalMarca":
      component = <ActionPesquisaVendasDigitalMarca />;
      break;
    case "/administrativo/ActionPesquisaVendasVendedor":
      component = <ActionPesquisaVendasVendedor />;
      break;
    case "/administrativo/ActionPesquisaVendasConvenio":
      component = <ActionPesquisaVendasConvenio />;
      break;
    case "/administrativo/ActionPesquisaBalancoPorLoja":
      component = <ActionPesquisaBalancoPorLoja />;
      break;
    case "/administrativo/ActionPesquisaBalancoAvulso":
      component = <ActionPesquisaBalancoAvulso />;
      break;
    case "/administrativo/ActionPesquisaProdutosPreco":
      component = <ActionPesquisaProdutosPreco />;
      break;
    case "/administrativo/ActionPesquisaAlterarVendaVendedor":
      component = <ActionPesquisaAlterarVendaVendedor />;
      break;
    case "/administrativo/ActionPesquisaQuebraCaixaLoja":
      component = <ActionPesquisaQuebraCaixaLoja />;
      break;
    case "/administrativo/ActionPesquisaVendas":
      component = <ActionPesquisaVendas />;
      break;
    case "/administrativo/ActionPesquisaConsultaVouchers":
      component = <ActionPesquisaConsultaVouchers />;
      break;
    case "/administrativo/ActionPesquisaVoucherResumido":
      component = <ActionPesquisaVoucherResumido />;
      break;
    case "/administrativo/ActionPesquisaEstoqueLoja":
      component = <ActionPesquisaEstoqueLoja />;
      break;
    case "/administrativo/ActionPesquisaVendasCanceladas":
      component = <ActionPesquisaVendasCanceladas />;
      break;
    case "/administrativo/ActionPesquisaVendasContigencia":
      component = <ActionPesquisaVendasContigencia />;
      break;
    case "/administrativo/ActionPesquisaVendasDescontoFuncionario":
      component = <ActionPesquisaVendasDescontoFuncionario />
      break;
    case "/administrativo/ActionPesquisaPrimeiroBalanco":
      component = <ActionPesquisaPrimeiroBalanco />
      break;
    case "/administrativo/ActionPesquisaAlteracaoPreco":
      component = <ActionPesquisaAlteracaoPreco />;
      break;
    case "/administrativo/ActionPesquisaVendasVouchers":
      component = <ActionPesquisaVendasVouchers />;
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
                                <ResumoDashBoardAdministrativo />
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