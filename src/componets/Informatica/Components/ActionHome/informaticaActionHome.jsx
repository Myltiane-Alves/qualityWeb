import React, { Fragment, useEffect, useState } from "react"
import { get, post, put } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { GoDownload } from "react-icons/go";
import { ActionListaEmpresas } from "./actionListaEmpresas";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const InformaticaActionHome = () => {
  const [clickContador, setClickContador] = useState(0);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }


  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch } = useQuery(
    'listaEmpresasIformatica',
    async () => {
      const response = await get(`/listaEmpresasIformatica`);

      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000
    }
  );

  const atualizarDiariaEmpresa = async () => {

    const putData = {
      STATUALIZA: 'True',
    }

    const response = await put('/atualizar-todos-caixa', putData)
    const textDados = JSON.stringify(putData);
    let textFuncao = 'INFORMATICA/ATUALIZAR TODOS OS CAIXA';

    const postData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: textFuncao,
      DADOS: textDados,
      IP: ipUsuario
    }


    const responseLog = await post('/logWeb', postData)
    try {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Caixas atualizado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })

      handleClose()
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro ao atualizar Caixas!',
        showConfirmButton: false,
        timer: 1500
      });

      console.log(error)
    }

    return responseLog.data;
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      refetch();
    }

  }

  return (

    <Fragment>


      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Tela Principal"]}
        title="Tela Principal Dashboard Informática"
        subTitle

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Listar Caixas"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Atualizar Todos os Caixas"}
        onButtonClickCadastro={atualizarDiariaEmpresa}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Exportar Caixas XLS"}
        onButtonClickCancelar
        corCancelar={"danger"}
        IconCancelar={GoDownload}

      />

      <ActionListaEmpresas dadosEmpresas={dadosEmpresas} />
    </Fragment>
  )
}


