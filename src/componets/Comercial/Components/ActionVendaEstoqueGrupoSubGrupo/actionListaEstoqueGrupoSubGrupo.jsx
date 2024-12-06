import { Fragment, useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toFloat } from "../../../../utils/toFloat";
import { formatMoeda } from "../../../../utils/formatMoeda";


export const ActionListaEstoqueVendaGrupoSubGrupo = ({dadosGrupoSubGrupo}) => {

  const calcularValorPrecoMedioCusto = (item) => {
    return toFloat(item.vendaMarca.TOTALCUSTO).toFixed(2) / toFloat(item.vendaMarca.QTDVENDA)
  }

  const calcularValorPrecoMedioVenda = (item) => {
    return toFloat(item.vendaMarca.VRTOTALLIQUIDO).toFixed(2) / toFloat(item.vendaMarca.QTDVENDA)
  }

  const calcularTotalEstoqueData = (item) => {
    return (
      toFloat(item.posicaoEstoqueAtual.QTDESTOQUE) +
      toFloat(item.posicaoVouchersAtual.QTDVOUCHERS) 
    )
  }

  const calcularTotalEstoqueAnterior = (item) => {
    return (
      toFloat(item.posicaoEstoqueAnterior.QTDESTOQUE) -
      toFloat(item.posicaoVendasAnterior.QTDVENDAS) +
      toFloat(item.posicaoVouchersAnterior.QTDVOUCHERS)
    )
  }

  const calcularMarckupProduto = (item) => {
    return (toFloat(item.vendaMarca.VRTOTALLIQUIDO) / toFloat(item.vendaMarca.TOTALCUSTO) - 1) * 100
  }

  const calcularPercentualPrecoVenda = (item) => {
    return ((toFloat(item.vendaMarca.VRTOTALLIQUIDO) * 100) / toFloat(item.vendaMarca.VRTOTALLIQUIDO))
  }

  const calcularMediaVendas = (item) => {
    return (toFloat(item.vendaMarca.QTDVENDA) / toFloat(item.vendaMarca.DIASPESQUISADOS))
  }

  const calcularCobertura = (item) => {
    return (toFloat(item.qtdPosicionamento) / toFloat(item.mediaVendas))
  }

  const dadosListaVendasEstoque = dadosGrupoSubGrupo.map((item, index) => {
    let contador = index + 1;
    const totalEstoqueAnterior = calcularTotalEstoqueAnterior(item);
    const totalEstoqueData = calcularTotalEstoqueData(item);
    const qtdPosicionamento = totalEstoqueAnterior + totalEstoqueData - item.vendaMarca.QTDVENDA;

    const valorPrecoMedioCusto = calcularValorPrecoMedioCusto(item);
    const valorPrecoMedioVenda = calcularValorPrecoMedioVenda(item);
    const estoquePrecoVenda = valorPrecoMedioVenda * qtdPosicionamento;
    const estoquePrecoCusto = valorPrecoMedioCusto * qtdPosicionamento;
    const marckupProduto = calcularMarckupProduto(item);
    const indicadorMarckup = marckupProduto / 100;
    const percentualEstoquePrecoVenda = (parseFloat(estoquePrecoVenda) * 100) / parseFloat(estoquePrecoVenda);
    const percentualPrecoVenda = calcularPercentualPrecoVenda(item);
    const mediaVendas = calcularMediaVendas(item);
    const cobertura = calcularCobertura(item);


    return {
      QTDVENDA: item.vendaMarca.QTDVENDA,
      VRTOTALLIQUIDO: item.vendaMarca.VRTOTALLIQUIDO,
      DSGRUPOEMPRESARIAL: item.vendaMarca.DSGRUPOEMPRESARIAL,
      GRUPO: item.vendaMarca.GRUPO,
      SUBGRUPO: item.vendaMarca.SUBGRUPO,
      QTDVENDA: item.vendaMarca.QTDVENDA,
      TOTALCUSTO: item.vendaMarca.TOTALCUSTO,
      TOTALBRUTO: item.vendaMarca.TOTALBRUTO,
      TOTALDESCONTO: item.vendaMarca.TOTALDESCONTO,
      VRTOTALLIQUIDO: item.vendaMarca.VRTOTALLIQUIDO,
      DIASPESQUISADOS: item.vendaMarca.DIASPESQUISADOS,

      QTDVENDAS:  item.posicaoEstoqueAnterior.QTDVENDAS,
      QTDESTOQUE: item.posicaoEstoqueAnterior.QTDESTOQUE,
      QTDVOUCHERS: item.posicaoEstoqueAnterior.QTDVOUCHERS,
      
      QTDVENDAS:  item.posicaoVendasAnterior.QTDVENDAS,
      QTDVOUCHERS: item.posicaoVouchersAnterior.QTDVOUCHERS,

      QTDVOUCHERS: item.posicaoVouchersAtual.QTDVOUCHERS,

      QTDESTOQUEDATA: item.posicaoEstoqueAtual.QTDESTOQUE,
      QTDVOUCHERSDATA: item.posicaoEstoqueAtual.QTDVOUCHERS,

      totalEstoqueAnterior: totalEstoqueAnterior,
      totalEstoqueData: totalEstoqueData,
      qtdPosicionamento: qtdPosicionamento,
      valorPrecoMedioCusto: valorPrecoMedioCusto,
      valorPrecoMedioVenda: valorPrecoMedioVenda,
      estoquePrecoVenda: estoquePrecoVenda,
      estoquePrecoCusto: estoquePrecoCusto,
      marckupProduto: marckupProduto,
      percentualEstoquePrecoVenda: percentualEstoquePrecoVenda,
      percentualPrecoVenda: percentualPrecoVenda,
      indicadorMarckup: indicadorMarckup,
      mediaVendas: mediaVendas,
      cobertura: cobertura,

      contador
    } 
  })

  const colunasListaEstoqueVendas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DSGRUPOEMPRESARIAL',
      header: 'Grupo Empresarial',
      body: row => row.DSGRUPOEMPRESARIAL,
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
      header: 'SubGrupo',
      body: row => row.SUBGRUPO,
      sortable: true,
    },
    {
      field: 'qtdPosicionamento',
      header: 'Qtd. Peças Estoque',
      body: row => row.qtdPosicionamento,
      sortable: true,
    },
    {
      field: 'QTDVENDA',
      header: 'Qtd. Peças Vendidas',
      body: row => row.QTDVENDA,
      sortable: true,
    },
    {
      field: 'estoquePrecoVenda',
      header: 'Estoque PV(R$)',
      body: row => formatMoeda(row.estoquePrecoVenda),
      sortable: true,
    },
    {
      field: 'estoquePrecoCusto',
      header: 'Estoque PC(R$)',
      body: row => formatMoeda(row.estoquePrecoCusto),
      sortable: true,
    },
    {
      field: 'indicadorMarckup',
      header: 'Markup 1',
      body: row => parseFloat(row.indicadorMarckup).toFixed(2),
      sortable: true,
    },
    {
      field: 'percentualEstoquePrecoVenda',
      header: '(%) Estoque',
      body: row => parseFloat(row.percentualEstoquePrecoVenda).toFixed(2),
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Venda (R$)',
      body: row => formatMoeda(row.VRTOTALLIQUIDO),
      sortable: true,
    },
    {
      field: 'percentualPrecoVenda',
      header: 'Venda (%)',
      body: row => parseFloat(row.percentualPrecoVenda).toFixed(2),
      sortable: true,
    },
    {
      field: 'cobertura',
      header: 'Cobertura',
      body: row => row.cobertura,
      sortable: true,
    },
  ]

  return (

    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosListaVendasEstoque}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasListaEstoqueVendas.map(coluna => (
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