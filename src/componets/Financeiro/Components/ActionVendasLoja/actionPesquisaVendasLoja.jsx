import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasLoja } from "./actionListaVendasLoja";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import Swal from 'sweetalert2';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData } from "../../../../hooks/useFetchData";


export const ActionPesquisaVendasLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [isQueryData, setIsQueryData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(1000);
  

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, []);

  const { data: optionsEmpresas = [] } = useFetchData('empresas', '/empresas');
  
  const fetchListaVendasLojaPeriodo = async () => {
    try {
      const urlApi = `/venda-periodo-loja?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
  };
  
  const { data: dadosVendasLoja = [], error: errorVendasLoja, isLoading: isLoadingVendasLoja, refetch } = useQuery(
    ['venda-periodo-loja', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVendasLojaPeriodo(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(isQueryData), staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 
    }
  );



  const handleChangeEmpresa = (e) => {
    const empresa = optionsEmpresas.find((item) => item.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  }

  
  const handleClick = () => {
    setIsQueryData(true);
    setCurrentPage(prevPage => prevPage + 1); 
    setIsLoadingPesquisa(true);
    refetch(); 
    setTabelaVisivel(true);

    Swal.fire('Erro', 'Por favor, selecione uma empresa e datas válidas.', 'error');
    
  };

  useEffect(() => {
    if (isLoadingPesquisa) {
      if (isLoadingVendasLoja) {
          animacaoCarregamento(`Carregando... Página ${currentPage}`);
      } else {
          fecharAnimacaoCarregamento();
          setIsLoadingPesquisa(false);
      }
    }
}, [isLoadingVendasLoja, isLoadingPesquisa, currentPage]);


  useEffect(() => {
    if (errorVendasLoja) {
      Swal.fire('Erro', `Erro ao carregar vendas: ${errorVendasLoja.message}`, 'error');
      setIsLoadingPesquisa(false);
    }
  }, [errorVendasLoja]);


  return (
    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas"]}
        title="Vendas por Lojas e Período"
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
        optionsEmpresas={[
          { value: '0', label: 'Todas' },
           ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}
        
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Vendas"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Vendas / Recebimentos"}
        onButtonClickModal
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}
      />
      
      {tabelaVisivel && (
        <div >
          <ActionListaVendasLoja dadosVendasLoja={dadosVendasLoja}  />
      
        </div>
      )}
    </Fragment>
  );
};