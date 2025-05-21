import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasDescontoFuncionario } from "./actionListaVendasDescontoFuncionario";
import { AiOutlineSearch } from "react-icons/ai";
import {InputSelectAction} from "../../../Inputs/InputSelectAction"
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaVendasDescontoFuncionario = ({ usuarioLogado, ID}) => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000); 

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFim)

  }, []);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    'listaEmpresasIformatica',
    async () => {
      const response = await get(`/listaEmpresasIformatica`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, }
  );
  
  const { data: dadosFuncionarios = [], error: errorFuncionarios, isLoading: isLoadingFuncionarios, refetch: refetchFuncionarios } = useQuery(
    'listaFuncionarioVendasDesconto',
    async () => {
      const response = await get(`/funcionarios?idEmpresa=${empresaSelecionada}`);
      
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  useEffect(() => {
    if (empresaSelecionada) {
      refetchFuncionarios();
    }
    
  }, [empresaSelecionada, refetchFuncionarios]);

  const fetchListaVendasConvenio = async () => {
    try {
      
      const urlApi = `/resumo-venda-convenio-desconto?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFuncionario=${funcionarioSelecionado}&statusCancelado=False`;
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
   
  const { data: dadosVendasConvenio = [], error: errorVendasMarca, isLoading: isLoadingVendasMarca, refetch: refetchListaVendasConvenio } = useQuery(
    ['listaVendasMarca',  empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, funcionarioSelecionado, currentPage, pageSize],
    () => fetchListaVendasConvenio(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, funcionarioSelecionado, currentPage, pageSize),
    {
      enabled: Boolean(empresaSelecionada), 
    }
  );

  const handleSelectEmpresa = (e) => {
    const empresa = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value)
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA)
  };

  const handleChangeFuncionario = (e) => {
    setFuncionarioSelecionado(e.value);
  }
 
  const handleClick = () => {
    setTabelaVisivel(true);
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaVendasConvenio()
  };

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas por Desconto e Período"]}
        title="Vendas por Desconto e Período"
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
          { value: '0', label: 'Todas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
        }))]}
        
        onChangeSelectEmpresa={(e) => handleSelectEmpresa(e)}
        valueSelectEmpresa={empresaSelecionada}

        InputSelectFuncionarioComponent={InputSelectAction}
        labelSelectFuncionario={"Por Funcionário"}
        optionsFuncionarios={dadosFuncionarios.map((funcionario) => ({
          value: funcionario.IDFUNCIONARIO,
          label: funcionario.NOFUNCIONARIO,
        }))}      
        valueSelectFuncionario={funcionarioSelecionado}
        onChangeSelectFuncionario={handleChangeFuncionario}

  
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      {tabelaVisivel &&
         
        <ActionListaVendasDescontoFuncionario 
          dadosVendasConvenio={dadosVendasConvenio} 
          usuarioLogado={usuarioLogado}  
          optionsModulos={optionsModulos}
        />
      }
    </Fragment>
  )
}