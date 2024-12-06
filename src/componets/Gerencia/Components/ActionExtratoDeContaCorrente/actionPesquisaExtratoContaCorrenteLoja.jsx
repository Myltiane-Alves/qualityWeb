import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { ButtonType } from "../../../Buttons/ButtonType"
import { getDataAtual } from "../../../../utils/dataAtual"
import { AiOutlineSearch } from "react-icons/ai"
import { get } from "../../../../api/funcRequest"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ActionListaExtratoContaCorrenteLoja } from "./actionListaExtratoContaCorrenteLoja"
import { useNavigate } from "react-router-dom";

export const ActionPesquisaExtratoContaCorenteLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [optionsEmpresas, setOptionsEmpresas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [dadosExtratoLojaPeriodo, setDadosExtratoLojaPeriodo] = useState([])
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
    
  }, [])

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



  const getListaSaldoExtratoLoja = async () => {
    try {
      // const response = await get(`/listaExtratoDaLojaPeriodo?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`) 
      const response = await get(`/listaExtratoDaLojaPeriodo?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`) 
        
      if (response.data) {
        setDadosExtratoLojaPeriodo(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar marcas: ', error)
    }
  }


  const handleClick = () => {
    
    setTabelaVisivel(true)
    getListaSaldoExtratoLoja()
    
  }

  return (
    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Extrato de Contas Correntes das Lojas"]}
        title="Extrato de Contas Correntes das Lojas"
        subTitle="Nome da Loja"
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      {tabelaVisivel && (
        <div className="card">
         <ActionListaExtratoContaCorrenteLoja dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} />
        </div>
      )}
    </Fragment>
  )
}