import { Fragment, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from '../../../../utils/dataFormatada';
import { formatMoeda } from '../../../../utils/formatMoeda';
import { ocultaParteDosDadosVoucher } from '../../../../utils/ocultarParte';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useReactToPrint } from "react-to-print";
import HeaderTable from '../../../Tables/headerTable';
import { toFloat } from '../../../../utils/toFloat';

export const ActionListaVoucher = ({ dadosVoucher }) => {
  const [dadosDetalheVoucher, setDadosDetalheVoucher] = useState([]);
  const [modalDetalhe, setModalDetalhe] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();



  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vouchers Emitidos',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [[
        'Nº Voucher', 
        'Loja Emissor', 
        'Caixa Emissor', 
        'Data Emissão', 
        'Valor', 
        'Loja Recebido', 
        'Caixa Recebido', 
        'Data Recebido', 
        'Situação',
        'Nº Venda',
        'Nº Produto',
        'Cod. Barras',
        'Descrição',
        'Quantidade',
        'Valor',
        'Vendedor'
      ]],
      body: dados.map(item => [
        item.NUVOUCHER,
        item.EMPORIGEM,
        item.DSCAIXAORIGEM ? 'CAIXA WEB' : 'CAIXA WEB',
        item.DTINVOUCHER,
        formatMoeda(item.VRVOUCHER),
        item.EMPDESTINO,
        item.DSCAIXADESTINO ? 'CAIXA WEB' : 'CAIXA WEB',
        item.DTOUTVOUCHER,
        item.STATIVO == 'True' ? 'ATIVO' : 'USADO',
        item.IDVENDA,
        item.CPROD,
        item.CEAN,
        item.DSPRODUTO,
        item.QTD,
        formatMoeda(item.VRTOTALLIQUIDO),
        item.VENDEDOR_NOME
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vouchers_emitidos.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = [
      'Nº Voucher', 
      'Loja Emissor', 
      'Caixa Emissor', 
      'Data Emissão', 
      'Valor', 
      'Loja Recebido', 
      'Caixa Recebido', 
      'Data Recebido', 
      'Situação',
      'Nº Venda',
      'Nº Produto',
      'Cod. Barras',
      'Descrição',
      'Quantidade',
      'Valor',
      'Vendedor'
    ];
    worksheet['!cols'] = [
      { wpx: 150, caption: 'Nº Voucher' },
      { wpx: 250, caption: 'Loja Emissor' },
      { wpx: 100, caption: 'Caixa Emissor' },
      { wpx: 100, caption: 'Data Emissão' },
      { wpx: 100, caption: 'Valor' },
      { wpx: 250, caption: 'Loja Recebido' },
      { wpx: 100, caption: 'Caixa Recebido' },
      { wpx: 100, caption: 'Data Recebido' },
      { wpx: 100, caption: 'Situação' },
      { wpx: 100, caption: 'Nº Venda' },
      { wpx: 100, caption: 'Nº Produto' },
      { wpx: 100, caption: 'Cod. Barras' },
      { wpx: 100, caption: 'Descrição' },
      { wpx: 100, caption: 'Quantidade' },
      { wpx: 100, caption: 'Valor' },
      { wpx: 200, caption: 'Vendedor' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vouchers Emitidos');
    XLSX.writeFile(workbook, 'vouchers_emitidos.xlsx');
  };

  const dados = dadosVoucher.map((item, index) => {
    
    return {
      NUVOUCHER: item.voucher.NUVOUCHER,
      EMPORIGEM: item.voucher.EMPORIGEM,
      DSCAIXAORIGEM: item.voucher.DSCAIXAORIGEM,
      DTINVOUCHER: item.voucher.DTINVOUCHER,
      VRVOUCHER: item.voucher.VRVOUCHER,
      EMPDESTINO: item.voucher.EMPDESTINO,
      DSCAIXADESTINO: item.voucher.DSCAIXADESTINO,
      DTOUTVOUCHER: item.voucher.DTOUTVOUCHER,
      STATIVO: item.voucher.STATIVO,

      // IDVOUCHER: item.voucher.IDVOUCHER,
      // STCANCELADO: item.voucher.STCANCELADO,

      IDVENDA: item.detalhe[0].vendadet?.IDVENDA,
      CPROD: item.detalhe[0].vendadet?.CPROD,
      CEAN: item.detalhe[0].vendadet?.CEAN,
      DSPRODUTO: item.detalhe[0].vendadet?.DSPRODUTO,
      QTD: item.detalhe[0].vendadet?.QTD,
      VRTOTALLIQUIDO: item.detalhe[0].vendadet?.VRTOTALLIQUIDO,
      VENDEDOR_NOME: item.detalhe[0].vendadet?.VENDEDOR_NOME,
      // IDVENDADETALHE: item.detalhe[0].vendadet?.IDVENDADETALHE,

    }
  });

  const colunasVouchers = [
    {
      field: 'NUVOUCHER',
      header: 'Nº Voucher',
      body: row => <th style={{ color: 'blue' }}>{ocultaParteDosDadosVoucher(row.NUVOUCHER)}</th>,

      sortable: true,
    },
    {
      field: 'EMPORIGEM',
      header: 'Loja Emissor',
      body: row => <th style={{ color: 'blue' }}>{row.EMPORIGEM}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXAORIGEM',
      header: 'Caixa Emissor',
      body: row => <th style={{ color: 'blue' }}>{row.DSCAIXAORIGEM ? 'CAIXA WEB' : 'CAIXA WEB'}</th>,
      sortable: true,
    },
    {
      field: 'DTINVOUCHER',
      header: 'Data Emissão',
      body: row => <th style={{ color: 'blue' }}>{row.DTINVOUCHER}</th>,
      sortable: true,
    },
    {
      field: 'VRVOUCHER',
      header: 'Valor',
      body: row => <th style={{ color: 'green' }}>{formatMoeda(row.VRVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'EMPDESTINO',
      header: 'Loja Recebido',
      body: row => <th style={{ color: 'blue' }}>{row.EMPDESTINO}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXADESTINO',
      header: 'Caixa Recebido',
      body: row => <th style={{ color: 'blue' }}>{row.DSCAIXADESTINO ? 'CAIXA WEB' : 'CAIXA WEB'}</th>,
      sortable: true,
    },
    {
      field: 'DTOUTVOUCHER',
      header: 'Data Recebido',
      body: row => <th style={{ color: 'blue' }}>{row.DTOUTVOUCHER}</th>,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {

        return (
          <th style={{ color: row.STATIVO == 'True' ? 'blue' : 'red' }}>{row.STATIVO == 'True' ? 'ATIVO' : 'USADO'}</th>
        )

      },
      sortable: true,
    },


  ]

  const colunasProdutosVoucher = [
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => row.IDVENDA,
    },
    {
      field: 'CPROD',
      header: 'Nº Produto',
      body: row => row.CPROD,
      sortable: true,
    },
    {
      field: 'CEAN',
      header: 'Cod. Barras',
      body: row => row.CEAN,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Descrição',
      body: row => row.DSPRODUTO,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => toFloat(row.QTD),
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Valor',
      body: row => formatMoeda(row.VRTOTALLIQUIDO),
      sortable: true,
    },
    {
      field: 'VENDEDOR_NOME',
      header: 'Vendedor',
      body: row => row.VENDEDOR_NOME,
      sortable: true,
    },

  ]

  return (
    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h2>Vouchers Emitidos</h2>
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
            title="Vouchers Emitidos"
            value={dados}
            size={size}
            globalFilter={globalFilterValue}
            sortOrder={-1}
            rows={true}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasVouchers.map(coluna => (
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
          <DataTable
            title="Vouchers Emitidos"
            value={dados}
            size={size}
            globalFilter={globalFilterValue}
            sortOrder={-1}
            rows={10}
            paginator
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasProdutosVoucher.map(coluna => (
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