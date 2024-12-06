import React, { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaCliente } from "./actionListaCliente";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaCliente = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [dsCliente, setDsCliente] = useState('');
  const [tipoClienteSelecionado, setTipoClienteSelecionado] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
  
 
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    ['listaEmpresaComercial', marcaSelecionada],
    async () => {
      if (marcaSelecionada) {
        const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
        return response.data;
      } else {
        return [];
      }
    },
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );
  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
  }, [marcaSelecionada, refetchEmpresas]); 

  const fetchListaCliente = async () => {
    try {
      
      const urlApi = `/lista-cliente?idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descCliente=${dsCliente}&cpf=${cpfCnpj}&tpCliente=${tipoClienteSelecionado}&status=${statusSelecionado}`;
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

  const { data: dadosCliente = [], error: erroCliente, isLoading: isLoadingCliente, refetch: refetchListaCliente } = useQuery(
    'lista-cliente',
    () => fetchListaCliente(marcaSelecionada, empresaSelecionada, dsCliente, cpfCnpj, tipoClienteSelecionado, statusSelecionado, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

 
  
  const handleChangeEmpresa = (e) => {
    const selectedEmpresa = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(selectedEmpresa.NOFANTASIA);
    setEmpresaSelecionada(e.value);
  }


  const handleChangeMarca = (e) => {
    setMarcaSelecionada(e.value);
  }

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value);
  }

  const handleChangeTipoCliente = (e) => {
    const selectedId = e.value;
    if (selectedId) {
      setTipoClienteSelecionado(selectedId);
    }
  }

  const handleClick = () => {
    setCurrentPage(+1)
    refetchListaCliente();
    setTabelaVisivel(false)
  }


  const tipoCliente = [
    { id: 1, value: "", label: "Selecione o Tipo do Cliente" },
    { id: 2, value: "FISICA", label: "FISÍCA" },
    { id: 3, value: "JURIDICA", label: "JURÍDICA" },
  ]

  const situacaoStatus = [
    { id: 1, value: "", label: "Selecione o Status" },
    { id: 2, value: "True", label: "ATIVO" },
    { id: 3, value: "False", label: "INATIVO" },

  ]

  return (

    <Fragment>

     <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Clientes"]}
        title="Listagem de Clientes"
        subTitle={empresaSelecionadaNome}
        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Empresa"}
        optionsEmpresas={[
          {value: '', label: 'Selecione uma empresa'},
          ...optionsEmpresas.map((item) => ({
            value: item.IDEMPRESA,
            label: item.NOFANTASIA
          
          }))
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          {value: '', label: 'Selecione uma Marca'},
          ...optionsMarcas.map((item) => ({
            value: item.IDGRUPOEMPRESARIAL,
            label: item.GRUPOEMPRESARIAL
          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleChangeMarca}

        InputFieldComponent={InputField}
        labelInputField={"Cliente"}
        valueInputField={dsCliente}
        onChangeInputField={e => setDsCliente(e.target.value)}

        InputFieldVendaCPFCNPJComponent={InputField}
        labelInputFieldVendaCPFCNPJ={"CPF/CNPJ"}
        valueInputFieldVendaCPFCNPJ={cpfCnpj}
        onChangeInputFieldVendaCPFCNPJ={e => setCpfCnpj(e.target.value)}

        InputSelectTipoPedido={InputSelectAction}
        labelSelectTipoPedido={"Tipo Cliente"}
        optionsTipoPedido={tipoCliente.map((item) => ({
          value: item.value,
          label: item.label
        }))}
        valueSelectTipoPedido={tipoClienteSelecionado}
        onChangeSelectTipoPedido={handleChangeTipoCliente}

        InputSelectSituacaoComponent={InputSelectAction}
        labelSelectSituacao={"Status"}
        optionsSituacao={situacaoStatus.map((item) => ({
          value: item.value,
          label: item.label
        }))}
        valueSelectSituacao={statusSelecionado}
        onChangeSelectSituacao={handleChangeStatus}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />
   
   
      <ActionListaCliente dadosCliente={dadosCliente} />

    </Fragment>
  )
}
