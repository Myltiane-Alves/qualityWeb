import { Fragment, useState } from "react"
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { BsTrash3 } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get, put } from "../../../../api/funcRequest";
import { ActionDetalheImagemProdutoModal } from "./detalheImagemProdutoModal";
import Swal from 'sweetalert2';


export const ActionListaImagemProduto = ({ dadosProdutos }) => {
  const [dadosDetalheProdutos, setDadosDetalheProdutos] = useState([])
  const [modalDetalhe, setModalDetalhe] = useState(false)

  const dadosListaProdutos = dadosProdutos.map((item, index) => {
    let contador = index + 1;

    const imagemProduto = item.IMAGEM.map((byte) => {
      return String.fromCharCode(byte)
    }).join('')

    return {
      IDIMAGEM: item.IDIMAGEM,
      NUREF: item.NUREF,
      IMAGEM: item.IMAGEM,
      DTINCLUSAOFORMAT: item.DTINCLUSAOFORMAT,
      STATIVO: item.STATIVO,
      imagemProduto,
      contador
    }
  })

  const conlunasProdutos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <p style={{ color: 'blue' }}> {row.contador} </p>,
      sortable: true
    },
    {
      field: 'NUREF',
      header: 'Referência',
      body: row => <p style={{ color: 'blue' }}> {row.NUREF}</p>,
      sortable: true
    },
    {
      field: 'imagemProduto',
      header: 'Imagem',
      body: row => {
        return (
          <div>
            <img src={row.imagemProduto} alt="Imagem" style={{ width: '15%', height: '15%' }} />
          </div>
        )
      },
      sortable: true
    },
    {
      field: 'DTINCLUSAOFORMAT',
      header: 'Data Cadastro',
      body: row => <p style={{ color: 'blue' }}> {row.DTINCLUSAOFORMAT}</p>,
      sortable: true
    },
    {
      field: 'STATIVO',
      header: 'Opções',
      body: row => {
        return (
          <div className="p-1 "
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div className="p-1">
              <ButtonTable
                Icon={GrView}
                cor={"info"}
                iconColor={"white"}
                iconSize={18}
                onClickButton={(e) => clickDetalheProduto(row)}
                titleButton={"Detalher Produtos da Imagem"}
              />
            </div>

            <div className="p-1">
              <ButtonTable
                Icon={BsTrash3}
                cor={"danger"}
                iconColor={"white"}
                iconSize={18}
                onClickButton={() => handleDelete()}
                titleButton={"Cancelar Imagem do Produto"}
              />
            </div>



          </div>
        )
      },
      sortable: true
    }
  ]


  const clickDetalheProduto = (row) => {
    if (row && row.IDIMAGEM) {
      handleDetalhe(row.IDIMAGEM);
    }
  };

  const handleDetalhe = async (IDIMAGEM) => {
    try {
      const response = await get(`/listaProdutosImagem?idImagem=${IDIMAGEM}`);
      setDadosDetalheProdutos(response.data);
      setModalDetalhe(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickDelete = (row) => {
    if (row && row.IDIMAGEMPRODUTO) {
      handleDelete(row.IDIMAGEMPRODUTO);
    }
  }

  const handleDelete = async (IDIMAGEMPRODUTO, STATIVO) => {
    
    // Swal.fire({
    //   position: 'top-end',
    //   title: 'Certeza que Deseja Cancelar essa Imagem?',
    //   text: "Você não poderá reverter esta ação!",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Confirmar",
    //   denyButtonText: `Cancelar`,
    //   // timer: 15000
    // }).then((result) => {
    //     const postData = {
    //       IDIMAGEMPRODUTO,
    //       STATIVO
    //     }
      
    //     const response =  put('', postData)
    //     .then(response => {
          
    //       // Limpar os campos do formulário
        
    //       console.log(response, 'despesa cadastrada com sucesso front end!')
    //     })
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     Swal.fire('Imagem Cancelada com Sucesso', '', 'success')
    //   } else if (result.isDenied) {
    //     Swal.fire('Imagem Cancelada com Sucesso', '', 'info')
    //   }
    // })
      
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Certeza que Deseja Cancelar essa Imagem?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deletado!",
          text: "Imagem Cancelada com Sucesso",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Imagem Cancelada com Sucesso",
          icon: "error"
        });
      }
    });
  }

  return (
    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosListaProdutos}
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
          {conlunasProdutos.map(coluna => (
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

      <ActionDetalheImagemProdutoModal
        show={modalDetalhe}
        handleClose={() => setModalDetalhe(false)}
        dadosDetalheProdutos={dadosDetalheProdutos}
      /> 
    </Fragment>
  )
}