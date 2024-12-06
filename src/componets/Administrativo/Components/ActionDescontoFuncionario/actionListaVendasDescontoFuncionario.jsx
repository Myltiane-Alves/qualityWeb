import React, { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";
import { MdOutlineAttachMoney } from "react-icons/md";
import { ActionRelacaoRecebimentosModal } from "../ActionsModaisVendas/actionRelacaoRecebimentosModal";
import { get } from "../../../../api/funcRequest";

export const ActionListaVendasDescontoFuncionario = ({dadosVendasConvenio}) => {
  const [modalPagamentoVisivel, setModalPagamentoVisivel] = useState(false);
  const [dadosPagamentoModal, setDadosPagamentoModal] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vendas Desconto Funcionario',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Caixa', 'Nº Venda', 'NFCe', 'Abertura', 'Operador', 'Conveniado', 'CPF', 'Valor Bruto', 'Valor Liquido', 'Obs']],
      body: dados.map(item => [
        item.contador,
        item.DSCAIXA,
        item.IDVENDA,
        item.NFE_INFNFE_IDE_NNF,
        item.DTHORAFECHAMENTO,
        item.NOFUNCIONARIO,
        item.NOCONVENIADO,
        item.CPFCONVENIADO,
        formatMoeda(toFloat(item.VRBRUTOPAGO)),
        formatMoeda(toFloat(item.VRLIQPAGO)),
        item.TXTMOTIVODESCONTO

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas_desconto_funcionario.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Caixa', 'Nº Venda', 'NFCe', 'Abertura', 'Operador', 'Conveniado', 'CPF', 'Valor Bruto', 'Valor Liquido', 'Obs'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' }, 
      { wpx: 150, caption: 'Caixa' },
      { wpx: 150, caption: 'Nº Venda' },
      { wpx: 150, caption: 'NFCe' },
      { wpx: 150, caption: 'Abertura' },
      { wpx: 150, caption: 'Operador' },
      { wpx: 150, caption: 'Conveniado' },
      { wpx: 150, caption: 'CPF' },
      { wpx: 150, caption: 'Valor Bruto' },
      { wpx: 150, caption: 'Valor Liquido' },
      { wpx: 250, caption: 'Obs' }
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas Desconto');
    XLSX.writeFile(workbook, 'vendas_desconto_funcionario.xlsx');
  };

  const dados = dadosVendasConvenio.map((item, index) => {
    let contador = index + 1;
    let NVENDA;
    return {
      contador,
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: item.DSCAIXA,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOCONVENIADO: item.NOCONVENIADO,
      CPFCONVENIADO: item.CPFCONVENIADO,
      TXTMOTIVODESCONTO: item.TXTMOTIVODESCONTO,
      VRBRUTOPAGO: item.VRBRUTOPAGO,
      VRDESPAGO: item.VRDESPAGO,
      VRLIQPAGO: item.VRLIQPAGO,
    }
  });

  const colunasVendas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'IDCAIXAWEB',
      header: 'Caixa',
      body: row => <th>{row.IDCAIXAWEB} - {row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => <th>{row.IDVENDA}</th>,
      sortable: true,
    },
    {
      field: 'NFE_INFNFE_IDE_NNF',
      header: 'NFCe',
      body: row => <th>{row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Abertura',
      body: row => <th>{row.DTHORAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <th>{row.NOFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      field: 'NOCONVENIADO',
      header: 'Conveniado',
      body: row => <th>{row.NOCONVENIADO}</th>,
      sortable: true,
    },
    {
      field: 'CPFCONVENIADO',
      header: 'CPF',
      body: row => <th>{row.CPFCONVENIADO}</th>,
      sortable: true,
    },
    {
      field: 'VRBRUTOPAGO',
      header: 'Valor Bruto',
      body: row => <th>{formatMoeda(toFloat(row.VRBRUTOPAGO))}</th>,
      sortable: true,
    },
    {
      field: 'VRDESPAGO',
      header: 'Desconto',
      body: row => <th>{formatMoeda(toFloat(row.VRDESPAGO))}</th>,
      sortable: true,
    },
    {
      field: 'VRLIQPAGO',
      header: 'Valor Liquido',
      body: row => <th>{formatMoeda(toFloat(row.VRLIQPAGO))}</th>,
      sortable: true,
    },
    {
      field: 'TXTMOTIVODESCONTO',
      header: 'Obs',
      body: row => <th>{row.TXTMOTIVODESCONTO}</th>,
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
              titleButton={"Detalhar Recebimentos"}
              onClickButton={() => handleClickPagamento(row)}
              Icon={MdOutlineAttachMoney}
              iconSize={20}
              cor={"success"}
            />
          </div>
        </div>
      ),
    },
  ]

  const handleEditPagamento = async (IDVENDA) => {
    try {
      const response = await get(`/recebimento?idVenda=${IDVENDA}`)    
      setDadosPagamentoModal(response.data)
      setModalPagamentoVisivel(true)
    
      return response.data;
    } catch (error) {
      console.log(error, 'não foi possivel pegar os dados da tabela')
    }
  }

  const handleClickPagamento = (row) => {
    if (row && row.IDVENDA) {
      console.log(row.IDVENDA, 'idvenda')
      handleEditPagamento(row.IDVENDA)
    }
  }


  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista Vendas por Desconto e Período</h2>
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
            value={dados}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendas.map(coluna => (
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

      <ActionRelacaoRecebimentosModal
        show={modalPagamentoVisivel}
        handleClose={() => setModalPagamentoVisivel(false)}
        dadosPagamentoModal={dadosPagamentoModal}
      />
    </Fragment>
  )
}
