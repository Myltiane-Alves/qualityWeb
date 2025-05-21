import { Fragment, useEffect, useState } from "react";
import { ResultadoResumo } from "../../ResultadoResumo/ResultadoResumo";
import { ActionMain } from "../../Actions/actionMain";
import { InputSelectAction } from "../../Inputs/InputSelectAction";
import { InputField } from "../../Buttons/Input";
import { get } from "../../../api/funcRequest";
import { formatMoeda } from "../../../utils/formatMoeda";
import { getDataAtual } from "../../../utils/dataAtual";
import { ActionListaMovimentacaoCaixaDia } from "./actionListaMovimentacaoCaixaDia";
import { ActionListaVendasPCJ } from "./actionListaVendasPCJ";
import { ActionListaVendasVendedor } from "./actionListaVendasVendedor";
import { ActionListaVendasAtivas } from "./actionListaVendasAtivas";
import { ActionListaVendasCanceladas } from "./actionListaVendasCanceladas";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { toFloat } from "../../../utils/toFloat";
import { BsGem } from "react-icons/bs";
import { FaCashRegister, FaRegLightbulb } from "react-icons/fa";
import { ActionListaExtratoLoja } from "./Components/ActionExtrato/actionListaExtratoLoja";
// import { ActionListaConvenioDescontoFuncionario } from "../Components/ActionListaVendasConvenio/actionListaConvenioDescontoFuncionario";
import { ButtonType } from "../../Buttons/ButtonType";
import { ActionListaVendasDescontoFuncionario } from "./actionListaVendasDescontoFuncionario";
import { ActionListaVendasConvenioDesconto } from "./actionListaVendasConvenioDesconto";
import { ActionListaVendasVoucherLancado } from "./actionListaVendasVoucherLancados";
import { ActionListaDespesasLancada } from "./actionListaDespesasLancadas";
import { ActionListaFaturasLancada } from "./actionListaFaturasLancadas";
import { ActionListaFechamentoDosCaixas } from "./actionListaFechamentoDosCaixas";
import { useFetchData } from "../../../hooks/useFetchData";
import { useQuery } from "react-query";

