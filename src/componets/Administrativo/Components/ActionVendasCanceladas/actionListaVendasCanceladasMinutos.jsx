import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { formatMoeda } from "../../../../utils/formatMoeda";

import { ActionDetalheVendaProdutosModal } from "../ActionsModaisVendas/actionDetalheVendaProdutosModal";
import { ActionRelacaoRecebimentosModal } from "../ActionsModaisVendas/ActionRecebimentos/actionRelacaoRecebimentosModal";
import { get } from "../../../../api/funcRequest";
import { MdOutlineAttachMoney } from "react-icons/md";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { FaProductHunt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import { ActionDetalheVendaModal } from "../ActionsModaisVendas/actionDetalheVendaModal";


export const ActionListaVendasCanceladasMinutos = ({ dadosVendasCanceladasMinutos }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalVendaVisivel, setModalVendaVisivel] = useState(false);
  const [modalProdutoVisivel, setModalProdutoVisivel] = useState(false);
  const [modalPagamentoVisivel, setModalPagamentoVisivel] = useState(false);
  const [dadosVendas, setDadosVendas] = useState([]);
  const [dadosProdutoModal, setDadosProdutoModal] = useState([]);
  const [dadosPagamentoModal, setDadosPagamentoModal] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vendas Canceladas 30 Minutos',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Empresa', 'Caixa', 'Nº Venda', 'NFE/NFCe', 'Abertura', 'Operador', 'Vr.Dinheiro', 'Vr.Cartão', 'Vr.Convênio', 'Vr.POS', 'Vr.Voucher', 'Vr.Venda', 'ST Nota', 'Cancelado Por', 'Função', 'Motivo']],
      body: dadosListaVendasCanceladasMinutos.map(item => [
        item.contador,
        item.NOFANTASIA,
        item.DSCAIXA,
        item.IDVENDA,
        item.NFE_INFNFE_IDE_NNF,
        item.DTHORAFECHAMENTO,
        item.NOFUNCIONARIO,
        formatMoeda(item.VRRECDINHEIRO),
        formatMoeda(item.VRRECCARTAO),
        formatMoeda(item.VRRECCONVENIO),
        formatMoeda(item.VRRECPOS),
        formatMoeda(item.VRRECVOUCHER),
        formatMoeda(item.VRTOTALVENDA),
        item.STCONTINGENCIA,
        item.NOFUNCIOCANCEL,
        item.NOFUNCAOCANCEL,
        item.TXTMOTIVOCANCELAMENTO,

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_canceladas_minutos.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosListaVendasCanceladasMinutos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas Canceladas 30 Minutos');
    XLSX.writeFile(workbook, 'vendas_canceladas_minutos.xlsx');
  };



  const calcularTotalValorDinheiro = () => {
    let total = 0;
    for (let dados of dadosVendasCanceladasMinutos) {
      total += parseFloat(dados.VRRECDINHEIRO)
    }
    return total;
  }

  const calcularTotalValorCartao = () => {
    let total = 0;
    for (let dados of dadosVendasCanceladasMinutos) {
      total += parseFloat(dados.VRRECCARTAO)
    }
    return total;
  }

  const calcularTotalValorConvenio = () => {
    let total = 0;
    for (let dados of dadosVendasCanceladasMinutos) {
      total += parseFloat(dados.VRRECCONVENIO)
    }
    return total;
  }

  const calcularTotalValorPos = () => {
    let total = 0;
    for (let dados of dadosVendasCanceladasMinutos) {
      total += parseFloat(dados.VRRECPOS)
    }
    return total;
  }

  const calcularTotalValorVoucher = () => {
    let total = 0;
    for (let dados of dadosVendasCanceladasMinutos) {
      total += parseFloat(dados.VRRECVOUCHER)
    }
    return total;
  }

  const calcularTotalValorVenda = () => {
    let total = 0;
    for (let dados of dadosVendasCanceladasMinutos) {
      total += parseFloat(dados.VRTOTALVENDA)
    }
    return total;
  }

  const dadosListaVendasCanceladasMinutos = dadosVendasCanceladasMinutos.map((item, index) => {
    let contador = index + 1;

    return {
      NOFANTASIA: item.NOFANTASIA,
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: item.DSCAIXA,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOFUNCIOCANCEL: item.NOFUNCIOCANCEL,
      NOFUNCAOCANCEL: item.NOFUNCAOCANCEL,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO,

      VRRECDINHEIRO: item.VRRECDINHEIRO,
      VRRECCARTAO: item.VRRECCARTAO,
      VRRECCONVENIO: item.VRRECCONVENIO,
      VRRECPOS: item.VRRECPOS,
      VRRECVOUCHER: item.VRRECVOUCHER,
      VRTOTALPAGO: item.VRTOTALPAGO,
      VRTOTALVENDA: item.VRTOTALVENDA,
      STCONTINGENCIA: item.STCONTINGENCIA,

      contador
    }
  });

  const colunasVendasCanceladasMinutos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{}}> {row.contador}</th>,
      sortable: true,
      width: '3%',
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => <p style={{fontWeight: 600, width: '200px', margin: '0px'}}> {row.NOFANTASIA}</p>,
      sortable: true,
    },
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: row => <th style={{}}> {row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => <p style={{fontWeight: 600, width: '100px',margin: '0px'}}> {row.IDVENDA}</p>,
      sortable: true,

    },
    {
      field: 'NFE_INFNFE_IDE_NNF',
      header: 'NFE/NFCe',
      body: row => <th style={{}}> {row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,

    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Abertura',
      body: row => <p style={{ fontWeight: 600, width: '150px',margin: '0px'}}> {row.DTHORAFECHAMENTO}</p>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <p style={{ fontWeight: 600, width: '200px', margin: '0px'}}> {row.NOFUNCIONARIO}</p>,
      sortable: true,
    },
    {
      field: 'VRRECDINHEIRO',
      header: 'Vr.Dinheiro',
      body: row => <th style={{}}> {formatMoeda(row.VRRECDINHEIRO)}</th>,
      footer: () => {
        return (
          <th> Total Dinheiro: {formatMoeda(calcularTotalValorDinheiro())} </th>
        )
      },
      sortable: true,
    },
    {
      field: 'VRRECCARTAO',
      header: 'Vr.Cartão',
      body: row => <th style={{}}> {formatMoeda(row.VRRECCARTAO)}</th>,
      footer: () => {
        return (
          <th> Total Cartão: {formatMoeda(calcularTotalValorCartao())} </th>
        )
      },
      sortable: true,
    },
    {
      field: 'VRRECCONVENIO',
      header: 'Vr.Convênio',
      body: row => <th style={{}}> {formatMoeda(row.VRRECCONVENIO)}</th>,
      footer: () => {
        return (
          <th> Total Convênio: {formatMoeda(calcularTotalValorConvenio())} </th>
        )
      },
      sortable: true,
    },
    {
      field: 'VRRECPOS',
      header: 'Vr.POS',
      body: row => <th style={{}}> {formatMoeda(row.VRRECPOS)}</th>,
      footer: () => {
        return (
          <th> Total POS: {formatMoeda(calcularTotalValorPos())} </th>
        )
      },
      sortable: true,
    },
    {
      field: 'VRRECVOUCHER',
      header: 'Vr.Voucher',
      body: row => <th style={{}}> {formatMoeda(row.VRRECVOUCHER)}</th>,
      footer: () => {
        return (
          <th> Total Voucher: {formatMoeda(calcularTotalValorVoucher())} </th>
        )
      },
      sortable: true,
    },
    {
      field: 'VRTOTALVENDA',
      header: 'Vr.Venda',
      body: row => <th style={{ }}> {formatMoeda(row.VRTOTALVENDA)}</th>,
      footer: () => {
        return (
          <th> Total Pago: {formatMoeda(calcularTotalValorVenda())} </th>
        )
      },
      sortable: true,
    },
    {
      field: 'STCONTINGENCIA',
      header: 'ST Nota',
      body: (row) => {
        if (row.STCONTINGENCIA == 'False' && row.VRTOTALVENDA > 0) {
          return (
            <th style={{ color: 'blue' }}> {row.STCONTINGENCIA = 'Contigência'}</th>
          )
        } if (row.STCONTINGENCIA = row.VRTOTALVENDA > 0) {
          return (
            <th style={{ color: 'blue' }}> {row.STCONTINGENCIA ? 'Emitida' : 'Não Emitida'}</th>
          )
        }
      },
      sortable: true,

    },
    {
      field: 'NOFUNCIOCANCEL',
      header: 'Cancelado Por',
      body: row => <p style={{  fontWeight: 600, width: '200px', margin: '0px'}}> {row.NOFUNCIOCANCEL}</p>,
      sortable: true,
    },
    {
      field: 'NOFUNCAOCANCEL',
      header: 'Função',
      body: row => <th style={{  }}> {row.NOFUNCAOCANCEL}</th>,
      sortable: true,
    },
    {
      field: 'TXTMOTIVOCANCELAMENTO',
      header: 'Motivo',
      body: row => <p style={{width: '300px', fontWeight: 600, margin: '0px'}}> {row.TXTMOTIVOCANCELAMENTO}</p>,
      sortable: true,

    },
    {
      field: 'IDVENDA',
      header: 'Opções',
      // width: '250px',
      body: (row) => (
        <div className="p-1 "
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Venda"}
              onClickButton={() => handleClickVenda(row)}
              Icon={GrView}
              cor={"info"}
              width="30px"
              height="30px"
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Produtos"}
              onClickButton={() => handleClickProduto(row)}
              Icon={FaProductHunt}
              cor={"warning"}
              width="30px"
              height="30px"
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Recebimentos"}
              onClickButton={() => handleClickPagamento(row)}
              Icon={MdOutlineAttachMoney}
              cor={"success"}
              width="30px"
              height="30px"
            />
          </div>
        </div>
      ),
    },

  ]

  const handleEditProduto = async (IDVENDA) => {
    try {
      const response = await get(`/detalhe-venda?idEmpresa=0&idVenda=${IDVENDA}`)
      if (response.data) {
        setDadosProdutoModal(response.data)
        setModalProdutoVisivel(true)

      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickProduto = async (row) => {
    if (row.IDVENDA) {
      handleEditProduto(row.IDVENDA)
    }
  }


  const handleClickVenda = async (row) => {
    if (row && row.IDVENDA) {
      handleEditVenda(row.IDVENDA)
    }
  }

  const handleEditVenda = async (IDVENDA) => {

    try {
      const response = await get(`/resumo-venda-caixa-detalhado?idEmpresa=0&idVenda=${IDVENDA}`)
      if (response.data) {
        setDadosVendas(response.data)
        setModalVendaVisivel(true)
      }

      return response.data;
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }

  }

  const handleEditPagamento = async (IDVENDA) => {
    try {
      const response = await get(`/recebimento?idVenda=${IDVENDA}`)
      if (response.data) {
        setDadosPagamentoModal(response.data)
        setModalPagamentoVisivel(true)
      }
    } catch (error) {
      console.log(error, 'não foi possivel pegar os dados da tabela')
    }
  }
  const handleClickPagamento = (row) => {
    if (row.IDVENDA) {
      handleEditPagamento(row.IDVENDA)
    }
  }

  const handleCloseModal = () => {
    setModalVisivel(false)
    setModalProdutoVisivel(false)
    setModalVendaVisivel(false)
    setModalPagamentoVisivel(false)
  }

  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Vendas Canceladas 30 Minutos</h2>
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
            title="Vendas por Loja"
            value={dadosListaVendasCanceladasMinutos}
            globalFilter={globalFilterValue}
            rowsPerPageOptions={[5, 10, 20, 50, 100, dadosListaVendasCanceladasMinutos.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
            sortField="VRTOTALPAGO"
            sortOrder={-1}
            paginator={true}
            rows={10}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendasCanceladasMinutos.map(coluna => (
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

      <ActionDetalheVendaModal
        show={modalVendaVisivel}
        handleClose={handleCloseModal}
        dadosVendas={dadosVendas}
      />

      <ActionDetalheVendaProdutosModal
        show={modalProdutoVisivel}
        handleClose={handleCloseModal}
        dadosProdutoModal={dadosProdutoModal}
      />

      <ActionRelacaoRecebimentosModal
        show={modalPagamentoVisivel}
        handleClose={handleCloseModal}
        dadosPagamentoModal={dadosPagamentoModal}
      />
    </Fragment>
  )
}

