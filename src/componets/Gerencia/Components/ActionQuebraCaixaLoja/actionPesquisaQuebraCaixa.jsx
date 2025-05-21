import React, { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaQuebraCaixa } from "./actionListaQuebraCaixa";
import { getDataAtual } from "../../../../utils/dataAtual";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";


export const ActionPesquisaQuebraCaixa = ({usuarioLogado, ID, optionsEmpresas}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');

  useEffect(() => {
    const dataInicio = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFinal)

  }, [])
 
  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );

  const fetchQuebraCaixa = async () => {
    try {
      const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const urlApi = `/lista-quebra-caixa?idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosQuebraCaixa = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchQuebraCaixa } = useQuery(
    'lista-quebra-caixa',
    () => fetchQuebraCaixa(dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setTabelaVisivel(true);
    refetchQuebraCaixa();
  
  }

  
  return (

    <Fragment>  

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Conferência de Caixas"]}
        title="Lista de Quebras de Caixas da Loja"
        subTitle={usuarioLogado?.NOFANTASIA}

        InputSelectPendenciaComponent={InputSelectAction}
        labelSelectPendencia="Selecione a Empresa"
        optionsPendencia={[
          { value: '', label: 'Todas' },
          ...optionsEmpresas?.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
            idGrupoEmpresarial: empresa.IDGRUPOEMPRESARIAL,
          }))
        ]}
        onChangeSelectPendencia={(e) => {
          const empresaSelecionadaObj = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
          setMarcaSelecionado(empresaSelecionadaObj?.IDGRUPOEMPRESARIAL || '');
          setEmpresaSelecionada(e.value);
        }}
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
       <ActionListaQuebraCaixa dadosQuebraCaixa={dadosQuebraCaixa}/>

      )}

    </Fragment >
  )
}

