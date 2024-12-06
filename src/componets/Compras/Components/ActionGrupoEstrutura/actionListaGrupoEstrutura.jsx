import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { ActionEditarGrupoEstruturaModal } from "./actionEditarGrupoEstruturaModal";

export const ActionListaGrupoEstrutura = ({ dadosGrupoEstrutura }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheGrupo, setDadosDetalheGrupo] = useState([]);
  const dados = dadosGrupoEstrutura.map((item, index) => {
    let contador = index + 1;
    // console.log(item, 'item')
    return {
      IDGRUPOESTRUTURA: item.IDGRUPOESTRUTURA,
      IDGRUPOEMPRESARIAL: item.IDGRUPOEMPRESARIAL,
      DSGRUPOESTRUTURA: item.DSGRUPOESTRUTURA,
      STATIVO: item.STATIVO,
      contador
    }
  })

  const colunasGrupos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DSGRUPOESTRUTURA',
      header: 'Descrição',
      body: row => row.DSGRUPOESTRUTURA,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {
        return (
          <p style={{color: row.STATIVO == 'True' ? 'blue' : 'red'}} >{row.STATIVO == 'True' ? 'ATIVO' : 'INATIVO'}</p>
        )
      },
      sortable: true,
    },
  
    {
      field: 'IDGRUPOESTRUTURA',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar Grupo Extrutura"}
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
    if (row && row.IDGRUPOESTRUTURA) {
      handleEditar(row.IDGRUPOESTRUTURA);
    }
  };

  const handleEditar = async (IDGRUPOESTRUTURA) => {
    try {
      const response = await get(`/grupoEstrutura?idGrupoEstrutura=${IDGRUPOESTRUTURA}`);
      setDadosDetalheGrupo(response.data);
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
          {colunasGrupos.map(coluna => (
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

        <ActionEditarGrupoEstruturaModal
          show={modalEditar}
          handleClose={() => setModalEditar(false)}
          dadosDetalheGrupo={dadosDetalheGrupo}
        />
    </Fragment>
  )
}