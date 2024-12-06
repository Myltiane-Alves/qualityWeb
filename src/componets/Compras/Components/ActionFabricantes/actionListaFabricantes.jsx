import { Fragment, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GrView } from 'react-icons/gr';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import { CiEdit } from 'react-icons/ci';
import { SiSap } from "react-icons/si";
import { BsTrash3 } from "react-icons/bs";
import { get } from "../../../../api/funcRequest";
import { ActionVincularFabricanteFornecedorModal } from "../ActionFonecedores/actionVincularFabricanteFornecedorModal";
import { ActionEditarFabricanteModal } from "./actionEditarFabricanteModal";

export const ActionListaFabricantes = ({ dadosFabricantesFornecedo }) => {
  const [dadosDetalheFornecedorFabricante, setDadosDetalheFornecedorFabricante] = useState([]);
  const [dadosDetalheFabricante, setDadosDetalheFabricante] = useState([]);
  const [modalEditarFabricante, setModalEditarFabricante] = useState(false);
  const [modalEditarVinculo, setModalEditarVinculo] = useState(false);

  const dadosListaFornecedoresFabricantes = dadosFabricantesFornecedo.map((item, index) => {
    let contador = index + 1;

    return {
      IDFORNECEDOR: item.IDFORNECEDOR,
      IDFABRICANTE: item.IDFABRICANTE,
      IDFABSAP: item.IDFABSAP,
      IDFABRICANTEFORN: item.IDFABRICANTEFORN,
      NOFANTFORN: item.NOFANTFORN,
      DSFABRICANTE: item.DSFABRICANTE,
      LOGFABSAP: item.LOGFABSAP,
      STATIVO: item.STATIVO,



      contador,
    }
  })

  const colunasFornecedores = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true
    },
    {
      field: 'DSFABRICANTE',
      header: 'Fabricante',
      body: row => row.DSFABRICANTE,
      sortable: true
    },
    {
      field: 'IDFABSAP',
      header: 'St. SAP',
      body: (row) => {
        return (
          <div>
            <p style={{fontWeight: 700, color: row.IDFABSAP && !row.IDFABSAP ? '#fd3995' : '#2196F3'}}>  
              {row.IDFABSAP && !row.IDFABSAP ? 'NÃO MIGRADO' : 'MIGRADO' }
              {/* {row.IDFABSAP} */}
            </p>
          </div>
        )
      }
    },
    {
      field: 'NOFANTFORN',
      header: 'Fornecedor Vinculado',
      body: row => {
        return (
          <p style={{fontWeight: 700, color: row.NOFANTFORN || 'SEM VINCULO' ?  '' : '#fd3995'}} >
            {row.NOFANTFORN || 'SEM VINCULO' }
          </p>
        )
      },
      sortable: true
    },
   
    {
      field: 'STATIVO',
      header: 'Situação',
      body: (row) => {
        return (
          <p style={{ color: row.STATIVO == 'True' ? '#2196F3' : '#fd3995', fontWeight: 700 }}>{row.STATIVO == 'True' ? 'ATIVO' : 'INATIVO'}</p>
        )
      },
      sortable: true
    },
    {
      field: 'IDFORNECEDOR',
      header: 'Opções',
      body: (row) => {
        if (row.IDFORNECEDOR > 0) {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
            >
              <div className="p-1">
                <ButtonTable
                  Icon={CiEdit}
                  cor={"success"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => clickEditarFabricante(row)}
                  titleButton={"Editar Fabricante"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={CiEdit}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => clickVinculoFonecedorFabricante(row)}
                  titleButton={"Editar Vínculo Fabricante/Fornecedor"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={BsTrash3}
                  cor={"danger"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => clickVinculoFonecedorFabricante(row)}
                  titleButton={"Excluir Vínculo Fabricante/Fornecedor"}
                />
              </div>
              <div className="p-1">
                {!row.IDFABSAP ?
                  <ButtonTable
                    Icon={SiSap}
                    cor={"primary"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton={() => clickVinculoFonecedorFabricante(row)}
                    titleButton={"Migrar Fabricante SAP"}
                  />
                
                : ''}
              </div>
              
             
            </div>
          )

        } else {
          return (
            <div style={{ display: "flex" }}>
              <div className="p-1">
                <ButtonTable
                  Icon={CiEdit}
                  cor={"info"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => clickEditarFabricante(row)}
                  titleButton={"Editar Fabricante"}
                />
              </div>

              <div className="p-1">
                {row.IDFABSAP ? 
                  <ButtonTable
                    Icon={GrView}
                    cor={"success"}
                    iconColor={"white"}
                    iconSize={20}
                    onClickButton
                    titleButton={"Migrar Fabricante SAP"}
                  />
                : ''}
              </div>
            </div>

          )
        }
      }
    }
  ]

  const editarFabricante = async (IDFABRICANTE) => {
    try {
      const response = await get(`/fabricantes?idFabricante=${IDFABRICANTE}`);

      if (response.data) {
        setDadosDetalheFabricante(response.data)
        setModalEditarFabricante(true);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da despesa: ', error);
    }
  };


  const clickEditarFabricante = (row) => {
    if (row && row.IDFABRICANTE) {
      editarFabricante(row.IDFABRICANTE);
    }
  };

  const editarVinculoFornecedorFabricante = async (IDFABRICANTEFORN) => {
    try {
      const response = await get(`/vincularFabricanteFornecedor?idFornecedorFabricante=${IDFABRICANTEFORN}`);

      if (response.data && response.data.length > 0) {
        setDadosDetalheFornecedorFabricante(response.data)
        setModalEditarVinculo(true);

      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da despesa: ', error);
    }
  };

  const clickVinculoFonecedorFabricante = (row) => {
    if (row && row.IDFABRICANTEFORN) {
      editarVinculoFornecedorFabricante(row.IDFABRICANTEFORN);
    }
  };
  return (
    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosListaFornecedoresFabricantes}
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
          {colunasFornecedores.map(coluna => (
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

      <ActionEditarFabricanteModal
        show={modalEditarFabricante}
        handleClose={() => setModalEditarFabricante(false)}
        dadosDetalheFabricante={dadosDetalheFabricante}
      />

      <ActionVincularFabricanteFornecedorModal 
        show={modalEditarVinculo}
        handleClose={() => setModalEditarVinculo(false)}
        dadosDetalheFornecedorFabricante={dadosDetalheFornecedorFabricante}
      />
    </Fragment>
  )
}