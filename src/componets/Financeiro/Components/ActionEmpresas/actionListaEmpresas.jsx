import React, { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../../api/funcRequest";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { ActionUpdatePixPDVModal } from "./actionUpadatePixPDVModal";
import { MdPix } from "react-icons/md";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


export const ActionListaEmpresas = ({dadosEmpresas}) => {
  const [modalVisivel, setModalVisivel] = useState(false)
  const [dadosPixPDV, setDadosPixPDV] = useState([])
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size] = useState('small');
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista Empresas'
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID Empresa', 'Empresa', 'CNPJ', 'Insc, Estadual', 'CNAE', 'Status' ]],
      body: dados.map(item => [
        item.IDEMPRESA, 
        item.NOFANTASIA, 
        item.NUCNPJ, 
        item.NUINSCESTADUAL, 
        item.CNAE, 
        item.STATIVO == 'True' ? 'Ativo' : 'Inativo'
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('lista_empresas.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['ID Empresa', 'Empresa', 'CNPJ', 'Insc, Estadual', 'CNAE', 'Status' ];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'ID Empresa' }, 
      { wpx: 200, caption: 'Empresa' },
      { wpx: 100, caption: 'CNPJ' },
      { wpx: 100, caption: 'Insc, Estadual' },
      { wpx: 100, caption: 'CNAE' },
      { wpx: 100, caption: 'Status' }

      
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista Empresas');
    XLSX.writeFile(workbook, 'lista_empresas.xlsx');
  };

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {

  }, [usuarioLogado]);


  const dados = Array.isArray(dadosEmpresas) ? dadosEmpresas.map((item, index) => {
   
    
    return {
      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      NUCNPJ: item.NUCNPJ,
      NUINSCESTADUAL: item.NUINSCESTADUAL,
      CNAE: item.CNAE,
      STATIVO: item.STATIVO,

      // EENDERECO: item.EENDERECO,
      // SGUF: item.SGUF,
      // DTULTATUALIZACAO: item.DTULTATUALIZACAO,
      // IDCONFIGURACAO: item.IDCONFIGURACAO,
      // DSNOMEPFX: item.DSNOMEPFX,
      // DTVALIDADECERTIFICADO: item.DTVALIDADECERTIFICADO,
      // ECIDADE: item.ECIDADE,
    };
  }): [];
  const colunaListaEmpresas = [
    {
      field: 'IDEMPRESA',
      header: 'ID Empresa',
      body: row => <th>{row.IDEMPRESA}</th>,
      sortable: true,
      width: "5%"
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa ',
      body: row => <th>{row.NOFANTASIA}</th>,
      sortable: true,
    },
    {
      field: 'NUCNPJ',
      header: 'CNPJ',
      body: row => <th>{row.NUCNPJ}</th>,
      sortable: true,
    },
    {
      field: 'NUINSCESTADUAL',
      header: 'Insc. Estadual',
      body: row => <th>{row.NUINSCESTADUAL}</th>,
      sortable: true,
    },
    {
      field: 'CNAE',
      header: 'CNAE',
      body: row => <th>{row.CNAE}</th>,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Status',
      body: row => <th style={{color: row.STATIVO == 'True' ? 'blue' : 'red'}}>{row.STATIVO == 'True' ? 'Ativo' : 'Inativo'}</th>,
      sortable: true,
    },
    {
      field: 'IDEMPRESA',
      header: 'Opções',
      width: "15%",
      body: row => {
        if (row.IDEMPRESA > 0) {
          return (
            <div >
              <ButtonTable
                titleButton={"Editar Configurações Pix"}
                onClickButton={() => handleClickDetalhar(row)}
                Icon={MdPix}
                iconSize={18}
                iconColor={"#fff"}
                cor={"info"}

              />
            </div>
          )
        } 

      },
      sortable: true,
    },

  ]

  const handleDetalhar = async (IDEMPRESA) => {
    try {
      const response = await get(`/configuracao-pix-pdv?idEmpresa=${IDEMPRESA}`);
      if (response) {
        setDadosPixPDV(response);
        setModalVisivel(true);
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


  return (

    <Fragment>
      <div className="panel" style={{ marginTop: "6rem"}}>
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

          title="Lista de Empresas"
          value={dados}
          globalFilter={globalFilterValue}
            size={size}
        
          sortOrder={-1}
          paginator
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
      
      <ActionUpdatePixPDVModal 
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
        dadosPixPDV={dadosPixPDV}
      />
    </Fragment>
  )
}
