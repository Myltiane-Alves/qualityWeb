import { Fragment, useEffect, useState } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaQuebraCaixa = ({ dadosExtratoLojaPeriodo, dados }) => {
  const [dadosQuebra, setDadosQuebra] = useState([]);

  useEffect(() => {
    let saldoAnteriorAdiantamentos = dados[0]?.saldoAnteriorAdiantamentos;
    const dadosCalculados = dadosExtratoLojaPeriodo.flatMap((item) =>
      item.quebracaixa.map((quebracaixa) => {
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
        const saldoAnteriorQuebra = saldoAnteriorAdiantamentos + totalQuebraCaixa;
    
        return {
          IDMOV: quebracaixa.IDMOV,
          DTMOVCAIXA: quebracaixa.DTMOVCAIXA,
          FUNCIONARIOMOV: quebracaixa.FUNCIONARIOMOV,
          VRFISICODINHEIRO: quebracaixa.VRFISICODINHEIRO,
          VRRECDINHEIROQUEBRA: quebracaixa.VRRECDINHEIRO,
          VRAJUSTDINHEIRO: quebracaixa.VRAJUSTDINHEIRO,
          totalQuebraCaixa: totalQuebraCaixa,
          saldoAnteriorQuebra: saldoAnteriorQuebra
        };
      })
    );
    setDadosQuebra(dadosCalculados);
  }, [dadosExtratoLojaPeriodo, dados]);
  
  return (
    <Fragment>
      {dadosQuebra.map((item, index) => (
        <tr className="table-primary" key={index}>
          <td>{item.DTMOVCAIXA}</td>
          <td>Quebra Caixa Mov.: {item.IDMOV} </td>
          <td colSpan={2}>Operador: {item.FUNCIONARIOMOV}</td>
          <td>{item.totalQuebraCaixa > 0 ? '0,00' : formatMoeda(item.totalQuebraCaixa)}</td>
          <td>{item.totalQuebraCaixa > 0 ? formatMoeda(item.totalQuebraCaixa) : '0,00'}</td>
          <td>{formatMoeda(item.saldoAnteriorQuebra)}</td>
          <td></td>
          <td></td>
        </tr>

      ))}
    </Fragment>
  )
}