import { Fragment, useEffect, useState } from "react"
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionMain } from "../../../Actions/actionMain";
import { get } from "../../../../api/funcRequest";
import { ActionListaAlterarVendaVendedor } from "./actionListaAlterarVendaVendedor";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData } from "../../../../hooks/useFetchData";

export const ActionPesquisaAlterarVendaVendedor = ({ usuarioLogado, ID }) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState(0);
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryVenda, setIsQueryVenda] = useState(false);


  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, [])

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const { data: dadosEmpresa = [], error: errorEmpresa, isLoading: isLoadingEmpresa } = useFetchData('empresas', '/empresas')

  const fetchVendasAtiva = async () => {
    try {
      
      const urlApi = `/venda-ativa?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&statusCancelado=False`;
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
   
  const { data: dadosVendasAtivas = [], error: errorVendasMarca, isLoading: isLoadingVendasMarca, refetch: refetchVendasAtiva } = useQuery(
    ['venda-ativa', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchVendasAtiva(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(isQueryVenda), 
      staleTime: 5 * 60 * 1000,
    }
  );

  const handleSelectEmpresa = (e) => {
    const empresa = dadosEmpresa.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value)
    setEmpresaSelecionadaNome(empresa.NOFANTASIA)
  }

  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoading(true)
    setCurrentPage(prevPage => prevPage + 1)
    setIsQueryVenda(true)
    refetchVendasAtiva()
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vendas por Empresa e Período"]}
        title="Vendas por Empresa e Período "
        subTitle={empresaSelecionadaNome}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}
        optionsEmpresas={[
          { value: '', label: 'Selecione uma loja' },
          ...dadosEmpresa.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      {tabelaVisivel &&
        <>
          <ActionListaAlterarVendaVendedor 
            empresaSelecionada={empresaSelecionada} 
            dadosVendasAtivas={dadosVendasAtivas}
            optionsModulos={optionsModulos}
            usuarioLogado={usuarioLogado}  
          />  
        </>
      }

    </Fragment>
  )
}