import { Fragment, useEffect, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlineSearch } from "react-icons/ai"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaCustosLoja } from "./actionListaCustosLoja";
import { ActionListaPosicionamentoEstoque } from "./actionListaPosicionamentoEstoque";
import { ActionListaProdutoMaisVendido } from "./actionListaProdutoMaisVendido";
import { ActionListaVendasPorVendedor } from "./actionListaVendasPorVendedor";
import { ActionListaVendasPorEstrutura } from "./actionListaVendasPorEstrutura";
import { ActionListaProdutoVendidoColaborador } from "./actionListaProdutoVendidoColaborador";

export const ActionPesquisaVendasRelatorio  = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelProdutosMaisVendidos, setTabelaVisivelProdutosMaisVendidos] = useState(false);
  const [tabelaVisivelVendasVendedor, setTabelaVisivelVendasVendedor] = useState(false);
  const [tabelaVisivelVendasEstrutura, setTabelaVisivelVendasEstrutura] = useState(false);
  const [tabelaVisivelEstoqueVendasPosicionamento, setTabelaVisivelEstoqueVendasPosicionamento] = useState(false);
  const [tabelaVisivelColaborador, setTabelaVisivelColaborador] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState([])
  const [marcaProdutoSelecionada, setMarcaProdutoSelecionada] = useState([])
  const [grupoSelecionado, setGrupoSelecionado] = useState([])
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState([])
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState([])
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')
  const [produtoPesquisado, setProdutoPesquisado] = useState('')
  const [optionsEmpresas, setOptionsEmpresas] = useState([])
  const [optionsMarcas, setOptionsMarcas] = useState([])
  const [dadosGrupos, setDadosGrupos] = useState([])
  const [dadosSubGrupos, setDadosSubGrupos] = useState([])
  const [dadosFornecedor, setDadosFornecedor] = useState([])
  const [dadosColaborador, setDadosColaborador] = useState([])
  const [dadosMarcaProduto, setDadosMarcaProduto] = useState([])
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [ufSelecionado, setUFSelecionado] = useState([]);
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [dadosCustosLojas, setDadosCustosLojas] = useState([]);
  const [dadosProdutosMaisVendiddos, setDadosProdutosMaisVendiddos] = useState([]);
  const [dadosVendasVendedor, setDadosVendasVendedor] = useState([]);
  const [dadosVendasEstrutura, setDadosVendasEstrutura] = useState([]);
  const [dadosEstoqueVendasPosicionamento, setDadosEstoqueVendasPosicionamento] = useState([]);
  const [dadosColaboradorProdutosVendidos, setDadosColaboradorProdutosVendidos] = useState([]);

  const [totalRecords, setTotalRecords] = useState(0);


  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
    if(getListaMarca) {
      getListaEmpresas(marcaSelecionada);

    }
    getListaMarca();
    getListaGrupo();
    getListaSubGrupos();
    getListaFornecedor();
    getListaColaboradores();
    getListaMarcaProduto();
  }, [marcaSelecionada]);

  const getListaMarca = async () => {
    try {
      const response = await get(`/marcasLista`,)
      if (response.data) {
        setOptionsMarcas(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar marcas: ', error)
    }
  }

  const getListaEmpresas = async () => {
    if(marcaSelecionada) {

      try {
        const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
        if (response.data && response.data.length > 0) {
          setOptionsEmpresas(response.data);
        }
        return response.data;
      } catch (error) {
  
      }
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
      const response = await get(`/listaSubGrupoProduto?idGrupo=${grupoSelecionado}`)
      if (response.data) { 
        setDadosSubGrupos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar sub grupos: ', error)
    }
    
  }

  const getListaFornecedor = async (marcaSelecionada = '') => {
    try {
      const response = await get(`/listaFornecedorProduto?idMarca=`)
      if (response.data) { 
        setDadosFornecedor(response.data)
      }
      return response.data;

    } catch (error) {
      console.log('Erro ao buscar lista de fornecedores: ', error)
    }
  }

  const getListaColaboradores = async (empresaSelecionada = '') => {
    try {
      const response = await get(`/funcionarioRelatorio?idEmpresa=${empresaSelecionada}`)
      if (response.data) { 
        setDadosColaborador(response.data)
      }
      return response.data;

    } catch (error) {
      console.log('Erro ao buscar lista de colaboradores: ', error)
    }
  }

  const getListaMarcaProduto = async (subGrupoSelecionado = '') => {
    try {
      const response = await get(`/listaMarcaProduto?idSubGrupo=${subGrupoSelecionado}`)
      if (response.data) { 
        setDadosMarcaProduto(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar marcas de produtos: ', error)
    }
  }

  const getListaVendasCustoLojas = async (page, pageSize, empresaSelecionada = '') => {
    const startIndex = page * pageSize;
    
    try {
      dataFormatada(dataPesquisaInicio)
      dataFormatada(dataPesquisaFim)

      const response = await get(`/custoPorLoja?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idGrupoEmpresarial=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${descricaoProduto}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${produtoPesquisado}`)
      if (response.data) {
        setDadosCustosLojas(response.data);
        setTotalRecords(response.data.length);
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar vendas por custo de lojas: ', error)
    }
  }

  const getListaProdutosMaisVendidos = async (
    fornecedorSelecionado = '',
    grupoSelecionado = '',
    subGrupoSelecionado = '',
    marcaSelecionada = ''
  ) => {

    try {
      // dataInicio=${dataPesquisaInicio}&dataFim=${dataPesquisaFim}&idGrupoEmpresarial=${idGrupoEmpresarial}&idEmpresa=${idLojaPesquisaVenda}&descricaoProduto=${descricaoProduto}&uf=${ufPesquisa}&idFornecedor=${idFornecedor}&idGrupoGrade=${idGrupo}&idGrade=${idGrade}&idMarcaProduto=${idMarca}
      const response = await get(`/produtosMaisVendidos?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idGrupoEmpresarial=${grupoSelecionado}&idLojaPesquisaVenda=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`)
      if (response.data) {
        setDadosProdutosMaisVendiddos(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  
  }

  const getListaVendasVendedor = async (

    fornecedorSelecionado = '',
    grupoSelecionado = '',
    subGrupoSelecionado = '',
    marcaSelecionada = ''
  ) => {
    
    try {
      const response = await get(`/vendasVendedorEstrutura?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLojaPesquisaVenda=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`)
      if (response.data) {
        setDadosVendasVendedor(response.data)
       
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
    
  }

  const getListaVendasEstrutura = async (
    fornecedorSelecionado = '',
    grupoSelecionado = '',
    subGrupoSelecionado = '',
    marcaSelecionada = ''
  ) => {

    try {
      const response = await get(`/vendasPorEstrutura?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idLojaPesquisaVenda=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarca=${marcaSelecionada}`)
      if (response.data) {
        setDadosVendasEstrutura(response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar vendas estruturas: ', error)
    }
    
  }

  const getListaVendasPosicionamentoEstoque = async () => {
    try {
      const response = await get(`/vendasPosicionamentoEstoque?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${marcaProdutoSelecionada}`)
      if (response.data) {
        setDadosEstoqueVendasPosicionamento(response.data)
        console.log('response.data: ', response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const getListaColaboradorProdutosVendidos = async () => {
    try {
      // colaborador-produtos-vendidos.xsjs?page=&dataInicio=${dataPesquisaInicio}&dataFim=${dataPesquisaFim}&idGrupoEmpresarial=${idMarca}&idEmpresa=${idEmpresa}&descricaoProduto=${descricaoProduto}&uf=${ufPesquisa}&idFornecedor=${idFornecedor}&idGrupoGrade=${idGrupo}&idGrade=${idGrade}&idMarcaProduto=${idMarcaProduto}&idFunc=${idFuncionario}
      const response = await get(`/colaboradorProdutosVendidos?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idMarca=${marcaSelecionada}&idEmpresa=${empresaSelecionada}&descricaoProduto=${produtoPesquisado}&ufPesquisa=${ufSelecionado}&idFornecedor=${fornecedorSelecionado}&idGrupo=${grupoSelecionado}&idGrade=${subGrupoSelecionado}&idMarcaProduto=${marcaProdutoSelecionada}&idFuncionario=${funcionarioSelecionado}`)
      if (response.data) {
        setDadosColaboradorProdutosVendidos(response.data)
        console.log('response.data: ', response.data)
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar dados colaboradores produtos vendidos: ', error)
    }
  }

  const handleSelectMarca = (e) => {
    const selectedId = Number(e.value);
   
    if (!isNaN(selectedId)) {
      setMarcaSelecionada(selectedId);
    }
  };

  const handleEmpresaChange = (selectedOptions) => {
   
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
    getListaVendasCustoLojas(values)

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

  const handleFuncionarioChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFuncionarioSelecionado(values);
    console.log('funcionarioSelecionado: ', funcionarioSelecionado)
  }

  const handleChangeMarcaProduto = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setMarcaProdutoSelecionada(values);
  }

  const handleSelectUF = (e) => {
    const selectedUF = e.value;
    setUFSelecionado(selectedUF);
  }


  const handleClick = () => {
    
    setTabelaVisivel(true)
    setTabelaVisivelProdutosMaisVendidos(false)
    setTabelaVisivelVendasVendedor(false)
    setTabelaVisivelVendasEstrutura(false)
    setTabelaVisivelEstoqueVendasPosicionamento(false)
    setTabelaVisivelColaborador(false)
    getListaVendasCustoLojas()
    

  }

  const hancleClickProdutosMaisVendidos = () => {
    setClickContador(prevContador => prevContador + 1);
    if(clickContador % 2 === 0) {
      setTabelaVisivelProdutosMaisVendidos(true)
      setTabelaVisivel(false)
      setTabelaVisivelVendasVendedor(false)
      setTabelaVisivelVendasEstrutura(false)
      setTabelaVisivelEstoqueVendasPosicionamento(false)
      setTabelaVisivelColaborador(false)
      getListaProdutosMaisVendidos()
    }
  }

  const handleClickVendasVendedor = () => {
    setClickContador(prevContador => prevContador + 1);
    if(clickContador % 2 === 0) {
      setTabelaVisivelVendasVendedor(true)
      setTabelaVisivel(false)
      setTabelaVisivelProdutosMaisVendidos(false)
      setTabelaVisivelVendasEstrutura(false)
      setTabelaVisivelEstoqueVendasPosicionamento(false)
      setTabelaVisivelColaborador(false)
      getListaVendasVendedor()
    }
  }

  const handleClickVendasEstrutura = () => {
    setClickContador(prevContador => prevContador + 1);
    if(clickContador % 2 === 0) {
      setTabelaVisivelVendasEstrutura(true)
      setTabelaVisivelVendasVendedor(false)
      setTabelaVisivel(false)
      setTabelaVisivelProdutosMaisVendidos(false)
      setTabelaVisivelEstoqueVendasPosicionamento(false)
      setTabelaVisivelColaborador(false)
      getListaVendasEstrutura()
    }
  }


  const handleClickVendasPosicionamentoEstoque = () => {
    setClickContador(prevContador => prevContador + 1);
    if(clickContador % 2 === 0) {
      setTabelaVisivelEstoqueVendasPosicionamento(true)
      setTabelaVisivelVendasVendedor(false)
      setTabelaVisivel(false)
      setTabelaVisivelProdutosMaisVendidos(false)
      setTabelaVisivelVendasEstrutura(false)
      setTabelaVisivelColaborador(false)
      getListaVendasPosicionamentoEstoque()
    }
  }

  const handleClickColaboradorProdutosVendidos = () => {
    setClickContador(prevContador => prevContador + 1);
    if(clickContador % 2 === 0) {
      setTabelaVisivelColaborador(true)
      setTabelaVisivel(false)
      setTabelaVisivelVendasVendedor(false)
      setTabelaVisivelVendasEstrutura(false)
      setTabelaVisivelEstoqueVendasPosicionamento(false)
      setTabelaVisivelProdutosMaisVendidos(false)
      getListaColaboradorProdutosVendidos(funcionarioSelecionado)
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
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)} 
       

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


        InputSelectUFComponent={InputSelectAction}
        optionsSelectUF={optionsUF.map((item) => ({
          value: item.value,
          label: item.label,
        }))}   
        labelSelectUF={"UF"}
        valueSelectUF={ufSelecionado}
        onChangeSelectUF={handleSelectUF}


        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Por Marca"}
        optionsMarcas={[
          { value: null, label: 'Selecione uma Marca' },          
          ...optionsMarcas.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.DSGRUPOEMPRESARIAL,

          }))
        ]}
        valueSelectMarcas={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

  
        MultSelectEmpresaComponent={MultSelectAction}
        optionsMultSelectEmpresa={[
          { value: null, label: 'Selecione uma loja' },
            ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelMultSelectEmpresa={"Empresa"}
        valueMultSelectEmpresa={[empresaSelecionada]}
        onChangeMultSelectEmpresa={handleEmpresaChange}

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
        isMultiSelectGrupo={true}

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

        MultSelectMarcaComponent={MultSelectAction}
        labelMultSelectMarca={"Marcas"}
        optionsMultSelectMarca={dadosMarcaProduto.map((item) => {
          return {
            value: item.ID_MARCA,
            label: item.MARCA,

          }
        })}
        valueMultSelectMarca={[marcaProdutoSelecionada]}
        onChangeMultSelectMarca={handleChangeMarcaProduto}

        MultSelectFuncionarioComponent={MultSelectAction}
        labelMultSelectFuncionario={"Funcionário"}
        optionsMultSelectFuncionario={[
          {value: '', label: 'Selecione um Funcionário'},
          ...dadosColaborador.map((item) => ({
            value: item.IDFUNCIONARIO,
            label: item.NOFUNCIONARIO,
          }))
        ]}
        valueMultSelectFuncionario={[funcionarioSelecionado]}
        onChangeMultSelectFuncionario={handleFuncionarioChange}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Custo Por Loja "}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Posicionamento Estoque"}
        onButtonClickCadastro={handleClickVendasPosicionamentoEstoque}
        corCadastro={"success"}
        IconCadastro={AiOutlineSearch}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Vendas Por Vendedor"}
        onButtonClickCancelar={handleClickVendasVendedor}
        corCancelar={"warning"}
        IconCancelar={AiOutlineSearch}

        ButtonTypeVendasEstrutura={ButtonType}
        linkNomeVendasEstrutura={"Produtos Mais Vendidos"}
        onButtonClickVendasEstrutura={hancleClickProdutosMaisVendidos}
        corVendasEstrutura={"info"}
        iconVendasEstrutura={AiOutlineSearch}

        ButtonTypeVendasVendedor={ButtonType}
        linkNomeVendasVendedor={"Vendas Por Estrutura"}
        onButtonClickVendasVendedor={handleClickVendasEstrutura}
        corVendasVendedor={"danger"}
        iconVendasVendedor={AiOutlineSearch}


        ButtonTypeProdutoVendidos={ButtonType}
        linkNomeProdutoVendido={"Colaborador Produtos Vendidos"}
        onButtonClickProdutoVendido={handleClickColaboradorProdutosVendidos}
        iconProdutoVendido={AiOutlineSearch}
        corProdutoVendido={"warning"}
      />

      {tabelaVisivel && ( 
        <ActionListaCustosLoja dadosCustosLojas={dadosCustosLojas} />
      )}

      {tabelaVisivelProdutosMaisVendidos && (
        <ActionListaProdutoMaisVendido dadosProdutosMaisVendiddos={dadosProdutosMaisVendiddos} />
      )}

      {tabelaVisivelVendasVendedor && (
        <ActionListaVendasPorVendedor dadosVendasVendedor={dadosVendasVendedor} />
      )}

      {tabelaVisivelVendasEstrutura && (
        <ActionListaVendasPorEstrutura dadosVendasEstrutura={dadosVendasEstrutura} />
      )}
      {tabelaVisivelEstoqueVendasPosicionamento && (
        <ActionListaPosicionamentoEstoque dadosEstoqueVendasPosicionamento={dadosEstoqueVendasPosicionamento} />
      )}
      {tabelaVisivelColaborador && (
        <ActionListaProdutoVendidoColaborador dadosColaboradorProdutosVendidos={dadosColaboradorProdutosVendidos} />
      )}

    </Fragment>
  )
}

// TOTAL DE LINHAS 2203