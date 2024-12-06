import { Fragment, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasLoja } from "./actionListaVendaLoja";
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ResultadoResumo } from "../../../ResultadoResumo/ResultadoResumo";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { MdOutlinePayment } from "react-icons/md";
import { BsGem, BsGlobe } from "react-icons/bs";
import { FaCashRegister, FaRegLightbulb } from "react-icons/fa";
import { toFloat } from "../../../../utils/toFloat";

export const ResumoDashBoardComercial = ({ }) => {
  const [dadosDetalheFechamento, setDadosDetalheFechamento] = useState([]);
  const [dadosVendasPagamentos, setDadosVendasPagamentos] = useState([]);
  const [resumoVendas, setResumoVendas] = useState([]);
  const [dadosVendasResumo, setDadosVendasResumo] = useState([]);
  const [dataPesq, setDataPesq] = useState('');
  const [clickContador, setClickContador] = useState(0);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dataPesquisa, setDataPesquisa] = useState(''); 

  useEffect(() => {
    const dataAtual = getDataAtual()
    setDataPesquisa(dataAtual);
  }, []);

  useEffect(() => {
    if (dataPesquisa) {

      getListaVendasLoja();
      getResumoVendas();
    }

  }, [dataPesquisa]);

  const getResumoVendas = async () => {

    try {
      const response = await get(`/resumoVendaFinanceiro?dataPesquisa=${dataPesquisa}`);
      if (response.data) {
        setDadosVendasResumo(response.data);
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar resumo das vendas: ', error);
    }
  };

  const calcularTotalRealizado = (item) => {
    

    return (

      toFloat(item.VALORTOTALDINHEIRO) + 
      toFloat(item.VALORTOTALCARTAO) + 
      toFloat(item.VALORTOTALCONVENIO) + 
      toFloat(item.VALORTOTALPOS) + 
      toFloat(item.VALORTOTALFATURA) + 
      toFloat(item.VALORTOTALDESPESA) 
    );
  }

  const dados = dadosVendasResumo.map((item) => {

    const totalDespesaAdiantamento = parseFloat(item.VALORTOTALDESPESA) + parseFloat(item.VALORTOTALADIANTAMENTOSALARIAL);
    const totalRealizado = calcularTotalRealizado(item);
  
    return {
      VALORTOTALDINHEIRO: item[0]?.VALORTOTALDINHEIRO,
      VALORTOTALCARTAO: item[0]?.VALORTOTALCARTAO,
      VALORTOTALCONVENIO: item[0]?.VALORTOTALCONVENIO,
      VALORTOTALPOS: item[0]?.VALORTOTALPOS,
      VALORTOTALVOUCHER: item[0]?.VALORTOTALVOUCHER,
      VALORTOTALFATURA: item[0]?.VALORTOTALFATURA,
      VALORTOTALDESPESA: item[0]?.VALORTOTALDESPESA,
      VALORTOTALADIANTAMENTOSALARIAL: item[0]?.VALORTOTALADIANTAMENTOSALARIAL,

      totalDespesaAdiantamento: totalDespesaAdiantamento,
      totalRealizado: totalRealizado
    }
  })
  const getListaVendasLoja = async () => {

    try {
      const response = await get(`/vendaTotalEmpresa?dataPesquisa=${dataPesquisa}`)
      if (response.data) {
        setDadosVendasPagamentos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }   
  }


  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      getResumoVendas();
      getListaVendasLoja(dataPesquisa);
    } else {

    }
  }


  return (
    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Tela Principal"]}
        title="Dashboard Comercial"
        subTitle="Nome da Loja"

        InputFieldDTConsultaComponent={InputField}
        labelInputFieldDTConsulta={"Data Consulta"}
        valueDTCosulta={dataPesquisa}
        onChangeInputFieldDTConsulta={(e) => setDataPesquisa(e.target.value)}
      
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

      <ResultadoResumo
        nomeVendas="Dinheiro"
        valorVendas={formatMoeda(dadosVendasResumo[0]?.VALORTOTALDINHEIRO)}
        cardVendas={true}
        IconVendas={AiOutlineUser}
        iconSize={100}
        iconColor={"#fff"}


        nomeCartao="Cartão"
        valorCartao={formatMoeda(dadosVendasResumo[0]?.VALORTOTALCARTAO)}
        cardCartao={true}
        IconCartao={MdOutlinePayment}

        nomeCliente="POS"
        numeroCliente={formatMoeda(dadosVendasResumo[0]?.VALORTOTALPOS)}
        cardCliente={true}
        IconNumeroCliente={BsGem}

        nomeTicketMedio="Fatura"
        valorTicketMedio={formatMoeda(dadosVendasResumo[0]?.VALORTOTALFATURA)}
        cardTicketMedio={true}
        IconTicketMedio={FaRegLightbulb}

        nomeDespesas="Despesas"
        valorDespesas={formatMoeda(dados[0]?.totalDespesaAdiantamento)}
        cardDespesas={true}
        IconValorDespesas={FaCashRegister}

        nomeEcommerce="Total Realizado"
        valorEcommerce={formatMoeda(dados[0]?.totalRealizado)}
        cardEcommerce={true}
        IconValorEcommerce={BsGlobe}
      />

      <ActionListaVendasLoja dadosVendasPagamentos={dadosVendasPagamentos} dataPesquisa={dataPesquisa} />
          

    </Fragment>
  )
}