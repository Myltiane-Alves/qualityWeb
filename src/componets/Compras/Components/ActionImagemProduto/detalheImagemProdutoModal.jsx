import { Fragment } from "react"
import { Modal } from "react-bootstrap"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal"
import { BsTrash3 } from "react-icons/bs"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable"


export const ActionDetalheImagemProdutoModal = ({ show, handleClose, dadosDetalheProdutos }) => {

  const dadosListaProdutos = dadosDetalheProdutos.map((item, index) => {
    let contador = index + 1;

    const imagemProduto = item.IMAGEM.map((byte) => {
      return String.fromCharCode(byte)
    }).join('')

    return {
      IDIMAGEM: item.IDIMAGEM,
      NUREF: item.NUREF,
      IMAGEM: item.IMAGEM,
      
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      IDPRODUTO: item.IDPRODUTO,
      IDIMAGEM: item.IDIMAGEM,
      IDIMAGEMPRODUTO: item.IDIMAGEMPRODUTO,

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
      field: 'NUCODBARRAS',
      header: 'Código Barras',
      body: row => <p style={{ color: 'blue' }}> {row.NUCODBARRAS}</p>,
      sortable: true
    },
    {
      field: 'DSNOME',
      header: 'Nome',
      body: row => <p style={{ color: 'blue' }}> {row.DSNOME}</p>,
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
                Icon={BsTrash3}
                cor={"danger"}
                iconColor={"white"}
                iconSize={18}
                onClickButton={() => clickVinculoFonecedorFabricante(row)}
                titleButton={"Cancelar Produto da Imagem"}
              />
            </div>
          </div>
        )
      },
      sortable: true
    }
  ]


  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        class="modal-content"
        size="xl"
        centered
      >

        <HeaderModal
          title={"Imagens"}
          subTitle={"Lista de Produtos Vinculados a Imagem"}
          handleClose={handleClose}
        />

        <Modal.Body>

        <div className="row">
          <div className="col-sm-6 col-md-12 col-lg-4">
            <img src={dadosListaProdutos[0]?.imagemProduto} alt="Peça de Roupa" style={{ width: 'auto', height: 'auto' }} />
          </div>
          <div className="col-sm-6 col-md-12 col-lg-8">  
            <DataTable
              title="Vendas por Loja"
              value={dadosListaProdutos}
              sortField="VRTOTALPAGO"
              sortOrder={-1}
              rows={true}
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
        </div>


          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}

            ButtonTypeCadastrar={ButtonTypeModal}
            onClickButtonCadastrar
            textButtonCadastrar={"Salvar"}
            corCadastrar={"success"}
          />
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}