import { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest"
import { AiOutlineSearch } from "react-icons/ai"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ButtonType } from "../../../Buttons/ButtonType"
import { MdAdd } from "react-icons/md"
import { ActionMain } from "../../../Actions/actionMain"
import { ActionListaSubGrupoEstrutura } from "./actionListaSubGrupoEstrutura"
import { ActionCadastroEstruturaModal } from "./actionCadastroEstruturaModal"


export const ActionPesquisaSubGrupoEstrutura = () => {
  const [descricao, setDescricao] = useState("")
  const [dadosSubGrupo, setDadosSubGrupo] = useState([]);
  const [listaSubGrupo, setListaSubGrupo] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState("")

  useEffect(() => {
    getListaSubGrupo()
  }, [])

  const getListaSubGrupo = async () => {
    try {
      const response = await get(`/subGrupoEstrutura`)
      if (response.data) {
        setListaSubGrupo(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const getDadosSubGrupo = async () => {
    try {
      const response = await get(`/subGrupoEstrutura?idSubGrupoEstrutura=${subGrupoSelecionado}&descricao=${descricao}`)
      if (response.data) {
        setDadosSubGrupo(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

 
  const handleChangeSubGrupo = (e) => {
    setSubGrupoSelecionado(e.value)
  }
  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getDadosSubGrupo()
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
        title="SubGrupo de Estruturas Mercadológicas"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de SubGrupo Estruturas M"]}


        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectSubGrupoComponent={InputSelectAction}
        optionsSubGrupos={[
          { value: '', label: 'Selecione...' },
          ...listaSubGrupo.map((item) => {
            return { 
              value: item.IDSUBGRUPOESTRUTURA, 
              label: `${item.DSGRUPOESTRUTURA} - ${item.DSSUBGRUPOESTRUTURA}`
            }
          })
        ]}
        labelSelectSubGrupo={"Por Sub Grupo "}
        valueSelectSubGrupo={subGrupoSelecionado}
        onChangeSelectSubGrupo={handleChangeSubGrupo}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar SubGrupo Estruturas"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        
        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar SubGrupo Estruturas"}
        onButtonClickCadastro={handleModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}



      />

      {tabelaVisivel && (
        <ActionListaSubGrupoEstrutura dadosSubGrupo={dadosSubGrupo} />
      )}

      <ActionCadastroEstruturaModal 
        show={modalVisivel} 
        handleClose={handleClose}
      />
    </Fragment>
  )
}

