import { Fragment, useEffect, useState } from "react"
import { InputField } from "../../../Buttons/Input"
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { AiOutlineSearch } from "react-icons/ai"
import { getDataAtual } from "../../../../utils/dataAtual"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaVendasDigital } from "./actionListaVendasDigital"
import { ActionListaVendasResumidaDigital } from "./actionListaVendasResumidaDigital"
import { useQuery } from 'react-query';
import { useFetchData } from "../../../../hooks/useFetchData"


export const ActionPesquisaVendasDigital = () => {
  const [tabelaResumidoVisivel, setTabelaResumidoVisivel] = useState(false);
  const [tabelaDetalhadoVisivel, setTabelaDetalhadoVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(500)
  const [isQueryData, setIsQueryData] = useState(false)
  
  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, [])

  const { data: optionsEmpresas = [] } = useFetchData('listaEmpresasIformatica', '/listaEmpresasIformatica');

  const refetchVendasDetalhadas = async () => {
    try {
      const urlApi = `/venda-digital?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
  
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        
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
    }
  };
  
  const { data: dadosVendasDetalhadas = [], error: errorVendasDetalhada, isLoading: isLoadingVendasDetalhada, refetch: refetchVendaDetalhada } = useQuery(
    ['venda-digital', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => refetchVendasDetalhadas(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: Boolean(isQueryData), staleTime: 5 * 60 * 1000 }
  );
 
  const handleChangeEmpresa = (e) => {
    const empresa = optionsEmpresas.find((item) => item.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  }

  const handleClickResumido = () => {
    setTabelaResumidoVisivel(true)
    setTabelaDetalhadoVisivel(false)    
  }

  const handleClickDetalhado = () => {
    setTabelaDetalhadoVisivel(true)
    setTabelaResumidoVisivel(false)
    setCurrentPage(prevPage => prevPage + 1); 
    setIsQueryData(true)
    refetchVendaDetalhada()
    
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas Digital"]}
        title="Vendas Digitais e Período"
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
        optionsEmpresas={[

          { value: '', label: 'Selecione uma Loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Loja"}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Detalhado"}
        onButtonClickSearch={handleClickDetalhado}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Resumido"}
        onButtonClickCadastro={handleClickResumido}
        corCadastro={"info"}
        IconCadastro={AiOutlineSearch}
      />


      {tabelaDetalhadoVisivel && (
        
        <div className="card" >
          <ActionListaVendasDigital dadosVendasDetalhadas={dadosVendasDetalhadas} />
        </div>
        
      )}

      {tabelaResumidoVisivel && (

        <div className="card" >
          <ActionListaVendasResumidaDigital dadosVendasDetalhadas={dadosVendasDetalhadas} />
        </div>

      )}

    </Fragment>
  )
}
