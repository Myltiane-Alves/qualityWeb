import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { get } from "../../../../api/funcRequest";
import { ActionDetalharEmpresaModal } from "./actionDetalharEmpresaModal";
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import { ActionEditarEmpresaModal } from "./actionEditarEmpresaModal";

export const ActionListaEmpresas = ({ dadosEmpresas }) => {
  const [modalDetalheEmpresa, setModalDetalheEmpresa] = useState(false);
  const [modalEditarEmpresa, setModalEditarEmpresa] = useState(false);
  const [dadosEmpresasDetalhe, setDadosEmpresasDetalhe] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();
  const navigate = useNavigate();



  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Empresas',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Empresa', 'Email', 'Telefone']],
      body: dados.map(item => [item.IDEMPRESA, item.NOFANTASIA, item.EEMAILPRINCIPAL, item.NUTELGERENCIA]),
    });
    doc.save('lista_empresas.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['ID', 'Empresa', 'Email', 'Telefone']
    worksheet['!cols'] = [
      { wpx: 100, caption: 'ID' },
      { wpx: 200, caption: 'Empresa' },
      { wpx: 200, caption: 'Email' },
      { wpx: 100, caption: 'Telefone' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empresas");
    XLSX.writeFile(workbook, 'lista_empresas.xlsx');
  };


  const dados = dadosEmpresas.map(item => ({
    IDEMPRESA: item.IDEMPRESA,
    NOFANTASIA: item.NOFANTASIA,
    EEMAILPRINCIPAL: item.EEMAILPRINCIPAL,
    NUTELGERENCIA: item.NUTELGERENCIA,
  }));

  const colunaListaEmpresas = [
    { field: 'IDEMPRESA', header: 'ID', sortable: true },
    { field: 'NOFANTASIA', header: 'Empresa', sortable: true },
    { field: 'EEMAILPRINCIPAL', header: 'Email', sortable: true },
    { field: 'NUTELGERENCIA', header: 'Telefone', sortable: true },
    {
      field: 'IDEMPRESA',
      header: 'Opções',
      body: row => {
        if (row.IDEMPRESA !== usuarioLogado?.IDEMPRESA) {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ButtonTable
                titleButton="Detalhar"
                onClickButton={() => handleClickDetalhar(row)}
                Icon={GrFormView}
                iconSize={18}
                iconColor="#fff"
                cor="success"
              />
            </div>
          );
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "20px" }}>
                <ButtonTable
                  titleButton="Editar"
                  onClickButton={() => handleClickEditar(row)}
                  Icon={CiEdit}
                  iconSize={18}
                  iconColor="#fff"
                  cor="primary"
                />
              </div>
              <ButtonTable
                titleButton="Detalhar"
                onClickButton={() => handleClickDetalhar(row)}
                Icon={GrFormView}
                iconSize={18}
                iconColor="#fff"
                cor="success"
              />
            </div>
          );
        }
      },
      sortable: true,
    }
  ];

  const handleDetalhar = async (IDEMPRESA) => {
    try {
      const response = await get(`/empresas?idEmpresa=${IDEMPRESA}`);
      if (response.data && response.data.length > 0) {
        setDadosEmpresasDetalhe(response.data);
        setModalDetalheEmpresa(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickDetalhar = (row) => {
    if (row && row.IDEMPRESA) {
      handleDetalhar(row.IDEMPRESA);
    }
  };

  const handleEditar = async (IDEMPRESA) => {
    try {
      const response = await get(`/empresas?idEmpresa=${IDEMPRESA}`);
      if (response.data && response.data.length > 0) {
        setDadosEmpresasDetalhe(response.data);
        setModalEditarEmpresa(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEditar = (row) => {
    if (row && row.IDEMPRESA) {
      handleEditar(row.IDEMPRESA);
    }
  };

  
  return (
    <Fragment>
      <div className="panel mt-6">
        <div className="panel-hdr">
          <h2>Lista de Empresas</h2>
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
            value={dados}
            globalFilter={globalFilterValue}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 30, 50, 100, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunaListaEmpresas.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}
                body={coluna.body}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}
              />
            ))}
          </DataTable>
        </div>
      </div>
      <ActionDetalharEmpresaModal
        show={modalDetalheEmpresa}
        handleClose={() => setModalDetalheEmpresa(false)}
        dadosEmpresasDetalhe={dadosEmpresasDetalhe}
      />

      <ActionEditarEmpresaModal 
        show={modalEditarEmpresa}
        handleClose={() => setModalEditarEmpresa(false)}
        dadosEmpresasDetalhe={dadosEmpresasDetalhe}
      /> 
    </Fragment>
  );
};
