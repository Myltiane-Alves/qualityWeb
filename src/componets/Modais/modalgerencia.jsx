import React, { Fragment } from "react"


export const ModalGerencia = () => {
  return (

    <Fragment>


      {/* <!-- Modal Cadastro Despesas-->
      <div className="modal fade" id="cadDespesa" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formDespesaLoja" name="formDespesaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formDespesaLoja" name="formDespesaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldespesa">

                </div>
                <div className="modal-footer" id="footerdespesa">
                  <button id="buttoncaddespesa" type="button" className="btn btn-success" onclick="cadastrar_despesa()">Cadastrar Despesa</button>
                  <button id="buttoncaddespesa" type="button" className="btn btn-success">Cadastrar Despesa</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Update Despesas-->
      <div className="modal fade" id="editDespesa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Despesa da Loja
                <small className="m-0 text-muted">
                  Editar Despesas da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formEditDespesaLoja" name="formEditDespesaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formEditDespesaLoja" name="formEditDespesaLoja" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaleditdespesa">

                </div>
                <div className="modal-footer" id="footerdespesa">
                  <button id="buttoneditdespesa" type="button" className="btn btn-success" onclick="ajustar_despesa()">Editar Despesa</button>
                  <button id="buttoneditdespesa" type="button" className="btn btn-success" >Editar Despesa</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cadastro Vale Transporte-->
      <div className="modal fade" id="cadValeTransp" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Vale Transporte da Loja
                <small className="m-0 text-muted">
                  Cadastrar Vale Transporte da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formValeTranspLoja" name="formValeTranspLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formValeTranspLoja" name="formValeTranspLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalvaletransp">

                </div>
                <div className="modal-footer" id="footervaletransp">
                  <button id="buttoncadvaletransp" type="button" className="btn btn-success" onclick="cadastrar_vale_transporte()">Cadastrar Vale Transporte</button>
                  <button id="buttoncadvaletransp" type="button" className="btn btn-success" >Cadastrar Vale Transporte</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cadastro Depositos-->
      <div className="modal fade" id="cadDeposito" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formDepositoLoja" name="formDepositoLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formDepositoLoja" name="formDepositoLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldeposito">

                </div>
                <div className="modal-footer" id="footerdeposito">
                  <button id="buttoncaddeposito" type="button" className="btn btn-success" onclick="cadastrar_deposito()">Cadastrar Depósito</button>
                  <button id="buttoncaddeposito" type="button" className="btn btn-success">Cadastrar Depósito</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cadastro Faturas-->
      <div className="modal fade" id="cadFatura" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formFaturaLoja" name="formFaturaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formFaturaLoja" name="formFaturaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalfatura">

                </div>
                <div className="modal-footer" id="footerfatura">
                  <button type="button" className="btn btn-success" onclick="cadastrar_fatura_caixa()">Receber Fatura</button>
                  <button type="button" className="btn btn-success" >Receber Fatura</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Detalhar Venda-->
      <div className="modal fade" id="detVenda" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header" id="cabdetvenda">
              <h4 className="modal-title">
                VENDA
                <small className="m-0 text-muted">
                  Detalhes da Venda
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formDetVenda" name="formDetVenda" method="post" encType="multipart/form-data" onsubmit="return false;">
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
      </div> */}

      {/* <!-- Modal Detalhar Venda Produto-->
      <div className="modal fade" id="detVendaproduto" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
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
            <form id="formDetVendaProduto" name="formDetVendaProduto" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formDetVendaProduto" name="formDetVendaProduto" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldetvendaproduto">

                </div>
                <div className="modal-footer" id="footerdetvendaproduto">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Detalhar Recebimento-->
      <div className="modal fade" id="detVendaRecebimento" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formDetVendaRecebimento" name="formDetVendaRecebimento" method="post" encType="multipart/form-data" onsubmit="return false;">
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
      </div> */}

      {/* <!-- Modal Cancelar Venda-->
      <div className="modal fade" id="cancelVenda" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formCancelVenda" name="formCancelVenda" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formCancelVenda" name="formCancelVenda" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcancelvenda">

                </div>
                <div className="modal-footer" id="footercancelvenda">
                  <button type="button" className="btn btn-success" onclick="cancelar_vendas()">Cancelar Venda</button>
                  <button type="button" className="btn btn-success" >Cancelar Venda</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cadastrar Adiantamento Salario-->
      <div className="modal fade" id="CadadiantamentoSalario" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Adiantamento de Salário
                <small className="m-0 text-muted">
                  Lançar Adiantamento de Salário
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaladiantamentosalario">

                </div>
                <div className="modal-footer" id="footeradiantamentosalario">
                  <button id="buttonadiantamentosal" type="button" className="btn btn-success" onclick="cadastrar_adiantamento()">Cadastrar</button>
                  <button id="buttonadiantamentosal" type="button" className="btn btn-success" >Cadastrar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cadastro Quebra de Caixa-->
      <div className="modal fade" id="cadQuebraCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Lançar Quebra de Caixa da Loja
                <small className="m-0 text-muted">
                  Cadastrar Quebra de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formQuebraCaixaLoja" name="formQuebraCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formQuebraCaixaLoja" name="formQuebraCaixaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalquebracaixa">

                </div>
                <div className="modal-footer" id="footerquebracaixa">
                  <button id="buttoncadquebracaixa" type="button" className="btn btn-success" onclick="cadastrar_quebra_caixa()">Cadastrar Quebra de Caixa</button>
                  <button id="buttoncadquebracaixa" type="button" className="btn btn-success">Cadastrar Quebra de Caixa</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Ajuste Movimento de Caixa-->
      <div className="modal fade" id="ajusteMovCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Movimento de Caixa da Loja
                <small className="m-0 text-muted">
                  Ajustar Movimento de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formAjusteMovCaixaLoja" name="formAjusteMovCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formAjusteMovCaixaLoja" name="formAjusteMovCaixaLoja" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalajustemovcaixa">

                </div>
                <div className="modal-footer" id="footerajustemovcaixa">
                  <button id="buttonajustemovcaixa" type="button" className="btn btn-success" onclick="ajustar_mov_caixa()">Ajustar Movimentação do Caixa</button>
                  <button id="buttonajustemovcaixa" type="button" className="btn btn-success" >Ajustar Movimentação do Caixa</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Imprimir-->
      <div className="modal fade" id="imprimiDados" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title TituloModalImprimir">
                Impressão de Recibos
                <small className="m-0 text-muted">
                  Imprimir Despesa
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formImprimir" name="formImprimir" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formImprimir" name="formImprimir" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalimprimir">

                </div>
                <div className="modal-footer" id="footerimprimir">
                  <button id="buttonimprimir" type="button" className="btn btn-success" onclick="imprimir_dados()">Confirmar Impressão</button>
                  <button id="buttonimprimir" type="button" className="btn btn-success" >Confirmar Impressão</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Imprimir Quebra-->
      <div className="modal fade" id="imprimiDadosQuebra" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formImprimirQuebra" name="formImprimirQuebra" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formImprimirQuebra" name="formImprimirQuebra" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalimprimirquebra">

                </div>
                <div className="modal-footer" id="footerimprimirquebra">
                  <button id="buttonimprimirquebra" type="button" className="btn btn-success" onclick="imprimir_dados_quebra()">Confirmar Impressão</button>
                  <button id="buttonimprimirquebra" type="button" className="btn btn-success" >Confirmar Impressão</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cancela Fatura Caixa-->
      <div className="modal fade" id="cancelFaturaCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Faturas dos Caixas
                <small className="m-0 text-muted">
                  Cancelar Fatura de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formCancelaFaturaCaixaLoja" name="formCancelaFaturaCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formCancelaFaturaCaixaLoja" name="formCancelaFaturaCaixaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcancelafaturacaixa">

                </div>
                <div className="modal-footer" id="footercancelafaturacaixa">
                  <button id="buttoncancelafaturacaixa" type="button" className="btn btn-success" onclick="cancela_fatura_caixa()">Confirmar Cancelamento</button>
                  <button id="buttoncancelafaturacaixa" type="button" className="btn btn-success" >Confirmar Cancelamento</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Edita Fatura Caixa-->
      <div className="modal fade" id="editeFaturaCaixa" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Faturas dos Caixas
                <small className="m-0 text-muted">
                  Editar Fatura de Caixa da Loja
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formEditeFaturaCaixaLoja" name="formEditeFaturaCaixaLoja" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formEditeFaturaCaixaLoja" name="formEditeFaturaCaixaLoja" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaleditefaturacaixa">

                </div>
                <div className="modal-footer" id="footereditefaturacaixa">
                  <button id="buttoneditefaturacaixa" type="button" className="btn btn-success" onclick="editar_fatura_caixa()">Confirmar Alteração</button>
                  <button id="buttoneditefaturacaixa" type="button" className="btn btn-success">Confirmar Alteração</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Ordem de Transferência -->
      <div className="modal fade" id="ot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadoot">

            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Conferir Ordem de Transferência -->
      <div className="modal fade" id="cot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Conferir Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadocot">

            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Ordem de Transferência Pesquisar Produto -->
      <div className="modal fade" id="abrirpesqproduto" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Pesquisar Produto
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6 col-xl-10">
                  <label className="form-label" htmlFor="pesqProduto">Informe a Descrição ou Código de Barras do Produto</label>
                  <div className="input-group">
                    <input type="text" id="pesqProduto" name="pesqProduto" className="form-control input" value="" />&nbsp;&nbsp;

                    <button className="btn btn-primary" type="button" onclick="pesquisarProduto()">
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" id="resultado">

            </div>

          </div>
        </div>
      </div> */}

      {/* <!-- Modal Conferir Ordem de Transferência Pesquisar Produto -->
      <div className="modal fade" id="conferirabrirpesqproduto" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Pesquisar Produto
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6 col-xl-10">
                  <label className="form-label" htmlFor="pesqProduto">Informe a Descrição ou Código de Barras do Produto</label>
                  <div className="input-group">
                    <input type="text" id="conferirpesqProduto" name="conferirpesqProduto" className="form-control input" value="" />&nbsp;&nbsp;

                    <button className="btn btn-primary" type="button" onclick="conferirpesquisarProduto()">
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" id="conferirresultado">

            </div>

          </div>
        </div>
      </div> */}

      {/* <!-- Modal Cadastro/Atualização de Cliente para o voucher -->
      <div className="modal fade" id="detClienteVoucher" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Cadastro do Cliente
                <small className="m-0 text-muted">
                  Cadastro e atualização de dados do Cliente
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formDetClienteVoucher" name="formDetClienteVoucher" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formDetClienteVoucher" name="formDetClienteVoucher" method="post" encType="multipart/form-data" >
              <fieldset>
                <div id="notificacaoModalCadastroCliente">

                </div>
                <div className="modal-body" id="resultadoModalCadCliente">

                </div>
                <div className="modal-footer" id="footerdetClienteVoucher">
                  <button id="CadCliente" type="button" className="btn btn-success" onclick="Valida_Cadastro_Cliente()">Cadastrar</button>
                  <button id="CadCliente" type="button" className="btn btn-success" >Cadastrar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Atualiza Status Voucher -->
      <div className="modal fade" id="detStatusVoucher" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                Detalhes do Voucher
                <small className="m-0 text-muted">
                  Detalhes e Atualização de Status
                </small>
              </h2>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body detDadosVoucher">

            </div>
            <form id="formdetStatusVoucher" name="formdetStatusVoucher" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formdetStatusVoucher" name="formdetStatusVoucher" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resultadoModalStatusVoucher">

                </div>
                <div className="modal-footer" id="footerdetStatusVoucher">
                  <button id="btnUpdateVoucher" type="button" className="btn btn-success d-none" onclick="atualizaStatusVoucher()">Atualizar</button>
                  <button id="btnUpdateVoucher" type="button" className="btn btn-success d-none" >Atualizar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Imprime Voucher -->
      <div className="modal fade" id="impVoucher" role="dialog" aria-hidden="true">
        <div id="dialogModalVoucher" className="modal-dialog modal-md" role="document" style={{ alignContent: "center" }}>
          <div id="contentModalVoucher" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" onclick="impVoucher()">
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir">
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>

                <button id="btnPDF" type="button" className="btn btn-danger btn-sm hidden-print p-1 fw-700" title="PDF" onclick="exportPDF()">
                <button id="btnPDF" type="button" className="btn btn-danger btn-sm hidden-print p-1 fw-700" title="PDF">
                  <span className="fal fa-file-pdf pr-1"></span>
                  PDF
                </button>
              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>

            </div>
            <div className="modal-subheader hidden-print" >

              <hr style={{ border: "1px solid" }} />

              <h2 className="modal-title " style={{ textAlign: "center" }}>
                Voucher
              </h2>
              <br />
            </div>
            <div className="modal-body p-0 ml-2">
              <div id="VoucherImp"></div>

            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Observacao Ordem de Transferência -->
      <div className="modal fade" id="observacaoot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Observação da Ordem de Transferência
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resultadoobservacaoot">

            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Quantidade Volume OT -->
      <div className="modal fade" id="volumeot" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Informar os Volumes da OT
                <small className="m-0 text-muted">
                  Preencher com a Quantidade e Descrição dos Volumes
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadovolumeot">

                </div>
                <div className="modal-footer" id="footervolumeot">

                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Imprime Etiqueta OT -->
      <div className="modal fade" id="impEtiquetaOT" role="dialog" aria-hidden="true">
        <div id="dialogModalEtiquetaOT" className="modal-dialog modal-lg" role="document" style={{ alignContent: "center" }}>
          <div id="contentModalEtiquetaOT" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()">
                <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" >
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>

              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>

            </div>
            <div className="modal-subheader hidden-print" >

              <hr style={{ border: "1px solid" }} />

              <h2 className="modal-title " style={{ textAlign: "center" }}>
                Etiqueta
              </h2>
              <br />
            </div>
            <div className="modal-body p-0 m-3">
              <div id="etiquetaImp"></div>

            </div>

            <hr style={{ border: "1px solid", width: "100%" }} />

            <div className="modal-footer hidden-print" style={{ margin: "auto" }}>
              <div>
                <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()">
                <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir">
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal Detalhar Empresa-->
      <div className="modal fade" id="detalheEmpresa" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Empresa
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <form id="formDetalharEmpresa" name="formDetalharEmpresa" method="post" encType="multipart/form-data" onsubmit="return false;">
            <form id="formDetalharEmpresa" name="formDetalharEmpresa" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadoModalDetalheEmpresa">

                </div>
                <div className="modal-footer" id="footerDetalheEmpresa">
                  <button type="button" className="btn btn-success" onclick="validaAtualizarEmpresa()">Atualizar</button>
                  <button type="button" className="btn btn-success" >Atualizar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div> */}
    </Fragment>
  )
}