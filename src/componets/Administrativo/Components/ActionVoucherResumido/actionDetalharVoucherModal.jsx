import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";

export const ActionDetalharVoucherModal = ({ show, handleClose, dadosDetalheVoucher }) => {

  const dados = dadosDetalheVoucher.map((item) => {

    return {
      NUVOUCHER: item.NUVOUCHER,
      IDVOUCHER: item.IDVOUCHER,
      NUCODBARRAS: item.NUCODBARRAS,
      DSPRODUTO: item.DSPRODUTO,
      VRUNIT: toFloat(item.VRUNIT),
      VRDESCONTO: toFloat(item.VRDESCONTO),
      QTD: item.QTD,
      VRTOTALBRUTO: toFloat(item.VRTOTALBRUTO),
      VRTOTALDESCONTO: toFloat(item.VRTOTALDESCONTO),
      VRTOTALLIQUIDO: toFloat(item.VRTOTALLIQUIDO),
      STCANCELADO: item.STCANCELADO,
      
    }
  })

  const colunasProdutosVoucher = [
    {
      field: 'NUCODBARRAS',
      header: 'Cod. Barras',
      body: row => <th style={{ color: 'blue' }}>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Descrição',
      body: row => <th style={{ color: 'blue' }}>{row.DSPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'VRUNIT',
      header: 'Vr Unit',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.VRUNIT)}</th>,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'QTD',
      body: row => <th style={{ color: 'blue' }}>{row.QTD}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALBRUTO',
      header: 'Vr Bruto',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.VRTOTALBRUTO)}</th>,
      sortable: true,
    },
    {
      field: 'VRDESCONTO',
      header: 'Vr Desconto',
      body: row => <th style={{ color: 'blue' }}>{formatMoeda(row.VRDESCONTO)}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Vr Líquido',
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

        <div style={{ padding: "10px" }}>

          <HeaderModal
            title={"Detalhes do Voucher"}
            subTitle={"Relação de Produtos do Voucher"}
            handleClose={handleClose}
          />

          <Modal.Body>

            <>
              <div className="row">
                <div className="col-xl-12 col-sm-12">

                  <div className="mt-2 panel">
                    <div className="panel-hdr">

                      <h2 className="p-3">Produtos Venda de Origem:  {dados[0]?.NUVOUCHER} </h2>
                    </div>
                    <div className="panel-container">
                      <div className="panel-content">

                        <DataTable
                          value={dados}
                          size="small"
                          sortOrder={-1}
                          rows={true}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
                        >
                          {colunasProdutosVoucher.map(coluna => (
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
              </div>

            </>
          </Modal.Body>


          <FooterModal

            ButtonTypeFechar={ButtonTypeModal}
            textButtonFechar={"Fechar"}
            onClickButtonFechar={handleClose}
            corFechar="secondary"
          />
        </div>
      </Modal>
    </Fragment>
  )
}