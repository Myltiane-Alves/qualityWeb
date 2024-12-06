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


export const ActionListaNovoPedidos = ({ dadosDetalhePedidos }) => {
  const [actionListaPedidos, setActionListaPedidos] = useState(true)
  const [actionPedidoResumido, setActionPedidoResumido] = useState(true)
  const navigate = useNavigate();
 
  const dadosListaPedidos = dadosDetalhePedidos.map((item, index) => {
    let contador = index + 1;
    return {
      IDPEDIDO: item.IDPEDIDO,
      IDDETPEDIDO: item.IDDETPEDIDO,
      DSCATEGORIAPEDIDO: item.DSCATEGORIAPEDIDO,
      QTDTOTAL: item.QTDTOTAL,
      DSSIGLA: item.DSSIGLA,
      NUREF: item.NUREF,
      DSPRODUTO: item.DSPRODUTO,
      DESC01: item.DESC01,
      DESC02: item.DESC02,
      DESC03: item.DESC03,
      VRUNITLIQDETALHEPEDIDO: item.VRUNITLIQDETALHEPEDIDO,
      VRUNITLIQDETALHEPEDIDO: item.VRUNITLIQDETALHEPEDIDO,
      VRVENDADETALHEPEDIDO: item.VRVENDADETALHEPEDIDO,
      VRTOTALDETALHEPEDIDO: item.VRTOTALDETALHEPEDIDO,
      STTRANSFORMADO: item.STTRANSFORMADO,
      DSSUBGRUPOESTRUTURA: item.DSSUBGRUPOESTRUTURA,
      DSCOR: item.DSCOR,
      IDANDAMENTO: item.IDANDAMENTO,
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
      field: 'DSCATEGORIAPEDIDO',
      header: 'Categoria',
      body: row => row.DSCATEGORIAPEDIDO,
      sortable: true,
    },
    {
      field: 'QTDTOTAL',
      header: 'QTD',
      body: row => row.QTDTOTAL,
      sortable: true,
    },
    {
      field: 'DSSIGLA',
      header: 'Unid',
      body: row => row.DSSIGLA,
      sortable: true,
    },
    {
      field: 'NUREF',
      header: 'Ref.',
      body: row => row.NUREF,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Descrição',
      body: row => row.DSPRODUTO,
      sortable: true,
    },
    {
      field: 'DSSUBGRUPOESTRUTURA',
      header: 'Estrutura',
      body: row => row.DSSUBGRUPOESTRUTURA,
      sortable: true,
    },
    {
      field: 'DSCOR',
      header: 'Cor',
      body: row => row.DSCOR,
      sortable: true,
    },
    {
      field: 'DESC01',
      header: 'Desc I',
      body: row => parseFloat(row.DESC01).toFixed(2),
      sortable: true,
    },
    {
      field: 'DESC02',
      header: 'Desc II',
      body: row => parseFloat(row.DESC02).toFixed(2),
      sortable: true,
    },
    {
      field: 'DESC03',
      header: 'Desc III',
      body: row => parseFloat(row.DESC03).toFixed(2),
      sortable: true,
    },
    {
      field: 'VRUNITLIQDETALHEPEDIDO',
      header: 'Vr. Unit',
      body: row => formatMoeda(row.VRUNITLIQDETALHEPEDIDO),
      sortable: true,
    },
    {
      field: 'VRVENDADETALHEPEDIDO',
      header: 'Vr Venda',
      body: row => formatMoeda(row.VRVENDADETALHEPEDIDO),
      sortable: true,
    },
    {
      field: 'VRTOTALDETALHEPEDIDO',
      header: 'Total',
      body: row => formatMoeda(row.VRTOTALDETALHEPEDIDO),
      sortable: true,
    },
    {
      field: 'contador',
      header: 'Opções',
      body: row => row.contador,
      sortable: true,
    },
  ]

  return (
    <Fragment>
    
      <div className="card " style={{marginTop: "13rem"}}>
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