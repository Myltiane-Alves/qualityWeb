import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { formatMoeda } from "../../../utils/formatMoeda";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { toFloat } from "../../../utils/toFloat";

export const ActionListaFaturasLancada = ({ dadosDetalheFaturaLancadas }) => {


  const dadosFaturaDetalhe = dadosDetalheFaturaLancadas.map((item, index) => {
    let contador = index + 1;
    let vrTotalFaturaLoja = 0;
    vrTotalFaturaLoja + item.TOTALVENDAPROD;
   
    return {
      IDDETALHEFATURA: item.IDDETALHEFATURA,
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: item.DSCAIXA,
      DTPROCESSAMENTO: item.DTPROCESSAMENTO,
      NUCODAUTORIZACAO: toFloat(item.NUCODAUTORIZACAO),
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      VRRECEBIDO: toFloat(item.VRRECEBIDO),
      STCANCELADO: item.STCANCELADO,
      IDMOVIMENTOCAIXAWEB: parseFloat(item.IDMOVIMENTOCAIXAWEB),
      STCONFERIDO: item.STCONFERIDO,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO,

      PROTNFE_INFPROT_XMOTIVO: item.PROTNFE_INFPROT_XMOTIVO,
      TOTALVENDAPROD: toFloat(item.TOTALVENDAPROD),

      contador,
      vrTotalFaturaLoja
    };
  });

  const calcularTotalValorRecebido = () => {
    let total = 0;
    for (let resultado of dadosFaturaDetalhe) {
      total += parseFloat(resultado.VRRECEBIDO);
    }
    return total;
  }
  const colunaFaturaLoja = [
    {
      field: 'contador',
      header: '*',
      body: row => <th style={{ color: 'blue' }}>{row.contador}</th>,
      sortable: true,
      width: "5%"
    },
    {
      field: 'DTPROCESSAMENTO',
      header: 'Data Recebimento',
      body: row => <th style={{ color: 'blue' }}>{row.DTPROCESSAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'IDMOVIMENTOCAIXAWEB',
      header: 'Nº Movimento',
      body: row => <th style={{ color: 'blue' }}>{row.IDMOVIMENTOCAIXAWEB}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: row => <th style={{ color: 'blue' }}>{row.IDCAIXAWEB + row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'NUCODAUTORIZACAO',
      header: 'Cod. Autorização',
      body: row => <th style={{ color: 'blue' }}>{row.NUCODAUTORIZACAO}</th>,
      footer: 'Total Lançamentos',
      sortable: true,
    },
    {
      field: 'VRRECEBIDO',
      header: 'Valor',
      body: row => <th style={{ color: 'green' }}>{formatMoeda(row.VRRECEBIDO)}</th>,
      footer: formatMoeda(calcularTotalValorRecebido()),
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Recebedor',
      body: row => <th style={{ color: 'blue' }}>{row.NOFUNCIONARIO}</th>,
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


  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer="Total Lançamentos " colSpan={5} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalValorRecebido())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={""} colSpan={4} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>
    </ColumnGroup>
  )

  return (
    <Fragment>
      <div className="panel" >

        <header className="panel-hdr" >
          <h2 >
            Lista de Faturas Lançadas
          </h2>
        </header>

        <div className="card">
          <DataTable
            title="Vendas por Loja"
            value={dadosFaturaDetalhe}
            size="small"
            footerColumnGroup={footerGroup}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dadosFaturaDetalhe.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunaFaturaLoja.map(coluna => (
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
    </Fragment>
  )
}