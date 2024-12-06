import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { useForm } from "react-hook-form";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GrFormView } from "react-icons/gr";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../../utils/formatMoeda";
import Swal from "sweetalert2";
import { put } from "../../../../api/funcRequest";

export const ActionColetorBalancoModal = ({ show, handleClose, dadosResumoBalancoModal }) => {
  const { register, handleSubmit, errors } = useForm();
  const [modalResumo, setModalResumo] = useState(true)

  const dados = dadosResumoBalancoModal.map((item, index) => {

    return {
      IDEMPRESA: item.IDEMPRESA,
      IDRESUMOBALANCO: item.IDRESUMOBALANCO,
      NUMEROCOLETOR: item.NUMEROCOLETOR,
      DSCOLETOR: item.DSCOLETOR,
      NUMITENS: item.NUMITENS,
      TOTALCUSTO: item.TOTALCUSTO,
      TOTALVENDA: item.TOTALVENDA,
      STCONSOLIDADO: item.STCONSOLIDADO,
      DSCOLETOR: item.DSCOLETOR,
    }
  })

  const cacularTotalQtdItens = () => {
    let total = 0;
    for (let resultado of dados) {
      total += parseFloat(resultado.NUMITENS)
    }
    return total
  }

  const cacularTotalCusto = () => {
    let total = 0;
    for (let resultado of dados) {
      total += parseFloat(resultado.TOTALCUSTO)
    }
    return total
  }

  const cacularTotalVenda = () => {
    let total = 0;
    for (let resultado of dados) {
      total += parseFloat(resultado.TOTALVENDA)
    }
    return total
  }

  const colunasColetor = [
    {
      field: 'DSCOLETOR',
      header: 'Coletor',
      body: row => <p> {row.NUMEROCOLETOR} - {row.DSCOLETOR}</p>,
      sortable: true
    },
    {
      field: 'NUMITENS',
      header: 'Qtd Itens',
      body: row => <p>{parseFloat(row.NUMITENS)}</p>,
      footer: cacularTotalQtdItens(),
      sortable: true
    },
    {
      field: 'TOTALCUSTO',
      header: 'Total Custo',
      body: row => <p>{formatMoeda(row.TOTALCUSTO)}</p>,
      footer: formatMoeda(cacularTotalCusto()),
      sortable: true
    },
    {
      field: 'TOTALVENDA',
      header: 'Total Venda',
      body: row => <p>{formatMoeda(row.TOTALVENDA)}</p>,
      footer: formatMoeda(cacularTotalVenda()),
      sortable: true
    },
    {
      field: 'STCONSOLIDADO',
      header: 'Opções',
      body: row => {
        if (row.STCONSOLIDADO == 'False') {
          return (
            <div className="p-1">
              <ButtonTable
                titleButton={"Exclusão do Coletor e Produtos Relacionados"}
                cor={"danger"}
                Icon={GrFormView}
                iconSize={18}
                onClickButton={() => handleClickExcluir(row)}
              />
            </div>
          )
        } else {
          return (
            <div>
              <ButtonTable
                titleButton={"Listagem Produtos do Balanço"}
                cor={"primary"}
                iconColor={"#fff"}
                Icon={GrFormView}
                iconSize={18}
                onClickButton={() => handleClickResumoBalanco(row)}
              />
            </div>
          )

        }
      },

    },

  ]

  const handleEditPreviaBalanco = async (IDRESUMOBALANCO) => {
    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      try {
        const response = await get(`/novoPreviaBalanco?idResumo=${IDRESUMOBALANCO}&idEmpresa=${usuarioLogado.IDEMPRESA}`)
        if (response.data) {
          setDadosPreviaBalancoModal(response.data)
        }
      } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
      }
    }

  }

  const handleClickExcluir = async (row) => {

    const data = {
      IDRESUMOBALANCO: row.IDRESUMOBALANCO,
      NUMEROCOLETOR: row.NUMEROCOLETOR
    }

    try {
      
      Swal.fire({
        
        title: 'Deseja excluir o Coletor?',
        text: 'Caso exclua, será necessário subir novamente pelo PDV!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Excluido!',
            'O coletor foi excluido com sucesso.',
            'success'
          )
          const response = put(`/excluirColetorBalanco`, data)
          return response;
        }
      })
      handleClose()
      
    } catch (error) {
      console.log(error, "não foi possivel excluir o coletor ")
    }

    
  }


  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        {modalResumo && (
          <Fragment>
            <HeaderModal
              title={"Resumo do Balanço"}
              subTitle={"Relação dos Coletores"}
              handleClose={handleClose}
            />
            <Modal.Body>

              <DataTable
                title="Relação dos coletores"
                value={dados}
                sortOrder={-1}
                paginator={true}
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                showGridlines
                stripedRows
                emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
              >
                {colunasColetor.map(coluna => (
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

            </Modal.Body>
          </Fragment>
        )}


      </Modal>
    </Fragment>
  )
}