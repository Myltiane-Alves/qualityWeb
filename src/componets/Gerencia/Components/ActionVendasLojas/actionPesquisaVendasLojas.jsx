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



export const ActionPesquisaVendasLojas = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(true);
  const [tabelaVisivelProduto, setTabelaVisivelProduto] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
 

  const navigate = useNavigate();
  
  useEffect(() => {

    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaFim(dataFinal);
    setDataPesquisaInicio(dataInicial);
  }, []);
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
  }, [navigate, usuarioLogado]);

  const fetchVendasProdutos = async () => {
    try {
      
      const urlApi = `/vendas-por-produtos?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
    () => fetchVendasProdutos(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasLojasResumido = async () => {
    try {
      
      const urlApi = `/venda-resumido?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
    () => fetchVendasLojasResumido(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
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
        subTitle="Nome da Loja"
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

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
