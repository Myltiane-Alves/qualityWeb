import React, { Fragment, useEffect, useRef, useState } from "react"
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
import { Row } from "jspdf-autotable";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const ActionListaConsultaVouchers = ({dadosVoucher}) => {
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
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
  const dataTableRef = useRef();
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [ipUsuario, setIpUsuario] = useState('')
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
    if(response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }

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
    let indexMsg = 0;
    let msgLogRetornoSap = '';
    let logSefaz = '';

    let logIntegracao = item.LOGERRORVENDA || item.LOGERRORCLIENTE || item.LOGERRORVOUCHER || "";
    let stErrorLogIntegracao = logIntegracao !== 'VENDA NÃO MIGRADA' && logIntegracao?.length > 0;
    let stErrorSefaz = item.NUMSTATESEFAZNOTADEVOLUCAO > 108 ? item.MSGRETORNOSEFAZNOTADEVOLUCAO : item.NUMSTATESEFAZNOTASAIDATRANSFERENCIA > 108 ? item.MSGRETORNOSEFAZNOTASAIDATRANSFERENCIA : "";

    let statusDevolucaoTransferenciaVoucher = [
      'ERRO AO INTEGRAR A VENDA!', //0
      'ERRO AO INTEGRAR O CLIENTE!',//1
      'ERRO AO GERAR A DEVOLUÇÃO!',//2
      'ERRO AO GERAR A NOTA DE SAÍDA DA TRANSFERÊNCIA!',//3
      'ERRO AO GERAR A NOTA DE ENTRADA DA TRANSFERÊNCIA!',//4
      'AGUARDANDO NOTA DE DEVOLUÇÃO', //5
      'AGUARDANDO NOTA DE SAIDA DA TRANSFERÊNCIA',//6
      'AGUARDANDO NOTA DE ENTRADA DA TRANSFERÊNCIA',//7
      'NOTA DE DEVOLUÇÃO INTEGRADA',//8
      'NOTA DE SAIDA DA TRANSFERÊNCIA INTEGRADA',//9
      'NOTA DE ENTRADA DA TRANSFERÊNCIA INTEGRADA',//10
      'PROCESSO DE DEVOLUÇÃO REALIZADO COM SUCESSO!',//11
      'PROCESSO DE DEVOLUÇÃO E TRANSFERÊNCIA REALIZADO COM SUCESSO!',//12
    ];

    let arrayMsgSAP = [
      'VENDA EM CONTINGÊNCIA',
      'VENDA NÃO INTEGRADA',
      'VENDA NÃO MIGRADA',
      'AGUARDANDO GERAÇÃO MANUAL DA DEVOLUÇÃO(VENDA NFCE(65) PARA NFE(55))',
      'AGUARDANDO GERAÇÃO MANUAL DA DEVOLUÇÃO(PESSOA JURÍDICA)',
      'Invalid session or session already timeout.',
      'Nota Fiscal number was already used for a BP; ',
      '(167) rsd sap - não é permitido realizar movimentação nesta loja. a mesma econtra-se em processo de (balanço).'
    ];

    var classStDevolucao = 'text-info';
    if (stErrorLogIntegracao) {
      classStDevolucao = '#fd3995';

      if (!item.IDSAP_CLIENTE || item.LOGERRORCLIENTE?.length > 0) {
        indexMsg = 1;
      }

      if (!item.IDSAP_VENDA && item.LOGERRORVENDA?.length > 0) {
        indexMsg = 0;
      }

      if (!item.IDSAP_DEVOLUCAO && item.LOGERRORVOUCHER?.length > 0) {
        indexMsg = 2;
      }

      if (item.IDSAP_DEVOLUCAO && item.STTRANSFERIRPRODUTO === 'True') {
        if (!item.IDSAPNOTAENTRADATRANSFERENCIA) {
          indexMsg = 4;
        }

        if (!item.IDSAPNOTASAIDATRANSFERENCIA) {
          indexMsg = 3;
        }
      }

      msgLogRetornoSap = !arrayMsgSAP.includes(logIntegracao) ? logIntegracao : logIntegracao;
      msgLogRetornoSap = msgLogRetornoSap === 'Invalid session or session already timeout.' ? 'Sessão inválida ou sessão já expirou' : msgLogRetornoSap;
      msgLogRetornoSap = msgLogRetornoSap === 'Nota Fiscal number was already used for a BP; ' ? 'O número da Nota Fiscal já foi utilizado para um PN' : msgLogRetornoSap;

    } else {
      if (!item.IDSAP_DEVOLUCAO) {
        indexMsg = 5;
      }

      if (item.IDSAP_DEVOLUCAO && item.STTRANSFERIRPRODUTO === 'True') {
        if (!item.IDSAPNOTAENTRADATRANSFERENCIA) {
          indexMsg = 7;
        }

        if (!item.IDSAPNOTASAIDATRANSFERENCIA) {
          indexMsg = 6;
        }
      }

      if (stErrorSefaz) {
        if (item.NUMSTATESEFAZNOTADEVOLUCAO > 108) {
          indexMsg = item.NUMSTATESEFAZNOTADEVOLUCAO > 108 ? 2 : 5;
        } else {
          indexMsg = item.NUMSTATESEFAZNOTASAIDATRANSFERENCIA > 108 ? 3 : 6;
        }

        msgLogRetornoSap = logSefaz;
        classStDevolucao = '#fd3995';

      } else {
        indexMsg = 5; // aguardando nfe devolucao

        if (item.IDSAP_DEVOLUCAO > 0) {
          indexMsg = 11; // devolucao integrada

          if (item.NUMSTATESEFAZNOTADEVOLUCAO !== 100) {
            msgLogRetornoSap = (logSefaz || 'AGUARDANDO RETORNO DA SEFAZ');
          } else {
            if (item.STTRANSFERIRPRODUTO === 'True') {
              indexMsg = 6; // aguardando nfe saida transferencia

              if (item.IDSAPNOTASAIDATRANSFERENCIA > 0) {
                indexMsg = 9; // nfe saida transferencia integrada

                if (item.NUMSTATESEFAZNOTASAIDATRANSFERENCIA !== 100) {
                  msgLogRetornoSap = (logSefaz || 'AGUARDANDO RETORNO DA SEFAZ');
                } else {
                  indexMsg = 7; // aguardando nfe entrada transferencia

                  if (item.IDSAPNOTAENTRADATRANSFERENCIA) {
                    indexMsg = 12; // nfe entrada transferencia integrada
                  }
                }
              }
            }
          }

          if (item.NUMSTATESEFAZNOTADEVOLUCAO !== 100 || item.NUMSTATESEFAZNOTASAIDATRANSFERENCIA !== 100) {
            classStDevolucao = item.TPCLIENTE === 'JURIDICA' ? '#fd3995' : '#7453A6';
          }

          msgLogRetornoSap = indexMsg > 10 ? `PROCESSO FINALIZADO${item.TPCLIENTE === 'JURIDICA' ? ' (PESSOA JURÍDICA)' : ''}!` : msgLogRetornoSap;
        }
      }
    }

    classStDevolucao = indexMsg > 7 ? '#1dc9b7' : classStDevolucao;

    const statusDevolucao = statusDevolucaoTransferenciaVoucher[indexMsg];
    return {
      IDVOUCHER: item.IDVOUCHER,
      IDEMPRESAORIGEM: item.IDEMPRESAORIGEM,
      DTINVOUCHER: item.DTINVOUCHER,
      DTOUTVOUCHER: item.DTOUTVOUCHER,
      DSCAIXAORIGEM: item.IDCAIXAORIGEM !== 99999 ? item.DSCAIXAORIGEM : 'CAIXA WEB',
      DSCAIXADESTINO: item.DSCAIXADESTINO,
      IDUSRLIBERACAOCRIACAO: item.IDUSRLIBERACAOCRIACAO,
      NOFUNCIONARIOLIBERACAOCRIACAO: item.NOFUNCIONARIOLIBERACAOCRIACAO,
      DSCAIXADESTINO: item.DSCAIXADESTINO,
      IDUSRLIBERACAOCONSUMO: item.IDUSRLIBERACAOCONSUMO,
      NOFUNCIONARIOLIBERACAOCONSUMO: item.NOFUNCIONARIOLIBERACAOCONSUMO,
      NUVOUCHER: item.NUVOUCHER,
      VRVOUCHER: item.VRVOUCHER,
      STATIVO: item.STATIVO,
      STCANCELADO: item.STCANCELADO,
      STSTATUS: item.STSTATUS,
      NOMEFANTASIAEMPRESAORIGEM: item.NOMEFANTASIAEMPRESAORIGEM,
      NOMEFANTASIAEMPRESADESTINO: item.NOMEFANTASIAEMPRESADESTINO,
      STTIPOTROCA: item.STTIPOTROCA || 'CORTESIA',
      statusDevolucaoTransferenciaVoucher:statusDevolucao,
      arrayMsgSAP: arrayMsgSAP,
      msgLogRetornoSap: msgLogRetornoSap,
      DSMOTIVOCANCELAMENTO: item.DSMOTIVOCANCELAMENTO,
      MOTIVOTROCA: item.MOTIVOTROCA, 
      IDRESUMOVENDAWEBDESTINO: item.IDRESUMOVENDAWEBDESTINO,
      IDRESUMOVENDAWEB: item.IDRESUMOVENDAWEB,
      NUCPFCNPJ: item.NUCPFCNPJ,
      LOGERRORVENDA: item.LOGERRORVENDA,
      LOGERRORCLIENTE: item.LOGERRORCLIENTE,
      LOGERRORVOUCHER: item.LOGERRORVOUCHER,

      NUMSTATESEFAZNOTADEVOLUCAO: item.NUMSTATESEFAZNOTADEVOLUCAO,
      NUMSTATESEFAZNOTASAIDATRANSFERENCIA: item.NUMSTATESEFAZNOTASAIDATRANSFERENCIA,
      MSGRETORNOSEFAZNOTADEVOLUCAO: item.MSGRETORNOSEFAZNOTADEVOLUCAO || '',
      MSGRETORNOSEFAZNOTASAIDATRANSFERENCIA: item.MSGRETORNOSEFAZNOTASAIDATRANSFERENCIA || '',
      logSefaz: item.MSGRETORNOSEFAZNOTADEVOLUCAO || item.MSGRETORNOSEFAZNOTASAIDATRANSFERENCIA || '',
      stErrorSefaz: item.NUMSTATESEFAZNOTADEVOLUCAO > 108 ? item.MSGRETORNOSEFAZNOTADEVOLUCAO : item.NUMSTATESEFAZNOTASAIDATRANSFERENCIA > 108 ? item.MSGRETORNOSEFAZNOTASAIDATRANSFERENCIA : '',
      logIntegracao: item.LOGERRORVENDA || item.LOGERRORCLIENTE || item.LOGERRORVOUCHER || '',
      stErrorLogIntegracao: logIntegracao != 'VENDA NÃO MIGRADA' && logIntegracao?.length > 0,
      indexMsg: indexMsg,
 
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
      body: row => <p style={{color: 'blue', fontWeight: 600, width: 200, margin: 0}}>{row.NOMEFANTASIAEMPRESAORIGEM}</p>,
      sortable: true,
    },
    {
      field: 'DSCAIXAORIGEM',
      header: 'Caixa Emissor',
      body: row => <p style={{color: 'blue', fontWeight: 600, margin: 0}}>{row.DSCAIXAORIGEM }</p>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIOLIBERACAOCRIACAO',
      header: 'Aut. Criação',
      body: row => <p style={{color: 'blue',fontWeight: 600, width: 300, margin: 0}}>{row.NOFUNCIONARIOLIBERACAOCRIACAO}</p>,
      sortable: true,
    },
    {
      field: 'DTINVOUCHER',
      header: 'Data Emissão',
      body: row => <th style={{color: 'blue', fontWeight: 600}}>{dataFormatada(row.DTINVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'VRVOUCHER',
      header: 'Valor',
      body: row => <th style={{color: 'green', fontWeight: 600}}>{formatMoeda(row.VRVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'EMPDESTINO',
      header: 'Loja Recebido',
      body: row => <p style={{color: 'blue', fontWeight: 600, width: 200, margin: 0}}>{row.NOMEFANTASIAEMPRESADESTINO}</p>,
      sortable: true,
    },
    {
      field: 'DSCAIXADESTINO',
      header: 'Caixa Recebido',
      body: row => <th style={{color: 'blue',fontWeight: 600}}>{row.DSCAIXADESTINO}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIOLIBERACAOCONSUMO',
      header: 'Aut. Consumo',
      body: row => <p style={{color: 'blue', fontWeight: 600, width: 300, margin: 0}}>{row.NOFUNCIONARIOLIBERACAOCONSUMO}</p>,
      sortable: true,
    },
    {
      field: 'DTOUTVOUCHER',
      header: 'Data Recebida',
      body: row => <th style={{color: 'blue', fontWeight: 600}}>{dataFormatada(row.DTOUTVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'STTIPOTROCA',
      header: 'Tipo',
      body: row => <th style={{color: row.STTIPOTROCA == 'DEFEITO' ? '#fd3995' : row.STTIPOTROCA == 'TROCO' ? 'primary' : '#2196F3', fontWeight: 900}}>{row.STTIPOTROCA}</th>,
      sortable: true,
    },
    {
      field: 'STSTATUS',
      header: 'Situação',
      body: row => {
        if(row.STATIVO == 'True' && !row.STSTATUS) {
          return (
            <th style={{color: '#2196F3', fontWeight: 900}}>{row.STTIPOTROCA == 'TROCO' ? 'LIBERADO PARA O CLIENTE' : 'NOVO'}</th>
          )
        } else if(row.STATIVO == 'False' && !row.STSTATUS) {
          return (
            <th style={{color: '#fd3995', fontWeight: 900}} >FINALIZADO</th>
          )
        } else if(row.STATIVO == 'True' && (row.STSTATUS == 'LIBERADO PARA O CLIENTE' || row.STSTATUS == 'NOVO')) {
          return (
            // <th style={{color: 'green'}}>{row.STSTATUS == 'LIBERADO PARA O CLIENTE' || row.STSTATUS == 'NOVO'}</th>
            <th style={{color: 'green', fontWeight: 900}}>{row.STSTATUS}</th>
          )
        } else if(row.STATIVO == 'False' && (row.STSTATUS == 'NEGADO' || row.STSTATUS == 'CANCELADO' || row.STSTATUS == 'FINALIZADO')) {
          return (
            // <th style={{color: 'red'}}>{row.STSTATUS == 'NEGADO' || row.STSTATUS == 'CANCELADO' || row.STSTATUS == 'FINALIZADO'}</th>
            <th style={{color: '#fd3995', fontWeight: 900}}>{row.STSTATUS}</th>
          )

        } else if(row.STATIVO == 'True' && row.STCANCELADO == 'False' && row.STSTATUS == 'EM ANALISE') {
          return (
            // <th style={{color: 'blue'}}> EM ANALISE </th>
            <th style={{color: '#2196F3', fontWeight: 900}}> {row.STSTATUS} </th>
          )
        } else if(row.STATIVO == 'False' && row.STCANCELADO == 'True' && !row.STSTATUS) {
          return (
            // <th style={{color: 'red'}}>CANCELADO</th>
            <th style={{color: '#fd3995', fontWeight: 900}}> {row.STSTATUS}</th>
          )
        } else if(row.STCANCELADO == 'True') {
          return (
            <th style={{color: 'red', fontWeight: 900}}>CANCELADO</th>
          )
        } else {
          return (
            <th style={{color: '#fd3995', fontWeight: 900}}>FINALIZADO</th>
          )
        }
      }, 
      sortable: true,
    },
    {
      field: 'statusDevolucaoTransferenciaVoucher',
      header: 'St. Devolução',
      body: row => {
        let classStDevolucao = '#2196F3'; // Default class
  
        if (row.stErrorLogIntegracao) {
          classStDevolucao = '#fd3995'; // Error color
  
          if (!row.IDSAP_CLIENTE || row.LOGERRORCLIENTE?.length > 0) {
            classStDevolucao = '#fd3995';
          }
  
          if (!row.IDSAP_VENDA && row.LOGERRORVENDA?.length > 0) {
            classStDevolucao = '#fd3995';
          }
  
          if (!row.IDSAP_DEVOLUCAO && row.LOGERRORVOUCHER?.length > 0) {
            classStDevolucao = '#fd3995';
          }
  
          if (row.IDSAP_DEVOLUCAO && row.STTRANSFERIRPRODUTO === 'True') {
            if (!row.IDSAPNOTAENTRADATRANSFERENCIA) {
              classStDevolucao = '#fd3995';
            }
  
            if (!row.IDSAPNOTASAIDATRANSFERENCIA) {
              classStDevolucao = '#fd3995';
            }
          }
        } else {
          if (!row.IDSAP_DEVOLUCAO) {
            classStDevolucao = '#2196F3';
          }
  
          if (row.IDSAP_DEVOLUCAO && row.STTRANSFERIRPRODUTO === 'True') {
            if (!row.IDSAPNOTAENTRADATRANSFERENCIA) {
              classStDevolucao = '#2196F3';
            }
  
            if (!row.IDSAPNOTASAIDATRANSFERENCIA) {
              classStDevolucao = '#2196F3';
            }
          }
  
          if (row.stErrorSefaz) {
            classStDevolucao = '#fd3995';
          } else {
            classStDevolucao = '#2196F3';
  
            if (row.IDSAP_DEVOLUCAO > 0) {
              classStDevolucao = '#1dc9b7'; // Success color
  
              if (row.NUMSTATESEFAZNOTADEVOLUCAO !== 100 || row.NUMSTATESEFAZNOTASAIDATRANSFERENCIA !== 100) {
                classStDevolucao = row.TPCLIENTE === 'JURIDICA' ? '#fd3995' : '#7453A6';
              }
            }
          }
        }
  
        classStDevolucao = row.indexMsg > 7 ? '#1dc9b7' : classStDevolucao;
  
        return (
          <p style={{ color: classStDevolucao, fontWeight: 900, margin:'0px', width: '200px' }}>
            {row.statusDevolucaoTransferenciaVoucher}
          </p>
        );
      },
      sortable: true,
    },
    {
      field: 'msgLogRetornoSap',
      header: 'Log Devolução',
      body: row => <span style={{color: '#1dc9b7', fontWeight: 900}}>{row.msgLogRetornoSap}</span>,
      sortable: true,
    },
    {
      header: 'Opções',
      body: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around", width: '7rem' }}>
        <ButtonTable
          titleButton={"Visualizar Detalhes"}
          onClickButton={() => hancleClickDetalhar(row)}
          Icon={GrFormView}
          iconSize={20}
          iconColor={"#fff"}
          cor={"success"}
        />
        <ButtonTable
          titleButton={"Editar Situação"}
          onClickButton={() => handleClickEditar(row)}
          Icon={CiEdit}
          iconSize={20}
          iconColor={"#fff"}
          cor={"primary"}
        />
        <ButtonTable
          titleButton={"Imprimir"}
          onClickButton={() => handleClickImprimir(row)}
          Icon={MdOutlineLocalPrintshop}
          iconSize={20}
          iconColor={"#fff"}
          cor={"secondary"}
        />
      </div>
      ),
    }

  ]

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

  
  // const openSwal = async () => {
  //   const { value: formValues } = await Swal.fire({
  //     title: 'Autorização',
  //     html: `
  //       <div>
  //         <label class="form-label" for="matricula">Matrícula</label>
  //         <input type="text" id="matricula" class="swal2-input" placeholder="Matrícula" style="text-align: center;" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
  //         <label class="form-label" for="senha">Senha</label>
  //         <input type="password" id="senha" class="swal2-input" placeholder="Senha">
  //       </div>      
  //     `,
  //     width: '25rem',
  //     focusConfirm: false,
  //     showCancelButton: true,
  //     confirmButtonText: 'Entrar',
  //     cancelButtonText: 'Cancelar',
  //     preConfirm: async () => {
  //       const usuario = document.getElementById('matricula').value;
  //       const senha = document.getElementById('senha').value;
        
  //       // Verifica o módulo selecionado
  //       const data = { usuario, senha, modulo: selectedModule.nome || 'defaultModule' }; // Define 'defaultModule' caso selectedModule não esteja disponível
  
  //       try {
  //         const response = await post('/login', data);
  //         if (response.user) {
  //           return response.user;
  //         } else {
  //           Swal.showValidationMessage(`Credenciais inválidas`);
  //         }
  //       } catch (error) {
  //         Swal.showValidationMessage(`Erro ao autenticar: ${error.message}`);
  //       }
  //     }
  //   });
  
  //   if (formValues) {
  //     setIsLoggedIn(true);
  //     setUsuarioAutorizado(formValues);
  //   }
  // };

  const openSwal = async (callback, row) => {
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
      didOpen: () => {
        const swalContainer = Swal.getPopup();
        swalContainer.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            Swal.clickConfirm();
          }
        });
      },
      preConfirm: async () => {
        const usuario = document.getElementById('matricula').value;
        const senha = document.getElementById('senha').value;
        
        const data = { 
          MATRICULA: usuario, 
          SENHA: senha, 
          IDEMPRESALOGADA: usuarioLogado.IDEMPRESA,
          IDGRUPOEMPRESARIAL: usuarioLogado.IDGRUPOEMPRESARIAL, 
          IDVOUCHER: row.IDVOUCHER,
        }; 

        try {
          const response = await post('/auth-funcionario-update-voucher', data);
        
          if (response.data) {
            return response.data;
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
      callback()
    }
  };

  const openSwalImprimir = async (callback, row) => {
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
      didOpen: () => {
        const swalContainer = Swal.getPopup();
        swalContainer.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            Swal.clickConfirm();
          }
        });
      },
      preConfirm: async () => {
        const usuario = document.getElementById('matricula').value;
        const senha = document.getElementById('senha').value;
        
        const data = { 
          MATRICULA: usuario, 
          SENHA: senha, 
          IDEMPRESALOGADA: usuarioLogado.IDEMPRESA,
          IDGRUPOEMPRESARIAL: usuarioLogado.IDGRUPOEMPRESARIAL, 
          IDVOUCHER: row.IDVOUCHER,
        }; 

        try {
          const response = await post('/auth-funcionario-print-voucher', data);
        
          if (response.data) {
            return response.data;
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
      callback()
    }
  };
  

  const handleDetalhar = async (IDVOUCHER) => {
    try {
      const response = await get(`/detalhesVouchersId?idVoucher=${IDVOUCHER}`);
      if (response.data) {
        setDadosDetalheVoucher(response.data);
        setModalDetalhe(true)
      }
    } catch (error) {
      console.log(error, "não foi possível pegar os dados da tabela");
    }
  };
  const hancleClickDetalhar = (row) => {
    if (row && row.IDVOUCHER) {
      handleDetalhar(row.IDVOUCHER)
    }
  }

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

  const handleClickEditar = async (row) => {
    if (row.IDVOUCHER) {
      openSwal(() =>  handleEdit(row.IDVOUCHER), row)
    }
  }

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
  
  const handleClickImprimir = async (row) => {
    if (row.IDVOUCHER) {
      openSwalImprimir(() => handleImprimir(row.IDVOUCHER), row)
    }
  }

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
            size={'small'}
            sortOrder={-1}
            paginator={true}
            rows={5}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
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









// estou fazendo o mesmo retornoListaVouchers o primeiro esta em javascript e jquery, quero fazer a mudança de um codigo para o outro preciso de todas as colunas com a lógica exatamente como esta em javascript 
//  e agora estou mudando em para reactjs com dataTable  com primere react assim esta em javascript async function retornoListaVouchers(voucherEmitido) {
//   let { data } = voucherEmitido || [];
//   let dadosTable = [];
//   let indice = 1;

//   animationLoadingStart('Montando visualização, aguarde...', 100);

//   for (let dados of data) {
//       let IDVoucher = dados?.IDVOUCHER;
//       let DTVoucherIN = dados?.DTINVOUCHERFORMATADO;
//       let DTVoucherOUT = dados?.DTOUTVOUCHERFORMATADO || "";
//       let idCaixaOrigem = dados?.IDCAIXAORIGEM;
//       let DSCaixaOrigem = idCaixaOrigem !== 99999 ? dados?.DSCAIXAORIGEM : 'CAIXA WEB';
//       let nomeUsrAutorizaCriacao = dados?.NOFUNCIONARIOLIBERACAOCRIACAO || "";
//       let DSCaixaDestino = dados?.DSCAIXADESTINO || "";
//       let nomeUsrAutorizaConsumo = dados?.NOFUNCIONARIOLIBERACAOCONSUMO || "";
//       let NuVoucher = dados?.NUVOUCHER;
//       let VrVoucher = parseFloat(dados?.VRVOUCHER);
//       let STAtivoVoucher = dados?.STATIVO;
//       let STCanceladoVoucher = dados?.STCANCELADO;
//       let STStatusVoucher = dados?.STSTATUS;
//       let EmpresaOrigem = dados?.NOMEFANTASIAEMPRESAORIGEM;
//       let EmpresaDestino = dados?.NOMEFANTASIAEMPRESADESTINO || "";
//       let idSapVenda = Number(dados?.IDSAP_VENDA || 0);
//       let cstatVenda = Number(dados?.CSTAT_VENDA || 0);
//       let stcontingenciaVenda = dados?.STCONTINGENCIA == 'True';
//       let idSapCliente = Number(dados?.IDSAP_CLIENTE || 0);
//       let idSapDevolucao = Number(dados?.IDSAP_DEVOLUCAO || 0);
//       let msgRetornoSefazNotaDevolucao = dados?.MSGRETORNOSEFAZNOTADEVOLUCAO || "";
//       let stHaTransferencia = dados?.STTRANSFERIRPRODUTO == 'True';
//       let idSapNotaSaidaTransferencia = Number(dados?.IDSAPNOTASAIDATRANSFERENCIA || 0);
//       let msgRetornoSefazNotaSaidaTransferencia = dados?.MSGRETORNOSEFAZNOTASAIDATRANSFERENCIA || "";
//       let idSapNotaEntradaTransferencia = Number(dados?.IDSAPNOTAENTRADATRANSFERENCIA || 0);
//       let tipoVoucher = dados?.STTIPOTROCA || 'CORTESIA';
//       let tipoCliente = dados?.TPCLIENTE;
//       let classTipoVoucher = 'text-info';
//       let classStVoucher = 'text-info';
//       let tagVoucherAtivo;
//       let situacaoVoucher;
//       let {
//           LOGERRORVENDA,
//           LOGERRORCLIENTE,
//           LOGERRORVOUCHER
//       } = dados;
      
//       // PARTE DO LOG DE ANDAMENTO DA INTEGRACÃO DA DEVOLUÇÃO E TRANSFERÊNCIA
//       let logIntegracao = LOGERRORVENDA || LOGERRORCLIENTE || LOGERRORVOUCHER || "";

//       let stErrorLogIntegracao = logIntegracao != 'VENDA NÃO MIGRADA' && logIntegracao?.length > 0;

//       //VERIFICA SE TEM QUE QUE FAZER TRANSFERÊNCIA NO VOUCHER
//       let indexMsg = '';

//       let stIntegracaoDevolucaoSap = dados?.STDEVOLUCAOSAP == 'True';
//       let stIntegracaoTransferenciaSap = dados?.STTRANSFERENCIASAP == 'True';
//       let stTransferenciaCompleta = dados.STTRANSFERENCIACOMPLETASAP == 'True';

//       // PARTE DO LOG RETORNO DA SEFAZ DAS NOTAS INTEGRADAS
//       let logSefaz = msgRetornoSefazNotaDevolucao || msgRetornoSefazNotaSaidaTransferencia || "";
//       let numStateSefazNotaDevolucao = dados?.NUMSTATESEFAZNOTADEVOLUCAO;
//       let numStateSefazNotaSaidaTransferencia = dados?.NUMSTATESEFAZNOTASAIDATRANSFERENCIA;
//       let stErrorSefaz = numStateSefazNotaDevolucao > 108 ? msgRetornoSefazNotaDevolucao : numStateSefazNotaSaidaTransferencia > 108 ? msgRetornoSefazNotaSaidaTransferencia : "";

//       let msgLogRetornoSap = '';

//       let classStDevolucao = 'text-info';

//       let statusDevolucaoTransferenciaVoucher = [
//           'ERRO AO INTEGRAR A VENDA!', //0
//           'ERRO AO INTEGRAR O CLIENTE!',//1
//           'ERRO AO GERAR A DEVOLUÇÃO!',//2
//           'ERRO AO GERAR A NOTA DE SAÍDA DA TRANSFERÊNCIA!',//3
//           'ERRO AO GERAR A NOTA DE ENTRADA DA TRANSFERÊNCIA!',//4
//           'AGUARDANDO NOTA DE DEVOLUÇÃO', //5
//           'AGUARDANDO NOTA DE SAIDA DA TRANSFERÊNCIA',//6
//           'AGUARDANDO NOTA DE ENTRADA DA TRANSFERÊNCIA',//7
//           'NOTA DE DEVOLUÇÃO INTEGRADA',//8
//           'NOTA DE SAIDA DA TRANSFERÊNCIA INTEGRADA',//9
//           'NOTA DE ENTRADA DA TRANSFERÊNCIA INTEGRADA',//10
//           'PROCESSO DE DEVOLUÇÃO REALIZADO COM SUCESSO!',//11
//           'PROCESSO DE DEVOLUÇÃO E TRANSFERÊNCIA REALIZADO COM SUCESSO!',//12
//       ];

//       let arrayMsgSAP = [
//           'VENDA EM CONTINGÊNCIA',
//           'VENDA NÃO INTEGRADA',
//           'VENDA NÃO MIGRADA',
//           'AGUARDANDO GERAÇÃO MANUAL DA DEVOLUÇÃO(VENDA NFCE(65) PARA NFE(55))',
//           'AGUARDANDO GERAÇÃO MANUAL DA DEVOLUÇÃO(PESSOA JURÍDICA)',
//           'Invalid session or session already timeout.',
//           'Nota Fiscal number was already used for a BP; ',
//           '(167) rsd sap - não é permitido realizar movimentação nesta loja. a mesma econtra-se em processo de (balanço).'
//       ];

//       if (stErrorLogIntegracao) {
//           classStDevolucao = 'text-danger';

//           if (!idSapCliente || LOGERRORCLIENTE?.length > 0) {
//               indexMsg = 1;
//           }

//           if (!idSapVenda && LOGERRORVENDA?.length > 0) {
//               indexMsg = 0;
//           }

//           if (!idSapDevolucao && LOGERRORVOUCHER?.length > 0) {
//               indexMsg = 2;
//           }

//           if (idSapDevolucao && stHaTransferencia) {
//               if (!idSapNotaEntradaTransferencia) {
//                   indexMsg = 4;
//               }

//               if (!idSapNotaSaidaTransferencia) {
//                   indexMsg = 3;
//               }
//           }

//           msgLogRetornoSap = !arrayMsgSAP.includes(logIntegracao) ? await translateText(logIntegracao) : logIntegracao;
//           msgLogRetornoSap = msgLogRetornoSap == 'Invalid session or session already timeout.' ? 'Sessão inválida ou sessão já expirou' : msgLogRetornoSap;
//           msgLogRetornoSap = msgLogRetornoSap == 'Nota Fiscal number was already used for a BP; ' ? 'O número da Nota Fiscal já foi utilizado para um PN' : msgLogRetornoSap;

//       } else {
//           if (!idSapDevolucao) {
//               indexMsg = 5;
//           }

//           if (idSapDevolucao && stHaTransferencia) {
//               if (!idSapNotaEntradaTransferencia) {
//                   indexMsg = 7;
//               }

//               if (!idSapNotaSaidaTransferencia) {
//                   indexMsg = 6;
//               }
//           }

//           if (stErrorSefaz) {

//               if (numStateSefazNotaDevolucao > 108) {
//                   indexMsg = numStateSefazNotaDevolucao > 108 ? 2 : 5;

//               } else {
//                   indexMsg = numStateSefazNotaSaidaTransferencia > 108 ? 3 : 6;
//               }

//               msgLogRetornoSap = logSefaz;
//               classStDevolucao = 'text-danger';

//           } else {
//               indexMsg = 5;// aguardando nfe devolucao

//               if (idSapDevolucao > 0) {
//                   indexMsg = 11;// devolucao integrada

//                   if (numStateSefazNotaDevolucao !== 100) {
//                       msgLogRetornoSap = (logSefaz || 'AGUARDANDO RETORNO DA SEFAZ');

//                   } else {

//                       if (stHaTransferencia) {
//                           indexMsg = 6; // aguardando nfe saida transferencia

//                           if (idSapNotaSaidaTransferencia > 0) {
//                               indexMsg = 9; // nfe saida transferencia integrada

//                               if (numStateSefazNotaSaidaTransferencia !== 100) {
//                                   msgLogRetornoSap = (logSefaz || 'AGUARDANDO RETORNO DA SEFAZ');
//                               } else {
//                                   indexMsg = 7; // aguardando nfe entrada transferencia

//                                   if (idSapNotaEntradaTransferencia) {
//                                       indexMsg = 12; // nfe entrada transferencia integrada
//                                   }

//                               }


//                           }

//                       }
//                   }

//                   if (numStateSefazNotaDevolucao !== 100 || numStateSefazNotaSaidaTransferencia !== 100){
//                       classStDevolucao = tipoCliente == 'JURIDICA' ? 'text-danger' : 'text-primary';
//                   }

//                   msgLogRetornoSap = indexMsg > 10 ? `PROCESSO FINALIZADO${tipoCliente == 'JURIDICA' ? ' (PESSOA JURÍDICA)' : ''}!` : msgLogRetornoSap;
//               }
//           }
//       }

//       statusDevolucaoTransferenciaVoucher = statusDevolucaoTransferenciaVoucher[indexMsg];

//       classStDevolucao = indexMsg > 7 ? 'text-success' : classStDevolucao;

//       if (STCanceladoVoucher == 'True' || tipoVoucher == 'TROCO') {
//           msgLogRetornoSap = '';
//           statusDevolucaoTransferenciaVoucher = '';
//       }

//       classStDevolucao = indexMsg > 7 ? 'text-success' : classStDevolucao;

//       if (tipoVoucher == 'DEFEITO') {
//           classTipoVoucher = 'text-danger';
//       }

//       if (tipoVoucher == 'TROCO') {
//           classTipoVoucher = 'text-primary';
//       }

//       if (STAtivoVoucher == 'True' && !STStatusVoucher) {
//           situacaoVoucher = tipoVoucher == 'TROCO' ? 'LIBERADO PARA O CLIENTE' : 'NOVO';
//       } else if (STAtivoVoucher == 'False' && !STStatusVoucher) {
//           situacaoVoucher = 'FINALIZADO';
//           classStVoucher = 'text-danger'
//       } else if (STAtivoVoucher == 'True' && (STStatusVoucher == 'LIBERADO PARA O CLIENTE' || STStatusVoucher == 'NOVO')) {
//           situacaoVoucher = STStatusVoucher;
//       } else if (STAtivoVoucher == 'False' && (STStatusVoucher == 'NEGADO' || STStatusVoucher == 'CANCELADO' || STStatusVoucher == 'FINALIZADO')) {
//           situacaoVoucher = STStatusVoucher;
//           classStVoucher = 'text-danger'
//       } else if (STAtivoVoucher == 'False' && STCanceladoVoucher == 'False' && STStatusVoucher == 'EM ANALISE') {
//           situacaoVoucher = STStatusVoucher;
//       } else if (STAtivoVoucher == 'False' && STCanceladoVoucher == 'True' && !STStatusVoucher) {
//           situacaoVoucher = STStatusVoucher;
//           classStVoucher = 'text-danger'
//       } else if (STCanceladoVoucher == 'True') {
//           situacaoVoucher = 'CANCELADO';
//           classStVoucher = 'text-danger'
//       } else {
//           situacaoVoucher = 'FINALIZADO';
//           classStVoucher = 'text-danger'
//       }

//       tipoVoucher = `<label class="text-center ${classTipoVoucher} fw-900"style="font-size: 11px;" >${tipoVoucher}</label>`;
//       tagVoucherAtivo = `<label class="text-center ${classStVoucher} fw-900"style="font-size: 11px;" >${situacaoVoucher}</label>`;
//       statusDevolucaoTransferenciaVoucher = `<label class="text-center ${classStDevolucao} fw-900"style="font-size: 11px;" >${statusDevolucaoTransferenciaVoucher}</label>`;
//       msgLogRetornoSap = msgLogRetornoSap?.length > 0 ? `<label class="text-center ${classStDevolucao} fw-900"style="font-size: 11px;" >${msgLogRetornoSap?.toUpperCase()}</label>` : '';

//       dadosTable.push([
//           `<label id="${IDVoucher}" style="color: blue; font-size: 11px;">${indice}</label>`,
//           `<label style="color: blue; font-size: 11px;">${(NuVoucher)}</label>`,
//           `<label style="color: blue; font-size: 11px;">${EmpresaOrigem}</label>`,
//           `<label style="color: blue; font-size: 11px;">${DSCaixaOrigem}</label>`,
//           `<label style="color: blue; font-size: 11px;">${nomeUsrAutorizaCriacao}</label>`,
//           `<label style="color: blue; font-size: 11px;">${DTVoucherIN}</label>`,
//           `<label style="align: right; color: green; font-size: 11px;">${maskValorEmBRL(VrVoucher)}</label>`,
//           `<label style="color: blue; font-size: 11px;">${EmpresaDestino}</label>`,
//           `<label style="color: blue; font-size: 11px;">${DSCaixaDestino}</label>`,
//           `<label style="color: blue; font-size: 11px;">${nomeUsrAutorizaConsumo}</label>`,
//           `<label style="color: blue; font-size: 11px;">${DTVoucherOUT}</label>`,
//           tipoVoucher,
//           tagVoucherAtivo,
//           statusDevolucaoTransferenciaVoucher,
//           msgLogRetornoSap,
//           `<div class="btn-group btn-group-xs">
//           <button id="detalheVoucher" type="button" class="btn btn-success btn-xs" title="Visualizar Detalhes" value="${IDVoucher}" ><span class="fal fa-list p-1"></button>
//           <button type="button" class="btn btn-warning btn-xs" title="Editar Situação" id="${IDVoucher}" onclick="editarStatusVoucher(this.id);"><span class="fal fa-pen p-1 text-white"></button>
//           <button type="button" class="btn btn-primary btn-xs" title="Imprimir" id="${IDVoucher}" onclick="imprimirVoucher(this.id);"><span class="fal fa-print p-1"></button>
//       </div>`
//       ])

//       indice++;
//   }

//   $('#resultado').removeClass('d-none').html(`
//       <table id="dt-basic-voucher" class="table table-bordered table-hover table-striped w-100 fw-500">
//           <thead class="bg-primary-600">
//           <tr>
//               <th>#</th>
//               <th>Nº Voucher</th>
//               <th>Loja Emissor</th>
//               <th>Caixa Emissor</th>
//               <th>Aut. Criação</th>
//               <th>Data Emissão</th>
//               <th>Valor</th>
//               <th>Loja Recebida</th>
//               <th>Caixa Recebida</th>
//               <th>Aut. Consumo</th>
//               <th>Data Recebida</th>
//               <th>Tipo</th>
//               <th>Situação</th>
//               <th>St. Devolução</th>
//               <th>Log. Devolução</th>
//               <th>Opções</th>
//           </tr>
//           </thead>
//           <tbody>
//           </tbody>
//       </table>    
//   `);

//   $('#dt-basic-voucher').DataTable().clear().destroy();

//   let tableVoucher = $('#dt-basic-voucher').DataTable({
//       data: dadosTable,
//       "language": { "emptyTable": "Nenhum Voucher Encontrado..." },
//       defaultContent: '',
//       paging: true,
//       pageLength: 50,
//       searching: true,
//       info: true,
//       deferRender: true,
//       scrollX: true,
//       scrollY: true,
//       columnDefs: [
//           {
//               type: 'date-time-br',
//               targets: [5, 10],
//           },
//           {
//               type: 'currency-brl',
//               targets: [6],
//           },
//       ],
//       initComplete: function (settings) {
//           let idTable = `#${settings.nTable.id}`;

//           $(idTable).focus();
//           $('html, body').animate({
//               scrollTop: $(idTable).offset().top - 70
//           }, 1000);

//           $(idTable).find('tbody td:first').focus();
//       },
//       dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'lB>>" +
//           "<'row'<'col-sm-12'tr>>" +
//           "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
//       buttons: [
//           {
//               extend: 'pdfHtml5',
//               text: 'PDF',
//               titleAttr: 'Generate PDF',
//               className: 'btn-outline-danger btn-sm mr-1'
//           },
//           {
//               extend: 'excelHtml5',
//               text: 'Excel',
//               titleAttr: 'Gerar Excel',
//               className: 'btn-outline-success btn-sm mr-1',
//               exportOptions: {
//                   columns: ':visible',
//                   format: {
//                       body: function (data, row, column, node) {
//                           data = $('<p>' + data + '</p>').text();
//                           return $.isNumeric(data.replace(',', '.')) ? data.replace(',', '.') : data;
//                       }
//                   }
//               }
//           },
//           {
//               extend: 'print',
//               text: 'Print',
//               titleAttr: 'Print Table',
//               className: 'btn-outline-primary btn-sm'
//           }
//       ]
//   });

//   $('#dt-basic-voucher tbody').on('click', 'button#detalheVoucher', async function () {
//       try {
//           let tr = $(this).closest('tr');
//           let row = tableVoucher.row(tr);
//           let numVoucherLinha;

//           if (tr.hasClass('child')) {
//               tr = $($(`#${$(this).attr('value')}`).closest('tr'))

//               row = tableVoucher.row(tr);
//               numVoucherLinha = $(this).attr('value');

//               row.child.hide();
//               tr.removeClass('shown');

//           } else {
//               row = tableVoucher.row(tr);
//               numVoucherLinha = $(tr[0].children[0].children[0]).attr('id');
//           }

//           if (row.child.isShown()) {
//               row.child.hide();
//               tr.removeClass('shown');

//           } else {
//               await ajaxGetAllData(`api/administrativo/detalhe-voucher-dados.xsjs?id=${numVoucherLinha}`, 'Carregando Detalhes do Voucher...')
//                   .then((dadosVoucher) => {
//                       row.child(formatDataTableAccordion(dadosVoucher)).show();
//                   })
//                   .catch((error) => { throw error });

//               tr.addClass('shown');
//           }
//       } catch (error) {
//           console.log(error);
//           animationLoadingStop();
//           msgError('Erro ao Carregar os Detalhes do Voucher, Tente Novamente Mais Tarde!')
//       }
//   });

//   animationLoadingStop();
// } e assim esta em react js 
// import React, { Fragment, useRef, useState } from "react"
// import Swal from 'sweetalert2'
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
// import { formatMoeda } from "../../../../utils/formatMoeda";
// import { MdOutlineLocalPrintshop } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import { GrFormView } from "react-icons/gr";
// import { ActionDetalharModal } from "./actionDetalharModal";
// import { ActionEditarStatusVoucherModal } from "./actionEditarStatusVoucherModal";
// import { get, post } from "../../../../api/funcRequest";
// import { ActionImprimirVoucherModal } from "./actionImprimirVoucherModal";
// import { dataFormatada } from "../../../../utils/dataFormatada";


// export const ActionListaConsultaVouchers = ({dadosVoucher}) => {
//   const storedModule = localStorage.getItem('moduloselecionado');
//   const selectedModule = JSON.parse(storedModule);

//   const dados = dadosVoucher.map((item, index) => {
//     let contador = index + 1;
//     let indexMsg = '';
//     let msgLogRetornoSap = '';

//     let statusDevolucaoTransferenciaVoucher = [
//       'ERRO AO INTEGRAR A VENDA!', //0
//       'ERRO AO INTEGRAR O CLIENTE!',//1
//       'ERRO AO GERAR A DEVOLUÇÃO!',//2
//       'ERRO AO GERAR A NOTA DE SAÍDA DA TRANSFERÊNCIA!',//3
//       'ERRO AO GERAR A NOTA DE ENTRADA DA TRANSFERÊNCIA!',//4
//       'AGUARDANDO NOTA DE DEVOLUÇÃO', //5
//       'AGUARDANDO NOTA DE SAIDA DA TRANSFERÊNCIA',//6
//       'AGUARDANDO NOTA DE ENTRADA DA TRANSFERÊNCIA',//7
//       'NOTA DE DEVOLUÇÃO INTEGRADA',//8
//       'NOTA DE SAIDA DA TRANSFERÊNCIA INTEGRADA',//9
//       'NOTA DE ENTRADA DA TRANSFERÊNCIA INTEGRADA',//10
//       'PROCESSO DE DEVOLUÇÃO REALIZADO COM SUCESSO!',//11
//       'PROCESSO DE DEVOLUÇÃO E TRANSFERÊNCIA REALIZADO COM SUCESSO!',//12
//     ];

//     let arrayMsgSAP = [
//       'VENDA EM CONTINGÊNCIA',
//       'VENDA NÃO INTEGRADA',
//       'VENDA NÃO MIGRADA',
//       'AGUARDANDO GERAÇÃO MANUAL DA DEVOLUÇÃO(VENDA NFCE(65) PARA NFE(55))',
//       'AGUARDANDO GERAÇÃO MANUAL DA DEVOLUÇÃO(PESSOA JURÍDICA)',
//       'Invalid session or session already timeout.',
//       'Nota Fiscal number was already used for a BP; ',
//       '(167) rsd sap - não é permitido realizar movimentação nesta loja. a mesma econtra-se em processo de (balanço).'
//     ];

//     return {
//       IDVOUCHER: item.IDVOUCHER,
//       IDEMPRESAORIGEM: item.IDEMPRESAORIGEM,
//       DTINVOUCHER: item.DTINVOUCHER,
//       DTOUTVOUCHER: item.DTOUTVOUCHER,
//       DSCAIXAORIGEM: item.IDCAIXAORIGEM !== 99999 ? item.DSCAIXAORIGEM : 'CAIXA WEB',
//       DSCAIXADESTINO: item.DSCAIXADESTINO,
//       IDUSRLIBERACAOCRIACAO: item.IDUSRLIBERACAOCRIACAO,
//       NOFUNCIONARIOLIBERACAOCRIACAO: item.NOFUNCIONARIOLIBERACAOCRIACAO,
//       DSCAIXADESTINO: item.DSCAIXADESTINO,
//       IDUSRLIBERACAOCONSUMO: item.IDUSRLIBERACAOCONSUMO,
//       NOFUNCIONARIOLIBERACAOCONSUMO: item.NOFUNCIONARIOLIBERACAOCONSUMO,
//       NUVOUCHER: item.NUVOUCHER,
//       VRVOUCHER: item.VRVOUCHER,
//       STATIVO: item.STATIVO,
//       STCANCELADO: item.STCANCELADO,
//       STSTATUS: item.STSTATUS,
//       NOMEFANTASIAEMPRESAORIGEM: item.NOMEFANTASIAEMPRESAORIGEM,
//       NOMEFANTASIAEMPRESADESTINO: item.NOMEFANTASIAEMPRESADESTINO,
//       STTIPOTROCA: item.STTIPOTROCA || 'CORTESIA',
//       statusDevolucaoTransferenciaVoucher: statusDevolucaoTransferenciaVoucher,
//       arrayMsgSAP: arrayMsgSAP,
//       indexMsg: indexMsg,
//       msgLogRetornoSap: msgLogRetornoSap,
//       DSMOTIVOCANCELAMENTO: item.DSMOTIVOCANCELAMENTO,
//       MOTIVOTROCA: item.MOTIVOTROCA, 
//       IDRESUMOVENDAWEBDESTINO: item.IDRESUMOVENDAWEBDESTINO,
//       IDRESUMOVENDAWEB: item.IDRESUMOVENDAWEB,
//       NUCPFCNPJ: item.NUCPFCNPJ,
//       LOGERRORVENDA: item.LOGERRORVENDA,
//       LOGERRORCLIENTE: item.LOGERRORCLIENTE,
//       LOGERRORVOUCHER: item.LOGERRORVOUCHER,
//       contador
//     }
//   });

//   const colunasVouchers = [
//     {
//       field: 'contador',
//       header: 'Nº',
//       body: row => <th style={{color: 'blue'}}>{row.contador}</th>,
//       sortable: true,
//     },
//     {
//       field: 'NUVOUCHER',
//       header: 'Nº Voucher',
//       // body: row => <th style={{color: 'blue'}}>{ocultaParteDosDadosVoucher(row.NUVOUCHER)}</th>,
//       body: row => <th style={{color: 'blue'}}>{row.NUVOUCHER}</th>,
//       sortable: true,
//     },
//     {
//       field: 'EMPORIGEM',
//       header: 'Loja Emissor',
//       body: row => <p style={{color: 'blue', fontWeight: 600, width: 200, margin: 0}}>{row.NOMEFANTASIAEMPRESAORIGEM}</p>,
//       sortable: true,
//     },
//     {
//       field: 'DSCAIXAORIGEM',
//       header: 'Caixa Emissor',
//       body: row => <p style={{color: 'blue', fontWeight: 600, margin: 0}}>{row.DSCAIXAORIGEM }</p>,
//       sortable: true,
//     },
//     {
//       field: 'NOFUNCIONARIOLIBERACAOCRIACAO',
//       header: 'Aut. Criação',
//       body: row => <p style={{color: 'blue',fontWeight: 600, width: 300, margin: 0}}>{row.NOFUNCIONARIOLIBERACAOCRIACAO}</p>,
//       sortable: true,
//     },
//     {
//       field: 'DTINVOUCHER',
//       header: 'Data Emissão',
//       body: row => <th style={{color: 'blue'}}>{dataFormatada(row.DTINVOUCHER)}</th>,
//       sortable: true,
//     },
//     {
//       field: 'VRVOUCHER',
//       header: 'Valor',
//       body: row => <th style={{color: 'green'}}>{formatMoeda(row.VRVOUCHER)}</th>,
//       sortable: true,
//     },
//     {
//       field: 'EMPDESTINO',
//       header: 'Loja Recebido',
//       body: row => <p style={{color: 'blue', fontWeight: 600, width: 200, margin: 0}}>{row.NOMEFANTASIAEMPRESADESTINO}</p>,
//       sortable: true,
//     },
//     {
//       field: 'DSCAIXADESTINO',
//       header: 'Caixa Recebido',
//       body: row => <th style={{color: 'blue'}}>{row.DSCAIXADESTINO}</th>,
//       sortable: true,
//     },
//     {
//       field: 'NOFUNCIONARIOLIBERACAOCONSUMO',
//       header: 'Aut. Consumo',
//       body: row => <p style={{color: 'blue', fontWeight: 600, width: 300, margin: 0}}>{row.NOFUNCIONARIOLIBERACAOCONSUMO}</p>,
//       sortable: true,
//     },
//     {
//       field: 'DTOUTVOUCHER',
//       header: 'Data Recebida',
//       body: row => <th style={{color: 'blue'}}>{dataFormatada(row.DTOUTVOUCHER)}</th>,
//       sortable: true,
//     },
//     {
//       field: 'STTIPOTROCA',
//       header: 'Tipo',
//       body: row => <th style={{color: row.STTIPOTROCA == 'DEFEITO' ? 'danger' : row.STTIPOTROCA == 'TROCO' ? 'primary' : 'blue'}}>{row.STTIPOTROCA}</th>,
//       sortable: true,
//     },
//     {
//       field: 'STSTATUS',
//       header: 'Situação',
//       body: row => {
//         if(row.STATIVO == 'True' && !row.STSTATUS) {
//           return (
//             <th style={{color: 'blue'}}>NOVO</th>
//           )
//         } else if(row.STATIVO == 'False' && !row.STSTATUS) {
//           return (
//             <th style={{color: 'red'}} >FINALIZADO</th>
//           )
//         } else if(row.STATIVO == 'True' && (row.STSTATUS == 'LIBERADO PARA O CLIENTE' || row.STSTATUS == 'NOVO')) {
//           return (
//             <th style={{color: 'green'}}>{row.STSTATUS == 'LIBERADO PARA O CLIENTE' || row.STSTATUS == 'NOVO'}</th>
//           )
//         } else if(row.STATIVO == 'False' && (row.STSTATUS == 'NEGADO' || row.STSTATUS == 'CANCELADO' || row.STSTATUS == 'FINALIZADO')) {
//           return (
//             <th style={{color: 'red'}}>{row.STSTATUS == 'NEGADO' || row.STSTATUS == 'CANCELADO' || row.STSTATUS == 'FINALIZADO'}</th>
//           )

//         } else if(row.STATIVO == 'True' && row.STSTATUS == 'EM ANALISE') {
//           return (
//             <th style={{color: 'blue'}}> EM ANALISE </th>
//           )
//         } else if(row.STATIVO == 'False' && row.STCANCELADO == 'True' && !row.STSTATUS) {
//           return (
//             <th style={{color: 'red'}}>CANCELADO</th>
//           )
//         } else {
//           return (
//             <th style={{color: 'red'}}>USADO</th>
//           )
//         }
//       }, 
//       sortable: true,
//     },
//     {
//       field: 'STTIPOTROCA',
//       header: 'St.Devolução',
//       body: row => <th style={{color: row.STTIPOTROCA == 'DEFEITO' ? 'danger' : row.STTIPOTROCA == 'TROCO' ? 'primary' : 'blue'}}>{row.STTIPOTROCA}</th>,
//       sortable: true,
//     },
//     {
//       field: 'STTIPOTROCA',
//       header: 'Log Devolução',
//       body: row => <th style={{color: row.STTIPOTROCA == 'DEFEITO' ? 'danger' : row.STTIPOTROCA == 'TROCO' ? 'primary' : 'blue'}}>{row.STTIPOTROCA}</th>,
//       sortable: true,
//     },
//   ]


//   return (

//     <Fragment> 
//       <div className="panel">
//         <div className="panel-hdr">
//           <h2>Vouchers Emitidos</h2>
//         </div>

//         <div className="card">

//           <DataTable
//             title="Vendas por Loja"
//             value={dados}
//             globalFilter={globalFilterValue}
//             size={'small'}
//             sortOrder={-1}
//             paginator={true}
//             rows={5}
//             rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
//             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//             currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
//             filterDisplay="menu"
//             showGridlines
//             stripedRows
//             emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
//           >
//             {colunasVouchers.map(coluna => (
//               <Column
//                 key={coluna.field}
//                 field={coluna.field}
//                 header={coluna.header}
                
//                 body={coluna.body}
//                 footer={coluna.footer}
//                 sortable={coluna.sortable}
//                 headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
//                 footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc',fontSize: '0.8rem' }}
//                 bodyStyle={{ fontSize: '0.8rem' }}

//               />
//             ))}
//           </DataTable>
//         </div>
//       </div>

//     </Fragment>
//   )
// }
