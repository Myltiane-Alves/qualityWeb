import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { GrView } from "react-icons/gr";
import { ActionListaLojaModal } from "./actionListaLojaModal";
import { ActionEditarListasPrecosModal } from "./actionEditarListasPrecosModal";


export const ActionListaPrecos = ({dadosListaPedidos}) => {
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosListaLoja, setDadosListaLoja] = useState([]);
 
  const dados = dadosListaPedidos.map((item, index) => {
    let contador = index + 1;
  
    return {
      IDRESUMOLISTAPRECO: item.listaPreco?.IDRESUMOLISTAPRECO,
      NOMELISTA: item.listaPreco?.NOMELISTA,
      DATACRIACAO: item.listaPreco?.DATACRIACAO,
      DATAALTERACAO: item.listaPreco?.DATAALTERACAO,
      STATIVO: item.listaPreco?.STATIVO,
      detalheLista: item.detalheLista.length,
      contador
    }
  })

  const colunasListaPreco = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'IDRESUMOLISTAPRECO',
      header: 'Número Lista',
      body: row => row.IDRESUMOLISTAPRECO,
      sortable: true,
    },
    {
      field: 'NOMELISTA',
      header: 'Nome',
      body: row => {
        return (
          <p>{row.NOMELISTA}</p>
        )
        
      },
      sortable: true,
    },
    {
      field: 'detalheLista',
      header: 'QTD Lojas',
      body: row => row.detalheLista,
      sortable: true,
    },
    {
      field: 'DATACRIACAO',
      header: 'Data Criação',
      body: row => row.DATACRIACAO,
      sortable: true,
    },
    {
      field: 'DATAALTERACAO',
      header: 'Data Alteração',
      body: row => row.DATAALTERACAO,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {
        return (
          <p style={{color: row.STATIVO == 'True' ? 'blue' : 'red'}} >{row.STATIVO == 'True' ? 'ATIVA' : 'INATIVA'}</p>
        )
      },
      sortable: true,
    },
  
    {
      field: 'IDRESUMOLISTAPRECO',
      header: 'Opções',
      body: row => {
        return (
          <div style={{ justifyContent: "space-around", display: "flex" }}>
            <div >
              <ButtonTable
                titleButton={"Visualizar Lojas da Lista"}
                onClickButton={() => clickVisualizar(row)}
                cor={"success"}
                Icon={GrView}
                iconSize={22}
                iconColor={"#fff"}

              />
            </div>
            <div>
              <ButtonTable
                titleButton={"Editar Lista de Preço"}
                onClickButton={() => clickEditar(row)}
                cor={"primary"}
                Icon={CiEdit}
                iconSize={22}
                iconColor={"#fff"}

              />
            </div>

          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickVisualizar = (row) => {
    if (row && row.IDRESUMOLISTAPRECO) {
      handleVisualizar(row.IDRESUMOLISTAPRECO);
    }
  };

  const handleVisualizar = async (IDRESUMOLISTAPRECO) => {
    try {
      const response = await get(`/listaPreco?idLista=${IDRESUMOLISTAPRECO}`);
      if(response && response.data) {
        setDadosListaLoja(response.data);
        setModalVisualizar(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const clickEditar = (row) => {
    if (row && row.IDRESUMOLISTAPRECO) {
      handleEditar(row.IDRESUMOLISTAPRECO);
    }
  };

  const handleEditar = async (IDRESUMOLISTAPRECO) => {
    try {
      const response = await get(`/listaPreco?idLista=${IDRESUMOLISTAPRECO}`);
      if(response && response.data) {
        setDadosListaLoja(response.data);
        setModalEditar(true)
      }
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
          {colunasListaPreco.map(coluna => (
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

      <ActionListaLojaModal
        show={modalVisualizar}
        handleClose={() => setModalVisualizar(false)}
        dadosListaLoja={dadosListaLoja}
      />

      <ActionEditarListasPrecosModal 
        show={modalEditar}
        handleClose={() => setModalEditar(false)}
        dadosListaLoja={dadosListaLoja}
      />
    </Fragment>
  )
}