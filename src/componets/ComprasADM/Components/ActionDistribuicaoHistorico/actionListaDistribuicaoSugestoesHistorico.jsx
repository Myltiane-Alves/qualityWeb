import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import { Fragment, useState } from 'react';
import { Checkbox } from "primereact/checkbox";
import { get } from '../../../../api/funcRequest';
import { ActionDetalhePedidoModal } from './actionDetalhePedidoModal';
import { GrView } from 'react-icons/gr';


export const ActionListaDistribuicaoSugestoesHistorico = ({ dadosSugestoesHistorico }) => {
  const [actionListaPedidos, setActionListaPedidos] = useState(true)
  const [actionPedidoResumido, setActionPedidoResumido] = useState(true)
  const [rowClick, setRowClick] = useState(true);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);


  const dados = dadosSugestoesHistorico.map((item, index) => {

    return {
      DescProduto: item.DescProduto,
      CodBarras: item.CodBarras,
      Grade: item.Grade,
      IdEmpresa: item.IdEmpresa,
      IdPedidoCompra: item.IdPedidoCompra,
      PrecoVenda: item.PrecoVenda,
      QtdGrade: item.QtdGrade,
      StConcluido: item.StConcluido,
      
      Filiais: item[0]?.Filiais.DescFilial,
      Filiais: item[0]?.Filiais.IdFilial,

      IdDistribuicaoCompras:item[0]?.Sugestao.IdDistribuicaoCompras,
      IdFilial:item[0]?.Sugestao.IdFilial,
      QtdSugestao:item[0]?.Sugestao.QtdSugestao,
      QtdSugestaoAlteracao:item[0]?.Sugestao.QtdSugestaoAlteracao,

    }
  });


  const colunasPedidos = [

    {
      field: 'DescProduto',
      header: 'Produto',
      body: row => row.DescProduto,
      sortable: true,
    },
    {
      field: 'PrecoVenda',
      header: 'Valor',
      body: row => row.PrecoVenda,
      sortable: true,
    },
    {
      field: 'QtdGrade',
      header: 'QTD',
      body: row => row.QtdGrade,
      sortable: true,
    },
    {
      field: 'Grade',
      header: 'Grade',
      body: row => row.Grade,
      sortable: true,
    },
    {
      field: 'Grade',
      header: 'Total',
      body: (row) => {
        return (
          <input type="text" value={row.QtdGrade * row.PrecoVenda} />
        )
      },
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
              <Checkbox variant="filled" onChange={e => setRowClick(e.checked)} checked={rowClick}></Checkbox>
              
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