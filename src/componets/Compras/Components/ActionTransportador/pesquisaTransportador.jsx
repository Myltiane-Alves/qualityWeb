import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaTransportador } from "./actionListaTransportador";
import { MdAdd } from "react-icons/md";
import { ActionCadastroTrasnportadorModal } from "./actionCadastroTransportadorModal";


export const PesquisaTransportador = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosListaTransportador, setDadosListaTransportador] = useState([])
  const [dadosTransportador, setDadosTransportador] = useState([])
  const [transportadorSelecionado, setTransportadorSelecionado] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')

  useEffect(() => {
   getListaTransportadores()
  }, [])

  const getListaTransportadores = async () => {
    try {
      const response = await get('/listaTransportador');
      setDadosTransportador(response.data);
     
    } catch (error) {
      console.error(error);
    }
  }
  const getListaDadosTransportadores = async () => {
    try {

      const response = await get(`/listaTransportador?idTransportador=${transportadorSelecionado}&descricaoTransportador=${razaoSocial}&cnpjTransportador=${cnpj}`);
      setDadosListaTransportador(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeSelectTransportador = (e) => {
    setTransportadorSelecionado(e.value)
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaDadosTransportadores()
    } 

  }

  const handleShowModal = () => {
    setModalVisivel(true)
  }

  return (

    <Fragment>

      <ActionMain
        title="Relatórios - Transportadores"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Transportadores"]}


        InputFieldComponent={InputField}
        labelInputField={"Razão Social / Nome Fantasia"}
        valueInputField={razaoSocial}
        onChangeInputField={(e) => setRazaoSocial(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: '', label: 'selecione' },
          ...dadosTransportador.map((item) => {
            return { 
              value: item.IDTRANSPORTADORA, 
              label: ` ${item.NUCNPJ} - ${item.NORAZAOSOCIAL}` 
            }
          
          })
        ]}
        labelSelectEmpresa={"Por Transportadora"}
        valueSelectEmpresa={transportadorSelecionado}
        onChangeSelectEmpresa={handleChangeSelectTransportador}

        InputFieldDescricaoComponent={InputField}
        labelInputFieldDescricao={"CNPJ"}
        valueInputFieldDescricao={cnpj}
        onChangeInputFieldDescricao={(e) => setCnpj(e.target.value)}
        

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Transportador"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        // corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Transportador"}
        onButtonClickCadastro={() => setModalVisivel(true)}
        IconCadastro={MdAdd}
        corCadastro={"success"}

       
      />

      {tabelaVisivel && (
        <ActionListaTransportador
          dadosListaTransportador={dadosListaTransportador}
        />

      )}

      <ActionCadastroTrasnportadorModal
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
     
      />

    </Fragment>
  )
}
