// import { Fragment, useEffect, useState } from "react"
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { getDataAtual, getUmdiaAntes } from "../../../../utils/dataAtual"
// import { formatMoeda } from "../../../../utils/formatMoeda";
// import { dataFormatada } from "../../../../utils/dataFormatada";
// import { toFloat } from "../../../../utils/toFloat";
// import { ButtonType } from "../../../Buttons/ButtonType";
// import { MdAdd } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import { FaLockOpen } from "react-icons/fa";
// import { ActionCadastroAjusteExtratoModal } from "./actionCadastroAjusteExtratoModal";



// export const ActionListaExtratoLoja = ({ dadosExtratoLojaPeriodo }) => {
//   const [modalAjuste, setAjusteModal] = useState(false);

//   const dataUmdiaAntes = getUmdiaAntes();
//   const dados = dadosExtratoLojaPeriodo.map((item) => {
//     const saldoAnterior = parseFloat(item.primeiraVendaSaldo.SALDO) + parseFloat(item.primeiraVendaSaldo.TOTALQUEBRA);

//     const totalSaldoAnterior = saldoAnterior + parseFloat(item.venda.VRECDINHEIRO);

//     return {
//       SALDO: item.primeiraVendaSaldo.SALDO,
//       TOTALQUEBRA: item.primeiraVendaSaldo.TOTALQUEBRA,

//       VRECDINHEIRO: toFloat(item.venda.VRECDINHEIRO),
//       DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,

//       DTPROCESSAMENTOFORMATADA: item.totalFaturas.DTPROCESSAMENTOFORMATADA,
//       VRRECEBIDO: item.totalFaturas.VRRECEBIDO,

//       DTDESPESAFORMATADA: item.despesas.DTDESPESAFORMATADA,
//       DSPAGOA: item.despesas.DSPAGOA,
//       DSHISTORIO: item.despesas.DSHISTORIO,
//       DSCATEGORIA: item.despesas.DSCATEGORIA,
//       VRDESPESA: item.despesas.VRDESPESA,

//       DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
//       NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
//       DSMOTIVO: item.adiantamentos.DSMOTIVO,
//       VRVALORDESCONTO: item.adiantamentos.VRVALORDESCONTO,

//       IDMOV: item.quebracaixa.IDMOV,
//       DTMOVCAIXA: item.quebracaixa.DTMOVCAIXA,
//       FUNCIONARIOMOV: item.quebracaixa.FUNCIONARIOMOV,
//       VRFISICODINHEIRO: item.quebracaixa.VRFISICODINHEIRO,
//       VRRECDINHEIRO: item.quebracaixa.VRRECDINHEIRO,
//       VRAJUSTDINHEIRO: item.quebracaixa.VRAJUSTDINHEIRO,

//       IDDEPOSITOLOJA: item.totalDepositos.IDDEPOSITOLOJA,
//       DTDEPOSITOFORMATADA: item.totalDepositos.DTDEPOSITOFORMATADA,
//       FUNCIONARIO: item.totalDepositos.FUNCIONARIO,
//       VRDEPOSITO: item.totalDepositos.VRDEPOSITO,
//       DSBANCO: item.totalDepositos.DSBANCO,
//       STCANCELADO: item.totalDepositos.STCANCELADO,
//       STCONFERIDO: item.totalDepositos.STCONFERIDO,
//       NUDOCDEPOSITO: item.totalDepositos.NUDOCDEPOSITO,

//       IDAJUSTEEXTRATO: item.ajusteextrato.IDAJUSTEEXTRATO,
//       DTCADASTROFORMATADA: item.ajusteextrato.DTCADASTROFORMATADA,
//       VRDEBITO: item.ajusteextrato.VRDEBITO,
//       VRCREDITO: item.ajusteextrato.VRCREDITO,
//       HISTORICO: item.ajusteextrato.HISTORICO,
//       STCANCELADO: item.ajusteextrato.STCANCELADO,

//       saldoAnterior: saldoAnterior,
//       totalSaldoAnterior: totalSaldoAnterior,

//     }
//   });

//   const [selectedProduct, setSelectedProduct] = useState(dados);
//   const colunasSaldoLoja = [
//     {
//       field: 'DTHORAFECHAMENTOFORMATADA',
//       header: 'Dt. Lançamento',
//       body: row => <p>{row.DTHORAFECHAMENTOFORMATADA}</p>,
//       sortable: true,
//     },
//     {
//       field: 'DTHORAFECHAMENTOFORMATADA',
//       header: 'Histórico',
//       body: row => <p style={{width: "13rem"}}> Mov. Dinherio do Caixa {row.DTHORAFECHAMENTOFORMATADA}</p>,
//       sortable: true,
//     },
//     {
//       field: '',
//       header: 'Pago A',
//       body: row => <p style={{width: "7rem"}}>Vendas Dinheiro</p>,
//       sortable: true,
//     },
//     {
//       header: 'Despesa'
//     },
//     {
//       field: '',
//       header: 'Débito',
//       body: row => <p style={{ fontWeight: 600 }}>0,00</p>,
//       sortable: true,
//     },
//     {
//       field: 'VRECDINHEIRO',
//       header: 'Crédito',
//       body: row => <p style={{ fontWeight: 600 }}>{formatMoeda(row.VRECDINHEIRO)}</p>,
//       sortable: true,
//     },
//     {
//       field: 'saldoAnterior',
//       header: 'Saldo',
//       body: row => <p style={{ fontWeight: 600 }}>{formatMoeda(row.saldoAnterior)}</p>,
//       sortable: true,
//     },
//     {
//       field: '',
//       header: 'Situação',
//       body: row => <p style={{ fontWeight: 600 }}></p>,
//       sortable: true,
//     },
//     {
//       field: '',
//       header: 'Opção',
//       body: row => <p style={{ fontWeight: 600 }}></p>,
//       sortable: true,
//     }
//   ]
//   return (



