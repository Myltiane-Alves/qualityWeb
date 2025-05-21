import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { getDataAtual, getDataDoisMesesAtras } from "../../../../utils/dataAtual"
import { get } from "../../../../api/funcRequest"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaPedidoCompra } from "./actionListaPedidoCompra"
import { AiOutlineSearch } from "react-icons/ai"
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento"
import { useFetchData } from "../../../../hooks/useFetchData"


export const ActionPesquisaPedidoCompra = () => {
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [numeroPedido, setNumeroPedido] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataDoisMesesAtras();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  
  }, [])

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsFornecedores = [], error: errorFornecedores, isLoading: isLoadingFornecedores } = useFetchData('fornecedores', '/fornecedores');

  const fetchPedidosCompras = async () => {
    try {
      
      const urlApi = `/pedido-compras?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFornecedor=${fornecedorSelecionado}&idMarca=${marcaSelecionada}&numeroPedido${numeroPedido}`;
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

  const { data: dadosPedidosCompras = [], error: errorPedidosCompras, isLoading: isLoadingPedidosCompras, refetch: refetchPedidosCompras } = useQuery(
    ['pedido-compras', dataPesquisaInicio, dataPesquisaFim, fornecedorSelecionado, marcaSelecionada, numeroPedido, currentPage, pageSize],
    () => fetchPedidosCompras(dataPesquisaInicio, dataPesquisaFim, fornecedorSelecionado, marcaSelecionada, numeroPedido, currentPage, pageSize),
    { enabled: true, staleTime: 5 * 60 * 1000 }
  );

  const handleSelectFornecedor = (e) => {
    const selectId = e.value
    if (selectId) {
      setFornecedorSelecionado(selectId)
    }
  }

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value)
  }

  const handleClick = () => {
    setIsLoadingPesquisa(true);
    setCurrentPage(prePage => prePage + 1);
    refetchPedidosCompras()
  }


  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Pedidos"]}
        title="Pedidos de Compras"
        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          // { value: '', label: 'Selecione uma loja' },
          ...optionsMarcas.map((marca) => ({
            value: marca.IDGRUPOEMPRESARIAL,
            label: marca.GRUPOEMPRESARIAL
          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        InputSelectFornecedorComponent={InputSelectAction}
        labelSelectFornecedor={"Por Fornecedor"}
        optionsFornecedores={[
          { value: '', label: 'Selecione um fornecedor' },
          ...optionsFornecedores.map((fornecedor) => ({
            value: fornecedor.IDFORNECEDOR,
            label: `${fornecedor.NORAZAOSOCIAL} - ${fornecedor.NUCNPJ} - ${fornecedor.DSFORNECEDOR}`
          }))
        ]}
        onChangeSelectFornecedor={handleSelectFornecedor}
        valueSelectFornecedor={fornecedorSelecionado}

        InputFieldComponent={InputField}
        labelInputField={"N° Pedido"}
        placeHolderInputFieldComponent={"N° Pedido"}
        valueInputField={numeroPedido}
        onChangeInputField={(e) => setNumeroPedido(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Atualizar Dados"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

   
      <ActionListaPedidoCompra dadosPedidosCompras={dadosPedidosCompras} />
     

    </Fragment>
  )
}