import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { ActionEditarCoresModal } from "./actionEditarCoresModal";

export const ActionListaCores = ({dadosCores}) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheCores, setDadosDetalheCores] = useState([]);
 
  const dados = dadosCores.map((item, index) => {
    let contador = index + 1;
 
    return {
      ID_COR: item.ID_COR,
      DS_COR: item.DS_COR,
      DS_GRUPOCOR: item.DS_GRUPOCOR,
      STATIVO: item.STATIVO,
      contador
    }
  })

  const colunasCores = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DS_COR',
      header: 'Descrição',
      body: row => row.DS_COR,
      sortable: true,
    },
    {
      field: 'DS_GRUPOCOR',
      header: 'Sigla',
      body: row => {
        return (
          <p>{row.DS_GRUPOCOR}</p>
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
      field: 'ID_COR',
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
    if (row && row.ID_COR) {
      handleEditar(row.ID_COR);
    }
  };

  const handleEditar = async (ID_COR) => {
    try {
      const response = await get(`/listaCores?idCor=${ID_COR}`);
      setDadosDetalheCores(response.data);
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
          {colunasCores.map(coluna => (
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

      <ActionEditarCoresModal 
        show={modalEditar}
        handleClose={() => setModalEditar(false)}
        dadosDetalheCores={dadosDetalheCores}
      />
    </Fragment>
  )
}