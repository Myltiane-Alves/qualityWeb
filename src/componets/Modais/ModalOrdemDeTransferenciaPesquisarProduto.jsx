import React, { Fragment } from "react"
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai"
import { FaCheck, FaRegCheckSquare } from "react-icons/fa";
// import { MenuBtnFiles } from "../../Buttons/btnFiles"


import Modal from 'react-bootstrap/Modal';
import Table from "react-bootstrap/esm/Table";
import TabelaPrincipal from "../Tables/TabelaMain";

export const ModalOrdemDeTransferenciaPesquisarProduto = ({ show, handleClose }) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    getTabelas()
  }, [])

  const getTabelas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/ListaVendas")
      if (response.data) {
        setDadosExemplos(response.data)
        // console.log(response.data, 'get tabelas')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const colunasExemplo = [
    'Produto',
    'Cód. Barras',
    'Descrição',
    'R$ Custo',
    'R$ Venda',
    'Opções'
  ];


  const handleEdit = (item) => {
    // Lógica para manipular a edição do item
    console.log(`Editando item: ${item.id}`);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item editado
    console.log(`Salvando item: ${item.id}`);
  };

  const handleCancel = (item) => {
    // Lógica para cancelar a edição do item
    console.log(`Cancelando edição do item: ${item.id}`);
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dadosExemplos.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  const handlePaginaClicada = (pagina) => {
    setPaginaAtual(pagina);
  }

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const dadosPaginados = dadosExemplos.slice(indiceInicial, indiceFinal);


  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {

      setTabelaVisivel(true)
    }

  }

  return (

    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        id="abrirpesqproduto"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <Modal.Body className="modal-body " role="document">

          <div className="modal-header">
            <h4 className="modal-title">
              Pesquisar Produto
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <AiOutlineCloseCircle size={24} />
            </button>
          </div>

          <div className="row mb-5">
            <div className="col-sm-6 col-xl-10">
              <label className="form-label" htmlFor="pesqProduto">Informe a Descrição ou Código de Barras do Produto</label>
              <div className="input-group">
                <input type="text" id="pesqProduto" name="pesqProduto" className="form-control input" value="" />&nbsp;&nbsp;

                {/* <button className="btn btn-primary" type="button" onclick="pesquisarProduto()"> */}
                <button className="btn btn-primary" type="button" >
                  <AiOutlineSearch className="mr-1" size={16} color="#fff" />
                  Pesquisar
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <TabelaPrincipal
              id="dt-basic-balanco"
              colunas={colunasExemplo}
              data={dadosPaginados}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
              paginaAtual={paginaAtual}
              itensPorPagina={itensPorPagina}
              onPaginaAnterior={handlePaginaAnterior}
              onProximaPagina={handleProximaPagina}
              onPaginaClicada={handlePaginaClicada}

            />

          </div>

        </Modal.Body>
      </Modal>
    </Fragment>
  )

}