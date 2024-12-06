import { useNavigate, } from "react-router-dom";
import React, { Fragment, useEffect, useState, Suspense, lazy, } from "react"
import { HeaderMain } from "../componets/Header";
import { MenuButton } from "../componets/Buttons/menuButton";
import { FooterMain } from "../componets/Footer";
import { SidebarProvider } from "../componets/Sidebar/SidebarContext";
import { MenuSidebarAdmin } from "../componets/Sidebar/sidebar";



const ResumoDashBoardFinaneiro = lazy(() => import('../componets/Financeiro/Components/ResumoFinanceiro/ResumoDashBoardFinanceiro').then(module => ({ default: module.ResumoDashBoardFinaneiro })));
const ActionPesquisaVendasLoja = lazy(() => import('../componets/Financeiro/Components/ActionVendasLoja/actionPesquisaVendasLoja').then(module => ({ default: module.ActionPesquisaVendasLoja })));
const ActionPesquisaVendasMarca = lazy(() => import('../componets/Financeiro/Components/ActionListaVendasMarca/actionPesquisaVendasMarca').then(module => ({ default: module.ActionPesquisaVendasMarca })));
const ActionPesquisaVendasDigital = lazy(() => import('../componets/Financeiro/Components/ActionVendasDigital/actionPesquisaVendasDigital').then(module => ({ default: module.ActionPesquisaVendasDigital })));
const ActionPesquisaVendasPix = lazy(() => import('../componets/Financeiro/Components/ActionListaVendasPix/actionPesquisaVendasPix').then(module => ({ default: module.ActionPesquisaVendasPix })));
const ActionPesquisaVendasConciliacao = lazy(() => import('../componets/Financeiro/Components/ActionVendasConciliacao/actionPesquisaVendasConciliacao').then(module => ({ default: module.ActionPesquisaVendasConciliacao })));
const ActionPesquisaDepositosLoja = lazy(() => import('../componets/Financeiro/Components/ActionDepositoLoja/actionPesquisaDepositosLoja').then(module => ({ default: module.ActionPesquisaDepositosLoja })));
const ActionPesquisaDespesaLoja = lazy(() => import('../componets/Financeiro/Components/ActionListaDespesasLoja/actionPesquisaDespesaLoja').then(module => ({ default: module.ActionPesquisaDespesaLoja })));
const ActionPesquisaRecebimentosLoja = lazy(() => import('../componets/Financeiro/Components/ActionRecebimentosLoja/actionPesquisaRecebimentosLoja').then(module => ({ default: module.ActionPesquisaRecebimentosLoja })));
const ActionPesquisaQuebraCaixaLoja = lazy(() => import('../componets/Financeiro/Components/ActionQuebraCaixaLoja/actionPesquisaQuebraCaixaLoja').then(module => ({ default: module.ActionPesquisaQuebraCaixaLoja })));
const ActionPesquisaAdiantamentoSalarioLoja = lazy(() => import('../componets/Financeiro/Components/ActionAdiantamentoSalarioLoja/actionPesquisaAdiantamentoSalarioLoja').then(module => ({ default: module.ActionPesquisaAdiantamentoSalarioLoja })));
const ActionPesquisaMapaCaixa = lazy(() => import('../componets/Financeiro/Components/ActionMapaCaixa/actionPesquisaMapaCaixa').then(module => ({ default: module.ActionPesquisaMapaCaixa })));
const ActionPesquisaExtratoLoja = lazy(() => import('../componets/Financeiro/Components/ActionExtratoLoja/actionPesquisaExtratoLoja').then(module => ({ default: module.ActionPesquisaExtratoLoja })));
const ActionPesquisaConciliarBanco = lazy(() => import('../componets/Financeiro/Components/ActionPesquisaConciliarBanco/actionPesquisaConciliarBanco').then(module => ({ default: module.ActionPesquisaConciliarBanco })));
const ActionPesquisaRemessaVenda = lazy(() => import('../componets/Financeiro/Components/ActionRemessaVenda/actionPesquisaRemessaVenda').then(module => ({ default: module.ActionPesquisaRemessaVenda })));
const ActionPesquisaCaixaStatus = lazy(() => import('../componets/Financeiro/Components/ActionCaixaStatus/actionPesquisaCaixaStatus').then(module => ({ default: module.ActionPesquisaCaixaStatus })));
const ActionPesquisaDescontoVendas = lazy(() => import('../componets/Financeiro/Components/ActionPesquisaDescontoVendas/actionPesquisaDescontoVendas').then(module => ({ default: module.ActionPesquisaDescontoVendas })));
const ActionPesquisaExtratoMovimentoBonificacao = lazy(() => import('../componets/Financeiro/Components/ActionMovimentosBonificação/actionPesquisaExtratoMovimentoBonificacao').then(module => ({ default: module.ActionPesquisaExtratoMovimentoBonificacao })));
const ActionPesquisaPedidoCompra = lazy(() => import('../componets/Financeiro/Components/ActionPedidosCompra/actionPesquisaPedidoCompra').then(module => ({ default: module.ActionPesquisaPedidoCompra })));
const ActionPesquisaConciliacaoBancosDTW = lazy(() => import('../componets/Financeiro/Components/ActionPesquisaConciliacaoBancosDTW/actionPesquisaConciliacaoBancosDTW').then(module => ({ default: module.ActionPesquisaConciliacaoBancosDTW })));
const ActionPesquisaFaturasVendasPixDTW = lazy(() => import('../componets/Financeiro/Components/ActionFaturaVendasPixDTW/actionPesquisaVendasPixDTW').then(module => ({ default: module.ActionPesquisaFaturasVendasPixDTW })));
const ActionPesquisaVendasPixDTW = lazy(() => import('../componets/Financeiro/Components/ActionListaVendasFaturaPixDTW/actionPesquisaVendasPixDTW').then(module => ({ default: module.ActionPesquisaVendasPixDTW })));
const ActionPesquisaFaturasLoja = lazy(() => import('../componets/Financeiro/Components/ActionFaturasLoja/actionPesquisaFaturasLoja').then(module => ({ default: module.ActionPesquisaFaturasLoja })));
const ActionPesquisaSaldoLoja = lazy(() => import('../componets/Financeiro/Components/ActionListaSaldoLoja/actionPesquisaSaldoLoja').then(module => ({ default: module.ActionPesquisaSaldoLoja })));
const ActionPesquisaEmpresas = lazy(() => import('../componets/Financeiro/Components/ActionEmpresas/actionPesquisaEmpresas').then(module => ({ default: module.ActionPesquisaEmpresas })));
const ActionPesquisaMotivoDevolucao = lazy(() => import('../componets/Financeiro/Components/ActionMotivoDevolucao/actionPesquisaMotivoDevolucao').then(module => ({ default: module.ActionPesquisaMotivoDevolucao })));

