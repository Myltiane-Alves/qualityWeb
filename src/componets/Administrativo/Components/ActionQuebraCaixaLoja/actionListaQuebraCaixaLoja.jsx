import { Fragment, useEffect, useRef, useState } from "react"
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { get, post, put } from "../../../../api/funcRequest";
import { ModalImprimirQuebra } from "../../Components/ModalImprimirQuebra";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mascaraValor } from "../../../../utils/mascaraValor";
import { toFloat } from "../../../../utils/toFloat";


export const ActionListaQuebraCaixaLoja = ({ dadosQuebraDeCaixa, handleClick, quebraSelecionada, optionsModulos, usuarioLogado }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const handleCloseModal = () => setModalVisivel(false);
  const [dadosQuebraCaixasModal, setDadosQuebraCaixasModal] = useState([])
  // const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small')
  const dataTableRef = useRef();
  const navigate = useNavigate();
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista Quebra de Caixas',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'DT Lançamento', 'Nº Mov', 'Matrícula', 'Colaborador', 'Vr. Quebra Sistema', 'Vr. Quebra Lançado', 'Historíco', 'Situação']],
      body: dados.map(item => [
        item.IDQUEBRACAIXA,
        item.DTLANCAMENTO,
        item.IDMOVIMENTOCAIXA,
        item.IDFUNCIONARIO,
        item.NOMEOPERADOR,
        item.VRQUEBRASISTEMA,
        item.VRQUEBRAEFETIVADO,
        item.TXTHISTORICO,
        item.STATIVO
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('quebra_caixa_loja.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['ID', 'DT Lançamento', 'Nº Mov', 'Matrícula', 'Colaborador', 'Vr. Quebra Sistema', 'Vr. Quebra Lançado', 'Historíco', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'ID' }, 
      { wpx: 100, caption: 'DT Lançamento' },
      { wpx: 150, caption: 'Nº Mov' },
      { wpx: 100, caption: 'Matrícula' },
      { wpx: 150, caption: 'Colaborador' },
      { wpx: 100, caption: 'Vr. Quebra Sistema' },
      { wpx: 100, caption: 'Vr. Quebra Lançado' },
      { wpx: 150, caption: 'Historíco' },
      { wpx: 100, caption: 'Situação' }
      
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista Quebra de Caixas');
    XLSX.writeFile(workbook, 'quebra_caixa_loja.xlsx');
  };

  const dados = dadosQuebraDeCaixa.map((item) => {
    return {
      IDQUEBRACAIXA: item.IDQUEBRACAIXA,
      NOFANTASIA: item.NOFANTASIA,
      DTLANCAMENTO: item.DTLANCAMENTO,
      IDMOVIMENTOCAIXA: item.IDMOVIMENTOCAIXA,
      IDFUNCIONARIO: item.IDFUNCIONARIO,
      NOMEOPERADOR: item.NOMEOPERADOR,
      CPFOPERADOR: item.CPFOPERADOR,
      VRQUEBRASISTEMA: toFloat(item.VRQUEBRASISTEMA),
      VRQUEBRAEFETIVADO: toFloat(item.VRQUEBRAEFETIVADO),
      TXTHISTORICO: item.TXTHISTORICO,
      STATIVO: item.STATIVO 

    }
  });

  const colunasQuebraDeCaixa = [
    {
      field: 'IDQUEBRACAIXA',
      header: 'ID',
      body: row => <th style={{ }}>{row.IDQUEBRACAIXA}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Empresa',
      body: row => <p style={{width: '200px', fontWeight: 600, margin: '0px' }}>{row.NOFANTASIA}</p>,
      sortable: true,
    },
    {
      field: 'DTLANCAMENTO',
      header: 'DT Lançamento',
      body: row => <th style={{ }}>{row.DTLANCAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'IDMOVIMENTOCAIXA',
      header: 'Nº Movimento',
      body: row => <th style={{ }}>{row.IDMOVIMENTOCAIXA}</th>,
      sortable: true,

    },
    {
      field: 'IDFUNCIONARIO',
      header: 'Nº Matrícula',
      body: row => <th style={{ }}>{row.IDFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      field: 'NOMEOPERADOR',
      header: 'Colaborador',
      body: row => <th style={{ }}>{row.NOMEOPERADOR}</th>,
      sortable: true,
    },
    {
      field: 'CPFOPERADOR',
      header: 'CPF',
      body: row => <th style={{ }}>{row.CPFOPERADOR}</th>,
      sortable: true,
    },
    {
      field: 'VRQUEBRASISTEMA',
      header: 'Vr Quebra Sistema',
      body: row => {
        if (parseFloat(row.VRQUEBRASISTEMA) > 0) {
          return <th style={{ color: 'blue' }}> + {mascaraValor(row.VRQUEBRASISTEMA)}</th>
        } else {
          return <th style={{ color: 'red' }}> - {mascaraValor(row.VRQUEBRASISTEMA)}</th>
        }

      },
      sortable: true,
    },
    {
      field: 'VRQUEBRAEFETIVADO',
      header: 'Vr Quebra Lançado',
      body: row => {
        if (row.VRQUEBRAEFETIVADO > 0) {
          return <th style={{ color: 'blue' }}> + {mascaraValor(row.VRQUEBRAEFETIVADO)}</th>
        } else {
          return <th style={{ color: 'red' }}> - {mascaraValor(row.VRQUEBRAEFETIVADO)}</th>
        }
      },
      sortable: true,
    },
    {
      field: 'TXTHISTORICO',
      header: 'Histórico',
      body: row => <th style={{ }}>{row.TXTHISTORICO}</th>,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: (row) => <th style={{ color: row.STATIVO == "True" ? 'blue' : 'red' }}>{row.STATIVO == "True" ? "Ativo" : "Inativo"}</th>,
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Opções',
      body: (row) => {
        if (row.STATIVO == 'True') {
          return (

            <div className="d-flex "
              style={{ justifyContent: "space-between" }}
            >
              <div className="mr-2">
                <ButtonTable
                  titleButton={"Cancelar Quebra"}
                  cor={"danger"}
                  Icon={FaRegTrashAlt}
                  iconSize={18}
                  width="35px"
                  height="35px"
                  onClickButton={() => handleClickCancelar(row.IDQUEBRACAIXA, false)}
                />

              </div>
              <div>
                <ButtonTable
                  titleButton={"Imprimir Quebra"}
                  cor={"primary"}
                  Icon={MdOutlineLocalPrintshop}
                  iconSize={18}
                  width="35px"
                  height="35px"
                  onClickButton={() => handleClickImprimir(row)}
                />

              </div>

            </div>
          )
        } else {
          return (

            <div>
              <ButtonTable
                titleButton={"Ativar Quebra"}
                cor={"success"}
                Icon={FaCheck}
                iconSize={18}
                width="35px"
                height="35px"
                onClickButton={() => handleClickCancelar(row.IDQUEBRACAIXA, true)}
              />

            </div>
          )
        }
      }

    },
  ]

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



  const handleImprimir = async (IDQUEBRACAIXA) => {
    try {
      const response = await get(`/quebraCaixaQuebraCaixa?idQuebraCaixa=${IDQUEBRACAIXA}`);
      if (response.data && response.data.length > 0) {
        setDadosQuebraCaixasModal(response.data);
        setModalVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickImprimir = (row) => {
    if(optionsModulos[0]?.ALTERAR == 'True') {
      if (row && row.IDQUEBRACAIXA) {
        handleImprimir(row.IDQUEBRACAIXA);
      }

    } else {
      Swal.fire({
        title: 'Acesso Negado',
        text: 'Você não tem permissão para acessar esta funcionalidade.',
        icon: 'warning',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
    }
  };


  
  const handleCancelar = async (IDQUEBRACAIXA, status) => {
    if(optionsModulos[0]?.ALTERAR == 'False') {
      Swal.fire({
        title: 'Acesso Negado',
        text: 'Você não tem permissão para acessar esta funcionalidade.',
        icon: 'warning',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
      return;
    }
    const putData = {  
      IDQUEBRACAIXA: IDQUEBRACAIXA,
      STATIVO: status ? 'True' : 'False'
    }
    try {
      const response = await put('/atualizar-status-quebra', putData)
      Swal.fire({
        title: 'Sucesso',
        text: `Quebra de Caixa ${status ? 'Ativada' : 'Cancelada'} com Sucesso`,
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      const textDados = JSON.stringify(putData)
      let textoFuncao = status ? 'FINANCEIRO/ATIVADO QUEBRA DE CAIXA' : 'FINANCEIRO/CANCELAMENTO DE QUEBRA DE CAIXA';

    
  
      const postData = {  
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO:  textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', postData)
      handleClick();
      return responsePost.data;

    } catch (error) {
      Swal.fire({
        title: 'Erro',
        text: `Erro ao Tentar ${status ? 'Ativar' : 'Cancelar'} a Quebra de Caixa`,
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
    }
    
  }

  const handleClickCancelar = (IDQUEBRACAIXA, status) => {
    if (IDQUEBRACAIXA) {
      handleCancelar(IDQUEBRACAIXA, status);
    }
  };
  
  
  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista de Quebra de Caixa</h2>
       
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
            title="Quebra de Caixa das Lojas"
            value={dados}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50, 100, dados.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado negativa</div>}
          >
            {colunasQuebraDeCaixa.map(coluna => (
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

      <ModalImprimirQuebra
        show={modalVisivel}
        handleClose={handleCloseModal}
        dadosQuebraCaixasModal={dadosQuebraCaixasModal}
      />
    </Fragment>
  )
}
