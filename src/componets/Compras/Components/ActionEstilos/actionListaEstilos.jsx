import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { ActionEditarEstilosModal } from "./actionEditarEstilosModal";

export const ActionListaEstilos = ({dadosEstilos}) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheEstilos, setDadosDetalheEstilos] = useState([]);
 
  const dados = dadosEstilos.map((item, index) => {
    let contador = index + 1;
 
    return {
      ID_ESTILOS: item.ID_ESTILOS,
      DS_ESTILOS: item.DS_ESTILOS,
      COD_GRUPOESTILOS: item.COD_GRUPOESTILOS,
      DS_GRUPOESTILOS: item.DS_GRUPOESTILOS,
      COD_GRUPOESTILOS: item.COD_GRUPOESTILOS,
      STATIVO: item.STATIVO,
      contador
    }
  })

  const colunasUnidadeMedida = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DS_ESTILOS',
      header: 'Descrição',
      body: row => row.DS_ESTILOS,
      sortable: true,
    },
    {
      field: 'COD_GRUPOESTILOS',
      header: 'Grupo Estrutura',
      body: row => {
        return (
          <p>{`${row.COD_GRUPOESTILOS} - ${row.DS_GRUPOESTILOS}`}</p>
        )
      
      },
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
      field: 'ID_ESTILOS',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar Estilo"}
              onClickButton={() => clickEditar(row)}
              cor={"success"}
              Icon={CiEdit}
              iconSize={22}
              iconColor={"#fff"}

            />
          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickEditar = (row) => {
    if (row && row.ID_ESTILOS) {
      handleEditar(row.ID_ESTILOS);
    }
  };

  const handleEditar = async (ID_ESTILOS) => {
    try {
      const response = await get(`/listaEstilos?idEstilo=${ID_ESTILOS}`);
      setDadosDetalheEstilos(response.data);
      setModalEditar(true)
    } catch (error) {
      console.error(error);
    }
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
          {colunasUnidadeMedida.map(coluna => (
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

      <ActionEditarEstilosModal 
        show={modalEditar} 
        handleClose={() => setModalEditar(false)} 
        dadosDetalheEstilos={dadosDetalheEstilos} 
      />
    </Fragment>
  )
}