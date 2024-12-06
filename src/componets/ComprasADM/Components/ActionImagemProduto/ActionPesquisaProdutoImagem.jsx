import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { get } from "../../../../api/funcRequest"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ButtonType } from "../../../Buttons/ButtonType"
import { AiOutlineSearch } from "react-icons/ai"
import { MdAdd } from "react-icons/md"
import { ActionListaImagemProduto } from "./listaProdutos"
import { ActionCadastroImagemProdutoModal } from "./cadastroImagemProdutoModal"
import Swal from 'sweetalert2'


export const ActionPesquisaProdutoImagem = () => {
  const [dadosFabricantes, setDadosFabricantes] = useState([]);
  const [referencia, setReferencia] = useState('');
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState('');
  const [estruturaSelecionada, setEstruturaSelecionada] = useState('');
  const [dadosMercadoria, setDadosMercadoria] = useState([])
  const [dadosProdutos, setDadosProdutos] = useState([])
  const [modalCadastro, setModalCadastro] = useState(false)

  useEffect(() => {
    getListaFabricantes();
    getListaEstruturaMercadoria();
    getListaProdutos();
  }, [])
  const getListaFabricantes = async () => {
    try {
      const response = await get('/fabricantes');
      setDadosFabricantes(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const getListaEstruturaMercadoria = async () => {
    try {
      const response = await get('/subGrupoEstrutura');
      setDadosMercadoria(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListaProdutos = async () => {
    try {
      const response = await get(`/imagemProdutos?numeroRefProduto=${referencia}&idFabricante=${fabricanteSelecionado}&idSubEstrutura=${estruturaSelecionada}`);
      setDadosProdutos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id) => {
    const postData = {
      IDEMPRESA: usuarioLogado.IDEMPRESA,
      IDUSUARIO: usuarioLogado.id,
      DTDESPESA: dtDespesa,
      IDCATEGORIARECDESP: categoriaRecDesp,
      DSHISTORIO: dsHistorio,
      DSPAGOA: dsPagoA,
      TPNOTA: tpNota,
      NUNOTAFISCAL: nuNotaFiscal,
      VRDESPESA: vrDespesa,
  
    }

   
    const response = await post('/cadastrarDespesaLoja', postData)
    .then(response => {
      
      // Limpar os campos do formulário
     
      console.log(response, 'despesa cadastrada com sucesso front end!')
    })


    Swal.fire({
      position: 'top-end',
      title: 'Certeza que Deseja Cancelar esse Produto do Vinculo com a Imagem?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      timer: 15000
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Imagem Cancelada com Sucesso', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Imagem Cancelada com Sucesso', '', 'info')
      }
    })

  }

  const handleSelectFabricante = (e) => {
    setFabricanteSelecionado(e.value);
  }

  const handleSelectStrutura = (e) => {
    setEstruturaSelecionada(e.value);
  }

  const handleClick = () => {
    getListaProdutos();
  }
  const handleClickCadastro = () => {
    setModalCadastro(true)
  }

  return (
    <Fragment>
      <ActionMain
        title="Imagens dos Produtos"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Imagens de Produtos"]}


        InputFieldComponent={InputField}
        labelInputField={"Por Referência"}
        valueInputField={referencia}
        onChangeInputField={(e) => setReferencia(e.target.value)}

        InputSelectFornecedorComponent={InputSelectAction}
        optionsFornecedores={[
          { value: '', label: 'selecione' },
          ...dadosMercadoria.map(item => ({
            value: item.IDSUBGRUPOESTRUTURA,
            label: `${item.IDSUBGRUPOESTRUTURA} - ${item.DSGRUPOESTRUTURA} - ${item.DSSUBGRUPOESTRUTURA} `

          }))
        ]}
        labelSelectFornecedor={"Por Estrutura"}
        valueSelectFornecedor={estruturaSelecionada}
        onChangeSelectFornecedor={handleSelectStrutura}

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
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        // corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Imagens"}
        onButtonClickCadastro={handleClickCadastro}
        corCadastro={"success"}
        IconCadastro={MdAdd}


      />

      <ActionListaImagemProduto dadosProdutos={dadosProdutos}/>
     
      <ActionCadastroImagemProdutoModal 
        show={modalCadastro}
        handleClose={() => setModalCadastro(false)}
      />
    </Fragment>
  )
}