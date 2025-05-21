import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { get } from "../../../../api/funcRequest"
import { getDataAtual } from "../../../../utils/dataAtual"
import { ActionListaDescontoVendas } from "./actionListaDescontoVendas"
import { ActionListaDescontoVendasSimplificada } from "./actionListaDescontoVendasSimplificada"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionListaDescontoMotivoVenda } from "./actionListaDescontoMotivoVenda"
import { useQuery } from 'react-query';
import Swal from 'sweetalert2'
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"


export const ActionPesquisaDescontoVendas = () => {
  const [tabelaSimplificada, setTabelaSimplificada] = useState(false);
  const [tabelaDetalhada, setTabelaDetalhada] = useState(false);
  const [tabelaMotivo, setTabelaMotivo] = useState(false);
  const [descontoSelecionado, setDescontoSelecionado] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, []);

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);

  const fetchDescontoVendas = async () => {
    try {

      const urlApi = `/desconto-vendas?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosDescontoVendas = [], error: errorDescontoVendas, isLoading: isLoadingDescontoVendas, refetch: refetchDescontoVendas } = useQuery(
    ['desconto-vendas', empresaSelecionada, marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchDescontoVendas(empresaSelecionada, marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 5 * 60 * 1000 }
  );
  
  const fetchDescontoVendasSimplificada = async (empresaSelecionada, marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize) => {
    try {

      const urlApi = `/desconto-vendas-simplificado?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosDescontoVendasSimplificado = [], error: errorDescontoVendasSimplificada, isLoading: isLoadingDescontoVendasSimplificada, refetch: refetchDescontoVendasSimplificada } = useQuery(
    ['descontoVendasSimplificado', marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchDescontoVendasSimplificada(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 5 * 60 * 1000 }
  );

  const fetchDescontoMotivoVendas = async () => {
    try {

      const urlApi = `/descontoMotivoVendas?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosDescontoMotivoVendas = [], error: errorDescontoMotivoVendas, isLoading: isLoadingDescontoMotivoVendas, refetch: refetchDescontoMotivoVendas } = useQuery(
    ['descontoMotivoVendas', marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchDescontoMotivoVendas(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 5 * 60 * 1000 }
  );


  const handleSelectEmpresa = (e) => {
    const empresa = optionsEmpresas.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  }

  const handleSelectMarca = (e) => {
    const selectId = e.value
    if (selectId) {
      setMarcaSelecionada(selectId)
    }
  }

  const handleSelectDesconto = (e) => {
    const selectId = e.value
    if (selectId) {
      setDescontoSelecionado(selectId)
    }
  }

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchDescontoVendas()
    setTabelaDetalhada(true)
    setTabelaSimplificada(false)
    setTabelaMotivo(false)
    setIsLoadingPesquisa(true);
  }

  const handleClickPesqSimplificada = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchDescontoVendasSimplificada();
    setTabelaSimplificada(true)
    setTabelaDetalhada(false)
    setTabelaMotivo(false)
  }

  const handleClickPesquisaMotivo = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchDescontoMotivoVendas(); 
    setTabelaMotivo(true)
    setTabelaSimplificada(false)
    setTabelaDetalhada(false)
  }

  const optionsMotivoDesconto = [ 
    { value: '', label: 'Todas'},
    { value: 'Ação Comercial', label: 'Ação Comercial'},
    { value: 'Alçada Gerente', label: 'Alçada Gerente'},
    { value: 'Cartão PL - Ativação Novos', label: 'Cartão PL - Ativação Novos'},
    { value: 'Produtos - Defeitos', label: 'Produtos - Defeitos'},
    { value: 'Produtos - Divergência de Preço', label: 'Produtos - Divergência de Preço'},
    { value: 'Desconto efetuado por Colaborador CPF', label: 'Desconto efetuado por Colaborador CPF'},
    { value: 'Convenio', label: 'Convenio'},
    { value: 'Desconto Funcionario', label: 'Desconto Funcionario'},
    { value: 'Outros', label: 'Outros'},
  ]

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Desconto Vendas por Loja e Período"]}
        title="Desconto Vendas por Loja e Período"
        subTitle={empresaSelecionadaNome}
        
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
        labelSelectMarcas={"Motivo Desconto"}
        optionsMarcas={optionsMotivoDesconto}
        valueSelectMarca={descontoSelecionado}
        onChangeSelectMarcas={handleSelectDesconto}
        
        InputSelectGrupoComponent={InputSelectAction}
        labelSelectGrupo={"Marca"}
        optionsGrupos={[
          ...optionsMarcas.map((marca) => ({
            value: marca.IDGRUPOEMPRESARIAL,
            label: marca.GRUPOEMPRESARIAL
          }))
        ]}
        valueSelectGrupo={marcaSelecionada}
        onChangeSelectGrupo={handleSelectMarca}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisa Detalhada"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Pesquisa Simplificada"}
        onButtonClickCadastro={() => handleClickPesqSimplificada()}
        corCadastro={"warning"}
        IconCadastro={AiOutlineSearch}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Pesquisar por Motivo"}
        onButtonClickCancelar={handleClickPesquisaMotivo}
        corCancelar={"info"}
        IconCancelar={AiOutlineSearch}
      />

      {tabelaDetalhada && (
        <ActionListaDescontoVendas dadosDescontoVendas={dadosDescontoVendas} />
      )}
      {tabelaSimplificada && (
        <ActionListaDescontoVendasSimplificada dadosDescontoVendasSimplificado={dadosDescontoVendasSimplificado} />
      )}

      {tabelaMotivo && (
        <ActionListaDescontoMotivoVenda dadosDescontoMotivoVendas={dadosDescontoMotivoVendas} />
      )}
    </Fragment>
  )
}

