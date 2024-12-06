import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";


export const ActionListaVendasPorVendedor  = ({dadosVendasVendedor}) => {

  const calcularValorTotalVendaLiquida = (item) => {
    return toFloat(item.VRTOTALVENDA) - toFloat(item.VRRECVOUCHER)
  }

  const calcularTotalQuantidadeVendas = () => {
    let total = 0;
    for(let dados of dadosVendasVendedor) {
      total += parseFloat(dados.QTD_VENDAS);
    }
    return total;
  }

  // const calcularTotalQuantidadeVendasPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasVendedor.length; i++) {
  //     if(dadosVendasVendedor[i]) {
  //       total += parseFloat(dadosVendasVendedor[i].QTD_VENDAS);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalQuantidadeProdutos = () => {
    let total = 0;
    for(let dados of dadosVendasVendedor) {
      total += parseFloat(dados.QTD_PRODUTOS)
    }
    return total;
  }

  // const calcularTotalQuantidadeProdutosPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasVendedor.length; i++) {
  //     if(dadosVendasVendedor[i]) {
  //       total += parseFloat(dadosVendasVendedor[i].QTD_PRODUTOS);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalVendaBrutaVendasVendedor = () => {
    let total = 0;
    for(let dados of dadosVendasVendedor) {
      total += parseFloat(dados.VRTOTALVENDA);
    }
    return total;
  }

  // const calcularTotalVendaBrutaVendasVendedorPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasVendedor.length; i++) {
  //     if(dadosVendasVendedor[i]) {
  //       total += parseFloat(dadosVendasVendedor[i].VRTOTALVENDA);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalValorVoucher = () => {
    let total = 0;
    for(let dados of dadosVendasVendedor) {
      total += parseFloat(dados.VRRECVOUCHER);
    }
    return total;
  }

  // const calcularTotalValorVoucherPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasVendedor.length; i++) {
  //     if(dadosVendasVendedor[i]) {
  //       total += parseFloat(dadosVendasVendedor[i].VRRECVOUCHER);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalVendaLiquidaVendasVendedor = () => {
    let total = 0;
    for(let dados of dadosListaVendedorVendas) {
      total += parseFloat(dados.valorTotalVendaLiquida);
    }
    return total;
  }

  // const calcularTotalVendaLiquidaVendasVendedorPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosListaVendedorVendas.length; i++) {
  //     if(dadosListaVendedorVendas[i]) {
  //       total += parseFloat(dadosListaVendedorVendas[i].valorTotalVendaLiquida);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalValorCusto = () => {
    let total = 0;
    for(let dados of dadosVendasVendedor) {
      total += parseFloat(dados.PRECO_COMPRA);
    }
    return total;
  }

  // const calcularTotalValorCustoPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosVendasVendedor.length; i++) {
  //     if(dadosVendasVendedor[i]) {
  //       total += parseFloat(dadosVendasVendedor[i].PRECO_COMPRA);
  //     }
  //   }
  //   return total;
  // }

  const dadosListaVendedorVendas = dadosVendasVendedor.map((item, index) => {
    let contador = index + 1;
    const valorTotalVendaLiquida = calcularValorTotalVendaLiquida(item);
 
    return {
      NOFANTASIA: item.NOFANTASIA,
      VENDEDOR_MATRICULA: item.VENDEDOR_MATRICULA,
      VENDEDOR_NOME: item.VENDEDOR_NOME,
      QTD_VENDAS: item.QTD_VENDAS,
      QTD_PRODUTOS: item.QTD_PRODUTOS,
      VRTOTALVENDA: item.VRTOTALVENDA,
      VRRECVOUCHER: item.VRRECVOUCHER,
      PRECO_COMPRA: item.PRECO_COMPRA,
      valorTotalVendaLiquida: valorTotalVendaLiquida,
      contador
    }
  });
  
  const colunasVendasVendedor = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => row.NOFANTASIA,
      sortable: true
    },
    {
      field: 'VENDEDOR_MATRICULA',
      header: 'Matrícula',
      body: row => row.VENDEDOR_MATRICULA,
      sortable: true
    },
    {
      field: 'VENDEDOR_NOME',
      header: 'Funcionário',
      body: row => row.VENDEDOR_NOME,
      sortable: true
    },
    {
      field: 'QTD_VENDAS',
      header: 'Quantidade Vendas',
      body: row => row.QTD_VENDAS,
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadeProdutosPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadeProdutos())}</p>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'QTD_PRODUTOS',
      header: 'Quantidade Produtos',
      body: row => row.QTD_PRODUTOS,
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadeVendasPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadeVendas())}</p>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'VRTOTALVENDA',
      header: 'Venda Bruta',
      body: row => formatMoeda(row.VRTOTALVENDA),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaBrutaVendasVendedorPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaBrutaVendasVendedor())}</p>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'VRRECVOUCHER',
      header: 'Valor Vouchers',
      body: row => formatMoeda(row.VRRECVOUCHER),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorVoucherPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorVoucher())}</p>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'valorTotalVendaLiquida',
      header: 'Venda Líquida',
      body: row => formatMoeda(row.valorTotalVendaLiquida),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaLiquidaVendasVendedorPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaLiquidaVendasVendedor())}</p>
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'PRECO_COMPRA',
      header: 'Valor Custo',
      body: row => formatMoeda(row.PRECO_COMPRA),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorCustoPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorCusto())}</p>
          </div>
        )
      },
      sortable: true
    }
  ]
  
  return (

    <Fragment>
      <div className="card">
        <DataTable      
          title="Vendas por Loja"
          value={dadosListaVendedorVendas}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasVendasVendedor.map(coluna => (
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