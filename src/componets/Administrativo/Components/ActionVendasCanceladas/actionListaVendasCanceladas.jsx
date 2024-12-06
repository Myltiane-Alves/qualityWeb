import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GrView } from "react-icons/gr";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { get } from "../../../../api/funcRequest";
import { dataFormatada } from "../../../../utils/dataFormatada";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { ActionDetalheVendaModal } from "../ActionVendasContigencia/actionDetalheVendaModal";
import { ActionDetalheVendaProdutosModal } from "../ActionsModaisVendas/actionDetalheVendaProdutosModal";
import { ActionRelacaoRecebimentosModal } from "../ActionsModaisVendas/actionRelacaoRecebimentosModal";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export const ActionListaVendasCanceladas = ({ dadosVendasCanceladas }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalVendaVisivel, setModalVendaVisivel] = useState(false);
  const [modalProdutoVisivel, setModalProdutoVisivel] = useState(false);
  const [modalPagamentoVisivel, setModalPagamentoVisivel] = useState(false);
  const [dadosVendas, setDadosVendas] = useState([]);
  const [dadosProdutoModal, setDadosProdutoModal] = useState([]);
  const [dadosPagamentoModal, setDadosPagamentoModal] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vendas Canceladas',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Empresa', 'Caixa', 'Nº Venda', 'NFE/NFCe', 'Abertura', 'Operador', 'Vr.Dinheiro', 'Vr.Cartão', 'Vr.Convênio', 'Vr.POS', 'Vr.Voucher', 'Vr.Venda', 'ST Nota', 'Cancelado Por', 'Função', 'Motivo']],
      body: dadosListaVendasCanceladas.map(item => [
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
        item.STCONTINGENCIA ? 'Emitida' : 'Não Emitida',
        item.NOFUNCIOCANCEL,
        item.NOFUNCAOCANCEL,
        item.TXTMOTIVOCANCELAMENTO ? 'Motivo Não Informado' : 'Motivo Não Informado',

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_canceladas.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Empresa', 'Caixa', 'Nº Venda', 'NFE/NFCe', 'Abertura', 'Operador', 'Vr.Dinheiro', 'Vr.Cartão', 'Vr.Convênio', 'Vr.POS', 'Vr.Voucher', 'Vr.Venda', 'ST Nota', 'Cancelado Por', 'Função', 'Motivo'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' },
      { wpx: 200, caption: 'Empresa' },
      { wpx: 100, caption: 'Caixa' },
      { wpx: 100, caption: 'Nº Venda' },
      { wpx: 100, caption: 'NFE/NFCe' },
      { wpx: 150, caption: 'Abertura' },
      { wpx: 200, caption: 'Operador' },
      { wpx: 100, caption: 'Vr.Dinheiro' },
      { wpx: 100, caption: 'Vr.Cartão' },
      { wpx: 100, caption: 'Vr.Convênio' },
      { wpx: 100, caption: 'Vr.POS' },
      { wpx: 100, caption: 'Vr.Voucher' },
      { wpx: 100, caption: 'Vr.Venda' },
      { wpx: 100, caption: 'ST Nota' },
      { wpx: 100, caption: 'Cancelado Por' },
      { wpx: 200, caption: 'Função' },
      { wpx: 150, caption: 'Motivo' },
      
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas Canceladas');
    XLSX.writeFile(workbook, 'vendas_canceladas.xlsx');
  };
  const calcularTotal = (field) => {
    return dadosListaVendasCanceladas.reduce((total, item) => total + parseFloat(item[field]), 0);
  };


  const calcularTotalValorDinheiro = () => {
    const total = calcularTotal('VRRECDINHEIRO');
    return total;
  }

  const calcularTotalValorCartao = () => {
    const total = calcularTotal('VRRECCARTAO');
    return total;
  }

  const calcularTotalValorConvenio = () => {
    const total = calcularTotal('VRRECCONVENIO');
    return total;
  }

  const calcularTotalValorPos = () => {
    const total = calcularTotal('VRRECPOS');
    return total;
  }

  const calcularTotalValorVoucher = () => {
    const total = calcularTotal('VRRECVOUCHER');
    return total;
  }

  const calcularTotalValorVenda = () => {
    const total = calcularTotal('VRTOTALVENDA');
    return total;
  }

  const dadosExcel = dadosVendasCanceladas.map((item, index) => {
    let contador = index + 1;

    return {
      contador,
      NOFANTASIA: item.NOFANTASIA,
      DSCAIXA: item.DSCAIXA,
      IDVENDA: item.IDVENDA,

      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      VRRECDINHEIRO: item.VRRECDINHEIRO,
      VRRECCARTAO: item.VRRECCARTAO,
      VRRECCONVENIO: item.VRRECCONVENIO,
      VRRECPOS: item.VRRECPOS,
      VRRECVOUCHER: item.VRRECVOUCHER,
      VRTOTALVENDA: item.VRTOTALVENDA,
      IDCAIXAWEB: item.IDCAIXAWEB,
      STCONTINGENCIA: item.STCONTINGENCIA ? 'Emitida' : 'Não Emitida',
      NOFUNCIOCANCEL: item.NOFUNCIOCANCEL,
      NOFUNCAOCANCEL: item.NOFUNCAOCANCEL,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO ? 'Motivo Não Informado' : 'Motivo Não Informado',


    }
  });
  const dadosListaVendasCanceladas = dadosVendasCanceladas.map((item, index) => {
    let contador = index + 1;

    return {
      contador,
      NOFANTASIA: item.NOFANTASIA,
      DSCAIXA: item.DSCAIXA,
      IDCAIXAWEB: item.IDCAIXAWEB,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      VRRECDINHEIRO: item.VRRECDINHEIRO,
      VRRECCARTAO: item.VRRECCARTAO,
      VRRECCONVENIO: item.VRRECCONVENIO,
      VRRECPOS: item.VRRECPOS,
      VRRECVOUCHER: item.VRRECVOUCHER,
      VRTOTALVENDA: item.VRTOTALVENDA,
      STCONTINGENCIA: item.STCONTINGENCIA,
      NOFUNCIOCANCEL: item.NOFUNCIOCANCEL,
      NOFUNCAOCANCEL: item.NOFUNCAOCANCEL,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO,

      VRTOTALPAGO: item.VRTOTALPAGO,

    }
  });

  const colunasVendasCanceladas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{ }}> {row.contador}</th>,
      sortable: true,
      width: '3%',
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => <p style={{  width: '120px', fontWeight: 600 }}> {row.NOFANTASIA}</p>,
      sortable: true,
    },
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: row => <th style={{ }}> {row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => <th style={{ }}> {row.IDVENDA}</th>,
      sortable: true,

    },
    {
      field: 'NFE_INFNFE_IDE_NNF',
      header: 'NFE/NFCe',
      body: row => <th style={{ }}> {row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Abertura',
      body: row => <th style={{ }}> {dataFormatada(row.DTHORAFECHAMENTO)}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <p style={{  width: '150px',fontWeight: 600 }}> {row.NOFUNCIONARIO}</p>,
      sortable: true,
    },
    {
      field: 'VRRECDINHEIRO',
      header: 'Vr.Dinheiro',
      body: row => <th style={{ }}> {formatMoeda(row.VRRECDINHEIRO)}</th>,
      sortable: true,
    },
    {
      field: 'VRRECCARTAO',
      header: 'Vr.Cartão',
      body: row => <th style={{ }}> {formatMoeda(row.VRRECCARTAO)}</th>,
      sortable: true,
    },
    {
      field: 'VRRECCONVENIO',
      header: 'Vr.Convênio',
      body: row => <th style={{ }}> {formatMoeda(row.VRRECCONVENIO)}</th>,
      sortable: true,
    },
    {
      field: 'VRRECPOS',
      header: 'Vr.POS',
      body: row => <th style={{ }}> {formatMoeda(row.VRRECPOS)}</th>,
      sortable: true,
    },
    {
      field: 'VRRECVOUCHER',
      header: 'Vr.Voucher',
      body: row => <th style={{ }}> {formatMoeda(row.VRRECVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALVENDA',
      header: 'Vr.Venda',
      body: row => <th style={{ }}> {formatMoeda(row.VRTOTALVENDA)}</th>,
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
      body: row => <th style={{ color: 'blue' }}> {row.NOFUNCIOCANCEL ? '' : ''}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCAOCANCEL',
      header: 'Função',
      body: row => <p style={{ color: 'blue' }}> {row.NOFUNCAOCANCEL}</p>,
      sortable: true,
    },
    {
      field: 'TXTMOTIVOCANCELAMENTO',
      header: 'Motivo',
      body: row => <p style={{ color: 'blue' }}> {row.TXTMOTIVOCANCELAMENTO ? 'Motivo Não Informado' : 'Motivo Não Informado'}</p>,
      sortable: true,

    },
    {
      field: 'IDVENDA',
      header: 'Opções',
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
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Produtos"}
              onClickButton={() => handleClickProduto(row)}
              Icon={FaProductHunt}
              cor={"warning"}
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Recebimentos"}
              onClickButton={() => handleClickPagamento(row)}
              Icon={MdOutlineAttachMoney}
              cor={"success"}
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
      return response.data;
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
      if (response) {
        setDadosPagamentoModal(response.data)
        setModalPagamentoVisivel(true)
        console.log(modalPagamentoVisivel, 'modalPagamentoVisivel')
      }
      return response.data;
    } catch (error) {
      console.log(error, 'não foi possivel pegar os dados da tabela')
    }
  }

  const handleClickPagamento = (row) => {
    if (row && row.IDVENDA) {
      handleEditPagamento(row.IDVENDA)
    }
  }

  const handleCloseModal = () => {
    setModalVisivel(false)
    setModalProdutoVisivel(false)
    setModalVendaVisivel(false)
    setModalPagamentoVisivel(false)
  }

  const footerGroup = (
    <ColumnGroup>

      <Row> 
        <Column footer="Total " colSpan={7} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem', textAlign: 'center' }} />
        <Column footer={formatMoeda(calcularTotalValorDinheiro())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalValorCartao())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalValorConvenio())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalValorPos())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalValorVoucher())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalValorVenda())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={""} colSpan={5}  footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
      </Row>
    </ColumnGroup>
  )

  return (

    <Fragment>

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
          value={dadosListaVendasCanceladas}
          globalFilter={globalFilterValue}
          size={size}
          footerColumnGroup={footerGroup}
          rowsPerPageOptions={[5, 10, 20, 50, 100, dadosListaVendasCanceladas.length]}
          sortOrder={-1}
          paginator={true}
          rows={10}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasVendasCanceladas.map(coluna => (
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

