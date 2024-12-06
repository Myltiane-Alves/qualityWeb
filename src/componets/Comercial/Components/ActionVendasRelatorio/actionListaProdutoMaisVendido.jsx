import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";


export const ActionListaProdutoMaisVendido  = ({dadosProdutosMaisVendiddos}) => {

  const calcularTotalQuantidade = () => {
    let total = 0;
    for(let dados of dadosProdutosMaisVendiddos) {
      total += parseFloat(dados.QTD);
    }
    return total;
  }

  // const calcularTotalQuantidadePorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosProdutosMaisVendiddos.length; i++) {
  //     if(dadosProdutosMaisVendiddos[i]) {
  //       total += parseFloat(dadosProdutosMaisVendiddos[i].QTD);
  //     }
  //   }
  //   return total;
  // }

  const calcularTotalValorUnitario = () => {
    let total = 0;
    for(let dados of dadosProdutosMaisVendiddos) {
      total += parseFloat(dados.VALOR_UNITARIO);
    }
    return total;
  }

  // const calcularTotalValorUnitarioPorPagina = () => {
  //   let total = 0;
  //   const firstIndex = page * rowsPerPage;
  //   const lastIndex = firstIndex + rowsPerPage;
  //   for(let i = firstIndex; i < lastIndex && i < dadosProdutosMaisVendiddos.length; i++) {
  //     if(dadosProdutosMaisVendiddos[i]) {
  //       total += parseFloat(dadosProdutosMaisVendiddos[i].VALOR_UNITARIO);
  //     }
  //   }
  //   return total;
  // }

  const dadosProdutosVendidos = dadosProdutosMaisVendiddos.map((item, index) => {
    let contador = index + 1;

    return {
      CPROD: item.CPROD,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      QTD: item.QTD,
      VALOR_UNITARIO: item.VALOR_UNITARIO,
      VALOR_TOTAL: item.VALOR_TOTAL,
      contador
    }
  });
  
  const colunasProdutoMaisVendidos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true
    },
    {
      field: 'CPROD',
      header: 'Código',
      body: row => row.CPROD,
      sortable: true
    },
    {
      field: 'NUCODBARRAS',
      header: 'Código Barras',
      body: row => row.NUCODBARRAS,
      sortable: true
    },
    {
      field: 'DSNOME',
      header: 'Produto',
      body: row => row.DSNOME,
      sortable: true
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => parseFloat(row.QTD),
      footer: () => {
        return(
          <div>          
            {/* <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidadePorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {parseFloat(calcularTotalQuantidade())}</p>
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
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorUnitarioPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorUnitario())}</p>
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
            {/* <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorUnitarioPorPagina())}</p> */}
            <hr/>
            <p style={{ fontWeight: 600, }}>Total: {formatMoeda(calcularTotalValorUnitario())}</p>
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
          value={dadosProdutosVendidos}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
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