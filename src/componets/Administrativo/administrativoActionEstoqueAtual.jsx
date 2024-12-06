import React, { Fragment, useState, useEffect } from "react"
import axios from "axios";
import TabelaPrincipal from "../Tables/TabelaMain";


export const AdministrativoActionEstoqueAtual = () => {
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);

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


  const handleTabelaVisivel = () => {
    setTabelaVisivel(true);
  };


  const handleClose = () => {
    setTabelaVisivel(false);
  };

  const colunasExemplo = [

  ]

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


  return (

    <Fragment>

      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <h2>
                Relatório Estoque Atual
              </h2>
              <div className="panel-toolbar">
                <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>
              </div>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <div id="resultado">
                  {tabelaVisivel && (
                    <div className="row">

                      <TabelaPrincipal
                        id="dt-basic-voucher"
                        colunas={colunasExemplo}
                        data={dadosPaginados}
                        onEditar={handleEdit}
                        onSalvar={handleSave}
                        onCancelar={handleCancel}
                        itensPorPagina={itensPorPagina}
                        paginaAtual={paginaAtual}
                        onPaginaAnterior={handlePaginaAnterior}
                        onProximaPagina={handleProximaPagina}
                        onPaginaClicada={handlePaginaClicada}
                      />
                    </div>

                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}