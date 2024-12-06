import { Fragment, useEffect, useState } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaFaturas = ({ dadosExtratoLojaPeriodo, dados }) => {
  const [dadosFaturas, setDadosFaturas] = useState([]);

  useEffect(() => {
    let saldoAnterior = toFloat(dados[0]?.saldoAnteriorVendas);

    const faturasCalculadas = dadosExtratoLojaPeriodo.flatMap((item) =>
      item.totalFaturas.map((fatura) => {
        const saldoAnteriorFaturas = saldoAnterior + toFloat(fatura.VRRECEBIDO);
        saldoAnterior = saldoAnteriorFaturas;

        return {
          DTPROCESSAMENTOFORMATADA: fatura.DTPROCESSAMENTOFORMATADA,
          VRRECEBIDO: toFloat(fatura.VRRECEBIDO),
          saldoAnteriorFaturas: saldoAnteriorFaturas,
        };
      })
    );

    setDadosFaturas(faturasCalculadas);
  }, [dadosExtratoLojaPeriodo, dados]);

  return (
    <Fragment>


      {dadosFaturas.map((item, index) => (
        <tr className="table-success" key={index}>
          <td>{item?.DTPROCESSAMENTOFORMATADA}</td>
          <td>Mov. Fatura {item?.DTPROCESSAMENTOFORMATADA}</td>
          <td>Recebimento de Faturas</td>
          <td></td>
          <td>0,00</td>
          <td>{formatMoeda(item.VRRECEBIDO)}</td>
          <td>{formatMoeda(item.saldoAnteriorFaturas)}</td>
          <td></td>
          <td></td>
        </tr>

      ))}
    </Fragment>
  )
}