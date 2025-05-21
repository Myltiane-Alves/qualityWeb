import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaVendasEstoque } from "./actionListaVendasEstoque";
import { getDataAtual } from "../../../../utils/dataAtual";
import { useFetchData } from "../../../../hooks/useFetchData";
import { get } from "../../../../api/funcRequest";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaVendasEstoque = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [produtoPesquisado, setProdutoPesquisado] = useState('');
  const [grupoGradeSelecionado, setGrupoGradeSelecionado] = useState('');
  const [gradeSelecionado, setGradeSelecionado] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)

  }, [])

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', `/marcasLista`);
  const { data: dadosFornecedor = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useFetchData('parceiro-negocio', `/parceiro-negocio`);
  const { data: dadosGrupo = [], error: errorGrupo, isLoading: isLoadingGrupo } = useFetchData('grupo', `/grupo`);
  const { data: dadosGrade = [], error: errorGrade, isLoading: isLoadingGrade } = useFetchData('listaGrade', `/listaGrade?idGrupo=${grupoSelecionado}`);

  const fetchListaEstoque = async () => {
    try {

      const urlApi = `/venda-estoque-produto?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${grupoSelecionado}&descProduto=${produtoPesquisado}&idFornecedor=${fornecedorSelecionado}&idGrupoGrade=${grupoGradeSelecionado}&idGrade=${gradeSelecionado}`;
      const response = await get(urlApi);

      if (response.data && response.data.length === pageSize) {
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

  const { data: dadosEstoqueAtual = [], error: errorVendas, isLoading: isLoadingVendas, refetch: refetchListaEstoque } = useQuery(
    ['rotatividadeVendas', dataPesquisaInicio, dataPesquisaFim, marcaSelecionada, produtoPesquisado, fornecedorSelecionado, grupoSelecionado, gradeSelecionado, currentPage, pageSize],
    () => fetchListaEstoque(dataPesquisaInicio, dataPesquisaFim, marcaSelecionada, produtoPesquisado, fornecedorSelecionado, grupoSelecionado, gradeSelecionado, currentPage, pageSize),
    { enabled: Boolean(marcaSelecionada), staleTime: 5 * 60 * 1000 }
  );


  const handleSelectMarcas = (e) => {
    const selectedId = Number(e.value);
    if (!isNaN(selectedId)) {
      setMarcaSelecionada(selectedId);
    }
  }

  const handleGrupoChange = (e) => {
    const selectedGrupo = e.value;
    if (!isNaN(selectedGrupo)) {
      setGrupoSelecionado(selectedGrupo);
    }

  }

  const handleGradeChange = (e) => {
    const selectedSubGrupo = e.value;
    if (selectedSubGrupo) {
      setGradeSelecionado(selectedSubGrupo);
    }
  }

  const handleFornecedorChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFornecedorSelecionado(values);
  };
  
  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaEstoque()
    setTabelaVisivel(true)
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas Estoque"]}
        title="Vendas Estoque"
        // subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        InputSelectGrupoComponent={InputSelectAction}
        optionsGrupos={[
          { value: '', label: 'Selecione um Grupo' },
          ...dadosGrupo.map((item) => ({
            value: item.IDGRUPO,
            label: item.GRUPOPRODUTO,
          }))
        ]}
        labelSelectGrupo={"Por Grupo"}
        valueSelectGrupo={grupoSelecionado}
        onChangeSelectGrupo={handleGrupoChange}

        InputSelectSubGrupoComponent={InputSelectAction}
        optionsSubGrupos={[
          { value: '', label: 'Selecione uma Grade' },
          ...dadosGrade.map((grade) => ({
            value: grade.NOMEGRUPO,
            label: grade.NOMEGRUPO,
          }))
        ]}
        labelSelectSubGrupo={"Por Grade"}
        valueSelectSubGrupo={gradeSelecionado}
        onChangeSelectSubGrupo={handleGradeChange}

        MultSelectFornecedorComponent={MultSelectAction}
        optionsMultSelectFornecedor={[
          { value: '', label: 'Selecione um Fornecedor' },
          ...dadosFornecedor.map((fornecedor) => ({
            value: fornecedor.ID_FORNECEDOR,
            label: `${fornecedor.ID_FORNECEDOR} ${fornecedor.FORNECEDOR}`,
          }))
        ]}
        labelMultSelectFornecedor={"Por Fornecedor"}
        valueMultSelectFornecedor={fornecedorSelecionado}
        onChangeMultSelectFornecedor={handleFornecedorChange}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={produtoPesquisado}
        onChangeInputFieldCodBarra={e => setProdutoPesquisado(e.target.value)}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={[
          { value: null, label: 'Selecione uma Marca' },
          ...dadosMarcas.map((empresa) => ({
            value: empresa.IDGRUPOEMPRESARIAL,
            label: empresa.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarcas={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarcas}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel &&
        <ActionListaVendasEstoque dadosEstoqueAtual={dadosEstoqueAtual} />
      }

    </Fragment >
  )
}

