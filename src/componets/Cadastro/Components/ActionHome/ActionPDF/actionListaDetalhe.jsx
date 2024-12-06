import { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toFloat } from "../../../../../utils/toFloat";
import { formatMoeda } from "../../../../../utils/formatMoeda";

//  ERRO RETORNAR AQUI PARA FAZER A TABELA DA FORMA CORRETA
export const ActionListaDetalhe = ({  dadosDetalhePedido }) => {
   

    const dados = dadosDetalhePedido.map((item, index) => {
        let contador = index + 1;
        
        return {
          DSSUBGRUPOESTRUTURA: item.DSSUBGRUPOESTRUTURA,
          QTDTOTAL: item.detpedido?.QTDTOTAL,
          DSSIGLA: item.detpedido?.DSSIGLA,
          NUREF: item.detpedido?.NUREF,
          DSPRODUTO: item.detpedido?.DSPRODUTO,
          DSCOR: item.detpedido?.DSCOR,
          DSLOCALEXPOSICAO: item.detpedido?.DSLOCALEXPOSICAO,
          DSESTILO: item.detpedido?.DSESTILO,
          STECOMMERCE: item.detpedido?.STECOMMERCE,
          STREDESOCIAL: item.detpedido?.STREDESOCIAL,
          OBSPRODUTO: item.detpedido?.OBSPRODUTO,
          VRUNITLIQDETALHEPEDIDO: item.detpedido?.VRUNITLIQDETALHEPEDIDO,
          VRVENDADETALHEPEDIDO: item.detpedido?.VRVENDADETALHEPEDIDO,
          VRTOTALDETALHEPEDIDO: item.detpedido?.VRTOTALDETALHEPEDIDO,
          IDPEDIDO: item.detpedido?.IDPEDIDO,
          IDDETPEDIDO: item.detpedido?.IDDETPEDIDO,
          DSCATEGORIAPEDIDO: item.detpedido?.DSCATEGORIAPEDIDO,
          DSSUBGRUPOESTRUTURA: item.detpedido?.DSSUBGRUPOESTRUTURA,
          DSGRUPOESTRUTURA: item.detpedido?.DSGRUPOESTRUTURA,

          DSTAMANHO: item.detalheGrade?.DSTAMANHO,
          INDICETAMANHO: item.detalheGrade?.INDICETAMANHO,
          contador
        }
      });

      const calcularTotalVrBruto = () => {
        const total = calcularTotal('VRTOTALDETALHEPEDIDO');
        return total;
      }

      const calcularQtdTotalPedido = () => {
        const total = calcularTotal('QTDTOTAL');
        return total;
      }

      const colunasPedidos = [
        {
          field: 'DSSUBGRUPOESTRUTURA',
          header: 'Nº',
          body: row => <th>{row.DSSUBGRUPOESTRUTURA}</th>,
          sortable: true,
        },
        {
          field: 'contador',
          header: '#',
          body: row => <th>{row.contador}</th>,
          sortable: true,
        },
        {
          field: 'QTDTOTAL',
          header: 'Qtd',
          body: row => <th>{row.QTDTOTAL}</th>,
          sortable: true,
        },
        {
          field: 'DSSIGLA',
          header: 'Unid',
          body: row => <th>{row.DSSIGLA}</th>,
          sortable: true,
        },
        {
          field: 'NUREF',
          header: 'Referência',
          body: row => <th>{row.NUREF}</th>,
          sortable: true,
        },
        {
          field: 'DSPRODUTO',
          header: 'Descrição',
          body: row => <th>{row.DSPRODUTO}</th>,
          footer: 'Total ',
          sortable: true,
        },
        {
          field: 'DSCOR',
          header: 'Cor',
          body: row => <th>{row.DSCOR}</th>,
    
          sortable: true,
        },
        {
          field: 'DSLOCALEXPOSICAO',
          header: 'Local Exp',
          body: row => <th>{row.DSLOCALEXPOSICAO}</th>,
          sortable: true,
        },
        {
          field: 'DSESTILO',
          header: 'Estilo',
          body: row => <th>{row.DSESTILO}</th>,
          sortable: true,
        },
        {
          field: 'STECOMMERCE',
          header: 'R.Social',
          body: row => {
            return (
              <div>
                <th style={{ }} >{row.STECOMMERCE == 'True' ? 'SIM' : 'NÃO'}</th>
              </div>
            )
          },
          sortable: true,
        },
        {
          field: 'STREDESOCIAL',
          header: 'Ecomm.',
          body: row => <th > {row.STREDESOCIAL == 'True' ? 'SIM' : 'NÃO'}</th>,
          sortable: true,
        },
        {
          field: 'OBSPRODUTO',
          header: 'Obs',
          body: row => <th >{row.OBSPRODUTO} </th>,
          sortable: true,
        },
        {
          field: 'DSTAMANHO',
          header: 'Grade',
          body: row => <th >{row.DSTAMANHO} - {row.INDICETAMANHO}</th>,
          sortable: true,
        },
        {
          field: 'VRUNITLIQDETALHEPEDIDO',
          header: 'Vr Unit',
          body: row => <th >{formatMoeda(row.VRUNITLIQDETALHEPEDIDO)}</th>,
          sortable: true,
        },
        {
          field: 'VRVENDADETALHEPEDIDO',
          header: 'Vr Venda',
          body: row => <th >{formatMoeda(row.VRVENDADETALHEPEDIDO)}</th>,
          sortable: true,
        },
        {
          field: 'VRTOTALDETALHEPEDIDO',
          header: 'Total',
          body: row => <th >{formatMoeda(row.VRTOTALDETALHEPEDIDO)} </th>,
          sortable: true,
        },
      ]

    return (
        <Fragment>
            


            <DataTable
            title="Vendas por Loja"
            value={dados}
            size="small"
            sortOrder={-1}
       
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
                headerStyle={{ color: '#495057', backgroundColor: "transparent", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

                />
            ))}
            </DataTable>

        </Fragment>
    )
}