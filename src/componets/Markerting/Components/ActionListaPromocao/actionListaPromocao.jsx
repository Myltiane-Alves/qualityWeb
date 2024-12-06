import React, { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";

export const ActionListaPromocao = ({ dadosListaPromocao }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Produto Promoção',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', , 'Descrição', 'Situação']],
      body: dados.map(item => [
        item.IDRESUMOPROMO,
        item.DSPROMO,
        item.STATIVO === 'True' ? 'Ativo' : 'Inativo',
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('produto_promocao.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['ID Produto', 'Código de Barras', 'Descrição'];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'ID Produto' },
      { wpx: 200, caption: 'Código de Barras' },
      { wpx: 200, caption: 'Descrição' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produto Promoção');
    XLSX.writeFile(workbook, 'produto_promocao.xlsx');
  };



  const dados = dadosListaPromocao.map((item) => {

    return {
      IDRESUMOPROMO: item.IDRESUMOPROMO,
      DSPROMO: item.DSPROMO,
      STATIVO: item.STATIVO,
    }
  });

  const colunasListaPromocao = [
    {
      field: 'IDRESUMOPROMO',
      header: 'ID',
      body: row => <th style={{ color: 'blue' }} >{row.IDRESUMOPROMO}</th>,
      sortable: true,
    },
    {
      field: 'DSPROMO',
      header: 'Descrição',
      body: row => <th style={{ color: 'blue' }} >{row.DSPROMO}</th>,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => (
        <th style={{ color: row.STATIVO == 'True' ? 'blue' : 'red' }}>
          {row.STATIVO === 'True' ? 'Ativo' : 'Inativo'}
        </th>

      ),
      sortable: true,
    },
    {
      field: 'Detalhar',
      header: 'Detalhar',
      body: row => <p style={{ color: 'blue' }} >{row.NUCODBARRAS}</p>,
      sortable: true,
    },
  ]


  return (

    <Fragment>

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
          title="Lista de Promoções"
          value={dados}
          size={size}
          globalFilter={globalFilterValue}
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasListaPromocao.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem', border: '1px solid #e9e9e9' }}

            />
          ))}
        </DataTable>

      </div>
    </Fragment >
  )
}
