import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import makeAnimated from 'react-select/animated';
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaProdutoVendido } from "./actionListaProdutoVendido";
import { ActionListaVendasEstrutura } from "./actionListaVendasEstrutura";
import { ActionListaVendasVendedor } from "./actionListaVendasVendedor";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useQuery } from "react-query";


export const ActionPesquisaVendasEstrutura = () => {
  const [tabelaProdutosMaisVendidos, setTabelaProdutosMaisVendidos] = useState(false);
  const [tabelaVendasPorVendedor, setTabelaVendasPorVendedor] = useState(false);
  const [tabelaVendasPorEstrutura, setTabelaVendasPorEstrutura] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [codProduto, setCodProduto] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);


  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

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
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
  }, [usuarioLogado]);

  const { data: dadosFornecedores = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useQuery(
    'lista-fornecedor-produto',
    async () => {
      const response = await get(`/lista-fornecedor-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

  const { data: dadosGrupos = [], error: errorGrupo, isLoading: isLoadingGrupo } = useQuery(
    'grupo-produto',
    async () => {
      const response = await get(`/grupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

  const { data: dadosSubGrupos = [], error: errorSubGrupo, isLoading: isLoadingSubGrupo } = useQuery(
    'subgrupo-produto',
    async () => {
      const response = await get(`/subgrupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useQuery(
    'lista-marca-produto',
    async () => {
      const response = await get(`/lista-marca-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

  const fetchVendasEstrutura = async () => {
    try {
      
      const urlApi = `/vendas-por-estrutura?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idEmpresa=${usuarioLogado.IDEMPRESA}&descricaoProduto=${codProduto}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarcaProduto=${marcaSelecionada}`;
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

  const { data: dadosVendasEstrutura = [], error: erroVendasEstrutura , isLoading: isLoadingVendasEstrutura, refetch: refetchVendasEstrutura } = useQuery(
    'vendas-por-estrutura',
    () => fetchVendasEstrutura(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, codProduto, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchProdutosMaisVendidos = async () => {
    try {
      
      const urlApi = `/produtos-mais-vendidos?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLojaPesquisaVenda=${usuarioLogado.IDEMPRESA}&descricaoProduto=${codProduto}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`;
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

  const { data: dadosProdutosMaisVendidos = [], error: erroProdutosMaisVendidos , isLoading: isLoadingProdutosMaisVendidos, refetch: refetchProdutosMaisVendidos } = useQuery(
    'produtos-mais-vendidos',
    () => fetchProdutosMaisVendidos(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, codProduto, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasVendedor = async () => {
    try {
      
      const urlApi = `/vendas-vendedor-estrutura?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idEmpresa=${usuarioLogado.IDEMPRESA}&descricaoProduto=${codProduto}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`;
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

  const { data: dadosVendasVendedor = [], error: erroVendasVendedor , isLoading: isLoadingVendasVendedor, refetch: refetchVendasVendedor } = useQuery(
    'vendas-vendedor-estrutura',
    () => fetchVendasVendedor(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, codProduto, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );


  const handleChangeGrupos = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);

    setGrupoSelecionado(values);
  };
  const handleChangeSubGrupos = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);

    setSubGrupoSelecionado(values);
  };
  
  const handleChangeFornecedor = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);

    setFornecedorSelecionado(values);
  };
  const handleChangeMarca = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setMarcaSelecionada(values);
  };

  const handleClickProdutosVendidos = () => {

    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      setCurrentPage(+1);
      refetchProdutosMaisVendidos();
      setTabelaProdutosMaisVendidos(true);
      setTabelaVendasPorEstrutura(false);
      setTabelaVendasPorVendedor(false);
    } 
          
  }

  const handleClickVendasEstrutura = () => {
    
    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      setCurrentPage(+1);
      refetchVendasEstrutura( );
      setTabelaVendasPorEstrutura(true);
      setTabelaProdutosMaisVendidos(false);
      setTabelaVendasPorVendedor(false);
    } 
      
  }

  const handleClickVendasVendedor = () => {
    
    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      setCurrentPage(+1);
      refetchVendasVendedor();
      setTabelaVendasPorVendedor(true);
      setTabelaProdutosMaisVendidos(false);
      setTabelaVendasPorEstrutura(false);
    } 
   
  }


  return (

    <Fragment>


      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas"]}
        title="Relatório de Vendas"
        subTitle="Nome da Loja"
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={codProduto}
        onChangeInputFieldCodBarra={(e) => setCodProduto(e.target.value)}

        MultSelectGrupoComponent={MultSelectAction}
        labelMultSelectGrupo={"Grupo"}
        optionsMultSelectGrupo={dadosGrupos.map((grupo) => ({
          value: grupo.ID_GRUPO,
          label: grupo.GRUPO,
        }))}
        valueMultSelectGrupo={grupoSelecionado}
        onChangeMultSelectGrupo={handleChangeGrupos}
        animatedComponentsGrupo={animatedComponents}

        MultSelectSubGrupoComponent={MultSelectAction}
        labelMultSelectSubGrupo={"Subgrupo"}
        optionsMultSelectSubGrupo={dadosSubGrupos.map((subGrupo) => ({
          value: subGrupo.ID_ESTRUTURA,
          label: subGrupo.ESTRUTURA,
        }))}
        valueMultSelectSubGrupo={subGrupoSelecionado}
        onChangeMultSelectSubGrupo={handleChangeSubGrupos}
        animatedComponentsSubGrupo={animatedComponents}

        MultSelectMarcaComponent={MultSelectAction}
        labelMultSelectMarca={"Marca"}
        optionsMultSelectMarca={dadosMarcas.map((marca) => ({
          value: marca.ID_MARCA,
          label: marca.MARCA,

        }))}
        valueMultSelectMarca={marcaSelecionada}
        onChangeMultSelectMarca={handleChangeMarca}
        animatedComponentsMarca={animatedComponents}

        MultSelectFornecedorComponent={MultSelectAction}
        labelMultSelectFornecedor={"Fornecedor"}
        optionsMultSelectFornecedor={dadosFornecedores.map((fornecedor) => ({
          value: fornecedor.ID_FORNECEDOR,
          label: `${fornecedor.CNPJ_CPF} - ${fornecedor.FORNECEDOR}`,

        }))}
        valueMultSelectFornecedor={fornecedorSelecionado}
        onChangeMultSelectFornecedor={handleChangeFornecedor}
        animatedComponentsFornecedor={animatedComponents}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Vendas por estrutura"}
        onButtonClickSearch={handleClickVendasEstrutura}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Vendas Por Vendedor"}
        onButtonClickCadastro={handleClickVendasVendedor}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Produto mais vendidos"}
        onButtonClickCancelar={handleClickProdutosVendidos}
        corCancelar={"warning"}
        IconCancelar={AiOutlineSearch}


      />


      {tabelaVendasPorEstrutura &&  (
        <ActionListaVendasEstrutura dadosVendasEstrutura={dadosVendasEstrutura} />
      )}
    
      {tabelaProdutosMaisVendidos &&  (
        <ActionListaProdutoVendido dadosProdutosMaisVendidos={dadosProdutosMaisVendidos} />
      )}

      {tabelaVendasPorVendedor &&  (
        <ActionListaVendasVendedor dadosVendasVendedor={dadosVendasVendedor} />
      )} 
    </Fragment>
  )

}
