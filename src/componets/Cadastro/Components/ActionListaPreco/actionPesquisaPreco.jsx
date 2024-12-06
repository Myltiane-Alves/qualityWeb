import { Fragment, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { get } from "../../../../api/funcRequest"
import { ButtonType } from "../../../Buttons/ButtonType"
import { getDataAtual } from "../../../../utils/dataAtual"
import { ActionListaPrecos } from "./actionListaPrecos"


export const ActionPesquisaPreco = () => {
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [clickContador, setClickContador] = useState(0);
  const [tabelaVisivel, setTabelaVisivel] = useState(true);
  const [dadosListaPedidos, setDadosListaPedidos] = useState([]);
  const [marcas, setMarcas] = useState([])
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [numeroPedido, setNumeroPedido] = useState('')
  const [nomeLista, setNomeLista] = useState('')

  useEffect(() => {
    const dataPesquisaInicio = getDataAtual();
    const dataPesquisaFim = getDataAtual()
    setDataInicio(dataPesquisaInicio)
    setDataFim(dataPesquisaFim)
    getGrupoMarca();
    getListaPrecos();
  }, [])


  const getGrupoMarca = async () => {
    try {
      const response = await get(`/empresas`)
      if (response.data) {
        setMarcas(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const getListaPrecos = async () => {
    try {
      const response = await get(`/listaPreco?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}&idLoja=${empresaSelecionada}&idLista=${numeroPedido}&nomeLista=${nomeLista}`)
      if (response.data) {
        setDadosListaPedidos(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }

  }

  const handleChangeMarca = (e) => {
    setEmpresaSelecionada(e.value);
  }


  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);
    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaPrecos();
    }
  }


  return (

    <Fragment>

      <ActionMain
        title="Lista de Preços"
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Preços"]}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataFim}
        onChangeInputFieldDTFim={(e) => setDataFim(e.target.value)}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"N° da Lista"}
        laceHolderInputFieldCodBarra={"Digite o N° da Lista"}
        valueInputFieldCodBarra={numeroPedido}
        onChangeInputFieldCodBarra={(e) => setNumeroPedido(e.target.value)}


        InputFieldComponent={InputField}
        labelInputField="Nome da Lista"
        placeHolderInputFieldComponent={"Digite o nome da lista"}
        valueInputField={nomeLista}
        onChangeInputField={(e) => setNomeLista(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Lojas"}
        optionsEmpresas={[
          { value: 0, label: "Selecione..." },
          ...marcas.map((marca) => ({
            value: marca.IDEMPRESA,
            label: marca.NOFANTASIA,
          }))]}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleChangeMarca}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}
      />

      <ActionListaPrecos dadosListaPedidos={dadosListaPedidos} />

    </Fragment>
  )
}
