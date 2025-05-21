import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useReactToPrint } from "react-to-print";
import HeaderTable from "../../../Tables/headerTable";

export const ActionListaProdutoMaisVendido  = ({dadosProdutosMaisVendidos}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const dataTableRef = useRef();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Produtos Mais Vendidos',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Código', 'Código Barras', 'Produto', 'Quantidade', 'Valor Unitário', 'Valor Total']],
      body: dados.map(item => [
        item.contador,
        item.CPROD,
        item.NUCODBARRAS,
        item.DSNOME,
        item.QTD,
        formatMoeda(item.VALOR_UNITARIO),
        formatMoeda(item.VALOR_TOTAL),
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('produto_mais_vendidos.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Código', 'Código Barras', 'Produto', 'Quantidade', 'Valor Unitário', 'Valor Total']
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Nº' },
      { wpx: 100, caption: 'Código'},
      { wpx: 100, caption: 'Código Barras' },
      { wpx: 300, caption: 'Produto' },
      { wpx: 100, caption: 'Quantidade' },
      { wpx: 100, caption: 'Valor Unitário' },
      { wpx: 100, caption: 'Valor Total' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produto Mais Vendidos');
    XLSX.writeFile(workbook, 'produto_mais_vendidos.xlsx');
  };


  const calcularTotalQuantidadePorPagina = () => {
    let total = 0;
    const firstIndex = first * rows;
    const lastIndex = firstIndex + rows;
    for(let i = firstIndex; i < lastIndex && i < dadosProdutosMaisVendidos.length; i++) {
      if(dadosProdutosMaisVendidos[i]) {
        total += parseFloat(dadosProdutosMaisVendidos[i].QTD);
      }
    }
    return total;
  }
 

  const calcularTotalValorUnitarioPorPagina = () => {
    let total = 0;
    const firstIndex = first * rows;
    const lastIndex = firstIndex + rows;
    for(let i = firstIndex; i < lastIndex && i < dadosProdutosMaisVendidos.length; i++) {
      if(dadosProdutosMaisVendidos[i]) {
        total += parseFloat(dadosProdutosMaisVendidos[i].VALOR_UNITARIO);
      }
    }
    return total;
  }

  const calcularTotalValorTotalPorPagina = () => {
    let total = 0;
    const firstIndex = first * rows;
    const lastIndex = firstIndex + rows;
    for(let i = firstIndex; i < lastIndex && i < dadosProdutosMaisVendidos.length; i++) {
      if(dadosProdutosMaisVendidos[i]) {
        total += parseFloat(dadosProdutosMaisVendidos[i].VALOR_TOTAL);
      }
    }
    return total;
  }

  const dados = dadosProdutosMaisVendidos.map((item, index) => {
    let contador = index + 1;

    return {
      contador,
      CPROD: item.CPROD,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      QTD: item.QTD,
      VALOR_UNITARIO: item.VALOR_UNITARIO,
      VALOR_TOTAL: item.VALOR_TOTAL,
    }
  });
  
  const calcularTotalQuantidade = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTD), 0);
  }

  const calcularTotalValorUnitario = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.VALOR_UNITARIO), 0);
  }

  const calcularTotalValorTotal = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.VALOR_TOTAL), 0);
  }

  const colunasProdutoMaisVendidos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true
    },
    {
      field: 'CPROD',
      header: 'Código',
      body: row => <th>{row.CPROD}</th>,
      sortable: true
    },
    {
      field: 'NUCODBARRAS',
      header: 'Código Barras',
      body: row => <th>{row.NUCODBARRAS}</th>,
      sortable: true
    },
    {
      field: 'DSNOME',
      header: 'Produto',
      body: row => <th>{row.DSNOME}</th>,
      sortable: true
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => <th>{parseFloat(row.QTD)}</th>,
      footer: () => {
        return(
          <div>          
            <th style={{ fontWeight: 600, }}>Total Página: {parseFloat(calcularTotalQuantidadePorPagina())}</th>
            <hr/>
            <th style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidade())}</th>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'VALOR_UNITARIO',
      header: 'Valor Unitário',
      body: row => formatMoeda(row.VALOR_UNITARIO),
      footer: () => {
        return(
          <div>          
            <th style={{ fontWeight: 600, }}>Total Página: {formatMoeda(calcularTotalValorUnitarioPorPagina())}</th>
            <hr/>
            <th style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorUnitario())}</th>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'VALOR_TOTAL',
      header: 'Valor Total',
      body: row => formatMoeda(row.VALOR_TOTAL),
      footer: () => {
        return(
          <div>          
            <th style={{ fontWeight: 600, }}>Total Página: {formatMoeda(calcularTotalValorTotalPorPagina())}</th>
            <hr/>
            <th style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorTotal())}</th>
          </div>
        )
      },
      sortable: true
    }
  ]

  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Vendas Produtos Mais Vendido</h2>
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
            title="Produtos Mais Vendidos"
            value={dados}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            paginator={true}
            rows={rows}
            first={first}
            onPage={onPageChange}
            totalRecords={dados.length}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasProdutoMaisVendidos.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}

                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem'}}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>

    </Fragment>
  )

}