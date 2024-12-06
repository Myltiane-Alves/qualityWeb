import { Fragment } from "react"


export const CadastroActionCadNFEManual = () => {
  return (

    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <div className="panel-tag">
                  {/* <!-- <input className="form-control" name="idResPedNFEManual" id="idResPedNFEManual" hidden> --> */}
                  <div className="row">
                    <div className="col-sm-6 col-xl-8">
                      <label className="form-label" htmlFor="idforn">Fornecedor</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="idforn" id="idforn">
                          <option value=""> </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <label className="form-label" htmlFor="idcondicaopagamento">Condições de Pagamento</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="idcondicaopagamento" id="idcondicaopagamento">
                          <option value=""> </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="idResPedNFEManual">Nº Pedido</label>
                      <input className="form-control" name="idResPedNFEManual" id="idResPedNFEManual" disabled />
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <label className="form-label" htmlFor="fabprod">Marca</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="fabprod" id="fabprod">
                          <option value=""></option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <label className="form-label" htmlFor="IdCompradorPedido">Comprador</label>
                      <select className="select2 form-control" name="IdCompradorPedido" id="IdCompradorPedido">
                        <option value=""> </option>
                      </select>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <label className="form-label" htmlFor="idUsoPrincipal">Uso Principal</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="idUsoPrincipal" id="idUsoPrincipal">
                          <option value="">Selecione</option>
                          <option value="10">Compra Comercial</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="idTpFrete">Frete</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="idTpFrete" id="idTpFrete">
                          <option value="" selected disabled>Selecione</option>
                          <option value="0">Emitente</option>
                          <option value="1">Destinatario</option>
                          <option value="2">Terceiros</option>
                          <option value="9">Sem Frete</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="idStatusNota">Status</label>
                      <div className="input-group">
                        <input type="text" id="idStatusNota" name="idStatusNota" className="form-control input" value="Aberta" readOnly disabled />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="idStatusSaldo">Saldo</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="idStatusSaldo" id="idStatusSaldo">
                          <option value="">Selecione</option>
                          <option value="True">Sim</option>
                          <option value="False">Não</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <label className="form-label" htmlFor="dtCadastro">Data Cadastro</label>
                      <input className="form-control" id="dtCadastro" type="date" name="dtCadastro" value="" />
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <label className="form-label" htmlFor="dtNotaEntrada">Data Emissão</label>
                      <input className="form-control" id="dtNotaEntrada" type="date" name="dtNotaEntrada" value="" />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6 col-xl-8">
                      <label className="form-label" htmlFor="depositoDestino">Filial</label>
                      <div className="input-group">
                        {/* <select className="select2 form-control" name="depositoDestino" id="depositoDestino"
                          onChange="trocaCnpjDepositoDestino(this.value)"> */}
                        <select className="select2 form-control" name="depositoDestino" id="depositoDestino">
                          <option value="" disabled>Selecione a Filial de Destino</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <label className="form-label" htmlFor="cnpjdepositoDestino">CNPJ Filial</label>
                      <div className="input-group">
                        <input type="text" id="cnpjDepositoDestino" name="cnpjDepositoDestino" className="form-control" value=""
                          readOnly />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="tipoNF">Tipo NF</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="tipoNF" id="tipoNF">
                          <option value="-2">Externo</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="numNF">Nº NF</label>
                      <div className="input-group">
                        <input type="text" id="numNF" name="numNF" className="form-control" value="" />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-1">
                      <label className="form-label" htmlFor="serieNF">Série NF</label>
                      <div className="input-group">
                        <input type="text" id="serieNF" name="serieNF" className="form-control" value="" />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-2">
                      <label className="form-label" htmlFor="modeloNF">Modelo NF</label>
                      <div className="input-group">
                        <select className="select2 form-control" name="modeloNF" id="modeloNF">
                          <option value="55">NFe(55) </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-5">
                      <label className="form-label" htmlFor="chaveNF">Chave NF</label>
                      <div className="input-group">
                        {/* <input type="text" id="chaveNF" name="chaveNF" className="form-control" value="" onBlur="preencheDadosComCHNFE(this.value)" /> */}
                        <input type="text" id="chaveNF" name="chaveNF" className="form-control" value="" />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-xl-12">
                      <div id="panel-1" className="panel">
                        <div className="panel-hdr texttablistpedidos">
                          <h2>
                            LISTA DOS PRODUTOS DA NOTA
                          </h2>
                        </div>
                        <div className="panel-container show">
                          <div className="panel-content">
                            <div id="resultadoProdParaNFE">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between">
                    <div className="col-sm-6 col-xl-5">
                      <label className="form-label" htmlFor="obsNotaEntrada">Observações</label>
                      <div className="input-group">
                        <textarea className="form-control" name="obsNotaEntrada" id="obsNotaEntrada" cols={30}
                          rows={11}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-6 d-flex flex-column-column">
                      <div className="col-sm-6 col-xl-6">
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrTotalNotaEntrada">Total Antes do Desconto</label>
                          <div className="input-group">
                            <input className="form-control" name="vrTotalNotaEntrada" id="vrTotalNotaEntrada" readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrDescontoNotaEntrada">Desconto</label>
                          <div className="input-group">
                            <input className="form-control" name="vrDescontoNotaEntrada" id="vrDescontoNotaEntrada"
                              readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrAdiantamentoNotaEntrada">Adiantamento Total</label>
                          <div className="input-group">
                            <input className="form-control" name="vrAdiantamentoNotaEntrada" id="vrAdiantamentoNotaEntrada"
                              readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrAdiantamentoNotaEntrada">Despesas Adicionais</label>
                          <div className="input-group">
                            <input className="form-control" name="vrAdiantamentoNotaEntrada" id="vrAdiantamentoNotaEntrada"
                              readOnly></input>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-6">
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrImposto">Imposto</label>
                          <div className="input-group">
                            <input className="form-control" name="vrImposto" id="vrImposto" readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrImpostoRetido">Valor de Imposto Retido</label>
                          <div className="input-group">
                            <input className="form-control" name="vrImpostoRetido" id="vrImpostoRetido" readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrTotalaPagar">Total a Pagar</label>
                          <div className="input-group">
                            <input className="form-control" name="vrTotalaPagar" id="vrTotalaPagar" readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrAplicado">Valor Aplicado</label>
                          <div className="input-group">
                            <input className="form-control" name="vrAplicado" id="vrAplicado" readOnly></input>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-12">
                          <label className="form-label" htmlFor="vrSaldo">Saldo</label>
                          <div className="input-group">
                            <input className="form-control" name="vrSaldo" id="vrSaldo" readOnly></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

