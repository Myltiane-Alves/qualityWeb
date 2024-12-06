import { Fragment, useRef, useState } from "react"
import { formatMoeda } from "../../../../utils/formatMoeda"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaVendasResumidaDigital = ({ dadosVendasDetalhadas }) => {
  const [size, setSize] = useState('small')
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vendas Digitais Detalhada',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Data', 'CNPJ', 'Loja', 'Quantidade', 'Valor']],
      body: dadosListaVendas.map(item => [
        item.DTHORAFECHAMENTOFORMATADA,
        item.NUCNPJ,
        item.NOFANTASIA,
        item.QTD,
        formatMoeda(item.VRTOTALLIQUIDO)
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_digitais_detalhada.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosListaVendas);
    const workbook = XLSX.utils.book_new(); const header = ['Data', 'CNPJ', 'Loja',  'Quantidade','Valor'];
    worksheet['!cols'] = [
      { wpx: 150,  caption: 'Data', }, 
      { wpx: 150,  caption: 'CNPJ', }, 
      { wpx: 200, caption: 'Loja' }, 
      { wpx: 50, caption: 'Quantidade' }, 
      { wpx: 100, caption: 'Valor' }, 
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas Digitais Detalhada');
    XLSX.writeFile(workbook, 'vendas_digitais_detalhada.xlsx');
  };

  const calcularTotalQuantidade = () => {
    let total = 0;
    for (let vendas of dadosListaVendas) {
      total += parseFloat(vendas.QTD);
    }
    return total;
  }

  const calcularTotalValor = () => {
    let total = 0;
    for (let vendas of dadosListaVendas) {
      total += parseFloat(vendas.VRTOTALLIQUIDO);
    }
    return total;
  }

  const dadosListaVendas =  Array.isArray(dadosVendasDetalhadas) ? dadosVendasDetalhadas.map((item) => {

    return {
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NUCNPJ: item.NUCNPJ,
      NOFANTASIA: item.NOFANTASIA,
      QTD: toFloat(item.QTD),
      VRTOTALLIQUIDO: toFloat(item.VRTOTALLIQUIDO),
    }
  }): [];


  const colunasVendasResumida = [
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Data',
      body: row => <th style={{ color: 'blue' }} > {dataFormatada(row.DTHORAFECHAMENTO)}</th>,
      sortable: true,
    },
    {
      field: 'NUCNPJ',
      header: 'CNPJ',
      body: row => <th style={{ color: 'blue' }} > {row.NUCNPJ}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <th style={{ color: 'blue' }} > {row.NOFANTASIA}</th>,
      footer: <p style={{ textAlign: 'center' }}>Total</p>,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => <th style={{ color: 'blue' }} > {row.QTD}</th>,
      footer: calcularTotalQuantidade(),
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Valor',
      body: row => <th style={{ color: 'blue' }} > {formatMoeda(row.VRTOTALLIQUIDO)}</th>,
      footer: formatMoeda(calcularTotalValor()),
      sortable: true,
    },

  ]


  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Vendas Resumidas</h2>
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <HeaderTable
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            handlePrint={handlePrint}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
          />
        </div>

        <div className="card" ref={dataTableRef}>

          <DataTable
            title="Vendas Digitais Resumida"
            value={dadosListaVendas}
            globalFilter={globalFilterValue}
            size={size}
            sortField="VRTOTALPAGO"
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendasResumida.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}

                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>

    </Fragment>
  )
}