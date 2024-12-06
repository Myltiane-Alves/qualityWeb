import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { FaRegTrashAlt } from "react-icons/fa";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
// como caplicar o single responsiblity principle aqui?

export const ActionDetalheEmpresaPromocao = ({ show, handleClose, dadosListaPromocaoEmpresa, dadosListaPromocao }) => {

  const dadosPromocaoEmpresa = dadosListaPromocaoEmpresa.map((item, index) => {
    let contador = index + 1;


    return {
      IDEMPRESAPROMOCAOMARKETING: item.IDEMPRESAPROMOCAOMARKETING,
      IDRESUMOPROMOCAOMARKETING: item.IDRESUMOPROMOCAOMARKETING,

      IDEMPRESA: item.IDEMPRESA,
      STATIVO: item.STATIVO,
      NOEMPPROMO: item.NOEMPPROMO,
      contador
    }
  });

  const colunasPromocaoEmpresa = [
    {
      field: 'contador',
      header: '#',
      body: row => row.contador,
      sortable: true,
      width: '10%'
    },
    {
      field: 'NOEMPPROMO',
      header: 'Empresa',
      body: row => row.NOEMPPROMO,
      sortable: true,

    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: (row) => (
        <div style={{ color: row.SATIVO == 'True' ? 'red' : 'blue' }}>

          {row.STATIVO == 'True' ? 'ATIVO' : 'INATIVO'}
        </div>
      )
    },
    {
      header: 'Opções',
      button: true,
      body: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="p-1">
            <ButtonTable
              titleButton={"Excluir Empresas da Promoção"}
              onClickButton
              Icon={FaRegTrashAlt}
              iconSize={18}
              iconColor={"#fff"}
              cor={"danger"}
            />

          </div>


        </div>

      ),
    },

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
          title={`Detalhe da Promoção:   ${dadosListaPromocao[0]?.DSPROMOCAOMARKETING} - Nº ${dadosPromocaoEmpresa[0]?.IDRESUMOPROMOCAOMARKETING}`}
          subTitle={"Lista das Empresas da Promoção"}
          handleClose={handleClose}
        />

        <Modal.Body>


          <DataTable
            title="Vendas por Loja"
            value={dadosPromocaoEmpresa}
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
            {colunasPromocaoEmpresa.map(coluna => (
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
