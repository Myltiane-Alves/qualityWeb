import { Fragment, useEffect, useState } from "react";
import { toFloat } from "../../../../utils/toFloat";
import { formatMoeda } from "../../../../utils/formatMoeda";

export const ActionListaAdiantamentos = ({dadosExtratoLojaPeriodo, dados}) => {
  const [dadosAdiantamentos, setDadosAdiantamentos] = useState([]);

  useEffect(() => {
    let saldoAnterior = toFloat(dados[0]?.saldoAnteriorDespesas);

    const dadosAdiantamentos = dadosExtratoLojaPeriodo.flatMap((item) => 
      item.adiantamentos.map((adiantamentos) => {
        const saldoAnteriorAdiantamentos = saldoAnterior - toFloat(adiantamentos.VRVALORDESCONTO);
        saldoAnterior = saldoAnteriorAdiantamentos;
        return {
          DTLANCAMENTOADIANTAMENTO: adiantamentos.DTLANCAMENTOADIANTAMENTO,
          NOFUNCIONARIO: adiantamentos.NOFUNCIONARIO,
          DSMOTIVO: adiantamentos.DSMOTIVO,
          VRVALORDESCONTO: toFloat(adiantamentos.VRVALORDESCONTO),
          saldoAnteriorAdiantamentos: saldoAnteriorAdiantamentos,
        };
      })
    );

    setDadosAdiantamentos(dadosAdiantamentos);
  }, [dadosExtratoLojaPeriodo, dados]);
  
  return (
    <Fragment>
      {dadosAdiantamentos.map((item, index) => (
        <tr className="table-danger" key={index}>
            <td>{item.DTLANCAMENTOADIANTAMENTO}</td>
            <td>Adiantamento de Salário </td>
            <td>{item.NOFUNCIONARIO}</td>
            <td>{item.DSMOTIVO}</td>
            <td>{formatMoeda(item.VRVALORDESCONTO)}</td>
            <td>0,00</td>
            <td>{formatMoeda(item.saldoAnteriorAdiantamentos) ? formatMoeda(item.saldoAnteriorAdiantamentos) : 0}</td>
            <td></td>
            <td></td>
        </tr>
      ))}
    </Fragment>
  )
}