import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { formatMoeda } from "../../../utils/formatMoeda";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";

export const ActionListaVendasConvenioDesconto = ({ dadosVendasConvenioDesconto }) => {

  const dadosConvenioVendasDesconto = dadosVendasConvenioDesconto.map((item, index) => {
    let contador = index + 1;
    let vrTotalFaturaLoja = 0;
    vrTotalFaturaLoja + item.TOTALVENDAPROD;

    return {
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: item.DSCAIXA,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOCONVENIADO: item.NOCONVENIADO,
      CPFCONVENIADO: item.CPFCONVENIADO,

      VRBRUTOPAGO: item.VRBRUTOPAGO,
      VRDESPAGO: item.VRDESPAGO,
      VRLIQPAGO: item.VRLIQPAGO,
      contador,
      vrTotalFaturaLoja
    };
  });

  const calcularTotalVrBruto = () => {
    let total = 0;
    for (let dados of dadosConvenioVendasDesconto) {
      total += parseFloat(dados.VRBRUTOPAGO);
    }
    return total;
  }

  const calcularTotalVrDesconto = () => {
    let total = 0;
    for (let dados of dadosConvenioVendasDesconto) {
      total += parseFloat(dados.VRDESPAGO);
    }
    return total;
  }

  const calcularTotalVrLiq = () => {
    let total = 0;
    for (let dados of dadosConvenioVendasDesconto) {
      total += parseFloat(dados.VRLIQPAGO);
    }
    return total;
  }

  const colunaVendasConvenioDesconto = [
    {
      header: 'Nº',
      body: row => <th> {row.contador}</th>,
      sortable: true,
      width: "5%"
    },
    {
      header: 'Caixa ',
      body: row => <th> {row.IDCAIXAWEB}</th>,
      sortable: true,
    },
    {
      header: 'Nº Venda ',
      body: row => <th> {parseFloat(row.IDVENDA)}</th>,
      sortable: true,
    },
    {
      header: 'NFCe ',
      body: row => <th> {row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,
    },
    {
      header: 'Abertura',
      body: row => <th> {row.DTHORAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      header: 'Operador',
      body: row => <th> {row.NOFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      header: 'Conveniado',
      body: row => <th> {row.NOCONVENIADO}</th>,
      sortable: true,
    },
    {
      header: 'Convênio',
      body: row => <th> {row.CPFCONVENIADO}</th>,
      sortable: true,
    },
    {
      header: 'Valor Bruto',
      body: row => <th> {formatMoeda(row.VRBRUTOPAGO)}</th>,
      sortable: true,
    },
    {
      header: 'Desconto',
      body: row => <th> {formatMoeda(row.VRDESPAGO)}</th>,
      sortable: true,
    },
    {
      header: 'Valor Liq',
      body: row => <th> {formatMoeda(row.VRLIQPAGO)}</th>,
      sortable: true,
    },
    {
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
        <Column footer="Total Vendas Convenio " colSpan={8} footerStyle={{ textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVrBruto())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVrDesconto())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVrLiq())} colSpan={2} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>


    </ColumnGroup>
  )

  return (
    <Fragment>
      <div className="panel" >

        <header className="panel-hdr" >
          <h2>
            Lista de Vendas Convênio Desconto em Folha
          </h2>
        </header>

        <div className="card">
          <DataTable
            title="Vendas por Loja"
            value={dadosConvenioVendasDesconto}
            size="small"
            footerColumnGroup={footerGroup}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dadosConvenioVendasDesconto.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunaVendasConvenioDesconto.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}
                body={coluna.body}
                // footer={coluna.footer}
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