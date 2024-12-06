import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { MdAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { ActionListaUnidadeMedida } from "./actionListaUnidadeMedida";
import { ActionCadastroUnidadeMedidaModal } from "./actionCadastroUnidadeMedidaModal";


export const ActionPesquisaUnidadeMedida = () => {
  const [listaUnidadeMedidas, setListaUnidadeMedidas] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [descricao, setDescricao] = useState("")
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("")

  useEffect(() => {
    getListaUnidadesMedidas()
  }, [])

  const getListaUnidadesMedidas = async () => {
    try {
      const response = await get(`/unidadeMedida?idUnidadeMedida=${unidadeSelecionada}&descricao=${descricao}`)
      if (response.data) {
        setListaUnidadeMedidas(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleChangeUnidade = (e) => {
    setUnidadeSelecionada(e.value)
  }

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
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
        title="Relatórios - Unidades de Medidas"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Unidades de Medidas"]}


        InputFieldComponent={InputField}
        labelInputField={"Descrição / Sigla"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectSubGrupoComponent={InputSelectAction}
        optionsSubGrupos={[
          { value: '', label: 'Selecione...' },
          ...listaUnidadeMedidas.map((item) => {
            return { 
              value: item.IDUNIDADEMEDIDA, 
              label: `${item.DSUNIDADE} - ${item.DSSIGLA}`
            }
          })
        ]}
        labelSelectSubGrupo={"Por Unidade"}
        valueSelectSubGrupo={unidadeSelecionada}
        onChangeSelectSubGrupo={handleChangeUnidade}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Unidade de Medidas"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Unidade de Medidas"}
        onButtonClickCadastro={handleModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}

      />

      {tabelaVisivel && (
        <ActionListaUnidadeMedida listaUnidadeMedida={listaUnidadeMedidas} />
      )}

      <ActionCadastroUnidadeMedidaModal 
        show={modalVisivel} 
        handleClose={handleClose} 
      />
    </Fragment>
  )
}


