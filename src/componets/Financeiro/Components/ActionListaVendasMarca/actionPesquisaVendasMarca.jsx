import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonSearch } from "../../../Buttons/ButtonSearch"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { MultSelectAction } from "../../../Select/MultSelectAction"
import { ActionListaVendasPCJ } from "./actionListaVendasPCJ"
import { ActionListaVendasMarcaROB } from "./actionListaVendasMarcaROB"
import { ActionListaVendasMarcaMarckup } from "./actionListaVendasMarcaMarckup"
import { ActionListaVendasMarca } from "./actionListaVendasMarca"
import { ActionListaVendasTicketMedio } from "./actionListaVendasTicketMedio"
import { getDataAtual } from "../../../../utils/dataAtual"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { AiOutlineSearch } from "react-icons/ai"
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"

export const ActionPesquisaVendasMarca = () => {
  const [tabelaFinanceiroActionPesqVendasMarca, setTabelaFinanceiroActionPesqVendasMarca] = useState(false)
  const [tabelaFinanceiroActionPesqVendasMarcaMarckup, setTabelaFinanceiroActionPesqVendasMarcaMarckup] = useState(false)
  const [tabelaFinanceiroVendasPeriodoTicketMedio, setTabelaFinanceiroVendasPeriodoTicketMedio] = useState(false)
  const [tabelaFinanceiroResultadoOperacionalBruto, setTabelaFinanceiroResultadoOperacionalBruto] = useState(false)
  const [tabelaFinanceiroPCJVendas, setTabelaFinanceiroPCJVendas] = useState(false)
  const [clickContador, setClickContador] = useState(0);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [empresaSelecionada, setEmpresaSelecionada] = useState([]);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaLivre, setEmpresaLivre] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [totalPages, setTotalPages] = useState(0);
 
  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, [])

  const { data: optionsMarcas = [] } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [], refetch: refetchEmpresas } = useFetchEmpresas(marcaSelecionada);

  const fetchListaVendasPCJ = async (marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre, currentPage, pageSize) => {
    try {
      // const urlApi = `listaCaixasMovimentoFinanceiro?idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLoja=${empresaSelecionada}&idLojaPesquisa=${empresaLivre}`;
      const urlApi = `lista-caixas-movimento?idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLoja=${empresaSelecionada}&idLojaPesquisa=${empresaLivre}`;
      let allData = [];
      let currentPage = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
        allData = [...allData, ...response.data];

        if (response.data.length < pageSize) {
          hasMoreData = false;
        } else {
          currentPage++;
        }
      }

      setTotalPages(currentPage);
      return allData;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  };

  const { data: dadosVendasPCJ = [], error: errorVendasPCJ, isLoading: isLoadingVendasPCJ, refetch } = useQuery(
    ['lista-caixas-movimento', marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre, currentPage, pageSize],
    () => fetchListaVendasPCJ(marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre, currentPage, pageSize),
    { enabled: false }
  );

  
  const fetchListaVendasMarca = async (marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre) => {
    try {
      const urlApi = `vendaMarcaPeriodoFinanceiro?idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLoja=${empresaSelecionada}&idLojaPesquisa=${empresaLivre}`
      let allData = [];
      let currentPage = 1;
      let hasMoreData = true;

      while(hasMoreData) {
        const response = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
        allData = [...allData, ...response.data];

        if (response.data.length < pageSize) {
          hasMoreData = false;
        } else {
          currentPage++;
        }
      }
      setTotalPages(currentPage);
      return allData;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  }

  const {data: dadosListaVendasMarca = [], error: errorVendasMarca, isLoading: isLoadingVendasMarca, refetch: refetchVendasMarca} = useQuery(
    ['vendaMarcaPeriodoFinanceiro', marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre],
    () => fetchListaVendasMarca(marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre),
    { enabled: false }
  ); 

  const fetchListaVendasMarcaROB = async (marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre) => {
    try {
      const urlApi = `vendaMarcaRob?idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLoja=${empresaSelecionada}&idLojaPesquisa=${empresaLivre}`
      let allData = [];
      let currentPage = 1;
      let hasMoreData = true;

      while(hasMoreData) {
        const response = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
        allData = [...allData, ...response.data];

        if (response.data.length < pageSize) {
          hasMoreData = false;
        } else {
          currentPage++;
        }
      }
      setTotalPages(currentPage);
      return allData;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  }

  const {data: dadosListaVendasMarcaROB = [], error: errorVendasMarcaROB, isLoading: isLoadingVendasMarcaROB, refetch: refetchVendasMarcaROB} = useQuery(
    ['vendaMarcaRob', marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre],
    () => fetchListaVendasMarcaROB(marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre),
    { enabled: false }
  );

  const fetchListaVendasMarcaMarckup = async (marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre) => {
    try {
      const urlApi = `vendaMarcaMarckup?idMarca=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLoja=${empresaSelecionada}&idLojaPesquisa=${empresaLivre}`
      let allData = [];
      let currentPage = 1;
      let hasMoreData = true;

      while(hasMoreData) {
        const response = await get(`${urlApi}&page=${currentPage}&pageSize=${pageSize}`);
        allData = [...allData, ...response.data];

        if (response.data.length < pageSize) {
          hasMoreData = false;
        } else {
          currentPage++;
        }
      }
      setTotalPages(currentPage);
      return allData;

      } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  }

  const {data: dadosListaVendasMarcaMarckup = [], error: errorVendasMarcaMarckup, isLoading: isLoadingVendasMarcaMarckup, refetch: refetchVendasMarcaMarckup} = useQuery(
    ['vendaMarcaMarckup', marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre],
    () => fetchListaVendasMarcaMarckup(marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada, empresaLivre),
    { enabled: false }
  );


  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);

  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaFinanceiroActionPesqVendasMarca(true)
      setTabelaFinanceiroActionPesqVendasMarcaMarckup(false)
      setTabelaFinanceiroVendasPeriodoTicketMedio(false)
      setTabelaFinanceiroResultadoOperacionalBruto(false)
      setTabelaFinanceiroPCJVendas(false)


      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refetchVendasMarca()
    }
  }

  const handleClickMarckup = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaFinanceiroActionPesqVendasMarcaMarckup(true)
      setTabelaFinanceiroVendasPeriodoTicketMedio(false)
      setTabelaFinanceiroResultadoOperacionalBruto(false)
      setTabelaFinanceiroPCJVendas(false)
      setTabelaFinanceiroActionPesqVendasMarca(false)
      setCurrentPage(+1);
      refetchVendasMarcaMarckup()
    }
  }

  const handleClickTicketMedio = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaFinanceiroVendasPeriodoTicketMedio(true)
      setTabelaFinanceiroResultadoOperacionalBruto(false)
      setTabelaFinanceiroPCJVendas(false)
      setTabelaFinanceiroActionPesqVendasMarca(false)
      setTabelaFinanceiroActionPesqVendasMarcaMarckup(false)
      
      setCurrentPage(+1);
      refetchVendasMarca()
    }
  }

  const handleClickROB = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaFinanceiroResultadoOperacionalBruto(true)
      setTabelaFinanceiroPCJVendas(false)
      setTabelaFinanceiroActionPesqVendasMarca(false)
      setTabelaFinanceiroActionPesqVendasMarcaMarckup(false)
      setTabelaFinanceiroVendasPeriodoTicketMedio(false)
 

      setCurrentPage(+1);
      refetchVendasMarcaROB()
    }
  }

  const handleClickPCJVendas = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaFinanceiroPCJVendas(true)
      setTabelaFinanceiroActionPesqVendasMarca(false)
      setTabelaFinanceiroActionPesqVendasMarcaMarckup(false)
      setTabelaFinanceiroVendasPeriodoTicketMedio(false)
      setTabelaFinanceiroResultadoOperacionalBruto(false)

  
      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refetch();
    }
  }

  useEffect(() => {
    if (isLoadingVendasPCJ) {
      const swalContent = {
        title: 'Dados Sendo Processados...',
        // text: `Páginas carregadas: ${currentPage} de ${totalPages}\nPáginas restantes: ${totalPages - currentPage}`,
        value: currentPage,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      };

      Swal.fire(swalContent).then((result) => {
        if (result.isConfirmed) {
          Swal.update(swalContent);
        }
      });
    } else {
      Swal.close();
      if (!isLoadingPesquisa) {
        setIsLoadingPesquisa(false);
      }
    }
  }, [isLoadingVendasPCJ, isLoadingPesquisa, currentPage, totalPages]);

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas"]}
        title="Vendas por Marcas e Período"


        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Por Marca"}
        optionsMarcas={[
          { value: '0', label: 'Selecione uma Marca' },
          ...optionsMarcas.map((item) => ({
            value: item.IDGRUPOEMPRESARIAL,
            label: item.DSGRUPOEMPRESARIAL,

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

        ButtonTypeCadastro={ButtonType}
        linkNome={"Vendas por Período e Recebimentos"}
        onButtonClickCadastro={handleClick}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}

        ButtonTypeVendasVendedor={ButtonType}
        linkNomeVendasVendedor={"Vendas por Período e Indicadores"}
        onButtonClickVendasVendedor={handleClickMarckup}
        corVendasVendedor={"info"}
        iconVendasVendedor={AiOutlineSearch}

        ButtonTypeSaldo={ButtonType}
        linkNomeSaldo={"Vendas por Período e Ticket Médio"}
        onButtonClickSaldo={handleClickTicketMedio}
        corTypeSaldo={"danger"}
        iconTypeSaldo={AiOutlineSearch}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"ROB - Resultado Operacional Bruto"}
        onButtonClickVendasEstrutura={handleClickROB}
        corVendasEstrutura={"warning"}
        iconVendasEstrutura={AiOutlineSearch}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"PCJ - Vendas"}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}
        onButtonClickSearch={handleClickPCJVendas}

      />

      {tabelaFinanceiroActionPesqVendasMarca && (
        <ActionListaVendasMarca dadosListaVendasMarca={dadosListaVendasMarca} />
      )}


      {tabelaFinanceiroActionPesqVendasMarcaMarckup && (
        <ActionListaVendasMarcaMarckup dadosListaVendasMarcaMarckup={dadosListaVendasMarcaMarckup} />
      )}

      {tabelaFinanceiroResultadoOperacionalBruto && (
        <ActionListaVendasMarcaROB dadosListaVendasMarcaROB={dadosListaVendasMarcaROB} />
      )}


      {tabelaFinanceiroVendasPeriodoTicketMedio && (
        <ActionListaVendasTicketMedio dadosListaVendasMarca={dadosListaVendasMarca} />
      )}

      {tabelaFinanceiroPCJVendas && (
    
        <ActionListaVendasPCJ dadosVendasPCJ={dadosVendasPCJ} />
      )}

    </Fragment>
  )
}
