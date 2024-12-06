import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import {  GrView } from 'react-icons/gr';
import { Fragment, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { Checkbox } from "primereact/checkbox";
import { get } from '../../../../api/funcRequest';
import { ActionDetalhePedidoModal } from './actionDetalhePedidoModal';
import { ActionListaDistribuicaoSugestoesHistorico } from './actionListaDistribuicaoSugestoesHistorico';
import { ButtonType } from '../../../Buttons/ButtonType';
import { CiEdit } from 'react-icons/ci';


export const ActionListaPedidoCompra = ({ dadosPedidosCompra }) => {
  const [actionListaPedidos, setActionListaPedidos] = useState(true)
  const [actionPedidoResumido, setActionPedidoResumido] = useState(true)
  const [rowClick, setRowClick] = useState(true);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [modalDetalhePedido, setModalDetalhePedido] = useState(false);
  const [dadosDetalhePedido, setDadosDetalhePedido] = useState([]);
  const [dadosSugestoesHistorico, setDadosSugestoesHistorico] = useState([]);


  const dados = dadosPedidosCompra.map((item, index) => {
    return {
      IDPEDIDOCOMPRA: item.IDPEDIDOCOMPRA,
      EMPRESA: item.EMPRESA
    }
  });

  const colunasPedidos = [

    {
      field: 'IDPEDIDOCOMPRA',
      header: 'Nº Pedido',
      body: row => row.IDPEDIDOCOMPRA,
      sortable: true,
    },
    {
      field: 'EMPRESA',
      header: 'Empresa',
      body: row => row.EMPRESA,
      sortable: true,
    },
    {
      field: 'IDPEDIDOCOMPRA',
      header: 'Opções',
      body: (row) => {

        return (
          <div className="p-1 "
            style={{ display: "flex" }}
          >

            <div className="p-1">
              <ButtonTable
                Icon={GrView}
                cor={"success"}
                iconColor={"white"}
                iconSize={20}
                onClickButton={() => handleClickDetalhar(row)}
                titleButton={"Imprimir Pedido Com Preço de Venda"}
              />
            </div>
            <div className="p-1">
              {/* <Checkbox 
                variant="filled" 
                onChange={e => setRowClick(e.checked)} 
                value={rowClick}
              >

              </Checkbox> */}

              <ButtonTable
                Icon={CiEdit}
                cor={"primary"}
                iconColor={"white"}
                iconSize={20}
                onClickButton={() => handleClickCheck(row)}
                titleButton={"Imprimir Pedido Com Preço de Venda"}
              />
              
            </div>

          </div>
        )

      },
    },

  ]


  const handleClickDetalhar = (row) => {
    if(row && row.IDPEDIDOCOMPRA) {
      handleDetalhar(row.IDPEDIDOCOMPRA)
    }
  }

  const handleDetalhar = async (IDPEDIDOCOMPRA) => {
    try {
      const response = await get(`/detalheDistribuicaoCompras?idPedido=${IDPEDIDOCOMPRA}`)
      setDadosDetalhePedido(response.data)
      setModalDetalhePedido(true)
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickCheck = (row) => {
    if(row && row.IDPEDIDOCOMPRA) {
      handleCheck(row.IDPEDIDOCOMPRA)
    }
  }

  const handleCheck = async (IDPEDIDOCOMPRA) => {
    try {
      const response = await get(`/distribuicaoSugestoesHistorico?&idPedido=${IDPEDIDOCOMPRA}`)
      setDadosSugestoesHistorico(response)
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }



  return (
    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dados}
          sortField="VRTOTALPAGO"
          selectionMode={rowClick ? null : 'checkbox'}
          selection={empresaSelecionada}
          onSelectionChange={e => setEmpresaSelecionada(e.value)}
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
              selectionMode={coluna.selectionMode}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>

        <ButtonType
          textButton={"Enviar Pedido"}
          Icon={FiSend}
          cor={"success"}
          iconColor={"white"}
          iconSize={20}
          onClickButtonType={handleClickCheck}
        />

      
      </div>

      <ActionDetalhePedidoModal 
        show={modalDetalhePedido}
        handleClose={() => setModalDetalhePedido(false)}
        dadosDetalhePedido={dadosDetalhePedido}
      />

      <ActionListaDistribuicaoSugestoesHistorico
        dadosSugestoesHistorico={dadosSugestoesHistorico}
      /> 
    </Fragment>
  )
}