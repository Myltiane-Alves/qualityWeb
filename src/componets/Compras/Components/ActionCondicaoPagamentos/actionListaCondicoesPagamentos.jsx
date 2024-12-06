import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { ActionEditarCondicaoPagamentoModal } from "./editarCondicaoPagamentoModal";
import { get } from "../../../../api/funcRequest";


export const ActionListaCondicoesPagamentos = ({ dadosCondicoesPagamentos }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheCondPagamento, setDadosDetalheCondPagamento] = useState([]);
  const dados = dadosCondicoesPagamentos.map((item, index) => {
    let contador = index + 1;
    return {
      IDCONDICAOPAGAMENTO: item.IDCONDICAOPAGAMENTO,
      IDGRUPOEMPRESARIAL: item.IDGRUPOEMPRESARIAL,
      IDEMPRESA: item.IDEMPRESA,
      DSCONDICAOPAG: item.DSCONDICAOPAG,
      STPARCELADO: item.STPARCELADO,
      NUPARCELAS: item.NUPARCELAS,
      NUNDIA1PAG: item.NUNDIA1PAG,
      NUNDIA2PAG: item.NUNDIA2PAG,
      NUNDIA3PAG: item.NUNDIA3PAG,
      NUNDIA4PAG: item.NUNDIA4PAG,
      NUNDIA5PAG: item.NUNDIA5PAG,
      NUNDIA6PAG: item.NUNDIA6PAG,
      NUNDIA7PAG: item.NUNDIA7PAG,
      NUNDIA8PAG: item.NUNDIA8PAG,
      NUNDIA9PAG: item.NUNDIA9PAG,
      NUNDIA10PAG: item.NUNDIA10PAG,
      NUNDIA11PAG: item.NUNDIA11PAG,
      NUNDIA12PAG: item.NUNDIA12PAG,
      DTULTALTERACAO: item.DTULTALTERACAO,
      STATIVO: item.STATIVO,
      QTDDIAS: item.QTDDIAS,
      DSTPDOCUMENTO: item.DSTPDOCUMENTO,
      contador
    }
  })

  const colunasPagamentos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DSCONDICAOPAG',
      header: 'Descrição',
      body: row => row.DSCONDICAOPAG,
      sortable: true,
    },
    {
      field: 'STPARCELADO',
      header: 'Parcelado',
      body: row => {
        return (
          <p>{row.STPARCELADO == 'True' ? 'SIM' : 'NÃO'}</p>
        )
      },
      sortable: true,
    },
    {
      field: 'NUPARCELAS',
      header: 'QTD Parcelas',
      body: row => row.NUPARCELAS,
      sortable: true,
    },
    {
      field: 'NUNDIA1PAG',
      header: '1 Parcela',
      body: row => row.NUNDIA1PAG,
      sortable: true,
    },
    {
      field: 'QTDDIAS',
      header: 'Dias Entre Parcelas',
      body: row => row.QTDDIAS,
      sortable: true,
    },
    {
      field: 'DSTPDOCUMENTO',
      header: 'Tipo Pagamento',
      body: row => row.DSTPDOCUMENTO,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {
        return (
          <p>{row.STATIVO == 'True' ? 'ATIVO' : 'INATIVO'}</p>
        )
      },
      sortable: true,
    },
    {
      field: 'IDCONDICAOPAGAMENTO',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar Transportador"}
              onClickButton={() => clickEditar(row)}
              cor={"success"}
              Icon={CiEdit}

            />
          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickEditar = (row) => {
    if (row && row.IDCONDICAOPAGAMENTO) {
      handleEditar(row.IDCONDICAOPAGAMENTO);
    }
  };

  const handleEditar = async (IDCONDICAOPAGAMENTO) => {
    try {
      const response = await get(`/condicaoPagamento?idCondPagamentos=${IDCONDICAOPAGAMENTO}`);
      setDadosDetalheCondPagamento(response.data);
      setModalEditar(true)
    } catch (error) {
      console.error(error);
    }
  }

  const handleModal = () => {
    setModalEditar(true)
  }

  return (
    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dados}
          // header={header}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
        >
          {colunasPagamentos.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}

              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>

      <ActionEditarCondicaoPagamentoModal
        show={modalEditar}
        handleClose={() => setModalEditar(false)}
        dadosDetalheCondPagamento={dadosDetalheCondPagamento}
      />
    </Fragment>
  )
}