import { AiOutlineSearch } from "react-icons/ai"
import { ButtonType } from "../../../Buttons/ButtonType"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { InputField } from "../../../Buttons/Input"
import { ActionMain } from "../../../Actions/actionMain"
import { getDataAtual } from "../../../../utils/dataAtual"
import { Fragment, useEffect, useState } from "react"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"
import { useQuery } from "react-query"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { get } from "../../../../api/funcRequest"
import { ActionListaConferenciaMalotes } from "./actionListaConferenciaMalotes"


export const ActionPesquisaConferenciaMalote = ({ usuarioLogado, ID }) => {
    const [dataPesquisaInicio, setDataPesquisaInicio] = useState("");
    const [dataPesquisaFim, setDataPesquisaFim] = useState("");
    const [tabelaVisivel, setTabelaVisivel] = useState(false);
    const [statusSelecionado, setStatusSelecionado] = useState("");
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
        { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
    );

    const fetchListaMalotes = async () => {
        try {
            // const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
            const urlApi = `/malotes-por-loja?idEmpresa=${usuarioLogado?.IDEMPRESA}&statusMalote=${statusSelecionado}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
        ['malotes-por-loja', usuarioLogado?.IDEMPRESA, statusSelecionado, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
        () => fetchListaMalotes(usuarioLogado?.IDEMPRESA, statusSelecionado, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
        { enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 5 * 60 * 1000, }
    );
   

    const handleClick = () => {
        setCurrentPage(prevPage => prevPage + 1);
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
        {value: 'Devolvido', label: 'Devolvido'},
        {value: 'Conferido', label: 'Conferido'},
        {value: 'Reenviado', label: 'Reenviado'},
    ]
    
    return (

        <Fragment>

            <ActionMain
                linkComponentAnterior={["Home"]}
                linkComponent={["Envio Malotes"]}
                title="Lista de Malotes por Período"


                InputFieldDTInicioComponent={InputField}
                labelInputFieldDTInicio={"Data Início"}
                valueInputFieldDTInicio={dataPesquisaInicio}
                onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

                InputFieldDTFimComponent={InputField}
                labelInputFieldDTFim={"Data Fim"}
                valueInputFieldDTFim={dataPesquisaFim}
                onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

                InputSelectEmpresaComponent={InputSelectAction}
                labelSelectEmpresa={"Status"}
                optionsEmpresas={[
                    { value: '0', label: 'Selecione...' },
                    ...optionsStatus.map((item) => ({
                        value: item.value,
                        label: item.label,

                    }))
                ]}
                valueSelectEmpresa={statusSelecionado}
                onChangeSelectEmpresa={(e) => setStatusSelecionado(e.value)}            

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
                    usuarioLogado={usuarioLogado}
                    optionsModulos={optionsModulos}    
                />
            )}
        </Fragment>
    )
}