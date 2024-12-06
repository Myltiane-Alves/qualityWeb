import { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ButtonSearch } from "../../../Buttons/ButtonSearch"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionMain } from "../../../Actions/actionMain"
import { AiOutlineSearch } from "react-icons/ai"
import { get } from "../../../../api/funcRequest"
import { ActionListaCondicoesPagamentos } from "./actionListaCondicoesPagamentos"
import { ActionCadastroCondicaoPagamentoModal } from "./cadastroCondicaoPagamentoModal"
import { MdAdd } from "react-icons/md"


export const PesquisaCondicaoPagamento = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [descricao, setDescricao] = useState('')
  const [condicaoSelecionada, setCondicaoSelecionada] = useState('')
  const [dadosCondicoesPagamentos, setDadosCondicoesPagamentos] = useState([])
  const [listaCondicoesPagamentos, setListaCondicoesPagamentos] = useState([])


  useEffect(() => {
    getListaCondicoesPagamentos();
  }, [])

  const getListaCondicoesPagamentos = async () => {
    try {
      const response = await get('/condicaoPagamento');
      setListaCondicoesPagamentos(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const getDadosCondicoesPagamentos = async () => {
    try {
      const response = await get(`/condicaoPagamento?idCondPagamentos=${condicaoSelecionada}&descricaoPagamento=${descricao}`);
      setDadosCondicoesPagamentos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getDadosCondicoesPagamentos()
    } 

  }

  const handleModal = () => {
    setModalVisivel(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }

  const handleSelectPagamento = (e) => {
    setCondicaoSelecionada(e.value)
  }

  return (

    <Fragment>



      <ActionMain
        title="Relatórios - Condições de Pagamento"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Condições de Pagamento"]}


        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectPagamentoComponent={InputSelectAction}
        optionsPagamento={[
          { value: '', label: 'Selecione...' },
          ...listaCondicoesPagamentos.map((item) => {
            return {
              value: item.IDCONDICAOPAGAMENTO,
              label: item.DSCONDICAOPAG
            }
          })
        ]}
        labelSelectPagamento={"Por Condição Pagamento"}
        valueSelectPagamento={condicaoSelecionada}
        onChangeSelectPagamento={handleSelectPagamento}


        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar Condição Pagamento"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        
        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Condição Pagamento"}
        onButtonClickCadastro={handleModal}
        corCadastro={"success"}
        IconCadastro={MdAdd}


      />

      <ActionListaCondicoesPagamentos dadosCondicoesPagamentos={dadosCondicoesPagamentos}/>

      <ActionCadastroCondicaoPagamentoModal
          show={modalVisivel}
          handleClose={handleClose}
      />

    </Fragment>
  )
}

