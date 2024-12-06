import { Fragment, useEffect, useState } from "react"
import { ActionListaEstoqueVendaGrupoSubGrupo } from "./actionListaEstoqueGrupoSubGrupo"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";


export const ActionPesquisaEstoqueVendaGrupoSubGrupo = () => {
  const [clickContador, setClickContador] = useState(0);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState([]);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [dadosGrupos, setDadosGrupos] = useState([]);
  const [dadosSubGrupos, setDadosSubGrupos] = useState([]);
  const [dadosGrupoSubGrupo, setDadosGrupoSubGrupo] = useState([]);
  const [optionsMarcas, setOptionsMarcas] = useState([]);

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
    getListaGrupo();
    if(getListaGrupo) {
      getListaSubGrupos(grupoSelecionado || '');
    }
    getGrupoEmpresas();
  
  }, [grupoSelecionado])

 
  const getListaGrupo = async () => {
    try {
      const response = await get(`/listaGrupoProduto`)
      if (response.data) { 
        setDadosGrupos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
    
  }

  const getListaSubGrupos = async () => {
    try {
      const response = await get(`/listaSubGrupoProduto?idGrupo=${grupoSelecionado}`)
      if (response.data) { 
        setDadosSubGrupos(response.data)
      }
      return response.data;

    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
    
  }

  const getGrupoEmpresas = async () => {
    try {
      const response = await get(`/marcasLista`,)
      if (response.data) {
        setOptionsMarcas(response.data)
      }
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaVendasEstoqueGrupoSubGrupo = async () => {
    try {
      const response = await get(`/vendasEstoqueGrupoSubGrupo?dataInicio=${dataPesquisaInicio}&dataFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}`)
      if (response.data) { 
        setDadosGrupoSubGrupo(response.data)
      }
      return response.data;

    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }


  const handleSelectMarcas = (e) => {
    const selectedId = Number(e.value);

    if (!isNaN(selectedId)) {
      setMarcaSelecionada(selectedId);
    }
  }

  const handleGrupoChange = (e) => {
    const selectedGrupo = e.value;
    if(!isNaN(selectedGrupo)){
      setGrupoSelecionado(selectedGrupo);
    }
  }

  const handleSubGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSubGrupoSelecionado(values);
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaVendasEstoqueGrupoSubGrupo(marcaSelecionada)
    }
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas"]}
        title="Relatórios Vendas"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)} 

        InputSelectGrupoComponent={InputSelectAction}
        optionsGrupos={[
          {value: '', label: 'Selecione um Grupo'},
          ...dadosGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.GRUPO
            ,
          }))
        ]}
        labelSelectGrupo={"Por Grupo"}
        valueSelectGrupo={grupoSelecionado}
        onChangeSelectGrupo={handleGrupoChange}   

        MultSelectSubGrupoComponent={MultSelectAction}
        optionsMultSelectSubGrupo={dadosSubGrupos.map((item) => ({
            value: item.ID_ESTRUTURA,
            label: item.ESTRUTURA,
          }))
        }
        labelMultSelectSubGrupo={"SubGrupo"}
        valueMultSelectSubGrupoo={subGrupoSelecionado}
        onChangeMultSelectSubGrupo={handleSubGrupoChange}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={[
          { value: null, label: 'Selecione uma Marca' },          
          ...optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.DSGRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarcas={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarcas}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />
   
      {tabelaVisivel && (
        <ActionListaEstoqueVendaGrupoSubGrupo />
      )}
  
    </Fragment>
  )
}
