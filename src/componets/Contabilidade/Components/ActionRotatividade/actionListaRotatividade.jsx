import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const ActionListaRotatividade = ({ dadosRotatividade }) => {

  const dadosListaRotatividade = dadosRotatividade.map((item, index) => {
    let contador = index + 1;
    return {
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      GRUPOPRODUTO: item.GRUPOPRODUTO,
      NOMEGRUPO: item.NOMEGRUPO,
      PN: item.PN,
      NOFANTASIA: item.NOFANTASIA,
      NOFANTASIA: item.NOFANTASIA,
      QTDSAIDAVENDA: item.QTDSAIDAVENDA,
      QTDSALDO: item.QTDSALDO,
      DTMOVIMENTACAO: item.DTMOVIMENTACAO,
      QTDINICIAL: item.QTDINICIAL,
      QTDENTRADATRANSAFERENCIA: item.QTDENTRADATRANSAFERENCIA,
      QTDENTRADADEVOLUCAO: item.QTDENTRADADEVOLUCAO,
      QTDSAIDATRANSFERENCIA: item.QTDSAIDATRANSFERENCIA,
      contador
    }
  });

  const colunasRotatividade = [
    {
      field: 'contador',
      header: '#',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => row.NOFANTASIA,
      sortable: true,
    },
    {
      field: 'PN',
      header: 'Fornecedor',
      body: row => row.PN,
      sortable: true,
    },
    {
      field: 'GRUPOPRODUTO',
      header: 'Grupo',
      body: row => row.GRUPOPRODUTO,
      sortable: true,
    },
    {
      field: 'NOMEGRUPO',
      header: 'Grade',
      body: row => row.NOMEGRUPO,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cod Produto',
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
      field: 'DTMOVIMENTACAO',
      header: 'Data',
      body: row => row.DTMOVIMENTACAO,
      sortable: true,
    },
    {
      field: 'QTDINICIAL',
      header: 'Inicial',
      body: row => row.QTDINICIAL,
      sortable: true,
    },
    {
      field: 'QTDENTRADATRANSAFERENCIA',
      header: 'Ent. Transf.',
      body: row => row.QTDENTRADATRANSAFERENCIA,
      sortable: true,
    },
    {
      field: 'QTDENTRADADEVOLUCAO',
      header: 'Ent. Dev',
      body: row => row.QTDENTRADADEVOLUCAO,
      sortable: true,
    },
    {
      field: 'QTDSAIDATRANSFERENCIA',
      header: 'Saída Transf.',
      body: row => row.QTDSAIDATRANSFERENCIA,
      sortable: true,
    },
    {
      field: 'QTDSAIDAVENDA',
      header: 'Saída Venda',
      body: row => row.QTDSAIDAVENDA,
      sortable: true,
    },
    {
      field: 'QTDSALDO',
      header: 'Saldo',
      body: row => row.QTDSALDO,
      sortable: true,
    },

  ]

  return (

    <Fragment>

      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosListaRotatividade}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}

        >
          {colunasRotatividade.map(coluna => (
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

    </Fragment>
  )
}
