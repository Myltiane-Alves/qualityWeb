import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { AiOutlineSearch } from "react-icons/ai"
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaFaturasLoja } from "./actionListaFaturasLoja";
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { useFetchData } from "../../../../hooks/useFetchData"
import { ActionImportacaoArquivo } from "./actionImportacaoArquivo"

export const ActionPesquisaFaturasLoja = ({usuarioLogado, ID}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [actionArquivo, setActionArquivo] = useState(false);
  const [actionMain, setActionMain] = useState(true);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [codigoFatura, setCodigoFatura] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, [])

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('listaEmpresasIformatica', '/listaEmpresasIformatica');

  useEffect(() => {
    if (errorEmpresas) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao buscar empresas!',
      });
    }
  }, [errorEmpresas]);


  const fetchFatura = async () => {
    try {
      
      const urlApi = `/detalhe-faturas?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&codigoFatura=${codigoFatura}`;
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
   
  }
  const {data: dadosDetalheFatura = [], error: erroFatura, isLoading: isLoadingFatura, refetch: refetchFatura} = useQuery(
    'detalhe-faturas',
    () => fetchFatura(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, codigoFatura, currentPage, pageSize ),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const fetchVendaMarcaPeriodo = async () => {
    try {
      const urlApi = `/vendas-marca-periodo?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
   
  }
  const {data: dadosVendaMarcaPeriodo = [], error: erroVendaMarcaPeriodo, isLoading: isLoadingVendaMarcaPeriodo, refetch: refetchVendaMarcaPeriodo} = useQuery(
    'vendas-marca-periodo',
    () => fetchVendaMarcaPeriodo( dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize ),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const handleChangeEmpresa = (e) => {
    const empresa = optionsEmpresas.find((item) => item.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  }


  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage +1); 
    refetchFatura()
    if(empresaSelecionada) {

  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecione uma empresa!',
      });
    }
  }
  const handleClickConciliar = () => {
    if(empresaSelecionada) {

      setCurrentPage(+1); 
      refetchVendaMarcaPeriodo()
      setActionArquivo(true)
      setActionMain(false)
      setTabelaVisivel(false)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecione uma empresa!',
      });
    }
  }


  return (

    <Fragment>
      {actionMain && (

        <ActionMain
          linkComponentAnterior={["Home"]}
          linkComponent={["Lista de Faturas"]}
          title="Faturas por Lojas e Período"
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
            ...optionsEmpresas.map((empresa) => ({
              value: empresa.IDEMPRESA,
              label: empresa.NOFANTASIA,
            }))
          ]}
          valueSelectEmpresa={empresaSelecionada}
          onChangeSelectEmpresa={handleChangeEmpresa}

          InputFieldComponent={InputField}
          labelInputField={"Código Fatura"}
          valueInputField={codigoFatura}
          placeHolderInputFieldComponent={"Código Fatura"}
          onChangeInputField={(e) => setCodigoFatura(e.target.value)}

          ButtonSearchComponent={ButtonType}
          linkNomeSearch={"Pesquisar"}
          onButtonClickSearch={handleClick}
          IconSearch={AiOutlineSearch}
          corSearch={"primary"}

          ButtonTypeCadastro={ButtonType}
          linkNome={"Conciliar"}
          onButtonClickCadastro={handleClickConciliar}
          corCadastro={"info"}
          IconCadastro={AiOutlineSearch}
        />
      )}

      {tabelaVisivel && (

        <div className="card">
          <ActionListaFaturasLoja dadosDetalheFatura={dadosDetalheFatura} optionsModulos={optionsModulos}/>
        </div>
      )}

      {actionArquivo && (
        <ActionImportacaoArquivo dadosVendaMarcaPeriodo={dadosVendaMarcaPeriodo}/>
      )}
   
    </Fragment>
  )
}

