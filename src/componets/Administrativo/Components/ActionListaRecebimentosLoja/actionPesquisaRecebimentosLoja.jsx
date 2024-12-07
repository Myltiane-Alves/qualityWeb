import React, { Fragment, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { getDataAtual } from "../../../../utils/dataAtual"
import { ActionListaRecebimentos } from "./actionListaRecebimentos"
import { ActionListaRecebimentosOperador } from "./actionListaRecebimentosOperador"
import { useQuery } from "react-query"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { MultSelectAction } from "../../../Select/MultSelectAction"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"


export const ActionPesquisaRecebimentosLoja = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState('')
  const [parcelaSelecionada, setParcelaSelecionada] = useState([])
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState([])
  const [tabelaRecebimentos, setTabelaRecebimentos] = useState(false)
  const [tabelaRecebimentosOperador, setTabelaRecebimentosOperador] = useState(false)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(500); 

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
  }, [])

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);
  const {  data: dadosFormaPagamento = [], error: errorFormaPagamentos, isLoading: isLoadingFormaPagamentos, } = useFetchData('forma-pagamentos', '/forma-pagamentos');

  

  const { data: dadosFuncionarios = [], error: errorFuncionarios, isLoading: isLoadingFuncionarios, refetch: refetchFuncionarios } = useQuery(
    'funcionario-recebimento',
    async () => {
      const response = await get(`/funcionario-recebimento?idEmpresa=${empresaSelecionada}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  useEffect(() => {
    if (empresaSelecionada) {
      refetchFuncionarios()
    }
  }, [empresaSelecionada, refetchFuncionarios]);

  const fetchListaRecebimentos = async () => {
    try {
      
      const urlApi = `venda-total-forma-pagamento?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFuncionario=${colaboradorSelecionado}&dsFormaPagamento=${pagamentoSelecionado}&dsParcela=${parcelaSelecionada}&idGrupo=${marcaSelecionada}`;
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
   
  const { data: dadosRecebimentos = [], error: errorRecebimentos, isLoading: isLoadingRecebimentos, refetch: refetchListaRecebimentos } = useQuery(
    ['venda-total-forma-pagamento', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, colaboradorSelecionado, pagamentoSelecionado, parcelaSelecionada, marcaSelecionada, currentPage, pageSize],
    () => fetchListaRecebimentos(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, colaboradorSelecionado, pagamentoSelecionado, parcelaSelecionada, marcaSelecionada, currentPage, pageSize),
    {
      enabled: Boolean(marcaSelecionada, empresaSelecionada), 
    }
  );

  const fetchListaRecebimentosOperador = async () => {
    try {
      
      const urlApi = `venda-total-recebido-periodo-adm?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFuncionario=${colaboradorSelecionado}&dsFormaPagamento=${pagamentoSelecionado}&dsParcela=${parcelaSelecionada}&idGrupo=${marcaSelecionada}`;
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
   
  const { data: dadosRecebimentosOperador = [], error: errorRecebimentosOperador, isLoading: isLoadingRecebimentosOpredador, refetch: refetchListaRecebimentosOperador } = useQuery(
    ['venda-total-recebido-periodo-adm', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, colaboradorSelecionado, pagamentoSelecionado, parcelaSelecionada, marcaSelecionada, currentPage, pageSize],
    () => fetchListaRecebimentosOperador(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, colaboradorSelecionado, pagamentoSelecionado, parcelaSelecionada, marcaSelecionada, currentPage, pageSize),
    {
      enabled: Boolean(marcaSelecionada, empresaSelecionada), 
    }
  );

  const handleSelectEmpresa = (e) => {
    setEmpresaSelecionada(e.value);
  }

  const handleChangePagamento = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setPagamentoSelecionado(values);
  };

  const handleSelectMarca = (e) => {  
    setMarcaSelecionada(e.value);
  };

  const handleSelectParcela = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setParcelaSelecionada(values);
  }

  const handleSelectFuncionario = (e) => {
    setColaboradorSelecionado(e.value);
  }



  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaRecebimentos()
    setTabelaRecebimentos(true)
    setTabelaRecebimentosOperador(false)
  }

  const handleClickPorOperador = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaRecebimentosOperador()
    setTabelaRecebimentosOperador(true)
    setTabelaRecebimentos(false)
  }

  const optionsParcelas = [
    { value: "0", label: "Selecionar Todas" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ]
  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Formas de Pagamento"]}
        title="Formas de Pagamento"
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
          { value: '0', label: 'Selecionar Empresa' },
          ...optionsEmpresas.map((empresa) => {
            return {
              value: empresa.IDEMPRESA,
              label: empresa.NOFANTASIA,

            }
        })]}
        labelSelectEmpresa={"Empresa"}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          { value: '0', label: 'Selecionar Marca' },
            ...optionsMarcas.map((marca) => {
            return {
              
              value: marca.IDGRUPOEMPRESARIAL,
              label: marca.GRUPOEMPRESARIAL,
            }
          })
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        MultSelectMarcaComponent={MultSelectAction}
        labelMultSelectMarca={"Formas de Pagamentos"}
        optionsMultSelectMarca={[
          { value: '', label: 'Selecionar Forma de Pagamento' },
          ...dadosFormaPagamento.map((item) => {
          
          return {
            value: item.DSTIPOPAGAMENTO,
            label: item.DSTIPOPAGAMENTO,
          }
        })
        ]}
        valueMultSelectMarca={pagamentoSelecionado}
        onChangeMultSelectMarca={handleChangePagamento}
      
        InputSelectFuncionarioComponent={InputSelectAction}
        labelSelectFuncionario={"Por Colaborador"}
        optionsFuncionarios={dadosFuncionarios.map((item) => ({
          value: item.IDFUNCIONARIO,
          label: item.NOFUNCIONARIO,
        }))}
        valueSelectFuncionario={colaboradorSelecionado}
        onChangeSelectFuncionario={handleSelectFuncionario}

       

        MultSelectSubGrupoComponent={MultSelectAction}
        labelMultSelectSubGrupo={"Parcelas"}
        optionsMultSelectSubGrupo={optionsParcelas.map((subGrupo) => ({
          value: subGrupo.value,
          label: subGrupo.label,
        }))}
        valueMultSelectSubGrupo={pagamentoSelecionado}
        onChangeMultSelectSubGrupo={handleSelectParcela}
        


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Por Pagamentos"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        onButtonClickCadastro={handleClickPorOperador}
        linkNome={"Por Operador "}
        corCadastro={"info"}
        IconCadastro={AiOutlineSearch}

      />

      {tabelaRecebimentos && (
        <ActionListaRecebimentos dadosRecebimentos={dadosRecebimentos} />
      )}

      {tabelaRecebimentosOperador && (
        <ActionListaRecebimentosOperador dadosRecebimentosOperador={dadosRecebimentosOperador} />
      )}
    </Fragment>
  )
}
