import { Fragment, useState } from "react"
import { dataFormatada } from "../../../utils/dataFormatada";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { formatMoeda } from "../../../utils/formatMoeda";

export const ActionListaDespesasLancada = ({ dadosDetalheDespesas }) => {


  const dadosDespesasDetalhe = dadosDetalheDespesas.map((item, index) => {
    let contador = index + 1; 
    let vrTotalFaturaLoja = 0;
    vrTotalFaturaLoja + item.TOTALVENDAPROD;

    return {
      IDDESPESASLOJA: item?.IDDESPESASLOJA,
      IDCATEGORIARECDESP: item?.IDCATEGORIARECDESP,
      IDCAIXAWEB: item?.IDCAIXAWEB,
      DTDESPESA: item?.DTDESPESA,
      DSCATEGORI: item?.DSCATEGORI,
      VRDESPESA: item?.VRDESPESA,
      DSPAGOA: item?.DSPAGOA,
      DSHISTORIO: item?.DSHISTORIO,
      NUNOTAFISCA: item?.NUNOTAFISCA,
      
      STATIVO: item?.STATIVO,
      STCANCELADO: item?.STCANCELADO,
      contador,
      vrTotalFaturaLoja
    };
  });
  const colunaDetalheDespesas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th> {row.contador}</th>,
      sortable: true,
      width: "5%"
    },
    {
      field: 'IDDESPESASLOJA',
      header: 'Data Mov.',
      body: row => <th> {dataFormatada(row.DTDESPESA)}</th>,
      sortable: true,
    },
    {
      field: 'DSCATEGORIA',
      header: 'Descrição',
      body: row => <th> {row.DSCATEGORIA}</th>,
      sortable: true,
    },
    {
      field: 'VRDESPESA',
      header: 'Valor',
      body: row => <th> {row.VRDESPESA}</th>,
      sortable: true,
    },
    {
      field: 'DSPAGOA',
      header: 'Pago a',
      body: row => <th> {row.DSPAGOA}</th>,
      sortable: true,
    },
    {
      field: 'DSHISTORIO',
      header: 'Historíco',
      body: row => <th> {row.DSHISTORIO}</th>,
      sortable: true,
    },
    {
      field: 'NUNOTAFISCAL',
      header: 'Nota Fiscal',
      body: row => <th> {row.NUNOTAFISCAL}</th>,  
      sortable: true,
    },
    {
      field: 'STCANCELADO',
      header: 'Situação',
      body: row => (
        <th style={{color: row.STCANCELADO == 'False' ? 'blue' : 'red'}}>
          {row.STCANCELADO == 'False' ? 'Ativo' : 'Cancelado'}
        
        </th>
      ),
      sortable: true,
    },

  ]
  const calcularValor = () => {
    let total = 0;
    for (let dados of dadosDespesasDetalhe) {
      total += parseFloat(dados.VRDESPESA);
    }
    return total;
  }

  const footerGroup = (
    <ColumnGroup>

      <Row> 
        <Column footer="Total Lançamentos " colSpan={3} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularValor())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
   
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
                Lista de Despesas Lançadas
              </h2>
            </header>
            <Accordion.Body className="panel-container show">
              <div className="card">
                <DataTable
                  title="Vendas por Loja"
                  value={dadosDespesasDetalhe}
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
                  {colunaDetalheDespesas.map(coluna => (
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