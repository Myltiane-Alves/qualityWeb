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
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";



export const ActionPesquisaEstoqueLoja = () => {
  const [tabelaVisivelEstoqueAtual, setTabelaVisivelEstoqueAtual] = useState(false);
  const [tabelaVisivelEstoqueRotatividade, setTabelaVisivelEstoqueRotatividade] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState([]);
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState([]);
  const [codBarra, setCodBarra] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
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

  }, [usuarioLogado]);


  const { data: dadosFornecedor = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useQuery(
    'lista-fornecedor-produto',
    async () => {
      const response = await get(`/lista-fornecedor-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const { data: dadosGrupos = [], error: errorGrupo, isLoading: isLoadingGrupo } = useQuery(
    'grupo-produto',
    async () => {
      const response = await get(`/grupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const { data: dadosSubGrupos = [], error: errorSubGrupo, isLoading: isLoadingSubGrupo } = useQuery(
    'subgrupo-produto',
    async () => {
      const response = await get(`/subgrupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useQuery(
    'lista-marca-produto',
    async () => {
      const response = await get(`/lista-marca-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const fetchListaEstoque = async () => {
    try {
      const urlApi = `/inventariomovimento?idEmpresa=${usuarioLogado.IDEMPRESA}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarca=${marcaSelecionada}&idFornecedor=${fornecedorSelecionado}&descricaoProduto=${codBarra}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&stAtivo=True`;
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
   
  const { data: dadosEstoqueAtual = [], error: errorEstoque, isLoading: isLoadingEstoque, refetch: refetchListaEstoque } = useQuery(
    ['estoqueAtual', usuarioLogado?.IDEMPRESA, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaEstoque(usuarioLogado?.IDEMPRESA, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
    }
  );

  const  fetchListaEstoqueRotatividade = async () => {
    try {
      const urlApi = `/inventariomovimento?idEmpresa=${usuarioLogado.IDEMPRESA}&idGrupo=${grupoSelecionado}&idSubGrupo=${subGrupoSelecionado}&idMarca=${marcaSelecionada}&idFornecedor=${fornecedorSelecionado}&descricaoProduto=${codBarra}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&stAtivo=`;
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

  const { data: dadosEstoqueRotatividade = [], error: errorEstoqueRotatividade, isLoading: isLoadingEstoqueRotatividade, refetch: refetchListaEstoqueRotatividade } = useQuery(
    ['estoqueAtual', usuarioLogado?.IDEMPRESA, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaEstoqueRotatividade(usuarioLogado?.IDEMPRESA, grupoSelecionado, grupoSelecionado, subGrupoSelecionado, marcaSelecionada, fornecedorSelecionado, codBarra, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
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


  const handleClickEstoqueAtual = () => {
    

    if(usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.IDGRUPOEMPRESARIAL && usuarioLogado.IDSUBGRUPOEMPRESARIAL) {
      setCurrentPage(+1);
      refetchListaEstoque (usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.IDGRUPOEMPRESARIAL && usuarioLogado.IDSUBGRUPOEMPRESARIAL)
      setTabelaVisivelEstoqueAtual(true)
      setTabelaVisivelEstoqueRotatividade(false)
    } else {
      setTabelaVisivelEstoqueAtual(false)
    }
  }
  const handleClickEstoqueRotatividade = () => {
    

    if(usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.IDGRUPOEMPRESARIAL && usuarioLogado.IDSUBGRUPOEMPRESARIAL) {
      setCurrentPage(+1);
      refetchListaEstoqueRotatividade(usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.IDGRUPOEMPRESARIAL && usuarioLogado.IDSUBGRUPOEMPRESARIAL)
      setTabelaVisivelEstoqueRotatividade(true)
      setTabelaVisivelEstoqueAtual(false)
    } else {
      setTabelaVisivelEstoqueRotatividade(false)
    }
  }


  return (

    <Fragment>
        
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Relatório"]}
        title="Estoque"
        subTitle="Nome da Loja"
        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        
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
        optionsMultSelectMarca={dadosMarcas.map((marca) => ({
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
      />

      {tabelaVisivelEstoqueAtual &&  (   
        <ActionListaEstoqueAtual dadosEstoqueAtual={dadosEstoqueAtual} />
      )}

      {tabelaVisivelEstoqueRotatividade && (   
        <ActionListaEstoqueRotatividade dadosEstoqueRotatividade={dadosEstoqueRotatividade} />
      )}

    </Fragment>
  )
}