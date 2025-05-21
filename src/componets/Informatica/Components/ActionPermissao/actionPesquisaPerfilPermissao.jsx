import React, { Fragment, useState, useRef } from "react"
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { ActionListaPerfilPermissao } from "./actionListaPerfilPermissao";
import { FaRegClone } from "react-icons/fa";
import Swal from "sweetalert2";

export const ActionPesquisaPerfilPermissao = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [copiarPermissao, setCopiarPermissao] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [modalCadastro, setModalCadastro] = useState(false);

  const fetchListaFuncionarios = async () => {
    try {
        const urlApi = `/funcionarios-loja-ativos?`;
        const response = await get(urlApi);

        if (response.data.length && response.data.length === pageSize) {

            let allData = [...response.data];
            animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);

            async function fetchNextPage(currentPage) {
                try {
                    currentPage++;
                    const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
                    if (responseNextPage.data.length) {
                        allData.push(...responseNextPage.data);
                        return fetchNextPage(currentPage);
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
        console.error('Erro ao buscar dados:', error);
        throw error;
    } finally {
        fecharAnimacaoCarregamento();
    }
  };
  
  const { data: dadosFuncionarios = [], error: errorFuncionario, isLoading: isLoadingFuncionario } = useQuery(
    ['funcionarios-loja-ativos'],
    () => fetchListaFuncionarios(),
    { enabled: true, staleTime: Infinity, cacheTime: Infinity,}
  );

  const fetchListaPermissoes = async () => {
    try {
      const urlApi = `/menus-usuario-excecao?idUsuario=${usuarioSelecionado}`;
      const response = await get(urlApi);

      if (response.data.length && response.data.length === pageSize) {

        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);

        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(currentPage);
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
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosPermissoes = [], error: errorPermissoes, isLoading: isLoadingPermissoes, refetch } = useQuery(
    ['menus-usuario-excecao', usuarioSelecionado, currentPage, pageSize],
    () => fetchListaPermissoes(usuarioSelecionado, currentPage, pageSize),
    { enabled: Boolean(usuarioSelecionado), staleTime: 5 * 60 * 1000,}
  );


  const handleClick = () => {
    if(!usuarioSelecionado == '') {
      setCurrentPage(prevPage => prevPage + 1);
      setTabelaVisivel(true);
      refetch();
      
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Selecione um funcionário para copiar as permissões!',
        timer: 3000,
      })
    }
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Funcionários das Lojas"]}
        title="  Lista dos funcionários das Lojas"

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: '', label: 'Selecione...' },
          ...dadosFuncionarios.map((item) => ({
            value: item.ID,
            label: `${item.NOLOGIN} -  ${item.NOFUNCIONARIO}`
          }))
        ]}
        labelSelectEmpresa={"Copiar de Permissão"}
        valueSelectEmpresa={usuarioSelecionado}
        onChangeSelectEmpresa={(e) => setUsuarioSelecionado(e.value)}

        InputSelectMarcasComponent={InputSelectAction}
        optionsMarcas={[
          ...dadosFuncionarios.map((item) => ({
            value: item.ID,
            label: `${item.NOLOGIN} -  ${item.NOFUNCIONARIO}`
          }))
        ]}
        labelSelectMarcas={"Clonar Para"}
        valueSelectMarca={copiarPermissao}
        onChangeSelectMarcas={(e) => setCopiarPermissao(e.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

        {tabelaVisivel && (

            <ActionListaPerfilPermissao
              dadosPermissoes={dadosPermissoes}
              copiarPermissao={copiarPermissao}
              setCopiarPermissao={setCopiarPermissao}
              usuarioSelecionado={usuarioSelecionado}
              handleClick={handleClick}
            />

        )}

    </Fragment>
  )
}