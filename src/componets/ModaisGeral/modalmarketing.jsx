import React, { Fragment } from "react"


export const ModalMarketing = () => {
  return (

    <Fragment>


      {/* <!-- Modal Detalhar Venda--> */}
      <div className="modal fade" id="detVenda" tabIndex={-1} role="dialog" aria-hidden="true">
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

      {/* <!-- Modal Detalhe Vendas Recebimentos Lojas--> */}
      <div className="modal fade" id="vendaRecebimentoLojas" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <form id="formVendaRecebimentoLoja" name="formVendaRecebimentoLoja" method="post" encType="multipart/form-data" >
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
      {/* <!-- Modal Listar Produtos--> */}
      <div className="modal fade" id="listProdutos" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Lista de Produtos
                <small className="m-0 text-muted">
                  Relação de Produtos
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formListProduto" name="formListProduto" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formListProduto" name="formListProduto" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resulmodallistproduto">

                </div>
                <div className="modal-footer" id="footerlistproduto">
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
