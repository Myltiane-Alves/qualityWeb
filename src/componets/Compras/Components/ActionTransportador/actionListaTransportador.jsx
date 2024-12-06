import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { ActionCadastroTrasnportadorModal } from "./actionCadastroTransportadorModal";
import { ActionEditarTrasnportadorModal } from "./actionEditarTransportadorModal";
import { get } from "../../../../api/funcRequest";

export const ActionListaTransportador = ({ dadosListaTransportador }) => {
  const [modalCadastro, setModalCadastro] = useState(false);
  const [dadosDetalheTranspotador, setDadosDetalheTranspotador] = useState([]);
  const dados = dadosListaTransportador.map((item, index) => {
    let contador = index + 1;
    // console.log(item, 'item')
    return {
      IDTRANSPORTADORA: item.IDTRANSPORTADORA,
      NORAZAOSOCIAL: item.NORAZAOSOCIAL,
      NOFANTASIA: item.NOFANTASIA,
      NUCNPJ: item.NUCNPJ,
      ECIDADE: item.ECIDADE,
      SGUF: item.SGUF,
      NUTELEFONE1: item.NUTELEFONE1,

      contador
    }
  })

  const colunasTransportadores = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'NUCNPJ',
      header: 'CNPJ',
      body: row => row.NUCNPJ,
      sortable: true,
    },
    {
      field: 'NORAZAOSOCIAL',
      header: 'Razão Social',
      body: row => row.NORAZAOSOCIAL,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Nome Fantasia',
      body: row => row.NOFANTASIA,
      sortable: true,
    },
    {
      field: 'NUTELEFONE1',
      header: 'Telefone',
      body: row => row.NUTELEFONE1,
      sortable: true,
    },
    {
      field: 'ECIDADE',
      header: 'Cidade',
      body: row => row.ECIDADE,
      sortable: true,
    },
    {
      field: 'SGUF',
      header: 'UF',
      body: row => row.SGUF,
      sortable: true,
    },
    {
      field: 'IDTRANSPORTADORA',
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
    if (row && row.IDTRANSPORTADORA) {
      handleEditar(row.IDTRANSPORTADORA);
    }
  };

  const handleEditar = async (IDTRANSPORTADORA) => {
    try {
      const response = await get(`/transportadorID?idTransportador=${IDTRANSPORTADORA}`);
      setDadosDetalheTranspotador(response.data);
      setModalCadastro(true)
    } catch (error) {
      console.error(error);
    }
  }

  const handleModal = () => {
    setModalCadastro(true)
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
          {colunasTransportadores.map(coluna => (
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

      <ActionEditarTrasnportadorModal
        show={modalCadastro}
        handleClose={() => setModalCadastro(false)}
        dadosDetalheTranspotador={dadosDetalheTranspotador}
      /> 
    </Fragment>
  )
}