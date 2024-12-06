import { Fragment, useRef, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import HeaderTable from "../../../Tables/headerTable";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useReactToPrint } from "react-to-print";
import { toFloat } from "../../../../utils/toFloat";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";

export const ActionPreviaBalancoModal = ({ show, handleClose, dadosPreviaBalancoModal }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Prévia Balanço',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Produto', 'Cód Barras', 'Descrição', 'Estoque', 'Balanço', 'Sobra', 'Falta', 'R$ Venda', 'R$ Total']],
      body: dados.map(item => [
        item.IDPRODUTO,
        item.NUCODBARRAS,
        item.DSNOME,
        item.QTDFINAL,
        item.QTD,
        item.QTDSOBRA,
        item.QTDFALTA,
        formatMoeda(item.PRECOVENDA),
        formatMoeda(item.TOTALVENDA)
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('previa_balanco.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header =  ['Produto', 'Cód Barras', 'Descrição', 'Estoque', 'Balanço', 'Sobra', 'Falta', 'R$ Venda', 'R$ Total'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Produto' },
      { wpx: 200, caption: 'Cód Barras' },
      { wpx: 300, caption: 'Descrição' },
      { wpx: 100, caption: 'Estoque' },
      { wpx: 100, caption: 'Balanço' },
      { wpx: 100, caption: 'Sobra' },
      { wpx: 100, caption: 'Falta' },
      { wpx: 100, caption: 'R$ Venda' },
      { wpx: 100, caption: 'R$ Total' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prévia Balanço');
    XLSX.writeFile(workbook, 'previa_balanco.xlsx');
  };

  const dados = dadosPreviaBalancoModal.map((item, index) => {

    return {
      IDPRODUTO: item.IDPRODUTO,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      QTDFINAL: item.QTDFINAL,
      QTD: item.QTD,
      QTDSOBRA: item.QTDSOBRA,
      QTDFALTA: item.QTDFALTA,
      PRECOVENDA: item.PRECOVENDA,
      TOTALVENDA: item.TOTALVENDA,
    }
  })

  const calcularTotalQtdFinal  = () => {
    return dados.reduce((total, dados) => total + toFloat(dados.QTDFINAL), 0);
  }
 
  const calcularTotalQtd = () => {
    return dados.reduce((total, dados) => total + toFloat(dados.QTD), 0);
  }
 
  const calcularTotalQtdSobra = () => {
    return dados.reduce((total, dados) => total + toFloat(dados.QTDSOBRA), 0);
  }
  
  const calcularTotalQtdFalta = () => {
    return dados.reduce((total, dados) => total + toFloat(dados.QTDFALTA), 0);
  }

  const calcularTotalPrecoVenda = () => {
    return dados.reduce((total, dados) => total + toFloat(dados.PRECOVENDA), 0);
  }

  const calcularTotalVenda = () => {
    return dados.reduce((total, dados) => total + toFloat(dados.TOTALVENDA), 0);
  }


  const colunasColetor = [
    {
      field: 'IDPRODUTO',
      header: 'Produto',
      body: row => <th>{row.IDPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Código de Barras',	
      body: row => <th>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Descrição',
      body: row => <th>{row.DSNOME}</th>,
      sortable: true,
    },
    {
      field: 'QTDFINAL',
      header: 'Estoque',
      body: row => <th>{row.QTDFINAL}</th>,
      footer: calcularTotalQtdFinal(),
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Balanço',
      body: row => <th>{row.QTD}</th>,
      footer: calcularTotalQtd(),
      sortable: true,
    },
    {
      field: 'QTDSOBRA',
      header: 'Sobra',
      body: row => <th>{row.QTDSOBRA}</th>,
      footer: calcularTotalQtdSobra(),
      sortable: true,
    },
    {
      field: 'QTDFALTA',
      header: 'Falta',
      body: row => <th>{row.QTDFALTA}</th>,
      footer: calcularTotalQtdFalta(),
      sortable: true,
    },
    {
      field: 'PRECOVENDA',
      header: 'R$ Venda',
      body: row => <th>{formatMoeda(row.PRECOVENDA)}</th>,
      footer: formatMoeda(calcularTotalPrecoVenda()),
      sortable: true,
    },
    {
      field: 'TOTALVENDA',
      header: 'R$ Total',
      body: row => <th>{formatMoeda(row.TOTALVENDA)}</th>,
      footer: formatMoeda(calcularTotalVenda()),
      sortable: true,
    },
  ]

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal fade"
        id="CadadiantamentoSalario"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >



        <HeaderModal
          title={"Prévia do Balanço"}
          subTitle={"Relação dos Produtos"}
          handleClose={handleClose}
        />
        <Modal.Body>
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
              size={size}
              globalFilter={globalFilterValue}
              sortOrder={-1}
              paginator={true}
              rows={10}
              rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
              showGridlines
              stripedRows
              emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
            >
              {colunasColetor.map(coluna => (
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

          <FooterModal 
            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}
          />
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}