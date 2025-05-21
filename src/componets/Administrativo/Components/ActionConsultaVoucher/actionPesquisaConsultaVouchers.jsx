import React, { Fragment, useState, useEffect } from "react"
import { get } from "../../../../api/funcRequest";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaConsultaVouchers } from "./actionListaConsultaVouchers";
import { getDataAtual } from "../../../../utils/dataAtual";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";


export const ActionPesquisaConsultaVouchers = () => {
  // const [dadosVoucher, setDadosVoucher] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [pesquisaVendas, setPesquisaVendas] = useState(false)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [numeroVoucher, setNumeroVoucher] = useState(0);
  const [numeroVoucherDados, setNumeroVoucherDados] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000)

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
   
    // getDetalheVoucherDados(dataPesquisaInicio, dataPesquisaFim)
    // getDetalheNumeroVoucherDados()
   
  }, []);



  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { enabled: true, staleTime: 5 * 60 * 1000 }
  );
  

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    'listaEmpresaComercial',
    async () => {
      const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
      
      return response.data;
    },
    {enabled: false, staleTime: 5 * 60 * 1000, }
  );
  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
  }, [marcaSelecionada, refetchEmpresas]);


  // const getDetalheVoucherDados = async () => {

  //   try {
  //     const response = await get(`/detalheVoucherDados?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idSubGrupoEmpresa=${marcaSelecionada}&idEmpresa=${empresaSelecionada}`)
  //     if (response.data) {
  //       setDadosVoucher(response.data)
  //     }
  //     return response.data
  //   } catch (error) {
  //     console.log(error, "não foi possivel pegar os dados da tabela ")
  //   }

  // }

   const fetchListaVouchers = async () => {
      try {
        
        const urlApi = `/voucher-completo?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idSubGrupoEmpresa=${marcaSelecionada}&idEmpresa=${empresaSelecionada}`;
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
     
    const { data: dadosVoucher = [], error: errorVendasMarca, isLoading: isLoadingVendasMarca, refetch: refetchDetalheVoucherDados } = useQuery(
      ['voucher-completo',  empresaSelecionada, marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
      () => fetchListaVouchers(empresaSelecionada, marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
      {
        enabled: false, 
      }
    );

  const optionsTroca = [
    { value: '0', label: 'CORTESIA' },
    { value: '1', label: 'DEFEITO' },
  ]

  const optionsSatus = [
    { value: '0', label: 'NOVO' },
    { value: '1', label: 'EM ANALISE' },
    { value: '2', label: 'LIBERADO PARA O CLIENTE' },
    { value: '3', label: 'FINALIZADO' },
    { value: '4', label: 'NEGADO' },
    { value: '5', label: 'CANCELADO' },
  ]


  const handleSelectGrupo = (e) => {
    setMarcaSelecionada(e.value);
  };


  const handleSelectEmpresa = (e) => {
    const empresa = optionsEmpresas.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value)
    setEmpresaSelecionadaNome(empresa.NOFANTASIA)
  }

  const handleClick = () => {
    setTabelaVisivel(true)
    refetchDetalheVoucherDados()
    
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vouchers"]}
        title="Vouchers Emitidos"
        subTitle={empresaSelecionadaNome}

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
          { value: '0', label: 'Selecionar Marca' },
            ...optionsMarcas.map((marca) => {
            return {
              
              value: marca.IDGRUPOEMPRESARIAL,
              label: marca.GRUPOEMPRESARIAL,
            }
          })
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectGrupo}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Lojas"}
        optionsEmpresas={[
          {value: '', label: 'Todas'},
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        InputFieldNumeroVoucherComponent={InputField}
        labelInputFieldNumeroVoucher={"Voucher - Nº Venda ou CPF/CNPJ"}
        onChangeInputFieldNumeroVoucher={(e) => setNumeroVoucher(e.target.value)}
        valueInputFieldNumeroVoucher={numeroVoucher}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      
      <ActionListaConsultaVouchers dadosVoucher={dadosVoucher} />
      

    </Fragment>
  )
}


