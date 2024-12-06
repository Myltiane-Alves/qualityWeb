import { Fragment, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionMain } from "../../../Actions/actionMain";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaExtratoMovimentoBonificacao } from "./actionListaExtratoMovimentoBonificacao";
import { get } from "../../../../api/funcRequest";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaExtratoMovimentoBonificacao = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);


  const { data: optionsFucionarios = [], error: errorFuncionario, isLoading: isLoadingFuncionario } = useQuery(
    ['todos-funcionario', currentPage, pageSize],
    async () => {
      const response = await get(`/todos-funcionario?page=${currentPage}&pageSize=${pageSize}`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
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

  const handleSelectFuncionario = (e) => {
    const selectId = e.value
    if (selectId) {
      setFuncionarioSelecionado(selectId)
    }
  }

  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
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
        onChangeSelectEmpresa={handleSelectFuncionario}
        valueSelectEmpresa={funcionarioSelecionado}
        optionsEmpresas={[
          { value: '0', label: 'Selecione...' },
          ...optionsFucionarios.map((empresa) => ({
            value: empresa.ID,
            label: ` ${empresa.ID} - ${empresa.NOFUNCIONARIO}`,
          }))
        ]}
        labelSelectEmpresa={"Funcionário"}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel && (

        <div className="card">
          
          <ActionListaExtratoMovimentoBonificacao dadosExtratoBonificacao={dadosExtratoBonificacao} />
        </div>
      )}
    </Fragment>
  )
}
