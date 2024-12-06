import { Fragment, useEffect, useRef, useState } from "react"
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable"
import { formatMoeda } from "../../../../utils/formatMoeda"
import { dataFormatada } from "../../../../utils/dataFormatada"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaCheck } from "react-icons/fa"
import HeaderTable from "../../../Tables/headerTable"
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { post, put } from "../../../../api/funcRequest"
import { BsTrash3 } from "react-icons/bs"



export const ActionListaAdiantamentoSalarioLoja = ({ dadosAdiantamentoFuncionarios }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small')
  const dataTableRef = useRef();
  const navigate = useNavigate();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current ,
    documentTitle: 'Adiantamento Salarial das Lojas',

  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Empresa', 'Data Mov', 'Funcionário', 'CPF', 'Valor', 'Situação']],
      body: dadosAdiantamentos.map(item => [
        item.contador,
        item.NOFANTASIA,
        item.DTLANCAMENTO,
        item.NOFUNCIONARIO,
        item.NUCPF,
        formatMoeda(item.VRVALORDESCONTO),
        item.STATIVO === 'True' ? 'Ativo' : 'Cancelado',
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('adiantamento_salarial.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Empresa', 'Data Mov', 'Funcionário', 'CPF', 'Valor', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' },
      { wpx: 200, caption: 'Empresa' },
      { wpx: 100, caption: 'Data Mov' },
      { wpx: 250, caption: 'Funcionário' },
      { wpx: 100, caption: 'CPF' },
      { wpx: 100, caption: 'Valor' },
      { wpx: 100, caption: 'Situação' },
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Adiantamento Salarial das Lojas');
    XLSX.writeFile(workbook, 'adiantamento_salarial.xlsx');
  };


  const dadosExcel = Array.isArray(dadosAdiantamentoFuncionarios) ? dadosAdiantamentoFuncionarios.map((item, index) => {
    let contador = index + 1;
  
    return {
      contador,
      NOFANTASIA: item.NOFANTASIA,
      DTLANCAMENTO: item.DTLANCAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NUCPF: item.NUCPF,
      VRVALORDESCONTO: item.VRVALORDESCONTO,
      STATIVO: item.STATIVO === 'True' ? 'Ativo' : 'Cancelado',

    }
  }) : [];

  const dadosAdiantamentos = Array.isArray(dadosAdiantamentoFuncionarios) ? dadosAdiantamentoFuncionarios.map((item, index) => {
    let contador = index + 1;
  
    return {
      contador,
      NOFANTASIA: item.NOFANTASIA,
      DTLANCAMENTO: item.DTLANCAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NUCPF: item.NUCPF,
      VRVALORDESCONTO: item.VRVALORDESCONTO,
      STATIVO: item.STATIVO,
      IDADIANTAMENTOSALARIO: item.IDADIANTAMENTOSALARIO,
    }
  }) : [];

  const calcularTotal = (field, condition = null) => {
    return dadosAdiantamentos.reduce((total, item) => {
      if (condition && !condition(item)) {
        return total;
      }
      return total + parseFloat(item[field]);
    }, 0);
  };
  
  const calcularTotalValorDesconto = () => {
    const total = calcularTotal('VRVALORDESCONTO', item => item.STATIVO === 'True');
    return total;
  };

  
  const colunasAdiantamentos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <p style={{ color: 'blue' }}>{row.contador}</p>,
      sortable: true,
      width: "10%"
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => <p style={{ color: 'blue' }}>{row.NOFANTASIA}</p>,
      sortable: true,
      width: "10%"
    },
    {
      field: 'DTLANCAMENTO',
      header: 'Data Mov',
      body: row => <p style={{ color: 'blue' }}>{dataFormatada(row.DTLANCAMENTO)}</p>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Funcionário',
      body: row => <p style={{ color: 'blue' }}>{row.NOFUNCIONARIO}</p>,
      sortable: true,
    },
    {
      field: 'NUCPF',
      header: 'CPF',
      body: row => <p style={{ color: 'blue' }}>{row.NUCPF}</p>,
      footer: 'Total Lançamentos',
      sortable: true,
    },
    {
      field: 'VRVALORDESCONTO',
      header: 'Valor',
      body: row => <p style={{ color: 'blue' }}>{formatMoeda(row.VRVALORDESCONTO)}</p>,
      footer: () => <p> {formatMoeda(calcularTotalValorDesconto())} </p> , 
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => (
        <div style={{ color: row.STATIVO === 'True' ? 'blue' : 'red' }}>
          {row.STATIVO === 'True' ? 'Ativo' : 'Cancelado'}
        </div>
      ),
    },
    {
      field: 'STATIVO',
      header: 'Opções',
      button: true,

      body: (row) => {
        if (row.STATIVO == 'True') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between" }}
            >
              <div className="p-1">
                <ButtonTable
                  titleButton={"Cancelar Adiantamento"}
                  cor={"danger"}
                  Icon={BsTrash3}
                  iconSize={18}
                  onClickButton={() => handleClickAtivar(row.IDADIANTAMENTOSALARIO, false)}
                />
              </div>
            </div>

          )
        } else {
          return (

            <div className="p-1 "
              style={{ justifyContent: "space-between" }}
            >
              <div className="p-1">
                <ButtonTable
                  titleButton={"Ativar Adiantamento"}
                  cor={"success"}
                  Icon={FaCheck}
                  iconSize={18}
                  onClickButton={() => handleClickAtivar(row.IDADIANTAMENTOSALARIO, true)}
                />
              </div>
            </div>
          )

        }
      },
    },
  ]

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
    if(response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }


  const handleAtivar = async (IDADIANTAMENTOSALARIO, status) => {
    Swal.fire({
      title: `Tem Certeza que Deseja ${status ? 'Ativar' : 'Cancelar'} o Adiantamento?`,
      text: 'Você não poderá reverter a ação!',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger',
        loader: 'custom-loader'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const putData = {  
            IDADIANTAMENTOSALARIO: IDADIANTAMENTOSALARIO,
            STATIVO: status ? 'True' : 'False'
          }
          const response = await put('/atualizacao-adiantamento-status', putData)
          const textDados = JSON.stringify(putData)
          let textoFuncao = status ? 'FINANCEIRO/ATIVADO O ADIANTAMENTO SALARIAL' : 'FINANCEIRO/CANCELADO O ADIANTAMENTO SALARIAL';

          const postData = {  
            IDFUNCIONARIO: usuarioLogado.id,
            PATHFUNCAO:  textoFuncao,
            DADOS: textDados,
            IP: ipUsuario
          }
  
          const responsePost = await post('/log-web', postData)

          Swal.fire({
            title: status ? 'Ativado' : 'Cancelado',
            text: `Adiantamento ${status ? 'ativado' : 'cancelado'} com Sucesso`,
            icon: 'success'
          });

          return responsePost;
        } catch (error) {
          Swal.fire({
            title: status ? 'Ativado' : 'Cancelado',
            text: `Adiantamento ${status ? 'ativado' : 'cancelado'} com Sucesso`,
            icon: 'success'
          });
        }
      }
    })
  }
  
  const handleClickAtivar = (row) => {
    if (row && row.IDADIANTAMENTOSALARIO) {
      handleAtivar(row.IDADIANTAMENTOSALARIO, row.STATIVO);
    }
  };

  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2>Adiantamento Salarial das Lojas</h2>
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <HeaderTable
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            handlePrint={() =>handlePrint(dadosAdiantamentos.length)}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
          />
        </div>
        <div className="card" ref={dataTableRef}>

          <DataTable
            title="Vendas por Loja"
            value={dadosAdiantamentos}
            globalFilter={globalFilterValue}
            size={size}
            sortField="VRTOTALPAGO"
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50, 100, dadosAdiantamentos.length  ]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasAdiantamentos.map(coluna => (
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