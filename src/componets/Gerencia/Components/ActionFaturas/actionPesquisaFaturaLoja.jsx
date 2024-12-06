import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { getDataAtual } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";
import { ActionListaFaturaLoja } from "./actionListaFaturaLoja";
import { AiOutlineSearch } from "react-icons/ai";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useQuery } from "react-query";

export const ActionPesquisaFaturaLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const navigate = useNavigate();


  useEffect(() => {
    const dataInicio = getDataAtual();
    const dataFim = getDataAtual();
    setDataPesquisaInicio(dataInicio);
    setDataPesquisaFim(dataFim);

  }, [])

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

  const fetchListaFaturas = async () => {
    try {
      const urlApi = `/detalhe-faturas?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
   
  const { data: dadosFaturas = [], error: errorVouchers, isLoading: isLoadingVouchers, refetch: refetchListaFaturas } = useQuery(
    ['detalhe-faturas', usuarioLogado?.IDEMPRESA,  dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaFaturas(usuarioLogado?.IDEMPRESA,  dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(usuarioLogado?.IDEMPRESA), staleTime: 1000 * 60 * 5 
    }
  );



  const handleClick = () => {
    if (usuarioLogado  && usuarioLogado.IDEMPRESA ) {
      setCurrentPage(prevPage => prevPage + 1);
      refetchListaFaturas(usuarioLogado && usuarioLogado.IDEMPRESA );
      setTabelaVisivel(true);
    } else {
      console.log('Usuário não possui informações válidas.');
    }
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Faturas "]}
        title="Lista de Faturas da Loja"
        subTitle="Nome da Loja"

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
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      {tabelaVisivel && (
        <ActionListaFaturaLoja dadosFaturas={dadosFaturas} />
      )}

    </Fragment>
  )
}

