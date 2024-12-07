import { Fragment, useEffect, useState } from "react"
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionMain } from "../../../Actions/actionMain";
import { get } from "../../../../api/funcRequest";
import { ActionListaVendasVendedor } from "./actionListaVendasVendedor";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData";

export const ActionPesquisaVendasVendedor = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState([])
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [percComissaoSelecionada, setPercComissaoSelecionada] = useState('');
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000); 

  useEffect(() => {
    const dataInicio = getDataAtual()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFim)

  }, [])
  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);


  // const getVendaVendedor = async () => {
  //   try {
  //     dataFormatada(dataPesquisaInicio)
  //     dataFormatada(dataPesquisaFim)
      
  //     const response = await get(`/vendaVendedorAction?idGrupo=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`)
  //     if (response.data) {
  //       setDadosVendasVendedor(response.data)
  //       console.log(response.data, 'get tabelas VendaVendedor')
  //     }
  //     return response.data
  //   } catch (error) {
  //     console.log(error, "não foi possivel pegar os dados da tabela ")
  //   }
  // }

  const fetchListaVendasVendedor = async ( ) => {
    try {
      
      const urlApi = `venda-vendedor-adm?idGrupo=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;    
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
   
  const { data: dadosVendasVendedor = [], error: errorVendasVendedor, isLoading: isLoadingVendasVendedor, refetch: refetchListaVendasVendedor } = useQuery(
    ['venda-vendedor-adm', marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVendasVendedor(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, staleTime: 5 * 60 * 1000,
    }
  );

  const handleSelectComissoes = (e) => {
    setPercComissaoSelecionada(e.value);
  };

  const handleSelectEmpresa = (selectedOptions) => {  
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  }

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleClick = () => {
    refetchListaVendasVendedor()
  }

  const optionsUF = [ 
    { id: 1, value: '0', label: 'Todos' },
    { id: 2, value: 'DF', label: 'DF' },
    { id: 3, value: 'GO', label: 'GO' },
  ]

  const optionComissoes = [
    { id: 1, value: '0', label: 'Nenhum' },
    { id: 2, value: '1', label: '2%' },
    { id: 3, value: '2', label: '4%' },
    { id: 4, value: '3', label: '6%' },
  ]

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas por Vendedor e Período"]}
        title="Vendas por Vendedor e Período"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        // InputSelectEmpresaComponent={InputSelectAction}
        // optionsEmpresas={optionsEmpresas.map((empresa) => ({
        //   value: empresa.IDEMPRESA,
        //   label: empresa.NOFANTASIA,
        // }))}
        // labelSelectEmpresa={"Empresa"}
        // valueSelectEmpresa={empresaSelecionada}
        // onChangeSelectEmpresa={handleSelectEmpresa}

        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: '0', label: 'Selecione uma loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={[empresaSelecionada]}
        onChangeMultSelectEmpresa={handleSelectEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={optionsMarcas.map((marca) => ({
          value: marca.IDGRUPOEMPRESARIAL,
          label: marca.DSGRUPOEMPRESARIAL,
        }))}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        InputSelectUFComponent={InputSelectAction}
        labelSelectUF={"UF"}
        optionsSelectUF={optionsUF.map((empresa) => ({
          value: empresa.value,
          label: empresa.label,
        }))}
        onChangeSelectUF={e => setUfSelecionado(e.value)}
        valueSelectUF={ufSelecionado}

        InputSelectComissoesComponent={InputSelectAction}
        labelSelectComissoes={"% Comissão"}
        optionsComissoes={optionComissoes.map((empresa) => ({
          value: empresa.value,
          label: empresa.label,
        }))}
        valueSelectComissoes={percComissaoSelecionada}
        onChangeSelectComissoes={handleSelectComissoes}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

        
      <ActionListaVendasVendedor dadosVendasVendedor={dadosVendasVendedor} percComissaoSelecionada={percComissaoSelecionada} />

    </Fragment>
  )
}

