import React, { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";
import { formatarPorcentagem } from "../../../../utils/formatarPorcentagem";
import { dataFormatada } from "../../../../utils/dataFormatada";



export const ActionListaAlteracaoPreco = ({dadosAlteracaoPreco}) => {


  const calcularDiferencaPreco = (item) => {
    return (
      toFloat(item.PRECOVENDA) - toFloat(item.PRECOVENDAANTERIOR)
    );
  }

  const calcularValorAnterior = (item) => {
    return (
      toFloat(item.PRECOVENDAANTERIOR) * toFloat(item.QTDFINAL)
    );
  }
  const dados = Array.isArray(dadosAlteracaoPreco) ? dadosAlteracaoPreco.map((item, index) => {
    let contador = index + 1;
 
    const diferencaPreco = calcularDiferencaPreco(item);
    const valorAnterior = calcularValorAnterior(item);
    const valorAtual = toFloat(item.PRECOVENDA) * toFloat(item.QTDFINAL);
    const diferencaValor = valorAtual - valorAnterior;
    const diferencaPercentual = (toFloat(valorAtual) - toFloat(valorAnterior)) / toFloat(valorAnterior) * 100;
    const somaDiferencaPercentual = toFloat(diferencaPercentual) * toFloat(item.QTDFINAL)
    
  
    return {
      IDRESUMOALTERACAOPRECOPRODUTO: item.IDRESUMOALTERACAOPRECOPRODUTO,
      DTHORAEXECUTADO: item.DTHORAEXECUTADO,
      IDGRUPOESTRUTURA: item.IDGRUPOESTRUTURA,
      DSGRUPOESTRUTURA: item.DSGRUPOESTRUTURA,
      DSSUBGRUPOESTRUTURA: item.DSSUBGRUPOESTRUTURA,
      DSNOME: item.DSNOME,
      IDPRODUTO: item.IDPRODUTO,
      NUCODBARRAS: item.NUCODBARRAS,
      PRECOVENDAANTERIOR: toFloat(item.PRECOVENDAANTERIOR),
      PRECOVENDA: toFloat(item.PRECOVENDA),
      QTDFINAL: toFloat(item.QTDFINAL),
      diferencaPreco: diferencaPreco,
      valorAnterior: toFloat(valorAnterior),
      valorAtual: toFloat(valorAtual),
      diferencaValor: toFloat(diferencaValor),
      diferencaPercentual: formatarPorcentagem(diferencaPercentual),
      contador
    }
  }) : [];

  const calcularEstoque= () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.QTDFINAL), 0);
  }

  const calcularTotalPrecoAnterior = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.PRECOVENDAANTERIOR), 0);
  }

  const calcularTotalPrecoAtual = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.PRECOVENDA), 0);
  }

  const calcularTotalDiferencaPreco = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.diferencaPreco), 0);
  }

  const calcularTotalValorAnterior = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.valorAnterior), 0);
  }

  const calcularTotalValorAtual = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.valorAtual), 0);
  }

  const calcularTotalDiferencaValor = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.diferencaValor), 0);
  }

  const colunasAlteracaoPreco = [
    {
      field: 'DTHORAEXECUTADO',
      header: 'Data',
      body: row => <th>{dataFormatada(row.DTHORAEXECUTADO)}</th>,
      sortable: true,
    },
    {
      field: 'IDRESUMOALTERACAOPRECOPRODUTO',
      header: 'Nº Alteração',
      body: row => <th>{row.IDRESUMOALTERACAOPRECOPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'IDGRUPOESTRUTURA',
      header: 'Grupo',
      body: row => <th> {row.IDGRUPOESTRUTURA} - {row.DSGRUPOESTRUTURA}</th>,
      sortable: true,
    },
    {
      field: 'DSGRUPOESTRUTURA',
      header: 'Sub Grupo',
      body: row => <th>{row.DSGRUPOESTRUTURA}</th>,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Produto',
      body: row => <th>{row.DSNOME}</th>,
      sortable: true,
    },
    {
      field: 'IDPRODUTO',
      header: 'Código',	
      body: row => <th>{row.IDPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Código Barras',
      body: row => <th>{row.NUCODBARRAS}</th>,
      footer: 'Total',
      sortable: true,
    },
    {
      field: 'QTDFINAL',
      header: 'Estoque',
      body: row => <th>{row.QTDFINAL}</th>,
      footer: row => calcularEstoque(),
      sortable: true, 
    },
    {
      field: 'PRECOVENDAANTERIOR',
      header: 'Preço Anterior',
      body: row => <th>{formatMoeda(row.PRECOVENDAANTERIOR)}</th>,
      footer: row => formatMoeda(calcularTotalPrecoAnterior()),
      sortable: true,
    },
    {
      field: 'PRECOVENDA',
      header: 'Preço Atual',
      body: row => <th>{formatMoeda(row.PRECOVENDA)}</th>,
      footer: row => formatMoeda(calcularTotalPrecoAtual()),
      sortable: true,
    },
    {
      field: 'diferencaPreco',
      header: 'Dif(R$)',
      body: row => <th>{formatMoeda(row.diferencaPreco)}</th>,
      footer: row => formatMoeda(calcularTotalDiferencaPreco()),
      sortable: true,
    },
    {
      field: 'valorAnterior',
      header: 'Valor Anterior',
      body: row => <th>{formatMoeda(row.valorAnterior)}</th>,
      footer: row => formatMoeda(calcularTotalValorAnterior()),
      sortable: true,
    },
    {
      field: 'valorAtual',
      header: 'Valor Atual',
      body: row => <th>{formatMoeda(row.valorAtual)}</th>,
      footer: row => formatMoeda(calcularTotalValorAtual()),
      sortable: true,
    },
    {
      field: 'diferencaValor',
      header: 'Dif(R$)',
      body: row => <th>{formatMoeda(row.diferencaValor)}</th>,
      footer: row => formatMoeda(calcularTotalDiferencaValor()),
      sortable: true,
    },
    {
      field: 'diferencaPercentual',
      header: 'Dif(%)',
      body: row => <th>{row.diferencaPercentual}</th>,
      sortable: true,
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
         rowsPerPageOptions={[5, 10, 20, 50, 100, dados.length]}
         showGridlines
         stripedRows
         emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
       >
         {colunasAlteracaoPreco.map(coluna => (
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
      

    </Fragment>
  )
}


