import { AiOutlineSearch } from "react-icons/ai"
import { Fragment, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ActionListaConferenciaMalotes } from "./actionListaConferenciaMalotes"
import { useFetchData } from "../../../hooks/useFetchData"
import { get } from "../../../api/funcRequest"
import { InputField } from "../../Buttons/Input"
import { ActionMain } from "../../Actions/actionMain"
import { InputSelectAction } from "../../Inputs/InputSelectAction"
import { ButtonType } from "../../Buttons/ButtonType"
import { getDataAtual } from "../../../utils/dataAtual"
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../utils/animationCarregamento"


export const ActionPesquisaRecebimentoMalote = ({ }) => {
    const [dataPesquisaInicio, setDataPesquisaInicio] = useState("");
    const [dataPesquisaFim, setDataPesquisaFim] = useState("");
    const [empresaSelecionada, setEmpresaSelecionada] = useState("");
    const [tabelaVisivel, setTabelaVisivel] = useState(false);
    const [isQuery, setIsQuery] = useState(false);
    const [statusSelecionado, setStatusSelecionado] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(500);

    useEffect(() => {
        const dataInicial = getDataAtual();
        const dataFinal = getDataAtual();
        setDataPesquisaInicio(dataInicial);
        setDataPesquisaFim(dataFinal);

    }, [])

   
    const { data: optionsEmpresas = [] } = useFetchData('empresas', '/empresas');
 

    const fetchListaMalotes = async () => {
        try {
                                                     
            const urlApi = `/malotes-loja?idEmpresa=${empresaSelecionada}&statusMalote=${statusSelecionado}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
            const response = await get(urlApi);

            
            if (response.data.length && response.data.length === pageSize) {
                let pages = currentPage ? Math.ceil(response.data.length / pageSize) : '';
                let allData = [...response.data];
                animacaoCarregamento(`Carregando... Página ${pages} de ${response.data.length}`, true);

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

    const handleClick = () => {
        setCurrentPage(prevPage => prevPage + 1);
        setIsQuery(true);
        setTabelaVisivel(true);
        refetch();
    }



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
                linkComponent={["Recepção de Malotes"]}
                title="Lista de Malotes por Período"


                InputFieldDTInicioComponent={InputField}
                labelInputFieldDTInicio={"Data Início"}
                valueInputFieldDTInicio={dataPesquisaInicio}
                onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

                InputFieldDTFimComponent={InputField}
                labelInputFieldDTFim={"Data Fim"}
                valueInputFieldDTFim={dataPesquisaFim}
                onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}



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
                onChangeSelectGrupo={(e) => setEmpresaSelecionada(e.value)}


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


                ButtonSearchComponent={ButtonType}
                linkNomeSearch={"Pesquisar"}
                IconSearch={AiOutlineSearch}
                corSearch={"primary"}
                onButtonClickSearch={handleClick}

            />

            {tabelaVisivel && (
                <ActionListaConferenciaMalotes dadosMalotes={dadosMalotes} handleClick={handleClick} />
            )}
        </Fragment>
    )
}