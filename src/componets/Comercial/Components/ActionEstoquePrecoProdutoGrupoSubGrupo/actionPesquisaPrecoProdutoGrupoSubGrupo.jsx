import { Fragment, useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get } from "../../../../api/funcRequest";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ActionMain } from "../../../Actions/actionMain";
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaPrecoProdutoGrupoSubGrupo } from "./actionListaPrecoProdutoGrupoSubGrupo";
import { getDataAtual } from "../../../../utils/dataAtual";


export const ActionPesquisaPrecoProdutoGrupoSubGrupo = () => {
  const [clickContador, setClickContador] = useState(0);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [optionsMarcas, setOptionsMarcas] = useState([]);
  const [optionsEmpresas, setOptionsEmpresas] = useState([]);
  const [dadosGrupos, setDadosGrupos] = useState([]);
  const [dadosFornecedor, setDadosFornecedor] = useState([]);
  const [dadosSubGrupos, setDadosSubGrupos] = useState([]);
  const [dadosListaEstoque, setDadosListaEstoque] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [produtoPesquisado, setProdutoPesquisado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [ufSelecionado, setUFSelecionado] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')
  const [descricaoProduto, setDescricaoProduto] = useState('')

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
    getListaMarcas()
    getListaFornecedor()
    getListaGrupo()
    getListaSubGrupos()
    if(getListaMarcas) {
      getTodasEmpresas(marcaSelecionada)
    }

  }, [marcaSelecionada])

  const getListaMarcas = async () => {
    try {
      const response = await get(`/listaGrupoEmpresas`,)
      if (response.data) {
        setOptionsMarcas(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar Marcas: ', error)
    }
  }

  const getTodasEmpresas = async () => {
    try {
      const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`)
      if (response.data) {
        setOptionsEmpresas(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

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
      const response = await get(`/listaSubGrupoProduto`)
      if (response.data) { 
        setDadosSubGrupos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar sub grupos: ', error)
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

  const getListaProdutosEstoquePreco = async () => {
    try {                                         
      const response = await get(`/produtosPrecosEstoquesLojas?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${descricaoProduto}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${produtoPesquisado}&vlPrecoProduto=${precoProduto}`)
      if (response.data) { 
        setDadosListaEstoque(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar produtos: ', error)
    }
  }


  const handleSelectMarca = (e) => {
    setMarcaSelecionada(e.value);
  };

  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
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

  const handleSelectUF = (e) => {
    const selectedUF = e.value;
    setUFSelecionado(selectedUF);
  }


  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(true)
      getListaProdutosEstoquePreco(marcaSelecionada, empresaSelecionada, dataPesquisaInicio, dataPesquisaFim)
    } 

  }


  const optionsUF = [
    { value: 'DF', label: 'DF' },
    { value: 'GO', label: 'GO' },
  ]

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Relatórios Vendas"]}
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

        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: null, label: 'Selecione uma loja' },
            ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={empresaSelecionada}
        onChangeMultSelectEmpresa={handleEmpresaChange}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={[
          { value: '', label: 'Selecione uma Marca' },          
          ...optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.GRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}



        MultSelectGrupoComponent={MultSelectAction}
        optionsMultSelectGrupo={[
          {value: '', label: 'Selecione um Grupo'},
          ...dadosGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.GRUPO,
          }))
        ]}
        labelMultSelectGrupo={"Por Grupo"}
        valueMultSelectGrupo={grupoSelecionado}
        onChangeSelectGrupo={handleGrupoChange}

        MultSelectSubGrupoComponent={MultSelectAction}
        optionsMultSelectSubGrupo={[
          {value: '', label: 'Selecione um SubGrupo'},
          ...dadosSubGrupos.map((item) => ({
            value: item.ID_GRUPO,
            label: item.ESTRUTURA,
          }))
        ]}
        labelMultSelectSubGrupo={"SubGrupo"}
        valueMultSelectSubGrupoo={subGrupoSelecionado}
        onChangeMultSelectSubGrupo={handleSubGrupoChange}

        InputSelectUFComponent={InputSelectAction}
        optionsSelectUF={optionsUF.map((item) => ({
          value: item.value,
          label: item.label,
        }))}   
        labelSelectUF={"UF"}
        valueSelectUF={ufSelecionado}
        onChangeSelectUF={handleSelectUF}


        InputFieldComponent={InputField}
        labelInputField={"Marca"}
        valueInputField={descricaoProduto}
        onChangeInputField={e => setDescricaoProduto(e.target.value)}

        InputFieldQuantidadeComponent={InputField}
        labelInputFieldQuantidade={"Preço Produto"}
        valueInputQuantidade={precoProduto}
        onChangeInputQuantidade={e => setPrecoProduto(e.target.value)}

        MultSelectFornecedorComponent={MultSelectAction}
        optionsMultSelectFornecedor={[
          {value: '', label: 'Selecione um Fornecedor'},
          ...dadosFornecedor.map((fornecedor) => ({
          value: fornecedor.ID_FORNECEDOR,
          label: `${fornecedor.ID_FORNECEDOR} ${fornecedor.FORNECEDOR}`,
          }))
        ]}
        labelMultSelectFornecedor={"Por Fornecedor"}
        valueMultSelectFornecedor={fornecedorSelecionado}
        onChangeMultSelectFornecedor={handleFornecedorChange}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Cód.Barras / Nome Produto"}
        valueInputFieldCodBarra={produtoPesquisado}
        onChangeInputFieldCodBarra={e => setProdutoPesquisado(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Posicionamento de Estoques"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />
  
      {tabelaVisivel &&
         <ActionListaPrecoProdutoGrupoSubGrupo dadosListaEstoque={dadosListaEstoque} />
      }

    </Fragment>
  )
}

