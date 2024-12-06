import React, { Fragment, useState, useEffect } from "react"
import makeAnimated from 'react-select/animated';
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaAlteracaoPreco } from "./actionListaAlteracaoPreco";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { getDataAtual } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";


export const ActionPesquisaAlteracaoPreco = () => {
  const [dadosGrupos, setDadosGrupos] = useState([]);
  const [dadosResponsaveisAlteracao, setDadosResponsaveisAlteracao] = useState([]);
  const [dadosMarcas, setDadosMarcas] = useState([]);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');

  const [dadosAlteracaoPreco, setDadosAlteracaoPreco] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState(null);
  const [listaPrecoSelecionada, setListaPrecoSelecionada] = useState('');
  const [responsavelSelcionado, setResponsavelSelecionado] = useState('');
  const [codBarra, setCodBarra] = useState('');
  const [numeroAlteracao, setNumeroAlteracao] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [idProduto, setIdProduto] = useState('');


  const navigate = useNavigate();
  const animatedComponents = makeAnimated();


  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFim)
    
    getListaResponsavel()
    getListaMarca()


  }, []);



  const getListaResponsavel = async () => {

    try {
      const response = await get('/responsaveisAlteracaoPrecos')
      if (response && response.data) {
        setDadosResponsaveisAlteracao(response.data)
      }

      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }

  }

  const getListaMarca = async () => {

    try {
      const response = await get('/listaMarcaProduto')
      if (response && response.data) {
        setDadosMarcas(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }

  }

  const getListaAlteraPreco = async () => {

    try {
      // idEmpresa=${idEmpresa}&idgrupo=${idGrupo}&idsubgrupo=${idSubGrupo}&descproduto${descricaoProduto}&dtinicial=${dataPesquisa}
      const response = await get(`/listaPreco`)
      if (response.data) {
        setDadosAlteracaoPreco(response.data)
      }
      return response.data;

    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }


  const handleTabelaVisivel = () => {
    setContadorClickTabela((prevClickCount) => prevClickCount + 1);
    if (contadorClickTabela % 2 === 0) {
      setTabelaVisivel(false);

    }
  };

  const handleActionVisivel = () => {
    setContadorClickAction((prevClickCount) => prevClickCount + 1);
    if (contadorClickAction % 2 === 0) {
      setActionVisivel(false);

    }
  };


  const handleChangeGrupos = (e) => {
    setGrupoSelecionado(e.value);
  };

  const handleChangeSubGrupos = (e) => {
    setSubGrupoSelecionado(e.value);
  };


  return (

    <Fragment>


      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Alteração de Preços"]}
        title="Alteração de Preços"
        subTitle="Nome da Loja"

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Início"}
        valueInputFieldDTInicio={dataPesquisaInicio}
        onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}


        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras "}
        valueInputFieldCodBarra={codBarra}
        onChangeInputFieldCodBarra={e => setCodBarra(e.target.value)}
        placeHolderInputFieldCodBarra={"Digite o Código de Barras"}

        InputFieldComponent={InputField}
        labelInputField={"N° Alteração"}
        valueInputField={numeroAlteracao}
        onChangeInputField={(e) => setNumeroAlteracao(e.target.value)}
        placeHolderInputFieldComponent={"Digite o Número da Alteração"}

        InputFieldNumeroNFComponent={InputField}
        labelInputFieldNumeroNF={"Id. Produto"}
        valueInputFieldNumeroNF={idProduto}
        onChangeInputFieldNumeroNF={(e) => setIdProduto(e.target.value)}
        placeHolderInputFieldNumeroNF={"Digite o Id. do Produto"}

        InputFieldDescricaoComponent={InputField}
        labelInputFieldDescricao={"Descrição do Produto"}
        placeHolderInputFieldDescricao={"Digite a descrição do produto"}
        valueInputFieldDescricao={descricaoProduto}
        onChangeInputFieldDescricao={(e) => setDescricaoProduto(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        labelSelectEmpresa={"Lista de Preço"}
        optionsEmpresas={dadosGrupos.map((item) => ({
          value: item.IDEMPRESA,
          label: item.NOFANTASIA,
        }))}
        valueSelectEmpresa={listaPrecoSelecionada}
        onChangeSelectEmpresa={handleChangeGrupos}

        InputSelectGrupoComponent={InputSelectAction}
        labelSelectGrupo={"Responsável Alt."}
        optionsGrupos={dadosResponsaveisAlteracao.map((item) => ({
          value: item.IDFUNCIONARIO,
          label: item.NOFUNCIONARIO,
        }))}
        valueSelectGrupo={subGrupoSelecionado}
        onChangeSelectGrupo={handleChangeSubGrupos}


        ButtonSearchComponent={ButtonType}
        onButtonClickSearch={handleTabelaVisivel}
        linkNomeSearch={"Pesquisar"}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Inserir Alteração"}
        onButtonClickCadastro
        corCadastro={"success"}
        IconCadastro={MdAdd}

      />

      <ActionListaAlteracaoPreco dadosAlteracaoPreco={dadosAlteracaoPreco} />


    </Fragment>
  )
}


