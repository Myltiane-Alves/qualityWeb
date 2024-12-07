import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { useNavigate } from "react-router-dom";
import { getDataAtual } from "../../../../utils/dataAtual"
import { InputField } from "../../../Buttons/Input"
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaConferenciaCaixa } from "./actionListaConferenciaCaixa";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaConferenciaCaixa = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const dataInicio = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFinal)
  }, [usuarioLogado && usuarioLogado.IDEMPRESA])
  
  const usuario = usuarioLogado && usuarioLogado.id;

  const fetchCaixaMovimento = async () => {
    try {
      
      const urlApi = `/movimento-caixa-gerencia?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
        
        async function fetchNextPage(page) {
          try {
            page++;
            const responseNextPage = await get(`${urlApi}&page=${page}`);
            if (responseNextPage.data.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(page);
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

  const { data: dadosMovimentosCaixa = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchCaixaMovimento } = useQuery(
    'movimento-caixa-gerencia',
    () => fetchCaixaMovimento(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const handleClick = () => {
    if (usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.DATA_HORA_SESSAO) {
      setCurrentPage(prevPage => prevPage + 1);
      refetchCaixaMovimento(usuarioLogado && usuarioLogado.IDEMPRESA);
      setTabelaVisivel(true);
    } else {
      console.log('Usuário não possui informações válidas.');
    }
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Conferência de Caixas"]}
        title="Movimento dos Caixas"
        subTitle={usuarioLogado?.NOFANTASIA}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        onButtonClickSearch={handleClick}
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

      />

      {tabelaVisivel && (
        <ActionListaConferenciaCaixa usuario={usuario} dadosMovimentosCaixa={dadosMovimentosCaixa} />
      )}

    </Fragment >
  )
}


