import React, { Fragment, useEffect, useState } from "react"
import { ActionListaProductoPreco } from "./actionListaProdutosPreco";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";

export const ActionPesquisaProductoPreco = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null)
  const [marcaSelecionada, setMarcaSelecionada] = useState(null)
  const [empresaUsuario, setEmpresaUsuario] = useState([])
  const [optionsMarcas, setOptionsMarcas] = useState([])

  useEffect(() => {
    if (getGrupoEmpresas) {
      getTodasEmpresas(marcaSelecionada);
    }
    getGrupoEmpresas();
  }, [marcaSelecionada]);

  const getTodasEmpresas = async () => {
    try {
      const response = await get(`/subGrupoEmpresarial?idGrupoEmpresarial=${marcaSelecionada}`,)
      if (response.data) {
        setEmpresaUsuario(response.data)
      }
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getGrupoEmpresas = async () => {
    try {
      const response = await get(`/listaGrupoEmpresas`,)
      if (response.data) {
        setOptionsMarcas(response.data)
      }
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaFornecedor = async () => {
    try {
      const response = await get(`/listaFornecedorProduto?idMarca=${usuarioLogado.IDSUBGRUPOEMPRESARIAL}`)
      if (response.data) { 
        setDadosFornecedor(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaGrupo = async () => {
    try {
      const response = await get(`/listaGrupoProduto`)
      if (response.data) { 
        setDadosGrupos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaSubGrupo = async () => {
    try {
      const response = await get(`/listaSubGrupoProduto`)
      if (response.data) { 
        setDadoSubGrupo(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
    
  }

  const getListaProdutos = async ( ) => {
    try {
      const response = await get(`/listaProdutos?idEmpresa=${empresaSelecionada}`)
      if (response.data) {
        setDadosProdutos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }


  const handleSelectEmpresa = (e) => {
    const selectedId = Number(e.value);
   
    if (!isNaN(selectedId)) {
      setEmpresaSelecionada(selectedId);
    }
  };

  const handleSelectMarcas = (e) => {
    const selectedId = Number(e.value);

    if (!isNaN(selectedId)) {
      setMarcaSelecionada(selectedId);
    }
  }

  const handleClick = () => {
    getListaProdutos(empresaSelecionada)
    setTabelaVisivel(true);
  }

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Produtos - Preços"]}
        title="Produtos - Preços"
        subTitle

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: null, label: 'Selecione uma loja' },
            ...empresaUsuario.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={[
          { value: null, label: 'Selecione uma Marca' },          
          ...optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarcas={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarcas}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />


      {tabelaVisivel && (
        <ActionListaProductoPreco dadosProdutos={dadosProdutos} />
      )}

    
    </Fragment>
  )
}

