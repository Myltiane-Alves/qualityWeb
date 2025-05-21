import { Fragment, useRef, useState } from "react"
import { GrFormView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import HeaderTable from "../../../Tables/headerTable";

export const ActionListaMetas = ({ dadosVendasMarca }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista Vendas Metas',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Grupo', 'Data Início', 'Data Fim', 'Situação']],
      body: dados.map(item => [
        item.contador,
        item.DSSUBGRUPOEMPRESARIAL,
        item.DTMETAINICIOFORMAT,
        item.DTMETAFIMFORMAT,
        item.STSALVO == 'True' ? 'SALVO' : 'NÃO SALVO',
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('marcas_vendas_metas.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Grupo', 'Data Início', 'Data Fim', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' },
      { wpx: 200, caption: 'Grupo' },
      { wpx: 150, caption: 'Data Início' },
      { wpx: 150, caption: 'Data Fim' },
      { wpx: 150, caption: 'Situação' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista Vendas Metas');
    XLSX.writeFile(workbook, 'marcas_vendas_metas.xlsx');
  };

  const dados = dadosVendasMarca.map((item, index) => {
    let contador = index + 1;

    return {
      contador,
      DSSUBGRUPOEMPRESARIAL: item.DSSUBGRUPOEMPRESARIAL,
      DTMETAINICIOFORMAT: item.DTMETAINICIOFORMAT,
      DTMETAFIMFORMAT: item.DTMETAFIMFORMAT,
      STSALVO: item.STSALVO == 'True' ? 'SALVO' : 'NÃO SALVO',

      IDGRUPOEMPRESA: item.IDGRUPOEMPRESA,
      DTMETAINICIO: item.DTMETAINICIO,
      NOFANTASIA: item.NOFANTASIA,
      DTMETAFIM: item.DTMETAFIM,
      STATIVO: item.STATIVO,
    };
  });

  const colunasVendas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'DSSUBGRUPOEMPRESARIAL',
      header: 'Grupo',
      body: row => <th>{row.DSSUBGRUPOEMPRESARIAL}</th>,
      sortable: true,

    },
    {
      field: 'DTMETAINICIOFORMAT',
      header: 'Data Início',
      body: row => <th>{row.DTMETAINICIOFORMAT}</th>,
      sortable: true,

    },
    {
      field: 'DTMETAFIMFORMAT',
      header: 'DataFim',
      body: row => <th>{row.DTMETAFIMFORMAT}</th>,
      sortable: true,

    },
    {
      field: 'STSALVO',
      header: 'Situação',
      body: (
        (row) => (
          <th style={{ color: row.STSALVO == 'SALVO' ? 'blue' : 'red' }}>
            {row.STSALVO}

          </th>
        )
      ),
      sortable: true,
    },
    {
      field: 'STSALVO',
      header: 'Opções',
      body: (
        (row) => (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="p-1">
              <ButtonTable
                titleButton={"Metas Resumida"}
                onClickButton
                Icon={FaBalanceScale}
                iconSize={22}
                iconColor={"#fff"}
                cor={"success"}

              />

            </div>
            <div className="p-1">
              <ButtonTable
                titleButton={"Metas Detalhada"}
                onClickButton
                Icon={GrFormView}
                iconSize={22}
                iconColor={"#fff"}
                cor={"info"}

              />

            </div>
            <div className="p-1">
              <ButtonTable
                titleButton={"Excluir Metas"}
                onClickButton
                Icon={AiOutlineDelete}
                iconSize={22}
                iconColor={"#fff"}
                cor={"danger"}

              />

            </div>


          </div>
        )
      ),
      sortable: true,
    },
  ]


  return (

    <Fragment>
      <div className="panel" style={{ marginTop: "4rem" }}>
        <div className="panel-hdr">
          <h2>Metas Marcas Período</h2>
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
            title="Vendas por Marcas e Período"
            value={dados}
            size="small"
            globalFilter={globalFilterValue}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, dados.length]}
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
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '1rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '1rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>
    </Fragment>
  )
}

