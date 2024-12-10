import { Fragment, useEffect, useState } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ActionThead } from "./actionThead";
import { HeaderTable } from "./headerTable";
import { FaLockOpen } from "react-icons/fa";
import { ButtonType } from "../../../Buttons/ButtonType";
import { CiEdit } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { toFloat } from "../../../../utils/toFloat";
export const ActionListaExtratoContaCorrenteLoja = ({
  dadosExtratoLojaPeriodo,
}) => {
  let saldoAnterior = 0;
  const venda = dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.SALDO;
  const totalQuebra = dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.TOTALQUEBRA;
  saldoAnterior = toFloat(venda) + toFloat(totalQuebra);
  let saldoAnteriorVenda = saldoAnterior + toFloat(dadosExtratoLojaPeriodo[0]?.venda.VRRECDINHEIRO);
  let saldoAnteriorFatura = saldoAnteriorVenda + toFloat(dadosExtratoLojaPeriodo[0]?.totalFaturas[0]?.VRRECEBIDO);
  let saldoAnteriorDespesa = saldoAnteriorFatura;
  let saldoAnteriorAdiantamento = saldoAnteriorDespesa;
  let saldoAnteriorQuebra = saldoAnteriorAdiantamento;
  let saldoAnteriorDeposito = saldoAnteriorQuebra;
  let saldoAnteriorAjuste = saldoAnteriorDeposito;
  return (
    <div>
      <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">

        <thead style={{ width: '100%' }}>
          <tr>
            <th>Informativo</th>
          </tr>
          <tr>
            <td colspan="9"><b >Extrato a partir do dia 11 de dezembro de 2020</b ></td>
          </tr>
        </thead>
        <tbody>

          <tr class="table-primary" style={{ width: '100%' }}>
            <td colspan="4" style={{ textAlign: "right", fontSize: "12px" }}><b>Saldo Anterior</b></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "right", fontSize: "12px" }}><b> {`${formatMoeda(saldoAnterior)}`}</b></td>
            <td colSpan={2}></td>
          </tr>

          <tr>
            <td colspan="9"></td>
          </tr>

          <tr>
            <td colspan="9"></td>
          </tr>
        </tbody>


        <tbody className="bg-primary-700 w-100">
          <tr>
            <th>
              Dt. Lançamento
            </th>
            <th>
              Histórico
            </th>
            <th>
              Pago A
            </th>
            <th>
              Despesa
            </th>
            <th>
              Débito
            </th>
            <th>
              Crédito
            </th>
            <th>
              Saldo
            </th>
            <th>
              Situação
            </th>
            <th>
              Opção
            </th>
          </tr>
        </tbody>
        <tbody id="resultadoExtratoLoja">

          {dadosExtratoLojaPeriodo.map((ret, i) => {
            return (
              <Fragment key={i}>
                <tr className="table-success">
                  <td style={{ fontSize: '12px' }}>{ret['venda']['DTHORAFECHAMENTOFORMATADA']}</td>
                  <td style={{ fontSize: '12px' }}>Mov. Dinheiro do Caixa {ret['venda']['DTHORAFECHAMENTOFORMATADA']}</td>
                  <td style={{ fontSize: '12px' }}>Vendas Dinheiro</td>
                  <td></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(toFloat(ret['venda']['VRRECDINHEIRO']).toFixed(2))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnteriorVenda)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>

                {ret['totalFaturas'].length > 0 && (
                  <tr className="table-success">
                    <td style={{ fontSize: '12px' }}>{ret['totalFaturas'][0]['DTPROCESSAMENTOFORMATADA']}</td>
                    <td style={{ fontSize: '12px' }}>Mov. Fatura {ret['totalFaturas'][0]['DTPROCESSAMENTOFORMATADA']}</td>
                    <td style={{ fontSize: '12px' }}>Recebimento de Faturas</td>
                    <td></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(toFloat(ret['totalFaturas'][0]['VRRECEBIDO']).toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnteriorFatura)}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  </tr>
                )}

                {ret['despesas'].length > 0 && ret['despesas'].map((despesa, j) => {
                  saldoAnteriorDespesa -= toFloat(despesa['VRDESPESA']);

                  return (
                    <tr className="table-danger" key={j}>
                      <td style={{ fontSize: '12px' }}>{despesa['DTDESPESAFORMATADA']}</td>
                      <td style={{ fontSize: '12px' }}>{despesa['DSHISTORIO']}</td>
                      <td style={{ fontSize: '12px' }}>{despesa['DSPAGOA']}</td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}>{despesa['DSCATEGORIA']}</td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(despesa['VRDESPESA']).toFixed(2))}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnteriorDespesa)}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}

                {ret['adiantamentos'].length > 0 && ret['adiantamentos'].map((adiantamento, j) => {
                  saldoAnteriorAdiantamento -= toFloat(adiantamento['VRVALORDESCONTO']); // Atualiza o saldoAnteriorAdiantamento

                  return (
                    <tr className="table-danger" key={j}>
                      <td style={{ fontSize: '12px' }}>{adiantamento['DTLANCAMENTOADIANTAMENTO']}</td>
                      <td style={{ fontSize: '12px' }}>Adiantamento de Salário</td>
                      <td style={{ fontSize: '12px' }}>{adiantamento['NOFUNCIONARIO']}</td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}>{adiantamento['DSMOTIVO']}</td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red">
                        <b>{formatMoeda(toFloat(adiantamento['VRVALORDESCONTO']).toFixed(2))}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}>
                        <b>{formatMoeda(saldoAnteriorAdiantamento)}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}


                {/* {ret['adiantamentos'].length > 0 && ret['adiantamentos'].map((adiantamento, j) => {
              toFloat(saldoAnteriorAdiantamento) - toFloat(adiantamento['VRVALORDESCONTO']);
              console.log(toFloat(saldoAnteriorAdiantamento) - toFloat(adiantamento['VRVALORDESCONTO']));
              console.log('saldoAnteriorAdiantamento', saldoAnteriorAdiantamento);
              return (
                <tr className="table-danger" key={j}>
                  <td style={{ fontSize: '12px' }}>{adiantamento['DTLANCAMENTOADIANTAMENTO']}</td>
                  <td style={{ fontSize: '12px' }}>Adiantamento de Salário</td>
                  <td style={{ fontSize: '12px' }}>{adiantamento['NOFUNCIONARIO']}</td>
                  <td style={{ textAlign: 'center', fontSize: '12px' }}>{adiantamento['DSMOTIVO']}</td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(adiantamento['VRVALORDESCONTO']).toFixed(2))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnteriorAdiantamento)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>
              );
            })} */}

                {ret['quebracaixa'].length > 0 && ret['quebracaixa'].map((quebra, j) => {
                  let totalDinheiroInformado = 0;


                  if (toFloat(quebra['VRAJUSTDINHEIRO']) > 0) {
                    totalDinheiroInformado = toFloat(quebra['VRAJUSTDINHEIRO']);
                  } else {
                    totalDinheiroInformado = toFloat(quebra['VRRECDINHEIRO']);
                  }


                  const totalQuebraCaixa = totalDinheiroInformado - toFloat(quebra['VRFISICODINHEIRO']);


                  if (totalQuebraCaixa > 0) {
                    saldoAnteriorQuebra += totalQuebraCaixa;
                  } else {
                    saldoAnteriorQuebra += totalQuebraCaixa;
                  }


                  const tagQuebraDebito = totalQuebraCaixa > 0
                    ? <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>0,00</b></td>
                    : <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{formatMoeda(totalQuebraCaixa)}</b></td>;

                  const tagQuebraCredito = totalQuebraCaixa > 0
                    ? <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{formatMoeda(totalQuebraCaixa)}</b></td>
                    : <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>0,00</b></td>;

                  const tagQuebraSaldo = (
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue">
                      <b>{formatMoeda(saldoAnteriorQuebra)}</b>
                    </td>
                  );

                  // Renderização da linha
                  return (
                    <tr className="table-primary" key={j}>
                      <td style={{ fontSize: '12px' }}>{quebra?.DTMOVCAIXA}</td>
                      <td style={{ fontSize: '12px' }}>Quebra Caixa Mov.: {quebra?.IDMOV}</td>
                      <td colSpan="2" style={{ fontSize: '12px' }}>Operador: {quebra.FUNCIONARIOMOV}</td>
                      {tagQuebraDebito}
                      {tagQuebraCredito}
                      {tagQuebraSaldo}
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}


                {/* {ret['quebracaixa'].length > 0 && ret['quebracaixa'].map((quebra, j) => {
              let totalDinheiroInformado = 0;
              if(toFloat(quebra['VRAJUSTDINHEIRO']) > 0) {
                totalDinheiroInformado = toFloat(quebra['VRAJUSTDINHEIRO']);
              } else {
                totalDinheiroInformado = toFloat(quebra['VRRECDINHEIRO']);
              }
              let totalQuebraCaixa = totalDinheiroInformado - toFloat(quebra['VRFISICODINHEIRO']);
              console.log('totalQuebraCaixa', totalQuebraCaixa);
              console.log(saldoAnteriorQuebra,'saldoAnteriorQuebra');
              saldoAnteriorQuebra + totalQuebraCaixa;
              return (
                <tr className="table-primary" key={j}>
                  <td style={{ fontSize: '12px' }}>{quebra?.DTMOVCAIXA}</td>
                  <td style={{ fontSize: '12px' }}>Quebra Caixa Mov.: {quebra?.IDMOV}</td>
                  <td colSpan="2" style={{ fontSize: '12px' }}>Operador: {quebra.FUNCIONARIOMOV}</td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{totalQuebraCaixa > 0 ? '0,00' : formatMoeda(totalQuebraCaixa)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{totalQuebraCaixa > 0 ? formatMoeda(totalQuebraCaixa) : '0,00'}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{formatMoeda(saldoAnteriorQuebra)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>
              );
            })} */}

                {/* {ret['totalDepositos'].length > 0 && ret['totalDepositos'].map((deposito, j) => {
                  if (deposito['STCANCELADO'] === 'False' && (deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '')) {
                    saldoAnteriorDeposito = saldoAnteriorQuebra -= toFloat(deposito['VRDEPOSITO']);
                    console.log(formatMoeda(saldoAnteriorDeposito), 'saldoAnteriorDeposito');
                    console.log(formatMoeda(saldoAnteriorQuebra), 'saldoAnteriorQuebra');
                    
                  } else if (deposito['STCANCELADO'] === 'False' && deposito['STCONFERIDO'] === 'True') {
                    saldoAnteriorDeposito = saldoAnteriorQuebra -= toFloat(deposito['VRDEPOSITO']);
                  }
                  return (
                    <tr className="table-warning" key={j}>
                      <td style={{ fontSize: '12px' }}><b>{deposito['DTDEPOSITOFORMATADA']}</b></td>
                      <td style={{ fontSize: '12px' }}><b>{deposito['FUNCIONARIO']} Dep. Dinh {deposito['DTDEPOSITOFORMATADA']}</b></td>
                      <td colSpan="2" style={{ fontSize: '12px' }}><b>{deposito['DSBANCO']} - {deposito['NUDOCDEPOSITO']}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(deposito['VRDEPOSITO']).toFixed(2))}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(saldoAnteriorDeposito)}</b></td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}><label style={{ color: deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '' ? 'red' : 'blue' }}>{deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '' ? 'Sem Conferir' : 'Conferido'}</label></td>
                      <td></td>
                    </tr>
                  );
                })} */}

                {ret['totalDepositos'].length > 0 && ret['totalDepositos'].map((deposito, j) => {
                  let tagDepositoConferido = (
                    <label style={{ color: deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '' ? 'red' : 'blue' }}>
                      {deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '' ? 'Sem Conferir' : 'Conferido'}
                    </label>
                  );

                  let tagDepositoAtivo = <td></td>;

                  if (deposito['STCANCELADO'] === 'False') {
                    if (deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '') {
                      saldoAnteriorDeposito = saldoAnteriorQuebra -= toFloat(deposito['VRDEPOSITO']);
                    } else if (deposito['STCONFERIDO'] === 'True') {
                      saldoAnteriorDeposito = saldoAnteriorQuebra -= toFloat(deposito['VRDEPOSITO']);
                    }
                  }

                  return (
                    <tr className="table-warning" key={j}>
                      <td style={{ fontSize: '12px' }}><b>{deposito['DTDEPOSITOFORMATADA']}</b></td>
                      <td style={{ fontSize: '12px' }}><b>{deposito['FUNCIONARIO']} Dep. Dinh {deposito['DTDEPOSITOFORMATADA']}</b></td>
                      <td colSpan="2" style={{ fontSize: '12px' }}><b>{deposito['DSBANCO']} - {deposito['NUDOCDEPOSITO']}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(deposito['VRDEPOSITO']).toFixed(2))}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(saldoAnteriorDeposito)}</b></td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}>{tagDepositoConferido}</td>
                      {tagDepositoAtivo}
                    </tr>
                  );
                })}

                {ret['ajusteextrato'].length > 0 && ret['ajusteextrato'].map((ajuste, j) => {
                  if (ajuste['STCANCELADO'] === 'False') {
                    if (toFloat(ajuste['VRCREDITO']) > 0) {
                      saldoAnteriorAjuste -= toFloat(ajuste['VRCREDITO']);
                    } else {
                      saldoAnteriorAjuste += toFloat(ajuste['VRDEBITO']);
                    }
                  }
                  return (
                    <tr className="table-secondary" key={j}>
                      <td style={{ fontSize: '12px' }}><b>{ajuste['DTCADASTROFORMATADA']}</b></td>
                      <td style={{ fontSize: '12px' }}><b>{ajuste['HISTORICO']}</b></td>
                      <td colSpan="2" style={{ fontSize: '12px' }}><b>Ajuste de Extrato</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(ajuste['VRDEBITO']).toFixed(2))}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(ajuste['VRCREDITO']).toFixed(2))}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(saldoAnteriorAjuste)}</b></td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}><label style={{ color: ajuste['STCANCELADO'] === 'False' ? 'blue' : 'red' }}>{ajuste['STCANCELADO'] === 'False' ? 'Ativo' : 'Cancelado'}</label></td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};