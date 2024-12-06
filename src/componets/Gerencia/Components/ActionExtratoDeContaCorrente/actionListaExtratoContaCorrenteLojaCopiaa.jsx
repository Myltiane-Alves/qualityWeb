import { Fragment, useEffect, useState } from "react";;
import { Accordion } from "react-bootstrap";
import { toFloat } from "../../../../utils/toFloat";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { FaLockOpen } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ModalCadastroDeDepositoDaLoja } from "./modalCadastroDeDepositoDaLoja";
// import { ModalAjusteExtratoModal } from "./actionCadastroAjusteExtratoModal";
import { ActionListaDespesas } from "./ActionListaDespesas";
import { ActionListaVendas } from "./ActionListaVendas";
import { ActionListaFaturas } from "./ActionListaFaturas";
import { ActionListaAdiantamentos } from "./ActionListaAdiantamentos";
import { ActionListaQuebraCaixa } from "./ActionListaQuebraCaixa";
import { ActionListaDepositos } from "./ActionListaDepositos";
import { ActionListaAjusteExtratos } from "./ActionListaAjusteExtratos";

export const ActionListaExtratoContaCorrenteLoja = ({
  dadosExtratoLojaPeriodo,
}) => {
  const [saldo, setSaldo] = useState(0);
  const [numPageAtual, setNumPageAtual] = useState(parseInt(dadosExtratoLojaPeriodo.page));
  const [data, setData] = useState([]);
  var saldoAnterior = 0;
  console.log(dadosExtratoLojaPeriodo)
  useEffect(() => {
    if (dadosExtratoLojaPeriodo) {
      let saldo = parseFloat(dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.SALDO);
      let totalQuebra = parseFloat(dadosExtratoLojaPeriodo[0]?.primeiraVendaSaldo.TOTALQUEBRA);
      saldo += totalQuebra;
      setSaldo(saldo);
      // setData(dadosExtratoLojaPeriodo.data);
    }
  }, [dadosExtratoLojaPeriodo]);

  const mascaraValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div>
      <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
        <thead>
          <tr>
            <th>Informativo</th>
          </tr>
          <tr>
            <td colSpan="9"><b>Extrato a partir do dia 11 de dezembro de 2020</b></td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-primary">
            <td colSpan="3" style={{ textAlign: 'right', fontSize: '12px' }}><b>Saldo Anterior</b></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnterior)}</b></td>
            <td colSpan="2"></td>
          </tr>
          <tr>
            <td colSpan="9"></td>
          </tr>
          <tr>
            <td colSpan="9"></td>
          </tr>
        </tbody>
        <tbody id="resultadoExtratoLoja">
          <tr>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Dt. Lanç.</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Histórico</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Pago A</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Despesa</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Débito</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Crédito</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Saldo</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Situação</th>
            <th className="bg-primary-700" style={{ fontSize: '12px' }}>Opção</th>
          </tr>
          {dadosExtratoLojaPeriodo.map((ret, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <>
                  <tr>
                    <td colSpan="9"></td>
                  </tr>
                  <tr>
                    <td colSpan="9"></td>
                  </tr>
                </>
              )}
              <tr className="table-success">
                <td style={{ fontSize: '12px' }}>{ret['venda']['DTHORAFECHAMENTOFORMATADA']}</td>
                <td style={{ fontSize: '12px' }}>Mov. Dinheiro do Caixa {ret['venda']['DTHORAFECHAMENTOFORMATADA']}</td>
                <td style={{ fontSize: '12px' }}>Vendas Dinheiro</td>
                <td></td>
                <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(parseFloat(ret['venda']['VRRECDINHEIRO']).toFixed(2))}</b></td>
                <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnterior)}</b></td>
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
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(parseFloat(ret['totalFaturas'][0]['VRRECEBIDO']).toFixed(2))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnterior)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>
              )}
              {ret['despesas'].length > 0 && ret['despesas'].map((despesa, j) => (
                <tr className="table-danger" key={j}>
                  <td style={{ fontSize: '12px' }}>{despesa['DTDESPESAFORMATADA']}</td>
                  <td style={{ fontSize: '12px' }}>{despesa['DSHISTORIO']}</td>
                  <td style={{ fontSize: '12px' }}>{despesa['DSPAGOA']}</td>
                  <td style={{ textAlign: 'center', fontSize: '12px' }}>{despesa['DSCATEGORIA']}</td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(parseFloat(despesa['VRDESPESA']).toFixed(2))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnterior)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>
              ))}
              {ret['adiantamentos'].length > 0 && ret['adiantamentos'].map((adiantamento, j) => (
                <tr className="table-danger" key={j}>
                  <td style={{ fontSize: '12px' }}>{adiantamento['DTLANCAMENTOADIANTAMENTO']}</td>
                  <td style={{ fontSize: '12px' }}>Adiantamento de Salário</td>
                  <td style={{ fontSize: '12px' }}>{adiantamento['NOFUNCIONARIO']}</td>
                  <td style={{ textAlign: 'center', fontSize: '12px' }}>{adiantamento['DSMOTIVO']}</td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(parseFloat(adiantamento['VRVALORDESCONTO']).toFixed(2))}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}><b>{formatMoeda(saldoAnterior)}</b></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                </tr>
              ))}
              {ret['quebracaixa'].length > 0 && ret['quebracaixa'].map((quebra, j) => {
                let totalDinheiroInformado = parseFloat(quebra['VRAJUSTDINHEIRO']) > 0 ? parseFloat(quebra['VRAJUSTDINHEIRO']) : parseFloat(quebra['VRRECDINHEIRO']);
                let totalQuebraCaixa = totalDinheiroInformado - parseFloat(quebra['VRFISICODINHEIRO']);
                saldoAnterior += totalQuebraCaixa;
                return (
                  <tr className="table-primary" key={j}>
                    <td style={{ fontSize: '12px' }}>{quebra['DTMOVCAIXA']}</td>
                    <td style={{ fontSize: '12px' }}>Quebra Caixa Mov.: {quebra['IDMOV']}</td>
                    <td colSpan="2" style={{ fontSize: '12px' }}>Operador: {quebra['FUNCIONARIOMOV']}</td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{totalQuebraCaixa > 0 ? '0,00' : formatMoeda(totalQuebraCaixa.toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{totalQuebraCaixa > 0 ? formatMoeda(totalQuebraCaixa.toFixed(2)) : '0,00'}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-blue"><b>{formatMoeda(saldoAnterior.toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}></td>
                  </tr>
                );
              })}
              {ret['totalDepositos'].length > 0 && ret['totalDepositos'].map((deposito, j) => {
                if (deposito['STCANCELADO'] === 'False' && (deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '')) {
                  saldoAnterior -= parseFloat(deposito['VRDEPOSITO']);
                } else if (deposito['STCANCELADO'] === 'False' && deposito['STCONFERIDO'] === 'True') {
                  saldoAnterior -= parseFloat(deposito['VRDEPOSITO']);
                }
                return (
                  <tr className="table-warning" key={j}>
                    <td style={{ fontSize: '12px' }}><b>{deposito['DTDEPOSITOFORMATADA']}</b></td>
                    <td style={{ fontSize: '12px' }}><b>{deposito['FUNCIONARIO']} Dep. Dinh {deposito['DTDEPOSITOFORMATADA']}</b></td>
                    <td colSpan="2" style={{ fontSize: '12px' }}><b>{deposito['DSBANCO']} - {deposito['NUDOCDEPOSITO']}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(parseFloat(deposito['VRDEPOSITO']).toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }}><b>0,00</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(saldoAnterior.toFixed(2))}</b></td>
                    <td style={{ textAlign: 'center', fontSize: '12px' }}><label style={{ color: deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '' ? 'red' : 'blue' }}>{deposito['STCONFERIDO'] === 'False' || deposito['STCONFERIDO'] == null || deposito['STCONFERIDO'] === '' ? 'Sem Conferir' : 'Conferido'}</label></td>
                    <td></td>
                  </tr>
                );
              })}
              {ret['ajusteextrato'].length > 0 && ret['ajusteextrato'].map((ajuste, j) => {
                if (ajuste['STCANCELADO'] === 'False') {
                  if (parseFloat(ajuste['VRCREDITO']) > 0) {
                    saldoAnterior -= parseFloat(ajuste['VRCREDITO']);
                  } else {
                    saldoAnterior += parseFloat(ajuste['VRDEBITO']);
                  }
                }
                return (
                  <tr className="table-secondary" key={j}>
                    <td style={{ fontSize: '12px' }}><b>{ajuste['DTCADASTROFORMATADA']}</b></td>
                    <td style={{ fontSize: '12px' }}><b>{ajuste['HISTORICO']}</b></td>
                    <td colSpan="2" style={{ fontSize: '12px' }}><b>Ajuste de Extrato</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(parseFloat(ajuste['VRDEBITO']).toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(parseFloat(ajuste['VRCREDITO']).toFixed(2))}</b></td>
                    <td style={{ textAlign: 'right', fontSize: '12px' }} className="txt-color-red"><b>{formatMoeda(saldoAnterior.toFixed(2))}</b></td>
                    <td style={{ textAlign: 'center', fontSize: '12px' }}><label style={{ color: ajuste['STCANCELADO'] === 'False' ? 'blue' : 'red' }}>{ajuste['STCANCELADO'] === 'False' ? 'Ativo' : 'Cancelado'}</label></td>
                    <td style={{ textAlign: 'center', fontSize: '12px' }}></td>
                  </tr>
                );
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};