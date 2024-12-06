import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { get, put } from "../../../../api/funcRequest";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";


export const ActionListaCategoriaTamanho = ({ dadosCategoriaTamanhos }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [excluirVinculoTamanhoPedido, setExcluirVinculoPedido] = useState([]);
  
  const dados = dadosCategoriaTamanhos.map((item, index) => {
    let contador = index + 1;
    return {
      IDCATPEDIDOTAMANHO: item.IDCATPEDIDOTAMANHO,
      DSTAMANHO: item.DSTAMANHO,
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
      header: 'Categoria',
      body: row => row.DSCATEGORIAPEDIDO,
      sortable: true,
    },
    {
      field: 'TIPOPEDIDO',
      header: 'Tipo Categoria',
      body: row => row.TIPOPEDIDO,
      sortable: true,
    },
    {
      field: 'DSTAMANHO',
      header: 'Tamanho',
      body: row => {
        return (
          <p>{row.DSTAMANHO}</p>
        )
      },
      sortable: true,
    },
    {
      field: 'IDCATPEDIDOTAMANHO',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Excluir Vínculo Categoria/Tamanho"}
              onClickButton={() => clickEditar(row)}
              cor={"danger"}
              Icon={BsTrash3}
              iconSize={20}

            />
          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickEditar = (row) => {
    if (row && row.IDCATPEDIDOTAMANHO) {
      handleEditar(row.IDCATPEDIDOTAMANHO);
    }
  };

  const handleEditar = async (IDCATPEDIDOTAMANHO) => {
    try {
      Swal.fire({
        title: "Certeza que Deseja Excluir o Vínculo da Categoria?",
        text: "Você não poderá reverter esta ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#886ab5",
        cancelButtonColor: "#fd3995",
        confirmButtonText: "OK"
      }).then((result) => {
        // const response =  put(`/deletarVinculoTamanhoCategoria?IDCATPEDIDOTAMANHO=${IDCATPEDIDOTAMANHO}`);
        const response =  put(`/?IDCATPEDIDOTAMANHO=${IDCATPEDIDOTAMANHO}`);
        setExcluirVinculoPedido(response.data);
        if (result.isConfirmed) {
          Swal.fire({
            title: "Excluído!",
            text: "Vínculo Excluído com Sucesso.",
            icon: "success"
          });
        }

        put(``)
      });
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

 
    </Fragment>
  )
}