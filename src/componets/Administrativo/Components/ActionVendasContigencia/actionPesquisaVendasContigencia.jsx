import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaVendasContigencia } from "./actionListaVendasContigencia";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaVendasContigencia = ({ usuarioLogado, ID }) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000); 

  useEffect(() => {
    const dataInicio = getDataAtual();
    const dataFim = getDataAtual();
    setDataPesquisaInicio(dataInicio);
    setDataPesquisaFim(dataFim);
  }, []);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );
 
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    'listaEmpresaComercial',
    async () => {
      const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
      
      return response.data;
    },
    {enabled: false, staleTime: 5 * 60 * 1000, }
  );

  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);

  const fetchVendasAtivasContigencia  = async () => {
    try {
                                                                                                                                                              
      const urlApi = `venda-ativa?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&ufVenda=${ufSelecionado}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&statusContingencia=True&statusCancelado=False`;
      const response = await get(urlApi);
      
      if (response.data.length && response.page === pageSize) {
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

  const { data: dadosVendasAtivasContigencia = [], error: errorVendasAtivasContigencia, isLoading: isLoadingVendasAtivasContigencia, refetch: refetchVendasAtivasContigencia} = useQuery(
    ['venda-ativa',  marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasAtivasContigencia(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
      staleTime: 5 * 60 * 1000,
    }
  );

  const handleSelectEmpresa = (e) => {
    setEmpresaSelecionada(e.value);
  };

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  }

  const handleClick = () => {
    setTabelaVisivel(true);
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    refetchVendasAtivasContigencia()
  };

  const optionsUF = [ 
    { id: 1, value: '', label: 'Todos' },
    { id: 2, value: 'DF', label: 'DF' },
    { id: 3, value: 'GO', label: 'GO' },
  ]

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas Contingência por Loja e Período"]}
        title="Vendas Contingência por Loja e Período"
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
          { value: '0', label: 'Todas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.GRUPOEMPRESARIAL,

        }))}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        InputSelectUFComponent={InputSelectAction}
        labelSelectUF={"UF"}
        optionsSelectUF={optionsUF.map((empresa) => ({
          value: empresa.value,
          label: empresa.label,
        }))}
        onChangeSelectUF={e => setUfSelecionado(e.value)}
        valueSelectUF={ufSelecionado}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}


      />

      <ActionListaVendasContigencia  
        dadosVendasAtivasContigencia={dadosVendasAtivasContigencia}
        usuarioLogado={usuarioLogado}
        optionsModulos={optionsModulos}  
      />  
    </Fragment>
  )
}
