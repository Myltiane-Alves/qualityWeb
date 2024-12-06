import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";



export const ActionListaPrecoProdutoGrupoSubGrupo = ({dadosListaEstoque}) => {

  const dados = dadosListaEstoque.map((item, index) => {
    let contador = index + 1;

    return {
      IDEMPRESA: item.produto.IDEMPRESA,
      NOEMPRESA: item.produto.NOEMPRESA,
      GRUPO: item.produto.GRUPO,
      IDSUBGRUPO: item.produto.IDSUBGRUPO,
      DSSUBGRUPO: item.produto.DSSUBGRUPO,
      IDPRODUTO: item.produto.IDPRODUTO,
      DSNOME: item.produto.DSNOME,
      NUCODBARRAS: item.produto.NUCODBARRAS,
      PRECOCUSTO: item.produto.PRECOCUSTO,
      PRECOVENDA: item.produto.PRECOVENDA,
      QTDENTRADA: item.produto.QTDENTRADA,
      QTDSAIDA: item.produto.QTDSAIDA,
      QTDVENDIDO: item.produto.QTDVENDIDO,
      QTDDEVOLVIDO: item.produto.QTDDEVOLVIDO,
      QTDESTOQUE: item.produto.QTDESTOQUE,
      contador
    }
  })

  const colunasEstoque = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'NOEMPRESA',
      header: 'Empresa',
      body: row => row.NOEMPRESA,
      sortable: true,
    },
    {
      field: 'GRUPO',
      header: 'Grupo',
      body: row => row.GRUPO,
      sortable: true,
    },
    {
      field: 'DSSUBGRUPO',
      header: 'Sub Grupo',
      body: row => row.DSSUBGRUPO,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cód.Barras',
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
      field: 'PRECOCUSTO',
      header: 'Preço Custo',
      body: row => formatMoeda(row.PRECOCUSTO),
      sortable: true,
    },
    {
      field: 'PRECOVENDA',
      header: 'Preço Venda',
      body: row => formatMoeda(row.PRECOVENDA),
      sortable: true,
    },
    {
      field: 'QTDENTRADA',
      header: 'Qtd Entrada',
      body: row => parseFloat(row.QTDENTRADA),
      sortable: true,
    },
    {
      field: 'QTDSAIDA',
      header: 'Qtd Saída',
      body: row => parseFloat(row.QTDSAIDA),
      sortable: true,
    },
    {
      field: 'QTDDEVOLVIDO',
      header: 'Qtd Troca',
      body: row => parseFloat(row.QTDDEVOLVIDO),
      sortable: true,
    },
    {
      field: 'QTDVENDIDO',
      header: 'Qtd Venda(Saída)',
      body: row => parseFloat(row.QTDVENDIDO),
      sortable: true,
    },
    {
      field: 'QTDESTOQUE',
      header: 'Qtd Estoque',
      body: row => parseFloat(row.QTDESTOQUE),
      sortable: true,
    }
  ]


  return (

    <Fragment>

      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dados}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasEstoque.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}

              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc',fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>

      </div>
    </Fragment>
  )
}

