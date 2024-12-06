import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";

export const ActionDetalharModal = ({ show, handleClose, dadosDetalheVoucher }) => {

  const dados = dadosDetalheVoucher.map((item) => {
    
    return {

      NUCODBARRAS: item.detalhevoucher[0].det.NUCODBARRAS,
      DSPRODUTO: item.detalhevoucher[0].det.DSPRODUTO,
      QTD: item.detalhevoucher[0].det.QTD,
      VRTOTALLIQUIDO: item.detalhevoucher[0].det.VRTOTALLIQUIDO,
      // IDRESUMOVENDAWEB: item.voucher[0].IDRESUMOVENDAWEB,
    }
  })

  const colunasProdutosVendasDestino = [
    {
      field: 'NUCODBARRAS',
      header: 'Cod. Barras',
      body: row => <th style={{color: 'blue'}}>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Produto',
      body: row => <th style={{color: 'blue'}}>{row.DSPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => <th style={{color: 'blue'}}>{row.QTD}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Valor',
      body: row => <th style={{color: 'blue'}}>{formatMoeda(row.VRTOTALLIQUIDO)}</th>,
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
            title={"Produtos Vendas"}
            subTitle={"Produtos Vendas de Origem e Destino"}
            handleClose={handleClose}
          />

          <Modal.Body>

            <>
              <div className="row">
                <div className="col-xl-12 col-sm-12">

                  <div className="mt-2 panel">
                    <div className="panel-hdr">

                      <h2 className="p-3">Produtos Venda de Origem: {dadosDetalheVoucher[0]?.voucher.IDRESUMOVENDAWEB}  </h2>
                    </div>
                    <div className="panel-container">
                      <div className="panel-content">

                        <DataTable
                          value={dados}
                          sortOrder={-1}
                          rows={true}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
                        >
                          {colunasProdutosVendasDestino.map(coluna => (
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

              <div className="row">
                <div className="col-xl-12 col-sm-12">

                  <div className="mt-2 panel">
                    <div className="panel-hdr">
                    
                      <h2 className="p-3">Produtos Venda de Destino: {dadosDetalheVoucher[0]?.voucher.IDRESUMOVENDAWEBDESTINO}  </h2>
                    </div>
                    <div className="panel-container">
                      <div className="panel-content">


                        <DataTable
                          value={dados}
                          sortOrder={-1}
                          paginator={true}
                          rows={10}
                          rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
                        >
                          {colunasProdutosVendasDestino.map(coluna => (
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