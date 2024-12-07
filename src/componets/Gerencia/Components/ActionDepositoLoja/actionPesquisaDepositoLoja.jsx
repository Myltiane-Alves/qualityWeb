import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { getDataAtual } from "../../../../utils/dataAtual";
import { MdAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaDepositoLoja } from "./actionListaDepositoLoja";
import { ActionCadastrarDepositoModal } from "./actionCadastrarDepositoModal";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaDepositoLoja = () => {
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
  

  const fetchDepositos = async () => {
    try {
      
      const urlApi = `/deposito-loja?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosDepositosLoja = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchDepositos } = useQuery(
    'deposito-loja',
    () => fetchDepositos(usuarioLogado.IDEMPRESA,  currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );
   

  const handleClick = () => {
  
    if (usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.id) {
  
      setCurrentPage(prevPage => prevPage + 1);
      refetchDepositos(usuarioLogado.IDEMPRESA, currentPage, pageSize);
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
        linkComponent={["Lista de Depósitos da Loja"]}
        title="Lista de Depósitos da Loja"
        subTitle={usuarioLogado?.NOFANTASIA}

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
        linkNome="Cadastrar Depósito"
        onButtonClickCadastro={handleShowModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}
      />

    
      {tabelaVisivel &&
       <ActionListaDepositoLoja dadosDepositosLoja={dadosDepositosLoja} />
      }

      <ActionCadastrarDepositoModal
        show={modalVisivel}
        handleClose={handleCloseModal}
      />
    </Fragment>
  )
}