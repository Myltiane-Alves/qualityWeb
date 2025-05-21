import { Fragment, useEffect, useState } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";

import { toFloat } from "../../../../utils/toFloat";
export const ActionListaExtratoContaCorrenteLoja = ({
  dadosExtratoLojaPeriodo,
}) => {
  // let saldoAnterior = 0;
  // const venda = dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.SALDO;
  // const totalQuebra = dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.TOTALQUEBRA;
  // saldoAnterior = toFloat(venda) + toFloat(totalQuebra);
  // var saldoAnteriorVenda = saldoAnterior + toFloat(dadosExtratoLojaPeriodo[0]?.venda.VRRECDINHEIRO);
  // var saldoAnteriorFatura = saldoAnteriorVenda + toFloat(dadosExtratoLojaPeriodo[0]?.totalFaturas[0]?.VRRECEBIDO);
  // var saldoAnteriorDespesa = saldoAnteriorFatura;
  // var saldoAnteriorAdiantamento = saldoAnteriorDespesa;
  // var saldoAnteriorQuebra = saldoAnteriorAdiantamento;
  // var saldoAnteriorDeposito = saldoAnteriorQuebra;
  // var saldoAnteriorAjuste = saldoAnteriorDeposito;

  // console.log(dadosExtratoLojaPeriodo[0])

  // console.log(formatMoeda(saldoAnteriorFatura), 'saldoAnteriorFatura')
  // console.log(formatMoeda(saldoAnteriorDespesa), 'saldoAnteriorDespesa')
  // console.log(formatMoeda(saldoAnteriorAdiantamento), 'saldoAnteriorAdiantamento')
  // console.log(formatMoeda(saldoAnteriorQuebra), 'saldoAnteriorQuebra')

  const [saldoAnterior, setSaldoAnterior] = useState(0);

  useEffect(() => {
    if (dadosExtratoLojaPeriodo.length > 0) {
      const venda = toFloat(dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.SALDO);
      const totalQuebra = toFloat(dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.TOTALQUEBRA);
      setSaldoAnterior(venda + totalQuebra);
    }
  }, [dadosExtratoLojaPeriodo]);

  const atualizarSaldo = (valor) => {
    setSaldoAnterior(prevSaldo => prevSaldo + valor);
  };

  return (
    <div>
      <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
        <thead style={{ width: '100%' }}>
          <tr>
            <th>Informativo</th>
          </tr>
          <tr>
            <td colSpan="9"><b>Extrato a partir do dia 11 de dezembro de 2020</b></td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-primary" style={{ width: '100%' }}>
            <td colSpan="4" style={{ textAlign: "right", fontSize: "12px" }}><b>Saldo Anterior</b></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "right", fontSize: "12px" }}><b>{formatMoeda(saldoAnterior)}</b></td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan="9"></td>
          </tr>
          <tr>
            <td colSpan="9"></td>
          </tr>
        </tbody>
        <tbody className="bg-primary-700 w-100">
          <tr>
            <th>Dt. Lançamento</th>
            <th>Histórico</th>
            <th>Pago A</th>
            <th>Despesa</th>
            <th>Débito</th>
            <th>Crédito</th>
            <th>Saldo</th>
            <th>Situação</th>
            <th>Opção</th>
          </tr>
        </tbody>
        <tbody id="resultadoExtratoLoja">
          {dadosExtratoLojaPeriodo.map((ret, i) => {
            let saldoAtual = saldoAnterior; // Inicializa o saldoAtual com o saldoAnterior

            return (
              <Fragment key={i}>
                {/* Venda */}
                <tr className="table-success">
                  <td style={{ fontSize: '12px' }}>{ret['venda']['DTHORAFECHAMENTOFORMATADA']}</td>
                  <td style={{ fontSize: '12px' }}>Mov. Dinheiro do Caixa {ret['venda']['DTHORAFECHAMENTOFORMATADA']}</td>
                  <td style={{ fontSize: '12px' }}>Vendas Dinheiro</td>
                  <td></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(toFloat(ret['venda']['VRRECDINHEIRO']).toFixed(2))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAtual += toFloat(ret['venda']['VRRECDINHEIRO']))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>

                {/* Faturas */}
                {ret['totalFaturas'].length > 0 && (
                  <tr className="table-success">
                    <td style={{ fontSize: '12px' }}>{ret['totalFaturas'][0]['DTPROCESSAMENTOFORMATADA']}</td>
                    <td style={{ fontSize: '12px' }}>Mov. Fatura {ret['totalFaturas'][0]['DTPROCESSAMENTOFORMATADA']}</td>
                    <td style={{ fontSize: '12px' }}>Recebimento de Faturas</td>
                    <td></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(toFloat(ret['totalFaturas'][0]['VRRECEBIDO']).toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAtual += toFloat(ret['totalFaturas'][0]['VRRECEBIDO']))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  </tr>
                )}

                {/* Despesas */}
                {ret['despesas'].length > 0 && ret['despesas'].map((despesa, j) => {
                  saldoAtual -= toFloat(despesa['VRDESPESA']);
                  return (
                    <tr className="table-danger" key={j}>
                      <td style={{ fontSize: '12px' }}>{despesa['DTDESPESAFORMATADA']}</td>
                      <td style={{ fontSize: '12px' }}>{despesa['DSHISTORIO']}</td>
                      <td style={{ fontSize: '12px' }}>{despesa['DSPAGOA']}</td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}>{despesa['DSCATEGORIA']}</td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(toFloat(despesa['VRDESPESA']).toFixed(2))}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAtual)}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}

                {/* Adiantamentos */}
                {ret['adiantamentos'].length > 0 && ret['adiantamentos'].map((adiantamento, j) => {
                  saldoAtual -= toFloat(adiantamento['VRVALORDESCONTO']);
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
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAtual)}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}

                {/* Quebra de Caixa */}
                {ret['quebracaixa'].length > 0 && ret['quebracaixa'].map((quebra, j) => {
                  const totalDinheiroInformado = toFloat(quebra['VRAJUSTDINHEIRO']) > 0
                    ? toFloat(quebra['VRAJUSTDINHEIRO'])
                    : toFloat(quebra['VRRECDINHEIRO']);
                  const totalQuebraCaixa = totalDinheiroInformado - toFloat(quebra['VRFISICODINHEIRO']);
                  saldoAtual += totalQuebraCaixa;

                  return (
                    <tr className="table-primary" key={j}>
                      <td style={{ fontSize: '12px' }}>{quebra['DTMOVCAIXA']}</td>
                      <td style={{ fontSize: '12px' }}>Quebra Caixa Mov.: {quebra['IDMOV']}</td>
                      <td colSpan="2" style={{ fontSize: '12px' }}>Operador: {quebra['FUNCIONARIOMOV']}</td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue">
                        <b>{totalQuebraCaixa > 0 ? '0,00' : formatMoeda(totalQuebraCaixa)}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue">
                        <b>{totalQuebraCaixa > 0 ? formatMoeda(totalQuebraCaixa) : '0,00'}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue">
                        <b>{formatMoeda(saldoAtual)}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    </tr>
                  );
                })}

                {/* Depósitos */}
                {ret['totalDepositos'].length > 0 && ret['totalDepositos'].map((deposito, j) => {
                  saldoAtual -= toFloat(deposito['VRDEPOSITO']);
                  return (
                    <tr className="table-warning" key={j}>
                      <td style={{ fontSize: '12px' }}><b>{deposito['DTDEPOSITOFORMATADA']}</b></td>
                      <td style={{ fontSize: '12px' }}><b>{deposito['FUNCIONARIO']} Dep. Dinh {deposito['DTDEPOSITOFORMATADA']}</b></td>
                      <td colSpan="2" style={{ fontSize: '12px' }}><b>{deposito['DSBANCO']} - {deposito['NUDOCDEPOSITO']}</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red">
                        <b>{formatMoeda(toFloat(deposito['VRDEPOSITO']).toFixed(2))}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red">
                        <b>{formatMoeda(saldoAtual)}</b>
                      </td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}>
                        <label style={{ color: deposito['STCONFERIDO'] === 'False' || !deposito['STCONFERIDO'] ? 'red' : 'blue' }}>
                          {deposito['STCONFERIDO'] === 'False' || !deposito['STCONFERIDO'] ? 'Sem Conferir' : 'Conferido'}
                        </label>
                      </td>
                      <td></td>
                    </tr>
                  );
                })}

                {/* Ajustes de Extrato */}
                {ret['ajusteextrato'].length > 0 && ret['ajusteextrato'].map((ajuste, j) => {
                  if (ajuste['STCANCELADO'] === 'False') {
                    if (toFloat(ajuste['VRCREDITO']) > 0) {
                      saldoAtual -= toFloat(ajuste['VRCREDITO']);
                    } else {
                      saldoAtual += toFloat(ajuste['VRDEBITO']);
                    }
                  }

                  return (
                    <tr className="table-secondary" key={j}>
                      <td style={{ fontSize: '12px' }}><b>{ajuste['DTCADASTROFORMATADA']}</b></td>
                      <td style={{ fontSize: '12px' }}><b>{ajuste['HISTORICO']}</b></td>
                      <td colSpan="2" style={{ fontSize: '12px' }}><b>Ajuste de Extrato</b></td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red">
                        <b>{formatMoeda(toFloat(ajuste['VRDEBITO']).toFixed(2))}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red">
                        <b>{formatMoeda(toFloat(ajuste['VRCREDITO']).toFixed(2))}</b>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red">
                        <b>{formatMoeda(saldoAtual)}</b>
                      </td>
                      <td style={{ textAlign: 'center', fontSize: '12px' }}>
                        <label style={{ color: ajuste['STCANCELADO'] === 'False' ? 'blue' : 'red' }}>
                          {ajuste['STCANCELADO'] === 'False' ? 'Ativo' : 'Cancelado'}
                        </label>
                      </td>
                      <td></td>
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        <br />
        </tbody>
      </table>
    </div>
  );
};