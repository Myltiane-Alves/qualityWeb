import React, { Fragment, useEffect, useState } from "react"
import axios from "axios"
import TabelaPrincipal from "../../../Tables/TabelaMain"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import Modal from 'react-bootstrap/Modal';

export const MarketingActionListProdutoModal = ({ show, handleClose }) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    
  }, [])

 


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

      <div id="resultadolistaprodutos"></div>

      <Modal
        show={show}
        onHide={handleClose}
        class="modal-content"
        size="lg"
        centered
      >

        <HeaderModal
          title={"Lista de Produtos"}
          subTitle={"Relação de Produtos"}
          handleClose={handleClose}
        />
        <div className="row">
          <div className="col-xl-12">
            <div id="panel-1" className="panel">

              <div className="panel-container show">
                <div className="panel-content">
                  <div id="">


                    <div id="resultado">

                     
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterModal handleClose={handleClose} />

      </Modal>
    </Fragment>
  )

}

