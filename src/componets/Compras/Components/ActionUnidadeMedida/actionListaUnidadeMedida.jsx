import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { ActionEditarUnidadeMedidaModal } from "./actionEditarUnidadeMedidaModal";

export const ActionListaUnidadeMedida = ({listaUnidadeMedida}) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheUnidadeMedida, setDadosDetalheUnidadeMedida] = useState([]);
 
  const dados = listaUnidadeMedida.map((item, index) => {
    let contador = index + 1;
 
    return {
      IDUNIDADEMEDIDA: item.IDUNIDADEMEDIDA,
      DSUNIDADE: item.DSUNIDADE,
      DSSIGLA: item.DSSIGLA,
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
      field: 'DSUNIDADE',
      header: 'Descrição',
      body: row => row.DSUNIDADE,
      sortable: true,
    },
    {
      field: 'DSSIGLA',
      header: 'Sigla',
      body: row => {
        return (
          <p>{row.DSSIGLA}</p>
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
      field: 'IDSUBGRUPOESTRUTURA',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar Unidade de Medida"}
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
    if (row && row.IDUNIDADEMEDIDA) {
      handleEditar(row.IDUNIDADEMEDIDA);
    }
  };

  const handleEditar = async (IDUNIDADEMEDIDA) => {
    try {
      const response = await get(`/unidadeMedida?idUnidadeMedida=${IDUNIDADEMEDIDA}`);
      setDadosDetalheUnidadeMedida(response.data);
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

      <ActionEditarUnidadeMedidaModal 
        show={modalEditar} 
        handleClose={() => setModalEditar(false)} 
        dadosDetalheUnidadeMedida={dadosDetalheUnidadeMedida} 
      />
    </Fragment>
  )
}