import React, { Fragment, useEffect, useState, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";

const ResumoDashBoardGerencia = lazy(() => import("../componets/Gerencia/ResumoGerencia/ResumoDashBoardGerencia").then(module => ({ default: module.ResumoDashBoardGerencia })));
const ActionPesquisaProdutosQuality = lazy(() => import("../componets/Gerencia/Components/ActionProdutosQuality/actionPesquisaProdutosQuality").then(module => ({ default: module.ActionPesquisaProdutosQuality })));
const ActionPesquisaProdutosSap = lazy(() => import("../componets/Gerencia/Components/ActionProdutosSAP/actionPesquisaProdutosSap").then(module => ({ default: module.ActionPesquisaProdutosSap })));
const ActionPesquisaAdiantamentoSalarioLoja = lazy(() => import("../componets/Gerencia/Components/ActionAdiantamentoSalario/actionPesquisaAdiantamentoSalarioLoja").then(module => ({ default: module.ActionPesquisaAdiantamentoSalarioLoja })));
const ActionPesquisaDepositoLoja = lazy(() => import("../componets/Gerencia/Components/ActionDepositoLoja/actionPesquisaDepositoLoja").then(module => ({ default: module.ActionPesquisaDepositoLoja })));
const ActionPesquisaDespesaLoja = lazy(() => import("../componets/Gerencia/Components/ActionDespesas/actionPesquisaDespesasLoja").then(module => ({ default: module.ActionPesquisaDespesaLoja })));
const ActionPesquisaValeTransporte = lazy(() => import("../componets/Gerencia/Components/ActionValeTransporte/actionPesquisaValeTransporte").then(module => ({ default: module.ActionPesquisaValeTransporte })));
const ActionPesquisaConferenciaCaixa = lazy(() => import("../componets/Gerencia/Components/ActionConferenciaCaixa/actionPesquisaConferenciaCaixa").then(module => ({ default: module.ActionPesquisaConferenciaCaixa })));
const ActionPesquisaFaturaLoja = lazy(() => import("../componets/Gerencia/Components/ActionFaturas/actionPesquisaFaturaLoja").then(module => ({ default: module.ActionPesquisaFaturaLoja })));
const ActionPesquisaCreateVoucher = lazy(() => import("../componets/Gerencia/Components/ActionCreateVoucher/actionPesquisaCreateVoucher").then(module => ({ default: module.ActionPesquisaCreateVoucher })));
const ActionPesquisaVoucherEmitido = lazy(() => import("../componets/Gerencia/Components/ActionVoucher/actionPesquisaVoucheEmitidosr").then(module => ({ default: module.ActionPesquisaVoucherEmitido })));
const ActionPesquisaQuebraCaixa = lazy(() => import("../componets/Gerencia/Components/ActionQuebraCaixaLoja/actionPesquisaQuebraCaixa").then(module => ({ default: module.ActionPesquisaQuebraCaixa })));
const ActionPesquisaOT = lazy(() => import("../componets/Gerencia/Components/ActionOrdemTransferencia/actionPesquisaOT").then(module => ({ default: module.ActionPesquisaOT })));
const ActionPesquisaAlteracaoPreco = lazy(() => import("../componets/Gerencia/Components/ActionAlteracaoPreco/actionPesquisaAlteracaoPreco").then(module => ({ default: module.ActionPesquisaAlteracaoPreco })));
const ActionPesquisaClientesVendas = lazy(() => import("../componets/Gerencia/Components/ActionClientesVendas/actionPesquisaClientesVendas").then(module => ({ default: module.ActionPesquisaClientesVendas })));
const ActionPesquisaExtratoContaCorenteLoja = lazy(() => import("../componets/Gerencia/Components/ActionExtratoDeContaCorrente/actionPesquisaExtratoContaCorrenteLoja").then(module => ({ default: module.ActionPesquisaExtratoContaCorenteLoja })));
const ActionPesquisaRecebimentosLoja = lazy(() => import("../componets/Gerencia/Components/ActionListaRecebimentosLoja/actionPesquisaRecebimentosLoja").then(module => ({ default: module.ActionPesquisaRecebimentosLoja })));
const ActionPesquisaVendasLojas = lazy(() => import("../componets/Gerencia/Components/ActionVendasLojas/actionPesquisaVendasLojas").then(module => ({ default: module.ActionPesquisaVendasLojas })));
const ActionPesquisaVendasVendedor = lazy(() => import("../componets/Gerencia/Components/ActionVendasVendedor/actionPesquisaVendasVendedor").then(module => ({ default: module.ActionPesquisaVendasVendedor })));
const ActionPesquisaVendasEstrutura = lazy(() => import("../componets/Gerencia/Components/ActionEstruturaMercadologica/actionPesquisaVendasEstrutura").then(module => ({ default: module.ActionPesquisaVendasEstrutura })));
const ActionRelatorioBI = lazy(() => import("../componets/Gerencia/Components/ActionBI/actionRelatorioBI").then(module => ({ default: module.ActionRelatorioBI })));
const ActionPesquisaVendasDescontoFuncionario = lazy(() => import("../componets/Gerencia/Components/ActionDescontoFuncionario/actionPesquisaVendasDescontoFuncionario").then(module => ({ default: module.ActionPesquisaVendasDescontoFuncionario })));
const ActionPesquisaEstoqueLoja = lazy(() => import("../componets/Gerencia/Components/ActionEstoqueLoja/actionPesquisaEstoqueLoja").then(module => ({ default: module.ActionPesquisaEstoqueLoja })));
const ActionPesquisaBalancoLoja = lazy(() => import("../componets/Gerencia/Components/ActionBalancoPorLoja/actionPesquisaBalancoLoja").then(module => ({ default: module.ActionPesquisaBalancoLoja })));
const ActionPesquisaEmpresas = lazy(() => import("../componets/Gerencia/Components/ActionEmpresas/actionPesquisaEmpresas").then(module => ({ default: module.ActionPesquisaEmpresas })));
const ActionPesquisaVendaVoucher = lazy(() => import("../componets/Gerencia/Components/ActionVendaVoucher/actionPesquisaVendaVoucher").then(module => ({ default: module.ActionPesquisaVendaVoucher })));

export const DashBoardGerencia = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(true);
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


  let component = null;

  switch (componentToShow) {
    case "/gerencia/ActionTesteExemplo":
      component = <ActionTesteExemplo />;
      break;
    case "/gerencia/ResumoDashBoardGerencia":
      component = <ResumoDashBoardGerencia />;
      break;
    case "/gerencia/ActionPesquisaProdutosQuality":
      component = <ActionPesquisaProdutosQuality />;
      break;
    case "/gerencia/ActionPesquisaProdutosSap":
      component = <ActionPesquisaProdutosSap />;
      break;
    case "/gerencia/ActionPesquisaAdiantamentoSalarioLoja":
      component = <ActionPesquisaAdiantamentoSalarioLoja />
      break;
    case "/gerencia/ActionPesquisaDepositoLoja":
      component = <ActionPesquisaDepositoLoja />
      break;
    case "/gerencia/ActionPesquisaDespesaLoja":
      component = <ActionPesquisaDespesaLoja />
      break;
    case "/gerencia/ActionPesquisaValeTransporte":
      component = <ActionPesquisaValeTransporte />
      break;
    case "/gerencia/ActionPesquisaConferenciaCaixa":
      component = <ActionPesquisaConferenciaCaixa />
      break;
    case "/gerencia/ActionPesquisaFaturaLoja":
      component = <ActionPesquisaFaturaLoja />
      break;
    case "/gerencia/ActionPesquisaCreateVoucher":
      component = <ActionPesquisaCreateVoucher />
      break;
    case "/gerencia/ActionPesquisaVoucherEmitido":
      component = <ActionPesquisaVoucherEmitido />
      break;
    case "/gerencia/ActionPesquisaQuebraCaixa":
      component = <ActionPesquisaQuebraCaixa />
      break;
    case "/gerencia/ActionPesquisaOT":
      component = <ActionPesquisaOT />
      break;
    case "/gerencia/ActionExtratoDeContasCorrenteLoja":
      component = <ActionPesquisaExtratoContaCorenteLoja />
      break;
    case "/gerencia/ActionPesquisaRecebimentosLoja":
      component = <ActionPesquisaRecebimentosLoja />
      break;
    case "/gerencia/ActionPesquisaVendasLojas":
      component = <ActionPesquisaVendasLojas />
      break;
    case "/gerencia/ActionPesquisaVendasVendedor":
      component = <ActionPesquisaVendasVendedor />
      break;
    case "/gerencia/ActionPesquisaVendasEstrutura":
      component = <ActionPesquisaVendasEstrutura />
      break;
    case "/gerencia/ActionPesquisaEstoqueLoja":
      component = <ActionPesquisaEstoqueLoja />
      break;
    case "/gerencia/ActionRelatorioBI":
      component = <ActionRelatorioBI />
      break;
    case "/gerencia/ActionPesquisaAlteracaoPreco":
      component = <ActionPesquisaAlteracaoPreco />
      break;
    case "/gerencia/ActionPesqVendaVoucher":
      component = <ActionPesqVendaVoucher />
      break;
    case "/gerencia/ActionPesquisaEmpresas":
      component = <ActionPesquisaEmpresas />
      break;
    case "/gerencia/ActionPesquisaClientesVendas":
      component = <ActionPesquisaClientesVendas />
      break;
    case "/gerencia/ActionPesquisaVendasDescontoFuncionario":
      component = <ActionPesquisaVendasDescontoFuncionario />
      break;
    case "/gerencia/ActionPesquisaBalancoLoja":
      component = <ActionPesquisaBalancoLoja />
      break;
    case "/gerencia/ActionPesquisaVendaVoucher":
      component = <ActionPesquisaVendaVoucher />
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
                                <ResumoDashBoardGerencia />
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
