import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ActionListaEmpresas } from "./actionListaEmpresas";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from 'react-query';
import { useFetchData } from "../../../../hooks/useFetchData";

export const ActionPesquisaEmpresas = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false)
  const [clickContador, setClickContador] = useState(0)
  const [empresas, setEmpresas] = useState([])
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

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

  }, [usuarioLogado]);

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('empresas', '/empresas');

  const fetchListaEmpresas = async () => {
    try {

      const urlApi = `/empresas?idEmpresa=${empresaSelecionada}`;
      const response = await get(urlApi);
  
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
  
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
    }
  };

  const { data: dadosEmpresas = [], error: errorListaEmpresas, isLoading: isLoadingListaEmpresas, refetch: refetchListaEmpresas } = useQuery(
    ['empresas',  empresaSelecionada, currentPage, pageSize],
    () => fetchListaEmpresas( empresaSelecionada,  currentPage, pageSize),
    { enabled: true, staleTime: 5 * 60 * 1000 }
  );


  const handleSelectEmpresa = (e) => {
    const selectId = e.value
    if (selectId) {
      setEmpresaSelecionada(selectId)
    }
  }


  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    refetchListaEmpresas()
  }

  return (

    <Fragment>
      <ActionMain
        style={{ marginTop: "200px" }}
        linkComponentAnterior={["Home"]}
        linkComponent={["Empresas"]}
        title="Empresas"
        subTitle="Nome da Loja"

        InputSelectEmpresaComponent={InputSelectAction}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}

        optionsEmpresas={[
          { value: '0', label: 'Selecione'},
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

    
      <div style={{marginTop: '2rem'}} >
        <ActionListaEmpresas dadosEmpresas={dadosEmpresas} />
      </div>
  
    </Fragment>
  )
}
