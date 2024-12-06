import React, { Fragment, useEffect, useState } from "react"
import { ActionListaFuncionario } from "./actionListaFuncionarios";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";


export const ActionPesquisaFuncionario = () => {
  const [dadosFuncionarios, setDadosFuncionarios] = useState([]);
  const [optionsEmpresas, setOptionsEmpresas] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(true);
  const [contadorClickTabela, setContadorClickTabela] = useState(0);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    getListaEmpresas();
    getListaFuncionarios();
  }, []);

  const getListaEmpresas = async () => {
    try {
      const response = await get(`/listaEmpresasIformatica`);
      if (response.data) {
        setOptionsEmpresas(response.data);
      }
      return response.data;
    } catch (error) {

    }
  }

  const getListaFuncionarios = async () => {
    try {
      const response = await get(`/funcionariosLoja?idEmpresa=${empresaSelecionada}&descricaoNomeFuncao=${cpf}`);
      if (response.data && response.data.length > 0) {
        setDadosFuncionarios(response.data);
      }
      return response.data;

    } catch (error) {
      console.log(error, "não foi possível carregar os dados da tabela, lista Vendas vendedor");
    }

  }

  const handlChangeEmpresaAction = (e) => {
    setEmpresaSelecionada(e.value); 
  }

  const handleTabelaVisivel = () => {
    setContadorClickTabela(prevClickCount => prevClickCount + 1);
    if (contadorClickTabela % 2 === 0) {
      setTabelaVisivel(true);
      getListaFuncionarios(empresaSelecionada);
    } 
  };

  return (
    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Funcionários das Lojas"]}
        title="  Lista dos funcionários das Lojas"
        subTitle="Nome da Loja"

        InputFieldVendaCPFCNPJComponent={InputField}
        labelInputFieldVendaCPFCNPJ={"Nome / CPF"}
        valueInputFieldVendaCPFCNPJ={cpf}
        onChangeInputFieldVendaCPFCNPJ={(e) => setCpf(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: '', label: 'Selecione a Empresa' },
          ...optionsEmpresas.map((item) => ({
            value: item.IDEMPRESA,
            label: item.NOFANTASIA
          }))
        ]}
        labelSelectEmpresa={"Empresas"}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handlChangeEmpresaAction}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleTabelaVisivel}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel &&
        <ActionListaFuncionario dadosFuncionarios={dadosFuncionarios} optionsEmpresas={optionsEmpresas}/>
      }
    </Fragment>
  )
}