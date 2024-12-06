import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { ActionListaPromocao } from "./actionListaPromocao";
import { getDataAtual, getDataDoisMesesAtras } from "../../../../utils/dataAtual";
import { MdAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionCadastroPromocaoModal } from "./actionCadastroPromocaoModal";

export const ActionPesquisaPromocao = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false)
  const [clickContador, setClickContador] = useState(0);
  const [dadosListaPromocao, setDadosListaPromocao] = useState([]);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState("");
  const [dataPesquisaFim, setDataPesquisaFim] = useState("");

  
  useEffect(() => {
    const dataInicio = getDataDoisMesesAtras()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFim)
    getListaProdutosCriados()
  
  }, [])
  

  const getListaProdutosCriados = async () => {
    try {
        const response = await get(`/listaPromocoes?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`)
        if (response.data) {
          setDadosListaPromocao(response.data)
          console.log(response.data, "dados da tabela")
        }
    } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaProdutosCriados()
    }  
    
  }

  const handleClickModalCadastro = () => {
    setModalCadastro(true)
  }

// 713 Linha antes de ser
  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Promoções"]}
        title="Programação - Promoções"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick }
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Promoção"}
        onButtonClickCadastro={handleClickModalCadastro}
        corCadastro={"success"}
        IconCadastro={MdAdd}
      />

      {tabelaVisivel && (
       <ActionListaPromocao dadosListaPromocao={dadosListaPromocao} />
      )}

      <ActionCadastroPromocaoModal 
        show={modalCadastro}
        handleClose={() => setModalCadastro(false)}

      />
    </Fragment>
  )
}
