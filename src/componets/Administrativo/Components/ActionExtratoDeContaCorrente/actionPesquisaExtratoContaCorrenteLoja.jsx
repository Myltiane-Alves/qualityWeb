import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { getDataAtual } from "../../../../utils/dataAtual"
import { AiOutlineSearch } from "react-icons/ai"
import { get } from "../../../../api/funcRequest"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaExtratoContaCorrenteLoja } from "./actionListaExtratoContaCorrenteLoja"
import { useFetchData } from "../../../../hooks/useFetchData"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useQuery } from "react-query"

export const ActionPesquisaExtratoContaCorenteLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, [])
  
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('listaEmpresasIformatica', '/listaEmpresasIformatica');

  const fetchListaExtrato = async () => {
    try {
      
      const urlApi = `/listaExtratoDaLojaPeriodo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
   
  const { data: dadosExtratoLojaPeriodo = [], error: errorExtrato, isLoading: isLoadingExtrato, refetch: refetchListaExtrato } = useQuery(
    ['listaExtratoDaLojaPeriodo', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaExtrato(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(empresaSelecionada), 
    }
  );


  const handleSelectEmpresa = (e) => {
    const empresa = optionsEmpresas.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  };

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaExtrato()
    setTabelaVisivel(true)
    
  }

  return (
    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Extrato de Contas Correntes das Lojas"]}
        title="Extrato de Contas Correntes das Lojas"
        subTitle={empresaSelecionadaNome}
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Empresa"}
        optionsEmpresas={[
          { value: '', label: 'Todas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,

          }))
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel && (
        <div className="card " style={{marginTop: '6rem'}}>
         <ActionListaExtratoContaCorrenteLoja dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} />
        </div>
      )}
    </Fragment>
  )
}