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
import { toFloat } from "../../../../utils/toFloat";

export const ActionListaConciliarPorBanco = ({ dadosConciliarBanco }) => {
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
      head: [['Loja', 'Data Compensação', 'Data Depósito', 'Data Movimento', 'Banco', 'Valor', 'Doc.', 'Status', 'Situação']],
      body: dadosListaConciliarBanco.map(item => [
        item.NOFANTASIA, 
        item.DTCOMPENSACAO, 
        item.DTDEPOSITO, 
        item.DTMOVIMENTOCAIXA, 
        item.DSBANCO, 
        formatMoeda(item.VRDEPOSITO),  
        parseFloat(item.NUDOCDEPOSITO).toFixed(2), 
        item.STCANCELADO, 
        item.STCONFERIDO
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('deposito_conciliacao_banco.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosListaConciliarBanco);
    const workbook = XLSX.utils.book_new();
    const header = ['Loja', 'Data Compensação', 'Data Depósito', 'Data Movimento', 'Banco', 'Valor', 'Doc.', 'Status', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'Loja' }, 
      { wpx: 150, caption: 'Data Compensação' }, 
      { wpx: 150, caption: 'Data Depósito' }, 
      { wpx: 150, caption: 'Data Movimento' }, 
      { wpx: 150, caption: 'Banco' }, 
      { wpx: 100, caption: 'Valor' }, 
      { wpx: 150, caption: 'Doc' }, 
      { wpx: 60, caption: 'Status' }, 
      { wpx: 60, caption: 'Situação' }
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

  const dadosListaConciliarBanco = dadosConciliarBanco.map((item) => {
   
    return {
      NOFANTASIA: item.NOFANTASIA,
      DTCOMPENSACAO: item.DTCOMPENSACAO,
      DTDEPOSITO: item.DTDEPOSITO,
      DTMOVIMENTOCAIXA: item.DTMOVIMENTOCAIXA,
      DSBANCO: item.DSBANCO,
      VRDEPOSITO: item.VRDEPOSITO,
      NUDOCDEPOSITO: toFloat(item.NUDOCDEPOSITO),
      STCANCELADO: item.STCANCELADO,
      STCONFERIDO: item.STCONFERIDO,
      IDDEPOSITOLOJA: item.IDDEPOSITOLOJA
      // DSCONTABANCO: item.DSCONTABANCO,
  
    }
  })

  const colunasConciliarBanco = [
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <th style={{ color: '' }}>{row.NOFANTASIA}</th>,
      sortable: true
    },
    {
      field: 'DTCOMPENSACAO',
      header: 'Data Compensação',
      body: row => <th style={{ color: '' }}>{row.DTCOMPENSACAO}</th>,
      sortable: true
    },
    {
      field: 'DTDEPOSITO',
      header: 'Data Depósito',
      body: row => <th style={{ color: '' }}>{row.DTDEPOSITO}</th>,
      sortable: true
    },
    {
      field: 'DTMOVIMENTOCAIXA',
      header: 'Data Movimento',
      body: row => <th style={{ color: '' }}>{row.DTMOVIMENTOCAIXA}</th>,
      sortable: true
    },
    {
      field: 'DSBANCO',
      header: 'Banco',
      body: row => <th style={{ color: '' }}>{row.DSBANCO}</th>,
      footer: 'Total',
      sortable: true
    },
    {
      field: 'VRDEPOSITO',
      header: 'Valor',
      body: row => <th style={{ color: '' }}>{formatMoeda(row.VRDEPOSITO)}</th>,
      footer: formatMoeda(calcularValorDeposito()),
      sortable: true
    },
    {
      field: 'NUDOCDEPOSITO',
      header: 'Doc.',
      body: row => <th style={{ color: '' }}>{toFloat(row.NUDOCDEPOSITO)}</th>,
      sortable: true
    },
    {
      field: 'STCANCELADO',
      header: 'Status',
      body: row => (
        <th style={{ color: row.STCANCELADO === 'False' ? 'blue' : 'red' }}>
          {row.STCANCELADO === 'False' ? 'Dep. Ativo' : 'Dep. Cancelado'}
        </th>
      ),
    },
    {
      field: 'STCONFERIDO',
      header: 'Situação',
      body: row => (
        <th style={{ color: row.STCONFERIDO === 'True' ? 'green' : 'red' }}>
          {row.STCONFERIDO === 'True' ? 'Conciliado' : 'Não Conciliado'}
        </th>
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
         
          const textDados = JSON.stringify(putData)
          let textoFuncao = 'FINANCEIRO/CANCELADO CONCILIAÇÃO DO DEPOSITO';
       
          const postData = {  
            IDFUNCIONARIO: usuarioLogado.id,
            PATHFUNCAO:  textoFuncao,
            DADOS: textDados,
            IP: ipUsuario
          }
  
          const responsePost = await post('/log-web', postData)
      
          Swal.fire({
            title: 'Cancelado', 
            text: 'Conciliação do Depósito cancelado com Sucesso', 
            icon: 'success'
          })

          return responsePost;
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


      <div className="panel">
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
      <div className="card" ref={dataTableRef}>

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

