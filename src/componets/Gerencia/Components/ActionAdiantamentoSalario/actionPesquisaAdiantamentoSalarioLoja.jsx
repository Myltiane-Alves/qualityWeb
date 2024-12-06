import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { ActionListaAdiantamentoSalarioLoja } from "./actionListaAdiantamentoSalarioLoja";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";
import { ActionCadastrarAdiantamentoSalarial } from "./actionCadastrarAdiantamentoSalarial";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaAdiantamentoSalarioLoja = () => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [usuarioLogado, setUsuarioLogado] = useState(null)

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
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);

  }, [usuarioLogado]);


  const fetchAdiantamentos = async () => {
    try {
      
      const urlApi = `/adiantamento-funcionarios?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosAdiantamentoFuncionarios = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchAdiantamentos } = useQuery(
    'produtoQuality',
    () => fetchAdiantamentos(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );




  const handleClick = () => {
  
    setCurrentPage(prevPage => prevPage + 1);
    refetchAdiantamentos(usuarioLogado.IDEMPRESA);
    setTabelaVisivel(true);
    
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
        linkComponent={["Adiantamento de Salário da Loja"]}
        title="Adiantamento de Salário da Loja"
        subTitle="Nome da Loja"
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
        linkNome="Cadastrar Adiantamento de Salário"
        onButtonClickCadastro={handleShowModal}
        corCadastro={"success"}
        IconCadastro={MdAdd}
      />


      {tabelaVisivel &&
        <ActionListaAdiantamentoSalarioLoja 
          dadosAdiantamentoFuncionarios={dadosAdiantamentoFuncionarios} 
        />
      }

      <ActionCadastrarAdiantamentoSalarial 
        show={modalVisivel}
        handleClose={handleCloseModal}

      />
    </Fragment>
  )
}
