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
// import { ListaSubGrupoAlteracaoPreco } from "../../../Inputs/menuDropDown";


export const ActionPesquisaAlteracaoPreco = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataPesquisaInicio(dataAtual)
    setDataPesquisaFim(dataAtual)

  }, []);

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

      const urlApi = `/alteracaoPreco?idMarca=${marcaSelecionada}&idEmpresa=${encodeURIComponent(empresaSelecionada)}&grupo=${encodeURIComponent(grupoSelecionado)}&subGrupo=${encodeURIComponent(subGrupoSelecionado)}&produto=${descricaoProduto}&codigobarras=${codBarra}&estoque=${estoque}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
        console.log(allData, 'response.data')
        return allData;
      } else {
        console.log(response.data, 'response.data')
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
    ['listaVendasMarca', marcaSelecionada, empresaSelecionada,  grupoSelecionado, subGrupoSelecionado, descricaoProduto, codBarra, estoque, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaAlteracaoPreco(marcaSelecionada, empresaSelecionada, grupoSelecionado, subGrupoSelecionado, descricaoProduto, codBarra, estoque, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(marcaSelecionada && empresaSelecionada ), 
      // enabled: true, 
    }
  );
  console.log(dadosAlteracaoPreco, 'dadosAlteracaoPreco')

  const handleChangeGrupos = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setGrupoSelecionado(values);
  };
  
  const handleChangeSubGrupos = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setSubGrupoSelecionado(values);
  };


  const handleChangeMarca = (e) => {
    setMarcaSelecionada(e.value);
  };
  
  const handleChangeEmpresa = (e) => {
    setEmpresaSelecionada(e.value);
  }
  
  const handleClick = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaPrecoAlteracao()
    setTabelaVisivel(false);
  };


  return (

    <Fragment>

    
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Alteração de Preços"]}
        title="Alteração de Preços"
        subTitle="Nome da Loja"

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
          {value: '0', label: 'Selecionar Empresa'},
          ...dadosEmpresas.map((item) => {
            return {
              value: item.IDEMPRESA,
              label: item.NOFANTASIA
            }
          })
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}

        InputSelectGrupoComponent={InputSelectAction}
        labelSelectGrupo={"Marca"}
        optionsGrupos={dadosMarcas.map((marca) => ({
          value: marca.IDGRUPOEMPRESARIAL,
          label: marca.GRUPOEMPRESARIAL,

        }))}
        valueSelectGrupo={marcaSelecionada}
        onChangeSelectGrupo={handleChangeMarca}
        

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={codBarra}
        onChangeInputFieldCodBarra={e => setCodBarra(e.target.value)}

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

         
        CheckBoxComponent={InputCheckBoxAction}
        idCheckBox={"estoque"}
        labelCheckBox={"Sem Estoque"}
        nomeChekBox={"estoque"}
        isChekedBox={estoque}
        placeHolderCheckBox
        onChangeCheckBox={e => setEstoque(e.target.checked ? 'True' : 'False')}

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


