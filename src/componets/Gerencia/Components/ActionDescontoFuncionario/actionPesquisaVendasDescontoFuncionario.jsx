import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom"
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasDescontoFuncionario } from "./actionListaVendasDescontoFuncionario";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaVendasDescontoFuncionario = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('')
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const navigate = useNavigate();


  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
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

  const fetchVendasConvenio = async () => {
    try {
      
      const urlApi = `/resumo-venda-convenio-desconto?statusCancelado=False&idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFuncionario=${usuarioSelecionado}`;
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
        
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

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
