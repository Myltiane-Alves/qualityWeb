import { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { formatarDataDTW } from "../../../../utils/dataFormatada";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import axios from 'axios';
import Swal from "sweetalert2";
import { post, put } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";



export const ActionFaturaListaVendasPIX = ({ dadosFaturaVendasPix }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small')
  const dataTableRef = useRef();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
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
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Vendas Por PIX',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Data', 'Data Compensação', 'ID Loja', 'Loja', 'Valor', 'Conta Crédito', 'Conta Débito']],
      body: dadosListaVendasPix.map(item => [
        item.DTPROCESSAMENTO,
        item.DATA_COMPENSACAO,
        item.NOFANTASIA.substring(1, 5),
        item.NOFANTASIA,
        formatMoeda(item.VALORTOTALFATURA),
        item.contaCreditoSap,
        item.CONTACREDITOSAP
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('fatura_pix.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas PIX Compensação');
    const header = ['Data', 'Data Compensação', 'ID Loja', 'Loja', 'Valor', 'Conta Crédito', 'Conta Débito'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Data' },
      { wpx: 100, caption: 'Data Compensação' },
      { wpx: 50, caption: 'ID Loja' },
      { wpx: 200, caption: 'Loja' },
      { wpx: 100, caption: 'Valor' },
      { wpx: 100, caption: 'Conta Crédito' },
      { wpx: 100, caption: 'Conta Débito' }

    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.writeFile(workbook, 'fatura_pix.xlsx');
  };



  const dadosExcel = Array.isArray(dadosFaturaVendasPix) ? dadosFaturaVendasPix.map((item, index) => {

    var contaCreditoSap = '2.01.06.01.0001';
    return {
      DTPROCESSAMENTO: formatarDataDTW(item.DTPROCESSAMENTO),
      DATA_COMPENSACAO: formatarDataDTW(item.DATA_COMPENSACAO),
      IDEMPRESA: item.NOFANTASIA.substring(1, 5),
      NOFANTASIA: item.NOFANTASIA,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      NUAUTORIZACAO: item.NUAUTORIZACAO,
      contaCreditoSap: contaCreditoSap,
      CONTACREDITOSAP: item.CONTACREDITOSAP,
    }
  }) : [];

  const dadosListaVendasPix = Array.isArray(dadosFaturaVendasPix) ? dadosFaturaVendasPix.map((item, index) => {
   
    var contaCreditoSap = '2.01.06.01.0001';
    return {
      DTPROCESSAMENTO: item.DTPROCESSAMENTO,
      DATA_COMPENSACAO: item.DATA_COMPENSACAO,
      IDEMPRESA: item.NOFANTASIA.substring(1, 5),
      NOFANTASIA: item.NOFANTASIA,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      NUAUTORIZACAO: item.NUAUTORIZACAO,
      contaCreditoSap: contaCreditoSap,
      CONTACREDITOSAP: item.CONTACREDITOSAP,
    }
  }) : [];


  const colunasVendasPix = [
    {
      field: 'DTPROCESSAMENTO',
      header: 'Data',
      body: row => <th style={{ color: '#212529', width: 100 }}>{row.DTPROCESSAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'DATA_COMPENSACAO',
      header: 'Data Compensação',
      body: row => <th style={{ color: '#212529', width: 100 }}>{row.DATA_COMPENSACAO || 'NÃO INFORMADO'}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'ID Loja',
      body: row => <th style={{ color: '#212529' }}>{row.NOFANTASIA.substring(1, 5)}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <th style={{ color: '#212529', width: '200px' }}>{row.NOFANTASIA}</th>,
      sortable: true,
    },
    {
      field: 'VALORTOTALFATURA',
      header: 'Loja',
      body: row => <th style={{ color: '#212529', width: '200px' }}>{row.VALORTOTALFATURA}</th>,
      sortable: true,
    },
    {
      field: 'contaCreditoSap',
      header: 'Conta Crédito',
      body: row => <th style={{ color: '#212529' }}>{row.contaCreditoSap}</th>,
      sortable: true,
    },
    {
      field: 'CONTACREDITOSAP',
      header: 'Conta Débito',
      body: row => <th style={{ color: '#212529' }}>{row.CONTACREDITOSAP}</th>,
      sortable: true,
    },
    {
      field: 'Opcoes', 
      header: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
          selectionMode="multiple"
        />
      ),
      body: rowData => (
        <input
          type="checkbox"
          checked={selectedIds.includes(rowData.IDDETALHEFATURA)}
          onChange={(e) => {
            const updatedSelectedIds = e.target.checked
              ? [...selectedIds, rowData.IDDETALHEFATURA]
              : selectedIds.filter(id => id !== rowData.IDDETALHEFATURA);
    
            setSelectedIds(updatedSelectedIds);
            setSelectAll(updatedSelectedIds.length === dadosListaVendasPix.length);
          }}
          selectionMode="multiple"
        />
      ),
      sortable: false,
    }
  ]


  useEffect(() => {
    if (selectedIds.length > 0) {
      handleDetalhar(selectedIds, 'True');
    }
  }, [selectedIds]);


  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);

    const updatedSelectedIds = isChecked ? dadosListaVendasPix.map(item => item.IDDETALHEFATURA) : [];
    setSelectedIds(updatedSelectedIds);

    if (updatedSelectedIds.length > 0) {
      handleDetalhar(updatedSelectedIds, 'True');
    }
  };




  const handleDetalhar = async (IDDETALHEFATURA) => {
    try {
      if (typeof IDDETALHEFATURA === 'string') {
        IDDETALHEFATURA = [IDDETALHEFATURA];
      }

      Swal.fire({
        title: 'Informe a Data de Compensação',
        html: '<input type="date" id="dtcompensacao" name="DTCompensacao" class="form-control" value="" >',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const dtCompensacao = document.getElementById('dtcompensacao').value;

          const dados = IDVENDA.map(id => ({
            "IDDETALHEFATURA": id,
            "STCONFERIDO": 'True',
            "DATA_COMPENSACAO": dtCompensacao
          }));

          await put("/atualizar-status-fatura-pix", dados);
          console.log('Dados: ', dados);

          const textdados = JSON.stringify(dados);
          const textoFuncao = 'FINANCEIRO/CONFIRMADA CONFERENCIA DA VENDA';
          const dadosConfirmaDep = [{
            "IDFUNCIONARIO": usuarioLogado.IDFUNCIONARIO,
            "PATHFUNCAO": textoFuncao,
            "DADOS": textdados,
            "IP": ipUsuario
          }];

          await post("/log-web", dadosConfirmaDep);
          Swal.fire('Sucesso!', 'Venda detalhada com sucesso.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log('Ação cancelada pelo usuário.');
        }
      });
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };


  return (

    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <h2>
                Lista de Vendas PIX Por Período<span className="fw-300"><i></i></span>
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
                    title="Vendas por PIX"
                    value={dadosListaVendasPix}
                    globalFilter={globalFilterValue}
                    size={size}
                    sortField="VRTOTALPAGO"
                    sortOrder={-1}
                    paginator={true}
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50, 100, dadosListaVendasPix.length]}
                    showGridlines
                    stripedRows
                    emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}

                  >

                    {colunasVendasPix.map(coluna => (
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
        </div>
      </div>

    </Fragment>
  )
}