import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import Swal from "sweetalert2";
import { BsTrash3 } from "react-icons/bs";
import { toFloat } from "../../../../utils/toFloat";
import { useEditarDeposito } from "./hooks/useEditarDeposito";

export const ActionListaConciliarPorBanco = ({ dadosConciliarBanco, usuarioLogado, optionsModulos,handleClick }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();
  const  {
    handleCancelar
  } = useEditarDeposito({ optionsModulos, usuarioLogado, handleClick })

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Conciliação de Depósitos',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Loja', 'Data Compensação', 'Data Depósito', 'Data Movimento', 'Banco', 'Valor', 'Doc.', 'Status', 'Situação']],
      body: dadosListaConciliarBanco.map(item => [
        item.NOFANTASIA, 
        item.DTCOMPENSACAO, 
        item.DTDEPOSITO, 
        item.DTMOVIMENTOCAIXA, 
        item.DSBANCO, 
        formatMoeda(item.VRDEPOSITO),  
        parseFloat(item.NUDOCDEPOSITO).toFixed(2), 
        item.STCANCELADO, 
        item.STCONFERIDO
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('deposito_conciliacao_banco.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosListaConciliarBanco);
    const workbook = XLSX.utils.book_new();
    const header = ['Loja', 'Data Compensação', 'Data Depósito', 'Data Movimento', 'Banco', 'Valor', 'Doc.', 'Status', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'Loja' }, 
      { wpx: 150, caption: 'Data Compensação' }, 
      { wpx: 150, caption: 'Data Depósito' }, 
      { wpx: 150, caption: 'Data Movimento' }, 
      { wpx: 150, caption: 'Banco' }, 
      { wpx: 100, caption: 'Valor' }, 
      { wpx: 150, caption: 'Doc' }, 
      { wpx: 60, caption: 'Status' }, 
      { wpx: 60, caption: 'Situação' }
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Conciliação de Depósitos');
    XLSX.writeFile(workbook, 'deposito_conciliacao_banco.xlsx');
  };

  const calcularValorDeposito = () => {
    let total = 0;
    for (let dados of dadosListaConciliarBanco) {
      if (dados.STCANCELADO === 'False') {
        total += parseFloat(dados.VRDEPOSITO)

      }
    }
    return total
  }

  const dadosListaConciliarBanco = dadosConciliarBanco.map((item) => {
   
    return {
      NOFANTASIA: item.NOFANTASIA,
      DTCOMPENSACAO: item.DTCOMPENSACAO,
      DTDEPOSITO: item.DTDEPOSITO,
      DTMOVIMENTOCAIXA: item.DTMOVIMENTOCAIXA,
      DSBANCO: item.DSBANCO,
      VRDEPOSITO: item.VRDEPOSITO,
      NUDOCDEPOSITO: toFloat(item.NUDOCDEPOSITO),
      STCANCELADO: item.STCANCELADO,
      STCONFERIDO: item.STCONFERIDO,
      IDDEPOSITOLOJA: item.IDDEPOSITOLOJA
      // DSCONTABANCO: item.DSCONTABANCO,
  
    }
  })

  const colunasConciliarBanco = [
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <p style={{fontWeight: 600, margin: "0px", width: "200px" }}>{row.NOFANTASIA}</p>,
      sortable: true
    },
    {
      field: 'DTCOMPENSACAO',
      header: 'Data Compensação',
      body: row => <p style={{fontWeight: 600, margin: "0px", width: "150px" }}>{row.DTCOMPENSACAO}</p>,
      sortable: true
    },
    {
      field: 'DTDEPOSITO',
      header: 'Data Depósito',
      body: row => <p style={{fontWeight: 600, margin: "0px", width: "150px" }}>{row.DTDEPOSITO}</p>,
      sortable: true
    },
    {
      field: 'DTMOVIMENTOCAIXA',
      header: 'Data Movimento',
      body: row => <p style={{fontWeight: 600, margin: "0px", width: "150px" }}>{row.DTMOVIMENTOCAIXA}</p>,
      sortable: true
    },
    {
      field: 'DSBANCO',
      header: 'Banco',
      body: row => <p style={{fontWeight: 600, margin: "0px", width: "150px" }}>{row.DSBANCO}</p>,
      footer: 'Total',
      sortable: true
    },
    {
      field: 'VRDEPOSITO',
      header: 'Valor',
      body: row => <th style={{ color: '' }}>{formatMoeda(row.VRDEPOSITO)}</th>,
      footer: formatMoeda(calcularValorDeposito()),
      sortable: true
    },
    {
      field: 'NUDOCDEPOSITO',
      header: 'Doc.',
      body: row => <th style={{ color: '' }}>{toFloat(row.NUDOCDEPOSITO)}</th>,
      sortable: true
    },
    {
      field: 'STCANCELADO',
      header: 'Status',
      body: row => (
        <p style={{fontWeight: 600, margin: "0px", width: "100px", color: row.STCANCELADO === 'False' ? 'blue' : 'red' }}>
          {row.STCANCELADO === 'False' ? 'Dep. Ativo' : 'Dep. Cancelado'}
        </p>
      ),
    },
    {
      field: 'STCONFERIDO',
      header: 'Situação',
      body: row => (
        <p style={{fontWeight: 600, margin: "0px", width: "100px", color: row.STCONFERIDO === 'True' ? 'green' : 'red' }}>
          {row.STCONFERIDO === 'True' ? 'Conciliado' : 'Não Conciliado'}
        </p>
      ),
    },
    {
      field: 'STCONFERIDO',
      header: 'Opções',
      button: true,

      body: (row) => {
        if (row.STCONFERIDO == 'True') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between" }}
            >
              <div className="p-1">
                <ButtonTable
                  titleButton={"Cancelar Conciliação"}
                  cor={"danger"}
                  Icon={BsTrash3}
                  iconSize={25}
                  width="35px"
                  height="35px"
                  onClickButton={() => handleClickCancelar(row)}
                />
              </div>
            </div>

          )
        }
      },
    },
  ]
  
  const handleClickCancelar = (row) => {
    if (optionsModulos[0]?.ALTERAR == 'False') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Erro!',
        text: 'Você não tem permissão para cancelar a conciliação do depósito!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 4000 
      });
      return
    } 
    if (row && row.IDDEPOSITOLOJA) {
      handleCancelar(row.IDDEPOSITOLOJA);
    }
  };

  return (

    <Fragment>


      <div className="panel" >
        <div className="panel-hdr">
          <h2>
            Lista de Depósitos <span class="fw-300"><i>Por Bancos</i> Pesquisa pela data do Depósito</span>
          </h2>
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
          value={dadosListaConciliarBanco}
          size="small"
          globalFilter={globalFilterValue}
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[10, 20, 50, 100, dadosListaConciliarBanco.length]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
          filterDisplay="menu"
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
        >
          {colunasConciliarBanco.map(coluna => (
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

