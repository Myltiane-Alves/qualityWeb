import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonSearch } from "../../../Buttons/ButtonSearch";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasLoja } from "./actionListaVendasLoja";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import Swal from 'sweetalert2';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData } from "../../../../hooks/useFetchData";

export const ActionPesquisaVendasLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(1000);
  const navigate = useNavigate();

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, []);


  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');
    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const { data: optionsEmpresas = [] } = useFetchData('listaEmpresasIformatica', '/listaEmpresasIformatica');


  
  const fetchListaVendasLojaPeriodo = async () => {
    try {
      const urlApi = `vendaLojaPeriodo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  


  // const fetchListaVendasLojaPeriodo = async () => {
  //   try {
  //     const urlApi = `venda-periodo-loja?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&pageSize=${pageSize}&page=${currentPage}`;
  //     const response = await get(urlApi);
  
  //     // Calcular o total de páginas com base no total de itens
  //     const totalItems = response.totalCount || 0; // Supondo que a API retorne o total de itens
  //     const totalPages = Math.ceil(totalItems / pageSize);
  
  //     if (response.data.length && response.data.length === pageSize) {
  //       let allData = [...response.data];
  
  //       // Exibe o modal com o total de páginas
  //       const swalInstance = animacaoCarregamento(`Carregando... Página ${currentPage} de ${totalPages}`);
  
  //       async function fetchNextPage(currentPage) {
  //         try {
  //           currentPage++;
  //           const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
  //           if (responseNextPage.data.length) {
  //             allData.push(...responseNextPage.data);
  
  //             // Atualiza a animação com a página atual
  //             document.getElementById('numPagesLoading').textContent = `Página ${currentPage} de ${totalPages}`;
  
  //             return fetchNextPage(currentPage); // Continua para a próxima página
  //           } else {
  //             return allData; // Todas as páginas foram carregadas
  //           }
  //         } catch (error) {
  //           console.error('Erro ao buscar próxima página:', error);
  //           throw error;
  //         }
  //       }
  
  //       await fetchNextPage(currentPage);
  //       Swal.close(); // Fecha o modal após o carregamento completo
  //       return allData;
  //     } else {
  //       return response.data; // Caso haja menos itens que o tamanho da página ou somente uma página
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar dados:', error);
  //     Swal.fire('Erro', `Erro ao carregar vendas: ${error.message}`, 'error');
  //     throw error;
  //   }
  // };
  
  const { data: dadosVendasLoja = [], error: errorVendasLoja, isLoading: isLoadingVendasLoja, refetch } = useQuery(
    ['vendaLojaPeriodo', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVendasLojaPeriodo(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, staleTime: 5 * 60 * 1000, 
    }
  );

  const handleSelectEmpresa = (selectedOption) => {
    setEmpresaSelecionada(selectedOption ? selectedOption.value : '');
  };
  
  const handleClick = () => {
 
      setTabelaVisivel(true);
      setIsLoadingPesquisa(true);
      setCurrentPage(+1); 
      refetch(); 
  
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

  

  // useEffect(() => {
  //   if (isLoadingPesquisa && isLoadingVendasLoja) {
  //     Swal.fire({
  //       title: 'Carregando vendas...',
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
        
  //     });
  //   } else if (isLoadingPesquisa && !isLoadingVendasLoja) {
  //     Swal.close();
  //     setIsLoadingPesquisa(false);
  //   }
  // }, [isLoadingVendasLoja, isLoadingPesquisa]);

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
        subTitle="Nome da Loja"
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
        onChangeSelectEmpresa={handleSelectEmpresa}

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
        <div  style={{ marginTop: '8rem' }}>
          <ActionListaVendasLoja dadosVendasLoja={dadosVendasLoja}  />
          
        </div>
      )}
    </Fragment>
  );
};