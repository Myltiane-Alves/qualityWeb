import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionListaQuebraCaixaLoja } from "./actionListaQuebraCaixaLoja";
import { ActionListaQuebraCaixaLojaNegativa } from "./actionListaQuebraCaixaLojaNegativa";
import { ActionListaQuebraCaixaLojaPositiva } from "./actionListaQuebraCaixaLojaPositiva";
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData";

export const ActionPesquisaQuebraCaixaLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelPositiva, setTabelaVisivelPositiva] = useState(false);
  const [tabelaVisivelNegativa, setTabelaVisivelNegativa] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [quebraSelecionada, setQuebraSelecionada] = useState('')
  const [cpfOperadorQuebra, setCpfOperadorQuebra] = useState('');
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, []);

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);

  const fetchQuebra = async () => {
   
    
    try {
      const urlApi = `/quebra-caixa-loja?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&cpfOperadorQuebra=${cpfOperadorQuebra}&stQuebraPositivaNegativa=${quebraSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }

  const { data: dadosQuebraDeCaixa = [], error: erroQuebra, isLoading: isLoadingQuebra, refetch: refetchQuebra } = useQuery(
    'quebra-caixa-loja',
    () => fetchQuebra(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, marcaSelecionada, cpfOperadorQuebra, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const  getListaQuebraDeCaixaPositiva = async () => {
 
    try {
      const urlApi = `/quebra-caixa-loja?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&cpfOperadorQuebra=${cpfOperadorQuebra}&stQuebraPositivaNegativa=${quebraSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }
  
  const {data: dadosQuebraDeCaixaPositiva = [], error: erroQuebraPositiva, isLoading: isLoadingQuebraPositiva, refetch: refetchQuebraPositiva} = useQuery(
    'quebra-caixa-loja-Positiva',
    () => getListaQuebraDeCaixaPositiva(marcaSelecionada, empresaSelecionada,  cpfOperadorQuebra, quebraSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  )


  const getListaQuebraDeCaixaNegativa = async () => {

    try {
      const urlApi = `/quebra-caixa-loja?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&cpfOperadorQuebra=${cpfOperadorQuebra}&stQuebraPositivaNegativa=${quebraSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  }

  const {data: dadosQuebraDeCaixaNegativa = [], error: erroQuebraNegativa, isLoading: isLoadingQuebraNegativa, refetch: refetchQuebraNegativa} = useQuery(
    'lista-Quebra-Caixa-Negativa',
    () => getListaQuebraDeCaixaNegativa(marcaSelecionada, empresaSelecionada,  cpfOperadorQuebra, quebraSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  )

  const selectQuebraDeCaixa = (e) => {
    setQuebraSelecionada(e.value)
  }

  const handleChangeEmpresa = (e) => {
    const selectedEmpresa = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(selectedEmpresa.NOFANTASIA);
    setEmpresaSelecionada(e.value);
  }

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value)
  }

  const handleClick = async () => {
    setClickContador(prevContador => prevContador + 1);
    if (quebraSelecionada === "1") {
      setTabelaVisivelPositiva(true)
      setTabelaVisivelNegativa(false)
      setTabelaVisivel(false)
      await refetchQuebraPositiva(quebraSelecionada);

    } else if (quebraSelecionada === "2") {
      setTabelaVisivelNegativa(true)
      setTabelaVisivelPositiva(false)
      setTabelaVisivel(false)

      await refetchQuebraNegativa(quebraSelecionada);

    } else if (quebraSelecionada === "0") {
      setTabelaVisivel(true)
      setTabelaVisivelNegativa(false)
      setTabelaVisivelPositiva(false)
      await refetchQuebra(quebraSelecionada);

    }

  };


  const optionsQuebraDeCaixa = [
    {
      value: "0",
      label: 'Todas'
    },
    {
      value: "1",
      label: 'Positiva'
    },
    {
      value: "2",
      label: 'Negativa'
    },
  ]

  const optionsUF = [
    {
      value: "0",
      label: 'Todos'
    },
    {
      value: "DF",
      label: 'DF'
    },
    {
      value: "GO",
      label: 'GO'
    },
  ]

  return (

    <Fragment>


      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Quebra de Caixas "]}
        title="Quebra de Caixas das Lojas -"
        subTitle={empresaSelecionadaNome}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputFieldComponent={InputField}
        labelInputField={"CPF Operador"}
        placeHolderInputFieldComponent={"CPF Operador"}
        valueInputField={cpfOperadorQuebra}
        onChangeInputField={(e) => setCpfOperadorQuebra(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          // { value: 0, label: 'Selecione uma loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}
        onChangeSelectEmpresa={handleChangeEmpresa}
        valueSelectEmpresa={empresaSelecionada}


        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          { value: 0, label: 'Selecione uma loja' },
          ...optionsMarcas.map((marca) => ({
            value: marca.IDGRUPOEMPRESARIAL,
            label: marca.GRUPOEMPRESARIAL
          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        InputSelectQuebraComponent={InputSelectAction}
        labelSelectQuebra={"Quebra"}
        optionsQuebra={[

          ...optionsQuebraDeCaixa.map((empresa) => ({
            value: empresa.value,
            label: empresa.label,
          }))
        ]}
        valueSelectQuebra={quebraSelecionada}
        onChangeSelectQuebra={selectQuebraDeCaixa}

        InputSelectUFComponent={InputSelectAction}
        labelSelectUF={"UF"}
        optionsSelectUF={optionsUF.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        valueSelectUF={ufSelecionado[0]}
        onChangeSelectUF={(e) => setUfSelecionado(e.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />


      {tabelaVisivel && (
        <ActionListaQuebraCaixaLoja dadosQuebraDeCaixa={dadosQuebraDeCaixa} />
      )}


      <div>
        {tabelaVisivelNegativa && (

          <ActionListaQuebraCaixaLojaNegativa dadosQuebraDeCaixaNegativa={dadosQuebraDeCaixaNegativa} />
        )}
      </div>
      <div>
        {tabelaVisivelPositiva && (

          <ActionListaQuebraCaixaLojaPositiva dadosQuebraDeCaixaPositiva={dadosQuebraDeCaixaPositiva} />
        )}
      </div>
    </Fragment>
  )
}

