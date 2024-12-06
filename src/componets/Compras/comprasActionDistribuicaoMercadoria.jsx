import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../Actions/actionMain"
import { ButtonSearch } from "../Buttons/ButtonSearch"
import { ButtonType } from "../Buttons/ButtonType"
import { InputField } from "../Buttons/Input"
import { InputSelectAction } from "../Inputs/InputSelectAction"
import TabelaPrincipal from "../Tables/TabelaMain"
import axios from "axios"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'

export const ComprasActionDistribuicaoMercadoria = () => {
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaFilialVisivel, setTabelaFilialVisivel] = useState(false);
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
    'Nº Interno',
    'Data Cadastro',
    'Data Emissão',
    'Fornecedor',
    'Série',
    'NFE',
    'Valor',
    'Seleção',
    'Opções'
  ];

  const colunasFiliaisDestino = [
    '#',
    'Filiais',
    'Selecione',
    'Opções'
  ];

  const colunasTabelaDigitacaoDistribuicao = [
    'Nº Interno',
    'Item',
    'Descrição',
    'Cod. Barras',
    'Quantidade',
    'Preço',
    'Total',
    'Itens Restantes'
  ];

  const colunasResultadoDistribuicao = [
    'Histórico',
    'Filial',
    'Status',
    'Parceiro',
    'Incoterms',
    'Confere'
  ]

  const colunasPedidos = [
    'Histórico',
    'Filial',
    'Status',
    'Parceiro',
    'Incoterms',
    'Nº Interno',
    'Nº Documento',
    'Confere'
  ]

  const colunasDevolucoes = [
    'Nº Interno',
    'Item',
    'Descrição',
    'Cod. Barras',
    'Linha',
    'Quantidade',
    'Preço',
    'Total',
  ]

  const colunasNotasOrigem = [
    'Nº Interno',
    'Item',
    'Descrição',
    'Cod. Barras',
    'Linha',
    'Quantidade',
    'Preço',
    'Total',
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

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {
      setTabelaVisivel(true)
    }

  }
  const handleFiliaisDestino = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaFilialVisivel(false)
    } else {
      setTabelaFilialVisivel(true)
    }

  }

  const options = [
    { value: '1', label: 'Fabricante 1' },
    { value: '2', label: 'Fabricante 2' },
    { value: '3', label: 'Fabricante 3' },
  ]
  return (

    <Fragment>

      <ActionMain
        title="Distribuição"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Distribuição"]}

        InputSelectFilialComponent={InputSelectAction}
        labelSelectFilial={"Selecione a Filial Origem: "}
        optionsFilial={options}

        InputFieldNumeroNFComponent={InputField}
        labelInputFieldNumeroNF={"Numero Interno da Nota:"}

        InputSelectFabricanteComponent={InputSelectAction}
        labelSelectFabricantes={"Fabricante: "}
        optionsFabricantes={options}

        InputSelectTipoPedido={InputSelectAction}
        labelSelectTipoPedido={"Tipo de Mercadoria: "}
        optionsTipoPedido={options}


        InputFieldComponent={InputField}
        labelInputField={"Observação:"}

        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar Nota de Compras"}
        onButtonClickSearch={handlePesquisar}

        ButtonTypeBalanco={ButtonType}
        linkNomeBalanco={"Adicionar Filiais"}
        onButtonClickTypeBalanco={handleFiliaisDestino}

        ButtonTypeSalvar={ButtonType}
        linkNome={"Salvar"}
        onButtonClickCadastro


        ButtonTypeExportar={ButtonType}
        linkExportar={"Exportar Template"}
        onButtonClickExportar

        ButtonTypeImportar={ButtonType}
        linkImportar={"Importar Template"}
        onButtonClickImportar
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

      {tabelaFilialVisivel && (
        <div className="resultado">
          <TabelaPrincipal
            colunas={colunasFiliaisDestino}
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

      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{
          backgroundColor: '#7a59ad',
          color: '#fff',
          height: '100%',
          width: '100%',
          borderRadius: '5px'

        }}
      >
        <Tab eventKey="home" title="DIGITAÇÃO">
          <TabelaPrincipal
            id="tableDigitacaoDistribuicao"
            colunas={colunasTabelaDigitacaoDistribuicao}
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
        </Tab>
        <Tab eventKey="profile" title="DISTRIBUIÇÃO">
  
          <TabelaPrincipal
            id=""
            colunas={colunasResultadoDistribuicao}
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
        </Tab>
        <Tab eventKey="longer-tab" title="PEDIDOS">

          <TabelaPrincipal
            id=""
            colunas={colunasPedidos}
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
        </Tab>
        <Tab eventKey="contact" title="DEVOLUÇÕES" >
  
          <TabelaPrincipal
            id=""
            colunas={colunasDevolucoes}
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
        </Tab>
        <Tab eventKey="contact" title="NOTAS DE ORIGEM" >
          <TabelaPrincipal
            id=""
            colunas={colunasNotasOrigem}
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
        </Tab>
      </Tabs>
    </Fragment>
  )
}
