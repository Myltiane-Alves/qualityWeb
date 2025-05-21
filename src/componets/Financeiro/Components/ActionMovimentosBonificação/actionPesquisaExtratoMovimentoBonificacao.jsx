import { Fragment, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionMain } from "../../../Actions/actionMain";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaExtratoMovimentoBonificacao } from "./actionListaExtratoMovimentoBonificacao";
import { get } from "../../../../api/funcRequest";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaExtratoMovimentoBonificacao = ({usuarioLogado, ID}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const fetchListaFuntionarios = async () => {
    try {

      const urlApi = `/todos-funcionario?`;
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

  const { data: optionsFucionarios = [], error: errorFuncionario, isLoading: isLoadingFuncionario, refetch } = useQuery(
    ['todos-funcionario', funcionarioSelecionado, currentPage, pageSize],
    () => fetchListaFuntionarios(funcionarioSelecionado, currentPage, pageSize),
    { enabled: true, staleTime: 5 * 60 * 1000 }
  );

  const fetchDadosExtratoBoniFicacao = async () => {
    try {

      const urlApi = `/movimento-saldo-bonificacao?idFuncionario=${funcionarioSelecionado}`;
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

  const { data: dadosExtratoBonificacao = [], error: errorDescontoVendas, isLoading: isLoadingDescontoVendas, refetch: refetchDadosExtratoBoniFicacao } = useQuery(
    ['descontoVendas', funcionarioSelecionado, currentPage, pageSize],
    () => fetchDadosExtratoBoniFicacao(funcionarioSelecionado, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    refetchDadosExtratoBoniFicacao()
  }


  
  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Extrato de Contas Correntes das Lojas"]}
        title="Extrato de Bonificações Funcionários"
        // subTitle="Nome da Loja"

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: '0', label: 'Selecione...' },
          ...optionsFucionarios.map((empresa) => ({
            value: empresa.ID,
            label: ` ${empresa.ID} - ${empresa.NOFUNCIONARIO}`,
          }))
        ]}
        labelSelectEmpresa={"Funcionário"}
        valueSelectEmpresa={funcionarioSelecionado} // Use apenas o estado aqui
        onChangeSelectEmpresa={(e) => setFuncionarioSelecionado(e.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel && (

        <div className="card">
          
          <ActionListaExtratoMovimentoBonificacao 
            dadosExtratoBonificacao={dadosExtratoBonificacao} 
            usuarioLogado={usuarioLogado}
            optionsModulos={optionsModulos}
            funcionarioSelecionado={funcionarioSelecionado}  
            setFuncionarioSelecionado={setFuncionarioSelecionado}
          />
        </div>
      )}
    </Fragment>
  )
}
