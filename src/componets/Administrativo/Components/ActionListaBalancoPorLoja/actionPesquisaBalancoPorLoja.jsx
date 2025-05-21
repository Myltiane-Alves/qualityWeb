import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { ActionListaBalancoPorLoja } from "./actionListaBalancoPorLoja";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaBalancoPorLoja = ({usuarioLogado, ID}) => {
  const [descricao, setDescricao] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)

  useEffect(() => {
    const dataInicio = getDataAtual();
    const dataFim = getDataAtual();
    setDataPesquisaInicio(dataInicio);
    setDataPesquisaFim(dataFim);

  }, []);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
    'empresas',
    async () => {
      const response = await get(`/empresas`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );


  const fetchListaBalanco = async ( ) => {
    try {
      
      const urlApi = `/balanco-loja?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dsDescricao=${descricao}`;
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
   
  const { data: dadosBalanco = [], error: errorBalanco, isLoading: isLoadingBalanco, refetch: refetchListaBalanco } = useQuery(
    ['balanco-loja', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, descricao, currentPage, pageSize],
    () => fetchListaBalanco(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, descricao, currentPage, pageSize),
    {
      enabled: Boolean(empresaSelecionada), 
    }
  );


  const handleSelectEmpresa = (e) => {
    const empresa = dadosEmpresas.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
    setEmpresaSelecionada(e.value);
  };

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaBalanco()
    setIsLoadingPesquisa(true)
    setTabelaVisivel(true)
    
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Balanço por Loja"]}
        title="Lista de Balanços por Loja "
        subTitle={empresaSelecionadaNome}

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Empresa"}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}
        optionsEmpresas={dadosEmpresas.map((empresa) => ({
          value: empresa.IDEMPRESA,
          label: empresa.NOFANTASIA,
        }))}

        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        placeHolderInputFieldComponent={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={e => setDescricao(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />
      {tabelaVisivel &&
       
        <ActionListaBalancoPorLoja 
          dadosBalanco={dadosBalanco} 
          optionsModulos={optionsModulos}
          usuarioLogado={usuarioLogado}  
        />
       
      }

    </Fragment>
  )
}
