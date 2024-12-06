import { Fragment, useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { ActionMain } from "./actionMain";
import { InputField } from "../Buttons/Input";
import { ButtonType } from "../Buttons/ButtonType";
import TabelaPrincipal from "../Tables/TabelaMain";
import { InputSelectAction } from "../Inputs/InputSelectAction";
import { useAuth } from "../../Providers/AuthContext";
import DataTable from 'react-data-table-component';
import { dataFormatada } from "../../utils/dataFormatada";
import { ButtonSearch } from "../Buttons/ButtonSearch";
import { get } from "../../api/funcRequest";
import { ButtonEditar } from "../ButtonsTabela/ButtonEditar";
import { ButtonCancelar } from "../ButtonsTabela/ButtonCancelar";
import { ButtonSalvar } from "../ButtonsTabela/ButtonSalvar";


export const ActionAdministrativoExtratoDeContasCorrenteLoja = () => {
  const { usuario } = useAuth()
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [empresaUsuario, setEmpresaUsuario] = useState([]);
  const [selecionadoUsuario, setSelecionadoUsuario] = useState(usuario);

  const [idEmpresa, setIdEmpresa] = useState(0);
  const [dadosExtratoLojaPeriodo, setDadosExtratoLojaPeriodo] = useState([])
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')


  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    getTodasEmpresas()
  }, [idEmpresa,])

  const getTodasEmpresas = async () => {

    try {

      const response = await get("/empresas",)
      if (response.data && response.data.length > 0) {
        setEmpresaUsuario(response.data)
   
      }
   
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }


   // Extrato da Loja
   useEffect(() => {
    getExtatoDaLoja()
    
  },[idEmpresa, dataPesquisaInicio, dataPesquisaFim])


  const getExtatoDaLoja = async () => {
    if(empresaUsuario.length > 0) {
      // console.log(empresaUsuario, "empresa usuario")
      const idEmpresa = Number(empresaUsuario[0].IDEMPRESA)
      try {
        dataFormatada(dataPesquisaInicio)
        dataFormatada(dataPesquisaFim)
        // console.log(dataPesquisaInicio, "antes do data")
        // console.log(dataPesquisaFim, "antes do data")
        const response = await get(`/listaExtratoDaLojaPeriodo?idEmpresa=${idEmpresa}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`) 
        
        // console.log(response, "antes do data")
        if(response.data && response.data.length > 0) {
          setDadosExtratoLojaPeriodo(response.data)
          // console.log(response.data, "extrato da loja")
        }
        return response.data;
      } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
      }
    }

  }

  const dados = dadosExtratoLojaPeriodo.map((item) => {
    // console.log(item, "item")
    
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
      VRRECDINHEIRO: item.quebracaixa.VRRECDINHEIRO,
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
  


  const colunasVendas = [
    {
      name: 'Código',	
      selector: row => row.CODIGO_ITEM,
    },
    {
      name: 'Cód. Barras',
      selector: row => parseFloat(row.CODIGO_BARRAS),

    },
    {
      name: 'Descrição',
      selector: row => row.DESCRICAO_ITEM,
    },
    {
      name: 'Preço Custo',
      selector: row => parseFloat(row.PRECO_CUSTO),
    },
    {
      name: 'Preço SAP',
      selector: row => row.PRECO_VENDA_SAP,
    },
    {
      name: 'Preço Quality',
      selector: row => row.PRECO_VENDA_PDV,
    },
    {
      name: 'Alterado',
      selector: row => dataFormatada(row.DATA_ULTIMA_ALTERACAO_PDV),
    },

    {
      name: 'Ações',
      button: true,
      cell: (row) => (
        <div className="d-flex "
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <ButtonEditar />
          </div>
          <div className="ml-2">
            <ButtonCancelar />
          </div>
          <div className="ml-2">
            <ButtonSalvar />
          </div>
        </div>
      ),
    },
  ];

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
  useEffect(() => {

  }, [dadosExemplos, dadosExtratoLojaPeriodo, itensPorPagina, paginaAtual]);


  const handleClick = () => {
    getExtatoDaLoja()
    setDataPesquisaInicio(dataPesquisaInicio)
    setDataPesquisaFim(dataPesquisaFim)
    setTabelaVisivel(true)
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
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)
        }
        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        onChangeSelectEmpresa={(e) => setSelecionadoUsuario(e.target.value)}
        valueSelectEmpresa={selecionadoUsuario}
        optionsEmpresas={empresaUsuario.map((empresa) => ({
          value: empresa.IDGRUPOEMPRESARIAL,
          label: empresa.NOFANTASIA,
        }))}
        labelSelectEmpresa={"Empresa"}


        // ButtonSearchComponent={ButtonType}
        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
      />

      {tabelaVisivel &&
        <div id="resultado ">

          {console.log(dadosExtratoLojaPeriodo, 'extratos')}

          <Table responsive className="mb-4">
            <thead className="mb-4 p-2" style={{ width: "100%" }}>

              <tr style={{ color: "#000", fontWeight: "600", textTransform: "uppercase" }}>
                Informativo
              </tr>

              <tr style={{ color: "#dc3545" }} ><b>Extrato a partir do dia 11 de dezembro de 2020<b></b></b></tr>

            </thead>


            <tbody >
              <tr className="">
                <td style={{ textAlign: "left", fontSize: "16px", }}><b>Saldo Anterior</b></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right", fontSize: "16px", }}><b>992.295.118,29</b></td>

              </tr>
            </tbody>

          </Table>

          <DataTable
          columns={colunasVendas}
          data={dados}
          pagination={itensPorPagina}
          paginationPerPage={10}
          customStyles={{
            header: {
              style: {
                backgroundColor: '#7a59ad', // altere para a cor de fundo desejada
                color: 'white', // altere para a cor de texto desejada
              },
            },
            headCells: {
              style: {
                backgroundColor: '#7a59ad', // altere para a cor de fundo desejada
                color: 'white', // altere para a cor de texto desejada
              },
            },
            cells: {
              style: {
                backgroundColor: '#fbfbfb', //#fbfbfb altere para a cor de fundo desejada

                border: '0.1px solid #e9e9e9',
                // borderRadius: '1px',
                color: '#000', // altere para a cor de texto desejada
              },
            },
            pagination: {
              style: {
                backgroundColor: '#7a59ad', // altere para a cor de fundo desejada
                color: 'white', // altere para a cor de texto desejada
              },
            },


          }}
        />


        </div>

      }

    </Fragment >
  )
}
