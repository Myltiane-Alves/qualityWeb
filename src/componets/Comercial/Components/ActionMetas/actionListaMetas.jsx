import { Fragment } from "react"
import { GrFormView } from "react-icons/gr";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dataFormatada } from "../../../../utils/dataFormatada";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";


export const ActionListaMetas = ({dadosVendasMarca}) => {


  const dados = dadosVendasMarca.map((item, index) => {
    let contador = index + 1;

    return {
    

      IDGRUPOEMPRESA: item.IDGRUPOEMPRESA,
      DTMETAINICIOFORMAT: item.DTMETAINICIOFORMAT,
      DTMETAFIMFORMAT: item.DTMETAFIMFORMAT,
      DTMETAINICIO: item.DTMETAINICIO,
      NOFANTASIA: item.NOFANTASIA,
      DTMETAFIM: item.DTMETAFIM,
      DSSUBGRUPOEMPRESARIAL: item.DSSUBGRUPOEMPRESARIAL,
      STATIVO: item.STATIVO,
      STSALVO: item.STSALVO,
  

      contador
    };
  });

  const colunasVendas = [
    {
      field: 'contador',
      header: '#',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'DSSUBGRUPOEMPRESARIAL',
      header: 'Grupo',
      body: row => row.DSSUBGRUPOEMPRESARIAL,
      sortable: true,
 
    },
    {
      field: 'DTMETAINICIOFORMAT',
      header: 'Data Início',
      body: row => dataFormatada(row.DTMETAINICIOFORMAT),
      sortable: true,

    },
    {
      field: 'DTMETAFIMFORMAT',
      header: 'DataFim',
      body: row => dataFormatada(row.DTMETAFIMFORMAT),
      sortable: true,
    
    },
    {
      field: 'STSALVO',
      header: 'Situação',
      body: (
        (row) => (
          <div style={{ color: row.STSALVO == 'True' ? 'blue' : 'red' }}>
            {row.STSALVO == 'True' ? 'SALVO' : 'NÃO SALVO'}

          </div>
        )
      ),
      sortable: true,
    },
    {
      field: 'STSALVO',
      header: 'Situação',
      body: (
        (row) => (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="p-1">
              <ButtonTable
                titleButton={"Metas Resumida"}
                onClickButton
                Icon={FaBalanceScale}
                iconSize={18}
                iconColor={"#fff"}
                cor={"success"}

              />

            </div>
            <div className="p-1">
              <ButtonTable
                titleButton={"Metas Detalhada"}
                onClickButton
                Icon={GrFormView}
                iconSize={18}
                iconColor={"#fff"}
                cor={"info"}

              />

            </div>
            <div className="p-1">
              <ButtonTable
                titleButton={"Excluir Metas"}
                onClickButton
                Icon={AiOutlineDelete}
                iconSize={18}
                iconColor={"#fff"}
                cor={"danger"}

              />

            </div>


          </div>
        )
      ),
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
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        
        >
          {colunasVendas.map(coluna => (
            <Column
              key={coluna.field}
              field={coluna.field}
              header={coluna.header}

              body={coluna.body}
              footer={coluna.footer}
              sortable={coluna.sortable}
              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc',fontSize: '0.8rem' }}
              bodyStyle={{ fontSize: '0.8rem' }}

            />
          ))}
        </DataTable>

      </div>
    </Fragment>
  )
}

