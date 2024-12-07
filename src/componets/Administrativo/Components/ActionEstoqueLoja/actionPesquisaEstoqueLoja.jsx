import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import { ActionListaEstoqueRotatividade } from "./actionListaEstoqueRotatividade";
import { ActionListaEstoqueAtual } from "./actionListaEstoqueAtual";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionListaEstoqueUltimaPosicao } from "./actionListaEstoqueUltimaPosicao";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaEstoqueLoja = () => {
  const [tabelaEstoqueAtual, setTabelaEstoqueAtual] = useState(false);
  const [tabelaEstoqueRotatividade, setTabelaEstoqueRotatividade] = useState(false);
  const [tabelaUltimaPosicao, setTabelaEstoqueUltimaPosicao] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState([]);
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [codBarra, setCodBarra] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, []);


  const { data: dadosFornecedor = [], error: errorFornecedor, isLoading: isLoadingFornecedor, refetch: refetchFornecedor } = useQuery(
    'lista-fornecedor-produto',
    async () => {
      const response = await get(`/lista-fornecedor-produto?idMarca=${marcaSelecionada}`);
      return response.data;
    },
    {enabled: false, staleTime: 5 * 60 * 1000, }
  );

  
  const { data: dadosGrupos = [], error: errorGrupos, isLoading: isLoadingGrupos, refetch: refetchGrupos } = useQuery(
    'grupo-produto',
    async () => {
      const response = await get(`/grupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );
  
  const { data: dadosSubGrupos = [], error: errorSubGrupos, isLoading: isLoadingSubGrupos, refetch: refetchSubGrupos } = useQuery(
    'subgrupo-produto',
    async () => {
      const response = await get(`/subgrupo-produto${grupoSelecionado}`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );


  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
    'empresas',
    async () => {
      const response = await get(`/empresas`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: dadosMarca = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'lista-marca-produto',
    async () => {
      const response = await get(`/lista-marca-produto?${subGrupoSelecionado}`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );

  const fetchListaEstoque = async () => {
    try {
    
      const urlApi = `/inventariomovimento?idEmpresa=${empresaSelecionada}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarca=${marcaSelecionada}&idFornecedor=${fornecedorSelecionado}&descricaoProduto=${codBarra}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&stAtivo=True`;
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
   
  const { data: dadosEstoqueAtual = [], error: errorEstoque, isLoading: isLoadingEstoque, refetch: refetchListaEstoque } = useQuery(
    ['estoqueAtual', empresaSelecionada, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaEstoque(empresaSelecionada, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
    }
  );

  const { data: dadosEstoqueRotatividade = [], error: errorEstoqueRotatividade, isLoading: isLoadingEstoqueRotatividade, refetch: refetchListaEstoqueRotatividade } = useQuery(
    ['estoqueAtual', empresaSelecionada, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaEstoque(empresaSelecionada, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
    }
  );

  const fetchListaEstoqueUltima = async () => {
    try {
      
      const urlApi = `/ultimaPosicaoEstoque?idEmpresa=${empresaSelecionada}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarca=${marcaSelecionada}&idFornecedor=${fornecedorSelecionado}&descProduto=${codBarra}&dataPesquisaInicio=${dataPesquisaInicio}&stativo=True`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data === pageSize) {
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
   
  const { data: dadosEstoqueUltima = [], error: errorEstoqueUltima, isLoading: isLoadingEstoqueUltima, refetch: refetchListaEstoqueUltima } = useQuery(
    ['ultimaPosicaoEstoque', empresaSelecionada, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, currentPage, pageSize],
    () => fetchListaEstoqueUltima(empresaSelecionada, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, currentPage, pageSize),
    {
      enabled: false, 
    }
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

  const handleChangeEmpresa = (e) => {
    const empresa = dadosEmpresas.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
    setEmpresaSelecionada(e.value)
  }

  const handleClickEstoqueAtual = () => {
    setIsLoadingPesquisa(true)
    setCurrentPage(+1)
    refetchListaEstoque()
    setTabelaEstoqueAtual(true)
    setTabelaEstoqueRotatividade(false)
    setTabelaEstoqueUltimaPosicao(false)
    
  }
  const handleClickEstoqueRotatividade = () => {
    setIsLoadingPesquisa(true)
    setCurrentPage(+1)
    refetchListaEstoqueRotatividade()
    setTabelaEstoqueRotatividade(true)
    setTabelaEstoqueAtual(false)
    setTabelaEstoqueUltimaPosicao(false)
    
  }
  
  const handleClickEstoqueUltimaPosicao = () => {
    setIsLoadingPesquisa(true)
    setCurrentPage(+1)
    refetchListaEstoqueUltima()
    setTabelaEstoqueUltimaPosicao(true)
    setTabelaEstoqueRotatividade(false)
    setTabelaEstoqueAtual(false)
  }

  return (

    <Fragment>
        
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Relatório"]}
        title="Estoque"
        subTitle={empresaSelecionadaNome}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        placeHolderInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={codBarra}
        onChangeInputFieldCodBarra={(e) => setCodBarra(e.target.value)}
        
        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Selecione uma Loja"}
        optionsEmpresas={[
         ...dadosEmpresas.map((item) => {
            return {
              value: item.IDEMPRESA,
              label: item.NOFANTASIA,
            }
          })
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}

        MultSelectGrupoComponent={MultSelectAction}
        optionsMultSelectGrupo={dadosGrupos.map((grupo) => ( {
          value: grupo.ID_GRUPO,
          label: grupo.GRUPO,
        }))}
        valueMultSelectGrupo={grupoSelecionado}
        onChangeMultSelectGrupo={handleChangeGrupos}
        animatedComponentsGrupo={animatedComponents}
        labelMultSelectGrupo={"Grupo"}
        
        MultSelectSubGrupoComponent={MultSelectAction}
        optionsMultSelectSubGrupo={dadosSubGrupos.map((subGrupo) => ({
          value: subGrupo.ID_ESTRUTURA,
          label: subGrupo.ESTRUTURA,
        }))}
        valueMultSelectSubGrupo={subGrupoSelecionado}
        onChangeMultSelectSubGrupo={handleChangeSubGrupos}
        animatedComponentsSubGrupo={animatedComponents}
        labelMultSelectSubGrupo={"Subgrupo"}
        
        MultSelectMarcaComponent={MultSelectAction}
        optionsMultSelectMarca={dadosMarca.map((marca) => ({
          value: marca.ID_MARCA,
          label: marca.MARCA,
        }))}
        
        valueMultSelectMarca={marcaSelecionada}
        onChangeMultSelectMarca={handleChangeMarca}
        animatedComponentsMarca={animatedComponents}
        labelMultSelectMarca={"Marca"}
        
        MultSelectFornecedorComponent={MultSelectAction}
        optionsMultSelectFornecedor={dadosFornecedor.map((fornecedor) => ({
          value: fornecedor.ID_FORNECEDOR,
          label: `${fornecedor.CNPJ_CPF} - ${fornecedor.FORNECEDOR}`,
        }))}
        valueMultSelectFornecedor={fornecedorSelecionado}
        onChangeMultSelectFornecedor={handleChangeFornecedor}
        animatedComponentsFornecedor={animatedComponents}
        labelMultSelectFornecedor={"Fornecedor"}
        

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Estoque Atual"}
        onButtonClickSearch={handleClickEstoqueAtual}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Rotatividade Estoque"}
        onButtonClickCadastro={handleClickEstoqueRotatividade}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}
        
        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Estoque Anterior"}
        corCancelar={"info"}
        IconCancelar={AiOutlineSearch}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"Ultima Posição Estoque"}
        onButtonClickVendasEstrutura={handleClickEstoqueUltimaPosicao}
        corVendasEstrutura={"danger"}
        iconVendasEstrutura={AiOutlineSearch}

      />

      {tabelaEstoqueAtual &&  (   
        <ActionListaEstoqueAtual dadosEstoqueAtual={dadosEstoqueAtual} />
      )}

      {tabelaEstoqueRotatividade && (   
        <ActionListaEstoqueRotatividade dadosEstoqueRotatividade={dadosEstoqueRotatividade} />
      )}

      {tabelaUltimaPosicao && (
        <ActionListaEstoqueUltimaPosicao dadosEstoqueUltima={dadosEstoqueUltima} />
      )}

    </Fragment>
  )
}
