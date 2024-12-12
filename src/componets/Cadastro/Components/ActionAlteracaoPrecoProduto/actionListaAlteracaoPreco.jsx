import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { toFloat } from "../../../../utils/toFloat";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";

export const ActionListaAlteracaoPreco = ({dadosAlteracaoPreco}) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheEstilos, setDadosDetalheEstilos] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Preço',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Número Lista', 'Nome', 'QTD Lojas', 'Data Criação', 'Data Alteração', 'Situação']],
      body: dados.map(item => [
        item.contador,
        item.IDRESUMOLISTAPRECO,
        item.NOMELISTA,
        item.detalheLista,
        item.DATACRIACAO,
        item.DATAALTERACAO,
        item.STATIVO == 'True' ? 'ATIVA' : 'INATIVA'
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('lista_preco.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Número Lista', 'Nome', 'QTD Lojas', 'Data Criação', 'Data Alteração', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 100, caption: 'Número Lista' },
      { wpx: 300, caption: 'Nome' },
      { wpx: 100, caption: 'QTD Lojas' },
      { wpx: 100, caption: 'Data Criação' },
      { wpx: 100, caption: 'Data Alteração' },
      { wpx: 100, caption: 'Situação' },
  
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Preço');
    XLSX.writeFile(workbook, 'lista_preco.xlsx');
  };


  const dados = dadosAlteracaoPreco.map((item, index) => {
    let contador = index + 1;
 
    return {
      IDRESUMOALTERACAOPRECOPRODUTO: item.IDRESUMOALTERACAOPRECOPRODUTO,
      NOMELISTA: item.NOMELISTA,
      NOFANTASIA: item.NOFANTASIA,
      IDUSUARIO: item.IDUSUARIO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      DATACRIACAOFORMATADA: item.DATACRIACAOFORMATADA,
      AGENDAMENTOALTERACAO: item.AGENDAMENTOALTERACAO,
      AGENDAMENTOALTERACAOFORMATADO: item.AGENDAMENTOALTERACAOFORMATADO,
      QTDITENS: toFloat(item.QTDITENS),

      contador
    }
  })

  const colunasAlteracoesPreco = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'IDRESUMOALTERACAOPRECOPRODUTO',
      header: 'ID Alteração',
      body: row => <th>{row.IDRESUMOALTERACAOPRECOPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'NOMELISTA',
      header: 'Lista de Preço',
      body: row => {
        return (
          <th> {row.NOMELISTA || row.NOFANTASIA}</th>
        )
      
      },
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Responsável',
      body: row => {
        return (
          <th>{row.NOFUNCIONARIO || ''}</th>
        )
      },
      sortable: true,
    },
    {
      field: 'QTDITENS',
      header: 'Qtd. Produtos',
      body: row => {
        return (
          <th>{row.QTDITENS}</th>
        )
      },
      sortable: true,
    },
    {
      field: 'DATACRIACAOFORMATADA',
      header: 'Data Criação',
      body: row => {
        return (
          <th>{row.DATACRIACAOFORMATADA || ''}</th>
        )
      },
      sortable: true,
    },
    {
      field: 'AGENDAMENTOALTERACAOFORMATADO',
      header: 'Data Agendamento',
      body: row => {
        return (
          <th>{row.AGENDAMENTOALTERACAOFORMATADO || row.DATACRIACAOFORMATADA}</th>
        )
      },
      sortable: true,
    },
  
    {
      field: 'IDRESUMOALTERACAOPRECOPRODUTO',
      header: 'Detalhes',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar "}
              onClickButton={() => clickEditar(row)}
              cor={"success"}
              Icon={CiEdit}
              iconSize={22}
              iconColor={"#fff"}

            />
          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickEditar = (row) => {
    if (row && row.IDRESUMOALTERACAOPRECOPRODUTO) {
      handleEditar(row.IDRESUMOALTERACAOPRECOPRODUTO);
    }
  };

  const handleEditar = async (IDRESUMOALTERACAOPRECOPRODUTO) => {
    try {
      const response = await get(`/listaEstilos?idEstilo=${IDRESUMOALTERACAOPRECOPRODUTO}`);
      setDadosDetalheEstilos(response.data);
      setModalEditar(true)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista Alteração Preço</h2>
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
        <div className="card mb-4" ref={dataTableRef}>
          <DataTable
            title="Lista de Preço"
            value={dados}
            globalFilter={globalFilterValue}
            size="small"
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasAlteracoesPreco.map(coluna => (
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