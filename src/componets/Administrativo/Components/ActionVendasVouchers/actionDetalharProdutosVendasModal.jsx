import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { calcularDiferencaEmDias } from "../../../../utils/diferenciaDias";

export const ActionDetalharProdutosVendasModal = ({ show, handleClose, dadosDetalhesVendasProdutos }) => {
  const [size, setSize] = useState('small');
  // const [dataDiferencia, setDataDiferencia] = useState('')

  // useEffect(() => {
  //   const dataVenda = calcularDiferencaEmDias()
  //   setDataDiferencia(dataVenda)
  // }, [])

  const dados = dadosDetalhesVendasProdutos.map((item) => {
    
    return {

      // IDVENDA: item[0].venda.IDVENDA,
      // NRNOTA: item[0].venda.NRNOTA,
      // DEST_CPF: item[0].venda.DEST_CPF,
      // DEST_CNPJ: item[0].venda.DEST_CNPJ,
      // DTHORAFECHAMENTO: item[0].venda.DTHORAFECHAMENTO,

      CPROD: item.detalhe[0].det.CPROD,
      IDVENDADETALHE: item.detalhe[0].det.IDVENDADETALHE,
      XPROD: item.detalhe[0].det.XPROD,
      NUCODBARRAS: item.detalhe[0].det.NUCODBARRAS,
      QTD: item.detalhe[0].det.QTD,
      VRTOTALLIQUIDO: item.detalhe[0].det.VRTOTALLIQUIDO,
      VUNTRIB: item.detalhe[0].det.VUNTRIB,
      VPROD: item.detalhe[0].det.VPROD,
      STTROCA: item.detalhe[0].det.STTROCA,
      VENDEDOR_MATRICULA: item.detalhe[0].det.VENDEDOR_MATRICULA,
    }
  })

  const colunasProdutosVendas = [
    {
      field: 'NUCODBARRAS',
      header: 'Cod. Barras',
      body: row => <th style={{ color: 'blue' }}>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'CPROD',
      header: 'Cod. Produto',
      body: row => <th style={{ color: 'blue' }}>{row.CPROD}</th>,
      sortable: true,
    },
    {
      field: 'XPROD',
      header: 'Produto',
      body: row => <th style={{ color: 'blue' }}>{row.XPROD}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cod. Barras',
      body: row => <th style={{ color: 'blue' }}>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => <th style={{ color: 'blue' }}>{row.QTD}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Valor',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.VRTOTALLIQUIDO)}</th>,
      sortable: true,
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
          title={"Produtos Vendas"}
          subTitle={"Produtos Vendas de Origem e Destino"}
          handleClose={handleClose}
        />

        <Modal.Body>

          <DataTable
            value={dados}
            sortOrder={-1}
            size={size}
            rows={true}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasProdutosVendas.map(coluna => (
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
          textButtonFechar={"Fechar"}
          onClickButtonFechar={handleClose}
          corFechar="secondary"
        />

      </Modal>
    </Fragment>
  )
}