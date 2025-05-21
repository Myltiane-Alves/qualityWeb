import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasDescontoFuncionario } from "./actionListaVendasDescontoFuncionario";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaVendasDescontoFuncionario = ({usuarioLogado, ID, optionsEmpresas}) => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('')
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
  
  }, []);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFim)

  }, [usuarioSelecionado]);

  const { data: dadosFuncionarios = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useQuery(
    'funcionarios',
    async () => {
      const response = await get(`/funcionarios?idEmpresa=${usuarioLogado.IDEMPRESA}`);
      console.log('response', response.data);
      return response.data;
    },
    {enabled: true, staleTime: 5 * 60 * 1000 }
  );

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );

  const fetchVendasConvenio = async () => {
    try {
      const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const urlApi = `/resumo-venda-convenio-desconto?statusCancelado=False&idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFuncionario=${usuarioSelecionado}`;
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

  const { data: dadosVendasConvenioDesconto = [], error: erroVendasConvenio , isLoading: isLoadingVendasConvenio, refetch: refetchVendasConvenio } = useQuery(
    'vendas-por-estrutura',
    () => fetchVendasConvenio(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim,  usuarioSelecionado, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const handleChangeFuncionario = (e) => {
    setUsuarioSelecionado(e.value);
  }
 
  const handleClick = () => {
    setCurrentPage(+1);
    refetchVendasConvenio();
    setTabelaVisivel(true);
  };

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas por Desconto e Período"]}
        title="Vendas por Desconto e Período"
        subTitle="Nome da Loja"
        
        InputSelectPendenciaComponent={InputSelectAction}
        labelSelectPendencia="Selecione a Empresa"
        optionsPendencia={[
          { value: '', label: 'Todas' },
          ...optionsEmpresas?.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        onChangeSelectPendencia={(e) => setEmpresaSelecionada(e.value)}
        valueSelectPendencia={empresaSelecionada}
        isVisible={{display: optionsModulos[0]?.ADMINISTRADOR == false ? "none" : "block"}}

        InputFieldDTInicioAComponent={InputField}
        valueInputFieldDTInicioA={dataPesquisaInicio}
        labelInputDTInicioA={"Data Início"}
        onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}
        
        InputFieldDTFimAComponent={InputField}
        labelInputDTFimA={"Data Fim"}
        valueInputFieldDTFimA={dataPesquisaFim}
        onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectFuncionarioComponent={InputSelectAction}
        labelSelectFuncionario={"Por Funcionário"}
        optionsFuncionarios={[
          { value: '', label: 'Selecione um Funcionário' },
          ...dadosFuncionarios.map((funcionario) => ({
          value: funcionario.IDFUNCIONARIO,
          label: funcionario.NOFUNCIONARIO,
        }))]}      
        valueSelectFuncionario={usuarioSelecionado}
        onChangeSelectFuncionario={handleChangeFuncionario}

  
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel &&
         
        <ActionListaVendasDescontoFuncionario dadosVendasConvenioDesconto={dadosVendasConvenioDesconto} />
      }
    </Fragment>
  )
}
