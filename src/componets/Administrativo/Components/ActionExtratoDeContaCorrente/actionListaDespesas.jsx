import { Fragment } from "react";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaDespesas = ({ dadosExtratoLojaPeriodo, dados }) => {

  
  const dadosDespesas =  dadosExtratoLojaPeriodo.flatMap(( item) => 
    item.despesas.map((despesa) => {
      const saldoAnteriorDespesas = toFloat(dados[0]?.saldoAnteriorFaturas) - toFloat(despesa.VRDESPESA);
      return {
        DTDESPESAFORMATADA: despesa.DTDESPESAFORMATADA,
        DSHISTORIO: despesa.DSHISTORIO,
        DSCATEGORIA: despesa.DSCATEGORIA,
        VRDESPESA: toFloat(despesa.VRDESPESA),
        DSPAGOA: despesa.DSPAGOA,
        saldoAnteriorDespesas: toFloat(saldoAnteriorDespesas),
      };
    })
  );

  return (
    <Fragment>
    
        {dadosDespesas.map((item, index) => (
          <tr className="table-danger" key={index}>
            <td>{item?.DTDESPESAFORMATADA}</td>
            <td>{item?.DSHISTORIO}</td>
            <td>{item?.DSPAGOA}</td>
            <td>{item?.DSCATEGORIA}</td>
            <td>{formatMoeda(item?.VRDESPESA)}</td>
            <td>0,00</td>
            <td>{formatMoeda(item?.saldoAnteriorDespesas)}</td>
            <td></td>
            <td></td>
          </tr>
        ))
      }
    </Fragment>
  );
};