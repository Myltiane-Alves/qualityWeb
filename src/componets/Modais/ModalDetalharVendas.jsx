import React, { Fragment, useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "./HeaderModal/HeaderModal";
import DataTable from 'react-data-table-component';

import { ButtonEditar } from "../ButtonsTabela/ButtonEditar";
import { ButtonCancelar } from "../ButtonsTabela/ButtonCancelar";
import { ButtonSalvar } from "../ButtonsTabela/ButtonSalvar";
import { get } from "../../api/funcRequest";

export const ModalDetalharVendas = ({ show, handleClose, idVenda,empresaSelecionada,setIdVendaModal }) => {
const [dadosDetalheVendas, setDadosDetalheVendas] = useState([]);
const [itensPorPagina, setItensPorPagina] = useState(10)
const [paginaAtual, setPaginaAtual] = useState(1);

const indiceInicial = (paginaAtual - 1) * itensPorPagina;
const indiceFinal = paginaAtual * itensPorPagina;
const dadosPaginados = dadosDetalheVendas.slice(indiceInicial, indiceFinal);

  useEffect(() => {
    getVendasAtivas(empresaSelecionada, setIdVendaModal)
  }, [empresaSelecionada, setIdVendaModal])
  const getVendasAtivas = async (empresaSelecionada, setIdVendaModal) => {
  
    console.log(empresaSelecionada, setIdVendaModal)
    try {
  
      const response = await get(`/listaDetalheVenda?idEmpresa=${empresaSelecionada}&idVenda=${setIdVendaModal}`);
      console.log(response)
      if (response.data && response.data.length > 0) {
        setDadosDetalheVendas(response.data)
        console.log(response.data, 'response.data')
      }

      return response.data;
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
    
  }

  // ...

const dados = dadosDetalheVendas.map((item) => {
  return {
    IDVENDADETALHE: item.IDVENDADETALHE,
    IDVENDA: item.IDVENDA,
    NUCODBARRAS: item.NUCODBARRAS,
    DSNOME: item.DSNOME,
    VUNCOM: item.VUNCOM,
    QTD: item.QTD,
    VRTOTALLIQUIDO: item.VRTOTALLIQUIDO,
    VENDEDOR_NOME: item.VENDEDOR_NOME,
    STCANCELADO: item.STCANCELADO,
  };
});

// ...



  const colunasVendas = [
    {
      name: 'ID',
      selector: row => row.IDVENDADETALHE,
      sortable: true,
    },
    {
      name: 'Nº Venda',
      selector: row => row.IDVENDA,
      sortable: true,
    },
    {
      name: 'Produto',
      selector: row => row.NUCODBARRAS,
      sortable: true,
    },
    {
      name: 'Caixa',
      selector: row => row.DSNOME,
      sortable: true,
    },
    {
      name: 'NFe/NFCe',
      selector: row => row.VUNCOM,
      sortable: true,
    },
    {
      name: 'Abertura',
      selector: row => row.DTHORAFECHAMENTO,
    },
    {
      name: 'Operador',
      selector: row => row.VENDEDOR_NOME,
    },
    {
      name: 'Valor',
      selector: row => row.STCANCELADO,
    },

    {
      name: 'Opções',
      button: true,
      cell: (row) => (
        <div className="d-flex "
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <ButtonEditar />
          </div>
          <div className="ml-2">
            <ButtonCancelar />
          </div>
          <div className="ml-2">
            <ButtonSalvar />
          </div>
        </div>
      ),
    },
  ]

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

        <div className="" role="document">
          <div className="">
            <HeaderModal
              title={"Venda"}
              subTitle={" Detalhe da Venda"}
              handleClose={handleClose}
            />
            {/* <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data">
              <Modal.Body>

                <DataTable
                  columns={colunasVendas}
                  data={dados}
                  pagination={itensPorPagina}
                  paginationPerPage={10}
                  customStyles={{
                    header: {
                      style: {
                        backgroundColor: '#7a59ad', // altere para a cor de fundo desejada
                        color: 'white', // altere para a cor de texto desejada
                      },
                    },
                    headCells: {
                      style: {
                        backgroundColor: '#7a59ad', // altere para a cor de fundo desejada
                        color: 'white', // altere para a cor de texto desejada
                      },
                    },
                    cells: {
                      style: {
                        backgroundColor: '#fbfbfb', //#fbfbfb altere para a cor de fundo desejada

                        border: '0.1px solid #e9e9e9',
                        // borderRadius: '1px',
                        color: '#000', // altere para a cor de texto desejada
                      },
                    },
                    pagination: {
                      style: {
                        backgroundColor: '#7a59ad', // altere para a cor de fundo desejada
                        color: 'white', // altere para a cor de texto desejada
                      },
                    },


                  }}
                />
              </Modal.Body>
            </form>
          </div>
        </div>
      </Modal>

    </Fragment>
  )

}


