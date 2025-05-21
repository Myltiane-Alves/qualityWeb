import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { ButtonType } from "../../../Buttons/ButtonType"
import { get } from "../../../../api/funcRequest"
import { ActionListaValeTransporte } from "./actionListaValeTransporte"
import { MdAdd } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { ActionCadastrarValeTransporte } from "./ActionCadastrarValeTransporte/actionCadastrarValeTransporte"
import { getDataAtual } from "../../../../utils/dataAtual"
import { useQuery } from "react-query"
import Swal from "sweetalert2"


export const ActionPesquisaValeTransporte = ({ usuarioLogado, ID }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');

  useEffect(() => {
    const dataAtual = getDataAtual()
    setDataPesquisaInicio(dataAtual)
  }, [])

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );


  const { data: dadosDespesasLoja = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch } = useQuery(
    'despesas-loja-empresa',
    async () => {
      const response = await get(`/despesas-loja-empresa?idEmpresa=${usuarioLogado?.IDEMPRESA}&dataPesquisa=${dataPesquisaInicio}`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
  );

  const handleShowModal = () => {
    if (optionsModulos[0]?.CRIAR == 'True') {
      setModalVisivel(true);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Você não tem permissão para cadastrar!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      })
      return;
    }
  };

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
        onButtonClickCadastro={handleShowModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}
      />

      <ActionListaValeTransporte dadosDespesasLoja={dadosDespesasLoja} />

      <ActionCadastrarValeTransporte
        show={modalVisivel}
        handleClose={handleCloseModal}
        usuarioLogado={usuarioLogado}
        optionsModulos={optionsModulos}
      />

    </Fragment >
  )
}


