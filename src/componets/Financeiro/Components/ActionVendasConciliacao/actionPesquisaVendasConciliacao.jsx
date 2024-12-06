import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonType } from "../../../Buttons/ButtonType"
import { AiOutlineSearch } from "react-icons/ai"
import { MultSelectAction } from "../../../Select/MultSelectAction"
import { InputField } from "../../../Buttons/Input"
import { get } from "../../../../api/funcRequest"
import { getDataAtual } from "../../../../utils/dataAtual"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaVendasConciliacao } from "./actionListaVendasConciliacao"
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData"

export const ActionPesquisaVendasConciliacao = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, [])
  
  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada);

  const fetchListaVendasConciliacao = async () => {
    try {
      const urlApi = `/venda-conciliacao?idGrupo=${marcaSelecionada}&idLoja=&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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

  const { data: dadosVendasConciliacao = [], error: errorVendasConciliacao, isLoading: isLoadingVendasConciliacao, refetch } = useQuery(
    ['venda-conciliacao', marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVendasConciliacao(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false }
  );


  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value)
  }

  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  }

  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    refetch();
    // getListaVendas();
  }

  // useEffect(() => {
  //   if (isLoadingVendasConciliacao) {
  //     const swalContent = {
  //       title: 'Dados Sendo Processados...',
  //       // text: `Páginas carregadas: ${currentPage} de ${totalPages}\nPáginas restantes: ${totalPages - currentPage}`,
  //       value: currentPage,
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     };
  
  //     Swal.fire(swalContent).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.update(swalContent);
  //       }
  //     });
  //   } else {
  //     Swal.close();
  //     if (!isLoadingPesquisa) {
  //       setIsLoadingPesquisa(false);
  //     }
  //   }
  // }, [isLoadingVendasConciliacao, isLoadingPesquisa, currentPage, totalPages]);
  

  // useEffect(() => {
  //   if (isLoadingVendasConciliacao) {
  //     // preciso fazer um contador de páginas aqui currentPage é a página atual e totalPages é o total de páginas preciso de contador para ser exibido no swal
  //     Swal.fire({
  //       title:  'Carregando vendas...',
  //       text: `Páginas carregadas: ${currentPage } de ${totalPages}\nPáginas restantes: ${totalPages - currentPage}`,
  //       value: currentPage,
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     });
  //   } else {
  //     Swal.close();
  //     if (!isLoadingPesquisa) {
  //       setIsLoadingPesquisa(false);
  //     }
  //   }
  //   console.log(currentPage, totalPages)
  // }, [ isLoadingVendasConciliacao, isLoadingPesquisa, currentPage, totalPages]);
 

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Pesquisa Vendas"]}
        title="Vendas Conciliação"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Por Marca"}
        optionsMarcas={[
          { value: '0', label: 'Selecione uma Marca' },
          ...optionsMarcas.map((item) => ({
            value: item.IDGRUPOEMPRESARIAL,
            label: item.DSGRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}


        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: '0', label: 'Selecione uma loja' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={[empresaSelecionada[0]]}
        onChangeMultSelectEmpresa={handleEmpresaChange}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

      />

      {tabelaVisivel && (
        <ActionListaVendasConciliacao dadosVendasConciliacao={dadosVendasConciliacao} />
      )}
    </Fragment>
  )
}
