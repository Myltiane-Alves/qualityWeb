import React, { Fragment, useRef, useState } from "react"
import { formatMoeda } from "../../../../utils/formatMoeda";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { get } from "../../../../api/funcRequest";
import { ActionDetalheAlterarVendaModal } from "./ActionDetalharVendaVendedor/actionDetalheAlterarVendaModal";
import { CiEdit } from "react-icons/ci";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import Swal from "sweetalert2";

export const ActionListaAlterarVendaVendedor = ({dadosVendasAtivas, empresaSelecionada, optionsModulos, usuarioLogado }) => {
  const [dadosVendasDetalhada, setDadosVendasDetalhada] = useState([]); 
  const [modalVisivel,  setModalVisivel] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Estoque Atual',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Caixa', 'Nº Venda', 'NFCe', 'Abertura', 'Operador', 'Valor']],
      body: dados.map(item => [
        item.contador,
        item.IDCAIXAWEB + ' - ' + item.DSCAIXA,
        item.IDVENDA,
        item.NFE_INFNFE_IDE_NNF,
        dataFormatada(item.DTHORAFECHAMENTO),
        item.NOFUNCIONARIO,
        formatMoeda(item.VRTOTALPAGO),
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('estoque_atual.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Caixa', 'Nº Venda', 'NFCe', 'Abertura', 'Operador', 'Valor'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' }, 
      { wpx: 100, caption: 'Caixa' }, 
      { wpx: 100, caption: 'Nº Venda' }, 
      { wpx: 100, caption: 'NFCe' }, 
      { wpx: 100, caption: 'Abertura' }, 
      { wpx: 100, caption: 'Operador' }, 
      { wpx: 100, caption: 'Valor' }
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estoque Atual');
    XLSX.writeFile(workbook, 'estoque_atual.xlsx');
  };
  
  const dadosExcel = dadosVendasAtivas.map((item, index) => {
    let contador = index + 1;
 
    return {
      contador,
      IDCAIXAWEB: item.IDCAIXAWEB + ' - ' + item.DSCAIXA,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      VRTOTALPAGO: item.VRTOTALPAGO,
     
    }
  });

  const dados = dadosVendasAtivas.map((item, index) => {
    let contador = index + 1;
 
    return {
      contador,
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: item.DSCAIXA,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      VRTOTALPAGO: item.VRTOTALPAGO,
      STCONFERIDO: item.STCONFERIDO,
      STCONTINGENCIA: item.STCONTINGENCIA,
    }
  });

  const calcularTotalValorPago = () => {
    let total = 0;
    for(let dados of dadosVendasAtivas){
      total += parseFloat(dados.VRTOTALPAGO);
    }
    return total;
  }

  const colunasVendas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{color: 'blue'}}>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: row => <th style={{color: 'blue'}}> {row.IDCAIXAWEB} - {row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => <th style={{color: 'blue'}}>{row.IDVENDA}</th>,
      sortable: true,
    },
    {
      field: 'NFE_INFNFE_IDE_NNF',
      header: 'NFCe',
      body: row => <th style={{color: 'blue'}}>{row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Abertura',
      body: row => <th style={{color: 'blue'}}>{dataFormatada(row.DTHORAFECHAMENTO)}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <th style={{color: 'blue'}}>{row.NOFUNCIONARIO}</th>,
      footer: 'Total Vendas Ativas',
      sortable: true,
    },
    {
      field: 'VRTOTALPAGO',
      header: 'Valor',
      body: row => <th style={{color: 'blue'}}>{formatMoeda(row.VRTOTALPAGO)}</th>,
      footer: formatMoeda(calcularTotalValorPago()),
      sortable: true,
    },

    {
      field: 'IDVENDA',
      header: 'Opções',
      button: true,
      body: (row) => (
        <div className="d-flex "
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <ButtonTable  
              titleButton={"Detalhar Venda"}
              onClickButton={() => handleClickEdit(row)} 
              cor={"primary"}
              Icon={CiEdit}
              iconSize={25}
              width="35px"
              height="35px"
            />
          </div>
        </div>
      ),
    },
  ]

  const handleEdit = async (empresaSelecionada, IDVENDA) => {
    try {
      const response = await get(`/listaDetalheVenda?idEmpresa=${empresaSelecionada}&idVenda=${IDVENDA}`);

      if (response.data && response.data.length > 0) {
        setDadosVendasDetalhada(response.data);
        setModalVisivel(true);
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEdit = (row) => {
    if(optionsModulos[0]?.ALTERAR == 'True') {
      if (row && empresaSelecionada && row.IDVENDA) {
        handleEdit(empresaSelecionada, row.IDVENDA);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Você não tem permissão para alterar a venda.',
        confirmButtonText: 'OK',
        timer: 3000,
      });
    }
  };


  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Vendas por Loja</h2>
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
            size="small"
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
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

      <ActionDetalheAlterarVendaModal 
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
        dadosVendasDetalhada={dadosVendasDetalhada}
        empresaSelecionada={empresaSelecionada}
        optionsModulos={optionsModulos}
        usuarioLogado={usuarioLogado}
      />
    </Fragment>
  )
}

