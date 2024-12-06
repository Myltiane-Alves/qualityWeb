import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { get } from "../../../../api/funcRequest";


export const ActionListaAlteracaoPreco = ({dadosAlteracaoPreco}) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosDetalheEstilos, setDadosDetalheEstilos] = useState([]);
 
  const dados = dadosAlteracaoPreco.map((item, index) => {
    let contador = index + 1;
 
    return {
      IDRESUMOALTERACAOPRECOPRODUTO: item.IDRESUMOALTERACAOPRECOPRODUTO,
      NOMELISTA: item.NOMELISTA,
      NOFANTASIA: item.NOFANTASIA,
      IDUSUARIO: item.IDUSUARIO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      DATACRIACAOFORMATADA: item.DATACRIACAOFORMATADA,
      AGENDAMENTOALTERACAO: item.AGENDAMENTOALTERACAO,
      AGENDAMENTOALTERACAOFORMATADO: item.AGENDAMENTOALTERACAOFORMATADO,
      QTDITENS: item.QTDITENS,

      contador
    }
  })

  const colunasAlteracoesPreco = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'IDRESUMOALTERACAOPRECOPRODUTO',
      header: 'ID Alteração',
      body: row => row.IDRESUMOALTERACAOPRECOPRODUTO,
      sortable: true,
    },
    {
      field: 'NOMELISTA',
      header: 'Lista de Preço',
      body: row => {
        return (
          <p> {row.NOMELISTA || row.NOFANTASIA}</p>
        )
      
      },
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Responsável',
      body: row => {
        return (
          <p >{row.NOFUNCIONARIO || ''}</p>
        )
      },
      sortable: true,
    },
    {
      field: 'QTDITENS',
      header: 'Qtd. Produtos',
      body: row => {
        return (
          <p >{row.QTDITENS || ''}</p>
        )
      },
      sortable: true,
    },
    {
      field: 'DATACRIACAOFORMATADA',
      header: 'Data Criação',
      body: row => {
        return (
          <p >{row.DATACRIACAOFORMATADA || ''}</p>
        )
      },
      sortable: true,
    },
    {
      field: 'AGENDAMENTOALTERACAOFORMATADO',
      header: 'Data Agendamento',
      body: row => {
        return (
          <p >{row.AGENDAMENTOALTERACAOFORMATADO || row.DATACRIACAOFORMATADA}</p>
        )
      },
      sortable: true,
    },
  
    {
      field: 'IDRESUMOALTERACAOPRECOPRODUTO',
      header: 'Detalhes',
      body: row => {
        return (
          <div>
            <ButtonTable
              titleButton={"Editar "}
              onClickButton={() => clickEditar(row)}
              cor={"success"}
              Icon={CiEdit}
              iconSize={22}
              iconColor={"#fff"}

            />
          </div>
        )
      },
      sortable: true,
    }
  ]

  const clickEditar = (row) => {
    if (row && row.ID_ESTILOS) {
      handleEditar(row.ID_ESTILOS);
    }
  };

  const handleEditar = async (ID_ESTILOS) => {
    try {
      const response = await get(`/listaEstilos?idEstilo=${ID_ESTILOS}`);
      setDadosDetalheEstilos(response.data);
      setModalEditar(true)
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
          // header={header}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
        >
          {colunasAlteracoesPreco.map(coluna => (
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