import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import { MdOutlineLocalPrintshop } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineDelete} from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { formatMoeda } from '../../../../utils/formatMoeda';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const ActionListaPedidos = ({ dadosPedidos }) => {
  const [actionListaPedidos, setActionListaPedidos] = useState(true)
  const [actionPedidoResumido, setActionPedidoResumido] = useState(true)
  const navigate = useNavigate();
  const calcularTotalPedido = () => {
    let total = 0;
    for (let dados of dadosPedidos) {
      total += parseFloat(dados.VRTOTALLIQUIDO);
    }
    return total;
  }
  const dadosListaPedidos = dadosPedidos.map((item, index) => {
    let contador = index + 1;

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
      contador
    }
  });

  const colunasPedidos = [
    {
      field: 'contador',
      header: '#',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DTPEDIDO',
      header: 'Data',
      body: row => row.DTPEDIDO,
      sortable: true,
    },
    {
      field: 'IDPEDIDO',
      header: 'Nº Pedido',
      body: row => row.IDPEDIDO,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Marca',
      body: row => row.NOFANTASIA,
      sortable: true,
    },
    {
      field: 'NOMECOMPRADOR',
      header: 'Comprador',
      body: row => row.NOMECOMPRADOR,
      sortable: true,
    },
    {
      field: 'NOFORNECEDOR',
      header: 'Fornecedor',
      body: row => row.NOFORNECEDOR,
      sortable: true,
    },
    {
      field: 'FABRICANTE',
      header: 'Fabricante',
      body: row => row.FABRICANTE,
      footer: 'Total',
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Vr Pedido',
      body: row => formatMoeda(row.VRTOTALLIQUIDO),
      footer: formatMoeda(calcularTotalPedido()),
      sortable: true,
    },
    {
      field: 'DSSETOR',
      header: 'Setor',
      body: row => {
        return (
          <div>
            <p style={{ color: row.DSSETOR == 'COMPRAS' ? 'blue' : row.DSSETOR == 'CADASTRO' ? 'green' : row.DSSETOR == 'COMPRAS ADM' ? 'gray' : '' }} >{row.DSSETOR}</p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'DSANDAMENTO',
      header: 'Situação',
      body: row => {
        return (
          <div>
            <p style={{ color: row.DSANDAMENTO == 'PEDIDO INICIADO' ? 'blue' : row.DSANDAMENTO == 'PEDIDO PARA SER AJUSTADO' ? 'blue' : row.DSANDAMENTO == 'PEDIDO FINALIZADO' ? 'tomato' : row.DSANDAMENTO == 'PEDIDO CANCELADO' ? 'red' : row.DSANDAMENTO == 'PEDIDO EM ANÁLISE' ? 'green' : row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA' ? 'black' : '' }}
            >
              {row.DSANDAMENTO}</p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'DSANDAMENTO',
      header: 'Opções',
      body: (row) => {
        if (row.DSANDAMENTO == 'PEDIDO INICIADO') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
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
                  Icon={AiOutlineDelete}
                  cor={"danger"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Cancelar Pedido"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )
        } else if (row.DSANDAMENTO == 'PEDIDO PARA SER AJUSTADO') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
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
                  onClickButton
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )
        } else if (row.DSANDAMENTO == 'PEDIDO FINALIZADO') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
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
                  Icon={AiOutlineDelete}
                  cor={"danger"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Cancelar Pedido"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )
        } else if (row.DSANDAMENTO == 'PEDIDO CANCELADO') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
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
                  Icon={FaCheck}
                  cor={"danger"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Ativar Pedido"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )

        } else if (row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
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
                  onClickButton
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )
        } else if (row.DSANDAMENTO == 'PEDIDO EM ANÁLISE') {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
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
                  onClickButton
                  titleButton={"Imprimir Pedido Com Preço de Venda"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={MdOutlineLocalPrintshop}
                  cor={"dark"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Imprimir Pedido Sem Preço de Venda"}
                />
              </div>
            </div>
          )
        }
      },
    },

  ]
  const clickRelatorioResumido = () => {
    setActionPedidoResumido(actionPedidoResumido)
  }
  return (
    <Fragment>
    
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosListaPedidos}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
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
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>

   
    </Fragment>
  )
}