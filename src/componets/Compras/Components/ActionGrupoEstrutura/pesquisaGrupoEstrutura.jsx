import { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ActionListaGrupoEstrutura } from "./actionListaGrupoEstrutura";
import { ActionCadastroGrupoEstruturaModal } from "./actionCadastroGrupoEstruturaModal";


export const PesquisaGrupoEstrutura = () => {
  const [dadosGrupoEstrutura, setDadosGrupoEstrutura] = useState([]);
  const [listaGrupoEstrutura, setListaGrupoEstrutura] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [descricao, setDescricao] = useState("")
  const [grupoSelecionado, setGrupoSelecionado] = useState("")

  useEffect(() => {
    getListaGrupoEstrutura()
  }, [])

  const getListaGrupoEstrutura = async () => {
    try {
      const response = await get(`/grupoEstrutura`)
      if (response.data) {
        setListaGrupoEstrutura(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }
  const getDadosGrupoEstrutura = async () => {
    try {
      const response = await get(`/grupoEstrutura?idGrupoEstrutura=${grupoSelecionado}&descricaoGrupoEstrutura=${descricao}`)
      if (response.data) {
        setDadosGrupoEstrutura(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleChangeGrupo = (e) => {
    setGrupoSelecionado(e.value)
  }

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getDadosGrupoEstrutura()
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
        title="Relatórios - Grupos Estruturas Mercadológicas"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Grupo Estrutura"]}


        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectGrupoComponent={InputSelectAction}
        labelSelectGrupo={"Grupo"}    
        optionsGrupos={[
          { value: '', label: 'Selecione...' },
          ...listaGrupoEstrutura.map((item) => {
            return {
              value: item.IDGRUPOESTRUTURA,
              label: item.DSGRUPOESTRUTURA
            }
          })
        ]}
        valueSelectGrupo={grupoSelecionado}
        onChangeSelectGrupo={handleChangeGrupo}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Grupo Estrutura"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        
        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Grupo Estrutura"}
        onButtonClickCadastro={handleModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}


      />

      {tabelaVisivel && (

      <ActionListaGrupoEstrutura dadosGrupoEstrutura={dadosGrupoEstrutura} tabelaVisivel={tabelaVisivel} />
      )}
      <ActionCadastroGrupoEstruturaModal
        show={modalVisivel}
        handleClose={handleClose}
      />
    </Fragment>
  )
}
