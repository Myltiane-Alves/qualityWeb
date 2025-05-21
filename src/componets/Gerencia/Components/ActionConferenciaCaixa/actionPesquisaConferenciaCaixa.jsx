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
import { InputSelectAction } from "../../../Inputs/InputSelectAction";


export const ActionPesquisaConferenciaCaixa = ({usuarioLogado, ID, optionsEmpresas }) => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );
  
  useEffect(() => {
    const dataInicio = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFinal)
  }, [])
  

  const fetchCaixaMovimento = async () => {
    try {
      const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const urlApi = `/movimento-caixa-gerencia?idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
    
    setCurrentPage(prevPage => prevPage + 1);
    refetchCaixaMovimento();
    setTabelaVisivel(true);
   
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Conferência de Caixas"]}
        title="Movimento dos Caixas"
        subTitle={usuarioLogado?.NOFANTASIA}

        InputSelectPendenciaComponent={InputSelectAction}
        labelSelectPendencia="Selecione a Empresa"
        optionsPendencia={[
          { value: '', label: 'Todas' },
          ...optionsEmpresas?.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        onChangeSelectPendencia={(e) => setEmpresaSelecionada(e.value)}
        valueSelectPendencia={empresaSelecionada}
        isVisible={{display: optionsModulos[0]?.ADMINISTRADOR == false ? "none" : "block"}}

        InputFieldDTInicioAComponent={InputField}
        valueInputFieldDTInicioA={dataPesquisaInicio}
        labelInputDTInicioA={"Data Início"}
        onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}
        
        InputFieldDTFimAComponent={InputField}
        labelInputDTFimA={"Data Fim"}
        valueInputFieldDTFimA={dataPesquisaFim}
        onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}

        onButtonClickSearch={handleClick}
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

      />

      {tabelaVisivel && (
        <ActionListaConferenciaCaixa 
          dadosMovimentosCaixa={dadosMovimentosCaixa} 
          usuarioLogado={usuarioLogado}
          optionsModulos={optionsModulos}  
        />
      )}

    </Fragment >
  )
}


