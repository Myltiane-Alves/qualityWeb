import { AiOutlineSearch } from "react-icons/ai"
import { ButtonType } from "../../../Buttons/ButtonType"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { InputField } from "../../../Buttons/Input"
import { ActionMain } from "../../../Actions/actionMain"
import { getDataAtual } from "../../../../utils/dataAtual"
import { Fragment, useEffect, useState } from "react"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"
import { useQuery } from "react-query"
import { ActionListaConferenciaMalotes } from "./actionListaConferenciaMalotes"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { get } from "../../../../api/funcRequest"


export const ActionPesquisaConferenciaMalote = ({ usuarioLogado, ID }) => {
    const [dataPesquisaInicio, setDataPesquisaInicio] = useState("");
    const [dataPesquisaFim, setDataPesquisaFim] = useState("");
    const [marcaSelecionada, setMarcaSelecionada] = useState("");
    const [empresaSelecionada, setEmpresaSelecionada] = useState("");
    const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState("");
    const [tabelaVisivel, setTabelaVisivel] = useState(false);
    const [isQuery, setIsQuery] = useState(false);
    const [statusSelecionado, setStatusSelecionado] = useState("");
    const [pendenciaSelecionada, setPendenciaSelecionada] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1000);

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
   
    const { data: optionsMarcas = [] } = useFetchData('marcasLista', '/marcasLista');
    const { data: optionsEmpresas = [], refetch: refetchEmpresas } = useFetchEmpresas(marcaSelecionada);
    const { data: optionsPendenciasMalotes = [] } = useFetchData('pendencias-malotes', '/pendencias-malotes');

    const fetchListaMalotes = async () => {
        try {
                                                     
            const urlApi = `/malotes-loja?idEmpresa=${empresaSelecionada}&idMarca=${marcaSelecionada}&statusMalote=${statusSelecionado}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idPendenciaMalote=${pendenciaSelecionada}`;
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
    
    const { data: dadosMalotes = [], error: errorMalotes, isLoading: isLoadingMalotes, refetch } = useQuery(
        ['malotes-loja', empresaSelecionada, statusSelecionado, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
        () => fetchListaMalotes(empresaSelecionada, statusSelecionado, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
        { enabled: Boolean(isQuery), staleTime: 5 * 60 * 1000, }
    );

    const handleChangeEmpresa = (e) => {
        const empresa = optionsEmpresas.find((item) => item.IDEMPRESA === e.value);
        setEmpresaSelecionada(e.value);
        setEmpresaSelecionadaNome(empresa.NOFANTASIA);
      }

      
    const handleClick = () => {
        setCurrentPage(prevPage => prevPage + 1);
        setIsQuery(true);
        setTabelaVisivel(true);
        refetch();
    }

    const optionsData = [
        { value: 'Malote', label: 'Data Caixa' },
        { value: 'Conferido', label: 'Data Conferido' },
    ]

    const optionsStatus = [
        { value: '0', label: 'Selecione um Status' },
        { value: 'Pendente de Envio', label: 'Pendente de Envio' },
        { value: 'Enviado', label: 'Enviado' },
        { value: 'Recepcionado', label: 'Recepcionado' },
        { value: 'Devolvido', label: 'Devolvido' },
        { value: 'Conferido', label: 'Conferido' },
        { value: 'Reenviado', label: 'Reenviado' },
    ]
    return (

        <Fragment>

            <ActionMain
                linkComponentAnterior={["Home"]}
                linkComponent={["Lista de Vendas"]}
                title="Vendas por Marcas e Período"
                subTitle={empresaSelecionadaNome}

                InputFieldDTInicioComponent={InputField}
                labelInputFieldDTInicio={"Data Início"}
                valueInputFieldDTInicio={dataPesquisaInicio}
                onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

                InputFieldDTFimComponent={InputField}
                labelInputFieldDTFim={"Data Fim"}
                valueInputFieldDTFim={dataPesquisaFim}
                onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

                InputSelectEmpresaComponent={InputSelectAction}
                labelSelectEmpresa={"Grupo Empresarial"}
                optionsEmpresas={[
                    { value: '0', label: 'Selecione uma Marca' },
                    ...optionsMarcas.map((item) => ({
                        value: item.IDGRUPOEMPRESARIAL,
                        label: item.GRUPOEMPRESARIAL,

                    }))
                ]}
                valueSelectEmpresa={marcaSelecionada}
                onChangeSelectEmpresa={(e) => setMarcaSelecionada(e.value)}


                InputSelectGrupoComponent={InputSelectAction}
                labelSelectGrupo={"Empresa"}
                optionsGrupos={[
                    { value: '0', label: 'Selecione uma Empresa' },
                    ...optionsEmpresas.map((item) => ({
                        value: item.IDEMPRESA,
                        label: item.NOFANTASIA,

                    }))
                ]}
                valueSelectGrupo={empresaSelecionada}
                onChangeSelectGrupo={handleChangeEmpresa}


                InputSelectSubGrupoComponent={InputSelectAction}
                labelSelectSubGrupo={"Status"}
                optionsSubGrupos={[
                    { value: '0', label: 'Selecione...' },
                    ...optionsStatus.map((item) => ({
                        value: item.value,
                        label: item.label,

                    }))
                ]}
                valueSelectSubGrupo={statusSelecionado}
                onChangeSelectSubGrupo={(e) => setStatusSelecionado(e.value)}


                InputSelectMarcasComponent={InputSelectAction}
                labelSelectMarcas={"Pendências"}
                optionsMarcas={[
                    ...optionsPendenciasMalotes.map((item) => ({
                        value: item.IDPENDENCIA,
                        label: item.TXTPENDENCIA

                    }))
                ]}
                valueSelectMarca={pendenciaSelecionada}
                onChangeSelectMarcas={(e) => setPendenciaSelecionada(e.value)}

                InputSelectPendenciaComponent={InputSelectAction}
                labelSelectPendencia={"Modo Pesquisa"}
                optionsPendencia={[           
                    ...optionsData.map((item) => ({
                        value: item.value,
                        label: item.label,

                    }))
                ]}
                valueSelectPendencia={pendenciaSelecionada}
                onChangeSelectPendencia={(e) => setPendenciaSelecionada(e.value)}

                ButtonSearchComponent={ButtonType}
                linkNomeSearch={"Pesquisar"}
                IconSearch={AiOutlineSearch}
                corSearch={"primary"}
                onButtonClickSearch={handleClick}

            />

            {tabelaVisivel && (
                <ActionListaConferenciaMalotes 
                    dadosMalotes={dadosMalotes} 
                    handleClick={handleClick} 
                    optionsModulos={optionsModulos}
                    usuarioLogado={usuarioLogado}
                />
            )}
        </Fragment>
    )
}


