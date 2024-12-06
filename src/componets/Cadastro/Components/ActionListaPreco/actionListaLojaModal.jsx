import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { GrView } from "react-icons/gr";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Modal } from "react-bootstrap"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";

export const ActionListaLojaModal = ({ dadosListaLoja, show, handleClose }) => {
  const [modalListaLoja, setModalListaLoja] = useState(false);

  const dados = dadosListaLoja.flatMap((item) => {
    return item.detalheLista.map((detalhe, index) => {
      let contador = index + 1;
    
      return {
        IDEMPRESA: detalhe.loja?.IDEMPRESA,
        NOFANTASIA: detalhe.loja?.NOFANTASIA,
        STATIVO: detalhe.loja?.STATIVO,
        contador
      }

    })
  })


  const colunasListaPreco = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'IDEMPRESA',
      header: 'ID Loja',
      body: row => row.IDEMPRESA,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Nome Loja',
      body: row => {
        return (
          <p>{row.NOFANTASIA}</p>
        )

      },
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {
        return (
          <p style={{ color: row.STATIVO == 'True' ? 'blue' : 'red' }} >{row.STATIVO == 'True' ? 'ATIVA' : 'INATIVA'}</p>
        )
      },
      sortable: true,
    },

  ]


  return (
    <Fragment>
      <div className="card">
        <Modal
          show={show}
          onHide={handleClose}
          class="modal-content"
          size="xl"
          centered
        >

          <HeaderModal
            title={`Lista de Lojas: ${dadosListaLoja[0]?.listaPreco.NOMELISTA}`}
           
            handleClose={handleClose}
            size={"xl"}
          />

          <Modal.Body>
            <div className="">
              <p style={{fontWeight: 500}}>Número da Lista: <b>{dadosListaLoja[0]?.listaPreco.IDRESUMOLISTAPRECO}</b></p>
              <p style={{fontWeight: 500}}>Nome da Lista: <b>{dadosListaLoja[0]?.listaPreco.NOMELISTA}</b></p>
              <p style={{fontWeight: 500}}>Quantidade de Lojas na Lista: <b>{dadosListaLoja[0]?.detalheLista.length}</b></p>
              <p style={{fontWeight: 500}}>Lojas da Lista de Preço: <b></b></p>
            </div>
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
          </Modal.Body>
          <FooterModal
              ButtonTypeFechar={ButtonTypeModal}
              onClickButtonFechar={handleClose}
              textButtonFechar={"Fechar"}
              corFechar={"secondary"}
            />
        </Modal>
      </div>


    </Fragment>
  )
}