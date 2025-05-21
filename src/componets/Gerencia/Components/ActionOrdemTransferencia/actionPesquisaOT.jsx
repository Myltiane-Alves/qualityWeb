import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { get } from "../../../../api/funcRequest";
import { ActionListaOrdemTransferencia } from "./ActionListaOrdemTransferencia";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { ActionIncluirOTModal } from "./ActionIncluirModalOT/actionIncluirOTModal";
import Swal from "sweetalert2";


export const ActionPesquisaOT = ({usuarioLogado, ID, optionsEmpresas}) => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataInicioEntrega, setDataInicioEntrega] = useState('')
  const [dataFimEntrega, setDataFimEntrega] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [valueLojaOrigem, setValueLojaOrigem] = useState('')
  const [ajusteQuantidade, setAjusteQuantidade] = useState(0)
  const [rotinaSelecionada, setRotinaSelecionada] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);



  useEffect(() => {
    const timer = setTimeout(() => {
      if (usuarioLogado && usuarioLogado.NOFANTASIA) {
        setValueLojaOrigem(usuarioLogado.NOFANTASIA);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [usuarioLogado]);


  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );

  const { data: dadosEmpresa = [], error: errorMarcas, isLoading: isLoadingMarcas } = useQuery(
    'empresas',
    async () => {
      const response = await get(`/empresas`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
  const { data: dadosMovimentacao = [], error: errorMovimentacao, isLoading: isLoadingMovimentacao } = useQuery(
    'rotinaMovimentacao',
    async () => {
      const response = await get(`/rotinaMovimentacao`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const fetchListaConferencia = async () => {
    try {
      
      const urlApi = `/resumo-ordem-transferencia?idTipoFiltro=2&idEmpresaOrigem=${usuarioLogado.IDEMPRESA}&idEmpresaDestino=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
   
  const { data: dadosConferencia = [], error: errorVouchers, isLoading: isLoadingVouchers, refetch: refetchListaConferencia } = useQuery(
    ['resumo-ordem-transferencia', usuarioLogado?.IDEMPRESA, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, rotinaSelecionada, dataInicioEntrega, dataFimEntrega, currentPage, pageSize],
    () => fetchListaConferencia(usuarioLogado?.IDEMPRESA, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, rotinaSelecionada, dataInicioEntrega, dataFimEntrega, currentPage, pageSize),
    {
      enabled: Boolean(usuarioLogado?.IDEMPRESA), 
    }
  );


  const handleSelectEmpresa = (e) => {
    setEmpresaSelecionada(e.value);
  }

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaConferencia()
    setTabelaVisivel(true);
  
  }

  const showModal = () => {
    if(optionsModulos[0]?.CRIAR == 'False') {

      setModalVisivel(true)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Você não tem permissão para criar uma nova Ordem de Transferência.',
        timer: 3000,
      });
    }
  }


  return (
    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Ordem de Transferência"]}
        title="Controle de Ordem de Transferência"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Inicio"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}       
        
        InputFieldLojaOrigemComponent={InputField}
        labelInputFieldLojaOrigem={"Loja Origem"}
        optionsFieldLojaOrigemComponent
        valueInputFieldLojaOrigem={usuarioLogado && usuarioLogado.NOFANTASIA}
        onChangeInputFieldLojaOrigem

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={dadosEmpresa.map((empresa) => ({
          value: empresa.IDEMPRESA,
          label: empresa.NOFANTASIA,
        }))}
        labelSelectEmpresa={"Loja Destino"}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}

        InputSelectGrupoComponent={InputSelectAction}
        labelSelectGrupo={"Rotina"}    
        optionsGrupos={[
          {value: '', label: 'Selecione a Rotina'},
          ...dadosMovimentacao.map((item) => {
            return {
              value: item.IDROTINA,
              label: item.DESCROTINA
            }
          })
        ]}
        valueSelectGrupo={rotinaSelecionada}
        onChangeSelectGrupo={e => setRotinaSelecionada(e.value)}

        ButtonSearchComponent={ButtonType}
        onButtonClickSearch={handleClick}
        linkNomeSearch={"Pesquisar"}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={"Nova OT"}
        linkNome={"Nova OT"}
        onButtonClickCadastro={showModal}
        corCadastro={"success"}
        IconCadastro={MdAdd}
      />
     
      <ActionListaOrdemTransferencia dadosConferencia={dadosConferencia} empresaSelecionada={empresaSelecionada}/>

      <ActionIncluirOTModal
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
      />

    </Fragment>
  )
}