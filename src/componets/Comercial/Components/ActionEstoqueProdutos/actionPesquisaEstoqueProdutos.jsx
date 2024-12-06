import { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaEstoqueProduto } from "./actionListaEstoqueProdutos";
import { getDataAtual } from "../../../../utils/dataAtual";


export const ActionPesquisaEstoqueProdutos = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosGrupos, setDadosGrupos] = useState([])
  const [dadosSubGrupos, setDadosSubGrupos] = useState([])
  const [dadosFornecedor, setDadosFornecedor] = useState([])
  const [dadosMarcasProdutos, setDadosMarcasProdutos] = useState([])
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState([])
  const [grupoSelecionado, setGrupoSelecionado] = useState([])
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState([])
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [dataPesquisaInicioB, setDataPesquisaInicioB] = useState('')
  const [dataPesquisaFimB, setDataPesquisaFimB] = useState('')
  const [dataPesquisaInicioC, setDataPesquisaInicioC] = useState('')
  const [dataPesquisaFimC, setDataPesquisaFimC] = useState('')
  const [descricaoProduto, setDescricaoProduto] = useState('')
  const [marcaProduto, setMarcaProduto] = useState('')
 
  const [dadosEstoqueVendasPosicionamentoPeriodos, setDadosEstoqueVendasPosicionamentoPeriodos] = useState([])

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataInicialB = getDataAtual();
    const dataInicialC = getDataAtual();
    const dataFinal = getDataAtual();
    const dataFinalB = getDataAtual();
    const dataFinalC = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaInicioB(dataInicialB);
    setDataPesquisaInicioC(dataInicialC);
    setDataPesquisaFim(dataFinal);
    setDataPesquisaFimB(dataFinalB);
    setDataPesquisaFimC(dataFinalC);
    getListaGrupo();
    if(getListaGrupo) {
      getListaSubGrupos(grupoSelecionado);
    }
    getListaSubGrupos();
    getListaFornecedor();
    getListaMarcasProdutos();
  }, [grupoSelecionado]);

  const getListaGrupo = async () => {
    try {
      const response = await get(`/listaGrupoProduto`)
      if (response.data) { 
        setDadosGrupos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar grupos: ', error)
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
      console.log('Erro ao buscar sub grupos: ', error)
    }
  }

  const getListaMarcasProdutos = async () => {
    try {
      const response = await get(`/listaMarcaProduto?idSubGrupo=${subGrupoSelecionado}`)
      if (response.data) { 
        setDadosMarcasProdutos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaFornecedor = async () => {
    try {
      const response = await get(`/listaFornecedorProduto?idMarca=`)
      if (response.data) { 
        setDadosFornecedor(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaVendasPosicionamentoEstoquePeriodos = async () => {
    try {
      const response = await get(`/vendasEstoqueProduto?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dataPesquisaInicioB=${dataPesquisaInicioB}&dataPesquisaFimB${dataPesquisaFimB}&dataPesquisaInicioC=${dataPesquisaInicioC}&dataPesquisaFimC=${dataPesquisaFimC}&descricaoProduto=${descricaoProduto}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${marcaProduto}`)
      if (response.data) {
        setDadosEstoqueVendasPosicionamentoPeriodos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }


  const handleGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setGrupoSelecionado(values);
  }
 
  const handleSubGrupoChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSubGrupoSelecionado(values);
  }
  
  const handleFornecedorChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFornecedorSelecionado(values);
  }
  const handleMarcarChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setMarcaProduto(values);
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaVendasPosicionamentoEstoquePeriodos(dataPesquisaInicio, dataPesquisaFim, dataPesquisaInicioB, dataPesquisaFimB, dataPesquisaInicioC, dataPesquisaFimC, )
    }

  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Lista de Vendas"]}
        title="Relatório Vendas"
   

        InputFieldDTInicioAComponent={InputField}
        labelInputDTInicioA={"Data Início(A)"}
        onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}
        valueInputFieldDTInicioA={dataPesquisaInicio}
        
        InputFieldDTFimAComponent={InputField}
        labelInputDTFimA={"Data Fim(A)"}
        onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}
        valueInputFieldDTFimA={dataPesquisaFim}
        
        InputFieldDTInicioBComponent={InputField}
        labelInputDTInicioB={"Data Início(B)"}
        valueInputFieldDTInicioB={dataPesquisaInicioB}
        onChangeInputFieldDTInicioB={(e) => setDataPesquisaInicioB(e.target.value)}
        
        InputFieldDTFimBComponent={InputField}
        labelInputDTFimB={"Data Fim(B)"}
        onChangeInputFieldDTFimB={(e) => setDataPesquisaFimB(e.target.value)}
        valueInputFieldDTFimB={dataPesquisaFimB}
        
        InputFieldDTInicioCComponent={InputField}
        labelInputDTInicioC={"Data Início(C)"}
        onChangeInputFieldDTInicioC={(e) => setDataPesquisaInicioC(e.target.value)}
        valueInputFieldDTInicioC={dataPesquisaInicioC}
        
        InputFieldDTFimCComponent={InputField}
        labelInputDTFimC={"Data Fim(C)"}
        onChangeInputFieldDTFimC={(e) => setDataPesquisaFimC(e.target.value)}
        valueInputFieldDTFimC={dataPesquisaFimC}

        MultSelectGrupoComponent={MultSelectAction}
        optionsMultSelectGrupo={[
          {value: '', label: 'Selecione um Grupo'},
          ...dadosGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.GRUPO,
          }))
        ]}
        labelMultSelectGrupo={"Por Grupo"}
        defaultValueMultSelectGrupo={[grupoSelecionado]}
        onChangeMultSelectGrupo={handleGrupoChange}

        MultSelectSubGrupoComponent={MultSelectAction}
        optionsMultSelectSubGrupo={[
          {value: '', label: 'Selecione um SubGrupo'},
          ...dadosSubGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.ESTRUTURA,
          }))
        ]}
        labelMultSelectSubGrupo={"SubGrupo"}
        valueMultSelectSubGrupo={[subGrupoSelecionado]}
        onChangeMultSelectSubGrupo={handleSubGrupoChange}

        MultSelectFornecedorComponent={MultSelectAction}
        optionsMultSelectFornecedor={[
          {value: '', label: 'Selecione um Fornecedor'},
          ...dadosFornecedor.map((fornecedor) => ({
          value: fornecedor.ID_FORNECEDOR,
          label: `${fornecedor.ID_FORNECEDOR} ${fornecedor.FORNECEDOR}`,
          }))
        ]}
        labelMultSelectFornecedor={"Por Fornecedor"}
        valueMultSelectFornecedor={[fornecedorSelecionado]}
        isMultiSelectGrupo={true}
        onChangeMultSelectFornecedor={handleFornecedorChange}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód. Barras / Nome Produto"}
        valueInputFieldCodBarra={descricaoProduto}
        onChangeInputFieldCodBarra={(e) => setDescricaoProduto(e.target.value)}

        MultSelectMarcaComponent={MultSelectAction}
        labelMultSelectMarca={"Marca"}
        
        optionsMultSelectMarca={[
          {value: '', label: 'Selecione uma Marca'},
          ...dadosMarcasProdutos.map((marca) => ({
            value: marca.ID_MARCA,
            label: `${marca.ID_MARCA} ${marca.MARCA}`,
          }))
        ]}
        valueMultSelectMarca={marcaProduto}
        onChangeMultSelectMarca={handleMarcarChange}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Vendas e Estoque"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />


    {tabelaVisivel && (
       <ActionListaEstoqueProduto dadosEstoqueVendasPosicionamentoPeriodos={dadosEstoqueVendasPosicionamentoPeriodos} />
    )}    
    </Fragment>
  )
}

