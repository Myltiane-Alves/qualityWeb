import { Fragment, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GrView } from 'react-icons/gr';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { get } from '../../../../api/funcRequest';
import { ActionVincularFabricanteFornecedorModal } from './actionVincularFabricanteFornecedorModal';
import { ActionCadastrarFornecedorModal } from './actionCadastrarFornecedorModal';
import { ActionEditarFornecedorModal } from './actionEditarFornecedorModal';


export const ActionListaFornecedores = ({ dadosFornecedoresFabricantes }) => {
  const [dadosDetalheFornecedorFabricante, setDadosDetalheFornecedorFabricante] = useState([]);
  const [dadosDetalheFornecedor, setDadosDetalheFornecedor] = useState([]);
  const [modalEditarFornecedor, setModalEditarFornecedor] = useState(false);
  const [modalEditarVinculo, setModalEditarVinculo] = useState(false);

  const dadosListaFornecedoresFabricantes = dadosFornecedoresFabricantes.map((item, index) => {
    let contador = index + 1;

    return {
      IDFABRICANTEFORN: item.IDFABRICANTEFORN,
      IDFORNECEDOR: item.IDFORNECEDOR,
      NORAZAOFORN: item.NORAZAOFORN,
      NOFANTFORN: item.NOFANTFORN,
      NUCNPJFORN: item.NUCNPJFORN,
      CIDADEFORN: item.CIDADEFORN,
      UFFORN: item.UFFORN,
      FONEFORN: item.FONEFORN,
      IDFABRICANTE: item.IDFABRICANTE,
      IDFORNECEDORSAP: item.IDFORNECEDORSAP,
      STMIGRADOSAP: item.STMIGRADOSAP,
      LOGFORNECEDORSAP: item.LOGFORNECEDORSAP,
      DSFABRICANTE: item.DSFABRICANTE,

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
      field: 'NUCNPJFORN',
      header: 'CNPJ',
      body: row => row.NUCNPJFORN,
      sortable: true
    },
    {
      field: 'NORAZAOFORN',
      header: 'Razão Social',
      body: row => row.NORAZAOFORN,
      sortable: true
    },
    {
      field: 'NOFANTFORN',
      header: 'Nome Fantasia',
      body: row => row.NOFANTFORN,
      sortable: true
    },
    {
      field: 'DSFABRICANTE',
      header: 'Fabricante',
      body: (row) => {
        if (row.IDFABRICANTE > 0) {
          return (
            <div>
              <p>{row.DSFABRICANTE?.toUpperCase()}</p>
            </div>
          )

        } else {
          return (
            <div>
              <p style={{ color: '#fd3995 ', fontWeight: 700 }} >SEM VINCULO</p>
            </div>
          )

        }
      },
      sortable: true
    },
    {
      field: 'FONEFORN',
      header: 'Telefone',
      body: row => row.FONEFORN,
      sortable: true
    },
    {
      field: 'CIDADEFORN',
      header: 'Cidade',
      body: row => row.CIDADEFORN,
      sortable: true
    },
    {
      field: 'UFFORN',
      header: 'UF',
      body: row => row.UFFORN,
      sortable: true
    },
    {
      field: 'IDFORNECEDORSAP',
      header: 'ID SAP',
      body: row => row.IDFORNECEDORSAP,
      sortable: true
    },
    {
      field: 'STMIGRADOSAP',
      header: 'Migrado SAP',
      body: (row) => {
        return (

          <p style={{ color: row.STMIGRADOSAP == 'True' ? '#2196F3' : '#fd3995', fontWeight: 700 }}>{row.STMIGRADOSAP == 'True' ? 'MIGRADO COM SUCESSO' : 'NÃO MIGRADO SAP'}</p>

        )
      },
      sortable: true
    },
    {
      field: 'IDFABRICANTEFORN',
      header: 'Opções',
      body: (row) => {
        if (row.IDFABRICANTE > 0) {
          return (
            <div className="p-1 "
              style={{ justifyContent: "space-between", width: "150px", display: "flex" }}
            >
              <div className="p-1">
                <ButtonTable
                  Icon={CiEdit}
                  cor={"info"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => clickEditarFonecedor(row)}
                  titleButton={"Editar Fornecedor"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={CiEdit}
                  cor={"warning"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton={() => clickVinculoFonecedorFabricante(row)}
                  titleButton={"Editar Vínculo Fornecedor/Fabricante"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={AiOutlineDelete}
                  cor={"danger"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Excluir Vínculo Fabricante/Fornecedor"}
                />
              </div>
              <div className="p-1">
                <ButtonTable
                  Icon={GrView}
                  cor={"success"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Consultar Fornecedor SAP"}
                />
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
                  onClickButton
                  titleButton={"Editar Fornecedor"}
                />
              </div>

              <div className="p-1">
                <ButtonTable
                  Icon={GrView}
                  cor={"success"}
                  iconColor={"white"}
                  iconSize={20}
                  onClickButton
                  titleButton={"Consultar Fornecedor SAP"}
                />
              </div>
            </div>

          )
        }
      }
    }
  ]

  const editarFornecedor = async (IDFORNECEDOR) => {
    try {
      const response = await get(`/fornecedores?idFornecedor=${IDFORNECEDOR}`);

      if (response.data) {
        setDadosDetalheFornecedor(response.data)
        setModalEditarFornecedor(true);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da despesa: ', error);
    }
  };


  const clickEditarFonecedor = (row) => {
    if (row && row.IDFORNECEDOR) {
      editarFornecedor(row.IDFORNECEDOR);
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

  // const exportColumns = colunasFornecedores.map(coluna => ({ title: coluna.header, dataKey: coluna.field, body: coluna.body }));
  // const exportCSV = (selectionOnly) => {
  //   dt.current.exportCSV({ selectionOnly });
  // };

  // const exportPdf = () => {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then(() => {
  //       const doc = new jsPDF.default(0, 0);

  //       doc.autoTable(exportColumns, dadosListaFornecedores);
  //       doc.save('dadosListaFornecedores.pdf');
  //     });
  //   });
  // };

  // const exportExcel = () => {
  //   import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(dadosListaFornecedores);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer = xlsx.write(workbook, {
  //       bookType: 'xlsx',
  //       type: 'array'
  //     });

  //     saveAsExcelFile(excelBuffer, 'dadosListaFornecedores');
  //   });
  // };

  // const saveAsExcelFile = (buffer, fileName) => {
  //   import('file-saver').then((module) => {
  //     if (module && module.default) {
  //       let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //       let EXCEL_EXTENSION = '.xlsx';
  //       const data = new Blob([buffer], {
  //         type: EXCEL_TYPE
  //       });

  //       module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  //     }
  //   });
  // };

  // const header = (
  //   <div className="flex align-items-center justify-content-end gap-2">
  //     <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
  //     <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
  //     <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
  //   </div>
  // );

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

      <ActionVincularFabricanteFornecedorModal 
        show={modalEditarVinculo}
        handleClose={() => setModalEditarVinculo(false)}
        dadosDetalheFornecedorFabricante={dadosDetalheFornecedorFabricante}
      />

      <ActionEditarFornecedorModal 
        show={modalEditarFornecedor}
        handleClose={() => setModalEditarFornecedor(false)}
        dadosDetalheFornecedor={dadosDetalheFornecedor}
      />
    </Fragment>
  )
}