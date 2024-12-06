import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonSearch } from "../../../Buttons/ButtonSearch"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { MultSelectAction } from "../../../Select/MultSelectAction"
import { AiOutlineSearch } from "react-icons/ai"
import { getDataAtual } from "../../../../utils/dataAtual"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { ActionFaturaListaVendasPIXCompensacao } from "./actionListaFaturaVendasPixCompensacao"
import { ActionFaturaListaVendasPIX } from "./actionListaFaturaVendasPix"


export const ActionPesquisaFaturasVendasPixDTW = () => {
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState([]);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [dataCompenscaoInicio, setDataCompensacaoInicio] = useState('');
  const [dataCompenscaoFim, setDataCompensacaoFim] = useState('');
  const [empresaLivre, setEmpresaLivre] = useState('');
  const [tabelaVendasPixVisivel, setTabelaVendasPixVisivel] = useState(false);
  const [tabelaVendasPixCompensacao, setTabelaVendasPixCompensacao] = useState(false);
  const [pixCompensacaoCapa, setPixCompensacaoCapa] = useState(false);
  const [pixCompensacaoCredito, setPixCompensacaoCredito] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(true)


  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
   setDataCompensacaoInicio(dataInicial);
    setDataCompensacaoFim(dataFinal);
  }, [])

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
  
  
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    ['listaEmpresaComercial', marcaSelecionada],
    async () => {
      if (marcaSelecionada) {
        const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
        return response.data;
      } else {
        return [];
      }
    },
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );



  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);


  const fetchListaVendasPix = async () => {
    try {
      const urlApi = `/fatura-pix-empresa?idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLoja=${empresaSelecionada}&listaEmpresas=${empresaLivre}`;
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
  
  
  const { data: dadosFaturaVendasPix = [], error: errorVendasPix, isLoading: isLoadingVendasPix, refetch: refetchVendasPix } = useQuery(
    ['fatura-pix-empresa', marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre],
    () => fetchListaVendasPix(marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );
  
  const fetchListaVendasPixCompensacao = async () => {
    try {
      const urlApi = `/fatura-pix-empresa-compensacao?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataCompInicio=${dataCompenscaoInicio}&dataCompFim=${dataCompenscaoFim}`;
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

  const { data: dadosFaturaVendasPixCompensacao = [], error: errorVendasPixCompensacao, isLoading: isLoadingVendasPixCompenscao, refetch: refetchVendasPixCompensacao } = useQuery(
    ['fatura-pix-empresa-compensacao', marcaSelecionada, dataCompenscaoInicio, dataCompenscaoFim, empresaSelecionada, empresaLivre],
    () => fetchListaVendasPixCompensacao(marcaSelecionada, dataCompenscaoInicio, dataCompenscaoFim, empresaSelecionada, empresaLivre),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const handleSelectMarca = (e) => {
    const selectedId = e.value;
    setMarcaSelecionada(selectedId);
  };

  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  }


  const handleClickVendasPix = () => {
   
    if (marcaSelecionada) {
      setTabelaVendasPixVisivel(true)
      setTabelaVendasPixCompensacao(false)
      setPixCompensacaoCapa(false)
      setPixCompensacaoCredito(false)
      
      setIsLoadingPesquisa(true);
      setCurrentPage(+1); 
      refetchVendasPix()
    }  else {
      Swal.fire('Erro', 'Por favor, selecione uma Marca e datas válidas.', 'error');
    }
  }




  const handleClickVendasPixCompensacao = () => {
    if(marcaSelecionada) {
      setTabelaVendasPixCompensacao(true)
      setTabelaVendasPixVisivel(false)
      setPixCompensacaoCapa(false)
      setPixCompensacaoCredito(false)
      
      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refetchVendasPixCompensacao()
      
    } else {
      Swal.fire('Erro', 'Por favor, selecione uma Marca e datas válidas.', 'error')
    }
  }



  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas e Faturas PIX"]}
        title="Vendas / Faturas PIX por Período"
        subTitle="Nome da Loja"

        InputFieldDTInicioAComponent={InputField}
        labelInputDTInicioA={"Data Início"}
        valueInputFieldDTInicioA={dataPesquisaInicio}
        onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimAComponent={InputField}
        labelInputDTFimA={"Data Fim"}
        valueInputFieldDTFimA={dataPesquisaFim}
        onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}

        InputFieldDTInicioBComponent={InputField}
        labelInputDTInicioB={"Data Compensação"}
        valueInputFieldDTInicioB={dataCompenscaoInicio}
        onChangeInputFieldDTInicioB={(e) => setDataCompensacaoInicio(e.target.value)}
        
        InputFieldDTFimBComponent={InputField}
        labelInputDTFimB={"Data Compensação"}
        valueInputFieldDTFimB={dataCompenscaoFim}
        onChangeInputFieldDTFimB={(e) => setDataCompensacaoFim(e.target.value)}
        
        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Por Marca"}
        optionsMarcas={[
          ...optionsMarcas.map((empresa) => ({
            value: empresa.IDGRUPOEMPRESARIAL,
            label: empresa.DSGRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}


        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: '0', label: 'Selecione uma loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={[empresaSelecionada[0]]}
        onChangeMultSelectEmpresa={handleEmpresaChange}

        InputFieldComponent={InputField}
        labelInputField={"Empresas  Livre"}
        placeHolderInputFieldComponent={"Empresas Livres"}
        valueInputField={empresaLivre}
        onChangeInputField={(e) => setEmpresaLivre(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Faturas PIX "}
        onButtonClickSearch={handleClickVendasPix}
        IconSearch={AiOutlineSearch}
        corSearch={"info"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Compensação"}
        onButtonClickCadastro={handleClickVendasPixCompensacao}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}

      />

      {tabelaVendasPixVisivel && (
        <ActionFaturaListaVendasPIX dadosFaturaVendasPix={dadosFaturaVendasPix} />
      )}

      {tabelaVendasPixCompensacao&& (
        <ActionFaturaListaVendasPIXCompensacao dadosFaturaVendasPixCompensacao={dadosFaturaVendasPixCompensacao}/>
      )}
 
    </Fragment>
  )
}