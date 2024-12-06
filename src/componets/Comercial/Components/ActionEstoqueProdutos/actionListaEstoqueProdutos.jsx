import { Fragment, useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toFloat } from "../../../../utils/toFloat";


export const ActionListaEstoqueProduto = ({dadosEstoqueVendasPosicionamentoPeriodos}) => {
  const calcularTotalVenda = (item) => {
    return toFloat(item.vendaMarca.QTD) + toFloat(item.qtdVendaB.QTDVENDAS) + toFloat(item.qtdVendaC.QTDVENDAS)
  }

  const calcularQuantidadeEntrada = (item) => {
    return toFloat(item.qtdEntradaSaida.QTDENTRADA) + toFloat(item.qtdVoucher.QTDVOUCHERS)
  }

  const calcularQuantidadeSaida = (item) => {
    return toFloat(item.vendaMarca.QTD) + toFloat(item.qtdEntradaSaida.QTDSAIDAS)
  }

  const calcularMarckup = (item) => {
    return (toFloat(item.vendaMarca.VRTOTALLIQUIDO) / toFloat(item.vendaMarca.TOTALCUSTO) - 1) * 100;
  } 

  const dadosEstoqueVendas = dadosEstoqueVendasPosicionamentoPeriodos.map((item, index) => {
    let contador = index + 1;
    let aChegar = 0;
    const totalVenda = calcularTotalVenda(item);
    const totalQtdEntrada = calcularQuantidadeEntrada(item);  
    const totalQtdSaida = calcularQuantidadeSaida(item);
    const qtdPosionamento = totalQtdEntrada - totalQtdSaida;
    const estoqueVenda = qtdPosionamento / parseFloat(item.qtdVendaC.QTDVENDAS);
    const vendidaRecebida = totalVenda / parseFloat(item.pedido.QTDESOLICITADA) * 100;
    const marckup = calcularMarckup(item);

    return {
      GRUPO:  item.vendaMarca.GRUPO,
      SUBGRUPO: item.vendaMarca.SUBGRUPO,
      MARCA: item.vendaMarca.MARCA,
      NUCODBARRAS: item.vendaMarca.NUCODBARRAS,
      DSNOME: item.vendaMarca.DSNOME,
      QTD: item.vendaMarca.QTD,
      TOTALCUSTO: item.vendaMarca.TOTALCUSTO,
      VRTOTALLIQUIDO: item.vendaMarca.VRTOTALLIQUIDO,

      QTDEENTREGUE: item.pedido.QTDEENTREGUE,
      QTDESOLICITADA: item.pedido.QTDESOLICITADA,
      PRECOUNIT: item.pedido.PRECOUNIT,

      QTDVENDAS: item.qtdVendaB.QTDVENDAS,
      QTDVENDAS: item.qtdVendaC.QTDVENDAS,
      VUNCOM: item.qtdVendaC.VUNCOM,

      QTDVOUCHERS: item.qtdVoucher.QTDVOUCHERS,

      QTDENTRADA: item.qtdEntradaSaida.QTDENTRADA,
      QTDSAIDAS: item.qtdEntradaSaida.QTDSAIDAS,

      ESTOQUE101: item.estoque101.ESTOQUE101,


      totalVenda: totalVenda,
      totalQtdEntrada: totalQtdEntrada,
      totalQtdSaida: totalQtdSaida,
      qtdPosionamento: qtdPosionamento,
      estoqueVenda: estoqueVenda,
      vendidaRecebida: vendidaRecebida,
      marckup: marckup,
      contador,
      aChegar
    }
  })

  const colunasEstoqueVendas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
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
      field: 'QTDEENTREGUE',
      header: 'Qtd. Recebido',
      body: row => parseFloat(row.QTDEENTREGUE),
      sortable: true,
    },
    {
      field: 'QTDESOLICITADA',
      header: 'Qtd. ult. Pedido',
      body: row => parseFloat(row.QTDESOLICITADA),
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Qtd. Venda(A)',
      body: row => parseFloat(row.QTD),
      sortable: true,
    },
    {
      field: 'QTDVENDAS',
      header: 'Qtd. Venda(B)',
      body: row => parseFloat(row.QTDVENDAS),
      sortable: true,
    },
    {
      field: 'qtdPosionamento',
      header: 'Estoque Total',
      body: row => parseFloat(row.qtdPosionamento),
      sortable: true,
    },
    {
      field: 'ESTOQUE101',
      header: 'Estoque Loja',
      body: row => parseFloat(row.ESTOQUE101),
      sortable: true,
    },
    {
      field: 'estoqueVenda',
      header: 'Estoque/Venda',
      body: row => parseFloat(row.estoqueVenda),
      sortable: true,
    },
    {
      field: 'vendidaRecebida',
      header: 'Vendida/Recebida Qtde(%)',
      body: row => parseFloat(row.vendidaRecebida),
      sortable: true,
    },
    {
      field: 'PRECOUNIT',
      header: 'Pç Compra',
      body: row => parseFloat(row.PRECOUNIT),
      sortable: true,
    },
    {
      field: 'VUNCOM',
      header: 'Pç Venda',
      body: row => parseFloat(row.VUNCOM),
      sortable: true,
    },
    {
      field: 'marckup',
      header: 'Markup(%)',
      body: row => parseFloat(row.marckup),
      sortable: true,
    },
    {
      field: 'aChegar',
      header: 'A chegar',
      body: row => row.aChegar,
      sortable: true,
    },
    {
      field: 'QTDVENDAS',
      header: 'Qtd. Venda',
      body: row => parseFloat(row.QTDVENDAS),
      sortable: true,
    },
  ]

  return (

    <Fragment>
      <div className="">
       <DataTable
         title="Vendas por Loja"
         value={dadosEstoqueVendas}
         sortField="VRTOTALPAGO"
         
         sortOrder={-1}
         paginator={true}
         rows={10}
         rowsPerPageOptions={[5, 10, 20, 50]}
         showGridlines
         stripedRows
         emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
       >
         {colunasEstoqueVendas.map(coluna => (
           <Column
             key={coluna.field}
             field={coluna.field}
             header={coluna.header}
             
             body={coluna.body}
             footer={coluna.footer}
             sortable={coluna.sortable}
             headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
             footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc',fontSize: '0.8rem' }}
             bodyStyle={{ fontSize: '0.8rem' }}
           />
         ))}
       </DataTable>
     </div>

    </Fragment>
  )
}