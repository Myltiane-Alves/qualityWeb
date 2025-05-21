import React, { Fragment, useState, useEffect } from "react"
import makeAnimated from 'react-select/animated';
import { ActionListaAlteracaoPreco } from "./actionListaAlteracaoPreco";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useQuery } from "react-query";
import { InputCheckBoxAction } from "../../../Inputs/chekBoxAction";
import { useFetchData } from "../../../../hooks/useFetchData";
import { MenuTreeSelect } from "../../../Inputs/menuDropDown";
import { ActionAlteracaoPreco } from "../../../Actions/ActionAlteracaoPreco";
import { set } from "date-fns";


export const ActionPesquisaAlteracaoPreco = ({ }) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [codBarra, setCodBarra] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [estoque, setEstoque] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState([]);
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [isQueryAlteracao, setIsQueryAlteracao] = useState(false)

  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataPesquisaInicio(dataAtual)
    setDataPesquisaFim(dataAtual)

  }, []);

 

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    'listaEmpresaComercial',
    async () => {
      const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);

      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );

  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);



  const fetchListaAlteracaoPreco = async () => {
    try {

      const urlApi = `/alteracaoPreco?idEmpresa=${encodeURIComponent(empresaSelecionada)}&grupo=${encodeURIComponent(
        grupoSelecionado.join(',')
      )}&subGrupo=${encodeURIComponent(
        subGrupoSelecionado.join(',')
      )}&produto=${descricaoProduto}&codigobarras=${codBarra}&estoque=${estoque}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;

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



  const { data: dadosAlteracaoPreco = [], error: errorVendasMarca, isLoading: isLoadingVendasMarca, refetch: refetchListaPrecoAlteracao } = useQuery(
    ['alteracaoPreco', marcaSelecionada, empresaSelecionada, grupoSelecionado, subGrupoSelecionado, descricaoProduto, codBarra, estoque, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaAlteracaoPreco(marcaSelecionada, empresaSelecionada, grupoSelecionado, subGrupoSelecionado, descricaoProduto, codBarra, estoque, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: isQueryAlteracao,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const handleChangeMarca = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleChangeEmpresa = (e) => {
    const empresa = dadosEmpresas.find((item) => item.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  }

  const [treeData, setTreeData] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState({});


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




  useEffect(() => {
    if (dadosSubGrupos.length) {
      const gruposMap = new Map();

      dadosSubGrupos.forEach(subgrupo => {
        const grupoId = subgrupo.ID_GRUPO;
        const grupoDescricao = subgrupo.DS_GRUPO;

        if (!gruposMap.has(grupoId)) {
          gruposMap.set(grupoId, {
            key: grupoId,
            label: grupoDescricao,
            children: [],
          });
        }

        gruposMap.get(grupoId).children.push({
          key: subgrupo.ID_ESTRUTURA,
          label: subgrupo.ESTRUTURA,
        });
      });

      // Atualiza o estado de treeData
      const formattedTreeData = Array.from(gruposMap.values());
      setTreeData(formattedTreeData);

      // Atualiza os grupos e subgrupos selecionados
      setGrupoSelecionado(formattedTreeData.map(grupo => grupo.key));
      setSubGrupoSelecionado(formattedTreeData.flatMap(grupo => grupo.children.map(child => child.key)));
    }
  }, [dadosSubGrupos]);

  const handleTreeSelectChange = (e) => {
    const selectedValue = e.value;
    setSelectedNodes(selectedValue);

    // Atualize os grupos e subgrupos com base na seleção
    const selectedGrupo = Object.keys(selectedValue).map(id => id); // Grupo selecionado
    const selectedSubGrupo = Object.entries(selectedValue).flatMap(([id, data]) => data.children.map(child => child.key)); // Subgrupo selecionado

    setGrupoSelecionado(selectedGrupo);
    setSubGrupoSelecionado(selectedSubGrupo);
  };


  if (isLoadingGrupo || isLoadingSubGrupo) {
    return <div>Carregando...</div>;
  }

  if (errorGrupo || errorSubGrupo) {
    return <div>Erro ao carregar dados.</div>;
  }

  const handleClick = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1)
    setIsQueryAlteracao(true);
    refetchListaPrecoAlteracao()
    setTabelaVisivel(false);
  };


  return (

    <Fragment>


      <ActionAlteracaoPreco
        linkComponentAnterior={["Home"]}
        linkComponent={["Alteração de Preços"]}
        title="Alteração de Preços"
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
        optionsEmpresas={[
          { value: '0', label: 'Selecionar Empresa' },
          ...dadosEmpresas.map((item) => {
            return {
              value: item.IDEMPRESA,
              label: item.NOFANTASIA
            }
          })
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={dadosMarcas.map((marca) => ({
          value: marca.IDGRUPOEMPRESARIAL,
          label: marca.GRUPOEMPRESARIAL,

        }))}
        valueSelectMarcas={marcaSelecionada}
        onChangeSelectMarcas={handleChangeMarca}

        MenuTreeSelectComponent={MenuTreeSelect}
        valueTreeSelect={selectedNodes}
        onChangeTreeSelect={(e) => {handleTreeSelectChange(e);  }}
        optionsTreeSelect={treeData}
        placeholderTreeSelect={'Selecione'}

        InputCheckBoxAction={InputCheckBoxAction}
        labelCheckBox={"Sem Estoque"}
        nomeChekBox={"estoque"}
        checked={estoque}
        onChangeCheckBox={e => setEstoque(e.target.checked ? 'true' : 'false')}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={codBarra}
        onChangeInputFieldCodBarra={e => setCodBarra(e.target.value)}

        InputFieldComponent={InputField}
        labelInputField={"Nome Produto"}
        valueInputField={descricaoProduto}
        onChangeInputField={e => setDescricaoProduto(e.target.value)}
        placeHolderInputFieldComponent={"Nome Produto"}

        ButtonSearchComponent={ButtonType}
        onButtonClickSearch={handleClick}
        linkNomeSearch={"Alteração Preços"}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      <ActionListaAlteracaoPreco dadosAlteracaoPreco={dadosAlteracaoPreco} />

    </Fragment>
  )
}