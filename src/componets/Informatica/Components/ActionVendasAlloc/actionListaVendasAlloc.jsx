import React, { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { GrView } from "react-icons/gr";


export const ActionListaVendasAlloc = ({dadosVendasAlloc}) => {
 

  const dados = dadosVendasAlloc.map((item, index) => {
    let contador = index + 1;
    return {
      IDVENDA: item.IDVENDA,
      IDEMPRESA: item.IDEMPRESA,
      DTEMVIO: item.DTEMVIO,
      DTVENDA: item.DTVENDA,
      IDRETORNOALLOC: item.IDRETORNOALLOC,
      CUPOM_CODIGO: item.CUPOM_CODIGO,
      IDRETORNOPAGAMENTO: item.IDRETORNOPAGAMENTO,
      TXT_VENDA: item.TXT_VENDA,
      TXT_PAGAMENTO: item.TXT_PAGAMENTO,
      TXTRETORNOALLOC: item.TXTRETORNOALLOC,
      TXTRETORNOERROALLOC: item.TXTRETORNOERROALLOC,
      STSTATUS: item.STSTATUS,
      contador
    }
  });

  const colunasVendasAlloc = [
    {
      field: 'contador',
      header: '#',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'IDEMPRESA',
      header: 'Loja',
      body: row => row.IDEMPRESA,
      sortable: true,
    },
    {
      field: 'DTVENDA',
      header: 'DT Venda',
      body: row => row.DTVENDA,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => row.IDVENDA,
      sortable: true,
    },
    {
      field: 'DTEMVIO',
      header: 'DT Envio',
      body: row => dataFormatada(row.DTEMVIO),
      sortable: true,
    },
    {
      field: 'IDRETORNOALLOC',
      header: 'Nº Retorno Alloc',
      body: row => parseFloat(row.IDRETORNOALLOC),
      sortable: true,
    },
    {
      field: 'CUPOM_CODIGO',
      header: 'Cumpom Código',
      body: row => row.CUPOM_CODIGO,
      sortable: true,
    },
    {
      field: 'IDRETORNOPAGAMENTO',
      header: 'Nº Retorno Pag',
      body: row => row.IDRETORNOPAGAMENTO,
      sortable: true,
    },
    {
      field: 'STSTATUS',
      header: 'Situação',
      body: row => row.STSTATUS,
      sortable: true,
    },
    {
      field: '',
      header: 'Detalhar',
      body: (
        (row) => (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="p-1">
              <ButtonTable
                titleButton={"Alterar"}
                onClickButton={() => handleClickEdit(row)}
                Icon={GrView}
                iconSize={18}
                iconColor={"#fff"}
                cor={"success"}

              />

            </div>
          </div>
        )
      ),
    }
  ]

  const handleDetalhar = async (IDVENDA) => {
    try {
      const response = await get(`/atualizarFuncionario?idFuncionario=${IDVENDA}`)
      if (response.data && response.data.length > 0) {
       
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickDetalhar = (row) => {
    if (row && row.IDVENDA) {
      handleDetalhar(row.IDVENDA);
    }
  };

  return (

    <Fragment>

  
      <DataTable
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
        {colunasVendasAlloc.map(coluna => (

          <Column
            key={coluna.field}
            field={coluna.field}
            header={coluna.header}
            body={coluna.body}
            footer={coluna.footer}
            sortable={coluna.sortable}
            headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9' }}
            footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
            bodyStyle={{ fontSize: '0.8rem' }}
          />
        ))}
      </DataTable>

    </Fragment>
  )
}
