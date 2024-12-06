import { Fragment, useEffect, useState } from "react"
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaPedidoCompra } from "./actionListaPedidoCompra";


export const ActionPesquisaDistribuicaoHistorico = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [dadosFonecedores, setDadosFonecedores] = useState([])
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')
  const [numeroPedido, setNumeroPedido] = useState('')
  const [dadosPedidosCompra, setDadosPedidosCompra] = useState([])

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFim)
    getListFornecedores()
  }, [])

  const getListFornecedores = async () => {
    try {
      const response = await get('/fornecedores');
      setDadosFonecedores(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListaPedidoCompra = async () => {
    try {
      const response = await get(`distribuicaoComprasHistorico?idFornecedor=${fornecedorSelecionado}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`)
      if (response.data) {
        setDadosPedidosCompra(response.data)
        // console.log(response.data, 'get tabelas')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleSelectFornecedor = (e) => {
    setFornecedorSelecionado(e.value);
  }

  const handleClickActionDistribuicaoCompras = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaPedidoCompra()
    } 
  }

  const handleModalVisivel = () => {
    setModalVisivel(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }
  const options = [
    { value: '1', label: 'Marca 1' },
    { value: '2', label: 'Marca 2' },
    { value: '3', label: 'Marca 3' }
  ]
  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Distruibuição de Compras"]}
        title="Analisar Histórico da Distribuição de Compras"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

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



        InputFieldComponent={InputField}
        labelInputFieldF={"Numero Pedido"}
        placeHolderInputFieldComponent={"Numero Pedido"}
        valueInputField={numeroPedido}
        onChangeInputField={(e) => setNumeroPedido(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClickActionDistribuicaoCompras}
      />

      {tabelaVisivel && (
        <ActionListaPedidoCompra dadosPedidosCompra={dadosPedidosCompra} />
        
      )}

 
    </Fragment>
  )
}
