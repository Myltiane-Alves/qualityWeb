import { Fragment, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionListaPedidosPeriodo } from "./actionListaPedidosPeriodo"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { get } from "../../../../api/funcRequest"
import { ButtonType } from "../../../Buttons/ButtonType"
import { getDataAtual, getDataDoisMesesAtras } from "../../../../utils/dataAtual"
import { ActionPDFPedidoResumido } from "../../../Compras/Components/ActionHome/comprasActionPDFPedidoResumido"
import { ActionPDFPedidoDetalhado } from "../../../Compras/Components/ActionHome/comprasActionPDFPedidoDetalhado"
import { ActionListaProdutosCriados } from "./actionListaProdutosCriados"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { useQuery } from "react-query"
import { useFetchData } from "../../../../hooks/useFetchData"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"


export const ActionPesquisaHome = () => {
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [clickContador, setClickContador] = useState(0);
  const [tabelaVisivel, setTabelaVisivel] = useState(true);
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState('')
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')
  const [situacaoSelecionada, setSituacaoSelecionada] = useState('')
  const [compradorSelecionado, setCompradorSelecionado] = useState('')
  const [numeroPedido, setNumeroPedido] = useState('')
  const [actionPedidoResumido, setActionPedidoResumido] = useState(false)
  const [actionHome, setActionHome] = useState(true)
  const [actionPedidoDetalhado, setActionPedidoDetalhado] = useState(false)
  const [actionProdutosCriados, setActionProdutosCriados] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataPesquisaInicio = getDataDoisMesesAtras();
    const dataPesquisaFim = getDataAtual()
    setDataInicio(dataPesquisaInicio)
    setDataFim(dataPesquisaFim)
  }, [])


  const { data: dadosMarcas = [] } = useFetchData('marcasLista', '/marcasLista');
  const { data: dadosFornecedores = [] } = useFetchData('fornecedores', '/fornecedores');
  const { data: dadosFabricantes = [] } = useFetchData('fabricantes', '/fabricantes');
  const { data: dadosCompradores = [] } = useFetchData('compradores', '/compradores');

  const fetchListaPedidos = async () => {
    try {
      const urlApi = `/listaTodosPedidos?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(currentPage);
            } else {
              return allData;
            }
          } catch (error) {
            console.error('Erro ao buscar próxima página:', error);
            throw error;
          }
        }
  
        await fetchNextPage(currentPage);
        return allData;
      } else {
       
        return response.data;
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };
   
  const { data: dadosListaPedidos = [], error: errorPedido, isLoading: isLoadingPedido, refetch: refetchListaPedidos } = useQuery(
    ['listaTodosPedidos',  dataInicio, dataFim,  currentPage, pageSize],
    () => fetchListaPedidos( dataInicio, dataFim, currentPage, pageSize),
    {
      enabled: Boolean(dataInicio && dataFim),
    }
  );


  const fetchPedidosResumido = async () => {
    try {
      const urlApi = `/listaPedidos?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}&idFornPesquisa=${fornecedorSelecionado}&idMarcaPesquisa=${marcaSelecionada}&NuPedidoPesquisa=${numeroPedido}&idFabPesquisa=${fabricanteSelecionado}&idCompradorPesquisa=${compradorSelecionado}&STSituacaoSAP=${situacaoSelecionada}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(currentPage);
            } else {
              return allData;
            }
          } catch (error) {
            console.error('Erro ao buscar próxima página:', error);
            throw error;
          }
        }
  
        await fetchNextPage(currentPage);
        return allData;
      } else {
       
        return response.data;
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };
   
  const { data: dadosPedidoResumido = [], error: errorVouchers, isLoading: isLoadingPedidoResumido, refetch: refetchPedidosResumido } = useQuery(
    ['listaTodosPedidos',  dataInicio, dataFim, fornecedorSelecionado, marcaSelecionada, numeroPedido, fabricanteSelecionado, compradorSelecionado, situacaoSelecionada,  currentPage, pageSize],
    () => fetchPedidosResumido( dataInicio, dataFim, fornecedorSelecionado, marcaSelecionada, numeroPedido, fabricanteSelecionado, compradorSelecionado, situacaoSelecionada, currentPage, pageSize),
    {
      enabled: Boolean(dataInicio && dataFim),
    }
  );

  const fetchPedidosDetalhados = async () => {
    try {
      const urlApi = `/listaPedidosDetalhado?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}&idFornecedor=${fornecedorSelecionado}&idMarca=${marcaSelecionada}&idPedido=${numeroPedido}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(currentPage);
            } else {
              return allData;
            }
          } catch (error) {
            console.error('Erro ao buscar próxima página:', error);
            throw error;
          }
        }
  
        await fetchNextPage(currentPage);
        return allData;
      } else {
       
        return response.data;
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };
   
  const { data: dadosPedidosDetalhados = [], error: errorPedidoDetalhados, isLoading: isLoadingPedidoDetalhados, refetch: refetchPedidosDetalhados } = useQuery(
    ['listaTodosPedidos',  dataInicio, dataFim, fornecedorSelecionado, marcaSelecionada, numeroPedido,  currentPage, pageSize],
    () => fetchPedidosDetalhados( dataInicio, dataFim, fornecedorSelecionado, marcaSelecionada, numeroPedido, currentPage, pageSize),
    {
      enabled: Boolean(fornecedorSelecionado),
    }
  );

  const fetchPedidosCriados = async () => {
    try {
      const urlApi = `/listaProdutoCriadoPedidoCompra?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(currentPage);
            } else {
              return allData;
            }
          } catch (error) {
            console.error('Erro ao buscar próxima página:', error);
            throw error;
          }
        }
  
        await fetchNextPage(currentPage);
        return allData;
      } else {
       
        return response.data;
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };
   
  const { data: dadosListaProdutosCriados = [], error: errorPedidosCriados, isLoading: isLoadingPedidosCriados, refetch: refetchPedidosCriados } = useQuery(
    ['listaProdutoCriadoPedidoCompra',  dataInicio, dataFim, currentPage, pageSize],
    () => fetchPedidosCriados( dataInicio, dataFim, currentPage, pageSize),
    {
      enabled: Boolean(fornecedorSelecionado),
    }
  );


  const handleChangeMarca = (e) => {
    setMarcaSelecionada(e.value);
  }

  const handleSelectFornecedor = (value) => {
    setFornecedorSelecionado(value);
  }

  const handleSelectSituacao = (value) => {
    setSituacaoSelecionada(value);
  }

  const handleSelectFabricante = (value) => {
    setFabricanteSelecionado(value);
  }

  const handleSelectComprador = (value) => {
    setCompradorSelecionado(value);
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);
    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      refetchPedidosResumido()
    }

  }

  const handleClickRelatorioResumido = () => {
    setActionPedidoResumido(true);

    setActionHome(false);
    setActionPedidoDetalhado(false);
    setTabelaVisivel(false)
    refetchListaPedidos();
  }
  const handleClickRelatorioDetalhado = () => {
    setActionPedidoDetalhado(true);
    setActionPedidoResumido(false);
    setTabelaVisivel(false)
    setActionHome(false);
    refetchPedidosDetalhados();
  }
  const handleClickRelatorioProdutosCriados = () => {
    setActionProdutosCriados(true);
     setActionPedidoDetalhado(false);
     setActionPedidoResumido(false);
     setTabelaVisivel(false)
     refetchPedidosCriados();
    if(fornecedorSelecionado) {

    } else {
      alert("Selecione um fornecedor para gerar o relatório de produtos criados")
    }
  }

  const optionsSituacao = [
    { id: 1, value: '0', label: "Todas" },
    { id: 2, value: '1', label: "Migradas SAP" },
    { id: 3, value: '2', label: "Não Migradas SAP" },

  ];
  return (

    <Fragment>
      {actionHome && (
        <ActionMain
          title="Dashboard Cadastros"
          subTitle="Movimento de Caixa"
          linkComponentAnterior={["Home"]}
          linkComponent={["Tela Principal"]}

          InputFieldDTInicioComponent={InputField}
          valueInputFieldDTInicio={dataInicio}
          labelInputFieldDTInicio={"Data Início"}
          onChangeInputFieldDTInicio={(e) => setDataInicio(e.target.value)}

          InputFieldDTFimComponent={InputField}
          labelInputFieldDTFim={"Data Fim"}
          valueInputFieldDTFim={dataFim}
          onChangeInputFieldDTFim={(e) => setDataFim(e.target.value)}

          InputFieldNumeroNFComponent={InputField}
          labelInputFieldNumeroNF={"N° Pedido"}
          valueInputFieldNumeroNF={numeroPedido}
          onChangeInputFieldNumeroNF={(e) => setNumeroPedido(e.target.value)}

          InputSelectMarcasComponent={InputSelectAction}
          labelSelectMarcas={"Marca"}
          optionsMarcas={[
            { value: 0, label: "Selecione..." },
            ...dadosMarcas.map((marca) => ({
              value: marca.IDGRUPOEMPRESARIAL,
              label: marca.GRUPOEMPRESARIAL,
            }))]}
          valueSelectMarca={marcaSelecionada}
          onChangeSelectMarcas={handleChangeMarca}

          InputSelectFornecedorComponent={InputSelectAction}
          optionsFornecedores={[
            { value: 0, label: "Selecione..." },
            ...dadosFornecedores.map((fornecedor) => ({
              value: fornecedor.IDFORNECEDOR,
              label: `${fornecedor.NOFANTASIA} - ${fornecedor.NUCNPJ} - ${fornecedor.NORAZAOSOCIAL}`,
              // label: fornecedor.NOFANTASIA,
            }))]}
          defaultValueSelectFornecedor={fornecedorSelecionado}
          onChangeSelectFornecedor={handleSelectFornecedor}
          valueSelectFornecedor={fornecedorSelecionado}
          labelSelectFornecedor={"Por Fornecedor"}


          InputSelectFabricanteComponent={InputSelectAction}
          optionsFabricantes={[
            { value: 0, label: "Selecione..." },
            ...dadosFabricantes.map((fabricante) => ({
              value: fabricante.IDFABRICANTE,
              label: fabricante.DSFABRICANTE,
            }))]}
          onChangeSelectFabricante={handleSelectFabricante}
          valueSelectFabricante={fabricanteSelecionado}
          labelSelectFabricantes={"Por Fabricante"}

          InputSelectCompradorComponent={InputSelectAction}
          optionsCompradores={[
            { value: 0, label: "Selecione..." },
            ...dadosCompradores.map((comprador) => ({
              value: comprador.IDFUNCIONARIO,
              label: comprador.NOFUNCIONARIO,
            }))]}
          onChangeSelectComprador={handleSelectComprador}
          valueSelectComprador={fabricanteSelecionado}
          labelSelectComprador={"Por Comprador"}

          InputSelectSituacaoComponent={InputSelectAction}
          optionsSituacao={[
            { value: 0, label: "Selecione..." },
            ...optionsSituacao.map((situacao) => ({
              value: situacao.value,
              label: situacao.label,
            }))]}
          labelSelectSituacao={"Por Situação"}
          valueSelectSituacao={situacaoSelecionada}
          onChangeSelectSituacao={handleSelectSituacao}


          ButtonSearchComponent={ButtonType}
          linkNomeSearch={"Pesquisar"}
          onButtonClickSearch={handleClick}
          corSearch={"primary"}
          IconSearch={AiOutlineSearch}
        />

      )}


      {tabelaVisivel && (
        <div className="panel"
          style={{ backgroundColor: "#fff", padding: "15px" }}
        >
          <div className="panel-hdr">
            <h2>
              Lista de Pedidos <span class="fw-300"><i>Por Período</i></span>
            </h2>
          </div>
          <div className="row mb-4">

            <ButtonType
              Icon={AiOutlineSearch}
              iconSize="16px"
              textButton="Relatório Resumido"
              cor="primary"
              tipo="button"
              onClickButtonType={handleClickRelatorioResumido}
            />
            <ButtonType
              Icon={AiOutlineSearch}
              iconSize="16px"
              textButton="Relatório Detalhado"
              cor="secondary"
              tipo="button"
              onClickButtonType={handleClickRelatorioDetalhado}
            />
            <ButtonType
              Icon={AiOutlineSearch}
              iconSize="16px"
              textButton="Relatório Produtos Criado"
              cor="info"
              tipo="button"
              onClickButtonType={handleClickRelatorioProdutosCriados}
            />
          </div>
          <ActionListaPedidosPeriodo dadosListaPedidos={dadosListaPedidos} />
        </div>
      )}


      {actionPedidoResumido && (
        <ActionPDFPedidoResumido dadosPedidoResumido={dadosPedidoResumido} />
      )}


      {actionPedidoDetalhado && (
        <ActionPDFPedidoDetalhado dadosPedidosDetalhados={dadosPedidosDetalhados}/>
      )}

      {actionProdutosCriados && (
        <ActionListaProdutosCriados dadosListaProdutosCriados={dadosListaProdutosCriados}/>
      )}
    </Fragment>
  )
}