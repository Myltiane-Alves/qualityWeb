import { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlineSearch } from "react-icons/ai"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaCustosLoja } from "./actionListaCustosLoja";
import { ActionListaPosicionamentoEstoque } from "./actionListaPosicionamentoEstoque";
import { ActionListaProdutoMaisVendido } from "./actionListaProdutoMaisVendido";
import { ActionListaVendasPorVendedor } from "./actionListaVendasPorVendedor";
import { ActionListaPorVendasEstrutura } from "./actionListaVendasPorEstrutura";
import { ActionListaProdutoVendidoColaborador } from "./actionListaProdutoVendidoColaborador";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData } from "../../../../hooks/useFetchData";

export const ActionPesquisaVendasRelatorio = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelProdutosMaisVendidos, setTabelaVisivelProdutosMaisVendidos] = useState(false);
  const [tabelaVisivelVendasVendedor, setTabelaVisivelVendasVendedor] = useState(false);
  const [tabelaVisivelVendasEstrutura, setTabelaVisivelVendasEstrutura] = useState(false);
  const [tabelaVisivelEstoqueVendasPosicionamento, setTabelaVisivelEstoqueVendasPosicionamento] = useState(false);
  const [tabelaVisivelColaborador, setTabelaVisivelColaborador] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [marcaProdutoSelecionada, setMarcaProdutoSelecionada] = useState('')
  const [grupoSelecionado, setGrupoSelecionado] = useState('')
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState('')
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')
  const [produtoPesquisado, setProdutoPesquisado] = useState('')
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [ufSelecionado, setUFSelecionado] = useState([]);
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, []);

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', `/marcasLista`);
  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('listaEmpresaComercial', `/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
  const { data: dadosGrupos = [], error: errorGrupo, isLoading: isLoadingGrupo } = useFetchData('grupo-produto', `/grupo-produto`);
  const { data: dadosSubGrupos = [], error: errorSubGrupo, isLoading: isLoadingSubGrupo } = useFetchData('subgrupo-produto', `/subgrupo-produto?idGrupo=${grupoSelecionado}`);
  const { data: dadosFornecedor = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useFetchData('lista-fornecedor-produto', `/lista-fornecedor-produto`);
  const { data: dadosColaborador = [], error: errorColaborador, isLoading: isLoadingColaborador } = useFetchData('funcionario-relatorio', `/funcionario-relatorio?idEmpresa=${empresaSelecionada}`);
  const { data: dadosMarcaProduto = [], error: errorMarcaProduto, isLoading: isLoadingMarcaProduto } = useFetchData('lista-marca-produto', `/lista-marca-produto?idSubGrupo=${subGrupoSelecionado}`);


  const fetchVendasCustoLojas = async () => {
    try {

      const urlApi = `/custo-por-loja?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idGrupoEmpresarial=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${descricaoProduto}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${produtoPesquisado}`;
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

  const { data: dadosCustosLojas = [], error: erroVendasCusto, isLoading: isLoadingVendasCusto, refetch: refetchVendasCustoLojas } = useQuery(
    'custo-por-loja',
    () => fetchVendasCustoLojas(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, produtoPesquisado, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasVendedor = async () => {
    try {

      const urlApi = `/vendas-vendedor-estrutura?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`;
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

  const { data: dadosVendasVendedor = [], error: erroVendasVendedor, isLoading: isLoadingVendasVendedor, refetch: refetchVendasVendedor } = useQuery(
    'vendas-vendedor-estrutura',
    () => fetchVendasVendedor(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, codProduto, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasEstrutura = async () => {
    try {

      const urlApi = `/vendas-por-estrutura?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarcaProduto=${marcaSelecionada}`;
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

  const { data: dadosVendasEstrutura = [], error: erroVendasEstrutura, isLoading: isLoadingVendasEstrutura, refetch: refetchVendasEstrutura } = useQuery(
    'vendas-por-estrutura',
    () => fetchVendasEstrutura(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, produtoPesquisado, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasEstoque = async () => {
    try {

      const urlApi = `/vendas-posicionamento-estoque?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${marcaProdutoSelecionada}`;
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

  const { data: dadosEstoqueVendasPosicionamento = [], error: erroVendasEstoque, isLoading: isLoadingVendasEstoque, refetch: refetchVendasEstoque } = useQuery(
    'vendas-posicionamento-estoque',
    () => fetchVendasEstoque(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, produtoPesquisado, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchVendasColaborador = async () => {
    try {

      const urlApi = `/colaboradorProdutosVendidos?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${marcaProdutoSelecionada}&idFuncionario=${funcionarioSelecionado}`;
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

  const { data: dadosColaboradorProdutosVendidos = [], error: erroVendasColaborador, isLoading: isLoadingVendasColaborador, refetch: refetchVendasColaborador } = useQuery(
    'colaboradorProdutosVendidos',
    () => fetchVendasColaborador(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, produtoPesquisado, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchProdutosMaisVendidos = async () => {
    try {

      const urlApi = `/produtos-mais-vendidos?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&uf=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`;
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

  const { data: dadosProdutosMaisVendidos = [], error: erroProdutosMaisVendidos, isLoading: isLoadingProdutosMaisVendidos, refetch: refetchProdutosMaisVendidos } = useQuery(
    'produtos-mais-vendidos',
    () => fetchProdutosMaisVendidos(dataPesquisaInicio, dataPesquisaFim, grupoSelecionado, empresaSelecionada, produtoPesquisado, ufSelecionado, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);

  };

  const handleEmpresaChange = (selectedOptions) => {

    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
    getListaVendasCustoLojas(values)

  }

  const handleGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setGrupoSelecionado(values);
  }

  const handleSubGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSubGrupoSelecionado(values);
  }

  const handleFornecedorChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFornecedorSelecionado(values);
  }

  const handleFuncionarioChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFuncionarioSelecionado(values);
  }

  const handleChangeMarcaProduto = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setMarcaProdutoSelecionada(values);
  }

  const handleSelectUF = (e) => {
    const selectedUF = e.value;
    setUFSelecionado(selectedUF);
  }


  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchVendasCustoLojas()
    setTabelaVisivel(true)
    setTabelaVisivelProdutosMaisVendidos(false)
    setTabelaVisivelVendasVendedor(false)
    setTabelaVisivelVendasEstrutura(false)
    setTabelaVisivelEstoqueVendasPosicionamento(false)
    setTabelaVisivelColaborador(false)

  }

  const hancleClickProdutosMaisVendidos = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchProdutosMaisVendidos()
    setTabelaVisivelProdutosMaisVendidos(true)
    setTabelaVisivel(false)
    setTabelaVisivelVendasVendedor(false)
    setTabelaVisivelVendasEstrutura(false)
    setTabelaVisivelEstoqueVendasPosicionamento(false)
    setTabelaVisivelColaborador(false)
    
  }

  const handleClickVendasVendedor = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchVendasVendedor()
    setTabelaVisivelVendasVendedor(true)
    setTabelaVisivel(false)
    setTabelaVisivelProdutosMaisVendidos(false)
    setTabelaVisivelVendasEstrutura(false)
    setTabelaVisivelEstoqueVendasPosicionamento(false)
    setTabelaVisivelColaborador(false)
  }

  const handleClickVendasEstrutura = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchVendasEstrutura()
    setTabelaVisivelVendasEstrutura(true)
    setTabelaVisivelVendasVendedor(false)
    setTabelaVisivel(false)
    setTabelaVisivelProdutosMaisVendidos(false)
    setTabelaVisivelEstoqueVendasPosicionamento(false)
    setTabelaVisivelColaborador(false)
    
  }


  const handleClickVendasPosicionamentoEstoque = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchVendasEstoque()
    setTabelaVisivelEstoqueVendasPosicionamento(true)
    setTabelaVisivelVendasVendedor(false)
    setTabelaVisivel(false)
    setTabelaVisivelProdutosMaisVendidos(false)
    setTabelaVisivelVendasEstrutura(false)
    setTabelaVisivelColaborador(false)
    
  }

  const handleClickColaboradorProdutosVendidos = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchVendasColaborador()
    setTabelaVisivelColaborador(true)
    setTabelaVisivel(false)
    setTabelaVisivelVendasVendedor(false)
    setTabelaVisivelVendasEstrutura(false)
    setTabelaVisivelEstoqueVendasPosicionamento(false)
    setTabelaVisivelProdutosMaisVendidos(false)
  }

  const optionsUF = [
    { value: 'DF', label: 'DF' },
    { value: 'GO', label: 'GO' },
  ]


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Relatórios Vendas"]}
        title="Relatórios Vendas"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}


        MultSelectFornecedorComponent={MultSelectAction}
        optionsMultSelectFornecedor={[
          { value: '', label: 'Selecione um Fornecedor' },
          ...dadosFornecedor.map((fornecedor) => ({
            value: fornecedor.ID_FORNECEDOR,
            label: `${fornecedor.ID_FORNECEDOR} ${fornecedor.FORNECEDOR}`,
          }))
        ]}
        labelMultSelectFornecedor={"Por Fornecedor"}
        valueMultSelectFornecedor={fornecedorSelecionado}
        onChangeMultSelectFornecedor={handleFornecedorChange}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={produtoPesquisado}
        onChangeInputFieldCodBarra={e => setProdutoPesquisado(e.target.value)}


        InputSelectUFComponent={InputSelectAction}
        optionsSelectUF={optionsUF.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        labelSelectUF={"UF"}
        valueSelectUF={ufSelecionado}
        onChangeSelectUF={handleSelectUF}


        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Por Marca"}
        optionsMarcas={[
          { value: '', label: 'Selecione uma Marca' },
          ...dadosMarcas.map((empresa) => ({
            value: empresa.IDGRUPOEMPRESARIAL,
            label: empresa.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarcas={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}


        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: '', label: 'Selecione uma loja' },
          ...dadosEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={[empresaSelecionada]}
        onChangeMultSelectEmpresa={handleEmpresaChange}

        MultSelectGrupoComponent={MultSelectAction}
        optionsMultSelectGrupo={[
          { value: '', label: 'Selecione um Grupo' },
          ...dadosGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.GRUPO,
          }))
        ]}
        labelMultSelectGrupo={"Por Grupo"}
        defaultValueMultSelectGrupo={[grupoSelecionado]}
        onChangeMultSelectGrupo={handleGrupoChange}
        isMultiSelectGrupo={true}

        MultSelectSubGrupoComponent={MultSelectAction}
        optionsMultSelectSubGrupo={[
          { value: '', label: 'Selecione um SubGrupo' },
          ...dadosSubGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.ESTRUTURA,
          }))
        ]}
        labelMultSelectSubGrupo={"SubGrupo"}
        valueMultSelectSubGrupo={[subGrupoSelecionado]}
        onChangeMultSelectSubGrupo={handleSubGrupoChange}

        MultSelectMarcaComponent={MultSelectAction}
        labelMultSelectMarca={"Marcas"}
        optionsMultSelectMarca={dadosMarcaProduto.map((item) => {
          return {
            value: item.ID_MARCA,
            label: item.MARCA,

          }
        })}
        valueMultSelectMarca={[marcaProdutoSelecionada]}
        onChangeMultSelectMarca={handleChangeMarcaProduto}

        MultSelectFuncionarioComponent={MultSelectAction}
        labelMultSelectFuncionario={"Funcionário"}
        optionsMultSelectFuncionario={[
          { value: '', label: 'Selecione um Funcionário' },
          ...dadosColaborador.map((item) => ({
            value: item.IDFUNCIONARIO,
            label: item.NOFUNCIONARIO,
          }))
        ]}
        valueMultSelectFuncionario={[funcionarioSelecionado]}
        onChangeMultSelectFuncionario={handleFuncionarioChange}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Custo Por Loja "}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Posicionamento Estoque"}
        onButtonClickCadastro={handleClickVendasPosicionamentoEstoque}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Vendas Por Vendedor"}
        onButtonClickCancelar={handleClickVendasVendedor}
        corCancelar={"warning"}
        IconCancelar={AiOutlineSearch}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"Produtos Mais Vendidos"}
        onButtonClickVendasEstrutura={hancleClickProdutosMaisVendidos}
        corVendasEstrutura={"info"}
        iconVendasEstrutura={AiOutlineSearch}

        ButtonTypeVendasVendedor={ButtonType}
        linkNomeVendasVendedor={"Vendas Por Estrutura"}
        onButtonClickVendasVendedor={handleClickVendasEstrutura}
        corVendasVendedor={"danger"}
        iconVendasVendedor={AiOutlineSearch}


        ButtonTypeProdutoVendidos={ButtonType}
        linkNomeProdutoVendido={"Colaborador Produtos Vendidos"}
        onButtonClickProdutoVendido={handleClickColaboradorProdutosVendidos}
        iconProdutoVendido={AiOutlineSearch}
        corProdutoVendido={"warning"}
      />

      {tabelaVisivel && (
        <ActionListaCustosLoja dadosCustosLojas={dadosCustosLojas} />
      )}

      {tabelaVisivelProdutosMaisVendidos && (
        <ActionListaProdutoMaisVendido dadosProdutosMaisVendidos={dadosProdutosMaisVendidos} />
      )}

      {tabelaVisivelVendasVendedor && (
        <ActionListaVendasPorVendedor dadosVendasVendedor={dadosVendasVendedor} />
      )}

      {tabelaVisivelVendasEstrutura && (
        <ActionListaPorVendasEstrutura dadosVendasEstrutura={dadosVendasEstrutura} />
      )}
      {tabelaVisivelEstoqueVendasPosicionamento && (
        <ActionListaPosicionamentoEstoque dadosEstoqueVendasPosicionamento={dadosEstoqueVendasPosicionamento} />
      )}
      {tabelaVisivelColaborador && (
        <ActionListaProdutoVendidoColaborador dadosColaboradorProdutosVendidos={dadosColaboradorProdutosVendidos} />
      )}

    </Fragment>
  )
}

// TOTAL DE LINHAS 2203