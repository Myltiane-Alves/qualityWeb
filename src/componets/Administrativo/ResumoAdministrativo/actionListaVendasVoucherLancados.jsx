import { Fragment, useState } from "react"
import { dataFormatada } from "../../../utils/dataFormatada";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { formatMoeda } from "../../../utils/formatMoeda";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export const ActionListaVendasVoucherLancado = ({ dadosDetalheVoucher }) => {

  const dadosVoucherDetalhe = dadosDetalheVoucher.map((item, index) => {
    let contador = index + 1;
    let vrTotalFaturaLoja = 0;
    vrTotalFaturaLoja + item.TOTALVENDAPROD;

    return {
      IDVOUCHER: item.IDVOUCHER,
      DTINVOUCHER: item.DTINVOUCHER,
      DTOUTVOUCHER: item.DTOUTVOUCHER,
      DSCAIXAORIGEM: item.DSCAIXAORIGEM,
      DSCAIXADESTINO: item.DSCAIXADESTINO,
      NUVOUCHER: item.NUVOUCHER,
      VRVOUCHER: item.VRVOUCHER,
      NOFANTASIA: item.NOFANTASIA,

      STATIVO: item.STATIVO,
      STCANCELADO: item.STCANCELADO,
      contador,
      vrTotalFaturaLoja
    };
  });
  const colunaVoucherLancado = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{ color:  'blue'  }}>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXAORIGEM',
      header: 'Caixa ',
      body: row => <th style={{ color:  'blue'  }}>{row.DSCAIXAORIGEM}</th>,
      sortable: true,
    },
    {
      field: 'NUVOUCHER',
      header: 'Nº Voucher ',
      body: row => <th style={{ color:  'blue'  }}>{parseFloat(row.NUVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'DTINVOUCHER',
      header: 'Data',
      body: row => <th style={{ color:  'blue'  }}>{row.DTINVOUCHER}</th>,
      sortable: true,
    },
    {
      field: 'VRVOUCHER',
      header: 'Valor',
      body: row => <th style={{ color:  'blue'  }}>{formatMoeda(row.VRVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja Recebido',
      body: row => <th style={{ color:  'blue'  }}>{row.NOFANTASIA}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXADESTINO',
      header: 'Caixa Recebido',
      body: row => <th style={{ color:  'blue'  }}>{row.DSCAIXADESTINO}</th>,
      sortable: true,
    },
    {
      field: 'DTOUTVOUCHER',
      header: 'Data Recebido',
      body: row => <th style={{ color:  'blue'  }}>{row.DTOUTVOUCHER}</th>,
      sortable: true,
    },
    {
      field: 'STCANCELADO',
      header: 'Situação',
      body: row => (
        <th style={{ color: row.STCANCELADO == 'False' ? 'blue' : 'red' }}>
          {row.STCANCELADO == 'False' ? 'Ativo' : 'Cancelado'}

        </th>
      ),
      sortable: true,
    },

  ]

  const calcularVrVoucher = () => {
    let total = 0;
    for (let dados of dadosVoucherDetalhe) {
      total += parseFloat(dados.VRVOUCHER);
    }
    return total;
  }

  const footerGroup = (
    <ColumnGroup>

      <Row> 
        <Column footer="Total Lançamentos " colSpan={4} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularVrVoucher())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
   
        <Column footer={""} colSpan={4} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>

      </Row>


    </ColumnGroup>
  )


  return (
    <Fragment>
      <div className="row" >
        <Accordion defaultActiveKey="0" className="col-xl-12" >
          <Accordion.Item eventKey="0" id="panel-1" className="panel" >
            <header className="panel-hdr tituloListVendasCaixa" >
              <h2 id="TituloLoja" >
                Lista de Voucher Lançados
              </h2>
            </header>
            <Accordion.Body className="panel-container show">
              <div className="card">
                <DataTable
                  title="Vendas por Loja"
                  value={dadosVoucherDetalhe}
                  sortField="VRTOTALPAGO"
                  footerColumnGroup={footerGroup}
                  sortOrder={-1}
                  paginator={true}
                  rows={10}
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  showGridlines
                  stripedRows
                  emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                >
                  {colunaVoucherLancado.map(coluna => (
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
            </Accordion.Body  >
          </Accordion.Item>
        </Accordion>
      </div>
    </Fragment>
  )
}