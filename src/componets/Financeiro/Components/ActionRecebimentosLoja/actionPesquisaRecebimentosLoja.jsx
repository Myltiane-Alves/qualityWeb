import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonSearch } from "../../../Buttons/ButtonSearch"
import { get } from "../../../../api/funcRequest"
import { getDataAtual } from "../../../../utils/dataAtual"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaRecebimentosLoja } from "./actionListaRecebimentosLoja"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionListaDetalhamento } from "./actionListaDetalhamento"
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { ActionListaDetalhamentoCopia } from "./actionListaDetalhamentoCopia"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { ButtonType } from "../../../Buttons/ButtonType"
import { useFetchData } from "../../../../hooks/useFetchData"


export const ActionPesquisaRecebimentosLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)
  const [totalPages, setTotalPages] = useState(0);

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

  const fetchListaRecebimentosLoja = async () => {
    try {
      
      const urlApi = `/venda-total-recebido-periodo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const {data: dadosListaRecebimentosLoja = [], error: errorListaRecebimentosLoja, isLoading: isLoadingListaRecebimentosLoja, refetch: refetchListaRecebimentosLoja} = useQuery(
    ['venda-total-recebido-periodo', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim],
    () => fetchListaRecebimentosLoja(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim),
    {enabled: false, staleTime: 5 * 60 * 1000}
  );

  
  const fetchListaRecebimentosEletronicos = async () => {
    try {
      
      const urlApi = `venda-recebido-eletronico?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const {data: dadosRecebimentosEletronico = [], error: errorListaRecebimentosEletronicos, isLoading: isLoadingListaRecebimentosEletronicos, refetch: refetchRecebimentosEletronicos} = useQuery(
    ['venda-recebido-eletronico', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim],
    () => fetchListaRecebimentosEletronicos(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim),
    {enabled: false, staleTime: 5 * 60 * 1000}
  );


  const handleEmpresaChange = (selectedOptions) => {
    setEmpresaSelecionada(selectedOptions.value);
  }

  const handleClick = () => {

      setTabelaVisivel(true)


      setIsLoadingPesquisa(true);
      setCurrentPage(+1); 
      refetchListaRecebimentosLoja()
      refetchRecebimentosEletronicos()
    
  }



  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Recebimentos"]}
        title="Recebimentos por Lojas e Período"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: '', label: 'Selecione uma loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleEmpresaChange}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

        <div className="card " style={{marginTop: '8rem'}}>

          <ActionListaRecebimentosLoja 
            dadosRecebimentosEletronico={dadosRecebimentosEletronico}
            dadosListaRecebimentosLoja={dadosListaRecebimentosLoja}
            empresaSelecionada={empresaSelecionada} 
            dataPesquisaInicio={dataPesquisaInicio} 
            dataPesquisaFim={dataPesquisaFim}
          />
               
          {/* <ActionListaDetalhamento dadosListaRecebimentosLoja={dadosListaRecebimentosLoja} /> */}
          <ActionListaDetalhamentoCopia dadosListaRecebimentosLoja={dadosListaRecebimentosLoja} />
        </div>

    </Fragment>
  )
}
