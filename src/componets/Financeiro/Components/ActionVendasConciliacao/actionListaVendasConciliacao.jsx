import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda"
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";

export const ActionListaVendasConciliacao = ({dadosVendasConciliacao}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Vendas Conciliação',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'ID EMPRESA', 'EMPRESA', 'ID VENDA', 'DT VENDA', 'VR TOTAL', 'DESCONTO', 'VR PAGO', 'TP PAGAMENTO', 'NSU', 'Nº AUTORIZÇÃO', 'ADQUIRENTE']],
      body: dados.map(item => [
        item.contador, 
        item.IDEMPRESA, 
        item.NOFANTASIA, 
        item.IDVENDA, 
        item.DATA, 
        formatMoeda(item.VRTOTALPAGO), 
        formatMoeda(item.VRTOTALDESCONTO), 
        formatMoeda(item.VRPAGO), 
        item.DSTIPOPAGAMENTO,  
        item.NSU, 
        item.NUAUTORIZACAO, 
        item.DSADQUIRENTE, 
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_conciliacao.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();

    const header = ['Nº', 'ID EMPRESA', 'EMPRESA', 'ID VENDA', 'DT VENDA', 'VR TOTAL', 'DESCONTO', 'VR PAGO', 'TP PAGAMENTO', 'NSU', 'Nº AUTORIZÇÃO', 'ADQUIRENTE'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'Nº' }, 
      { wpx: 100, caption: 'ID EMPRESA' },
      { wpx: 200, caption: 'EMPRESA' },
      { wpx: 100, caption: 'ID VENDA' },
      { wpx: 100, caption: 'DT VENDA' },
      { wpx: 100, caption: 'VR TOTAL' },
      { wpx: 100, caption: 'DESCONTO' },
      { wpx: 100, caption: 'VR PAGO' },
      { wpx: 100, caption: 'TP PAGAMENTO' },
      { wpx: 100, caption: 'NSU' },
      { wpx: 100, caption: 'Nº AUTORIZÇÃO' },
      { wpx: 100, caption: 'ADQUIRENTE' }, 
      
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Vendas Conciliação');
    XLSX.writeFile(workbook, 'vendas_conciliacao.xlsx');
  };

  const dados = Array.isArray(dadosVendasConciliacao) ? dadosVendasConciliacao.map((item, index) => {
    let contador = index + 1;
    console.log(item)
    return {

      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      IDVENDA: item.IDVENDA,
      DATA: item.DATA,
      VRTOTALPAGO: item.VRTOTALPAGO,
      VRTOTALDESCONTO: item.VRTOTALDESCONTO,
      VRPAGO: item.VRPAGO,
      DSTIPOPAGAMENTO: item.DSTIPOPAGAMENTO,
      NSU: item.NSU,
      NUAUTORIZACAO: item.NUAUTORIZACAO,
      DSADQUIRENTE: item.DSADQUIRENTE,
      contador
    }
  }) : [];

  const colunasVendasLoja = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{  }}>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'IDEMPRESA',
      header: 'ID Empresa',
      body: row => <th style={{  }}>{row.IDEMPRESA}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => <th style={{  }}>{row.NOFANTASIA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'ID Venda',
      body: row => <th style={{  }}>{row.IDVENDA}</th>,
      sortable: true,
    },
    {
      field: 'DATA',
      header: 'DT Venda',
      body: row => <th style={{  }}>{row.DATA}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALPAGO',
      header: 'Vr Total',
      body: row => <th style={{  }}>{formatMoeda(row.VRTOTALPAGO)}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALDESCONTO',
      header: 'Desconto',
      body: row => <th style={{  }}>{formatMoeda(row.VRTOTALDESCONTO)}</th>,
      sortable: true,
    },
    {
      field: 'VRPAGO',
      header: 'Vr Pago',
      body: row => <th style={{  }}>{formatMoeda(row.VRPAGO)}</th>,
      sortable: true,
    },
    {
      field: 'DSTIPOPAGAMENTO',
      header: 'Tp Pagamento',
      body: row => <th style={{  }}>{row.DSTIPOPAGAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'NSU',
      header: 'NSU',
      body: row => <th style={{  }}>{row.NSU}</th>,
      sortable: true,
    },
    {
      field: 'NUAUTORIZACAO',
      header: 'Nº Autorização',
      body: row => <th style={{  }}>{row.NUAUTORIZACAO}</th>,
      sortable: true,
    },
    {
      field: 'DSADQUIRENTE',
      header: 'Adquirente',
      body: row => <th style={{  }}>{row.DSADQUIRENTE}</th>,
      sortable: true,
    },
  ]

  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Vendas Conciliação</h2>
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
            title="Vendas por Loja"
            value={dados}
            size={size}
            globalFilter={globalFilterValue}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50, 100, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendasLoja.map(coluna => (
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
