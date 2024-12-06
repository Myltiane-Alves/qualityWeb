import { Fragment, useEffect, useState } from "react";
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonSearch } from "../../../Buttons/ButtonSearch"
import { InputField } from "../../../Buttons/Input"
import { getDataAtual, getDataDoisMesesAtras } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { AiOutlineSearch } from "react-icons/ai";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionListaPedidos } from "./actionListaPedidos";
import { ActionPDFPedidoResumido } from "./comprasActionPDFPedidoResumido";
import { ActionPDFPedidoDetalhado } from "./comprasActionPDFPedidoDetalhado";
import { ActionListaProdutosCriados } from "./actionListaProdutosCriados";

export const ActionComprasADMHome = () => {
  const [actionHome, setActionHome] = useState(true)
  const [actionBTN, setActionBTN] = useState(true)
  const [actionListaPedidos, setActionListaPedidos] = useState(true)
  const [actionPedidoResumido, setActionPedidoResumido] = useState(false)
  const [actionPedidoDetalhado, setActionPedidoDetalhado] = useState(false)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [dadosFonecedores, setDadosFonecedores] = useState([]);
  const [dadosFabricantes, setDadosFabricantes] = useState([]);
  const [dadosMarcas, setDadosMarcas] = useState([]);
  const [dadosCompradores, setDadosCompradores] = useState([]);
  const [dadosPedidos, setDadosPedidos] = useState([]);
  const [dadosPedidoResumido, setDadosPedidoResumido] = useState([]);
  const [dadosPedidosDetalhados, setDadosPedidosDetalhados] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [compradorSelecionado, setCompradorSelecionado] = useState('');
  const [numeroPedido, setNumeroPedido] = useState('');
  const [dadosListaProdutosCriados, setDadosListaProdutosCriados] = useState([]);
  const [actionProdutosCriados, setActionProdutosCriados] = useState(false);

  useEffect(() => {
    const dataInicial = getDataDoisMesesAtras();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
    getListFornecedores();
    getListFabricantes();
    getListMarcas();
    getListCompradores();
    getListaPedidos();
  }, [])

  const getListFornecedores = async () => {
    try {
      const response = await get('/fornecedores');
      setDadosFonecedores(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListFabricantes = async () => {
    try {
      const response = await get('/fabricantes');
      setDadosFabricantes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListMarcas = async () => {
    try {
      const response = await get('/marcasLista');
      setDadosMarcas(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListCompradores = async () => {
    try {
      const response = await get('/compradores');
      setDadosCompradores(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListaPedidos = async () => {
    if(dataPesquisaInicio && dataPesquisaFim ) {
      try {
       const response = await get(`/listaPedidos?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFornPesquisa=${fornecedorSelecionado}&idMarcaPesquisa=${marcaSelecionada}&NuPedidoPesquisa=${numeroPedido}`)
       if (response.data) {
         setDadosPedidos(response.data)
         setDadosPedidoResumido(response.data)
 
       }
      } catch (error) {
       console.log(error, "não foi possivel pegar os dados da tabela ")
      }

    }
  }

  const getListaPedidosDetalhados = async () => {
    try {
      const response = await get(`/listaPedidosDetalhado?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idFornecedor=${fornecedorSelecionado}&idMarca=${marcaSelecionada}&idPedido=${numeroPedido}`)
      if (response.data) {
        setDadosPedidosDetalhados(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const getListaProdutosCriados = async () => {
    try {
        const response = await get(`/listaProdutoCriadoPedidoCompra?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`)
        if (response.data) {
          setDadosListaProdutosCriados(response.data)
        }
    } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleSelectFornecedor = (e) => {
    setFornecedorSelecionado(e.value);
  }

  const handleSelectFabricante = (e) => {
    setFabricanteSelecionado(e.value);
  }

  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  }

  const handleSelectComprador = (e) => {
    setCompradorSelecionado(e.value);
  }

  const handleClick = () => {
    setActionListaPedidos(true);
    getListaPedidos();
  }

  const handleClickRelatorioResumido = () => {
    setActionPedidoResumido(true);
    setActionPedidoDetalhado(false);
    setActionListaPedidos(false);
    setActionProdutosCriados(false);
    setActionHome(false);
    setActionBTN(false);
    getListaPedidos();
  }

  const handleClickRelatorioDetalhado = () => {
    setActionPedidoDetalhado(true);
    setActionPedidoResumido(false);
    setActionHome(false);
    setActionProdutosCriados(false);
    setActionListaPedidos(false);
    setActionBTN(false);
    getListaPedidosDetalhados();
  }
  
  const handleClickRelatorioProdutosCriados = () => {
    setActionProdutosCriados(true);
    setActionPedidoDetalhado(false);
    setActionPedidoResumido(false);
    setActionListaPedidos(false);
    setActionBTN(true);

    getListaProdutosCriados();
  }

  return (
    <Fragment>

      {actionHome && (
        <ActionMain
          linkComponentAnterior={["Home"]}
          linkComponent={["Tela Principal"]}
          title="Tela Principal"
          subTitle="Dashboard de Compras"

          InputFieldDTInicioComponent={InputField}
          labelInputFieldDTInicio={"Data Início"}
          valueInputFieldDTInicio={dataPesquisaInicio}
          onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

          InputFieldDTFimComponent={InputField}
          labelInputFieldDTFim={"Data Fim"}
          valueInputFieldDTFim={dataPesquisaFim}
          onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

          InputSelectMarcasComponent={InputSelectAction}
          labelSelectMarcas={"Marcas"}
          optionsMarcas={[
            { value: '', label: 'Selecione a Marca' },
            ...dadosMarcas.map(item => ({
              value: item.IDGRUPOEMPRESARIAL,
              label: item.DSGRUPOEMPRESARIAL
            }))
          ]}
          valueSelectMarcas={marcaSelecionada}
          onChangeSelectMarcas={handleSelectMarca}

          InputSelectEmpresaComponent={InputSelectAction}
          labelSelectEmpresa={"Fornecedor"}
          optionsEmpresas={[
            { value: '', label: 'Selecione o Fornecedor' },
            ...dadosFonecedores.map(item => ({
              value: item.IDFORNECEDOR,
              label: `${item.IDFORNECEDOR} - ${item.NOFANTASIA} - ${item.NUCNPJ} - ${item.NORAZAOSOCIAL}`
            }))
          ]}
          valueSelectEmpresa={fornecedorSelecionado}
          onChangeSelectEmpresa={handleSelectFornecedor}

          InputSelectGrupoComponent={InputSelectAction}
          labelSelectGrupo={"Comprador"}
          optionsGrupos={[
            { value: '', label: 'Selecione o Comprador' },
            ...dadosCompradores.map(item => ({
              value: item.IDFUNCIONARIO,
              label: `${item.IDFUNCIONARIO} - ${item.NOFUNCIONARIO}`
            }))
          ]}
          valueSelectGrupo={compradorSelecionado}
          onChangeSelectGrupo={handleSelectComprador}


          InputSelectFabricanteComponent={InputSelectAction}
          labelSelectFabricantes={"Fabricante"}
          optionsFabricantes={[
            { value: '', label: 'Selecione o Fabricante' },
            ...dadosFabricantes.map(item => ({
              value: item.IDFABRICANTE,
              label: item.DSFABRICANTE
            }))
          ]}
          valueSelectFabricantes={fabricanteSelecionado}
          onChangeSelectFabricantes={handleSelectFabricante}

          InputFieldComponent={InputField}
          labelInputField={"Nº Pedido"}
          placeHolderInputFieldComponent={"Digite o Nº Pedido"}
          valueInputField={numeroPedido}
          onChangeInputField={e => setNumeroPedido(e.target.value)}

          ButtonSearchComponent={ButtonSearch}
          linkNomeSearch={"Atualizar Dados"}
          onButtonClickSearch={handleClick}
        />
      )}

      {actionBTN && ( 
        <div className="row p-1 mb-2" style={{width: '75%'}}>
        

          <ButtonType
            textButton="Relatório Resumido"
            onClickButtonType={handleClickRelatorioResumido}
            cor="primary"
            Icon={AiOutlineSearch}
            iconColor="white"
            iconSize={16}
          />
        
          <ButtonType
            Icon={AiOutlineSearch}
            iconSize={16}
            textButton="Relatório Detalhado"
            cor="secondary"
            tipo="button"
            onClickButtonType={handleClickRelatorioDetalhado}
          />
    

          <ButtonType
            textButton="Produtos Criados"
            onClickButtonType={handleClickRelatorioProdutosCriados}
            cor="info"
            Icon={AiOutlineSearch}
            iconColor="white"
            iconSize={16}
          />
          

        </div>
      )}

      {!actionPedidoResumido && actionListaPedidos && actionHome && (
        <Fragment>
        <ActionListaPedidos dadosPedidos={dadosPedidos} />
        </Fragment>
      )}

      {/* preciso que ActionPDFPedidoResumido esteja visivel as outras não esteja visivel quando for clicado no button resumo relatorio */}
      {actionPedidoResumido && (
        <ActionPDFPedidoResumido dadosPedidoResumido={dadosPedidoResumido} />
      )}

      {actionPedidoDetalhado && (
        <ActionPDFPedidoDetalhado dadosPedidosDetalhados={dadosPedidosDetalhados}/>
      )}

      {actionProdutosCriados && (
        <ActionListaProdutosCriados dadosListaProdutosCriados={dadosListaProdutosCriados}/>
      )}
    </Fragment>
  )

}