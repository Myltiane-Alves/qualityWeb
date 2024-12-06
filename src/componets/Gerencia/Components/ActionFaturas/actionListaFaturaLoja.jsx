import React, { Fragment, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { ActionEditarFaturaModal } from "./actionEditarFaturaModal";
import { get, put } from "../../../../api/funcRequest";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ActionCancelarFaturaModal } from "./actionCancelarFaturaModal";
import HeaderTable from "../../../Tables/headerTable";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { toFloat } from "../../../../utils/toFloat";


export const ActionListaFaturaLoja = ({ dadosFaturas }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dadosDetalheFatura, setDadosDetalheFatura] = useState([]);
  const [modalDetalheFatura, setModalDetalheFatura] = useState(false);
  const [modalCancelarFatura, setModalCancelarFatura] = useState(false);
  const [dadosCancelarFatura, setDadosCancelarFatura] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const dataTableRef = useRef();

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

  }, [usuarioLogado]);



  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Faturas da Loja',
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header =[
      'Nº',
      'DT Receb',
      'Nº Mov. Fatura',
      'Nº Mov. Caixa',
      'Caixa',
      'Cod. Auto', 
      'Valor', 
      'Recebedor', 
      'Situação', 
      'PIX', 
      'Opção'
    ];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 100, caption: 'DT Receb' },
      { wpx: 200, caption: 'Nº Mov. Fatura' },
      { wpx: 200, caption: 'Nº Mov. Caixa' },
      { wpx: 200, caption: 'Caixa' },
      { wpx: 100, caption: 'Cod. Auto' },
      { wpx: 100, caption: 'Valor' },
      { wpx: 250, caption: 'Recebedor' },
      { wpx: 100, caption: 'Situação' },
      { wpx: 100, caption: 'PIX' },
      { wpx: 100, caption: 'Opção' },
     
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Faturas da Loja');
    XLSX.writeFile(workbook, 'faturas_loja.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [[
        'Nº',
        'DT Receb',
        'Nº Mov. Fatura',
        'Nº Mov. Caixa',
        'Caixa',
        'Cod. Auto', 
        'Valor', 
        'Recebedor', 
        'Situação', 
        'PIX', 
        'Opção'
      ]],
      body: dados.map(item => [item.contador, item.DTPROCESSAMENTO, item.IDMOVIMENTOCAIXAWEB, item.IDMOVCAIXA, item.DSCAIXA, item.NUCODAUTORIZACAO, item.VRRECEBIDO, item.NOFUNCIONARIO, item.STCANCELADO, item.STPIX, item.STCONFERIDO]),
      autoPrint: true,
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('faturas_loja.pdf');
  };

  const dadosExcel = dadosFaturas.map((item, index) => {
    let contador = index + 1;

    return {
      contador,
      DTPROCESSAMENTO: item.DTPROCESSAMENTO,
      IDMOVIMENTOCAIXAWEB: item.IDMOVIMENTOCAIXAWEB,
      IDMOVCAIXA: item.IDMOVCAIXA,
      IDCAIXAWEB: `${item.IDCAIXAWEB} - ${item.DSCAIXA} `,
      NUCODAUTORIZACAO: item.NUCODAUTORIZACAO,
      VRRECEBIDO: item.VRRECEBIDO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      STCANCELADO: item.STCANCELADO == 'False' ? 'Ativo' : 'Cancelado',
      STPIX: item.STPIX == 'True' ? 'SIM' : 'NÃO',
      STCONFERIDO: item.STCONFERIDO,
      STRECOMPRA: item.STRECOMPRA,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO,
      IDDETALHEFATURA: item.IDDETALHEFATURA,

    }
  });

  const dados = dadosFaturas.map((item, index) => {
    let contador = index + 1;

    return {
      contador,
      DTPROCESSAMENTO: item.DTPROCESSAMENTO,
      IDMOVIMENTOCAIXAWEB: item.IDMOVIMENTOCAIXAWEB,
      IDMOVCAIXA: item.IDMOVCAIXA,
      IDCAIXAWEB: item.IDCAIXAWEB,
      NUCODAUTORIZACAO: item.NUCODAUTORIZACAO,
      VRRECEBIDO: item.VRRECEBIDO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      STCANCELADO: item.STCANCELADO,
      STPIX: item.STPIX,
      STCONFERIDO: item.STCONFERIDO,
      STRECOMPRA: item.STRECOMPRA,

      DSCAIXA: item.DSCAIXA,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO,
      IDDETALHEFATURA: item.IDDETALHEFATURA,

    }
  });

 
  // const calcularTotalValorRecebido = () => {
  //   return dados.reduce((total, dados) => total + toFloat(dados.VRRECEBIDO), 0);
  // }

  const colunasMovimentoCixa = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{ color: 'blue' }}>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'DTPROCESSAMENTO',
      header: 'DT Recebido',
      body: row => <th style={{ color: 'blue' }}>{dataFormatada(row.DTPROCESSAMENTO)}</th>,
      sortable: true,
    },
    {
      field: 'IDMOVIMENTOCAIXAWEB',
      header: 'Nº Movimento Fatura',
      body: row => <th style={{ color: 'blue' }}>{row.IDMOVIMENTOCAIXAWEB}</th>,
      sortable: true,
    },
    {
      field: 'IDMOVCAIXA',
      header: 'Nº Movimento Caixa',
      body: row => (
        <div style={{ color: row.IDMOVIMENTOCAIXAWEB == row.IDMOVCAIXA ? 'blue' : 'red' }}>
          <th style={{ color: 'blue' }}>{row.IDMOVCAIXA}</th>
        </div>
      ),
      sortable: true,
    },
    {
      field: 'IDCAIXAWEB',
      header: 'Caixa',
      body: row => <th style={{ color: 'blue', width: "5rem" }}>{`${row.IDCAIXAWEB} - ${row.DSCAIXA} `}</th>,
      sortable: true,
    },
    {
      field: 'NUCODAUTORIZACAO',
      header: 'Cod. Auto',
      body: row => <th style={{ color: 'blue' }}>{row.NUCODAUTORIZACAO}</th>,
      sortable: true,
    },
    {
      field: 'VRRECEBIDO',
      header: 'Valor',
      body: row => <th style={{ color: 'green' }}>{formatMoeda(row.VRRECEBIDO)}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Recebedor',
      body: row => <th style={{ color: 'blue' }}>{row.NOFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      field: 'STCANCELADO',
      header: 'Situação',
      body: row => (
        <div style={{ color: row.STCANCELADO === 'False' ? 'blue' : 'red' }}>
          <th style={{ color: 'blue' }}>{row.STCANCELADO == 'False' ? 'Ativo' : 'Cancelado'}</th>
        </div>
      ),
    },
    {
      field: 'STPIX',
      header: 'PIX',
      body: row => (
        <div style={{ color: row.STPIX === 'False' ? 'blue' : 'red' }}>
          <th style={{ color: 'blue' }}>{row.STPIX == 'True' ? 'SIM' : 'NÃO'} </th>
        </div>
      ),
    },
    {
      field: 'STCONFERIDO',
      header: 'Opções',
      body: (row) => {
        if (row.STCANCELADO == 'False' && (row.STCONFERIDO == 'False' || row.STCONFERIDO == 1 || row.STCONFERIDO == 0 || row.STCONFERIDO == null)) {
          if (row.STPIX == 'True') {
            return (
              <div></div>
            )
          } else {
            if (row.STCONFERIDO == 'False' || row.STCONFERIDO == 1) {

              return (
                <th style={{ color: 'green' }}>CAIXA CONFERIDO</th>
              )

            } else {
              return (
                <div className="p-1" style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="p-1">
                    <ButtonTable
                      titleButton={"Editar Fatura"}
                      cor={"primary"}
                      Icon={CiEdit}
                      onClickButton={() => handleClickEditar(row)}
                      iconSize={18}
                    />
                  </div>
                  <div className="p-1">
                    <ButtonTable
                      titleButton={"Cancelar Fatura"}
                      cor={"danger"}
                      Icon={AiOutlineCloseCircle}
                      onClickButton={() => handleClickCancelar(row)}
                      iconSize={18}
                    />
                  </div>
                </div>

              )
            }
          }
        } else {
          return (
            <p>{row.TXTMOTIVOCANCELAMENTO}</p>
          )
        }
      },
    },
    {
      field: 'STRECOMPRA',
      header: 'Recompra',
      body: (row) => {
        if (row.STRECOMPRA == 'False' || row.STRECOMPRA == null) {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between" }}
            >
              <div className="p-1">
                <ButtonTable
                  titleButton={"Incluir Recompra"}
                  cor={"info"}
                  Icon={MdOutlineRemoveShoppingCart}
                  onClickButton={() => handleIncluirRecompra(row)}
                />
              </div>

            </div>

          )

        } else if (row.STRECOMPRA == 'True') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between" }}
            >
              <div className="p-1">
                <ButtonTable
                  titleButton={"Excluir Recompra"}
                  cor={"danger"}
                  Icon={MdOutlineAddShoppingCart}
                  onClickButton={() => handleClickImprimir(row)}
                />
              </div>

            </div>

          )
        }
      },
    },
  ]

  const handleEditar = async (IDDETALHEFATURA) => {
    try {
      const response = await get(`/detalhe-faturas?idDetalheFatura=${IDDETALHEFATURA}`);
      if (response.data) {
        setDadosDetalheFatura(response.data);
        setModalDetalheFatura(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEditar = (row) => {
    if (row && row.IDDETALHEFATURA) {
      handleEditar(row.IDDETALHEFATURA);
    }
  };

  const handleCancelar = async (IDDETALHEFATURA) => {
    try {
      const response = await get(`/detalhe-faturas?idDetalheFatura=${IDDETALHEFATURA}`);
      if (response.data) {
        setDadosCancelarFatura(response.data);
        setModalCancelarFatura(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickCancelar = (row) => {
    if (row && row.IDDETALHEFATURA) {
      handleCancelar(row.IDDETALHEFATURA);
    }
  };
  

  const handleIncluirRecompra = async (row) => {
    let msgTitulo = row.STRECOMPRA === 'True' ? 'Excluir' : 'Incluir';

    const putData = {
      IDDETALHEFATURA: row.IDDETALHEFATURA,
      STRECOMPRA: row.STRECOMPRA === 'True' ? 'False' : 'True'
    };

    Swal.fire({
      icon: 'question',
      title: `Certeza que Deseja ${msgTitulo} recompra na Fatura?`,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#FD1381',
      confirmButtonColor: '#7352A5',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'custom-swal',
      },
      timer: 3000,
      preConfirm: async () => {
        try {
          
          await put('/atualizar-recompra', putData);
          Swal.fire('Sucesso!', 'Recompra atualizada com sucesso.', 'success');
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao atualizar recompra.', 'error');
        }
      }
    });
  };

  return (

    <Fragment>
      <div className="panel">
        <div className="panel-hdr">
          <h2 className="title">Lista de Faturas da Loja</h2>
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
            title="Faturas da Loja"
            value={dados}
            size={size}
            globalFilter={globalFilterValue}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000, dados.length]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
          >
            {colunasMovimentoCixa.map(coluna => (
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


      <ActionEditarFaturaModal
        show={modalDetalheFatura}
        handleClose={() => setModalDetalheFatura(false)}
        dadosDetalheFatura={dadosDetalheFatura}
      />

      <ActionCancelarFaturaModal
        show={modalCancelarFatura}
        handleClose={() => setModalCancelarFatura(false)}
        dadosCancelarFatura={dadosCancelarFatura}
      />
    </Fragment>
  )
}

