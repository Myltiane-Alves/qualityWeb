import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { ActionListaProdutosSap } from "./actionListaProdutosSap";
import { ActionListaProdutosQuality } from "./actionListaProdutosQuality";
import { AiOutlineSearch } from "react-icons/ai";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaProdutosPreco = () => {
  const [tabelaSapVisivel, setTabelaSapVisivel] = useState(false);
  const [tabelaQualityVisivel, setTabelaQualityVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [codBarra, setCodBarra] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useQuery(
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
  }, [marcaSelecionada, refetchEmpresas]); 


  const fetchProdutoSap = async () => {
    try {
      
      const urlApi = `/produto-preco?idEmpresa=${empresaSelecionada}&descricaoProduto=${codBarra}`;
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

  const { data: dadosProdutosSap = [], error: erroQuebra, isLoading: isLoadingQuebra, refetch: refetchProdutoSap } = useQuery(
    'produto-preco',
    () => fetchProdutoSap(empresaSelecionada, codBarra, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const fetchProdutosQuality = async () => {
    try {
      
      const urlApi = `/produtoQuality?descricaoProduto=${codBarra}&idEmpresa=${empresaSelecionada}`;
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

  const { data: dadosProdutosQuality = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchProdutosQuality } = useQuery(
    'produtoQuality',
    () => fetchProdutosQuality(codBarra, empresaSelecionada, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const handleChangeEmpresa = (e) => {
    const selectedEmpresa = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(selectedEmpresa.NOFANTASIA);
    setEmpresaSelecionada(e.value);
  }


  const handleSelectMarcas = (e) => {
    setMarcaSelecionada(e.value);   
  }

  const handleInputChange = (e) => {
    setCodBarra(e.target.value)
  }

  const handleClickSap = () => {
    if(empresaSelecionada === '') {
      alert('Selecione uma Marca e uma Empresa')
    } else {

      refetchProdutoSap(empresaSelecionada)
      setTabelaSapVisivel(true);
      setTabelaQualityVisivel(false);
    }
  }

  const handleClickQuality = () => {
    if(empresaSelecionada === '') {
      alert('Selecione uma Marca e uma Empresa')
    } else {
      refetchProdutosQuality(empresaSelecionada)
      setTabelaQualityVisivel(true);
      setTabelaSapVisivel(false);
    }
  }

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Produtos - Preços "]}
        title="Produtos - Preços Informática"
        subTitle={empresaSelecionadaNome}

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
        onChangeSelectEmpresa={handleChangeEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={[
          { value: '', label: 'Selecione uma Marca' },          
          ...optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarcas}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Código de Barras / Nome Produto"}
        onChangeInputFieldCodBarra={handleInputChange}
        valueInputFieldCodBarra={codBarra}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Produtos / Preços Quality"}
        onButtonClickSearch={handleClickQuality}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Produtos / Preços SAP"}
        onButtonClickCadastro={handleClickSap}
        corCadastro={"info"}
        IconCadastro={AiOutlineSearch}
      />



      {tabelaQualityVisivel && (
        <ActionListaProdutosQuality dadosProdutosQuality={dadosProdutosQuality} />
      )}

      {tabelaSapVisivel && (
        <ActionListaProdutosSap dadosProdutosSap={dadosProdutosSap} />
      )}
    </Fragment>
  )
}
