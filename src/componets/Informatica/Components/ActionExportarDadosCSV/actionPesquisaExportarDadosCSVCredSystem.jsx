import React, { Fragment, useEffect, useState } from "react"
import { AiOutlineSearch, AiOutlineUpload } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { MdAdd, MdOutlineAttachMoney } from "react-icons/md";
import { FaDownload, FaHandshake } from "react-icons/fa";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendas } from "./actionListaVendasLoja";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import { FcDownload } from "react-icons/fc";

export const ActionPesquisaExportarDadosCSVCredSystem = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState("");
  const [dataPesquisaFim, setDataPesquisaFim] = useState("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicio = getDataAtual();
    const dataFim = getDataAtual();
    setDataPesquisaInicio(dataInicio);
    setDataPesquisaFim(dataFim);
  
  }, []);

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch } = useQuery(
    'listaEmpresasIformatica',
    async () => {
      const response = await get(`/listaEmpresasIformatica`);

      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000
    }
  );

  const fetchListaVendas = async () => {
    try {
      
      const urlApi = `/vendas-loja-informatica?status=False&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
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

  const { data: dadosVendasLoja = [], error: erroVendas, isLoading: isLoadingVendas, refetch: refetchListaVendas } = useQuery(
    'vendas-loja-informatica',
    () => fetchListaVendas(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const fetchListaClientes = async () => {
    try {
      
      const urlApi = `/lista-cliente-credsystem?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquiaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
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

  const { data: dadosListaCliente = [], error: erroCliente, isLoading: isLoadingCliente, refetch: refetchListaClientes } = useQuery(
    'lista-cliente-credsystem',
    () => fetchListaClientes(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const dadosCliente = dadosListaCliente.map((item) => {
    return {
      BAIRRO_RESIDNCL: item.BAIRRO_RESIDNCL,
      CEP_RESIDNCL: item.CEP_RESIDNCL,
      CIDADE_RESIDNCL: item.CIDADE_RESIDNCL,
      COD_LOJA_PRC_CRD: item.COD_LOJA_PRC_CRD,
      COMPL_RESIDNCL: item.COMPL_RESIDNCL,
      CPF_CLIENTE: item.CPF_CLIENTE,
      DDD_CELULAR: item.DDD_CELULAR,
      DDD_CMRCL: item.DDD_CMRCL,
      DDD_RESIDNCL: item.DDD_RESIDNCL,
      DT_ALTERACAO: item.DT_ALTERACAO,
      DT_CADASTRO: item.DT_CADASTRO,
      DT_INCLUSAO_DW: item.DT_INCLUSAO_DW,
      DT_NASCIMENTO: item.DT_NASCIMENTO,
      EMAIL_CLI_CMRCL: item.EMAIL_CLI_CMRCL,
      EMAIL_CLI_PRTCLR: item.EMAIL_CLI_PRTCLR,
      END_RESIDNCL: item.END_RESIDNCL,
      NOME_CLIENTE: item.NOME_CLIENTE,
      NOME_EMP_FIELDD: item.NOME_EMP_FIELDD,
      NOME_MAE: item.NOME_MAE,
      NOME_PARC_CRED: item.NOME_PARC_CRED,
      NUM_CELULAR: item.NUM_CELULAR,
      NUM_CMRCL: item.NUM_CMRCL,
      NUM_RESIDNCL: item.NUM_RESIDNCL,
      NUM_TEL_RESIDNCL: item.NUM_TEL_RESIDNCL,
      RESIDNCL: item.RESIDNCL,
      SEXO_CLIENTE: item.SEXO_CLIENTE,
      TP_END_RESIDNCL: item.TP_END_RESIDNCL
    }
  })

  const exportToExcelCliente = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosCliente);
    const workbook = XLSX.utils.book_new();
    const header = [
      'BAIRRO_RESIDNCL',
      'CEP_RESIDNCL',
      'CIDADE_RESIDNCL',
      'COD_LOJA_PRC_CRD',
      'COMPL_RESIDNCL',
      'CPF_CLIENTE',
      'DDD_CELULAR',
      'DDD_CMRCL',
      'DDD_RESIDNCL',
      'DT_ALTERACAO',
      'DT_CADASTRO',
      'DT_INCLUSAO_DW',
      'DT_NASCIMENTO',
      'EMAIL_CLI_CMRCL',
      'EMAIL_CLI_PRTCLR',
      'END_RESIDNCL',
      'NOME_CLIENTE',
      'NOME_EMP_FIELDD',
      'NOME_MAE',
      'NOME_PARC_CRED',
      'NUM_CELULAR',
      'NUM_CMRCL',
      'NUM_RESIDNCL',
      'NUM_TEL_RESIDNCL',
      'RESIDNCL',
      'SEXO_CLIENTE',
      'TP_END_RESIDNCL'
    ];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'BAIRRO_RESIDNCL' },
      { wpx: 100, caption: 'CEP_RESIDNCL' },
      { wpx: 200, caption: 'CIDADE_RESIDNCL' },
      { wpx: 100, caption: 'COD_LOJA_PRC_CRD' },
      { wpx: 100, caption: 'COMPL_RESIDNCL' },
      { wpx: 100, caption: 'CPF_CLIENTE' },
      { wpx: 100, caption: 'DDD_CELULAR' },
      { wpx: 100, caption: 'DDD_CMRCL' },
      { wpx: 100, caption: 'DDD_RESIDNCL' },
      { wpx: 100, caption: 'DT_ALTERACAO' },
      { wpx: 100, caption: 'DT_CADASTRO' },
      { wpx: 100, caption: 'DT_INCLUSAO_DW' },
      { wpx: 150, caption: 'DT_NASCIMENTO' },
      { wpx: 200, caption: 'EMAIL_CLI_CMRCL' },
      { wpx: 200, caption: 'EMAIL_CLI_PRTCLR' },
      { wpx: 200, caption: 'END_RESIDNCL' },
      { wpx: 300, caption: 'NOME_CLIENTE' },
      { wpx: 250, caption: 'NOME_EMP_FIELDD' },
      { wpx: 200, caption: 'NOME_MAE' },
      { wpx: 100, caption: 'NOME_PARC_CRED' },
      { wpx: 100, caption: 'NUM_CELULAR' },
      { wpx: 100, caption: 'NUM_CMRCL' },
      { wpx: 100, caption: 'NUM_RESIDNCL' },
      { wpx: 100, caption: 'NUM_TEL_RESIDNCL' },
      { wpx: 100, caption: 'RESIDNCL' },
      { wpx: 100, caption: 'SEXO_CLIENTE' },
      { wpx: 100, caption: 'TP_END_RESIDNCL' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista Cliente CredSystem');
    XLSX.writeFile(workbook, 'lista_cliente_credSystem.xlsx');
  };


  const fetchListaPagamentos = async () => {
    try {
      
      const urlApi = `/lista-meio-pagamento-credsystem?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquiaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
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

  const { data: dadosListaPagamentos = [], error: erroPagamentos, isLoading: isLoadingPagamentos, refetch: refetchListaPagamentos } = useQuery(
    'lista-meio-pagamento-credsystem',
    () => fetchListaPagamentos(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const dadosPagamentos = dadosListaPagamentos.map((item) => {
      return {
        COD_CUPOM: item.COD_CUPOM,
        COD_LOJA_PRC_CRD: item.COD_LOJA_PRC_CRD,
        CPF_CLIENTE: item.CPF_CLIENTE,
        DT_COMPRA: item.DT_COMPRA,
        DT_INCLUSAO_DW: item.DT_INCLUSAO_DW,
        NOME_EMP_FIDELDD: item.NOME_EMP_FIDELDD,
        NOME_PARC_CRED: item.NOME_PARC_CRED,
        TP_PAGTO: item.TP_PAGTO,
        VL_COMPRA: item.VL_COMPRA
      }
  });

  const exportToExcelPagamento = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosPagamentos);
    const workbook = XLSX.utils.book_new();
    const header = [
      'COD_CUPOM',
      'COD_LOJA_PRC_CRD',
      'CPF_CLIENTE',
      'DT_COMPRA',
      'DT_INCLUSAO_DW',
      'NOME_EMP_FIDELDD',
      'NOME_PARC_CRED',
      'TP_PAGTO',
      'VL_COMPRA'
    ];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'COD_CUPOM' },
      { wpx: 150, caption: 'COD_LOJA_PRC_CRD' },
      { wpx: 100, caption: 'CPF_CLIENTE' },
      { wpx: 200, caption: 'DT_COMPRA' },
      { wpx: 200, caption: 'DT_INCLUSAO_DW' },
      { wpx: 200, caption: 'NOME_EMP_FIDELDD' },
      { wpx: 200, caption: 'NOME_PARC_CRED' },
      { wpx: 100, caption: 'TP_PAGTO' },
      { wpx: 100, caption: 'VL_COMPRA' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Meio Pagamento CredSystem');
    XLSX.writeFile(workbook, 'lista_meio_pagamento_credSystem.xlsx');
  };

  const fetchListaParceria = async () => {
    try {
      
      const urlApi = `/lista-parceria-credsystem?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
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

  const { data: dadosListaParceria = [], error: erroParceria, isLoading: isLoadingParceria, refetch: refetchListaParceria } = useQuery(
    'lista-parceria-credsystem',
    () => fetchListaParceria(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const dadosParceria = dadosListaParceria.map((item) => {
    return {
      ADMINISTRADORA: item.ADMINISTRADORA,
      AVC: item.AVC,
      DESCRICAO_COR: item.DESCRICAO_COR,
      DESC_COLECAO: item.DESC_COLECAO,
      DT_COMPRA: item.DT_COMPRA,
      GRUPO_PRODUTO: item.GRUPO_PRODUTO,
      KALLANCARD: item.KALLANCARD,
      LINHA: item.LINHA,
      MARCA: item.MARCA,
      NSU: item.NSU,
      PRODUTO: item.PRODUTO,
      QUANTIDADE: item.QUANTIDADE,
      SUBGRUPO_PRODUTO: item.SUBGRUPO_PRODUTO,
      TOTAL_VENDA:  item.TOTAL_VENDA,
      VALOR_UNITARIO: item.VALOR_UNITARIO,
      XPROD: item.XPROD
    }
  });

  const exportToExcelParceria = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosParceria);
    const workbook = XLSX.utils.book_new();
    const header = [
      'ADMINISTRADORA',
      'AVC',
      'DESCRICAO_COR',
      'DESC_COLECAO',
      'DT_COMPRA',
      'GRUPO_PRODUTO',
      'KALLANCARD',
      'LINHA',
      'MARCA',
      'NSU',
      'PRODUTO',
      'QUANTIDADE',
      'SUBGRUPO_PRODUTO',
      'TOTAL_VENDA',
      'VALOR_UNITARIO',
      'XPROD'
    ];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'ADMINISTRADORA' },
      { wpx: 100, caption: 'AVC' },
      { wpx: 100, caption: 'DESCRICAO_COR' },
      { wpx: 100, caption: 'DESC_COLECAO' },
      { wpx: 100, caption: 'DT_COMPRA' },
      { wpx: 100, caption: 'GRUPO_PRODUTO' },
      { wpx: 100, caption: 'KALLANCARD' },
      { wpx: 100, caption: 'LINHA' },
      { wpx: 100, caption: 'MARCA' },
      { wpx: 100, caption: 'NSU' },
      { wpx: 100, caption: 'PRODUTO' },
      { wpx: 100, caption: 'QUANTIDADE' },
      { wpx: 100, caption: 'SUBGRUPO_PRODUTO' },
      { wpx: 100, caption: 'TOTAL_VENDA' },
      { wpx: 100, caption: 'VALOR_UNITARIO' },
      { wpx: 100, caption: 'XPROD' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Parceria CredSystem');
    XLSX.writeFile(workbook, 'parceria_credSystem.xlsx');
  };

  
  const handleChangeEmpresa = (e) => {
    const selectedEmpresa = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(selectedEmpresa.NOFANTASIA);
    setEmpresaSelecionada(e.value);
  }

  const handleClick = () => {
    setCurrentPage(+1);
    refetchListaVendas(empresaSelecionada)
    setTabelaVisivel(true);
  }

  const handleClickCadastro = async () => {
    setCurrentPage((prevPage) => prevPage + 1);

    const clientes = await refetchListaClientes();

    if(clientes.data.length) {
      exportToExcelCliente(clientes.data);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Não há dados para o periodo selecionado! Tente novamente',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  const handleClickPagamento = async () => {
    setCurrentPage((prevPage) => prevPage + 1);

    const pagamentos = await refetchListaPagamentos();

    if(pagamentos.data.length) {
      exportToExcelPagamento(pagamentos.data);
   
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Não há dados para o periodo selecionado! Tente novamente',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  const handleClickParceria = async () => {
    setCurrentPage((prevPage) => prevPage + 1);

    const parceria = await refetchListaParceria();

    if(parceria.data.length) {
      exportToExcelParceria(parceria.data);

    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        text: 'Não há dados para o periodo selecionado! Tente novamente',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Exportar Dados"]}
        title="Exportar Dados para CSV"
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
          {value: '', label: 'Selecione a Empresa'},
          ...optionsEmpresas.map((item) => ({
            value: item.IDEMPRESA,
            label: item.NOFANTASIA
          }))
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        onButtonClickCadastro={handleClickCadastro}
        linkNome={"Cadastro Clientes"}
        corCadastro={"success"}
        IconCadastro={FaDownload}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Meio Pagamento"}
        onButtonClickCancelar={handleClickPagamento}
        corCancelar={"danger"}
        IconCancelar={FaDownload}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"Parceria"}
        onButtonClickVendasEstrutura={handleClickParceria}
        corVendasEstrutura={"info"}
        iconVendasEstrutura={FaDownload}

      />

      {tabelaVisivel && (
        <ActionListaVendas dadosVendasLoja={dadosVendasLoja} />
      )}
    </Fragment>
  )
}
