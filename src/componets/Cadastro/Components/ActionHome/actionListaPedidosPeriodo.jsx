import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";

import { GrFormView, GrView } from "react-icons/gr";
import { MdOutlineLocalPrintshop, MdOutlineSend } from "react-icons/md";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { SiSap } from "react-icons/si";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import { ActionPDFPedido } from "./ActionPDF/actionPDFPedido";
import { get } from "../../../../api/funcRequest";

export const ActionListaPedidosPeriodo = ({ dadosListaPedidos }) => {
  const [modalPedidoNota, setModalPedidoNota] = useState(false);
  const [dadosPedido, setDadosPedido] = useState([]);
  const [dadosDetalhePedido, setDadosDetalhePedido] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Pedidos Periodo',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Data', 'Nº Pedido', 'Marca', 'Comprador', 'Fornecedor', 'Fabricante', 'Vr Pedido', 'Setor', 'Status', 'Situação']],
      body: dadosExcel.map(item => [
        item.contador,
        item.DTPEDIDO,
        item.IDPEDIDO,
        item.NOFANTASIA,
        item.NOMECOMPRADOR,
        item.NOFORNECEDOR,
        item.FABRICANTE,
        formatMoeda(item.VRTOTALLIQUIDO),
        item.DSSETOR == 'CADASTRO' ? 'CADASTRO' : item.DSSETOR == 'COMPRAS' ? 'COMPRAS' : item.DSSETOR == 'COMPRAS ADM' ? 'COMPRAS ADM' : '',
        item.DSANDAMENTO == 'PRODUTOS/INCLUSÃO INICIADA' ? 'PRODUTOS/INCLUSÃO INICIADA' : item.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA' ? 'PRODUTOS/INCLUSÃO FINALIZADA' : item.DSANDAMENTO == 'PEDIDO EM ANÁLISE' ? 'PEDIDO EM ANÁLISE' : item.DSANDAMENTO == 'PEDIDO CANCELADO' ? 'PEDIDO CANCELADO' : item.DSANDAMENTO == 'PEDIDO INICIADO' ? 'PEDIDO INICIADO' : '',
        item.STMIGRADOSAP == null ? 'NÃO MIGRADO SAP' : 'MIGRADO SAP'
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('pedidos_periodos.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Data', 'Nº Pedido', 'Marca', 'Comprador', 'Fornecedor', 'Fabricante', 'Vr Pedido', 'Setor', 'Status', 'Situação'];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 70, caption: 'Data' },
      { wpx: 70, caption: 'Nº Pedido' },
      { wpx: 70, caption: 'Marca' },
      { wpx: 70, caption: 'Comprador' },
      { wpx: 70, caption: 'Fornecedor' },
      { wpx: 70, caption: 'Fabricante' },
      { wpx: 70, caption: 'Vr Pedido' },
      { wpx: 70, caption: 'Setor' },
      { wpx: 70, caption: 'Status' },
      { wpx: 70, caption: 'Situação' }

    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos Periodo');
    XLSX.writeFile(workbook, 'pedidos_periodo.xlsx');
  };


  const calcularTotalFabricante = () => {
    let total = 0;
    for (let dados of dadosListaPedidos) {
      total += parseFloat(dados.VRTOTALLIQUIDO);
    }
    return total;
  }

  const dadosPedidos = dadosListaPedidos.map((item, index) => {
    let contador = index + 1;
    const totalFabricante = calcularTotalFabricante();

    return {
      IDPEDIDO: item.IDPEDIDO,
      DTPEDIDO: item.DTPEDIDO,
      VRTOTALLIQUIDO: item.VRTOTALLIQUIDO,
      STCANCELADO: item.STCANCELADO,
      NOMECOMPRADOR: item.NOMECOMPRADOR,
      NOFANTASIA: item.NOFANTASIA,
      NOFORNECEDOR: item.NOFORNECEDOR,
      FABRICANTE: item.FABRICANTE,
      DSANDAMENTO: item.DSANDAMENTO,
      DSSETOR: item.DSSETOR,
      MODPEDIDO: item.MODPEDIDO,
      STMIGRADOSAP: item.STMIGRADOSAP,

      totalFabricante: totalFabricante,
      contador
    }
  });


  const colunasPedidos = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'DTPEDIDO',
      header: 'Data',
      body: row => <th>{row.DTPEDIDO}</th>,
      sortable: true,
    },
    {
      field: 'IDPEDIDO',
      header: 'Nº Pedido',
      body: row => <th>{row.IDPEDIDO}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Marca',
      body: row => <th>{row.NOFANTASIA}</th>,
      sortable: true,
    },
    {
      field: 'NOMECOMPRADOR',
      header: 'Comprador',
      body: row => <th>{row.NOMECOMPRADOR}</th>,
      sortable: true,
    },
    {
      field: 'NOFORNECEDOR',
      header: 'Fornecedor',
      body: row => <th>{row.NOFORNECEDOR}</th>,
      footer: 'Total ',
      sortable: true,
    },
    {
      field: 'FABRICANTE',
      header: 'Fabricante',
      body: row => <th>{row.FABRICANTE}</th>,

      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Vr Pedido',
      body: row => <th>{formatMoeda(row.VRTOTALLIQUIDO)}</th>,
      footer: formatMoeda(calcularTotalFabricante()),
      sortable: true,
    },
    {
      field: 'DSSETOR',
      header: 'Setor',
      body: row => {
        return (
          <div>
            <th style={{ color: row.DSSETOR == 'CADASTRO' ? 'green' : row.DSSETOR == 'COMPRAS' ? 'blue' : row.DSSETOR == 'COMPRAS ADM' ? 'gray' : '' }} >{row.DSSETOR}</th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'DSANDAMENTO',
      header: 'Status',
      body: row => {
        return (
          <div>
            <th style={{
              color:
                row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO INICIADA' ? 'blue' :
                  row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA' ? 'black' :
                    row.DSANDAMENTO == 'PEDIDO EM ANÁLISE' ? 'green' : row.DSANDAMENTO == 'PEDIDO CANCELADO' ? 'red' : row.DSANDAMENTO == 'PEDIDO INICIADO' ? 'blue' : ''
            }}
            >
              {row.DSANDAMENTO}
            </th>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'STMIGRADOSAP',
      header: 'Situação',
      body: (row) => {
        if (row.DSSETOR == 'CADASTRO') {
          if (row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO INICIADA') {
            return (
              <th >{row.STMIGRADOSAP = ''}</th>
            )

          } else if (row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA') {
            if (row.STMIGRADOSAP == null) {
              return (
                <th style={{ color: row.STMIGRADOSAP = '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP = 'NÃO MIGRADO SAP'}</th>
              )

            } else {
              return (
                <th style={{ color: row.STMIGRADOSAP = '#2196F3', fontWeight: 700 }}>{row.STMIGRADOSAP = 'MIGRADO SAP'}</th>
              )

            }
          }
        } else if (row.DSSETOR == 'COMPRAS') {
          return (
            <th style={{ color: row.STMIGRADOSAP = '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP = ''}</th>
          )
        } else if (row.DSSETOR == 'COMPRASADM') {
          return (
            <th style={{ color: row.STMIGRADOSAP = '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP = ''}</th>
          )
        }
      },
      sortable: true
    },
    {
      field: 'DSSETOR',
      header: 'Opções',
      body: (row) => {
        if (row.DSSETOR == 'CADASTRO') {

          if (row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO INICIADA') {
            return (
              <div className="p-1 "
                style={{ justifyContent: "space-between", display: "flex" }}
              >
                <div className="p-1">
                  <ButtonTable
                    Icon={CiEdit}
                    cor={"primary"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Editar Pedido"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineLocalPrintshop}
                    cor={"warning"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton={() => handleClickImprimir(row)}
                    titleButton={"Imprimir Pedido Com Preço de Venda"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineLocalPrintshop}
                    cor={"dark"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton={() => handleClickImprimir(row)}
                    titleButton={"Imprimir Pedido Sem Preço de Venda"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineSend}
                    cor={"success"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Enviar Compras para Ajuste"}
                  />
                </div>
              </div>
            )
          } else if (row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA') {
            return (
              <div className="p-1 "
                style={{ justifyContent: "space-between", display: "flex" }}
              >
                <div className="p-1">
                  <ButtonTable
                    Icon={GrView}
                    cor={"primary"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Visualizar Pedido"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineSend}
                    cor={"danger"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Enviar Compras Adm para Cancelar"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineLocalPrintshop}
                    cor={"warning"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton={() => handleClickImprimir(row)}
                    titleButton={"Imprimir Pedido Com Preço de Venda"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineLocalPrintshop}
                    cor={"dark"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton={() => handleClickImprimir(row)}
                    titleButton={"Imprimir Pedido Sem Preço de Venda"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={CiEdit}
                    cor={"secondary"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Recepção de Mercadoria do Pedido"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineSend}
                    cor={"success"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Enviar Compras para Ajuste"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={SiSap}
                    cor={"primary"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Migrar Pedido SAP"}
                  />
                </div>
              </div>
            )
          }
        } else if (row.DSSETOR == 'COMPRAS') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", display: "flex" }}
            >
              <div className="p-1">
                <ButtonTable
                  Icon={GrView}
                  cor={"success"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Visualizar o Pedido"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => handleClickImprimir(row)}
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => handleClickImprimir(row)}
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )

        } else if (row.DSSETOR == 'COMPRASADM') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", display: "flex" }}
            >
              <div className="p-1">
                <ButtonTable
                  Icon={GrView}
                  cor={"success"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Visualizar o Pedido"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => handleClickImprimir(row)}
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => handleClickImprimir(row)}
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )
        }
      },
    },

  ]

  const handleImprimir = async (IDPEDIDO) => {
    try {
      const response = await get(`/listaPedidos?idPedido=${IDPEDIDO}`)
      const responseDetlhe = await get(`/listaDetalhePedidos?idPedido=${IDPEDIDO}`)
      if (response.data && responseDetlhe.data) {
        setDadosPedido(response.data)
        setDadosDetalhePedido(responseDetlhe.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickImprimir = async (row) => {
    if (row.IDPEDIDO) {
      handleImprimir(row.IDPEDIDO)
      setModalPedidoNota(true)
    }
  }

  return (
    <Fragment>
      <div className="panel">

        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <HeaderTable
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            handlePrint={handlePrint}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
          />

        </div>
        <div className="card mb-4" ref={dataTableRef}></div>
        <DataTable
          title="Vendas por Loja"
          value={dadosPedidos}
          size="small"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasPedidos.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>

      <ActionPDFPedido 
        show={modalPedidoNota}
        handleClose={() => setModalPedidoNota(false)}
        dadosPedido={dadosPedido}
        dadosDetalhePedido={dadosDetalhePedido}
      />
    </Fragment >
  )
}