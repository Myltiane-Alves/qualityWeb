import { Fragment, useEffect, useMemo, useState } from "react";
import { ResultadoResumo } from "../../ResultadoResumo/ResultadoResumo";
import { ActionMain } from "../../Actions/actionMain";
import { InputSelectAction } from "../../Inputs/InputSelectAction";
import { InputField } from "../../Buttons/Input";
import { ButtonSearch } from "../../Buttons/ButtonSearch";
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
import { ActionListaConvenioDescontoFuncionario } from "../Components/ActionListaVendasConvenio/actionListaConvenioDescontoFuncionario";
import { ButtonType } from "../../Buttons/ButtonType";
import { ActionListaVendasDescontoFuncionario } from "./actionListaVendasDescontoFuncionario";
import { ActionListaVendasConvenioDesconto } from "./actionListaVendasConvenioDesconto";
import { ActionListaVendasVoucherLancado } from "./actionListaVendasVoucherLancados";
import { ActionListaDespesasLancada } from "./actionListaDespesasLancadas";
import { ActionListaFaturasLancada } from "./actionListaFaturasLancadas";
import { ActionListaFechamentoDosCaixas } from "./actionListaFechamentoDosCaixas";

export const ResumoDashBoardAdministrativo = () => {
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [dadosEmpresas, setDadosEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [dadosResumoVendas, setDadosResumoVendas] = useState([]);
  const [dadosMovimentacaoCaixaDoDia, setDadosMovimentacaoCaixaDoDia] = useState([]);
  const [dadosVendasPCJ, setDadosVendasPCJ] = useState([])
  const [dadosCaixaFechados, setDadosCaixaFechados] = useState([])
  const [dadosVendasVendedor, setDadosVendasVendedor] = useState([])
  const [dadosVendasAtivas, setDadosVendasAtivas] = useState([])
  const [dadosVendasCanceladas, setDadosVendasCanceladas] = useState([])
  const [dadosVendas, setDadosVendas] = useState([])
  const [dadosVendasConvenioFuncionario, setDadosVendasConvenioFuncionario] = useState([])
  const [dadosDetalheFaturaLancadas, setDadosDetalheFaturaLancadas] = useState([])
  const [dadosDetalheDespesas, setDadosDetalheDespesas] = useState([])
  const [dadosDespesaLoja, setDadosDespesaLoja] = useState([])
  const [dataPesquisa, setDataPesquisa] = useState('')
  const [dadosDetalheVoucher, setDadosDetalheVoucher] = useState([])
  const [dadosVendasConvenioDesconto, setDadosVendasConvenioDesconto] = useState([])
  const [dadosExtratoLojaPeriodo, setDadosExtratoLojaPeriodo] = useState([])
  const [dadosExtratoQuebra, setDadosExtratoQuebra] = useState([])
  const [dadosTotalDepositos, setDadosTotalDepositos] = useState([])
  const [dadosTotalFaturas, setDadosTotalFaturas] = useState([])
  const [dadosTotalDespesas, setDadosTotalDespesas] = useState([])
  const [dadosTotalAdiantamentos, setDadosTotalAdiantamentos] = useState([])
  const [dadosAjusteExtrato, setDadosAjusteExtrato] = useState([])
  const [dadosExtratoLoja, setDadosExtratoLoja] = useState([])
  const [dadosQuebraCaixa, setDadosQuebraCaixa] = useState([])
  const [dadosAdiantamentoSalarial, setDadosAdiantamentoSalarial] = useState([])

  // Início Lista de Empresas
  useEffect(() => {
    const dataAtual =  getDataAtual()
    setDataPesquisa(dataAtual)
    getTodasEmpresas();
  }, []);
  
  const getTodasEmpresas = async () => {
    try {
      const response = await get("/empresas",)
      if (response.data) {
        setDadosEmpresas(response.data)
      }
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  
  
  const getListaAdiantamentoSalaria = async (empresaSelecionada) => {
    try {
      const response = await get(`/adiantamentos-salarial?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosAdiantamentoSalarial(response.data)
      }
      return response.data;
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, listaCaixasFechados")
    }
  }
  const getListaCaixaMovimento = async (empresaSelecionada) => {
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

  const getListaQuebraCaixa = async (empresaSelecionada) => {
    try {
      const response = await get(`/quebra-caixa-loja?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosQuebraCaixa(response.data)
      }
      return response.data;
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, listaCaixasFechados")
    }
  }

  const getListaVendasVendedor = async (empresaSelecionada) => {
    try {
      const response = await get(`/vendaVendedor?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosVendasVendedor(response.data);
      }
      return response.data;    
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }
  }

  const getListaVendasAtivas = async (empresaSelecionada) => {
    try {
      const response = await get(`/vendaAtivaResumo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosVendasAtivas(response.data);
      }
      return response.data;  
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }
  }

  const getListaVendasCanceladas = async (empresaSelecionada) => {
    try {
      const response = await get(`/vendaCanceladaResumo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosVendasCanceladas(response.data);
      }
      return response.data;    
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }
  }

  const getDetalheVoucher = async (empresaSelecionada) => {
    try {
      const response = await get(`/detalheVoucher?idEmpresa=${empresaSelecionada}&datapesq=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosDetalheVoucher(response.data);   
      }
      return response.data;     
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }
  }

  const getVendasConvenio = async (empresaSelecionada) => {
    try {
        const response = await get(`/resumoVendaConvenioDesc?idEmpresa=${empresaSelecionada}&dataInicio=${dataPesquisa}&dataFechamento=${dataPesquisa}`);
        if (response.data && response.data.length > 0) {
          setDadosVendasConvenioDesconto(response.data);
        }
        return response.data;
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }

  }
  
  const getVendasConvenioFuncionario = async (empresaSelecionada) => {
    try {
      const response = await get(`/resumoVendaConvenioDesc?idEmpresa=${empresaSelecionada}&dataInicio=${dataPesquisa}&dataFechamento=${dataPesquisa}`);
      if (response.data && response.data.length > 0) {
        setDadosVendasConvenioFuncionario(response.data);   
      }
      return response.data;     
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
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

  const getListaCaixaFechados = async (empresaSelecionada) => {

    try {
      const response = await get(`/listaCaixasFechados?idEmpresa=${empresaSelecionada}&dataFechamento=${dataPesquisa}`);
      if (response.data ) {
        setDadosCaixaFechados(response.data)
      }
      return response.data;
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, listaCaixasFechados")
    }
  }

  const getDetalheFaturaLancadas = async (empresaSelecionada) => {
    try {  
      const response = await get(`/detalheFatura?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisa}&dataPesquisaFim=${dataPesquisa}`);
      if (response.data) {
        setDadosDetalheFaturaLancadas(response.data);
      }
      return response.data;
      
    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }

  }

  const getResumoVendas = async () => {
    try {
      const response = await get(`/resumoVenda?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      if (response.data) {
        setDadosResumoVendas(response.data); 
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar resumo das vendas: ', error);
    }
  };

  const getListaDespesasLoja = async () => {
    try {
      const response = await get(`/despesasLojaADM?idEmpresa=${empresaSelecionada}&dataPesquisa=${dataPesquisa}`);
      if (response.data) {
        setDadosDespesaLoja(response.data); 
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar resumo das vendas: ', error);
    }
  };

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
    getResumoVendas()
    getListaDespesasLoja()
    getListaCaixaMovimento(empresaSelecionada)
    getListaVendasVendedor(empresaSelecionada)
    getListaVendasAtivas(empresaSelecionada)
    getListaVendasCanceladas(empresaSelecionada)
    getDetalheVoucher(empresaSelecionada)
    getVendasConvenio(empresaSelecionada)
    getListaSaldoExtratoLoja()
    getListaCaixaFechados(empresaSelecionada)
    getDetalheFaturaLancadas(empresaSelecionada)
    getVendasConvenioFuncionario(empresaSelecionada)
    getListaQuebraCaixa(empresaSelecionada)
    getListaAdiantamentoSalaria(empresaSelecionada)
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
        <div style={{marginTop: '8rem'}}>

          <ResultadoResumo
            nomeVendas="Vendas Loja"
            cardVendas={true}
            valorVendas={formatMoeda(toFloat(dados[0]?.totalVenda)) }
            IconVendas={AiOutlineUser}
            // IconVendas={MdOutlinePayment}
            
            nomeTicketMedio="Ticket Médio"
            cardTicketMedio={true}
            valorTicketMedio={formatMoeda(toFloat(dados[0]?.VRTICKETWEB)) }
            IconTicketMedio={FaRegLightbulb}
            
            nomeCliente="Clientes"
            cardCliente={true}
            numeroCliente={toFloat(dados[0]?.QTDVENDAS)}
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
          
        </div>
      )}
    </Fragment>
  )
}