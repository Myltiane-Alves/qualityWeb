import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";
import { ActionEditarCategoriaPedidoModal } from "./ActionEditar/actionEditarCategoriaPedidoModal";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


export const ActionListaCategoriaPedidos = ({ dadosCategoria }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheCategoriaPedido, setDadosDetalheCategoriaPedido] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();
  
  
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Categoria Pedido',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Descrição', 'Tipo', 'Situação']],
      body: dados.map(item => [
        item.contador,
        item.DSCATEGORIAPEDIDO,
        item.TIPOPEDIDO,
        item.STATIVO
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('categoria_pedido.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Descrição', 'Tipo', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 100, caption: 'Descrição' },
      { wpx: 100, caption: 'Tippo' },
      { wpx: 100, caption: 'Situação' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categoria Pedido');
    XLSX.writeFile(workbook, 'categoria_pedido.xlsx');
  };
  
  const dados = dadosCategoria.map((item, index) => {
    let contador = index + 1;
    return {
      contador,
      DSCATEGORIAPEDIDO: item.DSCATEGORIAPEDIDO,
      TIPOPEDIDO: item.TIPOPEDIDO,
      STATIVO: item.STATIVO == 'True' ? 'ATIVO' : 'INATIVO',
      IDCATEGORIAPEDIDO: item.IDCATEGORIAPEDIDO,

    }
  })

  const colunasCategoriaPedido = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>, 
      sortable: true,
    },
    {
      field: 'DSCATEGORIAPEDIDO',
      header: 'Descrição',
      body: row => <th>{row.DSCATEGORIAPEDIDO}</th>,
      sortable: true,
    },
    {
      field: 'TIPOPEDIDO',
      header: 'Tipo',
      body: row => <th>{row.TIPOPEDIDO}</th>,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {
        return (
          <th style={{color: row.STATIVO == 'ATIVO' ? 'blue' : 'red'}}>{row.STATIVO}</th>
        )
      },
      sortable: true,
    },
    {
      field: 'IDCATEGORIAPEDIDO',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar Categoria Pedido"}
              onClickButton={() => clickEditar(row)}
              cor={"success"}
              Icon={CiEdit}

            />
          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickEditar = (row) => {
    if (row && row.IDCATEGORIAPEDIDO) {
      handleEditar(row.IDCATEGORIAPEDIDO);
    }
  };

  const handleEditar = async (IDCATEGORIAPEDIDO) => {
    try {
      const response = await get(`/categoriaPedidos?idCategoriaPedido=${IDCATEGORIAPEDIDO}`);
      setDadosDetalheCategoriaPedido(response.data);
      setModalEditar(true)
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <Fragment>
     <div className="panel" style={{ marginTop: "4rem" }}>
        <div className="panel-hdr">
          <h2>Relatório Categorias de Pedido</h2>
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
            title="Relatório Categorias de Pedido"
            value={dados}
            size="small"
            globalFilter={globalFilterValue}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, 500, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasCategoriaPedido.map(coluna => (
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

      <ActionEditarCategoriaPedidoModal
        show={modalEditar}
        handleClose={() => setModalEditar(false)}
        dadosDetalheCategoriaPedido={dadosDetalheCategoriaPedido}
      />
    </Fragment>
  )
}