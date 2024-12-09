import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { get } from "../../../../api/funcRequest";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaQuebraCaixa } from "./actionListaQuebraCaixa";
import { getDataAtual } from "../../../../utils/dataAtual";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaQuebraCaixa = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const navigate = useNavigate();

  useEffect(() => {
    const dataInicio = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFinal)

  }, [])
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
  }, [navigate, usuarioLogado]);


  const fetchQuebraCaixa = async () => {
    try {
      
      const urlApi = `/lista-quebra-caixa?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosQuebraCaixa = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchQuebraCaixa } = useQuery(
    'lista-quebra-caixa',
    () => fetchQuebraCaixa(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const handleClick = () => {
    if (usuarioLogado && usuarioLogado.IDEMPRESA && dataPesquisaInicio && dataPesquisaFim) {
     setCurrentPage(prevPage => prevPage + 1);
      refetchQuebraCaixa(usuarioLogado.IDEMPRESA, dataPesquisaInicio, dataPesquisaFim);
      setTabelaVisivel(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Por favor, preencha todos os campos.",
        text: "Verifique os Campos de Data",
      });
    }
  }

  
  return (

    <Fragment>  

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Conferência de Caixas"]}
        title="Lista de Quebras de Caixas da Loja"
        subTitle={usuarioLogado?.NOFANTASIA}
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        
        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        onButtonClickSearch={handleClick}
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

      />
       
      {tabelaVisivel && (
       <ActionListaQuebraCaixa dadosQuebraCaixa={dadosQuebraCaixa}/>

      )}

    </Fragment >
  )
}

