import { Fragment, useEffect, useState } from "react"
import { InputField } from "../Buttons/Input"
import { ButtonSearch } from "../Buttons/ButtonSearch"
import { ActionMain } from "../Actions/actionMain"
import TabelaPrincipal from "../Tables/TabelaMain"
import axios from "axios"
import { ComprasActionDistribuicaoMercadoria } from "./comprasActionDistribuicaoMercadoria"
import { ButtonType } from "../Buttons/ButtonType"


export const ComprasActionListaDistribuicaoMercadoria = () => {
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [actionVisivel, setActionVisivel] = useState(true);

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
    'Descrição',
    'Data',
    'Status',
    'Fornecedor',
    'Tipo Mercadoria',
    'Filial',
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

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {
      setTabelaVisivel(true)
    }

  }

  const handleActionVisivel = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setActionVisivel(false)
    } else {
      setActionVisivel(true)
    }
  }

  return (

    <Fragment>


      <ActionMain
        title="Listagem de Distribuição"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Listagem de Distribuição"]}

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Inicial"}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Final"}



        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handlePesquisar}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Adicionar"}
        onButtonClickCadastro={handleActionVisivel}
      />

      {tabelaVisivel && (
        <div className="resultado">
          <TabelaPrincipal
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

      {actionVisivel && (
        <ComprasActionDistribuicaoMercadoria />

      )}
    </Fragment>
  )
}


