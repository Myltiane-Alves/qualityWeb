import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ActionListaVendasProdutos } from "./actionListaVendasProdutos";
import { ActionListaVendasResumidas } from "./actionListaVendasResumida";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";



export const ActionPesquisaVendasLojas = ({usuarioLogado, ID, optionsEmpresas}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(true);
  const [tabelaVisivelProduto, setTabelaVisivelProduto] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
 
  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaFim(dataFinal);
    setDataPesquisaInicio(dataInicial);
  }, []);
  
  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );

  const fetchVendasProdutos = async () => {
    try {
       const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const urlApi = `/vendas-por-produtos?idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosVendasLojaProdutos = [], error: erroProdutos, isLoading: isLoadingProdutos, refetch: refetchVendasProdutos } = useQuery(
    'vendas-por-produtos',
    () => fetchVendasProdutos(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasLojasResumido = async () => {
    try {
      const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const urlApi = `/venda-resumido?idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosVendasLojaResumido = [], error: erroVendasResumidas, isLoading: isLoadingVendasResumidas, refetch: refetchVendasLojasResumido } = useQuery(
    'venda-resumido',
    () => fetchVendasLojasResumido(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );
 
  const handleClick = () => {
  
    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      refetchVendasLojasResumido(usuarioLogado && usuarioLogado.IDEMPRESA) 
     setTabelaVisivel(true)
     setTabelaVisivelProduto(false)
   
    }

  }
  
  const handleClickVendaProduto = () => {

    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      refetchVendasProdutos(usuarioLogado && usuarioLogado.IDEMPRESA)
      setTabelaVisivelProduto(true)
      setTabelaVisivel(false)
    } 
  }

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista Vendas da Lojas "]}
        title="Vendas Loja e Período"
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
        onChangeSelectPendencia={(e) =>  setEmpresaSelecionada(e.value) }
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

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Vendas Resumido"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Vendas Por Período"}
        oonButtonClickCadastro 
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}
        
        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Vendas Por Produto"}
        onButtonClickCancelar={handleClickVendaProduto}
        corCancelar={"warning"}
        IconCancela={AiOutlineSearch}
      />

      {tabelaVisivel && (

        <ActionListaVendasResumidas dadosVendasLojaResumido={dadosVendasLojaResumido} />
      )}

      {tabelaVisivelProduto &&
        <ActionListaVendasProdutos dadosVendasLojaProdutos={dadosVendasLojaProdutos}/>
      }

    </Fragment >
  )
}
