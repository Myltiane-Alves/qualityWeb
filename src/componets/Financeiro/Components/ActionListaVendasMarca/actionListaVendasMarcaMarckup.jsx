import { Fragment, useRef, useState } from "react"
import { formatMoeda } from "../../../../utils/formatMoeda";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toFloat } from "../../../../utils/toFloat";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatarPorcentagem } from "../../../../utils/formatarPorcentagem";

export const ActionListaVendasMarcaMarckup = ({
  dadosListaVendasMarcaMarckup,
}) => {
  const [size, setSize] = useState('small')
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vendas Por Período - Indicadores',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [[
        '#',
      'Loja',
      'Venda Bruta (R$)', 
      'Desconto (R$)', 
      'Desconto (%)', 
      'Venda Bruta Desconto (%)',
      'Voucher (R$)', 
      'Voucher (%)', 
      'Venda Líquida (R$)', 
      'Custo (R$)',
      'Custo (%)', 
      'Marckup (%)',
      'Indicador',
      'Margem Bruta (R$)', 
      'Margem (%)'
      ]],
      body: dadosVendasMarcaMarckup.map(item => [
        item.IDEMPRESA,
        item.NOFANTASIA,
        formatMoeda(item.valorVendaBrutaMarckup),
        formatMoeda(item.valorDesconto),
        formatarPorcentagem(item.percentualDesconto),
        formatMoeda(item.valorPago),
        formatMoeda(item.voucher),
        formatarPorcentagem(item.percentualVoucher),
        formatMoeda(item.valorTotalVendaLiquida),
        formatMoeda(item.TOTALCUSTO),
        formatarPorcentagem(item.custoPercentual),
        formatarPorcentagem(item.marckup),
        parseFloat(item.indicadorVenda),
        formatMoeda(item.margem),
        formatarPorcentagem(item.margemPercentual),
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_periodo_indicadores.pdf');
  };
  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosVendasMarcaMarckupExcel);
    const workbook = XLSX.utils.book_new();
    const header = [
      '#',
      'Loja',
      'Venda Bruta (R$)', 
      'Desconto (R$)', 
      'Desconto (%)', 
      'Venda Bruta Desconto (%)',
      'Voucher (R$)', 
      'Voucher (%)', 
      'Venda Líquida (R$)', 
      'Custo (R$)',
      'Custo (%)', 
      'Marckup (%)',
      'Indicador',
      'Margem Bruta (R$)', 
      'Margem (%)'
    ];
    worksheet['!cols'] = [
      { wpx: 20,  caption: 'ID Empresa', }, 
      { wpx: 200, caption: 'Loja' }, 
      { wpx: 100, caption: 'Venda Bruta (R$)' }, 
      { wpx: 100, caption: 'Desconto (R$)' }, 
      { wpx: 150, caption: 'Desconto (%)' }, 
      { wpx: 100, caption: 'Venda Bruta Desconto (%)' }, 
      { wpx: 100, caption: 'Voucher (R$)' }, 
      { wpx: 100, caption: 'Voucher (%)' }, 
      { wpx: 100, caption: 'Venda Líquida (R$)' },
      { wpx: 100, caption: 'Custo (R$)' }, 
      { wpx: 100, caption: 'Custo (%)' }, 
      { wpx: 100, caption: 'Marckup (%)' }, 
      { wpx: 100, caption: 'Indicador' }, 
      { wpx: 100, caption: 'Margem Bruta (R$)' }, 
      { wpx: 100, caption: 'Margem (%)' }, 
     
    ]; 


    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas Período - Indicadores');
    XLSX.writeFile(workbook, 'vendas_periodo_indicadores.xlsx');
  };

 

  const calcularValorTotalVendaLiquida = (item) => {
    return (
      toFloat(item.valorPago) - toFloat(item.voucher)
    )
  }

  const calcularValorVendaBrutaMarckup = (item) => {
    return (
      (toFloat(item.valorPago) + toFloat(item.valorDesconto))
    )
  }

  const calcularMarckup = (item) => {
    return (
      ((toFloat(item.valorPago) / toFloat(item.vendaMarca.TOTALCUSTO)) - 1) * 100
    )
  }

  const calcularIndicadorVenda = (item) => {
    return (
      ((toFloat(item.valorPago) / toFloat(item.vendaMarca.TOTALCUSTO)))
    )
  }
  const calcularMargem = (item) => {
    return (
      ((toFloat(item.valorPago) - toFloat(item.vendaMarca.TOTALCUSTO)))
    )
  }
  const calcularCustoPercentual = (item) => {
    return (
      ((toFloat(item.vendaMarca.TOTALCUSTO) * 100) / toFloat(item.valorPago))
    )
  }
  const calcularMargemPercentual = (item) => {
    return (
      100 - ((toFloat(item.vendaMarca.TOTALCUSTO) * 100) / toFloat(item.valorPago))
    )
  }

  const calcularPercentualDesconto = (item) => {
    return (
      ((toFloat(item.valorDesconto) * 100) / (toFloat(item.valorPago) + toFloat(item.valorDesconto)))
    )
  }
  const calcularPercentualVoucherMarckup = (item) => {
    return (
      ((toFloat(item.voucher) * 100) / (toFloat(item.valorPago)))
    )
  }
  const calcularTotalPercentualVoucher = (item) => {
    return (
      ((toFloat(item.voucher) * 100) / (toFloat(item.valorPago)))
    )
  }

  const calcularTotalPercentualDesconto = (item) => {
    return (
      ((toFloat(item.valorDesconto) * 100) / (toFloat(item.valorPago) + toFloat(item.valorDesconto)))
    )
  }

  const dadosVendasMarcaMarckupExcel = dadosListaVendasMarcaMarckup.map((item, index) => {
    const valorVendaBrutaMarckup = calcularValorVendaBrutaMarckup(item);
    const percentualDesconto = calcularPercentualDesconto(item);
    const percentualVoucher = calcularPercentualVoucherMarckup(item);
    const valorTotalVendaLiquida = calcularValorTotalVendaLiquida(item);
    const custoPercentual = calcularCustoPercentual(item);
    const marckup = calcularMarckup(item);
    const indicadorVenda = calcularIndicadorVenda(item);
    const margem = calcularMargem(item);
    const margemPercentual = calcularMargemPercentual(item);

    return {
      IDEMPRESA: item.vendaMarca.IDEMPRESA,
      NOFANTASIA: item.vendaMarca.NOFANTASIA,
      valorVendaBrutaMarckup: valorVendaBrutaMarckup,
      valorDesconto: item.valorDesconto,
      percentualDesconto: percentualDesconto,
      valorPago: item.valorPago,
      voucher: item.voucher,
      percentualVoucher: percentualVoucher,
      valorTotalVendaLiquida: valorTotalVendaLiquida,
      TOTALCUSTO: item.vendaMarca.TOTALCUSTO,
      custoPercentual: custoPercentual,
      marckup: marckup,
      indicadorVenda: indicadorVenda,
      margem: margem,
      margemPercentual: margemPercentual,
    }
  })

  const dadosVendasMarcaMarckup = dadosListaVendasMarcaMarckup.map((item, index) => {
    const valorTotalVendaLiquida = calcularValorTotalVendaLiquida(item);
    const valorVendaBrutaMarckup = calcularValorVendaBrutaMarckup(item);
    const marckup = calcularMarckup(item);
    const indicadorMarckup = (marckup / 100)
    const indicadorVenda = calcularIndicadorVenda(item);
    const margem = calcularMargem(item);
    const custoPercentual = calcularCustoPercentual(item);
    const margemPercentual = calcularMargemPercentual(item);
    const percentualDesconto = calcularPercentualDesconto(item);
    const percentualVoucher = calcularPercentualVoucherMarckup(item);
    const totalPercentualVoucher = calcularTotalPercentualVoucher(item);
    const valorTotalPercentualDesconto = calcularTotalPercentualDesconto(item);

    return {

      NOFANTASIA: item.vendaMarca.NOFANTASIA,
      IDEMPRESA: item.vendaMarca.IDEMPRESA,
      QTD: item.vendaMarca.QTD,
      VRTOTALLIQUIDO: item.vendaMarca.VRTOTALLIQUIDO,
      TOTALCUSTO: item.vendaMarca.TOTALCUSTO,

      valorPago: item.valorPago,
      voucher: item.voucher,
      valorDesconto: item.valorDesconto,

      valorTotalVendaLiquida: valorTotalVendaLiquida,
      valorVendaBrutaMarckup: valorVendaBrutaMarckup,
      marckup: marckup,
      indicadorMarckup: indicadorMarckup,
      indicadorVenda: indicadorVenda,
      margem: margem,
      custoPercentual: custoPercentual,
      margemPercentual: margemPercentual,

      percentualDesconto: percentualDesconto,
      percentualVoucher: percentualVoucher,
      totalPercentualVoucher: totalPercentualVoucher,
      valorTotalPercentualDesconto: valorTotalPercentualDesconto,

    }
  })

  const calcularTotalVendaBrutaMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.valorVendaBrutaMarckup);
    }
    return total;
  }

  const calcularTotalValorDescontoMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.valorDesconto);
    }
    return total;
  }

  const calcularTotalPercentualDescontoMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.valorTotalPercentualDesconto);
    }
    return total;
  }

  const calcularTotalValorPagoMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.valorPago);
    }
    return total;
  }

  const calcularTotalValorVoucherMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.voucher);
    }
    return total;
  }

  const calcularTotalPercentualVoucherMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.percentualVoucher);
    }
    return total;
  }

  const calcularTotalValorVendaLiquidaMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.valorTotalVendaLiquida);
    }
    return total;
  }

  const calcularTotalValorCustomarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.TOTALCUSTO);
    }
    return total;
  }

  const calcularTotalCustoPercentual = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.custoPercentual);
    }
    return total;
  }

  const calcularTotalMarckupPercentual = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.marckup);
    }
    return total;
  }

  const calcularTotalIndicadorVenda = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.indicadorVenda);
    }
    return total;
  }

  const calcularTotalValorMargemBrutaMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.margem);
    }
    return total;
  }

  const calcularTotalPercentualMargemBrutaMarckup = (item) => {
    let total = 0;
    for (let vendas of dadosVendasMarcaMarckup) {
      total += parseFloat(vendas.margemPercentual);
    }
    return total;
  }

  const colunasVendasMarcaMarckup = [
    {
      field: 'IDEMPRESA',
      header: '#',
      body: (row) => <th style={{ color: 'blue' }}> {row.IDEMPRESA} </th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: (row) => <th style={{ color: 'blue', width: 100 }}> {row.NOFANTASIA} </th>,
      footer: 'Total',
      sortable: true,
    },
    {
      field: 'valorVendaBrutaMarckup',
      header: 'Venda Bruta (R$)',
      body: (row) => <th style={{ color: 'blue' }}> {formatMoeda(row.valorVendaBrutaMarckup)} </th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'blue' }}>
              {formatMoeda(calcularTotalVendaBrutaMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'valorDesconto',
      header: 'Desconto (R$)',
      body: (row) => <th style={{ color: 'red' }}> {formatMoeda(row.valorDesconto)}</th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'red' }}>
              {formatMoeda(calcularTotalValorDescontoMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'percentualDesconto',
      header: 'Desconto (%)',
      body: (row) => <th style={{ color: 'green' }}> {formatarPorcentagem(row.percentualDesconto)}</th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'green' }}>
              {formatarPorcentagem(calcularTotalPercentualDescontoMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'valorPago',
      header: 'Venda Bruta Desconto (%)',
      body: (row) => <th style={{ color: 'blue' }}>  {formatMoeda(row.valorPago)} </th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'blue' }}>
              {formatMoeda(calcularTotalValorPagoMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'voucher',
      header: 'voucher (R$)',
      body: (row) => <th style={{ color: 'blue' }}> {formatMoeda(row.voucher)}</th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'blue' }}>
              {formatMoeda(calcularTotalValorVoucherMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'percentualVoucher',
      header: 'Voucher (%)',
      body: (row) => <th style={{ color: 'green' }}>  {formatarPorcentagem(row.percentualVoucher)} </th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'green' }}>
              {formatarPorcentagem(calcularTotalPercentualVoucherMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'valorTotalVendaLiquida',
      header: 'Venda Líquida (R$)',
      body: (row) => <th style={{ color: 'blue' }}>  {formatMoeda(row.valorTotalVendaLiquida)} </th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'blue' }}>
              {formatMoeda(calcularTotalValorVendaLiquidaMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'TOTALCUSTO',
      header: 'Custo (R$)',
      body: (row) => <th style={{ color: 'blue' }}>  {formatMoeda(row.TOTALCUSTO)} </th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'blue' }}>
              {formatMoeda(calcularTotalValorCustomarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'custoPercentual',
      header: 'Custo (%)',
      body: (row) => <th style={{ color: 'green' }}> {formatarPorcentagem(row.custoPercentual)}</th>,
      footer: () => {
        return (
          <div>
            <th style={{ color: 'green' }}>
              {formatarPorcentagem(calcularTotalCustoPercentual())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'marckup',
      header: 'Marckup (%)',
      body: (row) => {
        return (
          <div style={{ color: row.marckup < 0 ? 'red' : 'green' }}>
            {formatarPorcentagem(row.marckup)}
          </div>
        )
      },
      footer: () => {
        return (
          <div>
            <th style={{ color: 'green' }}>
              {formatarPorcentagem(calcularTotalMarckupPercentual())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'indicadorVenda',
      header: 'Indicador',
      body: (row) => {
        return (
          <div style={{ color: row.indicadorVenda < 0 ? 'red' : 'green' }}>
            {parseFloat(row.indicadorVenda).toFixed(2)}
          </div>
        )
      },
      footer: () => {
        return (
          <div>
            <th style={{ color: 'green' }}>
              {parseFloat(calcularTotalIndicadorVenda().toFixed(2))}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'margem',
      header: 'Margem Bruta (R$)',
      body: (row) => {
        return (
          <div style={{ color: row.margem < 0 ? 'red' : 'blue' }}>
            {formatMoeda(row.margem)}
          </div>
        )
      },
      footer: () => {
        return (
          <div>
            <th style={{ color: 'blue' }}>
              {formatMoeda(calcularTotalValorMargemBrutaMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'margemPercentual',
      header: 'Margem (%)',
      body: (row) => {
        return (
          <div style={{ color: row.margemPercentual < 0 ? 'red' : 'green' }}>
            {formatarPorcentagem(row.margemPercentual)}
          </div>
        )
      },
      footer: () => {
        return (
          <div>
            <th style={{ color: 'green' }}>
              {formatarPorcentagem(calcularTotalPercentualMargemBrutaMarckup())}
            </th>
          </div>
        )
      },
      sortable: true,
    }
  ]

  return (

    <Fragment>

      <div className="panel">

        <div className="panel-hdr mb-4">
          <h2>
            Lista de Vendas Por Período - Indicadores

            <span className="fw-300">
              Por Marca
            </span>
          </h2>
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
            title="Vendas Por Período - Indicadores"
            value={dadosVendasMarcaMarckup}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            rows={10}
            rowsPerPageOptions={[10, 20, 30, 50, 100, dadosVendasMarcaMarckup.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendasMarcaMarckup.map(coluna => (
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
