import { Fragment, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVendasDigitalMarca } from "./actionListaVendasDigitalMarca";


export const ActionPesquisaVendasDigitalMarca = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [dadosVendasMarca, setDadosVendasMarca] = useState([])


  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
    if (dataPesquisaInicio && dataPesquisaFim) {
      getListaVendasMarca()

    }
  }, [dataPesquisaInicio, dataPesquisaFim])


  const getListaVendasMarca = async () => {

    try {
      const response = await get(`vendasDigitalResumidaMarca?page=1&dataPesqInicio=${dataPesquisaInicio}&dataPesqFim=${dataPesquisaFim}`)
      if (response.data) {
        setDadosVendasMarca(response.data)
      }
      return response.data
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela venda digital por marca")
    }

  }



  const handleClick = () => {
    
    setClickContador(prevContador => prevContador + 1);
    
    if (clickContador % 2 === 0) {
      getListaVendasMarca()
      setTabelaVisivel(true)
    } 

  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista Vendas Digital"]}
        title="Vendas Digital por Marcas e Período"
        subTitle="Nome da Loja"
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

    
      {tabelaVisivel && (
        <ActionListaVendasDigitalMarca dadosVendasMarca={dadosVendasMarca} />
      )}

    </Fragment>
  )
}