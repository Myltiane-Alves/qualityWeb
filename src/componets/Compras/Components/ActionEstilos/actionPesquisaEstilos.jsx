import { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionMain } from "../../../Actions/actionMain";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaEstilos } from "./actionListaEstilos";


export const ActionPesquisaEstilos = () => {
  const [dadosEstilos, setDadosEstilos] = useState([])
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [descricao, setDescricao] = useState("")
  const [estiloSelecionado, setEstiloSelecionado] = useState("")

  useEffect(() => {
    getListaEstilos()
  }, [])

  const getListaEstilos = async () => {
    try {
      const response = await get(`/listaEstilos?idEstilo=${estiloSelecionado}&descricao=${descricao}`)
      if (response.data) {
        setDadosEstilos(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }


  const handleChangeEstilo = (e) => {
    setEstiloSelecionado(e.value)
  }

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaEstilos()
    }

  }

  const handleModal = () => {
    setModalVisivel(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }


  const optionsF = [
    { value: '1', label: 'Ativo' },
    { value: '2', label: 'Inativo' }
  ]


  return (

    <Fragment>
      <ActionMain
        title="Relatórios - Estilos do Grupo da Estrutura Mercadológica"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Estilos"]}


        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectSubGrupoComponent={InputSelectAction}
        optionsSubGrupos={[
          { value: '', label: 'Selecione...' },
          ...dadosEstilos.map((item) => {
            return {
              value: item.ID_ESTILOS,
              label: `${item.DS_GRUPOESTILOS} - ${item.DS_ESTILOS}`
            }
          })
        ]}
        labelSelectSubGrupo={"Por Estilos (Grupo Estrutura - Estilos)"}
        valueSelectSubGrupo={estiloSelecionado}
        onChangeSelectSubGrupo={handleChangeEstilo}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Estilos"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}


      />

      {tabelaVisivel && (
        <ActionListaEstilos dadosEstilos={dadosEstilos} />
      )}

    </Fragment>
  )
}