export const ResumoDashBoardAdministrativo = () => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [dadosMovimentacaoCaixaDoDia, setDadosMovimentacaoCaixaDoDia] = useState([]);
  const [dadosVendasPCJ, setDadosVendasPCJ] = useState([])
  const [dadosVendas, setDadosVendas] = useState([])
  const [dadosDetalheDespesas, setDadosDetalheDespesas] = useState([])
  const [dataPesquisa, setDataPesquisa] = useState('')
  const [dadosExtratoLojaPeriodo, setDadosExtratoLojaPeriodo] = useState([])
  const [dadosExtratoQuebra, setDadosExtratoQuebra] = useState([])
  const [dadosTotalDepositos, setDadosTotalDepositos] = useState([])
  const [dadosTotalFaturas, setDadosTotalFaturas] = useState([])
  const [dadosTotalDespesas, setDadosTotalDespesas] = useState([])
  const [dadosTotalAdiantamentos, setDadosTotalAdiantamentos] = useState([])
  const [dadosAjusteExtrato, setDadosAjusteExtrato] = useState([])
  const [dadosExtratoLoja, setDadosExtratoLoja] = useState([])


  useEffect(() => {
    const dataAtual =  getDataAtual()
    setDataPesquisa(dataAtual)
  }, []);
  
  const { data: dadosEmpresas = [], } = useFetchData('empresas', '/empresas');

  const { data: dadosAdiantamentoSalarial = [], error: errorFuncionarios, isLoading: isLoadingFuncionarios, refetch: refetchAdiantamento } = useQuery(
    'adiantamentos-salarial',
    async () => {
      const response = await get(`/adiantamentos-salarial?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosQuebraCaixa = [], error: errorQuebra, isLoading: isLoadingQuebra, refetch: refetchQuebra } = useQuery(
    'quebra-caixa-loja-resumo',
    async () => {
      const response = await get(`/quebra-caixa-loja-resumo?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosVendasVendedor = [], error: errorVendasVendedor, isLoading: isLoadingVendasVendedor, refetch: refetchVendasVendedor } = useQuery(
    'vendaVendedor',
    async () => {
      const response = await get(`/vendaVendedor?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosVendasAtivas = [], error: errorVendasAtivas, isLoading: isLoadingVendasAtivas, refetch: refetchVendasAtivas } = useQuery(
    'venda-ativa',
    async () => {
      const response = await get(`/venda-ativa?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}&statusCancelado=False`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );
 
  const { data: dadosVendasCanceladas = [], error: errorVendasCanceladas, isLoading: isLoadingVendasCanceladas, refetch: refetchVendasCanceladas } = useQuery(
    'venda-ativa',
    async () => {
      const response = await get(`/venda-ativa?statusCancelado=True&idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      console.log(response.data, "dadosVendasCanceladas")
      return response.data;
    },
    { enabled: Boolean(empresaSelecionada), staleTime: 5 * 60 * 1000, }
  );
  

  const { data: dadosDetalheVoucher = [], error: errorDetalheVouche, isLoading: isLoadingDetalheVouche, refetch: refetchDetalheVouche } = useQuery(
    'venda-ativa',
    async () => {
      const response = await get(`/detalheVoucher?idEmpresa=${empresaSelecionada}&datapesq=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosVendasConvenioDesconto = [], error: errorConvenio, isLoading: isLoadingConvenio, refetch: refetchConvenio } = useQuery(
    'resumo-venda-convenio',
    async () => {
      const response = await get(`/resumo-venda-convenio?idEmpresa=${empresaSelecionada}&dataFechamento=${dataPesquisa}&statusCancelado=False`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosVendasConvenioFuncionario = [], error: errorConvenioFuncionario, isLoading: isLoadingConvenioFuncionario, refetch: refetchConvenioFuncionario } = useQuery(
    'resumo-venda-convenio-desconto',
    async () => {
      const response = await get(`/resumo-venda-convenio-desconto?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}&statusCancelado=False`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );
 
  const { data: dadosCaixaFechados = [], error: errorCaixaFechado, isLoading: isLoadingCaixaFechado, refetch: refetchCaixaFechado } = useQuery(
    'listaCaixasFechados',
    async () => {
      const response = await get(`/listaCaixasFechados?idEmpresa=${empresaSelecionada}&dataFechamento=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosDetalheFaturaLancadas = [], error: errorFaturaLancada, isLoading: isLoadingFaturaLancada, refetch: refetchFaturaLancada } = useQuery(
    'detalheFatura',
    async () => {
      const response = await get(`/detalheFatura?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosResumoVendas = [], error: errorResumoVendas, isLoading: isLoadingResumoVendas, refetch: refetchResumoVendas } = useQuery(
    'resumoVenda',
    async () => {
      const response = await get(`/resumoVenda?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const { data: dadosDespesaLoja = [], error: errorDespesaLoja, isLoading: isLoadingDespesaLoja, refetch: refetchDespesaLoja } = useQuery(
    'despesasLojaADM',
    async () => {
      const response = await get(`/despesasLojaADM?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      return response.data;
    },
    { enabled: false, staleTime: 5 * 60 * 1000, }
  );

  const getListaCaixaMovimento = async () => {
    try {
      const response = await get(`/listaCaixasMovimento?idEmpresa=${empresaSelecionada}&dataFechamento=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosMovimentacaoCaixaDoDia(response.data)
        setDadosVendasPCJ(response.data)
      }
      return response.data;
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, listaCaixasFechados")
    }
  }

  const getListaSaldoExtratoLoja = async () => {
    try {
      const response = await get(`/extratoLojaPeriodoGerencia?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`) 
        
      if (response.data) {
        setDadosExtratoLoja(response.data[0])
        setDadosVendas(response.data)
        setDadosExtratoQuebra(response.data[0].quebracaixa)
        setDadosTotalDepositos(response.data[0].totalDepositos)
        setDadosTotalFaturas(response.data[0].totalFaturas)
        setDadosTotalDespesas(response.data[0].despesas)
        setDadosTotalAdiantamentos(response.data[0].adiantamentos)
        setDadosAjusteExtrato(response.data[0].ajusteextrato)

        setDadosExtratoLojaPeriodo(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar marcas: ', error)
    }
  }


  const dadosDespesas = dadosDespesaLoja.map((item, index) => {
    return {
      VRDESPESA: toFloat(item.VRDESPESA),
    }
  })

  const dados = dadosResumoVendas.map((item, index) => {
    // const totalVenda = 0;
    const  totalVenda = toFloat(item.VRRECDINHEIRO) + toFloat(item.VRRECCARTAO) + toFloat(item.VRRECCONVENIO) + toFloat(item.VRRECPOS) + toFloat(item.VRRECCHEQUE);
      
      return {  
      VRRECDINHEIRO: toFloat(item.VRRECDINHEIRO),
      VRRECCARTAO: toFloat(item.VRRECCARTAO),
      VRRECCONVENIO: toFloat(item.VRRECCONVENIO),
      VRRECPOS: toFloat(item.VRRECPOS),
      VRRECCHEQUE: toFloat(item.VRRECCHEQUE),
      QTDVENDAS: toFloat(item.QTDVENDAS),
      VRTICKETWEB: toFloat(item.VRTICKETWEB),
      totalVenda: totalVenda
    }
  })

  const handleSelectEmpresa = (e) => {
    const empresa = dadosEmpresas.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value)
    setEmpresaSelecionadaNome(empresa.NOFANTASIA)
  }



  const handleClick = async () => {
    setResumoVisivel(true)
    // getListaCaixaMovimento(empresaSelecionada)
    // getListaSaldoExtratoLoja()
   
    refetchResumoVendas()
    refetchDespesaLoja()
    
    
    refetchConvenio()
    refetchConvenioFuncionario()
    refetchFaturaLancada()
    refetchCaixaFechado()
    refetchVendasAtivas()
    refetchVendasCanceladas()
    refetchDetalheVouche()
    // refetchVendasVendedor()
    // refetchQuebra()
    // refetchAdiantamento()

  }


  return (
    <Fragment>
      <ActionMain
        title="Dashboard Administrativo"
        subTitle={empresaSelecionadaNome}
        linkComponentAnterior={["Home"]}
        linkComponent={["Tela Principal"]}

        InputSelectEmpresaComponent={InputSelectAction}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}

        optionsEmpresas={dadosEmpresas.map((empresa) => ({
          value: empresa.IDEMPRESA,
          label: empresa.NOFANTASIA,
        }))}
        labelSelectEmpresa={"Empresa"}

        InputFieldDTConsultaComponent={InputField}
        labelInputFieldDTConsulta="Data Consulta"
        valueDTCosulta={dataPesquisa}
        onChangeInputFieldDTConsulta={(e) => setDataPesquisa(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

    
      {resumoVisivel && ( 
        <Fragment>

          <ResultadoResumo
            nomeVendas="Vendas Loja"
            cardVendas={true}
            valorVendas={formatMoeda(dados[0]?.totalVenda) }
            IconVendas={AiOutlineUser}
            // IconVendas={MdOutlinePayment}
            
            nomeTicketMedio="Ticket Médio"
            cardTicketMedio={true}
            valorTicketMedio={formatMoeda(dados[0]?.VRTICKETWEB) }
            IconTicketMedio={FaRegLightbulb}
            
            nomeCliente="Clientes"
            cardCliente={true}
            numeroCliente={dados[0]?.QTDVENDAS }
            IconNumeroCliente={BsGem}
    
            valorDespesas={formatMoeda(toFloat(dadosDespesaLoja[0]?.VRDESPESA))}
            cardDespesas={true}  
            nomeDespesas="Despesas" 
            IconValorDespesas={FaCashRegister}
            
            
            iconSize={100}
            iconColor={"#fff"}
            dadosEmpresas={dadosEmpresas}
            dataPesquisa={dataPesquisa}
          />
      
         
            {/* Movimentação Caixa do Dia */}
            <ActionListaMovimentacaoCaixaDia 
              dadosMovimentacaoCaixaDoDia={dadosMovimentacaoCaixaDoDia} 
              dadosDespesas={dadosDespesas}
              dadosQuebraCaixa={dadosQuebraCaixa}
              dadosAdiantamentoSalarial={dadosAdiantamentoSalarial}
            />
    
            <ActionListaExtratoLoja
              dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo}
              dadosExtratoLoja={dadosExtratoLoja}
              dadosVendas={dadosVendas}
              dadosExtratoQuebra={dadosExtratoQuebra}
              dadosTotalDepositos={dadosTotalDepositos}
              dadosTotalFaturas={dadosTotalFaturas}
              dadosTotalDespesas={dadosTotalDespesas}
              dadosTotalAdiantamentos={dadosTotalAdiantamentos}
              dadosAjusteExtrato={dadosAjusteExtrato}
            />



            <ActionListaVendasPCJ dadosVendasPCJ={dadosVendasPCJ}/>
    
            <ActionListaFechamentoDosCaixas dadosCaixaFechados={dadosCaixaFechados} />
    
            {/* Vendas Vendedor */}
            <ActionListaVendasVendedor dadosVendasVendedor={dadosVendasVendedor}/>
    
            {/* Vendas Ativas */}
            <ActionListaVendasAtivas empresaSelecionada={empresaSelecionada} dadosVendasAtivas={dadosVendasAtivas}/>
    
            {/* Vendas Canceladas */}
            <ActionListaVendasCanceladas empresaSelecionada={empresaSelecionada} dadosVendasCanceladas={dadosVendasCanceladas}/> 
    
            {/* Faturas Lançadas */}
            <ActionListaFaturasLancada dadosDetalheFaturaLancadas={dadosDetalheFaturaLancadas} /> 
    
            <ActionListaDespesasLancada dadosDetalheDespesas={dadosDetalheDespesas} />
    
            <ActionListaVendasVoucherLancado dadosDetalheVoucher={dadosDetalheVoucher} />
    
            <ActionListaVendasConvenioDesconto dadosVendasConvenioDesconto={dadosVendasConvenioDesconto} />

            <ActionListaVendasDescontoFuncionario dadosVendasConvenioFuncionario={dadosVendasConvenioFuncionario} />
          
        </Fragment>
      )}
    </Fragment>
  )
}