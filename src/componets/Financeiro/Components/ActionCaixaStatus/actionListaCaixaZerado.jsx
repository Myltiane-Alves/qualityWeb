import { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable"
import { MdClose } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { getDataAtual } from "../../../../utils/dataAtual";
import { post, put } from "../../../../api/funcRequest";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";

export const ActionListaCaixaZerado = ({ dadosCaixaZerados }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [dataAtualFormatada, setDataAtualFormatada] = useState('');
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size] = useState('small')
  const dataTableRef = useRef();
  const navigate = useNavigate();
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista Caixas Zerados',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Loja', 'Nº Mov', 'Caixa', 'Dt. Abertura', 'Dt. Fechamneto', 'Operador', 'Status', 'Conferido']],
      body: dadosListaCaixaZerados.map(item => [
        item.contador, 
        item.NOFANTASIA, 
        item.IDMOVIMENTO,
        item.DSCAIXAFECHAMENTO, 
        item.DTHORAABERTURACAIXA, 
        item.DTHORAFECHAMENTOCAIXA, 
        item.OPERADORFECHAMENTO, 
        item.STFECHADO, 
        item.STCONFERIDO 
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('caixas_zerados.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosListaCaixaZerados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Loja', 'Caixa', 'Dt. Abertura', 'Dt. Fechamneto', 'Operador', 'Status', 'Conferido', 'Valor Quebra'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' }, 
      { wpx: 200, caption: 'Loja' },
      { wpx: 100, caption: 'Caixa' },
      { wpx: 150, caption: 'Dt. Abertura' },
      { wpx: 150, caption: 'Dt. Fechamneto' },
      { wpx: 200, caption: 'Operador' },
      { wpx: 50, caption: 'Status' },
      { wpx: 80, caption: 'Conferido' },
      { wpx: 100, caption: 'Valor Quebra' },   
      
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista Caixas Zerados');
    XLSX.writeFile(workbook, 'caixas_zerados.xlsx');
  };

  const dadosListaCaixaZerados = Array.isArray(dadosCaixaZerados) ? dadosCaixaZerados.map((item, index) => {
    let contador = index + 1;
    return {
      contador,
      NOFANTASIA: item.NOFANTASIA,
      IDMOVIMENTO: item.IDMOVIMENTO,
      DSCAIXAFECHAMENTO: item.DSCAIXAFECHAMENTO,
      DTHORAABERTURACAIXA: item.DTHORAABERTURACAIXA,
      DTHORAFECHAMENTOCAIXA: item.DTHORAFECHAMENTOCAIXA,
      OPERADORFECHAMENTO: item.OPERADORFECHAMENTO,
      STFECHADO: item.STFECHADO,
      STCONFERIDO: item.STCONFERIDO,
    }
  }): [];

  const colunasCaixaZerados = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => row.NOFANTASIA,
      sortable: true,
    },
    {
      field: 'IDMOVIMENTO',
      header: 'Nº Movimento',
      body: row => row.IDMOVIMENTO,
      sortable: true,
    },
    {
      field: 'DSCAIXAFECHAMENTO',
      header: 'Caixa',
      body: row => row.DSCAIXAFECHAMENTO,
      sortable: true,
    },
    {
      field: 'DTHORAABERTURACAIXA',
      header: 'Data Abertura',
      body: row => row.DTHORAABERTURACAIXA,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTOCAIXA',
      header: 'Data Fechamento',
      body: row => row.DTHORAFECHAMENTOCAIXA,
      sortable: true,
    },
    {
      field: 'OPERADORFECHAMENTO',
      header: 'Operador',
      body: row => row.OPERADORFECHAMENTO,
      sortable: true,
    },
    {
      field: 'STFECHADO',
      header: 'Status',
      body: row => <p style={{ color: row.STFECHADO === 'True' ? 'red' : 'blue' }}>{row.STFECHADO === 'True' ? 'Fechado' : 'Aberto'}</p>,
      sortable: true,
    },
    {
      field: 'STCONFERIDO',
      header: 'Conferido',
      body: row => <p style={{ color: row.STCONFERIDO > 0 ? 'blue' : 'black' }}>{row.STCONFERIDO > 0 ? 'Conferido' : 'Sem Conferir'}</p>,
      sortable: true,
    },
    {
      field: 'IDMOVIMENTO',
      header: 'Opções',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Fechar Caixa"}
              cor={"danger"}
              Icon={MdClose}
              iconSize={20}
              onClickButton={() => handleClickCancelar(row)}
            />
          </div>
        )
      },
      sortable: true,
    },
  ]

  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataAtualFormatada(dataAtual);
  }, []);

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

  const handleCancelar = async (IDMOVIMENTO) => {
    try {
      const putData = {
        ID: IDMOVIMENTO
      }
      const response = await put('/fechar-caixas-zerados', putData)
      .then(response => {

        console.log(response, 'caixa fechado com sucesso no front end!')
      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Caixa Fechado com sucesso!',
        showConfirmButton: false,
        timer: 15000
      })

      const textDados = JSON.stringify(putData)
      let textoFuncao = 'FINANCEIRO/FECHAMENTO DE CAIXAS ZERADOS';

      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      .catch(error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      })
  
      const responsePost = await post('/log-web', postData)

      return responsePost;
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }

  }

  const handleClickCancelar = (row) => {
    if (row && row.IDMOVIMENTO) {
      handleCancelar(row.IDMOVIMENTO);
    }
  };

  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h1>
            Lista Caixas Zerados
          </h1>
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
            title="Lista de Caixas Zerados"
            value={dadosListaCaixaZerados}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasCaixaZerados.map(coluna => (
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

