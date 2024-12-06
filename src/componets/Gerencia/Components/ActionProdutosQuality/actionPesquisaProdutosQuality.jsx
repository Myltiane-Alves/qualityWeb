import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ActionListaProdutosQuality } from "./actionListaProdutosQuality"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaProdutosQuality = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [descricaoProduto, setDescricaoProduto] = useState('')
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

  
  const fetchProdutosQuality = async () => {
    try {
      
      const urlApi = `produtoQuality?descricaoProduto=${descricaoProduto}&idEmpresa=${usuarioLogado.IDEMPRESA}&{idListaLoja=${usuarioLogado.ID_LISTA_LOJA}`;
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

  const { data: dadosProdutos = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchProdutosQuality } = useQuery(
    'produtoQuality',
    () => fetchProdutosQuality(usuarioLogado.IDEMPRESA, usuarioLogado.ID_LISTA_LOJA, descricaoProduto, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const handleClick = () => {

    if (usuarioLogado && usuarioLogado.IDEMPRESA && usuarioLogado.ID_LISTA_LOJA) {
      setCurrentPage(prevPage => prevPage + 1);
      refetchProdutosQuality();
      setTabelaVisivel(true);
    } else {
      console.log('Usuário não possui informações válidas.');
    }
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Produto Quality"]}
        title="Lista de Produtos Quality"
        subTitle={usuarioLogado?.NOFANTASIA}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={descricaoProduto}
        onChangeInputFieldCodBarra={(e) => setDescricaoProduto(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}
      />

      {tabelaVisivel &&
        <ActionListaProdutosQuality dadosProdutos={dadosProdutos} />
      }
    </Fragment>
  )
}