//     <Fragment>
//       <div>
//         <header>
//           <div style={{padding: "10px"}}>

//             <h1 style={{textAlign: 'center', color: '#7a59ad'}}>INFORMATIVO</h1>
//           </div>

//           <div style={{display: 'flex', marginBottom: '20px'}}>

//                 <ButtonType 
//                   type="button" 
//                   className="btn btn-success" 
//                   title="Extrato Loja" 
//                   onClick={() => {}} 
//                   textButton="Cadastrar Depósitos"
//                   Icon={MdAdd}
//                   iconSize={18}
//                 />
//                 <ButtonType 
//                   type="button" 
//                   className="btn btn-danger" 
//                   title="Extrato Loja" 
//                   onClickButtonType={() => setAjusteModal(true)} 
//                   textButton="Ajustar Extrato"
//                   Icon={CiEdit}
//                   iconSize={18}
//                 />


//                 <ButtonType 
//                   type="button" 
//                   className="btn btn-success " 
//                   title="Extrato Loja" 
//                   onClick={() => {}} 
//                   textButton="Bloquear Data Depósito"
//                   Icon={FaLockOpen}
//                   iconSize={18}
//                 />



//           </div>
//         </header>
//         <table id="dt-buttons-saldoconta" class="table table-bordered table-hover table-responsive-lg table-striped w-100" width="100%">
//           <thead>

//             <tr>
//             </tr>
//             <tr>
//               <td colSpan="5"><b>Saldos a partir do dia 11 de dezembro de 2020</b></td>
//             </tr>

//           </thead>
//           <tbody>

//             <tr class="table-primary">
//               <td colspan="4" style={{ textAlign: "right", fontSize: "12px" }}><b>Saldo Anterior</b></td>
//               {console.log(dados[0]?.TOTALQUEBRA)}
//               <td style={{ textAlign: "right", fontSize: "12px" }}><b> {`${formatMoeda(dados[0]?.saldoAnterior)}`}</b></td>
//             </tr>

//             <tr>
//               <td colspan="5"></td>
//             </tr>

//             <tr>
//               <td colspan="5"></td>
//             </tr>
//           </tbody>
//         </table>

//         <DataTable

//           title="Vendas por Loja"
//           value={dados}
//           selectionMode={"single"}
//           selection={selectedProduct}
//           dataKey="IDEMPRESA"
//           onSelectionChange={(e) => setSelectedProduct(e.value)}
//           sortField="VRTOTALPAGO"
//           sortOrder={-1}

//           rows={10}
//           rowsPerPageOptions={[10, 20, 30, 50, 100]}
//           showGridlines
//           stripedRows
//           emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
//         >
//           {colunasSaldoLoja.map(coluna => (
//             <Column
//               key={coluna.field}
//               field={coluna.field}
//               header={coluna.header}
//               body={coluna.body}
//               footer={coluna.footer}
//               sortable={coluna.sortable}
//               headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
//               footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
//               bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#c0f0eb', border: '1px solid #89e3da' }} />
//           ))}
//         </DataTable>
//       </div>

//       <ActionCadastroAjusteExtratoModal 
//         show={modalAjuste}
//         handleClose={() => setAjusteModal(false)}
//       />
//     </Fragment>
//   )
// }


import { Fragment, useState } from "react";;
import { Accordion } from "react-bootstrap";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { toFloat } from "../../../../utils/toFloat";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { FaCheck, FaLockOpen } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ModalCadastroDeDepositoDaLoja } from "./ModalCadastroDeDepositoDaLoja";
import { ModalAjusteExtratoModal } from "./actionCadastroAjusteExtratoModal";
import { DataTable } from "primereact/datatable";
import { dataFormatada } from "../../../../utils/dataFormatada";
import { mascaraValor } from "../../../../utils/mascaraValor";


