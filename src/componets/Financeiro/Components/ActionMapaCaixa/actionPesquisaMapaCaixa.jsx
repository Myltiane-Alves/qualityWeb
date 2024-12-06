import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { getDataAtual } from "../../../../utils/dataAtual"
import { AiOutlineSearch } from "react-icons/ai"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaMapaCaixa } from "./actionListaMapaCaixa"
import { ActionListaAdiantamentoSalarial } from "./actionListaAdiantamentoSalarial"
import { ActionListaResumoVoucher } from "./actionListaResumoVoucher"
import { ActionListaDetalheFatura } from "./actionListaDetalheFatura"

import { ActionListaTotalRecebidoPeriodo } from "./actionListaTotalRecebidoPeriodo"
import { ActionListaVendasRecebidoEletronico } from "./actionListaVendasRecebidoEletronico"
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"


export const ActionPesquisaMapaCaixa = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(500)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, [])

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
    'empresas',
    async () => {
      const response = await get(`/empresas`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const fetchMapaCaixas = async () => {

    try {
      const urlApi = `/despesa-loja?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }

  const { data: dadosMapaCaixa = [], error: erroMapaCaixa, isLoading: isLoadingMapaCaixa, refetch: refetchMapaCaixas } = useQuery(
    'despesa-loja',
    () => fetchMapaCaixas(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, ),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const fetchTotalRecebidoEletronico = async () => {

    try {
      const urlApi = `/venda-recebido-eletronico?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }
  const { data: dadosTotalRecebidoEletronico = [], error: erroRecebidoEletronico, isLoading: isLoadingRecebidoEletronico, refetch: refetchTotalRecebidoEletronico } = useQuery(
    'venda-recebido-eletronico',
    () => fetchTotalRecebidoEletronico(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, ),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const fetchListaAdiantamentoSalarial = async () => {

    
    try {
      const urlApi = `/adiantamento-salarial?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }
  const { data: dadosAdiantamentoSalarial = [], error: erroAdiantamento, isLoading: isLoadingAdiantamento, refetch: refetchAdiantamentoSalarial } = useQuery(
    'adiantamento-salarial',
    () => fetchListaAdiantamentoSalarial(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, ),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const fetchListaResumoVoucher = async () => {

    try {
      const urlApi = `/resumo-voucher?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }
  const { data: dadosResumoVoucher= [], error: erroVoucher, isLoading: isLoadingVoucher, refetch: refetchListaResumoVoucher } = useQuery(
    'adiantamento-salarial',
    () => fetchListaResumoVoucher(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const fetchListaDetalheFatura = async () => {

    try {
      const urlApi = `/detalhe-faturas?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }
  const { data: dadosDetalheFatura = [], error: erroFatura, isLoading: isLoadingFatura, refetch: refetchListaDetalheFatura } = useQuery(
    'adiantamento-salarial',
    () => fetchListaDetalheFatura(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const fetchListaTotalRecebidoMapa = async () => {

    try {
      const urlApi = `/venda-total-recebido-periodo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }
  const { data: dadosTotalRecebidoPeriodo = [], error: erroRecebido, isLoading: isLoadingRecebido, refetch: refetchListaTotalRecebidoMapa } = useQuery(
    'venda-total-recebido-periodo',
    () => fetchListaTotalRecebidoMapa(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );
 
  const handleSelectEmpresa = (e) => {
    setEmpresaSelecionada(e.value)
  }

  const handleClick = () => {    
    setTabelaVisivel(true)
    refetchMapaCaixas()
    // refetchTotalRecebidoEletronico()
    // fetchTotalRecebidoEletronico()
    // refetchAdiantamentoSalarial()
    // refetchListaResumoVoucher()
    // refetchListaDetalheFatura()
    // refetchListaTotalRecebidoMapa()
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Mapa de Caixas"]}
        title="Mapa de Caixa por Lojas e Período"
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
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}
        optionsEmpresas={[
          { value: '0', label: 'Todas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />
      {tabelaVisivel && (

        <div className="card mt-4">

          <ActionListaMapaCaixa dadosMapaCaixa={dadosMapaCaixa}  />
       
          {/* <ActionListaAdiantamentoSalarial dadosAdiantamentoSalarial={dadosAdiantamentoSalarial} />
          <ActionListaResumoVoucher dadosResumoVoucher={dadosResumoVoucher} />
          <ActionListaDetalheFatura dadosDetalheFatura={dadosDetalheFatura} />  */}
      
          {/* <ActionListaTotalRecebidoPeriodo 
            dadosTotalRecebidoPeriodo={dadosTotalRecebidoPeriodo} 
            
          /> */}
      
          {/* <ActionListaVendasRecebidoEletronico 
            dadosTotalRecebidoEletronico={dadosTotalRecebidoEletronico} 
            dadosTotalRecebidoPeriodo={dadosTotalRecebidoPeriodo}
            dataPesquisaInicio={dataPesquisaInicio}
            dataPesquisaFim={dataPesquisaFim}
          /> */}
        </div>
      )}
    </Fragment>
  )
}
