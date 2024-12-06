import React, { Fragment, useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CiEdit } from "react-icons/ci";

import { get, put } from "../../../../api/funcRequest";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { dataFormatada } from "../../../../utils/dataFormatada";
import { ActionUpdateFuncionarioModal } from "./actionUpdateFuncionarioModal";

export const ActionListaFuncionario = ({dadosFuncionarios, optionsEmpresas}) => {
  const [dadosAtualizarFuncionarios, setDadosAtualizarFuncionarios] = useState([]);
  const [modalAlterarFuncionarioVisivel, setModalAlterarFuncionarioVisivel] = useState(false);

  const dadosListaFuncionarios = dadosFuncionarios.map((item, index) => {
    let contador = index + 1;

    return {
      ID: item.ID,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      IDFUNCIONARIO: item.IDFUNCIONARIO,
      NOLOGIN: item.NOLOGIN,
      DSFUNCAO: item.DSFUNCAO,
      DTDEMISSAO: item.DTDEMISSAO,
      STATIVO: item.STATIVO,
      DSTIPO: item.DSTIPO,
      PERC: item.PERC,
      NUCPF: item.NUCPF,
      VSSISTEMA: item.VSSISTEMA,
      STLOJA: item.STLOJA,
      STCONVENIO: item.STCONVENIO,
      contador
    };
  });

  const colunasFuncionarios = [

    {
      field: 'NOFUNCIONARIO',
      header: 'Funcionário',
      body: row => row.NOFUNCIONARIO,
      sortable: true,

    },
    {
      field: 'NOLOGIN',
      header: 'Login',
      body: row => row.NOLOGIN,
      sortable: true,

    },
    {
      field: 'DSFUNCAO',
      header: 'Função',
      body: row => row.DSFUNCAO,
      sortable: true,

    },
    {
      field: 'DSTIPO',
      header: 'Tipo',
      body: (row) => (
        <div >
          {row.DSTIPO == 'PN' ? 'PARCEIRO DE NEGÓCIOS' : 'FUNCIÓNARIO'}
        </div>
      ),
      sortable: true,
    },
    {
      field: 'PERC',
      header: 'Desc %',
      body: (
        (row) => (
          <div style={{ color: row.PERC == 'False' ? 'red' : 'blue' }}>
            {parseFloat(row.PERC).toFixed(2)}

          </div>
        )
      ),
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: (
        (row) => (
          <div style={{ color: row.STATIVO == 'True' ? 'blue' : 'red' }}>
            {row.STATIVO == 'True' ? 'Ativo' : 'Inativo'}

          </div>
        )
      ),
      sortable: true,
    },
    {
      field: 'DTDEMISSAO',
      header: 'DT Desl.',
      body: row => dataFormatada(row.DTDEMISSAO),
      sortable: true,
    },

    {
      field: 'STCONFERIDO',
      header: 'Opções',
      body: (
        (row) => (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="p-1">
              <ButtonTable
                titleButton={"Alterar"}
                onClickButton={() => handleClickEdit(row)}
                Icon={CiEdit}
                iconSize={18}
                iconColor={"#fff"}
                cor={"success"}

              />

            </div>


          </div>
        )
      ),
      sortable: true,
    },

  ]

  const handleEdit = async (IDFUNCIONARIO) => {
    try {
      const response = await get(`/atualizarFuncionario?idFuncionario=${IDFUNCIONARIO}`)
      if (response.data) {
        setDadosAtualizarFuncionarios(response.data)
        setModalAlterarFuncionarioVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEdit = (row) => {
    if (row && row.IDFUNCIONARIO) {
      handleEdit(row.IDFUNCIONARIO);
    }
  };

  return (

    <Fragment>
      <div className="card">
        <DataTable
          value={dadosListaFuncionarios}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
        >
          {colunasFuncionarios.map(coluna => (

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

      <ActionUpdateFuncionarioModal
        show={modalAlterarFuncionarioVisivel}
        handleClose={() => setModalAlterarFuncionarioVisivel(false)}
        dadosAtualizarFuncionarios={dadosAtualizarFuncionarios}
        optionsEmpresas={optionsEmpresas}
      />
    </Fragment>
  )
}