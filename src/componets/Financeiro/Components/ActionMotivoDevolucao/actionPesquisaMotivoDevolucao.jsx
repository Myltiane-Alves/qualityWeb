import { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType"
import { AiOutlineSearch } from "react-icons/ai"
import { InputField } from "../../../Buttons/Input"
import { ActionMain } from "../../../Actions/actionMain"
import { getDataAtual } from "../../../../utils/dataAtual"
import { IoIosAdd } from "react-icons/io"
import { get } from "../../../../api/funcRequest"
import { ActionListaMotivoDevolucao } from "./actionListaMotivoDevolucao"
import { ActionCriarMotivoDevolucaoModal } from "./ActionCadastrarMotivo/actionCriarMotivoDevolucaoModal"
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import Swal from "sweetalert2"

export const ActionPesquisaMotivoDevolucao = ({ usuarioLogado, ID}) => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [numeroMotivoDevolucao, setNumeroMotivoDevolucao] = useState('')
  const [descricaoMotivoDevolucao, setDescricaoMotivoDevolucao] = useState('')
  const [tabelaVisivel, setTabelaVisivel] = useState(false)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(500); 
  const [modalCriarVisivel, setModalCriarVisivel] = useState(false)
  

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, [])

  const fetchMotivoDevolucao = async () => {
    try {
      const urlApi = `/motivo-devolucao?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMotivo=${numeroMotivoDevolucao}&descricaoMotivo=${descricaoMotivoDevolucao}`;
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
  }

  const { data: dadosMotivoDevolucao = [], error: erroMotivoDevolucao, isLoading: isLoadingDevolucao, refetch: refetchMotivoDevolucao } = useQuery(
    'motivo-devolucao',
    () => fetchMotivoDevolucao(dataPesquisaInicio, dataPesquisaFim, numeroMotivoDevolucao, descricaoMotivoDevolucao),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const handleClickCadastro = () => {
    if(optionsModulos[0]?.CRIAR == 'True') {
      setModalCriarVisivel(true)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        html: `Acesso restrito. Por favor, <br> entre em contato com o responsável pela seção.`,
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 5000
      })
    }
  }

  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(prevPage => prevPage + 1);
    refetchMotivoDevolucao()
  }

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Motivos de Devolução"]}
        title="Motivos de Devolução"

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputFieldComponent={InputField}
        labelInputField={"Nº Motivo"}
        placeHolderInputFieldComponent={"Digite o Nº do Motivo"}
        valueInputField={numeroMotivoDevolucao}
        onChangeInputField={(e) => setNumeroMotivoDevolucao(e.target.value)}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Descrição do Motivo"}
        placeHolderInputFieldCodBarra={"Digite a descrição do Motivo"}
        valueInputFieldCodBarra={descricaoMotivoDevolucao}
        onChangeInputFieldCodBarra={(e) => setDescricaoMotivoDevolucao(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Inserir Motivo"}
        onButtonClickCadastro={handleClickCadastro}
        corCadastro={"success"}
        IconCadastro={IoIosAdd}

      />

      {tabelaVisivel && (
        <ActionListaMotivoDevolucao 
          dadosMotivoDevolucao={dadosMotivoDevolucao}
          optionsModulos={optionsModulos}
        />
      )}

      <ActionCriarMotivoDevolucaoModal
        show={modalCriarVisivel}
        handleClose={() => setModalCriarVisivel(false)}
        optionsModulos={optionsModulos}
        usuarioLogado={usuarioLogado}

      />
    </Fragment>
  )
}

