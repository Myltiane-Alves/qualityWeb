import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import { MdOutlineLocalPrintshop } from 'react-icons/md';
import { GrCertificate, GrView } from 'react-icons/gr';
import { FaCheck, FaShoppingBag } from 'react-icons/fa';
import { AiOutlineDelete} from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { formatMoeda } from '../../../../utils/formatMoeda';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';


export const ActionListaPedidos = ({ dadosPedidos }) => {
  const [actionListaPedidos, setActionListaPedidos] = useState(true)
  const [actionPedidoResumido, setActionPedidoResumido] = useState(true)
  const navigate = useNavigate();

  const calcularTotalFabricante = () => {
    let total = 0;
    for (let dados of dadosPedidos) {
      total += parseFloat(dados.VRTOTALLIQUIDO);
    }
    console.log(total, 'total');
    return total;

  }

  const dados = dadosPedidos.map((item, index) => {
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
      footer: 'Total ',
      sortable: true,
    },
    {
      field: 'FABRICANTE',
      header: 'Fabricante',
      body: row => row.FABRICANTE,

      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Vr Pedido',
      body: row => formatMoeda(row.VRTOTALLIQUIDO),
      footer: formatMoeda(calcularTotalFabricante()),
      sortable: true,
    },
    {
      field: 'DSSETOR',
      header: 'Setor',
      body: row => {
        return (
          <div>
            <p style={{ color: row.DSSETOR == 'CADASTRO' ? 'green' : row.DSSETOR == 'COMPRAS' ? 'blue' : row.DSSETOR == 'COMPRAS ADM' ? 'gray' : '' }} >{row.DSSETOR}</p>
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
            <p style={{ color: 
              row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO INICIADA' ? 'blue' : 
              row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA' ? 'black' : 
              row.DSANDAMENTO == 'PEDIDO EM ANÁLISE' ? 'green' : row.DSANDAMENTO == 'PEDIDO CANCELADO' ? 'red' : row.DSANDAMENTO == 'PEDIDO INICIADO' ? 'blue' : ''}}
            >
              {row.DSANDAMENTO}
            </p>
          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'STMIGRADOSAP',
      header: 'Situação',
      body: (row) => {
        if(row.DSSETOR == 'CADASTRO') {
          if(row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO INICIADA') {
            return ( 
              <p >{row.STMIGRADOSAP = ''}</p>
            )

          } else if(row.DSANDAMENTO == 'PRODUTOS/INCLUSÃO FINALIZADA') {
            if(row.STMIGRADOSAP == null) {
              return (
                <p style={{ color: row.STMIGRADOSAP = '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP =  'NÃO MIGRADO SAP'}</p>
              )

            } else {
              return (
                <p style={{ color: row.STMIGRADOSAP = '#2196F3', fontWeight: 700 }}>{row.STMIGRADOSAP = 'MIGRADO SAP'}</p>
              )
            
            }
          }
        } else if(row.DSSETOR == 'COMPRAS') {
          return (
            <p style={{ color: row.STMIGRADOSAP = '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP = ''}</p>
          )
        } else if(row.DSSETOR == 'COMPRASADM') {
          return (
            <p style={{ color: row.STMIGRADOSAP = '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP = '' }</p>
          )
        }
      },
      sortable: true
    },
    {
      field: 'DSSETOR',
      header: 'Opções',
      body: (row) => {
        if(row.DSSETOR == 'CADASTRO') {
          return (
            <div className="p-1 "
              style={{ display: "flex" }}
            >
              
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
        } else if(row.DSSETOR == 'COMPRAS') {
          return (
            <div className="p-1 "
              style={{  display: "flex" }}
            >
            
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

        } else if(row.DSSETOR == 'COMPRASADM') {
          if(row.DSANDAMENTO == 'PEDIDO PARA SER CANCELADO') {
            return (
              <div className="p-1 "
                style={{ justifyContent: "space-between",  display: "flex" }}
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
                <div className="p-1">
                  <ButtonTable
                    Icon={MdOutlineLocalPrintshop}
                    cor={"danger"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Cancelar Pedido"}
                  />
                </div>
              </div>
            )

          } else if(row.DSANDAMENTO == 'PEDIDO CANCELADO') {
            return (
              <div className="p-1 "
                style={{ justifyContent: "space-between",  display: "flex" }}
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
          } else {
            return (
              <div className="p-1 "
                style={{ justifyContent: "space-between",  display: "flex" }}
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
                <div className="p-1">
                  <ButtonTable
                    Icon={FaShoppingBag}
                    cor={"success"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Enviar Compras"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={FiSend}
                    cor={"info"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Enviar Cadastro"}
                  />
                </div>
                <div className="p-1">
                  <ButtonTable
                    Icon={BsTrash3}
                    cor={"danger"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Cancelar Pedido"}
                  />
                </div>
              </div>
            )
          }
        }    
      },
    },
  

  ]

  return (
    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dados}
          sortField="VRTOTALPAGO"
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
    </Fragment>
  )
}