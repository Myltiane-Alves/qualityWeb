import { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { FaCheck, FaMinus } from "react-icons/fa";
import { post, put } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

export const ActionListaProduto = ({ dadosColetorBalanco, empresaSelecionada, quantidade }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [ipUsuario, setIpUsuario] = useState('')
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const navigate = useNavigate();
  const dataTableRef = useRef();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  }

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Produtos',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Produto', 'Cod. Barra', 'Descrição', 'R$ Custo', 'R$ Venda']],
      body: dados.map(item => [
        item.IDPRODUTO,
        item.NUCODBARRAS,
        item.DSNOME,
        formatMoeda(item.PRECOCUSTO),
        formatMoeda(item.PRECOVENDA)
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('lista_produtos.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Produto',  'Cod. Barra', 'Descrição', 'R$ Custo', 'R$ Venda'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Produto' },
      { wpx: 100, caption: 'Cod. Barras'},
      { wpx: 250, caption: 'Descrição'},
      { wpx: 100, caption: 'R$ Venda'},
      { wpx: 100, caption: 'R$ Custo'}
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Produtos');
    XLSX.writeFile(workbook, 'lista_produtos.xlsx');
  };

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



  const dados = dadosColetorBalanco.map((item) => {
    let listarDetalheBalanco = 1;
    return {
      IDPRODUTO: item.IDPRODUTO,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      PRECOCUSTO: parseFloat(item.PRECOCUSTO),
      PRECOVENDA: item.PRECOVENDA,
      TOTALCONTAGEMGERAL: item.TOTALCONTAGEMGERAL,
      listarDetalheBalanco: listarDetalheBalanco,
    }
  });

  const colunasVendas = [

    {
      field: 'IDPRODUTO',
      header: 'Produto',
      body: row => <th> {row.IDPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cód. Barras',
      body: row => <th> {row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Descrição',
      body: row => <th> {row.DSNOME}</th>,
      sortable: true,
    },
    {
      field: 'PRECOCUSTO',
      header: 'R$ Custo',
      body: row => <th> {formatMoeda(row.PRECOCUSTO)}</th>,
      sortable: true,
    },
    {
      field: 'PRECOVENDA',
      header: 'R$ Venda',
      body: row => <th> {formatMoeda(row.PRECOVENDA)}</th>,
      sortable: true,
    },
    {
      header: 'Opções',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      body: (row) => {
        const itemQuantidade = quantidade
        return (
          <div className="d-flex "
            style={{ justifyContent: "space-between" }}
          >
            <form onSubmit={handleSubmit(() => onSubmit(quantidade))}>
              <ButtonTable
                // type={"submit"}
                onClickButton={() => { onSubmit(row.IDPRODUTO, itemQuantidade) }}
                titleButton={"Confirmar"}
                Icon={FaCheck}
                cor={"success"}
                iconSize={20}
              />
            </form>
          </div>

        )
      },
    },
  ]

  const onSubmit = async (IDPRODUTO, quantidade) => {
    if (parseInt(dadosColetorBalanco.length) === 0) {

      const createData = {
        TOTALCONTAGEMGERAL: quantidade,
        IDEMPRESA: dadosColetorBalanco[0].IDEMPRESA,
        NUMEROCOLETOR: usuarioLogado.id,
        IDPRODUTO: IDPRODUTO,
        DSCOLETOR: usuarioLogado.nome,
        CODIGODEBARRAS: dadosColetorBalanco[0].NUCODBARRAS,
        DSPRODUTO: dadosColetorBalanco[0].DSNOME,
        PRECOCUSTO: dadosColetorBalanco[0].PRECOCUSTO,
        PRECOVENDA: dadosColetorBalanco[0].PRECOVENDA,
        STCANCELADO: 'False',
        INSBALANCO: parseInt(0),
      }
      const response = await post('/criar-detalhe-balanco-avulso', createData)
      console.log(createData, 'createData')
      const textDados = JSON.stringify(createData)
      let textoFuncao = 'ADMINISTRATIVO/CADASTRO BALANÇO AVULSO';


      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', postData)

      Swal.fire({
        title: 'Sucesso',
        text: 'Cadastro Realizado com Sucesso',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal',
        }
      })

      return responsePost.data;
    } else {
      const putData = {
        TOTALCONTAGEMGERAL: quantidade,
        IDEMPRESA: empresaSelecionada,
        NUMEROCOLETOR: usuarioLogado.id,
        IDPRODUTO: dadosColetorBalanco[0].IDPRODUTO,
        DSCOLETOR: 'COLETOR WEB - ' + usuarioLogado.NOFUNCIONARIO,

      }
      const response = await put('/detalhe-balanco-avulso/:id', putData)

      const textDados = JSON.stringify(putData)
      let textoFuncao = 'ADMINISTRATIVO/ALTERAR BALANÇO AVULSO';


      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      Swal.fire({
        title: 'Sucesso',
        text: 'Alteração Realizada com Sucesso',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal',
        }
      })

      const responsePost = await post('/log-web', postData)

      return responsePost.data;
    }


  }



  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h2> Lista de Produtos </h2>
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
            title="Lista de Produtos"
            value={dados}
            sortOrder={-1}
            paginator={true}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            first={first}
            rows={rows}
            onPage={onPageChange}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendas.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}

                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#6e4e9e", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>
    </Fragment>
  )
}
