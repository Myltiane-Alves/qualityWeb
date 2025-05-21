import React, { Fragment, useState, useEffect } from "react"
import makeAnimated from 'react-select/animated';
import { useNavigate } from "react-router-dom";
import { ActionListaAlteracaoPreco } from "./actionListaAlteracaoPreco"
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useQuery } from "react-query";
import  { MenuTreeSelect } from "../../../Inputs/menuDropDown";
import { TreeSelect } from 'primereact/treeselect';

export const ActionPesquisaAlteracaoPreco = ({usuarioLogado, ID }) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [codBarra, setCodBarra] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const animatedComponents = makeAnimated();

  useEffect(() => { 
    const dataInicio = getDataAtual();
    const dataFim = getDataAtual();
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFim)
  }, [])


  const fetchListaAlteracaoPreco = async () => {
    try {
      // const grupoSelecionado = selectedNodes.length > 0 ? selectedNodes[0].id : '';
      // const subGrupoSelecionado = selectedNodes.length > 0 ? selectedNodes[0].subId : ''; 

      const urlApi = `/alteracaoPreco?idEmpresa=${usuarioLogado.IDEMPRESA}&grupo=${grupoSelecionado}&subGrupo=${subGrupoSelecionado}&descProduto=${codBarra}&estoque=false&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
   
  const { data: dadosAlteracaoPreco = [], error: errorBalanco, isLoading: isLoadingBalanco, refetch: refetchListaAlteracaoPreco } = useQuery(
    ['estoqueAtual', usuarioLogado?.IDEMPRESA,  dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaAlteracaoPreco(usuarioLogado?.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
    }
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

  const handleChangeGrupos = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setGrupoSelecionado(values);
  };
  const handleChangeSubGrupos = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setSubGrupoSelecionado(values);
  };

  const handleTabelaVisivel = () => {

    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      setCurrentPage(+1);
      refetchListaAlteracaoPreco()
      setTabelaVisivel(true);   
    }
  };

 
  // const [treeData, setTreeData] = useState([]);
  // const [selectedNodes, setSelectedNodes] = useState(null);

  // useEffect(() => {
  //   if (dadosGrupos.length && dadosSubGrupos.length) {
  //     const formattedTreeData = dadosGrupos.map(grupo => ({
  //       key: grupo.ID_GRUPO,
  //       label: grupo.GRUPO,
  //       children: dadosSubGrupos
  //         .filter(subgrupo => subgrupo.ID_GRUPO === grupo.ID_GRUPO)
  //         .map(subgrupo => ({
  //           key: subgrupo.ID_ESTRUTURA,
  //           label: subgrupo.ESTRUTURA,
  //         })),
  //     }));

  //     // Add "Select All" option
  //     const selectAllOption = {
  //       key: 'select-all',
  //       label: 'Selecionar Tudo',
  //       children: formattedTreeData, // Inclui grupos, mas não duplicará os subgrupos
  //     };

  //     setTreeData([selectAllOption, ...formattedTreeData]);
  //   }
  // }, [dadosGrupos, dadosSubGrupos]);



  return (

    <Fragment>
   
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Alteração de Preços"]}
        title="Alteração de Preços "
        subTitle="Nome da Loja"
        
        // MenuTreeSelectComponent={MenuTreeSelect}
        // valueTreeSelect={selectedNodes}
        // optionsTreeSelect={treeData}
        // onChangeTreeSelect={(e) => setSelectedNodes(e.value)}
        // placeholderTreeSelect={"Selecione Grupos e Subgrupos"}

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}
        
        InputFieldVendedor={InputField}
        labelInputFieldVendedor={"Cód.Barras / Nome Produto"}
        onChangeInputFieldVendedor={e => setCodBarra(e.target.value)} 
        valueInputFieldVendedor={codBarra}   

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
        
        ButtonSearchComponent={ButtonType}
        onButtonClickSearch={handleTabelaVisivel}
        linkNomeSearch={"Alteração Preços"}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}


      />

      {/* <div className="card flex justify-content-center">
      <TreeSelect
      value={selectedNodes}
      options={treeData}
      onChange={(e) => setSelectedNodes(e.value)}
      placeholder="Selecione Grupos e Subgrupos"
      display="chip"
      selectionMode="checkbox"
      className="w-full md:w-20rem"
    />

        </div> */}
      
      {tabelaVisivel && (
        <ActionListaAlteracaoPreco dadosAlteracaoPreco={dadosAlteracaoPreco} />
      )}

    </Fragment>
  )
}

