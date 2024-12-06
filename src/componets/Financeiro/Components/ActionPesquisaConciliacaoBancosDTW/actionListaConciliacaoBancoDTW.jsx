import { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import Swal from "sweetalert2";
import { post, put } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { formatarDataDTW } from "../../../../utils/dataFormatada";
import { toFloat } from "../../../../utils/toFloat";


export const ActionListaConciliacaoBancoDTW = ({ dadosConciliarBanco, contaSelecionada }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();
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
    const response = await fetch('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Conciliação de Depósitos',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Loja', 'Conta Crédito', 'Conta Transitória', 'Data Depósito', 'Data Movimento', 'Banco', 'Valor', 'Doc.', 'Status', 'Situação']],
      body: dadosListaConciliarBanco.map(item => [
        item.NOFANTASIA, 
        item.CONTACREDITOSAP,
        item.contaTransitoriaSap,
        item.DTDEPOSITO, 
        item.DTMOVIMENTOCAIXA, 
        item.DSBANCO, 
        formatMoeda(item.VRDEPOSITO),  
        parseFloat(item.NUDOCDEPOSITO).toFixed(2), 
        item.STCANCELADO === 'False' ? 'Dep. Ativo' : 'Dep. Cancelado',
        item.STCONFERIDO === 'True' ? 'Conciliado' : 'Não Conciliado'
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('deposito_conciliacao_banco.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Loja', 'Conta Crédito', 'Conta Transitória', 'Data Depósito', 'Data Movimento', 'Banco', 'Valor', 'Doc.', 'Status', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'Loja' }, 
      { wpx: 100, caption: 'Conta Crédito' }, 
      { wpx: 100, caption: 'Conta Transitória' }, 
      { wpx: 150, caption: 'Data Depósito' }, 
      { wpx: 150, caption: 'Data Movimento' }, 
      { wpx: 150, caption: 'Banco' }, 
      { wpx: 100, caption: 'Valor' }, 
      { wpx: 150, caption: 'Doc' }, 
      { wpx: 100, caption: 'Status' }, 
      { wpx: 100, caption: 'Situação' }
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Conciliação de Depósitos');
    XLSX.writeFile(workbook, 'deposito_conciliacao_banco.xlsx');
  };

  const calcularValorDeposito = () => {
    let total = 0;
    for (let dados of dadosListaConciliarBanco) {
      if (dados.STCANCELADO === 'False') {
        total += parseFloat(dados.VRDEPOSITO)

      }
    }
    return total
  }

  const dadosExcel = dadosConciliarBanco.map((item) => {
    let contaTransitoriaSap = '';
   

    if (contaSelecionada === 43 || contaSelecionada === 218 || contaSelecionada === 58 || contaSelecionada === 10006 || contaSelecionada === 10018 || contaSelecionada === 10008) {
      contaTransitoriaSap = '1.01.01.01.0003';
    } else if (contaSelecionada === 3) {
      contaTransitoriaSap = '1.01.01.01.0004';
    } else if (contaSelecionada === 10023) {
      contaTransitoriaSap = '4.01.01.09.0004';
    } else if (contaSelecionada === 10) {
      contaTransitoriaSap = '1.01.01.01.0002';
    } 

    return {
      NOFANTASIA: item.NOFANTASIA,
      CONTACREDITOSAP: item.CONTACREDITOSAP,
      contaTransitoriaSap,
      DTDEPOSITO: formatarDataDTW(item.DTDEPOSITO),
      DTMOVIMENTOCAIXA: formatarDataDTW(item.DTMOVIMENTOCAIXA),
      DSBANCO: item.DSBANCO,
      VRDEPOSITO: item.VRDEPOSITO,
      NUDOCDEPOSITO: item.NUDOCDEPOSITO,
      STCANCELADO: item.STCANCELADO === 'False' ? 'Dep. Ativo' : 'Dep. Cancelado',
      STCONFERIDO: item.STCONFERIDO === 'True' ? 'Conciliado' : 'Não Conciliado'

  
    }
  })
  const dadosListaConciliarBanco = dadosConciliarBanco.map((item) => {
    let contaTransitoriaSap = '';
   

    if (contaSelecionada === 43 || contaSelecionada === 218 || contaSelecionada === 58 || contaSelecionada === 10006 || contaSelecionada === 10018 || contaSelecionada === 10008) {
      contaTransitoriaSap = '1.01.01.01.0003';
    } else if (contaSelecionada === 3) {
      contaTransitoriaSap = '1.01.01.01.0004';
    } else if (contaSelecionada === 10023) {
      contaTransitoriaSap = '4.01.01.09.0004';
    } else if (contaSelecionada === 10) {
      contaTransitoriaSap = '1.01.01.01.0002';
    } 

    return {
      NOFANTASIA: item.NOFANTASIA,
      CONTACREDITOSAP: item.CONTACREDITOSAP,
      contaTransitoriaSap,
      DTDEPOSITO: item.DTDEPOSITO,
      DTMOVIMENTOCAIXA: item.DTMOVIMENTOCAIXA,
      DSBANCO: item.DSBANCO,
      VRDEPOSITO: item.VRDEPOSITO,
      NUDOCDEPOSITO: item.NUDOCDEPOSITO,
      STCANCELADO: item.STCANCELADO,
      STCONFERIDO: item.STCONFERIDO,
      IDDEPOSITOLOJA: item.IDDEPOSITOLOJA,
      DTCOMPENSACAO: item.DTCOMPENSACAO,
  
    }
  })
 
  const colunasConciliarBanco = [
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <p style={{ color: '' }}>{row.NOFANTASIA}</p>,
      sortable: true
    },
    {
      field: 'CONTACREDITOSAP',
      header: 'Conta Crédito',
      body: row => <p style={{ color: '' }}>{row.CONTACREDITOSAP}</p>,
      sortable: true
    },
    {
      field: 'contaTransitoriaSap',
      header: 'Conta Transitória',
      body: row => <p style={{ color: '' }}>{row.contaTransitoriaSap}</p>,
      sortable: true
    },
    {
      field: 'DTDEPOSITO',
      header: 'Data Depósito',
      body: row => <p style={{ color: '' }}>{row.DTDEPOSITO}</p>,
      sortable: true
    },
    {
      field: 'DTMOVIMENTOCAIXA',
      header: 'Data Movimento',
      body: row => <p style={{ color: '' }}>{row.DTMOVIMENTOCAIXA}</p>,
      sortable: true
    },
    {
      field: 'DSBANCO',
      header: 'Banco',
      body: row => <p style={{ color: '' }}>{row.DSBANCO}</p>,
      footer: 'Total',
      sortable: true
    },
    {
      field: 'VRDEPOSITO',
      header: 'Valor',
      body: row => <p style={{ color: '' }}>{formatMoeda(row.VRDEPOSITO)}</p>,
      footer: formatMoeda(calcularValorDeposito()),
      sortable: true
    },
    {
      field: 'NUDOCDEPOSITO',
      header: 'Doc.',
      body: row => <p style={{ color: '' }}>{toFloat(row.NUDOCDEPOSITO)}</p>,
      sortable: true
    },
    {
      field: 'STCANCELADO',
      header: 'Status',
      body: row => (
        <p style={{ color: row.STCANCELADO === 'False' ? 'blue' : 'red' }}>
          {row.STCANCELADO === 'False' ? 'Dep. Ativo' : 'Dep. Cancelado'}
        </p>
      ),
    },
    {
      field: 'STCONFERIDO',
      header: 'Situação',
      body: row => (
        <p style={{ color: row.STCONFERIDO === 'True' ? 'green' : 'red' }}>
          {row.STCONFERIDO === 'True' ? 'Conciliado' : 'Não Conciliado'}
        </p>
      ),
    },
    {
      field: 'STCONFERIDO',
      header: 'Opções',
      button: true,

      body: (row) => {
        if (row.STCONFERIDO == 'True') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between" }}
            >
              <div className="p-1">
                <ButtonTable
                  titleButton={"Cancelar Conciliação"}
                  cor={"danger"}
                  Icon={BsTrash3}
                  iconSize={20}
                  onClickButton={() => handleClickCancelar(row)}
                />
              </div>
            </div>

          )
        }
      },
    },
  ]

  const handleCancelar = async (IDDEPOSITOLOJA) => {
    Swal.fire({
      title: 'Tem Certeza que Deseja Cancelar a Conciliação do Depósito?',
      text: 'Você não poderá reverter esta ação!',
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
            IDDEPOSITOLOJA: IDDEPOSITOLOJA,
    
          }
          const response = await put('/atualizar-deposito-loja', putData)
          console.log('response: ', putData)
          const textDados = JSON.stringify(putData)
          let textoFuncao = 'FINANCEIRO/CANCELADO CONCILIAÇÃO DO DEPOSITO';
       
          const postData = {  
            IDFUNCIONARIO: usuarioLogado.id,
            PATHFUNCAO:  textoFuncao,
            DADOS: textDados,
            IP: ipUsuario
          }
  
          const responsePost = await post('/logWeb', postData)
          console.log('responsePost: ', responsePost)
          Swal.fire({
            title: 'Cancelado', 
            text: 'Conciliação do Depósito cancelado com Sucesso', 
            icon: 'success'
          })
        } catch (error) {
          console.error('Erro ao buscar detalhes da venda: ', error);
        }
      }
    })
    
  }
  
  const handleClickCancelar = (row) => {
    if (row && row.IDDEPOSITOLOJA) {
      handleCancelar(row.IDDEPOSITOLOJA);
    }
  };

  return (

    <Fragment>

     
      <div className="card " style={{marginTop: "5rem"}}>
        <div className="panel-hdr">
          <h2>
            Lista de Depósitos <span class="fw-300"><i>Por Bancos</i> Pesquisa pela data do Depósito</span>
          </h2>
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
        <div ref={dataTableRef}>

          <DataTable
            title="Vendas por Loja"
            value={dadosListaConciliarBanco}
            size={size}
            globalFilter={globalFilterValue}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dadosListaConciliarBanco.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasConciliarBanco.map(coluna => (
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

