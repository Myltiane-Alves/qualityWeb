import { Fragment, useEffect, useRef, useState } from "react"
// import { ComprasActionCadFornecedorModal } from "./comprasActionCadFornecedorModal"
import { ButtonType } from "../../../Buttons/ButtonType";
import { ButtonSearch } from "../../../Buttons/ButtonSearch";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { InputField } from "../../../Buttons/Input";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain"
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ActionListaFornecedores } from "./actionListaFornecedores";
import { ActionCadastrarFornecedorModal } from "./actionCadastrarFornecedorModal";


export const ComprasFornecedor = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dadosFornecedores, setDadosFonecedores] = useState([]);
  const [dadosFabricantes, setDadosFabricantes] = useState([]);
  const [dadosFornecedoresFabricantes, setDadosFornecedoresFabricantes] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState(null);
  const dt = useRef(null);

  useEffect(() => {
    getListaFornecedores();
    getListaFabricantes();
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

  const getListaFornecedoresFabricantes = async () => {
    try {
      const response = await get(`/fornecedorFabricante`);
      setDadosFornecedoresFabricantes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaFornecedoresFabricantes();
    }

  }

  const handleModal = () => {
    setModalVisivel(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }

  const handleSelectFornecedor = (e) => {
    setFornecedorSelecionado(e.value)
  }

  const handleSelectFabricante = (e) => {
    setFabricanteSelecionado(e.value)
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (

    <Fragment>

      <ActionMain
        title="Relatórios - Fornecedores"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Fornecedores"]}

        InputFieldVendaCPFCNPJComponent={InputField}
        labelInputFieldVendaCPFCNPJ={"CNPJ"}

        InputFieldComponent={InputField}
        labelInputField={"Razão Social / Nome Fantasia"}

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

        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar Fornecedor"}
        onButtonClickSearch={handlePesquisar}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Fornecedor"}
        onButtonClickCadastro={handleModal}
        corCadastro={"success"}
        IconCadastro={MdAdd}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Vincular Fornecedor / Fabricante"}
        onButtonClickCancelar
        corCancelar={"info"}
        IconCancelar={MdAdd}
      />




      <ActionListaFornecedores dadosFornecedoresFabricantes={dadosFornecedoresFabricantes}/>
      <ActionCadastrarFornecedorModal 
        show={modalVisivel}
        handleClose={handleClose}
      />      
    </Fragment>
  )
}

