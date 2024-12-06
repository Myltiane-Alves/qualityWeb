import { Fragment, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from '../../../../utils/dataFormatada';
import { formatMoeda } from '../../../../utils/formatMoeda';
import HeaderTable from '../../../Tables/headerTable';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const ActionListaProdutosQuality = ({ dadosProdutos }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Produtos Quality',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['contador', 'Cod. Barras', 'Descrição', 'Data Alteração', 'Venda PDV' ]],
      body: dados.map(item => [item.contador, item.DSNOME, item.NUCODBARRAS, formatMoeda(item.PRECO_VENDA), item.DTULTALTERACAO]),
      autoPrint: true,
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    }); 
    doc.save('produtos_quality.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header =['contador', 'Cod. Barras', 'Descrição', 'Data Alteração', 'Venda PDV' ];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 100, caption: 'Cod. Barras' },
      { wpx: 200, caption: 'Descrição' },
      { wpx: 200, caption: 'Data Alteração' },
      { wpx: 100, caption: 'Venda PDV' },
     
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos Quality");
    XLSX.writeFile(workbook, 'produtos_quality.xlsx');
  };

  
  const dados = dadosProdutos.map((item, index) => {
    let contador = index + 1;
    return {

      contador,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      DTULTALTERACAO: item.DTULTALTERACAO,
      PRECO_VENDA: item.PRECO_VENDA,
    
    }
  });

  const colunasProdutos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
      width: "10%"
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cód. Barras',
      body: row => <th>{parseFloat(row.NUCODBARRAS)}</th>,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Descrição',
      body: row => <th>{row.DSNOME}</th>,
      sortable: true,
    },
    {
      field: 'DTULTALTERACAO',
      header: 'Data Alteração',
      body: row => <th>{row.DTULTALTERACAO}</th>,
      sortable: true,
    },
    {
      field: 'PRECO_VENDA',
      header: 'Venda PDV',
      body: row => <th>{formatMoeda(row.PRECO_VENDA)}</th>,
      sortable: true,
    },
  ]




  return (
    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista de Produtos Quality</h2>
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
            title="Produtos Quality"
            value={dados}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasProdutos.map(coluna => (
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