import { Fragment, useEffect, useState } from "react"
import { FooterModal } from "../Modais/FooterModal/footerModal";
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal";
import Modal from 'react-bootstrap/Modal';
import { get } from "../../api/funcRequest";
import DataTable from 'react-data-table-component';
import { ButtonTypeModal } from "../Buttons/ButtonTypeModal";
import { ButtonTable } from "../ButtonsTabela/ButtonTable";
import { FaRegTrashAlt } from "react-icons/fa";

// como caplicar o single responsiblity principle aqui?

export const ComprasActionDetalheEmpresaPromocao = ({show, handleClose, item}) => {
  const [dadosListaPromocaoEmpresa, setDadosListaPromocaoEmpresa] = useState([]);
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    getListaProdutosCriados(item && item.IDRESUMOPROMOCAOMARKETING)
  }, [item])

  const getListaProdutosCriados = async (IDRESUMOPROMOCAOMARKETING) => {
    try {
      const response = await get(`/listaEmpresaPromocoes?idResumoPromocoes${IDRESUMOPROMOCAOMARKETING}`)

      if (response.data) {
          setDadosListaPromocaoEmpresa(response.data)
          // console.log(response.data, "dados da tabela de promocao empresa")
        }
    } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const dadosPromocaoEmpresa = dadosListaPromocaoEmpresa.map((item, index) => {
    let contador = index + 1;

    return {
      IDEMPRESAPROMOCAOMARKETING: item.IDEMPRESAPROMOCAOMARKETING,
      IDRESUMOPROMOCAOMARKETING: item.IDRESUMOPROMOCAOMARKETING,
      
      IDEMPRESA: item.IDEMPRESA,
      STATIVO: item.STATIVO,
      NOEMPPROMO: item.NOEMPPROMO,
      contador
    }
  });

  const colunasPromocaoEmpresa = [
    {
      name: '#',
      selector: row => row.contador,
      sortable: true,
      width: '10%'
    },
    {
      name: 'Empresa',
      selector: row => row.NOEMPPROMO,
      sortable: true,
      
    },
    {
      name: 'Situação',
      cell: (row) => (
        <div style={{color: row.SATIVO == 'True' ? 'blue' : 'red'}}>

          {row.STATIVO == 'True' ? 'Ativo' : 'Inativo' }
        </div>
      ) 
    },
    {
      name: 'Opções',
      button: true,
      cell: (row) => (
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <div className="p-1">
            <ButtonTable
              titleButton={"Excluir Empresas da Promoção"}
              onClickButton
              Icon={FaRegTrashAlt}
              iconSize={18}
              iconColor={"#fff"}
              cor={"danger"}
            />
            
          </div>
          

        </div>

      ),  
    },
    
  ]

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const dadosPaginados = dadosPromocaoEmpresa.slice(indiceInicial, indiceFinal);
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

            <HeaderModal
              title={`Detalhe da Promoção:   ${dadosPromocaoEmpresa[0]?.DSPROMOCAOMARKETING} - Nº ${dadosPromocaoEmpresa[0]?.IDRESUMOPROMOCAOMARKETING}`}
              subTitle={"Lista das Empresas da Promoção"}
              handleClose={handleClose}
            />
         
            <Modal.Body>
         
              <DataTable
                columns={colunasPromocaoEmpresa}
                data={dadosPromocaoEmpresa}
                pagination={itensPorPagina}
                paginationPerPage={10}
                customStyles={{
                  header: {
                    style: {
                      backgroundColor: '#f2f2f2',
                      color: '#7a59ad',
                    },
                  },
                  headCells: {
                    style: {
                      backgroundColor: '#7a59ad',
                      color: 'white',
                      border: '1px solid #e9e9e9',
                    },
                  },
                  cells: {
                    style: {
                      backgroundColor: '#fbfbfb',
                      border: '1px solid #e9e9e9',
                      color: '#000',
                    },
                  },
                  pagination: {
                    style: {
                      backgroundColor: '#7a59ad',
                      color: 'white',
                    },
                  },

                }}
              />
              
         
            </Modal.Body>

            <FooterModal>
            
              <ButtonTypeModal 
                textButton={"Fechar"} 
                onClickButtonType={handleClose}
                cor="secondary" 
                tipo="button" 
              />
              
          </FooterModal>
        </Modal>
    </Fragment>
  )
}
