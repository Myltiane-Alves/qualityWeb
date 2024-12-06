import { Fragment, useRef, useState } from "react"
import { get } from "../../../../api/funcRequest"
import { formatMoeda } from "../../../../utils/formatMoeda"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import HeaderTable from "../../../Tables/headerTable"
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


export const ActionListaMapaCaixa = ({ dadosMapaCaixa }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small')
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Mapa de Caixas Por Loja',
    onAfterPrint: () => {
      console.log("Printed successfully!");
    },
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Despesas', 'Tipo Despesa', 'Mat/Usuário', 'Histórico', 'Pago a', 'Valor']],
      body: dados.map(item => [
        item.contador,
        item.DSCATEGORIA, 
        item.NOFUNCIONARIO, 
        item.DSHISTORIO, 
        item.DSPAGOA, 
        item.VRDESPESA
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('mapa_caixa_por_loja.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mapa de Caixas Por Loja');
    XLSX.writeFile(workbook, 'mapa_caixa_por_loja.xlsx');
  };

  const dados = Array.isArray(dadosMapaCaixa) ? dadosMapaCaixa.map((item, index) => {
    let contador = index + 1;
    item.contador,
    item.IDCATEGORIARECEITADESPESA, 
    item.NOFUNCIONARIO, 
    item.DSHISTORIO, 
    item.DSPAGOA, 
    item.VRDESPESA
    return {
      contador,
      IDCATEGORIARECDESP: item.IDCATEGORIARECEITADESPESA,
      DSCATEGORIA: item.DSCATEGORIA,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      DSHISTORIO: item.DSHISTORIO,
      DSPAGOA: item.DSPAGOA,
      VRDESPESA: item.VRDESPESA,

      // IDEMPRESA: item.IDEMPRESA,
      // DTDESPESA: item.DTDESPESA,
      // IDFUNCIONARIO: item.IDFUNCIONARIO,
      // NOLOGIN: item.NOLOGIN,
      
      // NOFUNCVALE: item.NOFUNCVALE,
      // NUNOTAFISCAL: item.NUNOTAFISCAL,
      // STATIVO: item.STATIVO,
      // STCANCELADO: item.STCANCELADO,
      // TPNOTA: item.TPNOTA,
      // NOFANTASIA: item.NOFANTASIA,
      IDDESPESASLOJA: item.IDDESPESASLOJA,
    }
  }) : [];

  const calcularTotalDespesas = () => {
    let total = 0;
    for (let resultado of dados) {
      total += parseFloat(resultado.VRDESPESA);
    }
    return total;
  }

  const colunasEmpresas = [
    {
      field: 'contador',
      header: 'Despesas',
      body: row => <th> {row.contador}</th>,
      sortable: true,
    },
    {
      field: 'IDCATEGORIARECEITADESPESA',
      header: 'Tipo Despesa',
      body: row => <th > {row.IDCATEGORIARECEITADESPESA} - {row.DSCATEGORIA} </th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Mat./ Usuário',
      body: row => <th > {row.NOFUNCIONARIO} </th>,
      sortable: true,
    },
    {
      field: 'DSHISTORIO',
      header: 'Histórico',
      body: row => <th > {row.DSHISTORIO} </th>,
      sortable: true,
    },
    {
      field: 'DSPAGOA',
      header: 'Pago a',
      body: row => <th > {row.DSPAGOA} </th>,
      footer: 'Total Despesas',
      sortable: true,
    },
    {
      field: 'VRDESPESA',
      header: 'Valor',
      body: row => (
        <th >
          {formatMoeda(row.VRDESPESA)}
        </th>
      ),
      footer: formatMoeda(calcularTotalDespesas()),
      sortable: true,
    },

  ]

  const handleEditar = async (IDDESPESASLOJA) => {
    try {
      const response = await get(`/despesa-Loja-todos?idDespesas=${IDDESPESASLOJA}`);

      if (response.data) {
        setDadosDespesasLojaDetalhe(response.data)
        setModalDespesasVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da despesa: ', error);
    }
  };


  const handleClickEditar = (row) => {
    if (row && row.IDDESPESASLOJA) {
      handleEditar(row.IDDESPESASLOJA);
    }
  };

  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">

          <h2 style={{ color: "" }}>Mapa de Fechamento de Caixas Por Período  </h2>
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
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasEmpresas.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}

              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem'}}

            />
          ))}
        </DataTable>
      </div>
      </div>



    </Fragment>
  )
}
