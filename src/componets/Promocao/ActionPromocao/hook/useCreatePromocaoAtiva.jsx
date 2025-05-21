import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { get, post } from "../../../../api/funcRequest"
import { useQuery } from "react-query"
import Swal from "sweetalert2"
import { getDataAtual } from "../../../../utils/dataAtual"
import { useFetchData } from "../../../../hooks/useFetchData"
import * as XLSX from 'xlsx';
import { optionsMecanica } from "../../../../../mecanica"

export const useCreatePromocaoAtiva = ({ usuarioLogado  }) => {
  const [mecanicaSelecionada, setMecanicaSelecionada] = useState(0)
  const [aplicacaoDestinoSelecionada, setAplicacaoDestinoSelecionada] = useState('')
  const [tipoDescontoSelecionado, setTipoDescontoSelecionado] = useState(0)
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(-1)
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState(-1)
  const [grupoSelecionado, setGrupoSelecionado] = useState(-1)
  const [marcaSelecionada, setMarcaSelecionada] = useState(-1)
  const [empresaSelecionada, setEmpresaSelecionada] = useState([])
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [qtdInicio, setQtdInicio] = useState(0)
  const [qtdFim, setQtdFim] = useState('')
  const [vrDesconto, setVrDesconto] = useState(0)
  const [porcentoDesconto, setPorcentoDesconto] = useState(0)
  const [valorInicio, setValorInicio] = useState(0)
  const [valorFim, setValorFim] = useState(0)
  const [produtoOrigem, setProdutoOrigem] = useState('')
  const [fileProdutoOrigem, setFileProdutoOrigem] = useState([])
  const [marcaOrigem, setMarcaOrigem] = useState(-1)
  const [produtoDestino, setProdutoDestino] = useState('')
  const [fileProdutoDestino, setFileProdutoDestino] = useState([])
  const [marcaDestino, setMarcaDestino] = useState(-1)
  const [descricao, setDescricao] = useState('')
  const [precoPrdouto, setPrecoProduto] = useState(0)
  const [ipUsuario, setIpUsuario] = useState('')

  useEffect(() => {
    getIPUsuario();

  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/');
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  };

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataInicio(dataInicial)
    setDataFim(dataFinal)

  }, [])


  const { data: dadosFornecedorProduto = [], error: errorFornecedor, isLoading: isLoadingFornecedor, refetch: refetchFornecedor } = useQuery(
    'fornecedor-produto',
    async () => {
      const response = await get(`/fornecedor-produto`);
      return response.data;
    },
    { staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60, }
  );
  const { data: dadosGrupo = [], error: errorGrupo, isLoading: isLoadingGrupo, refetch: refetchGrupo } = useQuery(
    'subGrupoEstrutura',
    async () => {
      const response = await get(`/subGrupoEstrutura`);
      return response.data;
    },
    { staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60, }
  );
  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60, }
  );

  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    ['listaEmpresaComercial', marcaSelecionada],
    async () => {
      if (marcaSelecionada) {
        const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
        return response.data;
      } else {
        return [];
      }
    },
    { enabled: false, staleTime: 1000 * 60 * 60 }
  );

  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);

  

  const optionsFatorPromocao = [
    { value: 0, label: "Por Valor Final" },
    { value: 1, label: "Por Valor Desconto" },
    { value: 2, label: "Por Percentual Desconto" },
  ]

  const optionsTPapartide = [
    { value: 0, label: "aplicação destino por pares" },
    { value: 1, label: "aplicação destino em todos os produtos" },
    { value: 2, label: "aplicação destino no ultimo após entrada da promoção" },
    { value: 3, label: "aplicação destino menos na primeira" },
    { value: 4, label: "aplicação destino em (um) produto" },
  ]

  const opcoesPromocao = [
    { value: 1, label: "VALOR" },
    { value: 2, label: "QUANTIDADE" }
  ];


  const handleFileUpload = async (file, isOrigem) => {
    try {
      const data = await processFile(file);

      if (isOrigem) {
        setFileProdutoOrigem(JSON.stringify(data));
      } else {
        setFileProdutoDestino(JSON.stringify(data));
      }
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Falha ao processar o arquivo. Verifique o formato.',
      });
    }
  };

  const processFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target.result;
          let data = [];

          if (file.name.endsWith('.csv')) {
            data = processCSV(content);
          } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
            data = processXLSX(content);
          }

          const filteredData = data.filter(item => item && item.trim() !== '').map(item => item.toString());
          resolve(filteredData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Erro na leitura do arquivo'));

      if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const processCSV = (csvContent) => {
    const contentStr = typeof csvContent === 'string' ? csvContent : new TextDecoder().decode(csvContent);
    const lines = contentStr.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const firstItem = line.split(',')[0].replace(/"/g, '').trim();
        if (firstItem) {
          result.push(firstItem);
        }
      }
    }
    return result;
  }

  const processXLSX = (xlsxContent) => {
    const workbook = XLSX.read(xlsxContent, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const result = [];
    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      if (row && row.length > 0) {
        const firstCell = row[0]?.toString().trim();
        if (firstCell) {
          result.push(firstCell);
        }
      }
    }
    return result;
  }

  const mostrarProdutosSelecionados = useCallback((tipo) => {
    let produtos = [];
    let titulo = '';
    if (tipo === 'origem') {
      if (fileProdutoOrigem && fileProdutoOrigem.length > 0) {
        try {
          produtos = JSON.parse(fileProdutoOrigem);
        } catch {
          produtos = [];
        }
      } else if (produtoOrigem) {
        produtos = [produtoOrigem];
      }
      titulo = 'Produtos Origem Selecionados/Digitados';
    } else if (tipo === 'destino') {
      if (fileProdutoDestino && fileProdutoDestino.length > 0) {
        try {
          produtos = JSON.parse(fileProdutoDestino);
        } catch {
          produtos = [];
        }
      } else if (produtoDestino) {
        produtos = [produtoDestino];
      }
      titulo = 'Produtos Destino Selecionados/Digitados';
    }

    if (produtos.length === 0) {
      Swal.fire({
        icon: 'info',
        title: titulo,
        text: 'Nenhum produto informado.',
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: titulo,
      html: `<pre style="text-align:left">${produtos.join('<br>')}</pre>`,
      customClass: {
        container: 'custom-swal',
      },
      confirmButtonText: 'OK'
    });
  }, [fileProdutoOrigem, fileProdutoDestino, produtoOrigem, produtoDestino]);

  
  const onSubmit = async (data) => {


    if (!mecanicaSelecionada) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Selecione uma mecânica!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      })
      return;
    }

    if (empresaSelecionada == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Selecione uma empresa!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      })
      return;
    }

    if (descricao.length < 20 || descricao.length > 200) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Descrição deve ter entre 20 e 200 caracteres!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      })
      return;
    }

    const produtosOrigem = fileProdutoOrigem && fileProdutoOrigem.length > 0 ? JSON.parse(fileProdutoOrigem) : produtoOrigem ? [produtoOrigem] : [];
    const produtosDestino = fileProdutoDestino && fileProdutoDestino.length > 0 ? JSON.parse(fileProdutoDestino) : produtoDestino ? [produtoDestino] : [];

    const postData = ({

      TPAPARTIRDE: aplicacaoDestinoSelecionada,
      TPAPLICADOA: mecanicaSelecionada,
      TPFATORPROMO: tipoDescontoSelecionado,

      APARTIRDEQTD: qtdInicio,
      APARTIRDOVLR: valorInicio,
      FATORPROMOVLR: vrDesconto,
      FATORPROMOPERC: porcentoDesconto,

      VLPRECOPRODUTO: precoPrdouto,
      
      
      
      DTHORAINICIO: dataInicio,
      DTHORAFIM: dataFim + ' 23:59:59',
      DSPROMOCAOMARKETING: descricao.toUpperCase(),

      STEMPRESAPROMO: "True",
      STDETPROMOORIGEM: "True",
      STDETPROMODESTINO: "True",

      IDEMPRESA: empresaSelecionada,

      IDGRUPOEMDESTINO: grupoSelecionado,
      IDSUBGRUPOEMDESTINO: subGrupoSelecionado,
      IDMARCAEMDESTINO: marcaDestino,
      IDFORNECEDOREMDESTINO: fornecedorSelecionado,
      IDPRODUTODESTINO: produtosDestino,
      

      IDGRUPOEMORIGEM: grupoSelecionado,
      IDSUBGRUPOEMORIGEM: subGrupoSelecionado,
      IDMARCAEMORIGEM: marcaOrigem,
      IDFORNECEDOREMORIGEM: fornecedorSelecionado,
      IDPRODUTOORIGEM: produtosOrigem,
      IDPRODUTO: produtosDestino,

    });

    let timerInterval;
     Swal.fire({
      title: 'Processando sua promoção...',
      html: 'Aguarde enquanto enviamos os dados <b></b>',
      timerProgressBar: true,
      timer: 20000,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              b.textContent = `${Math.floor(Swal.getTimerLeft() / 1000)}s`;
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });

      
    try {
      const response = await post('/criar-promocoes-ativas', postData);
      // Swal.close()

      const textDados = JSON.stringify(postData);
      const createData = {
        IDFUNCIONARIO: usuarioLogado?.id,
        PATHFUNCAO: 'MARKETING/CADASTRO PROMOÇÃO',
        DADOS: textDados,
        IP: ipUsuario,
      };
      
      await post('/log-web', createData);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (error) {
      const createData = {
        IDFUNCIONARIO: usuarioLogado?.id,
        PATHFUNCAO: 'MARKETING/ERRO AO CADASTRAR PROMOÇÃO',
        DADOS: '',
        IP: ipUsuario,
      };

      await post('/log-web', createData);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro ao Cadastrar Promoção!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });

      return null;
    }
  };



  return {
    mecanicaSelecionada,
    setMecanicaSelecionada,
    aplicacaoDestinoSelecionada,
    setAplicacaoDestinoSelecionada,
    tipoDescontoSelecionado,
    setTipoDescontoSelecionado,
    fornecedorSelecionado,
    setFornecedorSelecionado,
    subGrupoSelecionado,
    setSubGrupoSelecionado,
    grupoSelecionado,
    setGrupoSelecionado,
    marcaSelecionada,
    setMarcaSelecionada,
    empresaSelecionada,
    setEmpresaSelecionada,
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    qtdInicio,
    setQtdInicio,
    qtdFim,
    setQtdFim,
    vrDesconto,
    setVrDesconto,
    porcentoDesconto,
    setPorcentoDesconto,
    valorInicio,
    setValorInicio,
    valorFim,
    setValorFim,
    produtoOrigem,
    setProdutoOrigem,
    fileProdutoOrigem,
    setFileProdutoOrigem,
    produtoDestino,
    setProdutoDestino,
    fileProdutoDestino,
    setFileProdutoDestino,
    descricao,
    setDescricao,
    precoPrdouto,
    setPrecoProduto,
    dadosFornecedorProduto,
    dadosGrupo,
    optionsMarcas,
    optionsEmpresas,
    optionsMecanica,
    optionsFatorPromocao,
    optionsTPapartide,
    ipUsuario,
    mostrarProdutosSelecionados,
    handleFileUpload,
    onSubmit
  }
}

// aplicação da amecanica já tem que trazer aplicação de destino e o tipo de desconto
// dividir a action o que for da mecanica trazer em baixa da mecanica 
//  o que for da empresa destino trazer os campos de destino a mesma coisa para origem
//  aumentar o tamanho do campos de input
// trazer o nome da promoção