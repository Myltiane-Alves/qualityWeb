import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";


export const ActionListaVendasPorEstrutura = ({dadosVendasEstrutura}) => {

  const calcularMarckup = (item) => {
    return ((toFloat(item.vendaMarca.VRTOTALLIQUIDO) / toFloat(item.vendaMarca.TOTALCUSTO)) - 1) * 100;
  } 

  const calcularValorTotalLiquidoProduto = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value)
    return toFloat(item.vendaMarca.VRTOTALLIQUIDO) - toFloat(item.vendaMarca.VLVOUCHER)
  }

  const calcularIndicadorVendaProduto = (item) => {
    return toFloat(item.vendaMarca.VRTOTALLIQUIDO) / toFloat(item.vendaMarca.TOTALCUSTO)
  }

  const calcularMargemProduto = (item) => {
    return toFloat(item.vendaMarca.VRTOTALLIQUIDO) - toFloat(item.vendaMarca.TOTALCUSTO)
  }

  const calcularCustoPercentualProduto = (item) => {
    return ((toFloat(item.vendaMarca.TOTALCUSTO) * 100) / toFloat(item.vendaMarca.VRTOTALLIQUIDO)) 
  }

  const calcularMargemPercentualProduto = (item) => {
    return 100 - ((toFloat(item.vendaMarca.TOTALCUSTO) * 100) / toFloat(item.vendaMarca.VRTOTALLIQUIDO)) 
  }

  const calcularPercentualDescontoProduto = (item) => {
    return ((toFloat(item.vendaMarca.TOTALDESCONTO) / (toFloat(item.vendaMarca.TOTALBRUTO) + toFloat(item.vendaMarca.TOTALDESCONTO))) * 100) 
  }

  const calcularTotalQuantidadeVendasEstrutura = () => {
    let total = 0;
    for(let dados of dadosVendasEstrutura) {
      total += parseFloat(dados.vendaMarca.QTD);
    }
    return total;
  }

  // const calcularTotalQuantidadeVendasEstruturaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasEstrutura.length; i++) {
  //     if(dadosVendasEstrutura[i]) {
  //       total += parseFloat(dadosVendasEstrutura[i].vendaMarca.QTD);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalVendaBrutaVendasEstrutura = () => {
    let total = 0;
    for(let dados of dadosVendasEstrutura) {
      total += parseFloat(dados.vendaMarca.TOTALBRUTO);
    }
    return total;
  }

  // const calcularTotalVendaBrutaVendasEstruturaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasEstrutura.length; i++) {
  //     if(dadosVendasEstrutura[i]) {
  //       total += parseFloat(dadosVendasEstrutura[i].vendaMarca.TOTALBRUTO);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalDescontoVendasEstrutura = () => {
    let total = 0;
    for(let dados of dadosVendasEstrutura) {
      total += parseFloat(dados.vendaMarca.TOTALDESCONTO);
    }
    return total;
  }

  // const calcularTotalDescontoVendasEstruturaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasEstrutura.length; i++) {
  //     if(dadosVendasEstrutura[i]) {
  //       total += parseFloat(dadosVendasEstrutura[i].vendaMarca.TOTALDESCONTO);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalVoucherVendasEstrutura = () => {
    let total = 0;
    for(let dados of dadosVendasEstrutura) {
      total += parseFloat(dados.vendaMarca.VLVOUCHER);
    }
    return total;
  }

  // const calcularTotalVoucherVendasEstruturaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasEstrutura.length; i++) {
  //     if(dadosVendasEstrutura[i]) {
  //       total += parseFloat(dadosVendasEstrutura[i].vendaMarca.VLVOUCHER);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalVendaLiquidaEstrutura = () => {
    let total = 0;
    for(let dados of dadosEstruturaVendas) {
      total += parseFloat(dados.valorTotalLiquido);
    }
    return total;
  }

  // const calcularTotalVendaLiquidaEstruturaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosEstruturaVendas.length; i++) {
  //     if(dadosEstruturaVendas[i]) {
  //       total += parseFloat(dadosEstruturaVendas[i].valorTotalLiquido);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalMargemProduto = () => {
    let total = 0;
    for(let dados of dadosEstruturaVendas) {
      total += parseFloat(dados.margemProduto);
    }
    return total;
  }

  // const calcularTotalMargemProdutoPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosEstruturaVendas.length; i++) {
  //     if(dadosEstruturaVendas[i]) {
  //       total += parseFloat(dadosEstruturaVendas[i].margemProduto);
  //     }
  //   }
  //   return total;
  // }

  const dadosEstruturaVendas = dadosVendasEstrutura.map((item, index) => {
    let contador = index + 1;
    const valorTotalLiquido = calcularValorTotalLiquidoProduto(item);
    const marckupProduto = calcularMarckup(item);
    const indicadorMarkupProduto = parseFloat(marckupProduto / 100);
    const indicadorVendaProduto = calcularIndicadorVendaProduto(item)
    const margemProduto = calcularMargemProduto(item);
    const custoPercentualProduto = calcularCustoPercentualProduto(item);
    const margemPercentualProduto = calcularMargemPercentualProduto(item);
    const percentualDescontoProduto = calcularPercentualDescontoProduto(item);
    // if(percentualDescontoProduto > 0) {
    //   percentualDescontoProduto = percentualDescontoProduto - 0.01; 
    // }
    
    
    return {
      NOFANTASIA: item.vendaMarca.NOFANTASIA,
      GRUPO: item.vendaMarca.GRUPO,
      SUBGRUPO: item.vendaMarca.SUBGRUPO,
      MARCA: item.vendaMarca.MARCA,
      NUCODBARRAS: item.vendaMarca.NUCODBARRAS,
      DSNOME: item.vendaMarca.DSNOME,
      QTD: item.vendaMarca.QTD,
      TOTALBRUTO: item.vendaMarca.TOTALBRUTO,
      TOTALDESCONTO: item.vendaMarca.TOTALDESCONTO,
      // SUBGRUPO: item.vendaMarca.ESTRUTURA,
      TOTALCUSTO: item.vendaMarca.TOTALCUSTO,
      VRTOTALLIQUIDO: item.vendaMarca.VRTOTALLIQUIDO,
      VLVOUCHER: item.vendaMarca.VLVOUCHER,
      valorTotalLiquido: valorTotalLiquido,
      marckupProduto: marckupProduto,
      indicadorVendaProduto: indicadorVendaProduto,
      indicadorMarkupProduto: indicadorMarkupProduto,
      margemProduto: margemProduto,
      custoPercentualProduto: custoPercentualProduto,
      margemPercentualProduto: margemPercentualProduto,
      percentualDescontoProduto: percentualDescontoProduto,

      contador
    }
  });

  const colunasVendasEstutura = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => row.NOFANTASIA,
      sortable: true
    },
    {
      field: 'GRUPO',
      header: 'Grupo',
      body: row => row.GRUPO,
      sortable: true, 
    },
    {
      field: 'SUBGRUPO',
      header: 'Sub Grupo',
      body: row => row.SUBGRUPO,
      sortable: true,
    },
    {
      field: 'MARCA',
      header: 'Marca',
      body: row => row.MARCA,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cód. Barras',
      body: row => row.NUCODBARRAS,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Produto',
      body: row => row.DSNOME,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Total Quantidade',
      body: row => parseFloat(row.QTD),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadeVendasEstruturaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadeVendasEstrutura())}</p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'TOTALBRUTO',
      header: 'Venda Bruta(R$)',
      body: row => formatMoeda(row.TOTALBRUTO),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaBrutaVendasEstruturaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaBrutaVendasEstrutura())}</p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'TOTALDESCONTO',
      header: 'Desconto(R$)',
      body: row => formatMoeda(row.TOTALDESCONTO),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalDescontoVendasEstruturaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalDescontoVendasEstrutura())}</p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'percentualDescontoProduto',
      header: 'Desconto(%)',
      body: row => parseFloat(row.percentualDescontoProduto),
      sortable: true,
    },
    {
      field: 'VLVOUCHER',
      header: 'Voucher(R$)',
      body: row => formatMoeda(row.VLVOUCHER),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVoucherVendasEstruturaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVoucherVendasEstrutura())}</p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'valorTotalLiquido',
      header: 'Venda Líquida(R$)',
      body: row => formatMoeda(row.valorTotalLiquido),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaLiquidaEstruturaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaLiquidaEstrutura())} </p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'TOTALCUSTO',
      header: 'Custo(R$)',
      body: row => formatMoeda(row.TOTALCUSTO),
      sortable: true,
    },
    {
      field: 'custoPercentualProduto',
      header: 'Custo(%)',
      body: row => parseFloat(row.custoPercentualProduto).toFixed(2),
      sortable: true,
    },
    {
      field: 'marckupProduto',
      header: 'Markup(%)',
      body: row => parseFloat(row.marckupProduto).toFixed(2),
      sortable: true,
    },
    {
      field: 'indicadorVendaProduto',
      header: 'Indicador',
      body: row => parseFloat(row.indicadorVendaProduto).toFixed(2),
      sortable: true,
    },
    {
      field: 'margemProduto',
      header: 'Margem Bruta(R$)',
      body: row => formatMoeda(row.margemProduto),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalMargemProdutoPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalMargemProduto())} </p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'margemPercentualProduto',
      header: 'Margem Bruta(%)',
      body: row => parseFloat(row.margemPercentualProduto).toFixed(2),
      sortable: true,
    },
  ]
  
  return (

    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosEstruturaVendas}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasVendasEstutura.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}                          
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
              footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9',fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>
      
    </Fragment>
  )
}