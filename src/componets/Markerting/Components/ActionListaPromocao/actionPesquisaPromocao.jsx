import React, { Fragment, useState } from "react"
import { ActionListaPromocao } from "./actionListaPromocao"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ActionListaProduto } from "./actionListaProduto";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { ActionCadastrarPromocaoModal } from "./ActionCadastrarPromocao/actionCadastrarPromocaoModal";


export const ActionPesquisaPromocao = () => {
  const [tabelaCampanha, setTabelaCampanha] = useState(true);
  const [modalCadastrarPromocao, setModalCadastrarPromocao] = useState(false);
  const [tabelaProduto, setTabelaProduto] = useState(false);
  const [codBarras, setCodBarras] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);


  const { data: dadosListaPromocao = [], error: errorPromocao, isLoading: isLoadingPromocao, refetch: refetchPromocao } = useQuery(
    'listaPromocao',
    async () => {
      const response = await get(`/listaPromocao`);
      return response.data;
    },
    { enabled: true, staleTime: 5 * 60 * 1000 }
  );


  const fetchListaProdutosPromocao = async () => {
    try {
      const urlApi = `/web/src/componets/Markerting/Components/ActionListaPromocao/actionPesquisaPromocao.jsx?codeBarsOuNome=${codBarras}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.page}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.data.length) {
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

  const { data: dadosProdutos = [], error: errorFuncionario, isLoading: isLoadingFuncionario, refetch: refetchListaProdutos } = useQuery(
    ['produto-promocao'],
    () => fetchListaProdutosPromocao(),
    {
      enabled: false, staleTime: 5 * 60 * 1000, 
    }
  );
  

  const handleClickProduto = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaProdutos()
    setTabelaProduto(true)  
    setTabelaCampanha(false)    
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Cadastro de Promoções"]}
        title="Cadsatro de Promoções"

        
        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        placeHolderInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={codBarras}
        onChangeInputFieldCodBarra={(e) => setCodBarras(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Produtos"}
        onButtonClickSearch={handleClickProduto}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        onButtonClickCadastro={(e) => setModalCadastrarPromocao(true)}
        linkNome={"Cadastrar Promoção"}
        corCadastro={"success"}
        IconCadastro={MdAdd}

      />


      {tabelaCampanha && (   
        <div className="card">
          <ActionListaPromocao dadosListaPromocao={dadosListaPromocao} refetchPromocao={refetchPromocao}/>
        </div>
      )}

      {tabelaProduto && (
        <div className="card">
          <ActionListaProduto dadosProdutos={dadosProdutos} />
        </div>
      )}

      <ActionCadastrarPromocaoModal
        show={modalCadastrarPromocao}
        handleClose={(e) => setModalCadastrarPromocao(false)}

      />

    </Fragment >
  )
}