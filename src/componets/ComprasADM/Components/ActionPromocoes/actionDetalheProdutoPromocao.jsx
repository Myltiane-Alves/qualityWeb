import { Fragment } from "react"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal"
import Modal from 'react-bootstrap/Modal';
import { FaRegTrashAlt } from "react-icons/fa";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";


export const ActionDetalheProdutoPromocao = ({ show, handleClose, dadosProdutoOrigem, dadosProdutoDestino, dadosListaPromocao }) => {

  const dadosListaProdutoOrigem = dadosProdutoOrigem.map((item, index) => {
    let contador = index + 1;
    // console.log(item, 'item origem')
    return {
      IDDETALHEPROMOCAOMARKETINGORIGEM: item.IDDETALHEPROMOCAOMARKETINGORIGEM,
      IDRESUMOPROMOCAOMARKETING: item.IDRESUMOPROMOCAOMARKETING,
      IDPRODUTOORIGEM: item.IDPRODUTOORIGEM,
      NUCODBARRAS: item.NUCODBARRAS,
      DSPRODUTO: item.DSPRODUTO,
      contador
    }
  });

  const colunasProdutoOrigem = [
    {
      header: "#",
      body: row => row.contador,
      sortable: true,
    },
    {
      header: "Cod. Barras",
      body: row => row.NUCODBARRAS,
      sortable: true,
    },
    {
      header: "Produtos",
      body: row => row.DSPRODUTO,
      sortable: true,
    },
    {
      header: 'Opções',
      button: true,
      body: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="p-1">
            <ButtonTable
              titleButton={"Excluir Produto da Promoção"}
              onClickButton
              Icon={FaRegTrashAlt}
              iconSize={18}
              iconColor={"#fff"}
              cor={"danger"}
            />

          </div>
        </div>

      ),
    }

  ]

  const dadosListaProdutoDestino = dadosProdutoDestino.map((item, index) => {
    let contador = index + 1;
    // console.log(item, 'item destinos')
    return {
      IDDETALHEPROMOCAOMARKETINGDESTINO: item.IDDETALHEPROMOCAOMARKETINGDESTINO,
      IDRESUMOPROMOCAOMARKETING: item.IDRESUMOPROMOCAOMARKETING,
      IDPRODUTODESTINO: item.IDPRODUTODESTINO,
      NUCODBARRASDESTINO: item.NUCODBARRASDESTINO,
      DSPRODUTODESTINO: item.DSPRODUTODESTINO,
      contador
    }
  })
  const colunasProdutoDestino = [
    {
      header: "#",
      body: row => row.contador,
      sortable: true,
    },
    {
      header: "Cod. Barras",
      body: row => row.NUCODBARRASDESTINO,
      sortable: true,
    },
    {
      header: "Produtos",
      body: row => row.DSPRODUTODESTINO,
      sortable: true,
    },
    {
      header: 'Opções',
      button: true,
      body: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="p-1">
            <ButtonTable
              titleButton={"Excluir Produto da Promoção"}
              onClickButton
              Icon={FaRegTrashAlt}
              iconSize={18}
              iconColor={"#fff"}
              cor={"danger"}
            />

          </div>
        </div>

      ),
    }

  ]

  return (

    <Fragment>


      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <HeaderModal
          title={`Detalhe da Promoção:   ${dadosListaPromocao[0]?.DSPROMOCAOMARKETING} - Nº ${dadosListaPromocao[0]?.IDRESUMOPROMOCAOMARKETING}`}
          subTitle={"Lista dos Produtos da Promoção"}
          handleClose={handleClose}
        />

        <Modal.Body>

          <div>
            <div className="panel">
              <div className="panel-hdr">
                <h2>
                  <small class="m-0 text-muted">
                    Produtos de Origem
                  </small>
                </h2>
              </div>

              <div className="panel-container">
                <div className="panel-content">

                  <DataTable
                    title="Vendas por Loja"
                    value={dadosListaProdutoOrigem}
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
                    {colunasProdutoOrigem.map(coluna => (
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
            </div>
          </div>
          <div className="mt-5">
            <div className="panel">
              <div className="panel-hdr">
                <h2>
                  <small class="m-0 text-muted">
                    Produtos de Destino
                  </small>
                </h2>
              </div>
              <div className="panel-container">
                <div className="panel-content">
                  <DataTable
                    title="Vendas por Loja"
                    value={dadosListaProdutoDestino}
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
                    {colunasProdutoDestino.map(coluna => (
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
            </div>
          </div>

        </Modal.Body>

        <FooterModal>

          <ButtonTypeModal
            textButton={"Fechar"}
            onClickButtonType={handleClose}
            cor="secondary"
            tipo="button"
          />

        </FooterModal>
      </Modal>
    </Fragment>
  )
}


