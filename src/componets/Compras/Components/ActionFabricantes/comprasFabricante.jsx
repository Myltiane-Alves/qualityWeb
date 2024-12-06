import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { AiOutlineSave, AiOutlineSearch } from "react-icons/ai"
import { MdAdd } from "react-icons/md"
import { ActionListaFabricantes } from "./actionListaFabricantes"
import { ActionCadastroFabricanteModal } from "./actionCadastroFabricanteModal"



export const ComprasFabricante = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalCadastrarFabricante, setModalCadastrarFabricante] = useState(false);
  const [dadosFornecedores, setDadosFonecedores] = useState([]);
  const [dadosFabricantes, setDadosFabricantes] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState(null);
  const [nomeFabricante, setNomeFabricante] = useState('');
  const [dadosFabricantesFornecedor, setDadosFabricantesFornecedor] = useState([]);

  useEffect(() => {
    getListaFornecedores();
    getListaFabricantes();
    getListaFabricantesFornecedor();
  }, [])

  const getListaFornecedores = async () => {
    try {
      const response = await get('/fornecedores');
      setDadosFonecedores(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListaFabricantes = async () => {
    try {
      const response = await get('/fabricantes');
      setDadosFabricantes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListaFabricantesFornecedor = async () => {
    try {
      const response = await get(`/fabricanteFornecedor?idFabricante=${fabricanteSelecionado}&descricaoFabricante=${nomeFabricante}&idFornecedor=${fornecedorSelecionado}`);
      setDadosFabricantesFornecedor(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectFornecedor = (e) => {
    setFornecedorSelecionado(e.value)
  }

  const handleSelectFabricante = (e) => {
    setFabricanteSelecionado(e.value)
  }

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
      getListaFabricantesFornecedor();
    }

  }

  const handleModal = () => {
    setModalVisivel(true)
    setModalCadastrarFabricante(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (

    <Fragment>

      <ActionMain
        title="Relatórios - Fabricantes"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Fabricantes"]}


        InputFieldComponent={InputField}
        labelInputField={"Nome Fabricante"}
        valueInputField={nomeFabricante}
        onChangeInputField={(e) => setNomeFabricante(e.target.value)}

        InputSelectFornecedorComponent={InputSelectAction}
        optionsFornecedores={[
          { value: '', label: 'selecione' },
          ...dadosFornecedores.map(item => ({
            value: item.IDFORNECEDOR,
            label: `${item.IDFORNECEDOR} - ${item.NOFANTASIA} - ${item.NUCNPJ} - ${item.NORAZAOSOCIAL}`

          }))
        ]}
        labelSelectFornecedor={"Por Fornecedor"}
        valueSelectFornecedor={fornecedorSelecionado}
        onChangeSelectFornecedor={handleSelectFornecedor}

        InputSelectFabricanteComponent={InputSelectAction}
        optionsFabricantes={[
          { value: '', label: 'selecione' },
          ...dadosFabricantes.map(item => ({
            value: item.IDFABRICANTE,
            label: `${item.IDFABRICANTE} - ${item.DSFABRICANTE}`
          }))
        ]}
        labelSelectFabricantes={"Por Fabricante"}
        valueSelectFabricante={fabricanteSelecionado}
        onChangeSelectFabricante={handleSelectFabricante}


        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar Fabricante"}
        onButtonClickSearch={handlePesquisar}
        // corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Fabricante"}
        onButtonClickCadastro={handleModal}
        corCadastro={"success"}
        IconCadastro={MdAdd}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Vincular Fabricante / Fornecedor"}
        onButtonClickCancelar
        corCancelar={"warning"}
        IconCancelar={AiOutlineSave}
      />

      <ActionListaFabricantes dadosFabricantesFornecedo={dadosFabricantesFornecedor}/>
      <ActionCadastroFabricanteModal
        show={modalCadastrarFabricante}
        handleClose={() => setModalCadastrarFabricante(false)}
     
      />

    </Fragment>
  )
}

