import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom"
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaBalanco } from "./actionListaBalancoLoja";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaBalancoLoja = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [descricao, setDescricao] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const navigate = useNavigate();


  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
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
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFim)
  }, [usuarioLogado]);

  const fetchListaBalanco = async () => {
    try {
      const urlApi = `/balanco-loja?idEmpresa=${usuarioLogado.IDEMPRESA}&dsDescricao=${descricao}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
   
  const { data: dadosListaBalanco = [], error: errorBalanco, isLoading: isLoadingBalanco, refetch: refetchListaBalanco } = useQuery(
    ['estoqueAtual', usuarioLogado?.IDEMPRESA, descricao, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaBalanco(usuarioLogado?.IDEMPRESA, descricao, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
    }
  );
 
  const handleClick = () => {
    if(usuarioLogado && usuarioLogado.IDEMPRESA) {
      setCurrentPage(+1);
      refetchListaBalanco();
      setTabelaVisivel(true);
    }
  };

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Balanço por Loja"]}
        title="Lista de Balanço por Loja"
        subTitle="Nome da Loja"
        
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        InputFieldVendedor={InputField}
        labelInputFieldVendedor={"Descrição"}
        onChangeInputFieldVendedor={e => setDescricao(e.target.value)} 
        valueInputFieldVendedor={descricao}   
  
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel &&
         
        <ActionListaBalanco dadosListaBalanco={dadosListaBalanco} />
      }
    </Fragment>
  )
}
