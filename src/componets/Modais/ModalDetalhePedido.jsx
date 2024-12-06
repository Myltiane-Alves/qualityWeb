import React, { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "./HeaderModal/HeaderModal";
import { FooterModal } from "./FooterModal/footerModal";
import TabelaPrincipal from "../Tables/TabelaMain";
import axios from "axios";

export const ModalADetalhePedido = ({ show, handleClose }) => {
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
   'Nº Det Pedido',
   'Produto',
    'Marca',
    'Estrutura Mercadológica',
    'Categorias',
    'Tecido',
    'Cor',
    'Estilo',
    'Tamanho',
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


  const handleClickActionDistribuicaoCompras = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {

      setTabelaVisivel(true)
    }
  }


  const options = [
    { value: "Funcionario 1", label: "Funcionario 1" },
    { value: "Funcionario 2", label: "Funcionario 2" },
  ]

  return (

    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        id="modaldetalhepedido"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <div className="" role="document">
          <div className="">
            <HeaderModal
              title={"Detalhe do Pedido de Compras"}
              subTitle={" Detalhe do Pedido de Compras"}
              handleClose={handleClose}
            />


            <Modal.Body>
              <TabelaPrincipal
                id="dt-lista-prod-cad-pedidos"
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


            </Modal.Body>

            <FooterModal handleClose={handleClose} />
          </div>
        </div>
      </Modal>
    </Fragment>
  )

}
