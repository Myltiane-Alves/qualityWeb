import { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType"
import { AiOutlineSearch } from "react-icons/ai"
import { InputField } from "../../../Buttons/Input"
import { ActionMain } from "../../../Actions/actionMain"
import { getDataAtual } from "../../../../utils/dataAtual"
import { IoIosAdd } from "react-icons/io"
import { get } from "../../../../api/funcRequest"
import { ActionListaMotivoDevolucao } from "./actionListaMotivoDevolucao"
import { ActionCriarMotivoDevolucaoModal } from "./actionCriarMotivoDevolucaoModal"
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"

export const ActionPesquisaMotivoDevolucao = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  // const [dadosMotivoDevolucao, setDadosMotivoDevolucao] = useState([]);
  const [numeroMotivoDevolucao, setNumeroMotivoDevolucao] = useState('')
  const [descricaoMotivoDevolucao, setDescricaoMotivoDevolucao] = useState('')
  const [clickContador, setClickContador] = useState(0)
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

  // const getListaMotivoDevolucao = async () => {
  //   try {
  //     const response = await get(`/motivo-devolucao?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMotivo=${numeroMotivoDevolucao}&descricaoMotivo=${descricaoMotivoDevolucao}`)
  //     if (response.data) {
  //       setDadosMotivoDevolucao(response.data)
  //     }
  //     return response.data
  //   } catch (error) {
  //     console.log(error, "não foi possivel pegar os dados da tabela ")
  //   }
  // }


  const handleClick = () => {
    
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    refetchMotivoDevolucao()

    
  }

  const handleClickModalCriar = () => {
    setModalCriarVisivel(true)
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
        onButtonClickCadastro={handleClickModalCriar}
        corCadastro={"success"}
        IconCadastro={IoIosAdd}

      />

      {tabelaVisivel && (
        <ActionListaMotivoDevolucao dadosMotivoDevolucao={dadosMotivoDevolucao} />
      )}

      <ActionCriarMotivoDevolucaoModal
        show={modalCriarVisivel}
        handleClose={() => setModalCriarVisivel(false)}

      />
    </Fragment>
  )
}

