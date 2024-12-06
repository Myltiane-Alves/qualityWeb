import React, { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";

export const ActionListaEstoqueRotatividade = ({ dadosEstoqueRotatividade }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Estoque Rotatividade',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Produto', 'Data Mov.', 'QTD Início', 'QTD Entrada', 'QTD Entrada Voucher', 'QTD Saída', 'QTD Saída Transfrência', 'QTD Ret. Ajuste Pedido', 'QTD Ajuste Balanço', 'QTD Final']],
      body: dados.map(item => [
        item.DSPRODUTO,
        item.DATAMOVIMENTO,
        item.QTDINICIO,
        item.QTDENTRADA,
        item.QTDENTRADAVOUCHER,
        item.QTDSAIDA,
        item.QTDSAIDATRANSFERENCIA,
        item.QTDRETORNOAJUSTEPEDIDO,
        item.QTDAJUSTEBALANCO,
        item.QTDFINAL
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('estoque_rotatividade.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Produto', 'Data Mov.', 'QTD Início', 'QTD Entrada', 'QTD Entrada Voucher', 'QTD Saída', 'QTD Saída Transfrência', 'QTD Ret. Ajuste Pedido', 'QTD Ajuste Balanço', 'QTD Final'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'Produto' },
      { wpx: 200, caption: 'Data Mov.' },
      { wpx: 100, caption: 'QTD Início' },
      { wpx: 100, caption: 'QTD Entrada' },
      { wpx: 100, caption: 'QTD Entrada Voucher' },
      { wpx: 100, caption: 'QTD Saída' },
      { wpx: 100, caption: 'QTD Saída Transfrência' },
      { wpx: 100, caption: 'QTD Ret. Ajuste Pedido' },
      { wpx: 100, caption: 'QTD Ajuste Balanço' },
      { wpx: 100, caption: 'QTD Final' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estoque Rotatividade');
    XLSX.writeFile(workbook, 'estoque_rotatividade.xlsx');
  };

  const dados = dadosEstoqueRotatividade.map((item, index) => {
    console.log(item)
    return {

      DSPRODUTO: item.DSPRODUTO,
      DATAMOVIMENTO: item.DATAMOVIMENTO,
      QTDINICIO: item.QTDINICIO,
      QTDENTRADA: item.QTDENTRADA,
      QTDENTRADAVOUCHER: item.QTDENTRADAVOUCHER,
      QTDSAIDA: item.QTDSAIDA,
      QTDSAIDATRANSFERENCIA: item.QTDSAIDATRANSFERENCIA,
      QTDRETORNOAJUSTEPEDIDO: item.QTDRETORNOAJUSTEPEDIDO,
      QTDAJUSTEBALANCO: item.QTDAJUSTEBALANCO,
      QTDFINAL: item.QTDFINAL,
      NUCODBARRAS: item.NUCODBARRAS,
      PRECOCUSTO: item.PRECOCUSTO,
      PRECOVENDA: item.PRECOVENDA,
      IDPRODUTO: item.IDPRODUTO
    }
  });

  const calcularQtdEntrada = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDENTRADA), 0);
  }
  
  const calcularQtdEntradaVoucher = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDENTRADAVOUCHER), 0);
  }
  const calcularQtdSaida = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDSAIDA), 0);
  }
  const calcularQtdSaidaTransferencia = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDSAIDATRANSFERENCIA), 0);
  }
  const calcularQtdRetornoAjustePedido = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDRETORNOAJUSTEPEDIDO), 0);
  }
  const calcularQtdAjusteBalanco = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDAJUSTEBALANCO), 0);
  }

  const colunasEstoqueRotatividade = [

    {
      field: 'DATAMOVIMENTO',
      header: 'Data Movimento',
      body: row => <th style={{ color: 'blue' }}>{row.DATAMOVIMENTO}</th>,
      sortable: true
    },
    {
      field: 'QTDINICIO',
      header: 'QTD Início',
      body: row => <th style={{ color: 'blue' }}>{row.QTDINICIO}</th>,
      sortable: true
    },
    {
      field: 'QTDENTRADA',
      header: 'QTD Entrada',
      body: row => <th style={{ color: 'blue' }}>{row.QTDENTRADA}</th>,
      sortable: true
    },
    {
      field: 'QTDENTRADAVOUCHER',
      header: 'QTD Entrada Voucher',
      body: row => <th style={{ color: 'blue' }}>{row.QTDENTRADAVOUCHER}</th>,
      sortable: true
    },
    {
      field: 'QTDSAIDA',
      header: 'QTD Saída',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.QTDSAIDA)}</th>,
      sortable: true
    },
    {
      field: 'QTDSAIDATRANSFERENCIA',
      header: 'QTD Saída Transferência',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.QTDSAIDATRANSFERENCIA)}</th>,
      sortable: true
    },
    {
      field: 'QTDRETORNOAJUSTEPEDIDO',
      header: 'QTD Ret. Ajuste Pedido',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.QTDRETORNOAJUSTEPEDIDO)}</th>,
      sortable: true
    },
    {
      field: 'QTDAJUSTEBALANCO',
      header: 'QTD Ajuste Balanço',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.QTDAJUSTEBALANCO)}</th>,
      sortable: true
    },
    {
      field: 'QTDFINAL',
      header: 'QTD Final',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.QTDFINAL)}</th>,
      sortable: true
    },


  ]

  const HeaderTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2" style={{ alignContent: 'center' }}>
        <span className="font-bold" style={{fontWeight: 600}}>
          {`${rowData.NUCODBARRAS} - ${rowData.DSPRODUTO} / Custo R$ ${formatMoeda(rowData.PRECOCUSTO)}  - Venda R$ ${formatMoeda(rowData.PRECOVENDA)}`}
        </span>
      </div>
    );
  };

  const footerGroup = (
    <ColumnGroup>

      <Row>
        <Column footer="Total " colSpan={3} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem', textAlign: 'center' }} />
        <Column footer={calcularQtdEntrada()} colSpan={1} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={calcularQtdEntradaVoucher()} colSpan={1} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={calcularQtdSaida()} colSpan={1} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={calcularQtdSaidaTransferencia()} colSpan={1} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularQtdRetornoAjustePedido())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularQtdAjusteBalanco())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={""} colSpan={''} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>
    </ColumnGroup>
  )

  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Estoque Rotatividade</h2>
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
            title="Estoque Rotatividade"
            value={dados}
            globalFilter={globalFilterValue}
            size={size}
            footerColumnGroup={footerGroup}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            rowGroupMode="subheader"
            groupRowsBy="IDPRODUTO"
            sortMode="single"
            scrollable
            rowGroupHeaderTemplate={HeaderTemplate}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasEstoqueRotatividade.map(coluna => (
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
