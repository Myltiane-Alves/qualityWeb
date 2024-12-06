import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "./actionMain";
import { ButtonType } from "../Buttons/ButtonType";
import { InputField } from "../Buttons/Input";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { get } from "../../api/funcRequest";
import { dataFormatada } from "../../utils/dataFormatada";
import { AiOutlineSearch } from "react-icons/ai";


export const ActionGerenciaExtratoDeContasCorrenteLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dadosExtratoLojaPeriodo, setDadosExtratoLojaPeriodo] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // console.log(usuarioLogado, 'usuario')
  }, [usuarioLogado]);


  const getExtatoDaLoja = async () => {
    if(usuarioLogado && usuarioLogado.IDEMPRESA) {
      
  
      try {
        dataFormatada(dataPesquisaInicio)
        dataFormatada(dataPesquisaFim)

        const response = await get(`/extratoLojaPeriodoGerencia?idEmpresa=${usuarioLogado.IDEMPRESA}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`) 
        
        if(response.data && response.data.length > 0) {
          setDadosExtratoLojaPeriodo(response.data)
          // console.log(response.data, 'dadosExtratoLojaPeriodo')
        }
        return response.data;
      } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
      }
    }

  }

  const dados = dadosExtratoLojaPeriodo.map((item) => {
    
    
    return {
      SALDO: item.primeiraVendaSaldo.SALDO,
      TOTALQUEBRA: item.primeiraVendaSaldo.TOTALQUEBRA,

      VRECDINHEIRO: item.venda.VRECDINHEIRO,
      DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,

      DTPROCESSAMENTOFORMATADA: item.totalFaturas.DTPROCESSAMENTOFORMATADA,
      VRRECEBIDO: item.totalFaturas.VRRECEBIDO,
   
      DTDESPESAFORMATADA: item.despesas.DTDESPESAFORMATADA,
      DSPAGOA: item.despesas.DSPAGOA,
      DSHISTORIO: item.despesas.DSHISTORIO,
      DSCATEGORIA: item.despesas.DSCATEGORIA,
      VRDESPESA: item.despesas.VRDESPESA,
      
      DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
      NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
      DSMOTIVO: item.adiantamentos.DSMOTIVO,
      VRVALORDESCONTO: item.adiantamentos.VRVALORDESCONTO,
   
      IDMOV: item.quebracaixa.IDMOV,
      DTMOVCAIXA: item.quebracaixa.DTMOVCAIXA,
      FUNCIONARIOMOV: item.quebracaixa.FUNCIONARIOMOV,
      VRFISICODINHEIRO: item.quebracaixa.VRFISICODINHEIRO,
      VRRECDINHEIRO: parseFloat(item.venda.VRRECDINHEIRO),
      VRAJUSTDINHEIRO: item.quebracaixa.VRAJUSTDINHEIRO,

      IDDEPOSITOLOJA: item.totalDepositos.IDDEPOSITOLOJA,
      DTDEPOSITOFORMATADA: item.totalDepositos.DTDEPOSITOFORMATADA,
      FUNCIONARIO: item.totalDepositos.FUNCIONARIO,
      VRDEPOSITO: item.totalDepositos.VRDEPOSITO,
      DSBANCO: item.totalDepositos.DSBANCO,
      STCANCELADO: item.totalDepositos.STCANCELADO,
      STCONFERIDO: item.totalDepositos.STCONFERIDO,
      NUDOCDEPOSITO: item.totalDepositos.NUDOCDEPOSITO,

      IDAJUSTEEXTRATO: item.ajusteextrato.IDAJUSTEEXTRATO,
      DTCADASTROFORMATADA: item.ajusteextrato.DTCADASTROFORMATADA,
      VRDEBITO: item.ajusteextrato.VRDEBITO,
      VRCREDITO: item.ajusteextrato.VRCREDITO,
      HISTORICO: item.ajusteextrato.HISTORICO,
      STCANCELADO: item.ajusteextrato.STCANCELADO,

    
    }
  });


  const handleEdit = (item) => {
    // Lógica para manipular a edição do item
    console.log(`Editando item: ${item.id}`);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item editado
    console.log(`Salvando item: ${item.id}`);
  };

  const handleCancel = (item) => {
    // Lógica para cancelar a edição do item
    console.log(`Cancelando edição do item: ${item.id}`);
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dadosExemplos.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  const handlePaginaClicada = (pagina) => {
    setPaginaAtual(pagina);
  }

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const dadosPaginados = dadosExemplos.slice(indiceInicial, indiceFinal);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Resetar a página para a primeira ao alterar o número de linhas por página
  }

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      getExtatoDaLoja(usuarioLogado.IDEMPRESA)
      setTabelaVisivel(true)
    } 

  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Extrato de Contas Correntes "]}
        title=" Extrato de Contas Correntes da Loja"
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
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}
      />

     

      {tabelaVisivel && (   
        <Fragment>
            {/* <TableContainer component={Paper} sx={{ maxHeight: '100vh', overflow: 'auto' }}>
            <Table responsive className="mb-4">
            <TableHead className="mb-4 p-2" style={{ width: "100%" }}>

              <TableRow style={{ color: "#000", fontWeight: "600", textTransform: "uppercase" }}>
                Informativo
              </TableRow>

              <TableBody style={{ color: "#dc3545" }} ><b>Extrato a partir do dia 11 de dezembro de 2020<b></b></b></TableBody>

            </TableHead>


            <TableBody >
              {dados.length > 0 && (
                <TableRow className="">
                  <CustomTableCell  style={{ textAlign: "left", fontSize: "16px", }}><b>Saldo Anterior</b></CustomTableCell>
                  <CustomTableCell></CustomTableCell>
                  <CustomTableCell></CustomTableCell>
                  <CustomTableCell></CustomTableCell>
    
                  <CustomTableCell style={{ textAlign: "right", fontSize: "16px", }}><b>{formatMoeda(dados.reduce((acc, item) => acc + parseFloat(item.VRRECDINHEIRO), 0))}</b></CustomTableCell>
                  
                </TableRow>

              )}
              
          
          </TableBody>

          </Table>
              
              <Table stickyHeader >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#7a59ad", color: "#fff", border: '1px solid #0000001a', }}>
      
                    <CustomTableHeader>Dt. Lanç.</CustomTableHeader>
                    <CustomTableHeader>Histórico</CustomTableHeader>
                    <CustomTableHeader >Pago A</CustomTableHeader>
                    <CustomTableHeader >Despesa</CustomTableHeader>
                    <CustomTableHeader >Débito</CustomTableHeader>
                    <CustomTableHeader >Crédito</CustomTableHeader>
                    <CustomTableHeader >Saldo</CustomTableHeader>
                    <CustomTableHeader >Situação</CustomTableHeader>
                    <CustomTableHeader >Opção</CustomTableHeader>
                  </TableRow>
                </TableHead>
      
                <TableBody>
                  {dados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={row.ID}>
                      <CustomTableCell>{row.DTHORAFECHAMENTOFORMATADA}</CustomTableCell>
                      <CustomTableCell >Mov. Dinheiro do Caixa {row.DTHORAFECHAMENTOFORMATADA}</CustomTableCell>
                      <CustomTableCell>Vendas Dinheiro</CustomTableCell>
                      <CustomTableCell></CustomTableCell>
                      <CustomTableCell>0,00</CustomTableCell>
                      <CustomTableCell>0,00</CustomTableCell>
                      <CustomTableCell>{formatMoeda(row.VRRECDINHEIRO)}</CustomTableCell>
                      <CustomTableCell>{row.DSCAIXADESTINO}</CustomTableCell>
                      <CustomTableCell>{dataFormatada(row.DTOUTVOUCHER)}</CustomTableCell>
                   
      
                    </TableRow>
                  ))}
      
                </TableBody>
                {dados.length > 0 && (
                  <TableBody
                    sx={{
                      backgroundColor: '#f2f2f2',
                      color: '#333',
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                    }}
                  >
                    <TableRow>
                      <CustomTableCell>N° Venda</CustomTableCell>
                      <CustomTableCell>N° Produto</CustomTableCell>
                      <CustomTableCell>Cod. Barras</CustomTableCell>
                      <CustomTableCell colSpan={3}>Descrição</CustomTableCell>
                      <CustomTableCell>QTD</CustomTableCell>
                      <CustomTableCell>Valor</CustomTableCell>
                      <CustomTableCell>Vendedor</CustomTableCell>
                    </TableRow>
      
                    {dados.length > 0 && (
                      <TableRow>
                     
                        <CustomTableCellResultado>{dados[2].IDVENDA}</CustomTableCellResultado>
                        <CustomTableCellResultado>{dados[2].CPROD}</CustomTableCellResultado>
                        <CustomTableCellResultado>{dados[2].CEAN}</CustomTableCellResultado>
                        <CustomTableCellResultado colSpan={3}>{dados[2].DSPRODUTO}</CustomTableCellResultado>
                        <CustomTableCellResultado>{parseFloat(dados[2].QTD)}</CustomTableCellResultado>
                        <CustomTableCellResultado>{formatMoeda(dados[2].VRTOTALLIQUIDO)}</CustomTableCellResultado>
                        <CustomTableCellResultado>{dados[2].VENDEDOR_NOME}</CustomTableCellResultado>
                        
                      </TableRow>
                    )}
                  </TableBody>
                )}
      
              </Table>
            </TableContainer>
            <TablePagination
              style={{
                backgroundColor: "#7a59ad", width: "100%"
              }}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={dados.length} // Contagem dos itens em dadosCaixaMovimento
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={"Itens por página"}
            /> */}
        </Fragment>
      )}

    </Fragment >
  )
}
