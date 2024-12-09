import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { ActionListaValeTransporte } from "./actionListaValeTransporte"
import { MdAdd } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { ActionCadastrarValeTransporte } from "./actionCadastrarValeTransporte"
import { getDataAtual } from "../../../../utils/dataAtual"
import { useQuery } from "react-query"


export const ActionPesquisaValeTransporte = () => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const dataAtual = getDataAtual()
    setDataPesquisaInicio(dataAtual)
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const dataAtual = getDataAtual()
    setDataPesquisaInicio(dataAtual)
  }, [usuarioLogado && usuarioLogado.IDEMPRESA])

  const { data: dadosDespesasLoja = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch } = useQuery(
    'despesas-loja-empresa',
    async () => {
      const response = await get(`/despesasEmpresas?idEmpresa=${usuarioLogado?.IDEMPRESA}&dataPesquisa=${dataPesquisaInicio}`);
      return response.data;
    },
    { enabled: Boolean((usuarioLogado?.IDEMPRESA)), staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const handlShowModal = () => {
    setModalVisivel(true)
  }

  const handleCloseModal = () => {
    setModalVisivel(false);
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vale Transporte da Loja"]}
        title="Vale Transporte da Loja"
        subTitle={`${usuarioLogado?.NOFANTASIA}`}

        ButtonTypeCadastro={ButtonType}
        linkNome="Cadastrar Vale Transporte"
        onButtonClickCadastro={handlShowModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}
      />

      <ActionListaValeTransporte dadosDespesasLoja={dadosDespesasLoja} />

      <ActionCadastrarValeTransporte 
        show={modalVisivel}
        handleClose={handleCloseModal}
      />

    </Fragment >
  )
}


