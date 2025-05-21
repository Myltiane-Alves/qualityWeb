import React, { Fragment, useState, useEffect } from "react"
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionListaVendasVouchers } from "./actionListaVendasVouchers";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaVendasVouchers = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [numeroSerie, setNumeroSerie] = useState('');
  const [numeroNFCE, setNumeroNFCE] = useState('');
  const [cpfNumeroVenda, setCPFNumeroVenda] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)

  }, []);


  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    {enabled: true, staleTime: 5 * 60 * 1000, cacheTime: 30 * 60 * 1000  }
  );
  
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    'listaEmpresaComercial',
    async () => {
      const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
      
      return response.data;
    },
    {enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 30 * 60 * 1000 }
  );

  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);

  const fetchListaVendasVendedor = async ( ) => {
    try {
      
      const urlApi = `/lista-venda-cliente?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&cpfOUidVenda=${cpfNumeroVenda}&nff=${numeroNFCE}&serie=${numeroSerie}&idSubGrupoEmpresarial=${marcaSelecionada}&idEmpresa=${empresaSelecionada}`;    
      const response = await get(urlApi);
   
      if (response.data && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.page}`, true);
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
   

  const { data: dadosVendasClientes = [], error: errorVendasVendedor, isLoading: isLoadingVendasVendedor, refetch: refetchListaVendasVendedor } = useQuery(
    ['lista-venda-cliente', dataPesquisaInicio, dataPesquisaFim, cpfNumeroVenda, numeroNFCE, numeroSerie, marcaSelecionada, empresaSelecionada, currentPage, pageSize],
    () => fetchListaVendasVendedor(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 30 * 60 * 1000 
    }
  )

  const handleSelectGrupo = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleSelectEmpresa = (e) => {
    setEmpresaSelecionada(e.value)
  }

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaVendasVendedor()  
    setTabelaVisivel(true)
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas"]}
        title="Vendas Vouchers"


        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

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
        onChangeSelectMarcas={handleSelectGrupo}

   
        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Lojas"}
        optionsEmpresas={[
          {value: '', label: 'Todas'},
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"CPF/CNPJ ou Nº Venda"}
        placeHolderInputFieldCodBarra={"Digite o CPF/CNPJ ou Nº Venda"}
        onChangeInputFieldCodBarra={(e) => setCPFNumeroVenda(e.target.value)}
        valueInputFieldCodBarra={cpfNumeroVenda}

        InputFieldComponent={InputField}
        labelInputField={"Série"}
        placeHolderInputFieldComponent={"Digite o número de série do voucher"}
        valueInputField={numeroSerie}
        onChangeInputField={(e) => setNumeroSerie(e.target.value)}

        InputFieldNumeroNFComponent={InputField}
        labelInputFieldNumeroNF={"Nº NFCE"}
        placeHolderInputFieldNumeroNF={"Digite o número da NFCE"}
        valueInputFieldNumeroNF={numeroNFCE}
        onChangeInputFieldNumeroNF={(e) => setNumeroNFCE(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      
      <ActionListaVendasVouchers dadosVendasClientes={dadosVendasClientes} />
      
    </Fragment>
  )
}


