import React, { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { GrCertificate, GrView } from "react-icons/gr";
import { get } from "../../../../api/funcRequest";
import { ActionDetalheFechamentoLojaModal } from "./actionDetalheFechamentoLojaModal";


export const ActionListaVendasLoja = ({dadosVendasPagamentos, dataPesquisa}) => {
  const [dadosDetalheFechamento, setDadosDetalheFechamento] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const calcularTotalRealizado = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.VALORTOTALDINHEIRO) +
      toFloat(item.VALORTOTALCARTAO) +
      toFloat(item.VALORTOTALCONVENIO) +
      toFloat(item.VALORTOTALPOS) +
      toFloat(item.VALORTOTALFATURA) +
      toFloat(item.VALORTOTALDESPESA)
    );
  }
  const calcularTotalDespesasAdiantamento = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (

      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    );
  }

  const calcularDespesasAdiantamento = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    );
  }

  const calcularTotalDisponivel = (item) => {
    const toFloat = (value) => (isNaN(parseFloat(value)) || value === null || value === undefined) ? 0 : parseFloat(value);

    return (
      toFloat(item.VALORTOTALDINHEIRO) +
      toFloat(item.VALORTOTALFATURA) -
      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    )
  }

  const calcularTotalDinheiroColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALDINHEIRO);
    }
    return total;
  }
  const calcularTotalCartaoColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALCARTAO);
    }
    return total;
  }
  const calcularTotalPosColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALPOS);
    }
    return total;
  }
  const calcularTotalFaturaColuna = () => {
    let total = 0;
    for (let venda of dadosVendasPagamentos) {
      total += parseFloat(venda.VALORTOTALFATURA);
    }
    return total;
  }
  const calcularTotalDespesaColuna = () => {
    let total = 0;
    for (let venda of dados) {
      total += parseFloat(venda.totalDespesasAdiantamento) ? parseFloat(venda.totalDespesasAdiantamento) : 0;
    }
    return total;
  }
  const calcularTotalDisponivelColuna = () => {
    let total = 0;
    for (let venda of dados) {
      total += parseFloat(venda.totalDisponivel);
    }
    return total;
  }

  const dados = dadosVendasPagamentos.map((item, index) => {
    let contador = index + 1;
    const totalDespesasAdiantamento = calcularDespesasAdiantamento(item);
    const totalDisponivel = calcularTotalDisponivel(item);
  
    return {

      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      VALORTOTALDINHEIRO: item.VALORTOTALDINHEIRO,
      VALORTOTALCARTAO: item.VALORTOTALCARTAO,
      VALORTOTALPOS: item.VALORTOTALPOS,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      VALORTOTALDESPESA: parseFloat(item.VALORTOTALDESPESA),
      VALORTOTALADIANTAMENTOSALARIAL: item.VALORTOTALADIANTAMENTOSALARIAL,
      totalDespesasAdiantamento: formatMoeda(totalDespesasAdiantamento),
      totalDisponivel: totalDisponivel,
      dataPesquisa,
      contador
    }
  });

  const colunasVendasPagamento = [
    {
      field: 'dataPesquisa',
      header: 'Data',
      body: (row) => row.dataPesquisa,
      sortable: true
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: (row) => row.NOFANTASIA,
      sortable: true,
      'footer': 'Total'
    },
    {
      field: 'VALORTOTALDINHEIRO',
      header: 'Dinheiro',
      body: (row) => formatMoeda(row.VALORTOTALDINHEIRO),
      sortable: true,
      footer: formatMoeda(calcularTotalDinheiroColuna())
    },
    {
      field: 'VALORTOTALCARTAO',
      header: 'Cartão',
      body: (row) => formatMoeda(row.VALORTOTALCARTAO),
      sortable: true,
      footer: formatMoeda(calcularTotalCartaoColuna())
    },
    {
      field: 'VALORTOTALPOS',
      header: 'POS',
      body: (row) => formatMoeda(row.VALORTOTALPOS),
      sortable: true,
      footer: formatMoeda(calcularTotalPosColuna())
    },
    {
      field: 'VALORTOTALFATURA',
      header: 'Fatura',
      body: (row) => formatMoeda(row.VALORTOTALFATURA),
      sortable: true,
      footer: formatMoeda(calcularTotalFaturaColuna())
    },
    {
      field: 'totalDespesasAdiantamento',
      header: 'Despesas',
      body: (row) => row.totalDespesasAdiantamento,
      sortable: true,
      footer: formatMoeda(calcularTotalDespesaColuna())
    },
    {
      field: 'totalDisponivel',
      header: 'Disponível',
      body: (row) => formatMoeda(row.totalDisponivel),
      sortable: true,
      footer: formatMoeda(calcularTotalDisponivelColuna())
    },
    {
      field: 'DINHEIRO',
      header: 'Opções',
      body: (row) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="p-1">
              <ButtonTable
                titleButton={"Detalhar Fechamento"}
                onClickButton={() => handleClickEdit(row)}
                Icon={GrView}
                iconSize={16}
                iconColor={"#fff"}
                cor={"success"}

              />
            </div>
          </div>
        )
      },
    }
  ]

  const handleEdit = async (IDEMPRESA) => {
    try {
      const response = await get(`/detalheFechamento?idEmpresa=${IDEMPRESA}&dataPesquisa=${dataPesquisa}`);

      if (response.data) {
        setDadosDetalheFechamento(response.data);
        setModalVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEdit = (row) => {
    if (row && row.IDEMPRESA) {
      handleEdit(row.IDEMPRESA);
    }
  };

  return (

    <Fragment>
     
      <div className="card">
        <DataTable
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
          {colunasVendasPagamento.map(coluna => (

            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}
              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>
      </div>

      <ActionDetalheFechamentoLojaModal
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
        dadosDetalheFechamento={dadosDetalheFechamento}
      />
    </Fragment>
  )
}

