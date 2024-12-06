import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../Actions/actionMain"
import { ButtonSearch } from "../Buttons/ButtonSearch"
import { InputField } from "../Buttons/Input"
import { InputSelectAction } from "../Inputs/InputSelectAction"
import { ComprasActionDistribuicaoCompras } from "./comprasActionDistribuicaoCompras"
import TabelaPrincipal from "../Tables/TabelaMain"
import axios from "axios"
import { ModalADetalhePedido } from "../Modais/ModalDetalhePedido"


export const ComprasActionDistribuicaoComprasHistorico = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
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
    'Nº Pedido',
    'Empresa',
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

  const handleModalVisivel = () => {
    setModalVisivel(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }
  const options = [
    { value: '1', label: 'Marca 1' },
    { value: '2', label: 'Marca 2' },
    { value: '3', label: 'Marca 3' }
  ]
  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Distruibuição de Compras"]}
        title="Analisar Histórico da Distribuição de Compras"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTInicio={"Data Inicio"}



        InputSelectFornecedorComponent={InputSelectAction}
        labelSelectFornecedor={"Fornecedor"}
        optionsFornecedores={options}



        InputFieldNumeroNFComponent={InputField}
        labelInputFieldNumeroNF={"Numero Pedido"}

        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClickActionDistribuicaoCompras}
      />

      {tabelaVisivel && (
        <TabelaPrincipal
          id="dt-lista-prod-cad-pedidos"
          colunas={colunasExemplo}
          data={dadosPaginados}
          handleEdit={handleModalVisivel}
          handleSave={handleSave}
          handleCancel={handleCancel}
          paginaAtual={paginaAtual}
          itensPorPagina={itensPorPagina}
          onPaginaAnterior={handlePaginaAnterior}
          onProximaPagina={handleProximaPagina}
          onPaginaClicada={handlePaginaClicada}

        />
      )}

      <ModalADetalhePedido
        show={modalVisivel}
        handleClose={handleClose}
      />
    </Fragment>
  )
}
