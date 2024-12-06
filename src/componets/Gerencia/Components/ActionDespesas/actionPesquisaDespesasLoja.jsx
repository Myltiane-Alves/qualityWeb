import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getDataAtual } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionListaDespesasLoja } from "./actionListaDespesasLoja";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import {ActionCadastrarDespesasModal} from "./actionCadastrarDespesasModal"
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaDespesaLoja = () => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const navigate = useNavigate();

  
  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)


  }, [usuarioLogado]);


  const fetchDespesas = async () => {
    try {
      
      const urlApi = `/despesas-loja-empresa?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
        
        async function fetchNextPage(page) {
          try {
            page++;
            const responseNextPage = await get(`${urlApi}&page=${page}`);
            if (responseNextPage.data.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(page);
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

  const { data: dadosDespesasLoja = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchDespesas } = useQuery(
    'produtoQuality',
    () => fetchDespesas(usuarioLogado.IDEMPRESA,  currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const handleClick = () => {
    
    if (usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.DATA_HORA_SESSAO ) {
      setCurrentPage(prevPage => prevPage + 1);
      refetchDespesas(usuarioLogado.IDEMPRESA && usuarioLogado.DATA_HORA_SESSAO);
      setTabelaVisivel(true);
    } else {
      console.log('Usuário não possui informações válidas.');
    }
  }

  const handleShowModal = () => {
    setModalVisivel(true);
  };
 
  const handleCloseModal = () => {
    setModalVisivel(false);

  };

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Despesas da Loja"]}
        title="Lista de Despesas da Loja"
        subTitle={`${usuarioLogado?.NOFANTASIA}`}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome="Cadastrar Despesa "
        onButtonClickCadastro={handleShowModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}
      />

      {tabelaVisivel &&
       <ActionListaDespesasLoja dadosDespesasLoja={dadosDespesasLoja}  />           
      }

      <ActionCadastrarDespesasModal 
        show={modalVisivel}
        handleClose={handleCloseModal}
      />
       
    </Fragment>
  )
}

