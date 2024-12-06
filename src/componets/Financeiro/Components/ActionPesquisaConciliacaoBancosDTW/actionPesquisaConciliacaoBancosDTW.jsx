import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import {  AiOutlineSearch } from "react-icons/ai"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { useQuery } from 'react-query';
import Swal from "sweetalert2"
import { ActionListaConciliacaoBancoDTW } from "./actionListaConciliacaoBancoDTW"
import { ActionListaConsolidadoBancoDTW } from "./actionListaConsolidadoBancoDTW"
import { ActionListaCompensacaoBancoDTW } from "./actionListaCompensacaoBancoDTW"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useFetchData } from "../../../../hooks/useFetchData"

export const ActionPesquisaConciliacaoBancosDTW = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelConsolidado, setTabelaVisivelConsolidado] = useState(false);
  const [tabelaVisivelCompensacao, setTabelaVisivelCompensacao] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [dataPesquisaInicioB, setDataPesquisaInicioB] = useState('')
  const [dataPesquisaFimB, setDataPesquisaFimB] = useState('')
  const [dataPesquisaInicioC, setDataPesquisaInicioC] = useState('')
  const [dataPesquisaFimC, setDataPesquisaFimC] = useState('')
  const [contaSelecionada, setContaSelecionada] = useState('')
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(500); 

  const { data: dadosContaBanco = [], error: errorContaBanco, isLoading: isLoadingContaBanco, } = useFetchData('contaBanco', '/contaBanco');
  
  useEffect(() => {
    if (errorContaBanco) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao buscar conta!',
      });
    }
  }, [errorContaBanco]);


  const fetchConciliarBanco = async () => {
    try {
      const urlApi = `/deposito-loja?idConta=${contaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dataCompensacaoInicio=${dataPesquisaInicioB}&dataCompensacaoFim=${dataPesquisaFimB}&dataMovimentoInicio=${dataPesquisaInicioC}&dataMovimentoFim=${dataPesquisaFimC}`;
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
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosConciliarBanco = [], error: errorConciliarBanco, isLoading: isLoadingConciliarBanco, refetch: refetchConciliarBanco } = useQuery(
    ['deposito-loja',  contaSelecionada, dataPesquisaInicio, dataPesquisaFim, dataPesquisaInicioB, dataPesquisaFimB, dataPesquisaInicioC, dataPesquisaFimC, currentPage, pageSize],
    () => fetchConciliarBanco(contaSelecionada, dataPesquisaInicio, dataPesquisaFim, dataPesquisaInicioB, dataPesquisaFimB, dataPesquisaInicioC, dataPesquisaFimC, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  )


  const fetchConciliarBancoConsolidado = async ( ) => {
    try {
      const urlApi = `/depositoLojaConsolidado?idConta=${contaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dataCompensacaoInicio=${dataPesquisaInicioB}&dataCompensacaoFim=${dataPesquisaFimB}&dataMovimentoInicio=${dataPesquisaInicioC}&dataMovimentoFim=${dataPesquisaFimC}`;
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
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
    
  };


  const { data: dadosConciliarBancoConsolidado = [], error: errorBancoConsolidado, isLoading: isLoadingBancoConsolidado, refetch: refetchBancoConsolidado } = useQuery(
    ['depositoLojaConsolidado',  contaSelecionada, dataPesquisaInicio, dataPesquisaFim, dataPesquisaInicioB, dataPesquisaFimB, dataPesquisaInicioC, dataPesquisaFimC, currentPage, pageSize],
    () => fetchConciliarBancoConsolidado(contaSelecionada, dataPesquisaInicio, dataPesquisaFim, dataPesquisaInicioB, dataPesquisaFimB, dataPesquisaInicioC, dataPesquisaFimC, currentPage, pageSize),
    { enabled: false }
  )

  
  const onChangeSelectConta = (e) => {
    setContaSelecionada(e.value)
  }

  const handleClick = () => {

    if (contaSelecionada) {
      setTabelaVisivel(true)
      setTabelaVisivelConsolidado(false)
      setIsLoadingPesquisa(true);
      setCurrentPage(+1); 
      refetchConciliarBanco()
    } else {
      Swal.fire('Erro', 'Por favor, selecione uma Conta.', 'error');
    }
  }

  const handleClickCompensacao = () => {

    if (contaSelecionada) {
      setTabelaVisivel(false)
      setTabelaVisivelConsolidado(false)
      setTabelaVisivelCompensacao(true)
      setIsLoadingPesquisa(true);
      setCurrentPage(+1); 
      refetchConciliarBanco()
    } else {
      Swal.fire('Erro', 'Por favor, selecione uma Conta.', 'error');
    }
  }

  const handleClickConsolidado = () => {
   

    if (contaSelecionada) {
      setTabelaVisivelConsolidado(true)
      setTabelaVisivel(false)

      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refetchBancoConsolidado()
    } else {
      Swal.fire('Erro', 'Por favor, selecione uma Conta.', 'error');
    }
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Conciliação por Bancos"]}
        title="Conciliação por Bancos"
  
        InputFieldDTInicioAComponent={InputField}
        labelInputDTInicioA={"Data Depósito Início"}
        onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}
        valueInputFieldDTInicioA={dataPesquisaInicio}

        InputFieldDTFimAComponent={InputField}
        labelInputDTFimA={"Data Depósito Fim"}
        onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}
        valueInputFieldDTFimA={dataPesquisaFim}

        InputFieldDTInicioBComponent={InputField}
        labelInputDTInicioB={"Data Compensação Início"}
        valueInputFieldDTInicioB={dataPesquisaInicioB}
        onChangeInputFieldDTInicioB={(e) => setDataPesquisaInicioB(e.target.value)}

        InputFieldDTFimBComponent={InputField}
        labelInputDTFimB={"Data Compensação Fim"}
        onChangeInputFieldDTFimB={(e) => setDataPesquisaFimB(e.target.value)}
        valueInputFieldDTFimB={dataPesquisaFimB}

        InputFieldDTInicioCComponent={InputField}
        labelInputDTInicioC={"Data Movimento Início"}
        onChangeInputFieldDTInicioC={(e) => setDataPesquisaInicioC(e.target.value)}
        valueInputFieldDTInicioC={dataPesquisaInicioC}

        InputFieldDTFimCComponent={InputField}
        labelInputDTFimC={"Data Movimento Fim"}
        onChangeInputFieldDTFimC={(e) => setDataPesquisaFimC(e.target.value)}
        valueInputFieldDTFimC={dataPesquisaFimC}
        

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Conta Banco"}
        optionsEmpresas={[
          { value: '', label: 'Selecione uma conta' },
          ...dadosContaBanco.map((item) => ({
            value: item.IDCONTABANCO,
            label: `${item.IDCONTABANCO} - ${item.DSCONTABANCO}`
          }))
        ]}
        valueSelectEmpresa={contaSelecionada}
        onChangeSelectEmpresa={onChangeSelectConta}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Depósito"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Consolidado"}
        corCancelar={"info"}
        IconCancelar={AiOutlineSearch}
        onButtonClickCancelar={handleClickConsolidado}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Compensação"}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}
        onButtonClickCadastro={handleClickCompensacao}

      />

      {tabelaVisivel && (
        <ActionListaConciliacaoBancoDTW dadosConciliarBanco={dadosConciliarBanco} contaSelecionada={contaSelecionada} />
      )}
      {tabelaVisivelCompensacao && (
        <ActionListaCompensacaoBancoDTW dadosConciliarBanco={dadosConciliarBanco} contaSelecionada={contaSelecionada} />
      )}
   
      {tabelaVisivelConsolidado && (
        <ActionListaConsolidadoBancoDTW   dadosConciliarBancoConsolidado={dadosConciliarBancoConsolidado}/>

      )}
    </Fragment>
  )
}
