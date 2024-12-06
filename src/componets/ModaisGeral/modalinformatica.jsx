import React, { Fragment } from "react"


export const ModalInformatica = () => {
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
              <button type="button" className="btn btn-success">Atualizar</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal fade" id="UpEmpresasAtualiza" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados de Empresa
                <small className="m-0 text-muted">
                  Atualização Diária dos PDVs da Empresa
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="resulmodalempresaatualiza">

            </div>

            <div className="modal-footer">
              {/* <button type="button" className="btn btn-success" onclick="atualizar_diaria_empresa()">Atualizar</button> */}
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
            {/* <form id="formCertificado" name="formCertificado" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCertificado" name="formCertificado" method="post" encType="multipart/form-data" >
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
      <div className="modal fade" id="updateCaixa" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Caixa
                <small className="m-0 text-muted">
                  Atualizar informações do Caixa - PDV
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formUpdateCaixa" name="formUpdateCaixa" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formUpdateCaixa" name="formUpdateCaixa" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalupdatecaixa">

                </div>
                <div className="modal-footer" id="footerupdatecaixa">
                  {/* <button type="button" className="btn btn-success" onclick="atualizar_caixa()">Atualizar</button> */}
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
                  Cadastrar informações do Caixa - PDV
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formCadCaixa" name="formCadCaixa" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCadCaixa" name="formCadCaixa" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalcadcaixa">

                </div>
                <div className="modal-footer" id="footercadcaixa">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_caixa()">Cadastrar</button> */}
                  <button type="button" className="btn btn-success">Cadastrar</button>
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


      {/* <!-- Modal Cadastro Parceiros--> */}
      <div className="modal fade" id="cadParceiro" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados do Funcionário
                <small className="m-0 text-muted">
                  Cadastrar ou Atualizar informações do Parceiro de Negócios
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formParceiro" name="formParceiro" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formParceiro" name="formParceiro" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodalparceiro">

                </div>
                <div className="modal-footer" id="footerparceiro">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_parceiro()">Atualizar</button> */}
                  <button type="button" className="btn btn-success" >Atualizar</button>
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

      {/* <!-- Modal Alterar Recebimento--> */}
      <div className="modal fade" id="alterarRecebimento" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhes do Recebimento
                <small className="m-0 text-muted">
                  Alterar Recebimentos da Venda
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formalterarRecebimento" name="formalterarRecebimento" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formalterarRecebimento" name="formalterarRecebimento" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalalterarecebimento">

                </div>
                <div className="modal-footer" id="footeralterarrecebimento">
                  {/* <button type="button" className="btn btn-success" data-dismiss="modal" onclick="alterar_Recebimento()">Confirmar Alteração</button> */}
                  <button type="button" className="btn btn-success" data-dismiss="modal">Confirmar Alteração</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
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
                  <button type="button" className="btn btn-success">Cancelar Venda</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cancelar Voucher--> */}
      <div className="modal fade" id="cancelVoucher" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Cancelamento da Voucher
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formCancelVoucher" name="formCancelVoucher" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formCancelVoucher" name="formCancelVoucher" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodalcancelvoucher">

                </div>
                <div className="modal-footer" id="footercancelvoucher">
                  {/* <button type="button" className="btn btn-success" onclick="cancelar_Voucher()">Cancelar Voucher</button> */}
                  <button type="button" className="btn btn-success" >Cancelar Voucher</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Bônus Funcionario--> */}
      <div className="modal fade" id="cadBonusFuncionario" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Funcionário
                <small className="m-0 text-muted">
                  Crédito Bônus de Funcionário
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formBonusFuncionario" name="formBonusFuncionario" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formBonusFuncionario" name="formBonusFuncionario" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="NotificacaoModalbonusFuncionario">

                </div>
                <div className="modal-body" id="resulmodalbonusfuncionario">

                </div>
                <div className="modal-footer" id="footerBonusfuncionario">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_Bonus_funcionario()">Creditar(R$)</button> */}
                  <button type="button" className="btn btn-success" >Creditar(R$)</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Cliente --> */}
      <div className="modal fade" id="cadcliente" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalcliente">
                Cliente:
                <small className="m-0 text-muted">
                  <div className="input-group">

                    <input type="text" id="nome_cliente" name="RazaoSocial" className="form-control input" style={{ textTransform: "uppercase" }} value="" readOnly />

                  </div>
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formcliente" name="formcliente" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formcliente" name="formcliente" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodalcliente">
                </div>
                <div className="modal-footer" id="footermodalcliente">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Detalhar Venda Cancelada--> */}
      <div className="modal fade" id="modalVendaCancelada" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Detalhes da Venda: <span className="textoCabecalhoDetalhe"></span>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formDetVendaCancelada" name="formDetVendaCancelada" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDetVendaCancelada" name="formDetVendaCancelada" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resulmodaldetvendacancelada">

                </div>
                <div className="modal-footer" id="footerdetvendacancelada">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>


      {/* <!-- Modal Cadastro Empresa--> */}
      <div className="modal fade" id="cadEmpresa" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Dados da Empresa
                <small className="m-0 text-muted">
                  Cadastrar ou Atualizar informações da Empresa
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formEmpresa" name="formEmpresa" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formEmpresa" name="formEmpresa" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadoModalEmpresa">

                </div>
                <div className="modal-footer" id="footerEmpresa">
                  {/* <button type="button" className="btn btn-success" onclick="cadastrar_empresa()">Cadastrar</button> */}
                  <button type="button" className="btn btn-success" >Cadastrar</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Relatorio BI --> */}
      <div className="modal fade" id="cadrelatoriobi" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalrelatoriobi">
                Relatório BI
                <small className="m-0 text-muted">
                  Cadastrar / Alterar
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formrelatoriobi" name="formrelatoriobi" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formrelatoriobi" name="formrelatoriobi" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodalrelatoriobi">
                </div>
                <div className="modal-footer" id="footermodalrelatoriobi">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Link Relatorio BI --> */}
      <div className="modal fade" id="cadlinkrelatoriobi" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modallinkrelatoriobi">
                Link Relatório BI
                <small className="m-0 text-muted">
                  Cadastrar / Alterar
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formlinkrelatoriobi" name="formlinkrelatoriobi" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formlinkrelatoriobi" name="formlinkrelatoriobi" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodallinkrelatoriobi">
                </div>
                <div className="modal-footer" id="footermodallinkrelatoriobi">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Importar Link Relatorio BI --> */}
      <div className="modal fade" id="cadimportarlinkrelatoriobi" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalimportarlinkrelatoriobi">
                Link Relatório BI
                <small className="m-0 text-muted">
                  Importar
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formlinkrelatoriobi" name="formimportarlinkrelatoriobi" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formlinkrelatoriobi" name="formimportarlinkrelatoriobi" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodalimportarlinkrelatoriobi">
                </div>
                <div className="modal-footer" id="footermodalimportarlinkrelatoriobi">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
