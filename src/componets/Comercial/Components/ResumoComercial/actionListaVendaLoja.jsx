import React, { Fragment, useState, useRef } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { GrCertificate, GrView } from "react-icons/gr";
import { get } from "../../../../api/funcRequest";
import { ActionDetalheFechamentoLojaModal } from "./actionDetalheFechamentoLojaModal";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";

export const ActionListaVendasLoja = ({ dadosVendasPagamentos, dataPesquisa }) => {
  const [dadosDetalheFechamento, setDadosDetalheFechamento] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Vendas Por Loja',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Data', 'Loja', 'Dinheiro', 'Cartão', 'POS', 'PIX', 'Convênio', 'Voucher', 'Fatura', 'Fat PIX', 'Despesa', 'Total Recebido', 'Disponível']],
      body: dados.map(item => [
        item.DTHORAFECHAMENTO,
        item.NOFANTASIA,
        formatMoeda(item.VALORTOTALDINHEIRO),
        formatMoeda(item.VALORTOTALCARTAO),
        formatMoeda(item.VALORTOTALPOS),
        formatMoeda(item.VALORTOTALPIX),
        formatMoeda(item.VALORTOTALCONVENIO),
        formatMoeda(item.VALORTOTALVOUCHER),
        formatMoeda(item.VALORTOTALFATURA),
        formatMoeda(item.VALORTOTALFATURAPIX),
        formatMoeda(item.valorDespesaTotal),
        formatMoeda(item.valorTotalVendido),
        formatMoeda(item.valorDisponivel)
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_por_loja.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Data', 'Loja', 'Dinheiro', 'Cartão', 'POS', 'PIX', 'Convênio', 'Voucher', 'Fatura', 'Fat PIX', 'Despesa', 'Total Recebido', 'Disponível'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Data' },
      { wpx: 200, caption: 'Loja' },
      { wpx: 100, caption: 'Dinheiro' },
      { wpx: 100, caption: 'Cartão' },
      { wpx: 100, caption: 'POS' },
      { wpx: 100, caption: 'PIX' },
      { wpx: 100, caption: 'Convênio' },
      { wpx: 100, caption: 'Voucher' },
      { wpx: 100, caption: 'Fatura' },
      { wpx: 100, caption: 'Fat PIX' },
      { wpx: 100, caption: 'Despesa' },
      { wpx: 100, caption: 'Total Recebido' },
      { wpx: 100, caption: 'Disponível' }

    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Vendas Por Loja');
    XLSX.writeFile(workbook, 'vendas_por_loja.xlsx');
  };

  const calcularTotalRealizado = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.VALORTOTALDINHEIRO) +
      toFloat(item.VALORTOTALCARTAO) +
      toFloat(item.VALORTOTALCONVENIO) +
      toFloat(item.VALORTOTALPOS) +
      toFloat(item.VALORTOTALFATURA) +
      toFloat(item.VALORTOTALDESPESA)
    );
  }
  const calcularTotalDespesasAdiantamento = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (

      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    );
  }

  const calcularDespesasAdiantamento = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    );
  }

  const calcularTotalDisponivel = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.VALORTOTALDINHEIRO) +
      toFloat(item.VALORTOTALFATURA) -
      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    )
  }

  const calcularTotalDinheiroColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALDINHEIRO);
    }
    return total;
  }
  const calcularTotalCartaoColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALCARTAO);
    }
    return total;
  }
  const calcularTotalPosColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALPOS);
    }
    return total;
  }
  const calcularTotalFaturaColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALFATURA);
    }
    return total;
  }
  const calcularTotalDespesaColuna = () => {
    let total = 0;
    for (let venda of dados) {
      total += parseFloat(venda.totalDespesasAdiantamento) ? parseFloat(venda.totalDespesasAdiantamento) : 0;
    }
    return total;
  }
  const calcularTotalDisponivelColuna = () => {
    let total = 0;
    for (let venda of dados) {
      total += parseFloat(venda.totalDisponivel);
    }
    return total;
  }

  const dados = dadosVendasPagamentos.map((item, index) => {
    let contador = index + 1;
    const totalDespesasAdiantamento = calcularDespesasAdiantamento(item);
    const totalDisponivel = calcularTotalDisponivel(item);

    return {

      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      VALORTOTALDINHEIRO: item.VALORTOTALDINHEIRO,
      VALORTOTALCARTAO: item.VALORTOTALCARTAO,
      VALORTOTALPOS: item.VALORTOTALPOS,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      VALORTOTALDESPESA: parseFloat(item.VALORTOTALDESPESA),
      VALORTOTALADIANTAMENTOSALARIAL: item.VALORTOTALADIANTAMENTOSALARIAL,
      totalDespesasAdiantamento: formatMoeda(totalDespesasAdiantamento),
      totalDisponivel: totalDisponivel,
      dataPesquisa,
      contador
    }
  });

  const colunasVendasPagamento = [
    {
      field: 'dataPesquisa',
      header: 'Data',
      body: (row) => <th >{row.dataPesquisa}</th>,
      sortable: true
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: (row) => <th >{row.NOFANTASIA}</th>,
      sortable: true,
      'footer': 'Total'
    },
    {
      field: 'VALORTOTALDINHEIRO',
      header: 'Dinheiro',
      body: (row) => <th >{formatMoeda(row.VALORTOTALDINHEIRO)}</th>,
      sortable: true,
      footer: formatMoeda(calcularTotalDinheiroColuna())
    },
    {
      field: 'VALORTOTALCARTAO',
      header: 'Cartão',
      body: (row) => <th >{formatMoeda(row.VALORTOTALCARTAO)}</th>,
      sortable: true,
      footer: formatMoeda(calcularTotalCartaoColuna())
    },
    {
      field: 'VALORTOTALPOS',
      header: 'POS',
      body: (row) => <th >{formatMoeda(row.VALORTOTALPOS)}</th>,
      sortable: true,
      footer: formatMoeda(calcularTotalPosColuna())
    },
    {
      field: 'VALORTOTALFATURA',
      header: 'Fatura',
      body: (row) => <th >{formatMoeda(row.VALORTOTALFATURA)}</th>,
      sortable: true,
      footer: formatMoeda(calcularTotalFaturaColuna())
    },
    {
      field: 'totalDespesasAdiantamento',
      header: 'Despesas',
      body: (row) => <th >{row.totalDespesasAdiantamento}</th>,
      sortable: true,
      footer: formatMoeda(calcularTotalDespesaColuna())
    },
    {
      field: 'totalDisponivel',
      header: 'Disponível',
      body: (row) => <th >{formatMoeda(row.totalDisponivel)}</th>,
      sortable: true,
      footer: formatMoeda(calcularTotalDisponivelColuna())
    },
    {
      field: 'DINHEIRO',
      header: 'Opções',
      body: (row) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="p-1">
              <ButtonTable
                titleButton={"Detalhar Fechamento"}
                onClickButton={() => handleClickEdit(row)}
                Icon={GrView}
                iconSize={16}
                iconColor={"#fff"}
                cor={"success"}

              />
            </div>
          </div>
        )
      },
    }
  ]

  const handleEdit = async (IDEMPRESA) => {
    try {
      const response = await get(`/detalheFechamento?idEmpresa=${IDEMPRESA}&dataPesquisa=${dataPesquisa}`);

      if (response.data) {
        setDadosDetalheFechamento(response.data);
        setModalVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEdit = (row) => {
    if (row && row.IDEMPRESA) {
      handleEdit(row.IDEMPRESA);
    }
  };

  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista de Vendas</h2>
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <HeaderTable
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            handlePrint={handlePrint}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
          />
        </div>
        <div className="card" ref={dataTableRef}>
          <DataTable
            value={dados}
            size="small"
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}


          >
            {colunasVendasPagamento.map(coluna => (

              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}
                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '1rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '1rem' }}
                bodyStyle={{ fontSize: '1rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>

      <ActionDetalheFechamentoLojaModal
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
        dadosDetalheFechamento={dadosDetalheFechamento}
      />
    </Fragment>
  )
}