export const DashBoardFinanceiro = ({ }) => {
  const [resumoVisivel, setResumoVisivel] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [componentToShow, setComponentToShow] = useState("");

  const navigate = useNavigate();
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
  }, []);



  useEffect(() => {
    

  }, [usuarioLogado])

  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }

  let component = null;

  switch (componentToShow) {
    case "/financeiro/ResumoDashBoardFinaneiro":
      component = <ResumoDashBoardFinaneiro />
      break;
    case "/financeiro/ActionPesquisaVendasLoja":
      component = <ActionPesquisaVendasLoja />
      break;
    case "/financeiro/ActionPesquisaVendasMarca":
      component = <ActionPesquisaVendasMarca />
      break;
    case "/financeiro/ActionPesquisaVendasDigital":
      component = <ActionPesquisaVendasDigital />
      break;
    case "/financeiro/ActionPesquisaVendasPix":
      component = <ActionPesquisaVendasPix />
      break;
    case "/financeiro/ActionPesquisaVendasConciliacao":
      component = <ActionPesquisaVendasConciliacao />
      break;
    case "/financeiro/ActionPesquisaDepositosLoja":
      component = <ActionPesquisaDepositosLoja />
      break;
    case "/financeiro/ActionPesquisaDespesaLoja":
      component = <ActionPesquisaDespesaLoja />
      break;
    case "/financeiro/ActionPesquisaRecebimentosLoja":
      component = <ActionPesquisaRecebimentosLoja />
      break;
    case "/financeiro/ActionPesquisaQuebraCaixaLoja":
      component = <ActionPesquisaQuebraCaixaLoja />
      break;
    case "/financeiro/ActionPesquisaAdiantamentoSalarioLoja":
      component = <ActionPesquisaAdiantamentoSalarioLoja />
      break;
    case "/financeiro/ActionPesquisaMapaCaixa":
      component = <ActionPesquisaMapaCaixa />
      break;
    case "/financeiro/ActionPesquisaExtratoLoja":
      component = <ActionPesquisaExtratoLoja />
      break;
    case "/financeiro/ActionPesquisaConciliarBanco":
      component = <ActionPesquisaConciliarBanco />
      break;
    case "/financeiro/ActionPesquisaRemessaVenda":
      component = <ActionPesquisaRemessaVenda />
      break;
    case "/financeiro/ActionPesquisaCaixaStatus":
      component = <ActionPesquisaCaixaStatus />
      break;
    case "/financeiro/ActionPesquisaDescontoVendas":
      component = <ActionPesquisaDescontoVendas />
      break;
    case "/financeiro/ActionPesquisaExtratoMovimentoBonificacao":
      component = <ActionPesquisaExtratoMovimentoBonificacao />
      break;
    case "/financeiro/ActionPesquisaPedidoCompra":
      component = <ActionPesquisaPedidoCompra />
      break;
    case "/financeiro/ActionPesquisaConciliacaoBancosDTW":
      component = <ActionPesquisaConciliacaoBancosDTW />
      break;
    case "/financeiro/ActionPesquisaVendasPixDTW":
      component = <ActionPesquisaVendasPixDTW />
      break;
    case "/financeiro/ActionPesquisaFaturasVendasPixDTW":
      component = <ActionPesquisaFaturasVendasPixDTW />
      break;
    case "/financeiro/ActionPesquisaFaturasLoja":
      component = <ActionPesquisaFaturasLoja />
      break;
    case "/financeiro/ActionPesquisaSaldoLoja":
      component = <ActionPesquisaSaldoLoja />
      break;
    case "/financeiro/ActionPesquisaEmpresas":
      component = <ActionPesquisaEmpresas />
      break;
    case "/financeiro/ActionPesquisaMotivoDevolucao":
      component = <ActionPesquisaMotivoDevolucao />
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

                          <Suspense fallback={<div>Carregando...</div>}>
                            {resumoVisivel && !componentToShow && <ResumoDashBoardFinaneiro />}
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


