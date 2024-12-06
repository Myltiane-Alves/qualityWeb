import { Fragment, useEffect, useRef, useState } from "react"
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { get, post, put } from "../../../../api/funcRequest";
import { ModalImprimirQuebra } from "../../Components/ModalImprimirQuebra";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ActionListaQuebraCaixaLoja = ({ dadosQuebraDeCaixa, handleClick, quebraSelecionada }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const handleCloseModal = () => setModalVisivel(false);
  const [dadosQuebraCaixasModal, setDadosQuebraCaixasModal] = useState([])
  const { register, handleSubmit, errors } = useForm();
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
      DTLANCAMENTO: item.DTLANCAMENTO,
      IDMOVIMENTOCAIXA: item.IDMOVIMENTOCAIXA,
      IDFUNCIONARIO: item.IDFUNCIONARIO,
      NOMEOPERADOR: item.NOMEOPERADOR,
      VRQUEBRASISTEMA: formatMoeda(item.VRQUEBRASISTEMA),
      VRQUEBRAEFETIVADO: formatMoeda(item.VRQUEBRAEFETIVADO),
      TXTHISTORICO: item.TXTHISTORICO,
      STATIVO: item.STATIVO ? "Ativo" : "Inativo"

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
      field: 'VRQUEBRASISTEMA',
      header: 'Vr Quebra Sistema',
      body: row => {
        if (row.VRQUEBRASISTEMA > 0) {
          return <th style={{ color: 'blue' }}>  {row.VRQUEBRASISTEMA}</th>
        } else {
          return <th style={{ color: 'red' }}>  {row.VRQUEBRASISTEMA}</th>
        }

      },
      sortable: true,
    },
    {
      field: 'VRQUEBRAEFETIVADO',
      header: 'Vr Quebra Lançado',
      body: row => {
        if (row.VRQUEBRAEFETIVADO > 0) {
          return <th style={{ color: 'blue' }}>  {row.VRQUEBRAEFETIVADO}</th>
        } else {
          return <th style={{ color: 'red' }}>  {row.VRQUEBRAEFETIVADO}</th>
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
                  onClickButton={() => handleClickCancelar(row.IDQUEBRACAIXA, false)}
                />

              </div>
              <div>
                <ButtonTable
                  titleButton={"Imprimir Quebra"}
                  cor={"primary"}
                  Icon={MdOutlineLocalPrintshop}
                  iconSize={18}
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
                onClickButton={() => handleClickCancelar(row.IDQUEBRACAIXA, true)}
              />

            </div>
          )
        }
      }

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
    if (row && row.IDQUEBRACAIXA) {
      handleImprimir(row.IDQUEBRACAIXA);
    }
  };


  
  const handleCancelar = async (IDQUEBRACAIXA, status) => {
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

  const handleClickCancelar = (row) => {
    if (row && row.IDQUEBRACAIXA) {
      handleCancelar(row.IDQUEBRACAIXA, row.STATIVO);
      
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
