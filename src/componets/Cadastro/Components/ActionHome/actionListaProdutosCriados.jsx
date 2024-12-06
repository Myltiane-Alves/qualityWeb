import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { dataFormatada } from "../../../../utils/dataFormatada";
import { toFloat } from "../../../../utils/toFloat";



export const ActionListaProdutosCriados = ({ dadosListaProdutosCriados }) => {

  const dadosProdutosCriado = dadosListaProdutosCriados.map((item, index) => {
    let contador = index + 1;

    return {
      IDRESUMOPEDIDO: item.IDRESUMOPEDIDO,
      DTCADASTRO: item.DTCADASTRO,
      IDDETALHEPRODUTOPEDIDO: item.IDDETALHEPRODUTOPEDIDO,
      CODBARRAS: item.CODBARRAS,
      DSPRODUTO: item.DSPRODUTO,
      NUNCM: item.NUNCM,
      DSTAMANHO: item.DSTAMANHO,
      QTDPRODUTO: item.QTDPRODUTO,
      VRCUSTO: item.VRCUSTO,
      VRVENDA: item.VRVENDA,
      VRTOTALCUSTO: item.VRTOTALCUSTO,
      QTDESTOQUEIDEAL: item.QTDESTOQUEIDEAL,
      contador
    }
  });

  const colunasProdutosCriado = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'DTCADASTRO',
      header: 'DT. Pedido',
      body: row => <th>{dataFormatada(row.DTCADASTRO)}</th>,
      sortable: true,
    },
    {
      field: 'IDRESUMOPEDIDO',
      header: 'Nº Pedido',
      body: row => <th>{row.IDRESUMOPEDIDO}</th>,
      sortable: true,
    },
    {
      field: 'CODBARRAS',
      header: 'Código de Barras',
      body: row => <th>{row.CODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Produto',
      body: row => <th>{row.DSPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'NUNCM',
      header: 'NCM',
      body: row => <th>{toFloat(row.NUNCM)}</th>,
      sortable: true,
    },
    {
      field: 'DSTAMANHO',
      header: 'TM',
      body: row => <th>{row.DSTAMANHO}</th>,
      sortable: true,
    },
    {
      field: 'QTDPRODUTO',
      header: 'QTD',
      body: row => toFloat(row.QTDPRODUTO),
      sortable: true,
    },
    {
      field: 'VRCUSTO',
      header: 'Vr. Custo',
      body: row => <th>{formatMoeda(row.VRCUSTO)}</th>,
      sortable: true,
    },
    {
      field: 'VRVENDA',
      header: 'Vr. Venda',
      body: row => <th>{formatMoeda(row.VRVENDA)}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALCUSTO',
      header: 'Total Venda',
      body: row => <th>{formatMoeda(row.VRTOTALCUSTO)}</th>,
      sortable: true,
    },
    {
      field: 'QTDESTOQUEIDEAL',
      header: 'Estoque Ideal',
      body: row => <th>{toFloat(row.QTDESTOQUEIDEAL)}</th>,
      sortable: true,
    },
    
  ]

  return (
    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista de Produtos Criados</h2>
        </div>
        <div className="card">
          <DataTable
            title="Vendas por Loja"
            value={dadosProdutosCriado}
            size="small"
            sortOrder={-1}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasProdutosCriado.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}
                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>
    </Fragment>
  )
}