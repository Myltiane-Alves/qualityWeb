import React, { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";


export const ActionListaProductoPreco = ({dadosProdutos}) => {

  const dadosListaProdutos = dadosProdutos.map((item, index) => {
    let contador = index + 1;
    return {
      DSNOME: item.DSNOME,
      NUCODBARRAS: item.NUCODBARRAS,
      PRECOVENDA: item.PRECOVENDA,
      PRECOANTIGO: item.PRECOANTIGO,
      contador
    }
  });

  const colunasProdutos = [
    {
      field: 'contador',
      header: '#',	
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cód. Barras',
      body: row => parseFloat(row.NUCODBARRAS),
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Descrição',
      body: row => row.DSNOME,
      sortable: true,
    },
    {
      field: 'PRECOANTIGO',
      header: 'Preço Antigo',
      body: row => formatMoeda(row.PRECOANTIGO),
      sortable: true,
    },
    {
      field: 'PRECOVENDA',
      header: 'Preço Novo',
      body: row => formatMoeda(row.PRECOVENDA),
      sortable: true,
    },
  ]

  return (

    <Fragment>
     
      <div className="card">
        <DataTable
          value={dadosListaProdutos}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          

        >
          {colunasProdutos.map(coluna => (

            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>

    </Fragment>
  )
}

