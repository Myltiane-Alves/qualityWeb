import { Fragment } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaFaturas = ({dadosExtratoLojaPeriodo, dados}) => {
  
  const dadosExtrato = dadosExtratoLojaPeriodo.flatMap((item, index) => 
    item.totalFaturas.map((fatura) => {
      const saldoAnteriorFaturas = toFloat(dados[0].saldoAnteriorVendas) + toFloat(fatura.VRRECEBIDO)
     
      return {
        DTPROCESSAMENTOFORMATADA: fatura.DTPROCESSAMENTOFORMATADA,
        VRRECEBIDO: toFloat(fatura.VRRECEBIDO),
        saldoAnteriorFaturas: toFloat(saldoAnteriorFaturas),
      }
    })
  )

  return (
    <Fragment>

 
       {dadosExtrato.map((item, index) => (
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