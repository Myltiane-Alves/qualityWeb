import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { ButtonType } from "../../../Buttons/ButtonType";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { get, put } from "../../../../api/funcRequest";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

export const ActionPesquisaPrimeiroBalanco = () => {
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')


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