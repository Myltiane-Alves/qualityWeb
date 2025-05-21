import { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionMain } from "../../../Actions/actionMain";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaPrecoProdutoGrupoSubGrupo } from "./actionListaPrecoProdutoGrupoSubGrupo";
import { getDataAtual } from "../../../../utils/dataAtual";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaPrecoProdutoGrupoSubGrupo = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [produtoPesquisado, setProdutoPesquisado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [ufSelecionado, setUFSelecionado] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')
  const [descricaoProduto, setDescricaoProduto] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)

  }, [])

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', `/marcasLista`);
  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('listaEmpresaComercial', `/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
  const { data: dadosGrupos = [], error: errorGrupo, isLoading: isLoadingGrupo } = useFetchData('grupo-produto', `/grupo-produto`);
  const { data: dadosSubGrupos = [], error: errorSubGrupo, isLoading: isLoadingSubGrupo } = useFetchData('subgrupo-produto', `/subgrupo-produto?idGrupo=${grupoSelecionado}`);
  const { data: dadosFornecedor = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useFetchData('fornecedor-produto', `/fornecedor-produto`);

  const fetchEstoque = async () => {
    try {

      const urlApi = `/produtos-precos-estoques-lojas?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${descricaoProduto}&uf=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${produtoPesquisado}&vlPrecoProduto=${precoProduto}`;
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

  const { data: dadosListaEstoque = [], error: erroGrupoSubGrupo, isLoading: isLoadingGrupoSubGrupo, refetch: refetchEstoque } = useQuery(
    'produtos-precos-estoques-lojas',
    () => fetchEstoque(dataPesquisaInicio, dataPesquisaFim, marcaSelecionada, empresaSelecionada, descricaoProduto, ufSelecionado, fornecedorSelecionado, grupoSelecionado, subGrupoSelecionado, produtoPesquisado, precoProduto),
    { enabled: false, staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );


  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  }

  const handleGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setGrupoSelecionado(values);
  }

  const handleSubGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSubGrupoSelecionado(values);
  }

  const handleFornecedorChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFornecedorSelecionado(values);
  }

  const handleSelectUF = (e) => {
    const selectedUF = e.value;
    setUFSelecionado(selectedUF);
  }


  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setTabelaVisivel(true)
    refetchEstoque()
  }


  const optionsUF = [
    { value: 'DF', label: 'DF' },
    { value: 'GO', label: 'GO' },
  ]

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Relatórios Vendas"]}
        title="Relatórios Vendas"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: null, label: 'Selecione uma loja' },
          ...dadosEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={empresaSelecionada}
        onChangeMultSelectEmpresa={handleEmpresaChange}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={[
          { value: '', label: 'Selecione uma Marca' },
          ...dadosMarcas.map((empresa) => ({
            value: empresa.IDGRUPOEMPRESARIAL,
            label: empresa.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}



        MultSelectGrupoComponent={MultSelectAction}
        optionsMultSelectGrupo={[
          { value: '', label: 'Selecione um Grupo' },
          ...dadosGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.GRUPO,
          }))
        ]}
        labelMultSelectGrupo={"Por Grupo"}
        valueMultSelectGrupo={grupoSelecionado}
        onChangeSelectGrupo={handleGrupoChange}

        MultSelectSubGrupoComponent={MultSelectAction}
        optionsMultSelectSubGrupo={[
          { value: '', label: 'Selecione um SubGrupo' },
          ...dadosSubGrupos.map((item) => ({
            value: item.ID_ESTRUTURA,
            label: item.ESTRUTURA,
          }))
        ]}
        labelMultSelectSubGrupo={"SubGrupo"}
        valueMultSelectSubGrupoo={subGrupoSelecionado}
        onChangeMultSelectSubGrupo={handleSubGrupoChange}

        InputSelectUFComponent={InputSelectAction}
        optionsSelectUF={optionsUF.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        labelSelectUF={"UF"}
        valueSelectUF={ufSelecionado}
        onChangeSelectUF={handleSelectUF}


        InputFieldComponent={InputField}
        labelInputField={"Marca"}
        valueInputField={descricaoProduto}
        onChangeInputField={e => setDescricaoProduto(e.target.value)}

        InputFieldQuantidadeComponent={InputField}
        labelInputFieldQuantidade={"Preço Produto"}
        valueInputQuantidade={precoProduto}
        onChangeInputQuantidade={e => setPrecoProduto(e.target.value)}

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

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Posicionamento de Estoques"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel &&
        <ActionListaPrecoProdutoGrupoSubGrupo dadosListaEstoque={dadosListaEstoque} />
      }

    </Fragment>
  )
}