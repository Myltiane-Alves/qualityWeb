import { Fragment } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaQuebraCaixa = ({ dadosExtratoLojaPeriodo, dados }) => {

  const dadosQuebra = dadosExtratoLojaPeriodo.flatMap((item) =>
    item.quebracaixa.map((quebracaixa) => {
      const saldoAnteriorAdiantamentos = toFloat(dados[0].saldoAnteriorDespesas) - toFloat(dados[0].VRVALORDESCONTO)

      const calcularTotalDinheiroInformado = () => {
        let dinheiroInformado = 0;
        if (toFloat(quebracaixa.VRAJUSTDINHEIRO) > 0) {
          dinheiroInformado = toFloat(quebracaixa.VRAJUSTDINHEIRO);
        } else {
          dinheiroInformado = toFloat(quebracaixa.VRRECDINHEIRO);
        }
        return dinheiroInformado;
      };
      
      
      const totalQuebraCaixa = calcularTotalDinheiroInformado() - toFloat(quebracaixa.VRFISICODINHEIRO);
      
      const saldoAnteriorQuebra = toFloat(saldoAnteriorAdiantamentos) + toFloat(totalQuebraCaixa);
      console.log('totalQuebraCaixa', totalQuebraCaixa)
      console.log('saldoAnteriorQuebra', saldoAnteriorQuebra)
   
      return {
        IDMOV: quebracaixa.IDMOV,
        DTMOVCAIXA: quebracaixa.DTMOVCAIXA,
        FUNCIONARIOMOV: quebracaixa.FUNCIONARIOMOV,
        VRFISICODINHEIRO: toFloat(quebracaixa.VRFISICODINHEIRO),
        VRRECDINHEIROQUEBRA: toFloat(quebracaixa.VRRECDINHEIRO),
        VRAJUSTDINHEIRO: toFloat(quebracaixa.VRAJUSTDINHEIRO),
        totalQuebraCaixa: toFloat(totalQuebraCaixa),
        saldoAnteriorQuebra: toFloat(saldoAnteriorQuebra),

        tagDebidto: totalQuebraCaixa > 0 ? '0,00' : formatMoeda(Math.abs(totalQuebraCaixa)),
        tagQuebraCredito: totalQuebraCaixa > 0 ? formatMoeda(totalQuebraCaixa) : "0,00",
        tagQuebraSaldo: totalQuebraCaixa > 0 ? toFloat(saldoAnteriorQuebra) : toFloat(saldoAnteriorQuebra),
      };
    })
  );
  return (
    <Fragment>
      {dadosQuebra.map((item, index) => (
        <tr className="table-primary" key={index}>
          <td>{item.DTMOVCAIXA}</td>
          <td>Quebra Caixa Mov.: {item.IDMOV} </td>
          <td colSpan={2}>Operador: {item.FUNCIONARIOMOV}</td>
          <td>{item.tagDebidto}</td>
          <td>{item.tagQuebraCredito}</td>
          <td>{formatMoeda(item.saldoAnteriorQuebra)}</td>
          <td></td>
          <td></td>
        </tr>

      ))}
    </Fragment>
  )
}