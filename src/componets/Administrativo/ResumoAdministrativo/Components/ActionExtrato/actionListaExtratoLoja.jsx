
import { Fragment, useState } from "react";;
import { Accordion } from "react-bootstrap";
import { FaLockOpen } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { ActionListaVendas } from "../../../../Financeiro/Components/ActionExtratoLoja/ActionListaVendas";
import { ActionListaFaturas } from "./actionListaFaturas";
import { ActionListaDespesas } from "./actionListaDespesa";
import { ActionListaAdiantamentos } from "../../../../Financeiro/Components/ActionExtratoLoja/ActionListaAdiantamentos";
import { ActionListaQuebraCaixa } from "./actionListaQuebra";
import { ActionListaDepositos } from "../../../../Financeiro/Components/ActionExtratoLoja/ActionListaDepositos";
import { ActionListaAjusteExtratos } from "./actionListaDeposito";
import { toFloat } from "../../../../../utils/toFloat";
import { ButtonType } from "../../../../Buttons/ButtonType";
import { formatMoeda } from "../../../../../utils/formatMoeda";

export const ActionListaExtratoLoja = ({
  dadosExtratoLojaPeriodo,
}) => {
  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalAjuste, setModalAjuste] = useState(false)

  const dados = Array.isArray(dadosExtratoLojaPeriodo) ? dadosExtratoLojaPeriodo.map((item) => {
    let saldoAnterior = 0
    const saldoAnterior2 = parseFloat(item.primeiraVendaSaldo.SALDO) + parseFloat(item.primeiraVendaSaldo.TOTALQUEBRA);
    const saldoAnteriorVendas = saldoAnterior2 + toFloat(item.venda.VRRECDINHEIRO ?? 0)
    const saldoAnteriorFaturas = parseFloat(saldoAnteriorVendas) + parseFloat(item.totalFaturas[0]?.VRRECEBIDO ?? 0)
    const saldoAnteriorDespesas = saldoAnteriorFaturas
    const saldoAnteriorAdiantamentos = saldoAnteriorDespesas - parseFloat(item.adiantamentos.VRVALORDESCONTO ?? 0)


    const calcularTotalDinheiroInformado = () => {
      if (item.quebracaixa[0]?.VRAJUSTDINHEIRO > 0) {
        return toFloat(item.quebracaixa[0]?.VRAJUSTDINHEIRO);
      } else {
        return toFloat(item.quebracaixa[0]?.VRRECDINHEIRO);
      }
    };

    const dinheiroInformado = calcularTotalDinheiroInformado()
    const totalQuebraCaixa = calcularTotalDinheiroInformado() - toFloat(item.quebracaixa[0]?.VRFISICODINHEIRO ?? 0);
    const saldoAnteriorQuebra = saldoAnteriorAdiantamentos + totalQuebraCaixa ?? 0;
    const saldoAnteriorDepositos = saldoAnteriorQuebra - parseFloat(item.totalDepositos[0]?.VRDEPOSITO ?? 0);
    const calcularSaldoExtrato = () => {
      let saldoAnteriorExtrato = 0;
      if (item.ajusteextrato.STCANCELADO == 'False') {
        saldoAnteriorExtrato + parseFloat(item.ajusteextrato[0]?.VRCREDITO)

      } else {
        saldoAnteriorExtrato - parseFloat(item.ajusteextrato[0]?.VRDEBITO)
      }
    }
    const totalSaldoAnteriorExtrato = calcularSaldoExtrato();

    return {

      VRRECDINHEIRO: item.venda.VRRECDINHEIRO,
      DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,

      DTPROCESSAMENTOFORMATADA: item.totalFaturas[0]?.DTPROCESSAMENTOFORMATADA,
      VRRECEBIDO: item.totalFaturas[0]?.VRRECEBIDO,
      saldoAnteriorFaturas: toFloat(saldoAnteriorFaturas),

      IDAJUSTEEXTRATO: item.ajusteextrato[0]?.IDAJUSTEEXTRATO,
      DTCADASTROFORMATADA: item.ajusteextrato[0]?.DTCADASTROFORMATADA,
      VRDEBITO: item.ajusteextrato[0]?.VRDEBITO,
      VRCREDITO: item.ajusteextrato[0]?.VRCREDITO,
      HISTORICO: item.ajusteextrato[0]?.HISTORICO,
      STCANCELADO: item.ajusteextrato[0]?.STCANCELADO,
      totalSaldoAnteriorExtrato: totalSaldoAnteriorExtrato,

      DTDESPESAFORMATADA: item.despesas[0]?.DTDESPESAFORMATADA,
      DSHISTORIO: item.despesas[0]?.DSHISTORIO,
      DSCATEGORIA: item.despesas[0]?.DSCATEGORIA,
      VRDESPESA: item.despesas[0]?.VRDESPESA,
      DSPAGOA: item.despesas[0]?.DSPAGOA,
      saldoAnteriorDespesas,

      DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
      NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
      DSMOTIVO: item.adiantamentos.DSMOTIVO,
      VRVALORDESCONTO: item.adiantamentos.VRVALORDESCONTO,
      saldoAnteriorAdiantamentos: saldoAnteriorAdiantamentos,

      IDMOV: item.quebracaixa[0]?.IDMOV,
      DTMOVCAIXA: item.quebracaixa[0]?.DTMOVCAIXA,
      FUNCIONARIOMOV: item.quebracaixa[0]?.FUNCIONARIOMOV,
      VRFISICODINHEIRO: item.quebracaixa[0]?.VRFISICODINHEIRO,
      VRRECDINHEIROQUEBRA: item.quebracaixa[0]?.VRRECDINHEIRO,
      VRAJUSTDINHEIRO: item.quebracaixa[0]?.VRAJUSTDINHEIRO,
      totalQuebraCaixa: totalQuebraCaixa,
      saldoAnteriorQuebra: saldoAnteriorQuebra,

      IDDEPOSITOLOJA: item.totalDepositos[0]?.IDDEPOSITOLOJA,
      DTDEPOSITOFORMATADA: item.totalDepositos[0]?.DTDEPOSITOFORMATADA,
      DTMOVIMENTOCAIXAFORMATADA: item.totalDepositos[0]?.DTMOVIMENTOCAIXAFORMATADA,
      FUNCIONARIO: item.totalDepositos[0]?.FUNCIONARIO,
      VRDEPOSITO: item.totalDepositos[0]?.VRDEPOSITO,
      DSBANCO: item.totalDepositos[0]?.DSBANCO,
      STCANCELADO: item.totalDepositos[0]?.STCANCELADO,
      STCONFERIDO: item.totalDepositos[0]?.STCONFERIDO,
      NUDOCDEPOSITO: item.totalDepositos[0]?.NUDOCDEPOSITO,
      saldoAnteriorDepositos: saldoAnteriorDepositos,

      saldoAnteriorVendas: saldoAnteriorVendas,
      saldoAnterior2: saldoAnterior2,
      dinheiroInformado: dinheiroInformado
    }
  }) : []

  return (
    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista de Extrato do Dia</h2>
        </div>
        <Fragment>
          <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
            <thead className="bg-primary-700">
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
            </thead>
            <tbody>

              <ActionListaVendas dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
              <ActionListaFaturas dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
              <ActionListaDespesas dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
              <ActionListaAdiantamentos dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
              <ActionListaQuebraCaixa dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
              <ActionListaDepositos dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
              <ActionListaAjusteExtratos dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />


            </tbody>
          </table>
        </Fragment>

      </div>

    </Fragment>
  );
};