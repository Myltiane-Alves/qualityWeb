import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaVendasConvenio } from "./actionListaVendasConvenio";
import { ActionListaConvenioDescontoFuncionario } from "./actionListaConvenioDescontoFuncionario";
import { getDataAtual } from "../../../../utils/dataAtual";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useQuery } from "react-query"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData";

export const ActionPesquisaVendasConvenio = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
 
  const [descontoFuncionario, setDescontoFuncionario] = useState(true);
  const [marcaSelecionada, setMarcaSelecionada] = useState('')

  const [empresaSelecionada, setEmpresaSelecionada] = useState('')

  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelDescontoFuncionario, setTabelaVisivelDescontoFuncionario] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  // const [dadosVendasConvenio, setDadosVendasConvenio] = useState([]);
  const [dadosVendasConvenioFuncionario, setDadosVendasConvenioFuncionario] = useState([]);
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicio = getDataAtual();
    const dataFim = getDataAtual();
    setDataPesquisaInicio(dataInicio);
    setDataPesquisaFim(dataFim);

  }, []);
  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);
  

  // const getVendasConvenio = async () => {

  //   try {
  //     // api/administrativo/desconto-motivo-vendas.xsjs?idMarca=${idGrupo}&idEmpresa=${idEmpresa}&dataInicial=${dataPesqInicio}&dataFinal=${dataPesqFim}&dsmotdesc=${descontoFuncionario}
  //     const response = await get(`/vendaConvenio?idGrupo=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&descontoFuncionario=Convenio`)
  //     if (response.data) {
  //       setDadosVendasConvenio(response.data)
  //     }
  //     return response.data
  //   } catch (error) {
  //     console.log(error, "não foi possivel pegar os dados da tabela ")
  //   }
  // }
  

  const getVendaConvenioDescontoFuncionario = async () => {

    try {
      const response = await get(`/vendaConvenio?idGrupo=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dsMotivoDesc=Desconto Funcionario`)
      if (response.data) {
        setDadosVendasConvenioFuncionario(response.data)
      }
      return response.data
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const fetchListaVendasConvenio = async () => {
    try {
      
      const urlApi = `/vendaConvenio?idEmpresa=${empresaSelecionada}&idGrupo=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dsMotivoDesc=Convenio`;
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

  const { data: dadosVendasConvenio = [], error: errorVendasConvenio, isLoading: isLoadingVendasConvenio, refetch: refetchListaVendasConvenio } = useQuery(
    ['vendaConvenio', dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVendasConvenio(dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
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
    setTabelaVisivelDescontoFuncionario(false);
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    refetchListaVendasConvenio();
  };

  const handleClickDecontoFuncionario = () => {
    setTabelaVisivelDescontoFuncionario(true);
    setTabelaVisivel(false);
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    getVendaConvenioDescontoFuncionario();
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas Convênio por Loja e Período"]}
        title="Vendas Convênio e Desconto Funcionário por Loja e Período"
        // subTitle="Nome da Loja"
        
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
        optionsEmpresas={optionsEmpresas.map((empresa) => ({
          value: empresa.IDEMPRESA,
          label: empresa.NOFANTASIA,
        }))}
        
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.DSGRUPOEMPRESARIAL,

        }))}
        onChangeSelectMarcas={handleSelectMarca}
        valueSelectMarca={marcaSelecionada}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Desconto Funcionário"}
        onButtonClickCadastro={handleClickDecontoFuncionario}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}
      />

      {tabelaVisivel &&
        <ActionListaVendasConvenio dadosVendasConvenio={dadosVendasConvenio} /> 
      }

      {tabelaVisivelDescontoFuncionario && 
         <ActionListaConvenioDescontoFuncionario dadosVendasConvenioFuncionario={dadosVendasConvenioFuncionario} />
      }
    </Fragment>
  )
}
