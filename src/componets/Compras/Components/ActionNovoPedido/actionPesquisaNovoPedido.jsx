import { Fragment, useEffect, useState } from "react"
import { ResultadoResumo } from "../../../ResultadoResumo/ResultadoResumo"
import { InputField } from "../../../Buttons/Input"
import { InputSelect } from "../../../Inputs/InputSelect"

import { ActionMain } from "../../../Actions/actionMain"
import { get } from "../../../../api/funcRequest"
import { ActionMainNovoPedido } from "../../../Actions/ActionMainNovoPedido"
import { InputFieldAction } from "../../../Buttons/InputAction"
import { FaRegLightbulb } from "react-icons/fa"
import { MdOutlinePayment } from "react-icons/md"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ActionListaNovoPedidos } from "./actionListaNovoPedidos"
import { ActionIncluirProdutoPedidoModal } from "./actionIncluirProdutoPedidoModal"



export const ActionPesquisaNovoPedido = () => {
  const [modalCadastro, setModalCadastro] = useState(false)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [compradorSelecionado, setCompradorSelecionado] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')
  const [fiscalSelecionado, setFiscalSelecionado] = useState('')
  const [enviarSelecionado, setEnviarSelecionado] = useState('')
  const [condicoesPagamentosSelecionado, setCondicoesPagamentosSelecionado] = useState('')
  const [tipoPedidoSelecionado, setTipoPedidoSelecionado] = useState('')
  const [transportadoraSelecionada, setTransportadoraSelecionada] = useState('')
  const [freteSelecionado, setFreteSelecionado] = useState('')
  const [obsFornecedor, setObsFornecedor] = useState('')
  const [obsInterna, setObsInterna] = useState('')
  const [vendedor, setVendedor] = useState('')
  const [emailVendedor, setEmailVendedor] = useState('')
  const [desconto1, setDesconto1] = useState('')
  const [desconto2, setDesconto2] = useState('')
  const [desconto3, setDesconto3] = useState('')
  const [totalLiq, setTotalLiq] = useState('')
  const [comissao, setComissao] = useState('')

  const [dadosMarcas, setDadosMarcas] = useState([])
  const [dadosCompradores, setDadosCompradores] = useState([])
  const [dadosFornecedorProduto, setDadosFornecedorProduto] = useState([])
  const [dadosCondicaoPagamento, setDadosCondicaoPagamento] = useState([])
  const [dadosListaTodosPedidos, setDadosListaTodosPedidos] = useState([])
  const [dadosTransportadoras, setDadosTransportadoras] = useState([])
  const [dadosDetalhePedidos, setDadosDetalhePedidos] = useState([])

  useEffect(() => { 
    getListaMarcas()
    getListaCompradores()
    getListaFornecedorProduto()
    getListaCondicaoPagamento()
    getListaTodosPedidos()
    getListaTransportadoras()
    getListaDetalhePedido()
  },  [])

  const getListaMarcas = async () => {
    try {
      const response = await get('/marcasLista');
      if (response && response.data) {
        setDadosMarcas(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  const getListaCompradores = async () => {
    try {
      const response = await get('/compradores');
      if (response && response.data) {
        setDadosCompradores(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getListaFornecedorProduto = async () => {
    try {
      const response = await get('/fornecedorProduto');
      if (response && response.data) {
        setDadosFornecedorProduto(response.data);
        console.log(response.data)
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getListaCondicaoPagamento = async () => {
    try {
      const response = await get('/condicaoPagamento');
      if (response && response.data) {
        setDadosCondicaoPagamento(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  const getListaTodosPedidos = async () => {
    try {
      const response = await get('/listaTodosPedidos');
      if (response && response.data) {
        setDadosListaTodosPedidos(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getListaTransportadoras = async () => {
    try {
      const response = await get('/transportadoras');
      if (response && response.data) {
        setDadosTransportadoras(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getListaDetalhePedido = async () => {
    try {
      const response = await get('/listaDetalhePedidos');
      if (response && response.data) {
        setDadosDetalhePedidos(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  
  const optionsFiscal = [
    { value: "S", label: "Simples Nacional" },
    { value: "N", label: "Lucro Presumido" },
    { value: "R", label: "Lucro Real" },
  ]

  const optionsEnviar = [
    { value: "NE", label: "NÃO ENVIAR" },
    { value: "ET", label: "ETIQUETA" },
    { value: "AR", label: "ARQUIVO" },
  ]
  const optionsTipoPedido = [
    { value: "VESTUARIO", label: "VESTUARIO" },
    { value: "CALCADOS", label: "CALÇADOS" },
    { value: "ARTIGOS", label: "ARTIGOS" },
    { value: "ACESSORIOS", label: "ACESSÓRIOS" },
  ]
  const optionsTipoFrete = [
    { value: "PAGO", label: "PAGO - CIF" },
    { value: "APAGAR", label: "A PAGAR - FOB" },
  ]

  const handleModalCadastro = () => {
    setModalCadastro(true)
  }
  return (

    <Fragment>
      <ResultadoResumo
        cardVendas={true}      
        valorVendas="R$ 0,00"
        nomeVendas="Valor Bruto Pedido"
        IconVendas={MdOutlinePayment}
        iconSize={100}
        iconColor={"#fff"}

        cardTicketMedio={true}
        valorTicketMedio="R$ 0,00"
        nomeTicketMedio="Valor Líquido Pedido"
        IconTicketMedio={MdOutlinePayment}
        
        cardCliente={true}
        numeroCliente="0"
        nomeCliente="QTD Produtos"
        IconNumeroCliente={MdOutlinePayment} 
      />

      <ActionMainNovoPedido
        linkComponentAnterior={["Home"]}
        linkComponent={["Novo Pedido"]}
        title="Novo Pedido"
        subTitle="Nome da Loja"

        
        InputFieldDTInicioComponent={InputFieldAction}
        labelInputDTInicio={"Data Pedido"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}
        
        InputFieldDTFimComponent={InputFieldAction}
        labelInputDTFim={"Data Entrega"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}


        InputSelectCompradorComponent={InputSelect}
        labelSelectComprador={"Comprador"}
        optionsCompradores={[
          { value: "", label: "Selecione..." },
          ...dadosCompradores.map((item) => {
            return {
              value: item.IDFUNCIONARIO,
              label: item.NOFUNCIONARIO
            }
          })
        ]}
        valueSelectComprador={compradorSelecionado}
        onChangeSelectComprador={(e) => setCompradorSelecionado(e.value)}

        InputSelectMarcasComponent={InputSelect}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          { value: "", label: "Selecione..." },
          ...dadosMarcas.map((item) => {
            return {
              value: item.IDGRUPOEMPRESARIAL,
              label: item.DSGRUPOEMPRESARIAL
            }
          })
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={(e) => setMarcaSelecionada(e.target.value)}

        InputSelectFornecedorComponent={InputSelect}
        labelSelectFornecedor={"Lista Fornecedores"}
        optionsFornecedores={[
          { value: "", label: "Selecione..." },
          ...dadosFornecedorProduto.map((item) => {
            return {
              value: item.IDFORNECEDOR,
              label: `${item.NOFANTASIA} // ${item.NUCNPJ} // ${item.NORAZAOSOCIAL}`
            }
          })
        
        ]}
        valueSelectFornecedor={fornecedorSelecionado}
        onChangeSelectFornecedor={(e) => setFornecedorSelecionado(e.value)}

        InputSelectFiscalComponent={InputSelect}
        labelSelectFiscal={"Fiscal"}
        optionsFiscal={[
          { value: "", label: "Selecione..." },
          ...optionsFiscal.map((item) => {
            return {
              value: item.value,
              label: item.label
            }
          })
        
        ]}
        valueSelectFiscal={fiscalSelecionado}
        onChangeSelectFiscal={(e) => setFiscalSelecionado(e.value)}

        InputSelectEnviarComponent={InputSelect}
        labelSelectEnviar={"Enviar"}
        optionsSelectEnviar={[
          { value: "", label: "Selecione..." },
          ...optionsEnviar.map((item) => {
            return {
              value: item.value,
              label: item.label
            }
          })
        ]}
        valueSelectEnviar={enviarSelecionado}
        onChangeSelectEnviar={(e) => setEnviarSelecionado(e.value)}

        InputSelectCondicoesPagamentos={InputSelect}
        labelSelectCondicoesPagamentos={"Condições de Pagamento"}
        optionsCondicoesPagamentos={[
          { value: "", label: "Selecione..." },
          ...dadosCondicaoPagamento.map((item) => {
            return {
              value: item.IDCONDICAOPAGAMENTO,
              label: item.DSCONDICAOPAG
            }
          })
        ]}
        valueSelectCondicoesPagamentos={condicoesPagamentosSelecionado}
        onChangeSelectCondicoesPagamentos={(e) => setCondicoesPagamentosSelecionado(e.value)}

        InputFieldObsFornecedor={InputFieldAction}
        labelInputFieldObsFornecedor={"Observação  Fornecedor - Max. 450 caracteres"}
        valueInputFieldObsFornecedor={obsFornecedor}
        onChangeInputFieldObsFornecedor={(e) => setObsFornecedor(e.target.value)}

        InputFieldObsInterna={InputFieldAction}
        labelInputFieldObsInterna={"Observação Interna - Max. 450 caracteres"}
        valueInputFieldObsInterna={obsInterna}
        onChangeInputFieldObsInternas={(e) => setObsInterna(e.target.value)}

        InputSelectTipoPedido={InputSelect}
        labelSelectTipoPedido={"Tipo de Pedido"}
        optionsTipoPedido={[
          { value: "", label: "Selecione..." },
          ...optionsTipoPedido.map((item) => {
            return {
              value: item.value,
              label: item.label
            }
          })
        ]}
        valueSelectTipoPedido={tipoPedidoSelecionado}
        onChangeSelectTipoPedido={(e) => setTipoPedidoSelecionado(e.value)}

        InputFieldVendedor={InputFieldAction}
        labelInputFieldVendedor={"Vendedor"}
        valueInputFieldVendedor={vendedor}
        onChangeInputFieldVendedor={(e) => setVendedor(e.target.value)}

        InputFieldEmailVendedor={InputFieldAction}
        labelInputFieldEmailVendedor={"Email do Vendedor"}
        valueInputFieldEmailVendedor={emailVendedor}
        onChangeInputFieldEmailVendedor={(e) => setEmailVendedor(e.target.value)}

        InputFieldDescontoComponent1={InputFieldAction}
        labelInputFieldDesconto1={"Desconto I(%)"}
        valueInputFieldDesconto1={desconto1}
        onChangeInputFieldDesconto1={(e) => setDesconto1(e.target.value)}

        InputFieldDescontoComponent2={InputFieldAction}
        labelInputFieldDesconto2={"Desconto II(%)"}
        valueInputFieldDesconto2={desconto2}
        onChangeInputFieldDesconto2={(e) => setDesconto2(e.target.value)}

        InputFieldDescontoComponent3={InputFieldAction}
        labelInputFieldDesconto3={"Desconto III(%)"}
        valueInputFieldDesconto3={desconto3}
        onChangeInputFieldDesconto3={(e) => setDesconto3(e.target.value)}

        InputFieldTotalLiq={InputFieldAction}
        labelInputFieldTotalLiq={"Total Liquido"}
        valueInputFieldTotalLiq={totalLiq}
        onChangeInputFieldTotalLiq={(e) => setTotalLiq(e.target.value)}

        InputFieldComissao={InputFieldAction}
        labelInputFieldComissao={"Comissão (%)"}
        valueInputFieldComissao={comissao}
        onChangeInputFieldComissao={(e) => setComissao(e.target.value)}

        InputSelectTransportadora={InputSelect}
        labelSelectTransportadora={"Transportadora"}
        optionsSelectTransportadora={[
          { value: "", label: "Selecione..." },
          ...dadosTransportadoras.map((item) => {
            return {
              value: item.IDTRANSPORTADORA,
              label: `${item.NUCNPJ} - ${item.NOFANTASIA}`
            }
          })
        
        ]}
        valueSelectTransportadora={transportadoraSelecionada}
        onChangeSelectTransportadora={(e) => setTransportadoraSelecionada(e.value)}

        InputSelectFreteComponent={InputSelect}
        labelSelectFrete={"Tipo Frete"}
        optionsFrete={[
          { value: "", label: "Selecione..." },
          ...optionsTipoFrete.map((item) => {
            return {
              value: item.value,
              label: item.label
            }
          })
        ]}
        valueSelectFrete={freteSelecionado}
        onChangeSelectFrete={(e) => setFreteSelecionado(e.value)}
    

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Incluir Itens"}
        onButtonClickSearch
        corSearch={"primary"}
        

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Fechar Pedido"}
        onButtonClickCancelar={""}
        corCancelar={"danger"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Novo Pedido"}
        onButtonClickCadastro={handleModalCadastro}
        corCadastro={"success"}
      />

      <ActionListaNovoPedidos 
        dadosDetalhePedidos={dadosDetalhePedidos} 
      />

      <ActionIncluirProdutoPedidoModal
        show={modalCadastro}
        handleClose={() => setModalCadastro(false)}
      />
    </Fragment>
  )
}