export const ActionListaExtratoLojaCopia = ({
  dadosExtratoLojaPeriodo,
  dadosVendas,
  dadosExtratoQuebra,
  dadosTotalDepositos,
  dadosTotalFaturas,
  dadosTotalDespesas,
  dadosTotalAdiantamentos,
  dadosAjusteExtrato,
  dadosExtratoLoja,

  saldoAnteriorVendas,
  saldoAnteriorDespesas,
}) => {
  const [tabelaVendas, setTabelaVendas] = useState(true);
  const [tabelaTotalFaturas, setTabelaTotalFaturas] = useState(true);
  const [tabelaDespesas, setTabelaDespesas] = useState(true);
  const [tabelaAdiantamentos, setTabelaAdiantamentos] = useState(true);
  const [tabelaQuebra, setTabelaQuebra] = useState(true);
  const [tabelaTotalDepositos, setTabelaTotalDepositos] = useState(true);
  const [tabelaAjuste, setTabelaAjuste] = useState(true);
  const [calcularSaldoVendas, setCalcularSaldoVendas] = useState();
  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalAjuste, setModalAjuste] = useState(false)

  const dados = Array.isArray(dadosExtratoLojaPeriodo) ? dadosExtratoLojaPeriodo.map((item) => {
    let saldoAnterior = 0
    const saldoAnterior2 = parseFloat(item.primeiraVendaSaldo.SALDO) + parseFloat(item.primeiraVendaSaldo.TOTALQUEBRA);
    const saldoAnteriorVendas = saldoAnterior2 + parseFloat(item.venda.VRRECDINHEIRO ?? 0)
    const saldoAnteriorFaturas = parseFloat(saldoAnteriorVendas) + parseFloat(item.totalFaturas[0]?.VRRECEBIDO ?? 0)
    const saldoAnteriorDespesas = saldoAnteriorFaturas - parseFloat(item.despesas[0]?.VRDESPESA ?? 0)
    const saldoAnteriorAdiantamentos = saldoAnteriorDespesas - parseFloat(item.adiantamentos.VRVALORDESCONTO ?? 0)

    const calcularTotalDinheiroInformado = () => {
      if (item.quebracaixa[0]?.VRAJUSTDINHEIRO > 0) {
        return toFloat(item.quebracaixa[0]?.VRAJUSTDINHEIRO);
      } else {
        return toFloat(item.quebracaixa[0]?.VRRECDINHEIRO);
      }
    };

    const dinheiroInformado = calcularTotalDinheiroInformado()

    const totalQuebraCaixa = calcularTotalDinheiroInformado() - toFloat(item.quebracaixa[0]?.VRFISICODINHEIRO ?? 0);
    const saldoAnteriorQuebra = saldoAnteriorAdiantamentos + totalQuebraCaixa ?? 0;
    const saldoAnteriorDepositos = saldoAnteriorQuebra - parseFloat(item.totalDepositos[0]?.VRDEPOSITO ?? 0);
    const calcularSaldoExtrato = () => {
      let saldoAnteriorExtrato = 0;
      if (item.ajusteextrato.STCANCELADO == 'False') {
        saldoAnteriorExtrato + parseFloat(item.ajusteextrato[0]?.VRCREDITO)

      } else {
        saldoAnteriorExtrato - parseFloat(item.ajusteextrato[0]?.VRDEBITO)
      }
    }

    const totalSaldoAnteriorExtrato = calcularSaldoExtrato();

    return {

      VRRECDINHEIRO: item.venda.VRRECDINHEIRO,
      DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,

      DTPROCESSAMENTOFORMATADA: item.totalFaturas[0]?.DTPROCESSAMENTOFORMATADA,
      VRRECEBIDO: item.totalFaturas[0]?.VRRECEBIDO,
      saldoAnteriorFaturas: toFloat(saldoAnteriorFaturas),

      IDAJUSTEEXTRATO: item.ajusteextrato[0]?.IDAJUSTEEXTRATO,
      DTCADASTROFORMATADA: item.ajusteextrato[0]?.DTCADASTROFORMATADA,
      VRDEBITO: item.ajusteextrato[0]?.VRDEBITO,
      VRCREDITO: item.ajusteextrato[0]?.VRCREDITO,
      HISTORICO: item.ajusteextrato[0]?.HISTORICO,
      STCANCELADO: item.ajusteextrato[0]?.STCANCELADO,
      totalSaldoAnteriorExtrato: totalSaldoAnteriorExtrato,

      DTDESPESAFORMATADA: item.despesas[0]?.DTDESPESAFORMATADA,
      DSHISTORIO: item.despesas[0]?.DSHISTORIO,
      DSCATEGORIA: item.despesas[0]?.DSCATEGORIA,
      VRDESPESA: item.despesas[0]?.VRDESPESA,
      DSPAGOA: item.despesas[0]?.DSPAGOA,
      saldoAnteriorDespesas: saldoAnteriorDespesas,

      DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
      NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
      DSMOTIVO: item.adiantamentos.DSMOTIVO,
      VRVALORDESCONTO: item.adiantamentos.VRVALORDESCONTO,
      saldoAnteriorAdiantamentos: saldoAnteriorAdiantamentos,

      IDMOV: item.quebracaixa[0]?.IDMOV,
      DTMOVCAIXA: item.quebracaixa[0]?.DTMOVCAIXA,
      FUNCIONARIOMOV: item.quebracaixa[0]?.FUNCIONARIOMOV,
      VRFISICODINHEIRO: item.quebracaixa[0]?.VRFISICODINHEIRO,
      VRRECDINHEIRO: item.quebracaixa[0]?.VRRECDINHEIRO,
      VRAJUSTDINHEIRO: item.quebracaixa[0]?.VRAJUSTDINHEIRO,
      totalQuebraCaixa: totalQuebraCaixa,
      saldoAnteriorQuebra: saldoAnteriorQuebra,

      IDDEPOSITOLOJA: item.totalDepositos[0]?.IDDEPOSITOLOJA,
      DTDEPOSITOFORMATADA: item.totalDepositos[0]?.DTDEPOSITOFORMATADA,
      DTMOVIMENTOCAIXAFORMATADA: item.totalDepositos[0]?.DTMOVIMENTOCAIXAFORMATADA,
      FUNCIONARIO: item.totalDepositos[0]?.FUNCIONARIO,
      VRDEPOSITO: item.totalDepositos[0]?.VRDEPOSITO,
      DSBANCO: item.totalDepositos[0]?.DSBANCO,
      STCANCELADO: item.totalDepositos[0]?.STCANCELADO,
      STCONFERIDO: item.totalDepositos[0]?.STCONFERIDO,
      NUDOCDEPOSITO: item.totalDepositos[0]?.NUDOCDEPOSITO,
      saldoAnteriorDepositos: saldoAnteriorDepositos,

      saldoAnteriorVendas: saldoAnteriorVendas,
      saldoAnterior2: saldoAnterior2,
      dinheiroInformado: dinheiroInformado
    }
  }) : []

  const renderButtons = (item) => {
    if (dados.STCANCELADO === 'False' && (dados.STCONFERIDO === 'False' || dados.STCONFERIDO === null || dados.STCONFERIDO === '')) {
      return (
        <Fragment>
          <ButtonTable
            titleButton={"Confirmar Conferência"}
            cor={"success"}
            Icon={FaCheck}
            IconSize={20}
            onClickButton={() => console.log("Confirmar Conferência")}
          />
          <ButtonTable
            titleButton={"Cancelar Depósito"}
            cor={"danger"}
            Icon={BsTrash3}
            IconSize={20}
            onClickButton={() => console.log("Cancelar Depósito")}
          />
          <ButtonTable
            titleButton={"Editar Depósito"}
            cor={"warning"}
            Icon={CiEdit}
            IconSize={20}
            onClickButton={() => console.log("Editar Depósito")}
          />
        </Fragment>
      );
    } else if (dados.STCANCELADO === 'False' && dados.STCONFERIDO === 'True') {
      return <td></td>;
    } else if (dados.STCANCELADO === 'True' && (dados.STCONFERIDO === 'False' || dados.STCONFERIDO === null || dados.STCONFERIDO === '')) {
      return (
        <ButtonTable
          titleButton={"Confirmar Conferência"}
          cor={"success"}
          Icon={FaCheck}
          IconSize={20}
          onClickButton={() => console.log("Confirmar Conferência")}
        />
      );
    } else if (dados.STCANCELADO === 'True' && dados.STCONFERIDO === 'True') {
      return <td></td>;
    }
  };

  const colunasVendas = [
    {
      header: 'Dt. Lançamento',
      field: 'DTHORAFECHAMENTOFORMATADA',
      body: row => <p style={{ margin: '0px', width: '150px' }}>{row.DTHORAFECHAMENTOFORMATADA}</p>,
      sortable: true,
    },
    {
      header: 'Histórico',
      field: 'DTHORAFECHAMENTOFORMATADA',
      body: row => <p style={{ margin: '0px', width: '250px' }}> Mov. Dinherio do Caixa {row.DTHORAFECHAMENTOFORMATADA}</p>,

      sortable: true,
    },
    {
      header: 'Pago A',
      field: '',
      body: row => <p style={{ margin: '0px' }} >Vendas Dinheiro</p>,
      sortable: true,
    },
    {
      header: 'Despesa',
      body: row => <p style={{ margin: '0px' }} ></p>
    },
    {
      header: 'Débito',
      field: '',
      body: row => <p style={{ margin: '0px' }}>0,00</p>,
      sortable: true,
    },
    {
      header: 'Crédito',
      field: 'VRRECDINHEIRO',
      body: row => <p style={{ margin: '0px', }}>{formatMoeda(row.VRRECDINHEIRO)}</p>,
      sortable: true,
    },
    {
      header: 'Saldo',
      field: 'saldoAnteriorVendas',
      body: row => <p style={{ margin: '0px' }}>{formatMoeda(row.saldoAnteriorVendas)}</p>,
      sortable: true,
    },
    {
      header: 'Situação',
      field: '',
      body: row => <p style={{ margin: '0px' }}></p>,
      sortable: true,
    },
  ]

  const colunasFaturas = [
    {
      header: 'Dt. Lançamento',
      field: 'DTPROCESSAMENTOFORMATADA',
      body: row => <p style={{margin:  '0px', width: '134px'}} >{row.DTPROCESSAMENTOFORMATADA}</p>,
      sortable: true,
    },
    {
      header: 'Histórico',
      field: 'DTPROCESSAMENTOFORMATADA',
      body: row => <p style={{margin: '0px'}} > Mov. Fatura {row.DTPROCESSAMENTOFORMATADA}</p>,
      sortable: true,
    },
    {
      header: 'Pago A',
      field: 'FUNCIONARIOMOV',
      body: row => <p style={{margin: '0px', }}  >Recebimento de Faturas</p>,
      sortable: true,
    },
    {
      header: 'Despesa',
      field: '',
      body: row => <p style={{margin: '0px', }}  > </p>,
    },
    {
      header: 'Débito',
      field: '',
      body: row => <p style={{margin: '0px', }} >0,00</p>,
      sortable: true,
    },
    {
      header: 'Crédito',
      field: 'VRRECEBIDO',
      body: row => <p style={{margin: '0px', }} >{formatMoeda(row.VRRECEBIDO)}</p>,
      sortable: true,
    },
    {
      header: 'Saldo ',
      field: 'saldoAnteriorFaturas',
      body: row => <p style={{margin: '0px', width: '5rem'}} > {formatMoeda(row.saldoAnteriorFaturas)} </p>,
      sortable: true,
    },
    {
      header: 'Situação ',
      field: '',
      body: row => <p style={{margin: '0px', }} >  </p>,
      sortable: true,
    },
  ]

  const colunasDespesas = [
    {
      header: 'Dt. Lançamento',
      field: 'DTDESPESAFORMATADA',
      body: row => <p style={{margin:  '0px', width: '150px'}} >{row.DTDESPESAFORMATADA}</p>,
      sortable: true,
    },
    {
      header: 'Histórico',
      field: 'DSHISTORIO',
      body: row => <p style={{margin:  '0px',maxWidth: '18rem' }}>{row.DSHISTORIO} </p>,
      sortable: true,
    },
    {
      header: 'Pago A',
      field: 'DSPAGOA',
      body: row => <p style={{margin:  '0px'}}>{row.DSPAGOA} </p>,
      sortable: true,
    },
    {
      header: 'Despesa',
      field: 'DSCATEGORIA',
      body: row => <p style={{margin:  '0px'}}>{row.DSCATEGORIA} </p>,
    },
    {
      header: 'Débito',
      field: 'VRDESPESA',
      body: row => <p style={{margin:  '0px', color: 'red'}}>{row.VRDESPESA}</p>,
      sortable: true,
    },
    {
      header: 'Crédito',
      field: '',
      body: row => <p style={{margin:  '0px'}}>0,00</p>,
      sortable: true,
    },
    {
      header: 'Saldo',
      field: 'saldoAnteriorDespesas',
      body: row => <p style={{margin:  '0px'}}>{formatMoeda(row.saldoAnteriorDespesas)}</p>,
      sortable: true,
    },
    {
      header: 'Situação',
      field: 'STCONFERIDO',
      body: row => <p style={{margin: '0px'}}></p> ,
      sortable: true,
    },
  ]

  const colunasAdiantamentos = [
    {
      header: 'Dt. Lançamento',
      field: 'DTLANCAMENTOADIANTAMENTO',
      body: row => <p style={{margin:  '0px', width: '150px'}} >{row.DTLANCAMENTOADIANTAMENTO}</p>,
      sortable: true,
    },
    {
      header: 'Histórico',
      field: '',
      body: row => <p style={{margin:  '0px',maxWidth: '18rem' }}>Adiantamento de Salário </p>,
      sortable: true,
    },
    {
      header: 'Pago A',
      field: 'NOFUNCIONARIO',
      body: row => <p style={{margin:  '0px'}}>{row.NOFUNCIONARIO} </p>,
      sortable: true,
    },
    {
      header: 'Despesa',
      field: 'DSMOTIVO',
      body: row => <p style={{margin:  '0px'}}>{row.DSMOTIVO} </p>,
    },
    {
      header: 'Débito',
      field: 'VRVALORDESCONTO',
      body: row => <p style={{margin:  '0px', color: 'red'}}>{formatMoeda(row.VRVALORDESCONTO)}</p>,
      sortable: true,
    },
    {
      header: 'Crédito',
      field: '',
      body: row => <p style={{margin:  '0px'}}>0,00</p>,
      sortable: true,
    },
    {
      field: 'saldoAnteriorAdiantamentos',
      header: 'Saldo',
      body: row => <p style={{margin:  '0px'}}>{formatMoeda(row.saldoAnteriorAdiantamentos)}</p>,
      sortable: true,
    },
    {
      header: 'Situação',
      field: 'STCONFERIDO',
      body: row => <p style={{margin: '0px'}}></p> ,
      sortable: true,
    },
  ]

  const colunasQuebra = [
    {
      header: 'Dt. Lançamento',
      field: 'DTMOVCAIXA',
      body: row => <p style={{ margin: '0px', width: '150px' }}>{dataFormatada(row.DTMOVCAIXA)}</p>,
      sortable: true,
    },
    {
      header: 'Histórico',
      field: 'IDMOV',
      body: row => <p style={{ margin: '0px' }}>Quebra Caixa Mov.: {row.IDMOV}</p>,
      sortable: true,
    },
    {
      header: 'Pago A',
      field: 'FUNCIONARIOMOV',
      body: row => <p style={{ margin: '0px' }}>Operador: {row.FUNCIONARIOMOV}</p>,
      sortable: true,
    },
    {
      header: 'Despesa',
      field: '',
      body: row => <p style={{ margin: '0px' }}></p>,
    },
    {
      header: 'Débito',
      field: 'totalQuebraCaixa',
      body: row => {
        if (row.totalQuebraCaixa > 0) {
          return <p style={{ margin: '0px' }}>0,00</p>;
        } else {
          return <p style={{ margin: '0px' }}>{mascaraValor(parseFloat(row.totalQuebraCaixa).toFixed(2))}</p>;
        }
      },
      sortable: true,
    },
    {
      header: 'Crédito',
      field: 'totalQuebraCaixa',
      body: row => {
        if (row.totalQuebraCaixa > 0) {
          return <p style={{ margin: '0px' }}>{mascaraValor(parseFloat(row.totalQuebraCaixa).toFixed(2))}</p>;
        } else {
          return <p style={{ margin: '0px' }}>0,00</p>;
        }
      },
      sortable: true,
    },
    {
      field: 'saldoAnterior',
      header: 'Saldo',
      body: row => <p style={{ margin: '0px', width: '5rem' }}>{formatMoeda(row.saldoAnterior)}</p>,
      sortable: true,
    },
    {
      header: 'Situação',
      field: '',
      body: row => <p style={{ margin: '0px' }}></p>,
      sortable: true,
    },
  ];

  const colunasDepositos = [
    {
      header: 'Dt. Lançamento',
      field: 'DTDEPOSITOFORMATADA',
      body: row => <p style={{ margin: '0px', width: '7.2rem' }} >{row.DTDEPOSITOFORMATADA}</p>,
      sortable: true,
    },
    {
      header: 'Histórico',
      field: 'FUNCIONARIO',
      body: row => <p style={{ margin: '0px', maxWidth: '18rem' }}>{row.FUNCIONARIO} Dep. Dinh  - Data do Movimento: {row.DTMOVIMENTOCAIXAFORMATADA}</p>,
      sortable: true,
    },
    {
      header: 'Pago A',
      field: 'DSBANCO',
      body: row => <p style={{ margin: '0px' }}>{row.DSBANCO} - {row.NUDOCDEPOSITO}</p>,
      sortable: true,
    },
    {
      header: 'Despesa',
      field: 'VRDEPOSITO',
      body: row => <p style={{ margin: '0px' }}>{formatMoeda(row.VRDEPOSITO)} </p>,
    },
    {
      header: 'Débito',
      field: '',
      body: row => <p style={{ margin: '0px' }}>0,00</p>,
      sortable: true,
    },
    {
      header: 'Crédito',
      field: '',
      body: row => <p style={{ margin: '0px' }}>0,00</p>,
      sortable: true,
    },
    {
      header: 'Saldo',
      field: 'saldoAnteriorQuebra',
      body: row => {

        return (

          <p style={{ margin: '0px' }}> {formatMoeda(row.saldoAnteriorQuebra)}</p>
        )

      },
      sortable: true,
    },
    {
      header: 'Situação',
      field: 'STCONFERIDO',
      body: row => {
        if (row.STCONFERIDO == 'False' || row.STCONFERIDO == null || row.STCONFERIDO == '') {
          return (
            <p style={{ color: 'red' }}> Sem Conferir </p>
          )
        } else {
          return (
            <p style={{ color: 'blue' }}> Conferido </p>
          )
        }
      },
      sortable: true,
    },
  ]

  const colunasAjuste = [
    {
      // header: 'Dt. Lançamento',
      field: 'DTCADASTROFORMATADA',
      body: row => <p style={{margin:  '0px', width: '150px'}}>{row.DTCADASTROFORMATADA}</p>,
      sortable: true,
    },
    {
      // header: 'Histórico',
      field: 'HISTORICO',
      body: row => <p style={{margin:  '0px', }}> {row.HISTORICO}</p>,
      
      sortable: true,
    },
    {
      // header: 'Pago A',
      field: '',
      body: row => <p style={{margin:  '0px'}} >Ajuste de Extrato</p>,
      sortable: true,
    },
    {
      field: '',
      // header: 'Despesa',
      body: row => <p style={{margin:  '0px'}} >{}</p>
    },
    {
      field: 'VRDEBITO',
      // header: 'Débito',
      body: row => <p style={{margin:  '0px'}}>{row.VRDEBITO}</p>,
      sortable: true,
    },
    {
      // header: 'Crédito',
      field: 'VRCREDITO',
      body: row => {
        if(row.VRCREDITO > 0) {
          return (
            
            <p style={{margin:  '0px', }}>
             {row.saldoAnterior} - {formatMoeda(row.VRCREDITO)}
            </p>
          )

        } else {
          return (
            <p style={{margin:  '0px', }}>
            {row.saldoAnterior} +  {formatMoeda(row.VRDEDITO)}
            </p>
          )
        }
      },
      sortable: true,
    },
    {
      // header: 'Saldo',
      field: 'saldoAnterior',
      body: row => <p style={{margin:  '0px'}}>{parseFloat(row.saldoAnterior).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</p>,
      sortable: true,
    },
    {
      field: 'STCANCELADO',
      // header: 'Situação',
      body: row => <p 
        style={{color: row.STCANCELADO == 'True' ? 'blue' : 'red', margin:  '0px' }}
      >{row.STCANCELADO == 'False' ? 'Ativo' : 'Cancelado'}</p>,
      sortable: true,
    },
  ]
  return (
    <Fragment>
      <div className="row">
        <Accordion defaultActiveKey="0" className="col-xl-12">
          <Accordion.Item eventKey="0" id="panel-1" className="panel">
            <header>
              <div style={{ padding: "10px" }}>

                <h1 style={{ textAlign: 'center', color: '#7a59ad' }}>INFORMATIVO</h1>
              </div>

              <div style={{ display: 'flex', marginBottom: '20px' }}>

                <ButtonType
                  type="button"
                  className="btn btn-success"
                  title="Extrato Loja"
                  onClickButtonType={() => setModalCadastro(true)}
                  textButton="Cadastrar Depósitos"
                  Icon={MdAdd}
                  iconSize={18}
                />
                <ButtonType
                  type="button"
                  className="btn btn-danger"
                  title="Extrato Loja"
                  onClickButtonType={() => setModalAjuste(true)}
                  textButton="Ajustar Extrato"
                  Icon={CiEdit}
                  iconSize={18}
                />


                <ButtonType
                  type="button"
                  className="btn btn-success "
                  title="Extrato Loja"
                  onClick={() => { }}
                  textButton="Bloquear Data Depósito"
                  Icon={FaLockOpen}
                  iconSize={18}
                />



              </div>
            </header>
            <div className="panel-hdr">
              <h2>Lista de Extrato do Dia</h2>
            </div>

            <table id="dt-buttons-saldoconta" class="table table-bordered table-hover table-responsive-lg table-striped w-100" width="100%">
              <thead>

                <tr>
                </tr>
                <tr>
                  <td colSpan="5"><b>Saldos a partir do dia 11 de dezembro de 2020</b></td>
                </tr>

              </thead>
              <tbody>

                <tr class="table-primary">
                  <td colspan="4" style={{ textAlign: "right", fontSize: "12px" }}><b>Saldo Anterior</b></td>
                  {console.log(dados[0]?.TOTALQUEBRA)}
                  <td style={{ textAlign: "right", fontSize: "12px" }}><b> {`${formatMoeda(dados[0]?.saldoAnterior2)}`}</b></td>
                </tr>

                <tr>
                  <td colspan="5"></td>
                </tr>

                <tr>
                  <td colspan="5"></td>
                </tr>
              </tbody>
            </table>
            <Accordion.Body className="panel-container show">


              <Fragment>
                <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
                  <thead className="bg-primary-700">
                    <tr>
                      <th>
                        Dt. Lançamento 
                      </th>
                      <th>
                        Histórico 
                      </th>
                      <th>
                        Pago A 
                      </th>
                      <th>
                        Despesa 
                      </th>
                      <th>
                        Débito 
                      </th>
                      <th>
                        Crédito 
                      </th>
                      <th>
                        Saldo 
                      </th>
                      <th>
                        Situação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((item, index) => (
                      <Fragment>

                        {/* <tr key={index} className="table-success">
                          <td>{item.DTHORAFECHAMENTOFORMATADA}</td>
                          <td>Mov. Dinheiro do Caixa {item.DTHORAFECHAMENTOFORMATADA}</td>
                          <td>Vendas Dinheiro</td>
                          <td></td>
                          <td>0,00</td>
                          <td>{item.VRRECDINHEIRO ? formatMoeda(item.VRRECDINHEIRO) : '0,00'}</td>


                          <td>{formatMoeda(item.saldoAnteriorVendas)}</td>
                          <td></td>

                        </tr> */}

                        

                        {/* {dadosExtratoLojaPeriodo[0].totalFaturas.length > 0 && (
                          <tr className="table-success">
                            <td>{item.DTPROCESSAMENTOFORMATADA}</td>
                            <td>Mov. Fatura {item.DTPROCESSAMENTOFORMATADA}</td>
                            <td>Recebimento de Faturas</td>
                            <td></td>
                            <td>0,00</td>
                            <td>{item.VRRECEBIDO}</td>
                            <td>{item.saldoAnteriorFaturas}</td>
                            <td></td>

                          </tr>
                        )}

                        {dadosExtratoLojaPeriodo[0].despesas.length > 0 && (

                          <tr className="table-danger">

                            <td>{item.DTDESPESAFORMATADA}</td>
                            <td>{item.DSHISTORIO}</td>
                            <td>{item.DSPAGOA}</td>
                            <td>{item.DSCATEGORIA}</td>
                            <td>{item.VRDESPESA}</td>
                            <td>0,00</td>
                            <td>{item.saldoAnteriorDespesas ? item.saldoAnteriorDespesas : 0}</td>
                            <td></td>
                            <td></td>

                          </tr>
                        )}

                        {dadosExtratoLojaPeriodo[0].adiantamentos.length > 0 && (
                          <tr className="table-danger">

                            <td>{item.DTLANCAMENTOADIANTAMENTO}</td>
                            <td>Adiantamento de Salário </td>
                            <td>{item.NOFUNCIONARIO}</td>
                            <td>{item.DSMOTIVO}</td>
                            <td>{item.VRVALORDESCONTO}</td>
                            <td>0,00</td>
                            <td>{item.saldoAnteriorDespesas ? item.saldoAnteriorDespesas : 0}</td>
                            <td></td>
                            <td></td>

                          </tr>

                        )}

                        
                        {dadosExtratoLojaPeriodo[0].quebracaixa.length > 0 && (

                          <tr className="table-primary">

                            <td>{item.DTMOVCAIXA}</td>
                            <td>Quebra Caixa Mov.: {item.IDMOV} </td>
                            <td>Operador: {item.FUNCIONARIOMOV}</td>
                            <td style={{ color: item.dinheiroInformado > 0 ? 'blue' : 'red' }}>
                              {item.dinheiroInformado > 0 ? 0 : formatMoeda(item.dinheiroInformado)}
                            </td>
                            <td>0,00</td>
                            <td>{formatMoeda(item.totalQuebraCaixa)}</td>
                            <td>{item.saldoAnteriorQuebra ? item.saldoAnteriorQuebra : 0}</td>
                            <td></td>
                            <td></td>

                          </tr>
                        )}

                        {dadosExtratoLojaPeriodo[0].totalDepositos.length > 0 && (
                          <tr className="table-warning">

                            <td>{item.DTDEPOSITOFORMATADA}</td>
                            <td>{item.FUNCIONARIO} Dep. Dinh  {item.DTMOVIMENTOCAIXAFORMATADA} </td>
                            <td>{item.DSBANCO} {item.NUDOCDEPOSITO}</td>

                            <td style={{}}>{item.VRDEPOSITO}</td>
                            <td>0,00</td>

                            <td>{formatMoeda(item.saldoAnteriorDepositos) ? formatMoeda(item.saldoAnteriorDepositos) : 0}</td>

                            <td style={{ color: item.STCONFERIDO == 'False' || item.STCONFERIDO == null || item.STCONFERIDO == '' ? 'red' : 'blue' }} >
                              {item.STCONFERIDO == 'False' || item.STCONFERIDO == null || item.STCONFERIDO == '' ? 'Sem Conferir' : 'Conferido'}
                            </td>
                            <td  >
                              {renderButtons(item)}
                            </td>

                          </tr>

                        )}

                        {dadosExtratoLojaPeriodo[0].ajusteextrato.length > 0 && (

                          <tr className="table-secondary">

                            <td>{item.DTCADASTROFORMATADA}</td>
                            <td>{item.HISTORICO} </td>
                            <td>Ajuste de Extrato</td>
                            <td style={{ color: 'red' }}>{item.VRDEBITO}</td>
                            <td style={{ color: 'red' }}>{item.VRCREDITO}</td>
                            <td>0,00</td>

                            <td>{formatMoeda(item.totalSaldoAnteriorExtrato) ? formatMoeda(item.totalSaldoAnteriorExtrato) : 0}</td>
                            <td style={{ color: item.STCANCELADO == 'False' ? 'blue' : 'red' }} >
                              {item.STCANCELADO == 'False' ? 'Ativo' : 'Cancelado'}
                            </td>


                          </tr>
                        )} */}

                        <DataTable
                          title="Vendas por Loja"
                          value={dados}
                          tableStyle={{ minWidth: '50rem' }}
                          selectionMode={"single"}
                          dataKey="IDEMPRESA"
                          sortField="VRTOTALPAGO"
                          sortOrder={-1}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                        >
                          {colunasVendas.map(coluna => (
                            <Column
                              key={coluna.field}
                              field={coluna.field}
                              header={coluna.header}
                              body={coluna.body}
                              footer={coluna.footer}
                              sortable={coluna.sortable}
                              headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                              bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#c0f0eb', border: '1px solid #89e3da' }} />
                          ))}
                        </DataTable>

                        <DataTable
                          title="Vendas por Loja"
                          value={dados}
                          // headerStyle={{display: 'none'}}
                          tableStyle={{ minWidth: '50rem' }}
                          selectionMode={"single"}
                          dataKey="IDEMPRESA"
                          sortField="VRTOTALPAGO"
                          sortOrder={-1}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                        >
                          {colunasFaturas.map(coluna => (
                            <Column
                              key={coluna.field}
                              field={coluna.field}
                              header={coluna.header}
                              body={coluna.body}
                              footer={coluna.footer}
                              headerStyle={{display: 'none'}}
                              // headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                              bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#c0f0eb', border: '1px solid #89e3da' }} />
                          ))}
                        </DataTable>
                        
                        <DataTable
                          title="Vendas por Loja"
                          value={dados}
                          tableStyle={{ minWidth: '50rem' }}
                          // headerStyle={{display: 'none'}}
                          selectionMode={"single"}
                          dataKey="IDEMPRESA"
                          sortField="VRTOTALPAGO"
                          sortOrder={-1}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                        >
                          {colunasDespesas.map(coluna => (
                            <Column
                              key={coluna.field}
                              field={coluna.field}
                              header={coluna.header}
                              body={coluna.body}
                              headerStyle={{display: 'none'}}
                              // headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                              footer={coluna.footer}
                              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                              bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#530227', border: '1px solid #7a59ad' }} />
                          ))}
                        </DataTable>

                        <DataTable
                          title="Vendas por Loja"
                          value={dados}
                          tableStyle={{ minWidth: '50rem' }}
                          // headerStyle={{display: 'none'}}
                          selectionMode={"single"}
                          dataKey="IDEMPRESA"
                          sortField="VRTOTALPAGO"
                          sortOrder={-1}
                          showGridlines
                          stripedRows
                          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                        >
                          {colunasAdiantamentos.map(coluna => (
                            <Column
                              key={coluna.field}
                              field={coluna.field}
                              header={coluna.header}
                              body={coluna.body}
                              headerStyle={{ display: 'none' }}
                              // headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                              footer={coluna.footer}
                              footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                              bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#a90250', border: '1px solid #7a59ad' }} />
                          ))}
                        </DataTable>

                        <DataTable
                            title="Quebra Extrato"
                            value={dados}
                            tableStyle={{ minWidth: '50rem' }}
                            selectionMode={"single"}
                            dataKey="IDEMPRESA"
                            sortField="VRTOTALPAGO"
                            sortOrder={-1}
                            showGridlines
                            stripedRows
                            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                          >
                            {colunasQuebra.map(coluna => (
                              <Column
                                key={coluna.field}
                                field={coluna.field}
                                header={coluna.header}
                                body={coluna.body}
                                footer={coluna.footer}
                                headerStyle={{ display: 'none' }}
                                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                                bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#212529', border: '1px solid #7a59ad' }}
                              />
                            ))}
                        </DataTable>

                          <DataTable
                            title="Extrato de Depósitos"
                            value={dados}
                            tableStyle={{ minWidth: '50rem' }}
                            // headerStyle={{display: 'none'}}
                            selectionMode={"single"}
                            dataKey="IDEMPRESA"
                            sortField="VRTOTALPAGO"
                            sortOrder={-1}
                            showGridlines
                            stripedRows
                            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                          >
                            {colunasDepositos.map(coluna => (
                              <Column
                                key={coluna.field}
                                field={coluna.field}
                                header={coluna.header}
                                body={coluna.body}
                                headerStyle={{ display: 'none' }}
                                // headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                                footer={coluna.footer}
                                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                                bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#3e2a00', border: '1px solid #7a59ad' }} />
                            ))}
                          </DataTable>

                        <DataTable
                            title="Vendas por Loja"
                            value={dados}
                            tableStyle={{ minWidth: '50rem' }}
                            selectionMode={"single"}
                            dataKey="IDEMPRESA"
                            sortField="VRTOTALPAGO"
                            sortOrder={-1}
                            showGridlines
                            stripedRows
                            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                          >
                            {colunasAjuste.map(coluna => (
                              <Column
                                key={coluna.field}
                                field={coluna.field}
                                header={false}
                                body={coluna.body}
                                footer={coluna.footer}
                                sortable={coluna.sortable}
                                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem', display: 'none' }}
                                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                                bodyStyle={{ fontSize: '0.8rem', backgroundColor: '#c0f0eb', border: '1px solid #89e3da' }} />
                            ))}
                          </DataTable>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </Fragment>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <ModalCadastroDeDepositoDaLoja
        show={modalCadastro}
        handleClose={() => setModalCadastro(false)}
      />

      <ModalAjusteExtratoModal
        show={modalAjuste}
        handleClose={() => setModalAjuste(false)}
      />
    </Fragment>
  );
};
