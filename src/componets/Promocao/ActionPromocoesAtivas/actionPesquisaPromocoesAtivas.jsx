import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../Actions/actionMain";
import { InputField } from "../../Buttons/Input";
import { ButtonType } from "../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../utils/animationCarregamento";
import { ActionListaPromocoesAtivas } from "./actionListaPromocaoAtivas";
import { getDataAtual } from "../../../utils/dataAtual";
import { get } from "../../../api/funcRequest";
import { ActionPesquisaPromocao } from "../ActionPromocao/actionPesquisaPromocao";


export const ActionPesquisaPromocoesAtivas = ({usuarioLogado, ID}) => {
  const [tabelaCampanha, setTabelaCampanha] = useState(true);
  const [actionPromocaoAtiva, setActionPromocaoAtiva] = useState(true);
  const [actionCadastrarPromocao, setActionCadastrarPromocao] = useState(false);
  const [tabelaProduto, setTabelaProduto] = useState(false);
  const [isQueryData, setIsQueryData] = useState(false)
  const [promocaoSelecionada, setPromocaoSelecionada] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataInicio(dataAtual)
    setDataFim(dataAtual)
  }, [])


  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const fetchListaProdutosPromocao = async () => {
    try {
      const urlApi = `/promocoes-ativas?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.page}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.data.length) {
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
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosListaPromocao = [], error: errorFuncionario, isLoading: isLoadingFuncionario, refetch: refetchListaProdutos } = useQuery(
    ['promocoes-ativas'],
    () => fetchListaProdutosPromocao(dataInicio, dataFim, currentPage, pageSize),
    {
      enabled: Boolean(isQueryData), staleTime: 5 * 60 * 1000, 
    }
  );
  

  const handleClickIncluir = () => {
    console.log("Incluir Promoção")
    setActionCadastrarPromocao(true)
    setActionPromocaoAtiva(false)
  }
  const handleClickProduto = () => {
    setIsQueryData(true)
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaProdutos() 
    setTabelaCampanha(true)    
  }


  return (

    <Fragment>
      {actionPromocaoAtiva && (
        <>
        <ActionMain
          linkComponentAnterior={["Home"]}
          linkComponent={["Cadastro de Promoções"]}
          title="Cadsatro de Promoções"
          
          InputFieldDTInicioAComponent={InputField}
          labelInputDTInicioA={"Data Início"}  
          valueInputFieldDTInicioA={dataInicio}
          onChangeInputFieldDTInicioA={(e) => setDataInicio(e.target.value)}
          
          InputFieldDTFimAComponent={InputField}
          labelInputDTFimA={"Data Fim"}
          valueInputFieldDTFimA={dataFim}
          onChangeInputFieldDTFimA={(e) => setDataFim(e.target.value)}
          
          ButtonSearchComponent={ButtonType}
          linkNomeSearch={"Pesquisar"}
          onButtonClickSearch={handleClickProduto}
          corSearch={"primary"}
          IconSearch={AiOutlineSearch}
          
          ButtonTypeCadastro={ButtonType}
          onButtonClickCadastro={handleClickIncluir}
          linkNome={"Incluir Promoção"}
          corCadastro={"success"}
          IconCadastro={MdAdd}
          
          />


        {tabelaCampanha && (   
          <div className="card">
            <ActionListaPromocoesAtivas 
              dadosListaPromocao={dadosListaPromocao} 
              optionsModulos={optionsModulos}
              usuarioLogado={usuarioLogado}
            />
          </div>
        )}
        </>
      )}

    {actionCadastrarPromocao && (
      <ActionPesquisaPromocao 
        optionsModulos={optionsModulos}
        usuarioLogado={usuarioLogado}
      />
    )}
    </Fragment >
  )
}