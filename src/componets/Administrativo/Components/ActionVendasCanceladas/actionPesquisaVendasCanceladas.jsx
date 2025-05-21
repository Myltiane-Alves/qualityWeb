import React, { Fragment, useEffect, useState } from "react"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ActionMain } from "../../../Actions/actionMain"
import { get } from "../../../../api/funcRequest"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionListaVendasCanceladas } from "./actionListaVendasCanceladas"
import { ActionListaVendasCanceladasMinutos } from "./actionListaVendasCanceladasMinutos"
import { ActionListaVendasCanceladasWeb } from "./actionListaVendasCanceladasWeb"
import { ActionListaVendasCanceladasEmitidaPDV } from "./actionListaVendasCanceladasEmitidaPDV"
import { getDataAtual } from "../../../../utils/dataAtual"
import { useQuery } from "react-query"
import { ActionListaVendasCanceladasEmTelaPDV } from "./actionListaVendasCanceladasEmTelaPDV"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"


export const ActionPesquisaVendasCanceladas = ({usuarioLogado, ID}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVendaWebVisivel, setTabelaVendaWebVisivel] = useState(false);
  const [tabelaVendaEmitidaPDVVisivel, setTabelaVendaEmitidaPDVVisivel] = useState(false);
  const [tabelaVendaCanceladaTelaPDV, setTabelaVendaCanceladaTelaPDV] = useState(false);
  const [tabelaVendaCanceladaMinutoVisivel, setTabelaVendaCanceladaMinutoVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000); 
  const [isqueryCancelPDVTela, setIsQueryCancelPDVTela] = useState(false)
  const [isqueryCanceladaEmitidaPDV, setIsQueryCanceladaEmitidaPDV] = useState(false)
  const [isqueryVendaCancelada, setIsQueryVendaCancelada] = useState(false)
  const [isqueryVendaCancelada30Minutos, setIsQueryVendaCancelada30Minutos] = useState(false)
  const [isqueryVendaCanceladaWeb, setIsQueryVendaCanceladaWeb] = useState(false)

  useEffect(() => {
    const dataInicial =  getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
    
  }, [])

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );
  
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    'listaEmpresaComercial',
    async () => {
      const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
      
      return response.data;
    },
    {enabled: false, staleTime: 5 * 60 * 1000, }
  );

  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);

  const fetchVendasCanceladas = async () => {
    try {
      //  statusContingencia, statusCanceladoWeb, stCanceladoPDVEmitida, stCanceladoPDVEmTela, statusCanceladoDepois30Minutos, cpfCliente
      const urlApi = `/venda-ativa?idGrupo=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&statusCancelado=True`;
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
   
  const { data: dadosVendasCanceladas = [], error: errorVendasMarca, isLoading: isLoadingVendasMarca, refetch: refetchVendasCanceladas } = useQuery(
    ['venda-ativa',  marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasCanceladas(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: isqueryVendaCancelada, staleTime: 5 * 60 * 1000}
  );

  const fetchVendasCanceladas30Minutos = async () => {
    try {
      
      const urlApi = `venda-ativa?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&statusCanceladoDepois30Minutos=True`;
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
   
  const { data: dadosVendasCanceladasMinutos = [], error: errorVendasCanceladas30Minutos, isLoading: isLoadingVendasCanceladas30Minutos, refetch: refetchVendasCanceladas30Minutos } = useQuery(
    ['venda-ativa',  marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasCanceladas30Minutos(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {enabled: isqueryVendaCancelada30Minutos, staleTime: 5 * 60 * 1000 }
  );

  const fetchVendasCanceladasWeb = async () => {
    try {
      
      const urlApi = `venda-ativa?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&statusCanceladoWeb=True`;
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
   
  const { data: dadosVendasCanceladasWeb = [], error: errorVendasCanceladasWeb, isLoading: isLoadingVendasCanceladasWeb, refetch: refetchVendasCanceladasWeb } = useQuery(
    ['venda-ativa',  marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasCanceladasWeb(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {enabled: isqueryVendaCanceladaWeb,  staleTime: 5 * 60 * 1000}
  );

  const fetchVendasCanceladasEmitidasPDV = async () => {
    try {
                                                                                                                                                                       
      const urlApi = `venda-ativa?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&stCanceladoPDVEmitida=True`;
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
   
  const { data: dadosVendasCanceladasEmitidasPDV = [], error: errorVendasCanceladasEmitidasPDV, isLoading: isLoadingVendasCanceladasEmitidasPDV, refetch: refetchVendasCanceladasEmitidasPDV } = useQuery(
    ['venda-ativa',  marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasCanceladasEmitidasPDV(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {enabled: isqueryCanceladaEmitidaPDV, staleTime: 5 * 60 * 1000 }
  );


  const fetchVendasCanceladasEmTelaPDV  = async () => {
    try {
                                                                                                                                                                       
      const urlApi = `/venda-ativa?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&stCanceladoPDVEmTela=True`;
      const response = await get(urlApi);
      
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            console.log(currentPage, 'currentPage')
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

  const { data: dadosVendasCanceladasEmTelaPDV = [], error: errorVendasCanceladasEmTelaPDV, isLoading: isLoadingVendasCanceladasEmTelaPDV, refetch: refetchVendasCanceladasEmTelaPDV} = useQuery(
    ['venda-ativa',  marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasCanceladasEmTelaPDV(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {enabled: isqueryCancelPDVTela, staleTime: 5 * 60 * 1000}
  );
 
  const handleSelectEmpresa = (e) => {
    setEmpresaSelecionada(e.value);
  }

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleClick = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    setIsQueryVendaCancelada(true)
    setIsQueryVendaCancelada30Minutos(false)
    setIsQueryVendaCanceladaWeb(false)
    setIsQueryCanceladaEmitidaPDV(false)
    setIsQueryCancelPDVTela(false)
    refetchVendasCanceladas()
    setTabelaVisivel(true)
    setTabelaVendaCanceladaMinutoVisivel(false)
    setTabelaVendaWebVisivel(false)
    setTabelaVendaEmitidaPDVVisivel(false)
    setTabelaVendaCanceladaTelaPDV(false)
  }

  const handleClickMinutos = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    setIsQueryVendaCancelada30Minutos(true)
    setIsQueryVendaCancelada(false)
    setIsQueryVendaCanceladaWeb(false)
    setIsQueryCanceladaEmitidaPDV(false)
    setIsQueryCancelPDVTela(false)
    refetchVendasCanceladas30Minutos()
    setTabelaVendaCanceladaMinutoVisivel(true)
    setTabelaVisivel(false)
    setTabelaVendaWebVisivel(false)
    setTabelaVendaEmitidaPDVVisivel(false)
    setTabelaVendaCanceladaTelaPDV(false)
  }

  const handleClickWeb = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    setIsQueryVendaCanceladaWeb(true)
    setIsQueryVendaCancelada30Minutos(false)
    setIsQueryVendaCancelada(false)
    setIsQueryCanceladaEmitidaPDV(false)
    setIsQueryCancelPDVTela(false)
    refetchVendasCanceladasWeb()
    setTabelaVendaWebVisivel(true)
    setTabelaVisivel(false)
    setTabelaVendaCanceladaMinutoVisivel(false)
    setTabelaVendaEmitidaPDVVisivel(false)
    setTabelaVendaCanceladaTelaPDV(false)
  }

  const handleClickEmitidasPDV = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    setIsQueryCanceladaEmitidaPDV(true)
    setIsQueryVendaCanceladaWeb(false)
    setIsQueryVendaCancelada30Minutos(false)
    setIsQueryVendaCancelada(false)
    setIsQueryCancelPDVTela(false)
    refetchVendasCanceladasEmitidasPDV()
    setTabelaVendaEmitidaPDVVisivel(true)
    setTabelaVendaWebVisivel(false)
    setTabelaVisivel(false)
    setTabelaVendaCanceladaMinutoVisivel(false)
    setTabelaVendaCanceladaTelaPDV(false)

  }
  const handleClickVendasCanceladaPDV = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    setIsQueryCancelPDVTela(true)

    setIsQueryCanceladaEmitidaPDV(false)
    setIsQueryVendaCanceladaWeb(false)
    setIsQueryVendaCancelada30Minutos(false)
    setIsQueryVendaCancelada(false)
    refetchVendasCanceladasEmTelaPDV()
    setTabelaVendaCanceladaTelaPDV(true)
    setTabelaVendaEmitidaPDVVisivel(false)
    setTabelaVendaWebVisivel(false)
    setTabelaVisivel(false)
    setTabelaVendaCanceladaMinutoVisivel(false)
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas Convênio por Loja e Período"]}
        title="Vendas Canceladas por Loja e Peíodo"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: '0', label: 'Todas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))]}
        labelSelectEmpresa={"Empresa"}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Por Marca"}
        optionsMarcas={[
          { value: '0', label: 'Selecione uma Marca' },
          ...optionsMarcas.map((item) => ({
            value: item.IDGRUPOEMPRESARIAL,
            label: item.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Todas"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        onButtonClickCadastro={handleClickMinutos}
        linkNome={"Pesquisa Canc. + 30 Min."}
        IconCadastro={AiOutlineSearch}
        corCadastro={"info"}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Pesquisa Canc. Web"}
        onButtonClickCancelar={handleClickWeb}
        IconCancelar={AiOutlineSearch}
        corCancelar={"success"}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"Pesquisa Canc. Emitidas PDV"}
        onButtonClickVendasEstrutura={handleClickEmitidasPDV}
        iconVendasEstrutura={AiOutlineSearch}
        corVendasEstrutura={"danger"}

        ButtonTypeVendasVendedor={ButtonType}
        linkNomeVendasVendedor={"Pesquisa Canc. Em Tela PDV"}
        onButtonClickVendasVendedor={handleClickVendasCanceladaPDV}
        iconVendasVendedor={AiOutlineSearch}
        corVendasVendedor={"warning"}
      />


     {tabelaVisivel &&
        <ActionListaVendasCanceladas 
          dadosVendasCanceladas={dadosVendasCanceladas} 
          optionsModulos={optionsModulos}
          usuarioLogado={usuarioLogado}  
        />
      }

      {tabelaVendaCanceladaMinutoVisivel &&
       <ActionListaVendasCanceladasMinutos dadosVendasCanceladasMinutos={dadosVendasCanceladasMinutos}/>
      }

      {tabelaVendaWebVisivel && 
        <ActionListaVendasCanceladasWeb dadosVendasCanceladasWeb={dadosVendasCanceladasWeb} />
      }

     {tabelaVendaEmitidaPDVVisivel &&
      <ActionListaVendasCanceladasEmitidaPDV dadosVendasCanceladasEmitidasPDV={dadosVendasCanceladasEmitidasPDV}/>
      }
      
      {tabelaVendaCanceladaTelaPDV && 
        <ActionListaVendasCanceladasEmTelaPDV  dadosVendasCanceladasEmTelaPDV={dadosVendasCanceladasEmTelaPDV}/>
      }

    </Fragment>
  )
}