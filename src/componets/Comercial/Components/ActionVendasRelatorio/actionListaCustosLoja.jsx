import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";


export const ActionListaCustosLoja  = ({dadosCustosLojas}) => {

  const calcularTotalVlLiquido = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);
    return toFloat(item.VRTOTALVENDA) - toFloat(item.VRRECVOUCHER)
  }

  const calcularTotalMackup = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);
    return toFloat(item.VRTOTALVENDA) / toFloat(item.VRCUSTOTOTAL)
  }

  const calcularSomaTotalLucro = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);
    return toFloat(item.VRTOTALVENDA) - toFloat(item.VRCUSTOTOTAL)
  }

  const calcularTotalQtdClientes = () => {
    let total = 0;
    for (let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.QTD_CLIENTE);
    }
    return total;
  }

  // const calcularTotalQtdClientesPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage; 
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)

  //   for (let item of dataPaginada) {
  //     total += parseFloat(item.QTD_CLIENTE);
  //   }
  //   return total;
  // }


  // const calcularTotalQtdClientesPorPagina = (paginaAtual, linhasPorPagina) => {
  //   const indiceInicial = paginaAtual * linhasPorPagina;
  //   const indiceFinal = Math.min(indiceInicial + linhasPorPagina, dadosListaVendasCustosLojas.length);
  //   let total = 0;
  
  //   for (let i = indiceInicial; i < indiceFinal; i++) {
  //     total += dadosListaVendasCustosLojas[i].QTD_CLIENTE;
  //   }
  
  //   setTotalClientesPorPagina(total);
  // };

  
  const calcularTotalQtdProdutos = () => {
    let total = 0;
    for(let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.QTD_PRODUTO);
    }
    return total;
  }

  // const calcularTotalQtdProdutosPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)
  //   for(let item of dataPaginada) {
  //     total += parseFloat(item.QTD_PRODUTO);
  //   }
  //   return total;
  // }

  const calcularTotalVendaBruta = () => {
    let total = 0;
    for(let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.VRTOTALVENDA)
    }
    return total;
  }

  // const calcularTotalVendaBrutaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)
  //   for(let item of dataPaginada) {
  //     total += parseFloat(item.VRTOTALVENDA);
  //   }
  //   return total;
  // }

  const calcularTotalLucro = () => {
    let total = 0;
    for (let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.valorTotalLucro)
    }
    return total;
  }

  // const calcularTotalLucroPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)
  //   for(let item of dataPaginada) {
  //     total += parseFloat(item.valorTotalLucro);
  //   }
  //   return total;
  // }

  const calcularTotalVendaLiquida = () => {
    let total = 0;
    for (let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.valorTotalLiquido)
    }
    return total;
  }

  // const calcularTotalVendaLiquidaPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)
  //   for(let item of dataPaginada) {
  //     total += parseFloat(item.valorTotalLiquido);
  //   }
  //   return total;
  // }

  const calcularTotalProjecaoMes = () => {
    let total = 0;
    for (let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.VRTOTALVENDA)
    }
    return total;
  }

  // const calcularTotalProjecaoMesPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)
  //   for(let item of dataPaginada) {
  //     total += parseFloat(item.VRTOTALVENDA);
  //   }
  //   return total;
  // }

  const calcularTotalCustoTotal = () => {
    let total = 0;
    for(let dados of dadosListaVendasCustosLojas) {
      total += parseFloat(dados.VRCUSTOTOTAL);
    }
    return total;
  }

  // const calcularTotalCustoTotalPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   const dataPaginada = dadosListaVendasCustosLojas.slice(firstIndex, lastIndex)
  //   for(let item of dataPaginada) {
  //     total += parseFloat(item.VRCUSTOTOTAL);
  //   }
  //   return total;
  // }

  const dadosListaVendasCustosLojas = dadosCustosLojas.map((item, index) => {
    let contador = index + 1;
    const valorTotalLiquido = calcularTotalVlLiquido(item);
    const valorTotalMackup = calcularTotalMackup(item);
    const valorTotalLucro = calcularSomaTotalLucro(item);
    return {
      NOFANTASIA: item.NOFANTASIA,
      QTD_CLIENTE: item.QTD_CLIENTE,
      QTD_PRODUTO: item.QTD_PRODUTO,
      VRTOTALVENDA: item.VRTOTALVENDA,
      VRRECVOUCHER: item.VRRECVOUCHER,
      VALORDESCONTO: item.VALORDESCONTO,
      VRCUSTOTOTAL: item.VRCUSTOTOTAL,
      VRTOTALVENDA: item.VRTOTALVENDA,

      valorTotalLiquido: valorTotalLiquido,
      valorTotalMackup: valorTotalMackup,
      valorTotalLucro: valorTotalLucro,
      contador
    }
  })
 
  const colunasVendasCustosLojas = [
    {field: 'contador', header: 'Nº', body: row => row.contador, sortable: true},
    {
      field: 'NOFANTASIA', 
      header: 'Loja', 
      body: row => row.NOFANTASIA, 
      sortable: true },
    { 
      field: 'QTD_CLIENTE',
      header: 'Qtd. Clientes',
      body: row => row.QTD_CLIENTE,
      footer: () => {
        return(
          <div>          
            {dadosListaVendasCustosLojas.length > 0 && (
             <p> 
                {parseFloat(dadosListaVendasCustosLojas.reduce((acc, item) => acc + parseFloat(item.QTD_CLIENTE), 0))}
              </p>
            )}
            {/* <p style={{ fontWeight: 600, }}>Total: {calcularTotalQtdClientesPorPagina()}</p> */}
            {/* <p style={{ fontWeight: 600, }}>Total: {parseFloat(dadosListaVendasCustosLojas.reduce((acc, item) => acc + parseFloat(item.QTD_CLIENTE), 0))}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {calcularTotalQtdClientes()}</p>
          </div>
        )
      }, 
      sortable: true 
    },
    { field: 'QTD_PRODUTO',
      header: 'Qtd. Produtos',
      body: row => row.QTD_PRODUTO,
      footer: () => {
        return (
          <div>
            {/* <p style={{ fontWeight: 600, }}>Total: {calcularTotalQtdProdutosPorPagina()}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {calcularTotalQtdProdutos()}</p>
          </div>
        )
      },
      sortable: true 
    },
    { field: 'VRTOTALVENDA',
      header: 'Venda Bruta (- Desc)',
      body: row => formatMoeda(row.VRTOTALVENDA),
      footer: () => {
        return (
          <div>
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaBrutaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaBruta())}</p>
          </div>
        )
      },
      sortable: true 
    },
    { field: 'valorTotalLiquido', 
      header: 'Venda Líq (- Voucher)', 
      body: row => formatMoeda(row.valorTotalLiquido),
      footer: () => {
        return (
          <div>
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaLiquidaPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalVendaLiquida())}</p>
          </div>
        )
      },
      sortable: true 
    },
    { field: 'VRTOTALVENDA',
      header: 'Projeção Mês',
      body: row => formatMoeda(row.VRTOTALVENDA),
      footer: () => {
        return (
          <div>
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalProjecaoMesPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalProjecaoMes())}</p>
          </div>
        )
      },
      sortable: true 
    },
    { field: 'VRCUSTOTOTAL',
      header: 'Custo Total',
      body: row => formatMoeda(row.VRCUSTOTOTAL),
      footer: () => {
        return (
          <div>
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalCustoTotalPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalCustoTotal())}</p>
          </div>
        )
      },
      sortable: true 
    },
    { field: 'valorTotalLucro',
      header: 'Lucro Total',
      body: row => formatMoeda(row.valorTotalLucro),
      footer: () => {
        return (
          <div>
            {/* <p style={{ fontWeight: 600, }}>Total: { formatMoeda(calcularTotalLucroPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalLucro())}</p>
          </div>
        )
      },
      sortable: true 
    },
    { field: 'valorTotalMackup', 
      header: 'Mackup', 
      body: row => row.valorTotalMackup, 
      sortable: true 
    },
  ]
  
  return (

    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosListaVendasCustosLojas}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
  
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasVendasCustosLojas.map(coluna => (
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