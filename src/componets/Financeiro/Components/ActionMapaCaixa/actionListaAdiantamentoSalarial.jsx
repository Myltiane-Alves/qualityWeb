import { Fragment, useRef, useState } from "react"
import { formatMoeda } from "../../../../utils/formatMoeda"
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const ActionListaAdiantamentoSalarial = ({ dadosAdiantamentoSalarial }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small')
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Mapa de Caixas Por Loja',
    onAfterPrint: () => {
      console.log("Printed successfully!");
    },
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Despesas', 'Tipo Despesa', 'Mat/Usuário', 'Histórico', 'Pago a', 'Valor']],
      body: dados.map(item => [
        item.contador,
        item.DSCATEGORIA, 
        item.NOFUNCIONARIO, 
        item.DSHISTORIO, 
        item.DSPAGOA, 
        item.VRDESPESA
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('mapa_caixa_por_loja.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mapa de Caixas Por Loja');
    XLSX.writeFile(workbook, 'mapa_caixa_por_loja.xlsx');
  };

  // const dadosLista = dadosMapaCaixa.map((item, index) => {
  //   let contador = index + 1;
  //   item.contador,
  //   item.IDCATEGORIARECEITADESPESA, 
  //   item.NOFUNCIONARIO, 
  //   item.DSHISTORIO, 
  //   item.DSPAGOA, 
  //   item.VRDESPESA
  //   return {
  //     contador,
  //     IDCATEGORIARECDESP: item.IDCATEGORIARECEITADESPESA,
  //     DSCATEGORIA: item.DSCATEGORIA,
  //     NOFUNCIONARIO: item.NOFUNCIONARIO,
  //     DSHISTORIO: item.DSHISTORIO,
  //     DSPAGOA: item.DSPAGOA,
  //     VRDESPESA: item.VRDESPESA,

  //     // IDEMPRESA: item.IDEMPRESA,
  //     // DTDESPESA: item.DTDESPESA,
  //     // IDFUNCIONARIO: item.IDFUNCIONARIO,
  //     // NOLOGIN: item.NOLOGIN,
      
  //     // NOFUNCVALE: item.NOFUNCVALE,
  //     // NUNOTAFISCAL: item.NUNOTAFISCAL,
  //     // STATIVO: item.STATIVO,
  //     // STCANCELADO: item.STCANCELADO,
  //     // TPNOTA: item.TPNOTA,
  //     // NOFANTASIA: item.NOFANTASIA,
  //     IDDESPESASLOJA: item.IDDESPESASLOJA,
  //   }
  // });

  const dados = Array.isArray(dadosAdiantamentoSalarial) ? dadosAdiantamentoSalarial.map((item, index) => {

    return {
      IDADIANTAMENTOSALARIO: item.IDADIANTAMENTOSALARIO,
      VRVALORDESCONTO: item.VRVALORDESCONTO,
      TXTMOTIVO: item.TXTMOTIVO,
      IDFUNCIONARIO: item.IDFUNCIONARIO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOLOGIN: item.NOLOGIN,
    }
  }) : [];

  const calcularTotalAdiantamento = () => {
    let total = 0;
    for(let resultado of dados) {
      total += parseFloat(resultado.VRVALORDESCONTO); 
    }
    return total;
  }

  return (

    <Fragment>

      <div className="card">
        <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
          <tbody className="thead-themed">
            <tr>
              <td style={{ textAlign: 'center', fontSize: '1rem', width: '60%' }}>
                Total Despesa de Adiantamento
              </td>
              <td style={{ textAlign: 'right' }}>{formatMoeda(calcularTotalAdiantamento()) } </td>
            </tr>

          </tbody>
        </table>
      </div>

    </Fragment>
  )
}
