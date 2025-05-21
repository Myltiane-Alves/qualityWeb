import { Fragment, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionListaRotatividade } from "./actionListaRotatividade";
import { getDataAtual } from "../../../../utils/dataAtual";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaRotatividade = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [grupoSelecionado, setGrupoSelecionado] = useState('')
  const [gradeSelecionado, setGradeSelecionado] = useState('')
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')
  const [ufSelecionado, setUFSelecionado] = useState('')
  const [produtoPesquisado, setProdutoPesquisado] = useState('')
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)

  }, [])

  const { data: dadosMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', `/marcasLista`);
  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresa } = useFetchData('listaEmpresaComercial', `/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
  const { data: dadosFornecedor = [], error: errorFornecedor, isLoading: isLoadingFornecedor } = useFetchData('parceiro-negocio', `/parceiro-negocio`);
  const { data: dadosGrupo = [], error: errorGrupo, isLoading: isLoadingGrupo } = useFetchData('grupo', `/grupo`);
  const { data: dadosGrade = [], error: errorGrade, isLoading: isLoadingGrade } = useFetchData('listaGrade', `/listaGrade?idGrupo=${grupoSelecionado}`);

  const fetchListaRotatividade = async () => {
    try {

      const urlApi = `/rotatividadeVendas?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descProduto=${produtoPesquisado}&uf=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupoGrade=${grupoSelecionado}&idGrade=${gradeSelecionado}`;
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

  const { data: dadosRotatividade = [], error: errorVendas, isLoading: isLoadingVendas, refetch: refetchListaRotatividade } = useQuery(
    ['rotatividadeVendas', dataPesquisaInicio, dataPesquisaFim, marcaSelecionada, empresaSelecionada, produtoPesquisado, ufSelecionado, fornecedorSelecionado, grupoSelecionado, gradeSelecionado, currentPage, pageSize],
    () => fetchListaRotatividade(dataPesquisaInicio, dataPesquisaFim, marcaSelecionada, empresaSelecionada, produtoPesquisado, ufSelecionado, fornecedorSelecionado, grupoSelecionado, gradeSelecionado, currentPage, pageSize),
    { enabled: Boolean(marcaSelecionada), staleTime: 5 * 60 * 1000 }
  );


  const handleSelectEmpresa = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  };

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
    if (!isNaN(selectedSubGrupo)) {
      setGradeSelecionado(selectedSubGrupo);
    }
  }

  const handleFornecedorChange = (e) => {
    const selectedFornecedor = e.value;
    if (!isNaN(selectedFornecedor)) {
      setFornecedorSelecionado(selectedFornecedor);
    }
  }

  const handleSelectUF = (e) => {
    const selectedUF = e.value;
    setUFSelecionado(selectedUF);
  }

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setTabelaVisivel(true)
    refetchListaRotatividade()
  }

  const optionsUF = [
    { value: 'DF', label: 'DF' },
    { value: 'GO', label: 'GO' },
  ]

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Rotatividade"]}
        title="Rotatividade por Período"
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

        InputSelectGradeComponent={InputSelectAction}
        optionsGrades={[
          { value: '', label: 'Selecione uma Grade' },
          ...dadosGrade.map((grade) => ({
            value: grade.NOMEGRUPO,
            label: grade.NOMEGRUPO,
          }))
        ]}
        labelSelectGrade={"Por Grade"}
        valueSelectGrade={gradeSelecionado}
        onChangeSelectGrade={handleGradeChange}

        InputSelectFornecedorComponent={InputSelectAction}
        optionsFornecedores={[
          { value: '', label: 'Selecione um Fornecedor' },
          ...dadosFornecedor.map((fornecedor) => ({
            value: fornecedor.ID_FORNECEDOR,
            label: `${fornecedor.ID_FORNECEDOR} ${fornecedor.FORNECEDOR}`,
          }))
        ]}
        labelSelectFornecedor={"Por Fornecedor"}
        valueSelectFornecedor={fornecedorSelecionado}
        onChangeSelectFornecedor={handleFornecedorChange}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={produtoPesquisado}
        onChangeInputFieldCodBarra={e => setProdutoPesquisado(e.target.value)}


        InputSelectUFComponent={InputSelectAction}
        optionsSelectUF={optionsUF.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        labelSelectUF={"UF"}
        valueSelectUF={ufSelecionado}
        onChangeSelectUF={handleSelectUF}

        MultSelectGrupoComponent={MultSelectAction}
        labelMultSelectGrupo={"Empresa"}

        optionsMultSelectGrupo={dadosEmpresas.map((item) => ({
          value: item.IDEMPRESA,
          label: item.NOFANTASIA,
        }))}
        defaultValueMultSelectGrupo={[empresaSelecionada]}
        isMultiSelectGrupo={true}
        onChangeMultSelectGrupo={handleSelectEmpresa}

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
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

      />

      {tabelaVisivel &&
        <ActionListaRotatividade dadosRotatividade={dadosRotatividade} />
      }
    </Fragment>
  )
}