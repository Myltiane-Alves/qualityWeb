import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { AiOutlineSearch } from "react-icons/ai"
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaDespesaLoja } from "./actionListaDespesaLoja";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useFetchData } from "../../../../hooks/useFetchData"

export const ActionPesquisaDespesaLoja = ({usuarioLogado, ID}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
    
  }, [])

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('listaEmpresasIformatica', '/listaEmpresasIformatica');
  const { data: optionsCategorias = [], error: errorCategorias, isLoading: isLoadingCategorias } = useFetchData('categoriaReceitaDespesaFinanceira', '/categoriaReceitaDespesaFinanceira');
 
  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const fetchListaDespesasLoja = async () => {
    try {

      
      const urlApi = `/despesa-loja?idEmpresa=${empresaSelecionada}&idCategoria=${categoriaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosDespesasLoja = [], error: errorDespesasLoja, isLoading: isLoadingDespesasLoja, refetch: refetchListaDespesasLoja } = useQuery(
    ['despesa-loja',  categoriaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaDespesasLoja( categoriaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim,  currentPage, pageSize),
    { enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 5 * 60 * 1000 }
  );

  const handleChangeEmpresa = (e) => {
    const empresa = optionsEmpresas.find((item) => item.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
  }

  const handleChangeSelectCategoria = (e) => {
    setCategoriaSelecionada(e.value)
  }

  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaDespesasLoja()
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Despesas"]}
        title="Despesas por Lojas e Período"
        subTitle={empresaSelecionadaNome}
      

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Empresa"}
        optionsEmpresas={[
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Categoria"}
        optionsMarcas={[
          { value: '', label: 'Selecione uma Categoria' },
          ...optionsCategorias.map((categoria) => ({
            value: categoria.IDCATEGORIARECDESP,
            label: ` ${categoria.IDCATEGORIARECDESP} - ${categoria.DSCATEGORIA}`,
          }))
        ]}
        valueSelectMarca={categoriaSelecionada}
        onChangeSelectMarcas={handleChangeSelectCategoria}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

      />

      {tabelaVisivel && (

        <div className="card" >
          <ActionListaDespesaLoja 
            dadosDespesasLoja={dadosDespesasLoja} 
            usuarioLogado={usuarioLogado} 
            optionsModulos={optionsModulos}
          />
        </div>
      )}
    </Fragment>
  )
}

