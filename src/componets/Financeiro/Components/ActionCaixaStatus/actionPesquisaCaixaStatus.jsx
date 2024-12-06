import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { get } from "../../../../api/funcRequest"
import { getDataAtual } from "../../../../utils/dataAtual"
import { ActionListaCaixaZerado } from "./actionListaCaixaZerado"
import { ActionListaCaixaStatus } from "./actionListaCaixaStatus"
import { AiOutlineSearch } from "react-icons/ai"
import { useQuery } from 'react-query';
import Swal from 'sweetalert2'
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"

export const ActionPesquisaCaixaStatus = () => {
  const [tabelaCaixaStatus, setTabelaCaixaStatus] = useState(false);
  const [tabelaCaixaZerado, setTabelaCaixaZerado] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [page, setPage] = useState(+1)

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, [])

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);

  const fetchCaixaStatus = async () => {
    try {

      const urlApi = `/lista-caixas-status?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosCaixaStatus = [], error: errorCaixaStatus, isLoading: isLoadingCaixaStatus, refetch: refetchCaixaStatus } = useQuery(
    ['lista-caixas-status', marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, page, pageSize],
    () => fetchCaixaStatus(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, page, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const fetchCaixaZerado = async () => {
    try {

      const urlApi = `lista-caixas-zerados?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosCaixaZerados = [], error: errorCaixaZerado, isLoading: isLoadingCaixaZerado, refetch: refetchCaixaZerado } = useQuery(
    ['lista-caixas-zerados', marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchCaixaZerado(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );



  const handleSelectEmpresa = (e) => {
    const selectId = e.value
    if (selectId) {
      setEmpresaSelecionada(selectId)
    }
  }

  const handleSelectMarca = (e) => {
    const selectId = e.value
    if (selectId) {
      setMarcaSelecionada(selectId)
    }
  }

  const handleClick = () => {
    if (marcaSelecionada) {
      setTabelaCaixaStatus(true)
      setTabelaCaixaZerado(false)
      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refetchCaixaStatus()
    } else {
      Swal.fire('Erro', 'Por favor, Verifique os Campos', 'error');
    }
  }

  const handleClickPesqCaixaStatus = () => {


    if (marcaSelecionada) {
      setTabelaCaixaZerado(true)
      setTabelaCaixaStatus(false)
      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refetchCaixaZerado()

    } else {
      Swal.fire('Erro', 'Por favor, Verifique os Campos', 'error');
    }
  }


  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Status Caixa por Loja e Período"]}
        title="Status Caixa por Loja e Período"
        subTitle="Nome da Loja"
        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}

        optionsEmpresas={[
          { value: '0', label: 'Selecione uma loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          // { value: '', label: 'Selecione uma loja' },
          ...optionsMarcas.map((marca) => ({
            value: marca.IDGRUPOEMPRESARIAL,
            label: marca.GRUPOEMPRESARIAL
          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeBalanco={ButtonType}
        linkNomeBalanco={"Pesquisar Caixas Zerados"}
        onButtonClickTypeBalanco={handleClickPesqCaixaStatus}

      />

      {tabelaCaixaStatus && (
        <ActionListaCaixaStatus dadosCaixaStatus={dadosCaixaStatus} />
      )}
      {tabelaCaixaZerado && (
        <ActionListaCaixaZerado dadosCaixaZerados={dadosCaixaZerados} />
      )}
    </Fragment>
  )
}

