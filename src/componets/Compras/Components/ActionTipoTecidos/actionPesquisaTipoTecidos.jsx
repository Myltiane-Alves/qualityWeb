import { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionMain } from "../../../Actions/actionMain";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ActionListaTipoTecidos } from "./actionListaTipoTecidos";
import { ActionCadastrarTipoTecidosModal } from "./actionCadastrarTipoTecidosModal";


export const ActionPesquisaTiposTecidos = () => {
  const [dadosTecidos, setDadosTecidos] = useState([]);
  const [descricao, setDescricao] = useState(''); 
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [tecidoSelecionado, setTecidoSelecionado] = useState('');

  useEffect(() => {
    getTabelas()
  }, [])

  const getTabelas = async () => {
    try {
      const response = await get(`/tipoTecidos?idTecido=${tecidoSelecionado}&descricao=${descricao}`)
      if (response.data) {
        setDadosTecidos(response.data)
        // console.log(response.data, 'get tabelas')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleChangeTecido = (e) => {
    setTecidoSelecionado(e.value)
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
        title="Relatórios - Tipos de Tecidos"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Tipos de Tecidos"]}

        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectSubGrupoComponent={InputSelectAction}
        optionsSubGrupos={[
          { value: '', label: 'Selecione...' },
          ...dadosTecidos.map((item) => {
            return { 
              value: item.IDSUBGRUPOESTRUTURA, 
              label: `${item.DSGRUPOESTRUTURA} - ${item.DSSUBGRUPOESTRUTURA}`
            }
          })
        ]}
        labelSelectSubGrupo={"Por Tipo de Tecido"}
        valueSelectSubGrupo={tecidoSelecionado}
        onChangeSelectSubGrupo={handleChangeTecido}
        
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Cores"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Cores"}
        onButtonClickCadastro={handleModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}

      />

      {tabelaVisivel && (
        <ActionListaTipoTecidos dadosTecidos={dadosTecidos} />
      )}

      <ActionCadastrarTipoTecidosModal 
        show={modalVisivel} 
        handleClose={handleClose} 
      />
    </Fragment>
  )
}

