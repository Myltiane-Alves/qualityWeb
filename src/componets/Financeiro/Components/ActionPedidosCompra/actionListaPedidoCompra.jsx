import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const ActionListaPedidoCompra = ({dadosPedidosCompras}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista Pedidos Compra'
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Documento', 'Movimento', 'Descrição', 'Fornecedor', 'Grupo', 'QTD Dias', 'DT Pedido', 'DT Entrega', 'DT Vencimento', 'DT Lançamento', 'Parcela', 'A Pagar', 'Forma Pagamento', 'Filial']],
      body: dados.map(item => [
        item.IDRESUMOPEDIDO,
        item.IDRESUMOPEDIDO,
        item.ASSTMIGRADOSAP, 
        item.DSDESCRICAOCONTA, 
        item.MODPEDIDO, 
        item.QTDDIASPAGAMENTO, 
        item.DTPEDIDOFORMATADA, 
        item.NOFORNECEDOR, 
        item.DTPREVENTREGAFORMATADA,
        item.DTVENCIMENTOFORMATADA, 
        item.DTCADASTROFORMATADA, 
        item.NUVEZESPARCELA, 
        formatMoeda(item.VRTOTALLIQUIDO), 
        item.DSFORMAPAGCONTA, 
        item.NOEMPESAPAG
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('pedidos_compra.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Pedido', 'Documento', 'Movimento', 'Descrição', 'Fornecedor', 'Grupo', 'QTD Dias', 'DT Pedido', 'DT Entrega', 'DT Vencimento', 'DT Lançamento', 'Parcela', 'A Pagar', 'Forma Pagamento', 'Filial'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Pedido' }, 
      { wpx: 100, caption: 'Documento' },
      { wpx: 100, caption: 'Movimento' }, 
      { wpx: 200, caption: 'Descrição' }, 
      { wpx: 250, caption: 'Fornecedor' }, 
      { wpx: 100, caption: 'Grupo' }, 
      { wpx: 100, caption: 'QTD Dias' }, 
      { wpx: 100, caption: 'DT Pedido' }, 
      { wpx: 100, caption: 'DT Entrega' }, 
      { wpx: 100, caption: 'DT Vencimento' }, 
      { wpx: 100, caption: 'DT Lançamento' }, 
      { wpx: 100, caption: 'Parcela' }, 
      { wpx: 100, caption: 'A Pagar' }, 
      { wpx: 150, caption: 'Forma Pagamento' }, 
      { wpx: 200, caption: 'Filial' }
      
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista Pedidos Compra');
    XLSX.writeFile(workbook, 'pedidos_compra.xlsx');
  };
  
  const dadosExcel = Array.isArray(dadosPedidosCompras) ? dadosPedidosCompras.map((item, index) => {
    return {
      IDRESUMOPEDIDO: item.IDRESUMOPEDIDO,
      IDDOCUMENTO: item.IDRESUMOPEDIDO,
      ASSTMIGRADOSAP: item.ASSTMIGRADOSAP == 'True' ? 'Migrado SAP' : 'Previsto',
      DSDESCRICAOCONTA: item.DSDESCRICAOCONTA,
      NOFORNECEDOR: item.NOFORNECEDOR,
      MODPEDIDO: item.MODPEDIDO,
      QTDDIASPAGAMENTO: item.QTDDIASPAGAMENTO,
      DTPEDIDOFORMATADA: item.DTPEDIDOFORMATADA,
      DTPREVENTREGAFORMATADA: item.DTPREVENTREGAFORMATADA,
      DTVENCIMENTOFORMATADA: item.DTVENCIMENTOFORMATADA,
      DTCADASTROFORMATADA: item.DTCADASTROFORMATADA,
      NUVEZESPARCELA: item.NUVEZESPARCELA,
      VRTOTALLIQUIDO: formatMoeda(item.VRTOTALLIQUIDO),
      DSFORMAPAGCONTA: item.DSFORMAPAGCONTA,
      NOEMPESAPAG: item.NOEMPESAPAG,
    }
  }) : [];

  const dados = dadosPedidosCompras.map((item) => {
    
    return {
      IDRESUMOPEDIDO: item.IDRESUMOPEDIDO,
      ASSTMIGRADOSAP: item.ASSTMIGRADOSAP,
      DSDESCRICAOCONTA: item.DSDESCRICAOCONTA,
      NOFORNECEDOR: item.NOFORNECEDOR,
      MODPEDIDO: item.MODPEDIDO,
      QTDDIASPAGAMENTO: item.QTDDIASPAGAMENTO,
      DTPEDIDOFORMATADA: item.DTPEDIDOFORMATADA,
      DTPREVENTREGAFORMATADA: item.DTPREVENTREGAFORMATADA,
      DTVENCIMENTOFORMATADA: item.DTVENCIMENTOFORMATADA,
      DTCADASTROFORMATADA: item.DTCADASTROFORMATADA,
      NUVEZESPARCELA: item.NUVEZESPARCELA,
      VRTOTALLIQUIDO: item.VRTOTALLIQUIDO,
      DSFORMAPAGCONTA: item.DSFORMAPAGCONTA,
      NOEMPESAPAG: item.NOEMPESAPAG,
    
    }
  })

  const calcularTotalAPagar = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.VRTOTALLIQUIDO)
    }
    return total
  }

  const conlunasPedidos = [
    {
      field: 'IDRESUMOPEDIDO',
      header: 'N° Pedido',
      body: row => <p style={{ color: 'blue'}}> {row.IDRESUMOPEDIDO}</p>,
      sortable: true
    },
    {
      field: 'IDRESUMOPEDIDO',
      header: 'Documento',
      body: row => <p style={{ color: 'blue'}}> {row.IDRESUMOPEDIDO}</p>,
      sortable: true
    },
    {
      field: 'ASSTMIGRADOSAP',
      header: 'Movimento',
      body: row => <p style={{ color: row.ASSTMIGRADOSAP == 'True' ? 'blue' : 'red' }}>{row.ASSTMIGRADOSAP == 'True' ? 'Migrado SAP' : 'Previsto'}</p>,
      sortable: true,
    },
    {
      field: 'DSDESCRICAOCONTA',
      header: 'Descrição',
      body: row => <p style={{ color: 'blue'}}> {row.DSDESCRICAOCONTA}</p>,
      sortable: true
    },
    {
      field: 'NOFORNECEDOR',
      header: 'Fornecedor',
      body: row => <p style={{ color: 'blue'}}> {row.NOFORNECEDOR} </p>,
      sortable: true
    },
    {
      field: 'MODPEDIDO',
      header: 'Grupo',
      body: row => <p style={{ color: 'blue'}}> {row.MODPEDIDO}</p>,
      sortable: true
    },
    {
      field: 'QTDDIASPAGAMENTO',
      header: 'QTD Dias',
      body: row => <p style={{ color: 'blue'}}> { row.QTDDIASPAGAMENTO}</p>,
      sortable: true
    },
    {
      field: 'DTPEDIDOFORMATADA',
      header: 'DT Pedido',
      body: row => <p style={{ color: 'blue'}}> {row.DTPEDIDOFORMATADA}</p>,
      sortable: true
    },
    {
      field: 'DTPREVENTREGAFORMATADA',
      header: 'DT Entrega',
      body: row => <p style={{ color: 'blue'}}> {row.DTPREVENTREGAFORMATADA}</p>,
      sortable: true
    },
    {
      field: 'DTVENCIMENTOFORMATADA',
      header: 'DT Vencimento',
      body: row => <p style={{ color: 'blue'}}> {row.DTVENCIMENTOFORMATADA}</p>,
      sortable: true
    },
    {
      field: 'DTCADASTROFORMATADA',
      header: 'DT Lançamento',
      body: row => <p style={{ color: 'blue'}}> {row.DTCADASTROFORMATADA}</p>,
      sortable: true
    },
    {
      field: 'NUVEZESPARCELA',
      header: 'Parcela',
      body: row => <p style={{ color: 'blue'}}> {row.NUVEZESPARCELA}</p>,
      footer: 'Total',
      sortable: true
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'A Pagar',
      body: row => <p style={{color: 'red'}}> {formatMoeda(row.VRTOTALLIQUIDO)} </p>,
      footer: formatMoeda(calcularTotalAPagar()),
      sortable: true
    },
    {
      field: 'DSFORMAPAGCONTA',
      header: 'Forma Pagamento',
      body: row => <p style={{ color: 'blue'}}> {row.DSFORMAPAGCONTA}</p>,
      sortable: true
    },
    {
      field: 'NOEMPESAPAG',
      header: 'Filial',
      body: row => <p style={{color: 'blue', width: '100px' }}>{row.NOEMPESAPAG}</p>,
      sortable: true
    }
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
          title="Vendas por Loja"
          value={dados}
          globalFilter={globalFilterValue}
          size={size}
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100, dados.length]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
        >
          {conlunasPedidos.map(coluna => (
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


    </Fragment>
  )
}

