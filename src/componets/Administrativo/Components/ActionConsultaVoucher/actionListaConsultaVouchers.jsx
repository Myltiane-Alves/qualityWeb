import React, { Fragment, useRef, useState } from "react"
import Swal from 'sweetalert2'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import { ActionDetalharModal } from "./actionDetalharModal";
import { ActionEditarStatusVoucherModal } from "./actionEditarStatusVoucherModal";
import { get, post } from "../../../../api/funcRequest";
import { ActionImprimirVoucherModal } from "./actionImprimirVoucherModal";
import { dataFormatada } from "../../../../utils/dataFormatada";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';


export const ActionListaConsultaVouchers = ({dadosVoucher}) => {
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);

  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [usuarioAutorizado, setUsuarioAutorizado] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [dadosEditarVoucher, setDadosEditarVoucher] = useState([])
  const [modalEditarVoucher, setModalEditarVoucher] = useState(false);

  const [dadosDetalheVoucher, setDadosDetalheVoucher] = useState([])
  const [modalDetalhe, setModalDetalhe] = useState(false);

  const [modalImprimirVoucher, setModalImprimirVoucher] = useState(false);
  const [dadosImprimirVoucher, setDadosImprimirVoucher] = useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Estoque Atual',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'ID Loja', 'Loja','ID Produto', 'Cod. Barra', 'Produto', 'Fornecedor', 'Estoque', 'Custo', 'Venda', 'Total Custo', 'Total Venda', 'Markup %']],
      body: dados.map(item => [
        item.contador,
        item.IDEMPRESA,
        item.NOFANTASIA,
        item.IDPRODUTO,
        item.SKUVTEX,
        item.NUCODBARRAS,
        item.DSPRODUTO,
        item.IDRAZAO_SOCIAL_FORNECEDOR,
        item.RAZAO_SOCIAL_FORNECEDOR,
        item.QTDFINAL,
        item.PRECOCUSTO,
        item.PRECOVENDA,
        item.totalCusto,
        item.totalVenda,
        formatarPorcentagem(item.markup),
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('estoque_atual.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'ID Loja', 'Loja', 'ID Produto', 'SKU Vtex', 'Cod. Barra', 'Produto', 'Fornecedor', 'Estoque', 'Custo', 'Venda', 'Total Custo', 'Total Venda', 'Markup %'];
    worksheet['!cols'] = [
      { wpx: 50, caption: 'Nº' }, 
      { wpx: 50, caption: 'ID Loja' },
      { wpx: 150, caption: 'Loja' },
      { wpx: 100, caption: 'ID Produto' },
      { wpx: 100, caption: 'SKU Vtex' },
      { wpx: 100, caption: 'Cod. Barra' },
      { wpx: 200, caption: 'Produto' },
      { wpx: 150, caption: 'Fornecedor' },
      { wpx: 50, caption: 'Estoque' },
      { wpx: 100, caption: 'Custo' },
      { wpx: 100, caption: 'Venda' },
      { wpx: 100, caption: 'Total Custo' },
      { wpx: 100, caption: 'Total Venda' },
      { wpx: 50, caption: 'Markup %' },
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estoque Atual');
    XLSX.writeFile(workbook, 'estoque_atual.xlsx');
  };


  const dados = dadosVoucher.map((item, index) => {
    let contador = index + 1;

  //  console.log(item, 'item')
    return {
      IDVOUCHER: item.voucher.IDVOUCHER,
      IDEMPRESAORIGEM: item.voucher.IDEMPRESAORIGEM,
      DTINVOUCHER: item.voucher.DTINVOUCHER,
      DTOUTVOUCHER: item.voucher.DTOUTVOUCHER,
      DSCAIXAORIGEM: item.voucher.DSCAIXAORIGEM,
      IDUSRLIBERACAOCRIACAO: item.voucher.IDUSRLIBERACAOCRIACAO,
      NOFUNCIONARIOLIBERACAOCRIACAO: item.voucher.NOFUNCIONARIOLIBERACAOCRIACAO,
      DSCAIXADESTINO: item.voucher.DSCAIXADESTINO,
      IDUSRLIBERACAOCONSUMO: item.voucher.IDUSRLIBERACAOCONSUMO,
      NOFUNCIONARIOLIBERACAOCONSUMO: item.voucher.NOFUNCIONARIOLIBERACAOCONSUMO,
      NUVOUCHER: item.voucher.NUVOUCHER,
      VRVOUCHER: item.voucher.VRVOUCHER,
      STATIVO: item.voucher.STATIVO,
      STCANCELADO: item.voucher.STCANCELADO,
      STSTATUS: item.voucher.STSTATUS,
      EMPORIGEM: item.voucher.EMPORIGEM,
      EMPDESTINO: item.voucher.EMPDESTINO,
      

      DSMOTIVOCANCELAMENTO: item.voucher.DSMOTIVOCANCELAMENTO,
      MOTIVOTROCA: item.voucher.MOTIVOTROCA, 
      IDRESUMOVENDAWEBDESTINO: item.voucher.IDRESUMOVENDAWEBDESTINO,
      IDRESUMOVENDAWEB: item.voucher.IDRESUMOVENDAWEB,
      NUCPFCNPJ: item.voucher.NUCPFCNPJ,
      // DSNOMERAZAOSOCIAL: item.voucher.DSNOMERAZAOSOCIAL,

      // NUCODBARRAS: item.detalhevoucher[0].det.NUCODBARRAS,
      // DSPRODUTO: item.detalhevoucher[0].det.DSPRODUTO,
      // QTD: item.detalhevoucher[0].det.QTD,
      // VRTOTALLIQUIDO: item.detalhevoucher[0].det.VRTOTALLIQUIDO,

      contador
    }
  });

  const colunasVouchers = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{color: 'blue'}}>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'NUVOUCHER',
      header: 'Nº Voucher',
      // body: row => <th style={{color: 'blue'}}>{ocultaParteDosDadosVoucher(row.NUVOUCHER)}</th>,
      body: row => <th style={{color: 'blue'}}>{row.NUVOUCHER}</th>,
      sortable: true,
    },
    {
      field: 'EMPORIGEM',
      header: 'Loja Emissor',
      body: row => <th style={{color: 'blue'}}>{row.EMPORIGEM}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXAORIGEM',
      header: 'Caixa Emissor',
      body: row => <th style={{color: 'blue'}}>{row.DSCAIXAORIGEM ? 'CAIXA WEB' : 'CAIXA WEB'}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIOLIBERACAOCRIACAO',
      header: 'Aut. Criação',
      body: row => <th style={{color: 'blue'}}>{row.NOFUNCIONARIOLIBERACAOCRIACAO}</th>,
      sortable: true,
    },
    {
      field: 'DTINVOUCHER',
      header: 'Data Emissaõ',
      body: row => <th style={{color: 'blue'}}>{dataFormatada(row.DTINVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'VRVOUCHER',
      header: 'Valor',
      body: row => <th style={{color: 'green'}}>{formatMoeda(row.VRVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'EMPDESTINO',
      header: 'Loja Recebido',
      body: row => <th style={{color: 'blue'}}>{row.EMPDESTINO}</th>,
      sortable: true,
    },
    {
      field: 'DSCAIXADESTINO',
      header: 'Caixa Recebido',
      body: row => <th style={{color: 'blue'}}>{row.DSCAIXADESTINO}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIOLIBERACAOCONSUMO',
      header: 'Aut. Consumo',
      body: row => <th style={{color: 'blue'}}>{row.NOFUNCIONARIOLIBERACAOCONSUMO}</th>,
      sortable: true,
    },
    {
      field: 'DTOUTVOUCHER',
      header: 'Data Recebido',
      body: row => <th style={{color: 'blue'}}>{dataFormatada(row.DTOUTVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'STSTATUS',
      header: 'Situação',
      body: row => {
        if(row.STATIVO == 'True' && !row.STSTATUS) {
          return (
            <th style={{color: 'blue'}}>NOVO</th>
          )
        } else if(row.STATIVO == 'False' && !row.STSTATUS) {
          return (
            <th style={{color: 'red'}} >FINALIZADO</th>
          )
        } else if(row.STATIVO == 'True' && (row.STSTATUS == 'LIBERADO PARA O CLIENTE' || row.STSTATUS == 'NOVO')) {
          return (
            <th style={{color: 'green'}}>{row.STSTATUS == 'LIBERADO PARA O CLIENTE' || row.STSTATUS == 'NOVO'}</th>
          )
        } else if(row.STATIVO == 'False' && (row.STSTATUS == 'NEGADO' || row.STSTATUS == 'CANCELADO' || row.STSTATUS == 'FINALIZADO')) {
          return (
            <th style={{color: 'red'}}>{row.STSTATUS == 'NEGADO' || row.STSTATUS == 'CANCELADO' || row.STSTATUS == 'FINALIZADO'}</th>
          )

        } else if(row.STATIVO == 'True' && row.STSTATUS == 'EM ANALISE') {
          return (
            <th style={{color: 'blue'}}> EM ANALISE </th>
          )
        } else if(row.STATIVO == 'False' && row.STCANCELADO == 'True' && !row.STSTATUS) {
          return (
            <th style={{color: 'red'}}>CANCELADO</th>
          )
        } else {
          return (
            <th style={{color: 'red'}}>USADO</th>
          )
        }
      }, 
      sortable: true,
    },
    {
      header: 'Opções',
      body: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around", width: '7rem' }}>
        <ButtonTable
          titleButton={"Visualizar Detalhes"}
          onClickButton={() => handleButtonClick('detalhar', row)}
          Icon={GrFormView}
          iconSize={18}
          iconColor={"#fff"}
          cor={"success"}
        />
        <ButtonTable
          titleButton={"Editar Situação"}
          onClickButton={() => handleButtonClick('editar', row)}
          Icon={CiEdit}
          iconSize={18}
          iconColor={"#fff"}
          cor={"primary"}
        />
        <ButtonTable
          titleButton={"Imprimir"}
          onClickButton={() => handleButtonClick('imprimir', row)}
          Icon={MdOutlineLocalPrintshop}
          iconSize={18}
          iconColor={"#fff"}
          cor={"warning"}
        />
      </div>
      ),
    }

  ]

 
  // const handleButtonClick = async (action, row) => {
  
  //   performAction(action, row);

  // };
  const handleButtonClick = async (action, row) => {
    if (!isLoggedIn) {
      const result = await openSwal();
      if (result) {
        setIsLoggedIn(true);
        performAction(action, row);
      }
    } else {
      performAction(action, row);
    }
  };

  const performAction = async (action, row) => {
    if (row.IDVOUCHER) {
      switch (action) {
        case 'detalhar':
          await handleDetalhar(row.IDVOUCHER);
          setModalDetalhe(true);
          break;
        case 'editar':
          await handleEdit(row.IDVOUCHER);
          setModalEditarVoucher(true);
          break;
        case 'imprimir':
          await handleImprimir(row.IDVOUCHER);
          setModalImprimirVoucher(true);
          break;
        default:
          break;
      }
    }
  };

  
  const openSwal = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Autorização',
      html: `
        <div>
          <label class="form-label" for="matricula">Matrícula</label>
          <input type="text" id="matricula" class="swal2-input" placeholder="Matrícula" style="text-align: center;" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <label class="form-label" for="senha">Senha</label>
          <input type="password" id="senha" class="swal2-input" placeholder="Senha">
        </div>      
      `,
      width: '25rem',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Entrar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const usuario = document.getElementById('matricula').value;
        const senha = document.getElementById('senha').value;
        
        // Verifica o módulo selecionado
        const data = { usuario, senha, modulo: selectedModule.nome || 'defaultModule' }; // Define 'defaultModule' caso selectedModule não esteja disponível
  
        try {
          const response = await post('/login', data);
          if (response.user) {
            return response.user;
          } else {
            Swal.showValidationMessage(`Credenciais inválidas`);
          }
        } catch (error) {
          Swal.showValidationMessage(`Erro ao autenticar: ${error.message}`);
        }
      }
    });
  
    if (formValues) {
      setIsLoggedIn(true);
      setUsuarioAutorizado(formValues);
    }
  };

  const handleDetalhar = async (IDVOUCHER) => {
    try {
      const response = await get(`/detalhesVouchersId?idVoucher=${IDVOUCHER}`);
      if (response.data) {
        setDadosDetalheVoucher(response.data);
      }
    } catch (error) {
      console.log(error, "não foi possível pegar os dados da tabela");
    }
  };

  const handleEdit = async (IDVOUCHER) => {
    try {
      const response = await get(`/detalhesVouchersId?idVoucher=${IDVOUCHER}`);
      if (response.data && response.data.length > 0) {
        setDadosEditarVoucher(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleImprimir = async (IDVOUCHER) => {
    try {
      const response = await get(`/detalhesVouchersId?idVoucher=${IDVOUCHER}`);
      if (response.data && response.data.length > 0) {
        setDadosImprimirVoucher(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };


  return (

    <Fragment> 
      <div className="panel">
        <div className="panel-hdr">
          <h2>Vouchers Emitidos</h2>
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
            value={dados}
            globalFilter={globalFilterValue}
            size={size}
            sortOrder={-1}
            paginator={true}
            rows={5}
            rowsPerPageOptions={[5, 10, 20, 50]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVouchers.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}
                
                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc',fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>

       <ActionDetalharModal 
        show={modalDetalhe}
        handleClose={() => setModalDetalhe(false)}
        dadosDetalheVoucher={dadosDetalheVoucher}
       />
     
      <ActionEditarStatusVoucherModal
        show={modalEditarVoucher}
        handleClose={() => setModalEditarVoucher(false)}
        dadosEditarVoucher={dadosEditarVoucher}
      />

      <ActionImprimirVoucherModal 
        show={modalImprimirVoucher}
        handleClose={() => setModalImprimirVoucher(false)}
        dadosImprimirVoucher={dadosImprimirVoucher}
      />
    </Fragment>
  )
}


