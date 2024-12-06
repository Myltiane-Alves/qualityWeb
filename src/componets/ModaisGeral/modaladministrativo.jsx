import React, { Fragment } from "react"


export const ModalAdministrativo = () => {
  return (

    <Fragment>

      {/* <!-- Modal Cadastro Empresa Notas--> */}
      <div className="modal fade" id="cadEmpresas" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados de Empresa
                <small className="m-0 text-muted">
                  Atualização dos Dados da Empresa
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resulmodalempresa">

            </div>

            <div className="modal-footer">
              {/* <button type="button" className="btn btn-success" onclick="atualizar_empresa()">Atualizar</button> */}
              <button type="button" className="btn btn-success" >Atualizar</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>

          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Certificado Notas--> */}
      <div className="modal fade" id="cadCertificado" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Certificado
                <small className="m-0 text-muted">
                  Cadastrar ou Atualizar informações do certificado para emissão das notas fiscais
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formCertificado" name="formCertificado" method="post" encType="multipart/form-data" onSubmit="return false;"> */}
            <form id="formCertificado" name="formCertificado" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalcertificado">

                </div>
                <div className="modal-footer" id="footercertificado">
                  {/* <button type="button" className="btn btn-success" onclick="atualizar_certificado()">Atualizar</button> */}
                  <button type="button" className="btn btn-success" >Atualizar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cadastro Caixas--> */}
      <div className="modal fade" id="cadCaixa" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Caixa
                <small className="m-0 text-muted">
                  Cadastrar ou Atualizar informações do Caixa - PDV
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formCaixa" name="formCaixa" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCaixa" name="formCaixa" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcaixa">

                </div>
                <div className="modal-footer" id="footercaixa">
                  {/* <button type="button" className="btn btn-success" onclick="atualizar_caixa()">Atualizar</button> */}
                  <button type="button" className="btn btn-success" >Atualizar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhar Venda--> */}
      <div className="modal fade" id="detVenda" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
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
            {/* <form id="formDetVenda" name="formDetVenda" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVenda" name="formDetVenda" method="post" encType="multipart/form-data" >
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

      {/* <!-- Modal Detalhar Venda Produto--> */}
      <div className="modal fade" id="detVendaproduto" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
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
            {/* <form id="formDetVendaProduto" name="formDetVendaProduto" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
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
      </div>

      {/* <!-- Modal Cadastro Caixas--> */}
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
                <div className="modal-body" id="resulmodalfuncionario">

                </div>
                <div className="modal-footer" id="footerfuncionario">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_funcionario()">Cadastrar</button> */}
                  <button type="button" className="btn btn-success" >Cadastrar</button>
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
            <form id="formDetVendaRecebimento" name="formDetVendaRecebimento" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaldetvendarecebimento">
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
              <h4 className="modal-title titluloVenda">
                Cancelamento da Venda
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

      {/* <!-- Modal Detalhar Transferencias--> */}
      <div className="modal fade" id="detTransferencia" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe da Transferência
                <small className="m-0 text-muted">
                  Relação dos Produtos da Transferência
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetTransferencia" name="formDetTransferencia" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetTransferencia" name="formDetTransferencia" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldettransferencia">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhar Balanço--> */}
      <div className="modal fade" id="detBalanco" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe do Balanço
                <small className="m-0 text-muted">
                  Relação dos Produtos do Balanço
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetBalanco" name="formDetBalanco" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetBalanco" name="formDetBalanco" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodaldetbalanco">
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
            <form id="formImprimirQuebra" name="formImprimirQuebra" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalimprimirquebra">

                </div>
                <div className="modal-footer" id="footerimprimirquebra">
                  {/* <button id="buttonimprimirquebra" type="button" className="btn btn-success" onclick="imprimir_dados_quebra()">Confirmar Impressão</button> */}
                  <button id="buttonimprimirquebra" type="button" className="btn btn-success">Confirmar Impressão</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhar Voucher--> */}
      <div className="modal fade" id="detVoucher" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhe do Voucher
                <small className="m-0 text-muted">
                  Relação de Produtos do Voucher
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetVoucher" name="formDetVoucher" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVoucher" name="formDetVoucher" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaldetvoucher">

                </div>
                <div className="modal-footer" id="footerdetvoucher">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Coletor Balanço--> */}
      <div className="modal fade" id="coletorBalanco" tabIndex={-1} role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Resumo do Balanço
                <small className="m-0 text-muted">
                  Relação dos Coletores
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <!-- Pesquisar Produto Dentro dos Coletores --> */}
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6 col-xl-10">
                  <label className="form-label" htmlFor="pesqProdutoColetor">Informe a Descrição ou Código de Barras do Produto, para Pesquisar nos Coletores</label>
                  <div className="input-group">
                    <input type="text" id="pesqProdutoColetor" name="pesqProdutoColetor" className="form-control input" value="" />&nbsp;&nbsp;
                    {/* <button className="btn btn-primary" type="button" onclick="pesquisarProdutoColetor()"> */}
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <form id="formColetorBalanco" name="formColetorBalanco" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formColetorBalanco" name="formColetorBalanco" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalcoletorbalanco">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Prévia Balanço--> */}
      <div className="modal fade" id="previaBalanco" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Prévia do Balanço
                <small className="m-0 text-muted">
                  Relação dos Produtos
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body">
              {/* <button id="btnconsolidarbalanco" className="btn btn-success" type="button" onclick="ConsolidarBalanco()"> */}
              <button id="btnconsolidarbalanco" className="btn btn-success" type="button" >
                <span className="fal fa-check"></span> Consolidar Balanço
              </button><br />
              <input type="hidden" id="idconsolidar" name="idconsolidar" value="" />
            </div>
            {/* <form id="formPreviaBalanco" name="formPreviaBalanco" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formPreviaBalanco" name="formPreviaBalanco" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalpreviabalanco">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Consolidar Balanço--> */}
      <div className="modal fade" id="consolidarBalanco" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Consolidar Balanço
                <small className="m-0 text-muted">
                  Consolidação
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formConsolidarBalanco" name="formConsolidarBalanco" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formConsolidarBalanco" name="formConsolidarBalanco" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalconsolidarbalanco">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Prestação Contas Balanço--> */}
      <div className="modal fade" id="prestacaoContas" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                PRESTAÇÃO DE CONTAS DO BALANÇO
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formPrestacaoContas" name="formPrestacaoContas" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formPrestacaoContas" name="formPrestacaoContas" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalprestacaocontas">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Produto balanço avulso --> */}
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

                    {/* <button className="btn btn-primary" type="button" onclick="pesquisarProduto()"> */}
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" id="resultadoModal">

            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}
