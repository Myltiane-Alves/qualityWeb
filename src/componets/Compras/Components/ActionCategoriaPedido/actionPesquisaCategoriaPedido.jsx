import { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { get } from "../../../../api/funcRequest";
import { MdAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaCategoriaPedidos } from "./actionListaCategoriaPedido";
import { ActionCadastroCategoriaPedidoModal } from "./actionCadastroCategoriaPedidoModal";
import { ActionListaCategoriaTamanho } from "./actionListaCategoriaTamanho";
import Swal from "sweetalert2";



export const ActionPesquisaCategoriaPedido = () => {
  const [descricao, setDescricao] = useState('');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [dadosCategoria, setDadosCategoria] = useState([]);
  const [dadosCategoriaTamanhos, setDadosCategoriaTamanhos] = useState([]);
  const [dadosTamanho, setDadosTamanho] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaTamanhoCategoria, setTabelaTamanhoCategoria] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosVinculados, setDadosVinculados] = useState([])

  useEffect(() => {
    getListaCategoria()
    getListaTamanhosPedidos()
    getListaVinculoCategoriaTamanho()
  }, [])

  const getListaCategoria = async () => {
    try {
      const response = await get(`/categoriaPedidos?idCategoriaPedido=${categoriaSelecionada}&descricao=${descricao}`)
      if (response.data) {
        setDadosCategoria(response.data)
      
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const getListaTamanhosPedidos = async () => {
    try {
      const response = await get(`/tamanhosPedidos`)
      if (response.data) {
        setDadosTamanho(response.data)
      
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const getListaVinculoCategoriaTamanho = async () => {
    try {
      const response = await get(`/vinculoTamanhoCategoria?idCategoriaPedido=${categoriaSelecionada}&descricao=${descricao}&idTamanhoPedido=${tamanhoSelecionado}`)
      if (response.data) {
        setDadosCategoriaTamanhos(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleChangeCategoria = (e) => {
    setCategoriaSelecionada(e.value)
  }

  const handleChangeTamanho = (e) => {
    setTamanhoSelecionado(e.value)
  }
  
  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      setTabelaTamanhoCategoria(false)
      getListaCategoria()
    }

  }

  const handlePesquisarTamanhoCategoria = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaTamanhoCategoria(true)
      setTabelaVisivel(false)
      getListaVinculoCategoriaTamanho()
    } 
  }

  const vincularCategoriaTamanho = () => {
    if(categoriaSelecionada == '') {
      Swal.fire({
        type: 'warning',
        icon: 'warning',
        title: 'A Categoria deve ser Informada!',
        showConfirmButton: false,
        timer: 1500
      })
    } else if(tamanhoSelecionado == '') {
      Swal.fire({
        type: 'warning',
        icon: 'warning',
        title: 'O Tamanho deve ser Informado!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      try {
        const response = get(`/vinculoTamanhoCategoria?idCategoriaPedido=${categoriaSelecionada}&idTamanhoPedido=${tamanhoSelecionado}`)
        if (response.data) {
          setDadosVinculados(response.data)
        }
        return response;
      } catch (error) {
        console.log(error, "não foi possivel vincular os dados ")
      }
    }
  }
  const handleModal = () => {
    setModalVisivel(true)
  }

  const handleClose = () => {
    setModalVisivel(false)
  }

  return (

    <Fragment>

      <ActionMain
        title="Relatórios -  Categorias de Pedido"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Categorias de Pedido"]}


        InputFieldComponent={InputField}
        labelInputField={"Descrição"}
        valueInputField={descricao}
        onChangeInputField={(e) => setDescricao(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Por Tamanhos de Pedido"}
        optionsEmpresas={[
          { value: '', label: 'Selecione...' },
          ...dadosTamanho.map((item) => {
            return { value: item.IDTAMANHO, label: item.DSTAMANHO }
          })
        ]}
        valueSelectEmpresa={tamanhoSelecionado}
        onChangeSelectEmpresa={handleChangeTamanho}

        InputSelectGrupoComponent={InputSelectAction}
        labelSelectGrupo={"Por Categorias de Pedido"}
        optionsGrupos={[
          { value: '', label: 'Selecione...' },
          ...dadosCategoria.map((item) => {
            return { 
              value: item.IDCATEGORIAPEDIDO, 
              label: `${item.TIPOPEDIDO} - ${item.DSCATEGORIAPEDIDO}` 
            }
          })
        ]}
        valueSelectGrupo={categoriaSelecionada}
        onChangeSelectGrupo={handleChangeCategoria}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Categorias de Pedido"}
        onButtonClickSearch={handlePesquisar}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastro de Categorias de Pedido"}
        onButtonClickCadastro={handleModal}
        corCadastro={"success"}
        IconCadastro={MdAdd}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={" Vinculo Categorias - Tamanho"}
        onButtonClickCancelar={handlePesquisarTamanhoCategoria}
        corCancelar={"danger"}
        IconCancelar={AiOutlineSearch}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"Vincular Categoria / Tamanho "}
        onButtonClickVendasEstrutura={vincularCategoriaTamanho}
        corVendasEstrutura={"warning"}
        iconVendasEstrutura={AiOutlineSearch}


      />

      {tabelaVisivel && (
        <ActionListaCategoriaPedidos dadosCategoria={dadosCategoria} />
      )}

      {tabelaTamanhoCategoria && (
        <ActionListaCategoriaTamanho dadosCategoriaTamanhos={dadosCategoriaTamanhos} />
        
      )}

      <ActionCadastroCategoriaPedidoModal 
        show={modalVisivel} 
        handleClose={handleClose} 
      />
    </Fragment>
  )
}

