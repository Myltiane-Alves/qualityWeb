import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { ActionEditarCategoriaPedidoModal } from "./actionEditarCategoriaPedidoModal";


export const ActionListaCategoriaPedidos = ({ dadosCategoria }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheCategoriaPedido, setDadosDetalheCategoriaPedido] = useState([]);
  
  const dados = dadosCategoria.map((item, index) => {
    let contador = index + 1;
    return {
      IDCATEGORIAPEDIDO: item.IDCATEGORIAPEDIDO,
      DSCATEGORIAPEDIDO: item.DSCATEGORIAPEDIDO,
      TIPOPEDIDO: item.TIPOPEDIDO,
      STATIVO: item.STATIVO,

      contador
    }
  })

  const colunasCategoriaPedido = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DSCATEGORIAPEDIDO',
      header: 'Descrição',
      body: row => row.DSCATEGORIAPEDIDO,
      sortable: true,
    },
    {
      field: 'TIPOPEDIDO',
      header: 'Tipo',
      body: row => row.TIPOPEDIDO,
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
      field: 'IDCATEGORIAPEDIDO',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar Categoria Pedido"}
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
    if (row && row.IDCATEGORIAPEDIDO) {
      handleEditar(row.IDCATEGORIAPEDIDO);
    }
  };

  const handleEditar = async (IDCATEGORIAPEDIDO) => {
    try {
      const response = await get(`/categoriaPedidos?idCategoriaPedido=${IDCATEGORIAPEDIDO}`);
      setDadosDetalheCategoriaPedido(response.data);
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
          {colunasCategoriaPedido.map(coluna => (
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

      <ActionEditarCategoriaPedidoModal
        show={modalEditar}
        handleClose={() => setModalEditar(false)}
        dadosDetalheCategoriaPedido={dadosDetalheCategoriaPedido}
      />
    </Fragment>
  )
}