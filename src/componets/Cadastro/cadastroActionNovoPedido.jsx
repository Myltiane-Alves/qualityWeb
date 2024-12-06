import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../Actions/actionMain"
import { InputField } from "../Buttons/Input"
import { InputSelectAction } from "../Inputs/InputSelectAction"
import DataTable from 'react-data-table-component';
import { get } from "../../api/funcRequest";

export const CadastroActionNovoPedido = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const [actionVisivel, setActionVisivel] = useState(true);
  const [clickContador, setClickContador] = useState(0);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dadosListaPedidos, setDadosListaPedidos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null)
  const [marcas, setMarcas] = useState([])
  const [compradores, setCompradores] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [fabricantes, setFabricantes] = useState([])
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [fabricanteSelecionado, setFabricanteSelecionado] = useState('')
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')
  const [situacaoSelecionada, setSituacaoSelecionada] = useState('')
  const [compradorSelecionado, setCompradorSelecionado] = useState('')
  const [numeroPedido, setNumeroPedido] = useState('')

  
  useEffect(() => {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toISOString().slice(0, 10);
    setDataPesquisaInicio(dataFormatada)
    setDataPesquisaFim(dataFormatada)
  }, [])

  
  
  useEffect(() => {
    getGrupoMarca()
    getFornecedores()
    getFabricantes()
    getCompradores()
  }, [])

  const getGrupoMarca = async () => {
    try {
      const response = await get(`/listaGrupoEmpresas`)
      if (response.data) {
        setMarcas(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }
  const getFornecedores = async () => {
    try {
      const response = await get(`/fornecedores`)
      if (response.data && Array.isArray(response.data)) {
        setFornecedores(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }
  const getFabricantes = async () => {
    try {
      const response = await get(`/fabricantes`)
      if (response.data) {
        setFabricantes(response.data)
        // console.log(response.data, 'fabricantes')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }
  const getCompradores = async () => {
    try {
      const response = await get(`/compradores`)
      if (response.data) {
        setCompradores(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  useEffect(() => {
    if (dataPesquisaFim && dataPesquisaInicio) {
        getListaPedidos(marcaSelecionada, fabricanteSelecionado, compradorSelecionado, situacaoSelecionada);
    }
  }, [marcaSelecionada, fabricanteSelecionado, compradorSelecionado, situacaoSelecionada, dataPesquisaInicio, dataPesquisaFim]);


  const getListaPedidos = async (marcaSelecionada = '', fabricanteSelecionado = '', compradorSelecionado = '', situacaoSelecionada = '') => {
    try {
        const response = await get(`/listaPedidos?idMarcaPesquisa=${marcaSelecionada}&NuPedidoPesquisa=${numeroPedido}&idFabPesquisa=${fabricanteSelecionado}&idCompradorPesq=${compradorSelecionado}&STSituacoPedidoPesq=${situacaoSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`)
        if (response.data) {
            setDadosListaPedidos(response.data)
        }
    } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
    }
    
  }


  const dadosPedidos = dadosListaPedidos.map((item, index) => {
    let contador = index + 1;
    return {
      IDPEDIDO: item.IDPEDIDO,
      DTPEDIDO: item.DTPEDIDO,
      VRTOTALLIQUIDO: item.VRTOTALLIQUIDO,
      NOMECOMPRADOR: item.NOMECOMPRADOR,
      NOFANTASIA: item.NOFANTASIA,
      NOFORNECEDOR: item.NOFORNECEDOR,
      FABRICANTE: item.FABRICANTE,
      DSANDAMENTO: item.DSANDAMENTO,
      DSSETOR: item.DSSETOR,
      MODPEDIDO: item.MODPEDIDO,
      STMIGRADOSAP: item.STMIGRADOSAP,
      STCANCELADO: item.STCANCELADO,
      contador
    }
  });


  const colunasPedidos = [
    {
      name: '*',
      selector: row => row.contador,
      sortable: true,
    },
    {
      name: 'Data',
      selector: row => row.DTPEDIDO,
      sortable: true,
    },
    {
      name: 'Nº Pedido',
      selector: row => row.IDPEDIDO,
      sortable: true,
    },
    {
      name: 'Marca',
      selector: row => row.NOFANTASIA,
      sortable: true,
    },
    {
      name: 'Comprador',
      selector: row => row.NOMECOMPRADOR,
      sortable: true,
    },
    {
      name: 'Fornecedor',
      selector: row => row.NOFORNECEDOR,
      sortable: true,
    },
    {
      name: 'Fabricante',
      selector: row => row.FABRICANTE,
      sortable: true,
    },
    {
      name: 'Vr Pedido',
      selector: row => row.VRTOTALLIQUIDO,
      sortable: true,
    },
    {
      name: 'Situação',
      cell: row => (
        <div style={{ color: row.STCANCELADO === 'FALSE' ? 'blue' : 'red' }}>
          {row.STCANCELADO === 'FALSE' ? 'ABERTO' : 'FECHADO'}
        </div>
      ),
      sortable: true,
    },
  

  ]

  const handleSelectMarca = (e) => {
    const selectedMarcaId = Number(e.target.value);
    if (!isNaN(selectedMarcaId) && selectedMarcaId !== marcaSelecionada) {
      // setIdGrupo(selectedMarcaId);
      setMarcaSelecionada(selectedMarcaId);
    }
  };

  const handleSelectFornecedor = (e) => {
    const selectFornecedorID = Number(e.target.value);
    if (!isNaN(selectFornecedorID) && selectFornecedorID !== fornecedorSelecionado) {
      setFornecedorSelecionado(selectFornecedorID);
    }

  }

  const handleSelectSituacao = (e) => {
    const selectSituacaoID = Number(e.target.value);
    if(!isNaN(selectSituacaoID) && selectSituacaoID !== situacaoSelecionada) {
      setSituacaoSelecionada(selectSituacaoID);
    }

  }

  const handleSelectFabricante = (e) => {
    const selectFabricanteID = Number(e.target.value);
    if(!isNaN(selectFabricanteID) && selectFabricanteID !== fabricanteSelecionado) {
      setFabricanteSelecionado(selectFabricanteID);
    }
  }

  const handleSelectComprador = (e) => {
    const selectCompradorID = Number(e.target.value);
    if(!isNaN(selectCompradorID) && selectCompradorID !== compradorSelecionado) {
      setCompradorSelecionado(selectCompradorID);
    }
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);
    getListaPedidos()
    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {
      setTabelaVisivel(true)
    }
  }

  const optionsSituacao = [
    { id: 1, value: '0', label: "Todas" },
    { id: 2, value: '1', label: "Migradas SAP" },
    { id: 3, value: '2', label: "Não Migradas SAP" },
    
  ];

  return (

    <Fragment>
      <ActionMain
        title="Dashboard Cadastros"
        subTitle="Movimento de Caixa"
        linkComponentAnterior={["Home"]}
        linkComponent={["Tela Principal"]}

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputFieldNumeroNFComponent={InputField}
        labelInputFieldNumeroNF={"N° Pedido"}
        valueInputFieldNumeroNF={numeroPedido}
        onChangeInputFieldNumeroNF={(e) => setNumeroPedido(e.target.value)}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={marcas && marcas.map((marca) => ({
          value: marca.IDGRUPOEMPRESARIAL,
          label: marca.GRUPOEMPRESARIAL,
        }))}
        onChangeSelectMarcas={handleSelectMarca}
        valueSelectMarca={marcaSelecionada}

        InputSelectFornecedorComponent={InputSelectAction}
        optionsFornecedores={fornecedores.map((fornecedor) => ({
          value: fornecedor.IDFORNECEDOR,
          // label: fornecedor.NOFANTASIA + fornecedor.NUCNPJ + fornecedor.NORAZAOSOCIAL,
          label: fornecedor.NOFANTASIA ,
          
        }))}
        onChangeSelectFornecedor={handleSelectFornecedor}
        valueSelectFornecedor={fornecedorSelecionado}
        labelSelectFornecedor={"Por Fornecedor"}


        InputSelectFabricanteComponent={InputSelectAction}
        optionsFabricantes={fabricantes && fabricantes.map((fabricante) => ({
          value: fabricante.IDFABRICANTE,
          label: fabricante.DSFABRICANTE,
        }))}
        onChangeSelectFabricante={handleSelectFabricante}
        valueSelectFabricante={fabricanteSelecionado}
        labelSelectFabricantes={"Por Fabricante"}

        InputSelectCompradorComponent={InputSelectAction}
        optionsCompradores={compradores && compradores.map((comprador) => ({
          value: comprador.IDFUNCIONARIO,
          label: comprador.NOFUNCIONARIO,
        }))}
        onChangeSelectComprador={handleSelectComprador}
        valueSelectComprador={fabricanteSelecionado}
        labelSelectComprador={"Por Comprador"}

        InputSelectSituacaoComponent={InputSelectAction}
        optionsSituacao={optionsSituacao.map((situacao) => ({
          value: situacao.value,
          label: situacao.label,
        }))}
        labelSelectSituacao={"Por Situação"}
        valueSelectSituacao={situacaoSelecionada}
        onChangeSelectSituacao={handleSelectSituacao}


        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
      />

     
      <div id="resultadoListaPdido"
        style={{ backgroundColor: "#fff", padding: "15px" }}
      >
        <div className="panel-hdr">
          <h2>
            Lista de Pedidos <span class="fw-300"><i>Por Período</i></span>
          </h2>
        </div>
        <div className="row mb-4">

          <ButtonType 
            Icon={AiOutlineSearch} 
            iconSize="16px"
            textButton="Relatório Resumido" 
            cor="primary" 
            tipo="button" 
          />
          <ButtonType 
            Icon={AiOutlineSearch}
            iconSize="16px"
            textButton="Relatório Detalhado"
            cor="secondary"
            tipo="button"
          />
          <ButtonType 
            Icon={AiOutlineSearch}
            iconSize="16px"
            textButton="Relatório Produtos Criado"
            cor="info"
            tipo="button" 
          />
        </div>

        <DataTable
          title="Todos os Resultados"
          columns={colunasPedidos}
          data={dadosPedidos}

          pagination={itensPorPagina}
          paginationPerPage={10}
          customStyles={{
            header: {
              style: {
                backgroundColor: '#f2f2f2',
                color: '#7a59ad',
              },
            },
            headCells: {
              style: {
                backgroundColor: '#7a59ad',
                color: 'white',
              },
            },
            cells: {
              style: {
                backgroundColor: '#fbfbfb',

                border: '0.1px solid #e9e9e9',
                // borderRadius: '1px',
                color: '#000',
              },
            },
            pagination: {
              style: {
                backgroundColor: '#7a59ad',
                color: 'white',
              },
            },

          }}
        />

      </div>
    </Fragment>
  )
}

