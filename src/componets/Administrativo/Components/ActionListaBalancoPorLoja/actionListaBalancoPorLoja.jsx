import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { FaBalanceScale, FaBalanceScaleLeft } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { FcCurrencyExchange } from "react-icons/fc";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { get } from "../../../../api/funcRequest";
import { ActionColetorBalancoModal } from "../ActionListaBalancoAvulso/actionColetorBalancoModal";
import { ActionPreviaBalancoModal } from "./actionPreviaBalancoModal";
import { ActionVisualizarImprimirPrestacaoContas } from "./actionVisualizarImprimirPrestacaoContas";
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaBalancoPorLoja = ({ dadosBalanco }) => {
  const [modalResumoBalanco, setModalResumoBalanco] = useState(false)
  const [dadosColetorBalanco, setDadosColetorBalanco] = useState([])
  const [dadosPreviaBalancoModal, setDadosPreviaBalancoModal] = useState([])
  const [modalPreviaBalanco, setModalPreviaBalanco] = useState(false)
  const [modalImprimirVisivel, setModalImprimirVisivel] = useState(false)
  const [dadosListaContasBalanco, setDadosListaContasBalanco] = useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Balanco por Loja',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Empresa', 'Data Abertura', 'Data Fechamento', 'Estoque Atual', 'Contagem', 'Diferença', 'Status']],
      body: dados.map(item => [
       
        item.IDEMPRESA,
        item.NOFANTASIA,
        item.DTABERTURA,
        item.DTFECHAMENTO,
        item.QTDTOTALANTERIOR,
        item.QTDTOTALCONTAGEM,
        item.diferenca,
        item.STCONCLUIDO == 'False' ? 'Concluído' : 'Em Aberto',
     
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('balanco_loja.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Empresa', 'Data Abertura', 'Data Fechamento', 'Estoque Atual', 'Contagem', 'Diferença', 'Status'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' }, 
      { wpx: 150, caption: 'Empresa' }, 
      { wpx: 150, caption: 'Data Abertura' },
      { wpx: 150, caption: 'Data Fechamento' },
      { wpx: 150, caption: 'Estoque Atual' },
      { wpx: 150, caption: 'Contagem' },
      { wpx: 150, caption: 'Diferença' },
      { wpx: 150, caption: 'Status' },
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Balanco por Loja');
    XLSX.writeFile(workbook, 'balanco_loja.xlsx');
  };


  const dadosExcel = dadosBalanco.map((item) => {
    const diferenca = item.QTDTOTALCONTAGEM - item.QTDTOTALANTERIOR;
    const status = item.STCONCLUIDO == 'False' ? 'Concluído' : 'Em Aberto';
    return {
      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      DTABERTURA: item.DTABERTURA,
      DTFECHAMENTO: item.DTFECHAMENTO,
      QTDTOTALANTERIOR: item.QTDTOTALANTERIOR,
      QTDTOTALCONTAGEM: item.QTDTOTALCONTAGEM,
      diferenca: diferenca,
      status: status,
   
    }
  });

  const dados = dadosBalanco.map((item) => {
    const diferenca = item.QTDTOTALCONTAGEM - item.QTDTOTALANTERIOR;
 
    return {
      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      DTABERTURA: item.DTABERTURA,
      DTFECHAMENTO: item.DTFECHAMENTO,
      QTDTOTALANTERIOR: item.QTDTOTALANTERIOR,
      QTDTOTALCONTAGEM: item.QTDTOTALCONTAGEM,
      diferenca: diferenca,
      status: status,
      STCONCLUIDO: item.STCONCLUIDO,
      IDRESUMOBALANCO: item.IDRESUMOBALANCO,

      DSRESUMOBALANCO: item.DSRESUMOBALANCO,
      STCONSOLIDADO: item.STCONSOLIDADO,
    }
  });

  const colunasVendas = [
    {
      field: 'IDRESUMOBALANCO',
      header: '*',
      body: row => <th>{row.IDRESUMOBALANCO}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => <p style={{fontWeight: 600, width: '200px', margin: '0px'}}>{row.NOFANTASIA}</p>,
      sortable: true,
    },
    {
      field: 'DTABERTURA',
      header: 'Data Abertura',
      body: row => <th >{row.DTABERTURA}</th>,
      sortable: true,
    },
    {
      field: 'DTFECHAMENTO',
      header: 'Data Fechamento',
      body: row => <th>{row.DTFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'QTDTOTALANTERIOR',
      header: 'Estoque Atual',
      body: row => <th>{toFloat(row.QTDTOTALANTERIOR)}</th>,
      sortable: true,
    },

    {
      field: 'QTDTOTALCONTAGEM',
      header: 'Contagem',
      body: row => <th>{toFloat(row.QTDTOTALCONTAGEM)}</th>,
      sortable: true,
    },
    {
      field: 'diferenca',
      header: 'Diferença',
      body: row => <th>{toFloat(row.diferenca)}</th>,
      sortable: true,
    },
    {
      field: 'STCONCLUIDO',
      header: 'Status',
      body: row => <th>{ row.STCONCLUIDO == 'True' ? 'Concluído' : 'Em Aberto'}</th>,
      sortable: true,
    },
    {
      field: 'IDRESUMOBALANCO',
      header: 'Opções',
      body: row => (
        <div className="p-1 "
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <div className="p-1">
            <ButtonTable
              titleButton={"Prévia Balanço Diferença"}
              cor={"primary"}
              Icon={FaBalanceScaleLeft}
              iconSize={18}
              onClickButton={() => handleClickPrevialanco(row)}
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Balanço"}
              cor={"success"}
              Icon={GrFormView}
              iconSize={18}
              onClickButton={() => handleClickResumoBalanco(row)}
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Prévia Balanço"}
              cor={"warning"}
              Icon={FaScaleUnbalanced}
              iconSize={18}
              onClickButton={() => handleClickPrevialanco(row)}
            />
          </div>
          <div className="p-1">
            {/* {row.STCONSOLIDADO == 'True' && row.STCONCLUIDO == 'Aberto' && (
              
            )} */}
            <ButtonTable
              titleButton={"Prestação de Contas"}
              cor={"danger"}
              Icon={FcCurrencyExchange}
              iconSize={18}
              onClickButton={() => handleClickContaBalanco(row)}
            />
          </div>

          <div className="p-1">
            <ButtonTable
              titleButton={"Prévia Balanço Geral"}
              cor={"info"}
              Icon={FaBalanceScale}
              iconSize={18}
              onClickButton={() => handleClickPreviaGeral(row)}
            />
          </div>
        </div>
      ),
      sortable: true,
    },
  ]

  const handleEditPreviaBalanco = async (IDRESUMOBALANCO, IDEMPRESA) => {
    try {
      const response = await get(`/novoPreviaBalanco?idResumo=${IDRESUMOBALANCO}&idEmpresa=${IDEMPRESA}&diferenca=1&processa=1`)
      if (response.data) {
        setDadosPreviaBalancoModal(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickPrevialanco = async (row) => {
    if (row.IDRESUMOBALANCO && row.IDEMPRESA) {
      setModalPreviaBalanco(true)
      handleEditPreviaBalanco(row.IDRESUMOBALANCO, row.IDEMPRESA)
    }
  }
  const handleEditPreviaGeral = async (IDRESUMOBALANCO, IDEMPRESA) => {
    try {
      const response = await get(`/novoPreviaBalanco?idResumo=${IDRESUMOBALANCO}&idEmpresa=${IDEMPRESA}&diferenca=0&processa=0`)
      if (response.data) {
        setDadosPreviaBalancoModal(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickPreviaGeral = async (row) => {
    if (row.IDRESUMOBALANCO && row.IDEMPRESA) {
      setModalPreviaBalanco(true)
      handleEditPreviaBalanco(row.IDRESUMOBALANCO, row.IDEMPRESA)
    }
  }

  const handleEditResumoBalanco = async (IDRESUMOBALANCO, IDEMPRESA) => {
    
      try {
        const response = await get(`/coletor-balanco?idEmpresa=${IDEMPRESA}&idResumo=${IDRESUMOBALANCO}&diferenca=1&processa=0`)
        if (response.data) {
          setDadosColetorBalanco(response.data)
        }
        return response.data;
      } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
      }
    

  }

  const handleClickResumoBalanco = async (row) => {
    if (row.IDRESUMOBALANCO && row.IDEMPRESA) {
      setModalResumoBalanco(true)
      handleEditResumoBalanco(row.IDRESUMOBALANCO, row.IDEMPRESA)
    }
  }

  const handleEditContaBalanco = async (IDRESUMOBALANCO) => {
    try {
      const response = await get(`/prestacao-contas-balanco?idResumoBalanco=${IDRESUMOBALANCO}`)
      if(response.data) {
        setDadosListaContasBalanco(response.data)
      }
    } catch (error) {
      console.log(error, 'não foi possivel pegar os dados da tabela')
    }
  }
  const handleClickContaBalanco = (row) => {
    if(row && row.IDRESUMOBALANCO) {
      setModalImprimirVisivel(true)
      handleEditContaBalanco(row.IDRESUMOBALANCO)
   
    }
  }

  return (

    <Fragment>

      <div id="panel-1" className="panel" style={{marginTop: '5rem'}}>
        <div className="panel-hdr">
          <h2 >
            Lista de Balanço por Loja
          </h2>

        </div>
        <div className="panel-container show">
       
          <div className="panel-content">
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
                rowsPerPageOptions={[5, 10, 20, 50, 100, dados.length]}
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
        </div>
      </div>
      <ActionColetorBalancoModal 
        show={modalResumoBalanco}
        handleClose={() => setModalResumoBalanco(false)}
        dadosColetorBalanco={dadosColetorBalanco}
      />

      <ActionPreviaBalancoModal 
        show={modalPreviaBalanco}
        handleClose={() => setModalPreviaBalanco(false)}
        dadosPreviaBalancoModal={dadosPreviaBalancoModal}
        dadosBalanco={dadosBalanco}
      />

      <ActionVisualizarImprimirPrestacaoContas
        show={modalImprimirVisivel}
        handleClose={() => setModalImprimirVisivel(false)}
        dadosListaContasBalanco={dadosListaContasBalanco}

      />
    </Fragment>
  )
}
