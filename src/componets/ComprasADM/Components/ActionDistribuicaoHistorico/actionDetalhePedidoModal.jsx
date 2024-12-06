import { Fragment, useState } from "react"
import { Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { put } from "../../../../api/funcRequest";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const ActionDetalhePedidoModal = ({ show, handleClose, dadosDetalhePedido }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();


  const dados = dadosDetalhePedido.map((item, index) => {
    let contador = index + 1;


    return {
      IDDETALHEPEDIDO: item.IDDETALHEPEDIDO,
      IDRESUMOPEDIDO: item.IDRESUMOPEDIDO,
      DSPRODUTO: item.DSPRODUTO,
      DSFABRICANTE: item.DSFABRICANTE,
      DSSUBGRUPOESTRUTURA: item.DSSUBGRUPOESTRUTURA,
      DSCATEGORIAS: item.DSCATEGORIAS,
      DSTIPOTECIDO: item.DSTIPOTECIDO,
      DSCOR: item.DSCOR,
      DSESTILO: item.DSESTILO,
      DSTAMANHO: item.DSTAMANHO,
    }
  });


  const colunasPedidos = [

    {
      field: 'IDPEDIDOCOMPRA',
      header: 'Nº Det Pedido',
      body: row => row.IDPEDIDOCOMPRA,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Produto',
      body: row => row.DSPRODUTO,
      sortable: true,
    },
    {
      field: 'DSFABRICANTE',
      header: 'Marca',
      body: row => row.DSFABRICANTE,
      sortable: true,
    },
    {
      field: 'DSSUBGRUPOESTRUTURA',
      header: 'Estrutura Mercadológica',
      body: row => row.DSSUBGRUPOESTRUTURA,
      sortable: true,
    },
    {
      field: 'DSCATEGORIAS',
      header: 'Categorias',
      body: row => row.DSCATEGORIAS,
      sortable: true,
    },
    {
      field: 'DSTIPOTECIDO',
      header: 'Tecido',
      body: row => row.DSTIPOTECIDO,
      sortable: true,
    },
    {
      field: 'DSCOR',
      header: 'Cor',
      body: row => row.DSCOR,
      sortable: true,
    },
    {
      field: 'DSESTILO',
      header: 'Estilo',
      body: row => row.DSESTILO,
      sortable: true,
    },
    {
      field: 'DSTAMANHO',
      header: 'Tamanho',
      body: row => row.DSTAMANHO,
      sortable: true,
    },
   
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
          title={"Detalhe do Pedido de Compra"}
          subTitle={"Detalhe do Pedido de Compra"}
          handleClose={handleClose}
        />


        <Modal.Body>
        <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dados}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasPedidos.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}
              selectionMode={coluna.selectionMode}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}
