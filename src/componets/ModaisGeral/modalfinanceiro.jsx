import React, { Fragment } from "react"


export const ModalFinanceiro = () => {
  return (

    <Fragment>

      {/* <!-- Modal Cadastro Despesas--> */}
      <div className="modal fade" id="cadDespesa" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Despesa da Loja
                <small className="m-0 text-muted">
                  Cadastrar Despesas da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDespesaLoja" name="formDespesaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDespesaLoja" name="formDespesaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldespesa">

                </div>
                <div className="modal-footer" id="footerdespesa">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_despesa()">Cadastrar Despesa</button> */}
                  <button type="button" className="btn btn-success">Cadastrar Despesa</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Depositos--> */}
      <div className="modal fade" id="cadDeposito" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Depósito da Loja
                <small className="m-0 text-muted">
                  Cadastrar Depósitos da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDepositoLoja" name="formDepositoLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDepositoLoja" name="formDepositoLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldeposito">

                </div>
                <div className="modal-footer" id="footerdeposito">
                  {/* <!--<button type="button" className="btn btn-success" onclick="cadastrar_deposito()">Cadastrar Depósito</button> */}
                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>--> */}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Faturas--> */}
      <div className="modal fade" id="cadFatura" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Fatura da Loja
                <small className="m-0 text-muted">
                  Recebimento de Faturas da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formFaturaLoja" name="formFaturaLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formFaturaLoja" name="formFaturaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalfatura">

                </div>
                <div className="modal-footer" id="footerfatura">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_fatura()">Receber Fatura</button> */}
                  <button type="button" className="btn btn-success">Receber Fatura</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhar Venda--> */}
      <div className="modal fade" id="detVenda" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-dialog-right modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe da Venda
                <small className="m-0 text-muted">
                  Relação de Produtos da Venda
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetVenda" name="formDetVenda" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVenda" name="formDetVenda" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaldetvenda">

                </div>
                <div className="modal-footer" id="footerdetvenda">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhar Recebimento--> */}
      <div className="modal fade" id="detVendaRecebimento" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe da Venda
                <small className="m-0 text-muted">
                  Relação de Recebimentos da Venda
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetVendaRecebimento" name="formDetVendaRecebimento" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVendaRecebimento" name="formDetVendaRecebimento" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldetvendarecebimento">

                </div>
                <div className="modal-footer" id="footerdetvendarecebimento">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cancelar Venda--> */}
      <div className="modal fade" id="cancelVenda" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Cancelamento da Vendas
                <small className="m-0 text-muted">
                  As Vendas só poderão ser canceladas até 24 depois de ser emitida
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formCancelVenda" name="formCancelVenda" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCancelVenda" name="formCancelVenda" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcancelvenda">

                </div>
                <div className="modal-footer" id="footercancelvenda">
                  {/* <button type="button" className="btn btn-success" onclick="cancelar_vendas()">Cancelar Venda</button> */}
                  <button type="button" className="btn btn-success" >Cancelar Venda</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Fechamento Caixa Lojas--> */}
      <div className="modal fade" id="fechamentoLojas" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe de Fechamento
                <small className="m-0 text-muted">
                  Relação de Recebimentos do Fechamento da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formFechamentoLoja" name="formFechamentoLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formFechamentoLoja" name="formFechamentoLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalfechamentoloja">

                </div>
                <div className="modal-footer" id="footerfechamentoloja">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cancela Deposito Loja--> */}
      <div className="modal fade" id="cancelDepositoLoja" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Depositos da loja
                <small className="m-0 text-muted">
                  Cancelar Deposito da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formCancelaDepositoLoja" name="formCancelaDepositoLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCancelaDepositoLoja" name="formCancelaDepositoLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulModalCancelaDepositoLoja">

                </div>
                <div className="modal-footer" id="footerCancelaDepositoLoja">
                  {/* <button id="buttoncanceladepositoloja" type="button" className="btn btn-success" onclick="cancela_deposito_loja()">Confirmar Cancelamento</button> */}
                  <button id="buttoncanceladepositoloja" type="button" className="btn btn-success" >Confirmar Cancelamento</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhe Vendas Recebimentos Lojas--> */}
      <div className="modal fade" id="vendaRecebimentoLojas" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe de Vendas dos Recebimentos
                <small className="m-0 text-muted">
                  Relação das Vendas
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formVendaRecebimentoLoja" name="formVendaRecebimentoLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formVendaRecebimentoLoja" name="formVendaRecebimentoLoja" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalvendarecebimentoloja">

                </div>
                <div className="modal-footer" id="footervendarecebimentoloja">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Ajuste Extrato--> */}
      <div className="modal fade" id="cadAjusteExtrato" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Ajuste da Loja
                <small className="m-0 text-muted">
                  Cadastrar Ajustes de Extrato da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formAjusteExtratoLoja" name="formAjusteExtratoLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAjusteExtratoLoja" name="formAjusteExtratoLoja" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalajusteextrato">

                </div>
                <div className="modal-footer" id="footerajusteextrato">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_ajuste_extrato()">Cadastrar Ajuste</button> */}
                  <button type="button" className="btn btn-success">Cadastrar Ajuste</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>


      {/* <!-- Modal Imprimir Quebra--> */}
      <div className="modal fade" id="imprimiDadosQuebra" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title TituloModalImprimir">
                Impressão de Recibos
                <small className="m-0 text-muted">
                  Imprimir Quebra de Caixa
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formImprimirQuebra" name="formImprimirQuebra" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formImprimirQuebra" name="formImprimirQuebra" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalimprimirquebra">

                </div>
                <div className="modal-footer" id="footerimprimirquebra">
                  {/* <button id="buttonimprimirquebra" type="button" className="btn btn-success" onclick="imprimir_dados_quebra()">Confirmar Impressão</button> */}
                  <button id="buttonimprimirquebra" type="button" className="btn btn-success" >Confirmar Impressão</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Depositos Bonificacao--> */}
      <div className="modal fade" id="cadDepositoBonificacao" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Depósito Funcionário
                <small className="m-0 text-muted">
                  Cadastrar Depósitos Bonificação Funcionário
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDepositoBonificacao" name="formDepositoBonificacao" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDepositoBonificacao" name="formDepositoBonificacao" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldepositoBonificacao">

                </div>
                <div className="modal-footer" id="footerdepositoBonificacao">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_deposito_bonificacao()">Cadastrar</button> */}
                  <button type="button" className="btn btn-success" >Cadastrar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Funcionario--> */}
      <div className="modal fade" id="cadFuncionario" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Funcionário
                <small className="m-0 text-muted">
                  Cadastrar ou Atualizar informações do Funcionário
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formFuncionario" name="formFuncionario" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formFuncionario" name="formFuncionario" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="NotificacaoModalFuncionario">

                </div>
                <div className="modal-body" id="resulmodalfuncionario">

                </div>
                <div className="modal-footer" id="footerfuncionario">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_funcionario()">Atualizar</button> */}
                  <button type="button" className="btn btn-success" >Atualizar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
