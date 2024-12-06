import React, { Fragment } from "react"


export const ModalConferenciaCega = () => {
  return (

    <Fragment>


      {/* <!-- Modal Ordem de Transferência --> */}
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
      </div>

      {/* <!-- Modal Ordem de TransferÃªncia Pesquisar Produto --> */}
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
            <div className="modal-body" id="resultado">

            </div>

          </div>
        </div>
      </div>

      {/* <!-- Modal Status DivergÃªncia --> */}
      <div className="modal fade" id="cadSD" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Status de DivergÃªncia
                <small className="m-0 text-muted">
                  Cadastrar ou Atualizar informaÃ§Ãµes do Status de DivergÃªncia
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formSD" name="formSD" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomodalSD">

                </div>
                <div className="modal-footer" id="footerSD">

                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Motivo Encerramento OT --> */}
      <div className="modal fade" id="motivoencerrarOT" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Motivo Encerramento
                <small className="m-0 text-muted">
                  Preencher com o Status da DivergÃªncia e ObservaÃ§Ã£o
                </small>
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fal fa-times"></i></span>
              </button>
            </div>
            {/* <form id="formSD" name="formSD" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data" >
              <fieldset>
                <div className="modal-body" id="resultadomotivoencerrarOT">

                </div>
                <div className="modal-footer" id="footermotivoencerrarOT">

                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Ordem de Transferência Deposito --> */}
      <div className="modal fade" id="otdeposito" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <div className="modal-body" id="resultadootdeposito">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Conferir Ordem de Transferência Deposito --> */}
      <div className="modal fade" id="cotdeposito" tabIndex={-1} role="dialog" aria-hidden="true">
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
            <div className="modal-body" id="resultadocotdeposito">

            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Ordem de Transferência Pesquisar Produto Deposito --> */}
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

                    {/* <button className="btn btn-primary" type="button" onclick="pesquisarProdutoDeposito()"> */}
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" id="resultadodeposito">

            </div>

          </div>
        </div>
      </div>

      {/* <!-- Modal Conferir Ordem de Transferência Pesquisar Produto Deposito --> */}
      <div className="modal fade" id="conferirabrirpesqprodutodeposito" tabIndex={-1} role="dialog" aria-hidden="true">
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

                    {/* <button className="btn btn-primary" type="button" onclick="conferirpesquisarProdutoDeposito()"> */}
                    <button className="btn btn-primary" type="button" >
                      <span className="fal fa-search mr-1"></span>
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" id="conferirresultadodeposito">

            </div>

          </div>
        </div>
      </div>

      {/* <!-- Modal Observacao Ordem de Transferência --> */}
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
      </div>

      {/* <!-- Modal Quantidade Volume OT --> */}
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
            {/* <form id="formSD" name="formSD" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formSD" name="formSD" method="post" encType="multipart/form-data">
              <fieldset>
                <div className="modal-body" id="resultadovolumeot">

                </div>
                <div className="modal-footer" id="footervolumeot">

                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Modal Imprime Etiqueta OT --> */}
      <div className="modal fade" id="impEtiquetaOT" role="dialog" aria-hidden="true">
        <div id="dialogModalEtiquetaOT" className="modal-dialog modal-lg" role="document" style={{ alignContent: "center" }}>
          <div id="contentModalEtiquetaOT" className="modal-content">
            <div className="modal-header hidden-print p-1">
              <div>
                {/* <button id="btnPrint" type="button" className="btn btn-primary btn-sm hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()"> */}
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
                {/* <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir" onclick="selecionaTipoEtiquetaOT()"> */}
                <button id="btnPrint" type="button" className="btn btn-primary btn-xl hidden-print p-1 fw-700" title="Imprimir" >
                  <span className="fal fa-print pr-1"></span>
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
