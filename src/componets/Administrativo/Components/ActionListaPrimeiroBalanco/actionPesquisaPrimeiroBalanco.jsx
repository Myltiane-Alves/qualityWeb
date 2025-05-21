import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { get, put } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

export const ActionPesquisaPrimeiroBalanco = ({usuarioLogado, ID }) => {
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const { data: optionsEmpresa = [], error: errorFornecedor, isLoading: isLoadingFornecedor, refetch: refetchFornecedor } = useQuery(
    'preparar-primeiro-balanco-loja',
    async () => {
      const response = await get(`/preparar-primeiro-balanco-loja`);
      return response.data;
    },
    {enabled: true, staleTime: 5 * 60 * 1000, }
  );

  const handleSelectMarca = (e) => {
    setEmpresaSelecionada(e.value);
  };
  
  const onSubmit = async () => {
    if(optionsModulos[0]?.ALTERAR == 'False') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Você não tem permissão para realizar essa ação.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } 

    if(empresaSelecionada === '' || empresaSelecionada === null || empresaSelecionada === '0'){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor, selecione uma empresa para prosseguir.',
        showConfirmButton: false,
        timer: 1500
      });
      
    } else {
      const putData = {
        "IDEMPRESA": empresaSelecionada, 
      }
  
      const response = await put('/preparar-primeiro-balanco-loja/:id', putData)
      .then(response => {
  
        console.log(response, 'despesa cadastrada com sucesso front end!')
      })
  
  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Prepração balanço realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
  
      .catch (error => {
  
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
          showConfirmButton: false,
          timer: 1500 
        });
        console.log(error)
      })
      return response;
    }
  }



  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Preparar Primeiro Balanço por Loja "]}
        title="Preparar Primeiro Balanço por Loja"
        subTitle="Nome da Loja"

        InputSelectMarcasComponent={InputSelectAction}
        optionsMarcas={optionsEmpresa.map((empresa) => ({
          value: empresa.IDEMPRESA,
          label: empresa.NOFANTASIA,
        }))}
        labelSelectMarcas={"Empresas"}
        valueSelectMarca={empresaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Preparar"}
        onButtonClickSearch={onSubmit}
        corSearch={"success"}
        IconSearch={AiOutlineSearch}

      />

    </Fragment>
  )
}