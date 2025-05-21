import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getDataAtual } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionListaDespesasLoja } from "./actionListaDespesasLoja";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ActionCadastrarDespesasModal } from "./ActionCadastrarDespesas/actionCadastrarDespesasModal";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import Swal from "sweetalert2";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";

export const ActionPesquisaDespesaLoja = ({ usuarioLogado, ID, optionsEmpresas }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)

  }, []);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );

  const fetchDespesas = async () => {
    try {
      const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const urlApi = `/despesas-loja-empresa?idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
      const response = await get(urlApi);

      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);

        async function fetchNextPage(page) {
          try {
            page++;
            const responseNextPage = await get(`${urlApi}&page=${page}`);
            if (responseNextPage.data.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(page);
            } else {
              return allData;
            }
          } catch (error) {
            console.error('Erro ao buscar próxima página:', error);
            throw error;
          }
        }

        await fetchNextPage(currentPage);
        return allData;
      } else {

        return response.data;
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosDespesasLoja = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchDespesas } = useQuery(
    'despesas-loja-empresa',
    () => fetchDespesas(usuarioLogado.IDEMPRESA, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  const handleClick = () => {

    setCurrentPage(prevPage => prevPage + 1);
    refetchDespesas();
    setTabelaVisivel(true);

  }

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

  };

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Despesas da Loja"]}
        title="Lista de Despesas da Loja"
        subTitle={`${usuarioLogado?.NOFANTASIA}`}

        InputSelectPendenciaComponent={InputSelectAction}
        labelSelectPendencia="Selecione a Empresa"
        optionsPendencia={[
          { value: '', label: 'Todas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        onChangeSelectPendencia={(e) => setEmpresaSelecionada(e.value)}
        valueSelectPendencia={empresaSelecionada}
        isVisible={{display: optionsModulos[0]?.ADMINISTRADOR == false ? "none" : "block"}}

        InputFieldDTInicioAComponent={InputField}
        valueInputFieldDTInicioA={dataPesquisaInicio}
        labelInputDTInicioA={"Data Início"}
        onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}
        
        InputFieldDTFimAComponent={InputField}
        labelInputDTFimA={"Data Fim"}
        valueInputFieldDTFimA={dataPesquisaFim}
        onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}
        

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome="Cadastrar Despesa "
        onButtonClickCadastro={handleShowModal}
        IconCadastro={MdAdd}
        corCadastro={"success"}
      />

      {tabelaVisivel &&
        <ActionListaDespesasLoja dadosDespesasLoja={dadosDespesasLoja} />
      }

      <ActionCadastrarDespesasModal
        show={modalVisivel}
        handleClose={handleCloseModal}
        optionsModulos={optionsModulos}
        usuarioLogado={usuarioLogado}
      />

    </Fragment>
  )
}

