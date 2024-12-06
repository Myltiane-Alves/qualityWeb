import { Fragment, useState } from "react"
import { dataFormatada } from "../../../utils/dataFormatada";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';

import { formatMoeda } from "../../../utils/formatMoeda";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export const ActionListaVendasPCJ = ({ dadosVendasPCJ }) => {

  const calcularTotalVendido = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCARTAO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPOS) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCONVENIO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPIX) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOMOOVPAY)

    );
  }
  const calcularTotalVrDisponivel = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO) +
      toFloat(item.fatura[0]['fatura-movimento'].TOTALRECEBIDOFATURA)
    )
  }

  const calcularTotalPCJTotal = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value)

    const vrPCJ18 = toFloat(item.vendapcj[0]['venda-pcj'].TOTALPCJ18);
    const vrPCJ78 = toFloat(item.vendapcj[0]['venda-pcj'].TOTALPCJ78);

    const totalPCJ = vrPCJ18 !== 0 ? (vrPCJ78 / vrPCJ18) * 100 : 0;

    return totalPCJ;

  }
  const dadosMovLojaDia = dadosVendasPCJ.map((item, index) => {
    let totalVendido = calcularTotalVendido(item);
    let vrDisponivel = calcularTotalVrDisponivel(item);
    let pcjTotal = calcularTotalPCJTotal(item)
    let contador = index + 1;
    return {
      IDCAIXAWEB: item.caixa.IDCAIXAWEB,
      ID: item.caixa.ID,
      DSCAIXA: item.caixa.DSCAIXA,
      DTABERTURA: item.caixa.DTABERTURA,
      NOFUNCIONARIO: item.caixa.NOFUNCIONARIO,
      NUCPF: item.caixa.NUCPF,
      STFECHADO: item.caixa.STFECHADO,
      VRRECDINHEIRO: item.caixa.VRRECDINHEIRO,


      TOTALRECEBIDOFATURA: item.fatura[0]['fatura-movimento'].TOTALRECEBIDOFATURA,
      TOTALRECEBIDOFATURAPIX: item.faturapix[0]['fatura-movimento-pix'].TOTALRECEBIDOFATURAPIX,

      TOTALVENDIDODINHEIRO: parseFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO),
      TOTALVENDIDOCARTAO: parseFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCARTAO),
      TOTALVENDIDOPOS: parseFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPOS),
      TOTALVENDIDOPIX: parseFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPIX),
      TOTALVENDIDOMOOVPAY: parseFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOMOOVPAY),
      TOTALVENDIDOVOUCHER: item.venda[0]['venda-movimento'].TOTALVENDIDOVOUCHER,
      TOTALVENDIDOCONVENIO: parseFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCONVENIO),
      TOTALVENDIDO: item.venda[0]['venda-movimento'].TOTALVENDIDO,
      TOTALNOTA: item.venda[0]['venda-movimento'].TOTALNOTA,

      TOTALPCJ18: item.vendapcj[0]['venda-pcj'].TOTALPCJ18,
      TOTALPCJ78: item.vendapcj[0]['venda-pcj'].TOTALPCJ78,

      totalVendido: totalVendido,
      vrDisponivel: vrDisponivel,
      pcjTotal: pcjTotal

    };
  });

  const calcularTotalPCJ18 = () => {
    let total = 0;
    for (let dados of dadosMovLojaDia) {
      total += parseFloat(dados.TOTALPCJ18);

    }
    return total;
  }

  const calcularTotalPCJ78 = () => {
    let total = 0;
    for (let dados of dadosMovLojaDia) {
      total += parseFloat(dados.TOTALPCJ78);

    }
    return total;
  }

  const calcularValorTotalPCJTotal = () => {
    let total = 0;
    for (let dados of dadosMovLojaDia) {
      total += parseFloat(dados.pcjTotal);

    }
    return total;
  }

  const colunaVendasPCJ = [
    {
      field: 'ID',
      header: 'Nº Movimento',
      body: row => <th> {row.ID}</th>,
      sortable: true,

    },
    {
      field: 'IDCAIXAWEB',
      header: 'Caixa',
      body: row => <th> {`${row.IDCAIXAWEB} - ${row.DSCAIXA}`}</th>,
      sortable: true,
    },
    {
      field: 'DTABERTURA',
      header: 'Abertura',
      body: row => <th> {row.DTABERTURA}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <th> {row.NOFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      field: 'NUCPF',
      header: 'CPF',
      body: row => <th> {row.NUCPF}</th>,
      footer: 'Total dos Caixas',
      sortable: true,
    },
    {
      field: 'TOTALPCJ18',
      header: 'Total CredS 1-8',
      body: row => <th> {formatMoeda(row.TOTALPCJ18)}</th>,
      footer: formatMoeda(calcularTotalPCJ18()),
      sortable: true,
    },
    {
      field: 'TOTALPCJ78',
      header: 'Total CredS 7-8',
      body: row => <th> {formatMoeda(row.TOTALPCJ78)}</th>,
      footer: formatMoeda(calcularTotalPCJ78()),
      sortable: true,
    },
    {
      field: 'pcjTotal',
      header: '% PCJ',

      body: row => (
        <th style={{ color: row.pcjTotal === 0 ? 'red' : 'blue' }}>
          {formatMoeda(row.pcjTotal)}
        </th>
      ),
      footer: formatMoeda(calcularValorTotalPCJTotal()),
      sortable: true,
    },

  ]

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer="Total dos Caixas " colSpan={5} footerStyle={{ textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalPCJ18())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalPCJ78())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularValorTotalPCJTotal())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />


      </Row>
    </ColumnGroup>
  )

  return (
    <Fragment>
      <div className="panel" >


        <header className="panel-hdr " >
          <h2 id="TituloLoja" >
            Lista de Vendas PCJ
          </h2>
        </header>

        <div className="card">
          <DataTable
            title="Vendas por Loja"
            value={dadosMovLojaDia}
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
            {colunaVendasPCJ.map(coluna => (
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