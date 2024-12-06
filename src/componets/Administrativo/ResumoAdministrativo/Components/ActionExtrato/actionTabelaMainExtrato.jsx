import { Fragment, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Accordion } from "react-bootstrap";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { ActionListaVendas } from "./actionListaVendas";
import { ActionListaFaturas } from "./actionListaFaturas";
import { ActionListaDespesas } from "./actionListaDespesa";
import { ActionListaAdiantamentos } from "./actionListaAdiantamentos";
import { ActionListaQuebra } from "./actionListaQuebra";
import { ActionListaTotalDeposito } from "./actionListaTotalDeposito";
import { ActionListaAjuste } from "./actionListaAjuste";

export const ActionTabelaMainExtrato = ({
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

  const dados = Array.isArray(dadosAjusteExtrato) ? dadosExtratoLoja.map((item) => ({

    VRRECDINHEIRO: item.venda.VRRECDINHEIRO,
    DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,
    IDAJUSTEEXTRATO: item.ajusteextrato.IDAJUSTEEXTRATO,
    DTCADASTROFORMATADA: item.ajusteextrato.DTCADASTROFORMATADA,
    VRDEBITO: item.ajusteextrato.VRDEBITO,
    VRCREDITO: item.ajusteextrato.VRCREDITO,
    HISTORICO: item.ajusteextrato.HISTORICO,
    STCANCELADO: item.ajusteextrato.STCANCELADO,
    DTDESPESAFORMATADA: item.despesas.DTDESPESAFORMATADA,
    DSHISTORIO: item.despesas.DSHISTORIO,
    DSCATEGORIA: item.despesas.DSCATEGORIA,
    VRDESPESA: item.despesas.VRDESPESA,
    DSPAGOA: item.despesas.DSPAGOA,
    DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
    NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
    DSMOTIVO: item.adiantamentos.DSMOTIVO,
    VRVALORDESCONTO: item.adiantamentos.VRVALORDESCONTO,
    saldoAnterior: 0
  })) : []
  



  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Dt. Lançamento" />
        <Column header="Histórico" />
        <Column header="Pago A" />
        <Column header="Despesa" />
        <Column header="Débito" />
        <Column header="Crédito" />
        <Column header="Saldo" />
        <Column header="Situação" />
      </Row>
    </ColumnGroup>
  );

  const adiantamentosGroup = (rowData) => (
    <Row>
      <Column field="DTLANCAMENTOADIANTAMENTO" body={<p>{rowData.DTLANCAMENTOADIANTAMENTO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>Adiantamento de Salário</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.NOFUNCIONARIO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.DSMOTIVO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.VRVALORDESCONTO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>0,00</p>} />
      <Column body={<p style={{ margin: '0px' }}>0,00</p>} />
      <Column body={<p style={{ margin: '0px' }}></p>} />
    </Row>
  );

  const vendasGroup = (rowData) => (
    <Row>
      <Column field="DTHORAFECHAMENTOFORMATADA" body={<p>{rowData.DTHORAFECHAMENTOFORMATADA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>Mov. Dinheiro do Caixa {rowData.DTHORAFECHAMENTOFORMATADA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>Vendas Dinheiro</p>} />
      <Column body={<p style={{ margin: '0px' }}></p>} />
      <Column body={<p style={{ margin: '0px' }}>0,00</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.VRRECDINHEIRO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>saldoAnterior</p>} />
      <Column body={<p style={{ margin: '0px' }}></p>} />
    </Row>
  );

  const despesasGroup = (rowData) => (
    <Row>
      <Column field="DTDESPESAFORMATADA" body={<p>{rowData.DTDESPESAFORMATADA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.DSHISTORIO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.DSPAGOA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.DSCATEGORIA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.VRDESPESA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>0,00</p>} />
      <Column body={<p style={{ margin: '0px' }}>saldoAnterior</p>} />
      <Column body={<p style={{ margin: '0px' }}></p>} />
    </Row>
  );

  const ajusteGroup = (rowData) => (
    <Row>
      <Column field="DTCADASTROFORMATADA" body={<p>{rowData.DTCADASTROFORMATADA}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.HISTORICO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>Ajuste de Extrato</p>} />
      <Column body={<p style={{ margin: '0px' }}></p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.VRDEBITO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>{rowData.VRCREDITO}</p>} />
      <Column body={<p style={{ margin: '0px' }}>saldoAnterior</p>} />
      <Column body={<p style={{ color: rowData.STCANCELADO === 'True' ? 'blue' : 'red', margin: '0px' }}>{rowData.STCANCELADO === 'False' ? 'Ativo' : 'Cancelado'}</p>} />
    </Row>
  );

  return (
    <Fragment>
      <div className="row">
        <Accordion defaultActiveKey="0" className="col-xl-12">
          <Accordion.Item eventKey="0" id="panel-1" className="panel">
            <header className="panel-hdr">
              <h2>Lista de Extrato do Dia</h2>
            </header>
            <Accordion.Body className="panel-container show">
              
     
                <Fragment>
                {tabelaVendas  && (
                  <ActionListaVendas dadosVendas={dadosVendas} />
                )}
                  {tabelaTotalFaturas && dadosTotalFaturas.length > 0 && (
               
                    <ActionListaTotalFaturas dadosTotalFaturas={dadosTotalFaturas} dadosVendas={dadosVendas}/>
                  )}
                  {tabelaDespesas && dadosTotalDespesas.length > 0 &&  (
                 
                    <ActionListaDespesas dadosTotalDespesas={dadosTotalDespesas} dadosVendas={dadosVendas} dadosTotalFaturas={dadosTotalFaturas}/>
                  )}
                  {tabelaAdiantamentos && dadosTotalAdiantamentos.length > 0 && (
                 
                    <ActionListaAdiantamentos dadosTotalAdiantamentos={dadosTotalAdiantamentos} dadosVendas={dadosVendas} dadosTotalFaturas={dadosTotalFaturas} dadosTotalDespesas={dadosTotalDespesas}/>
                  )}
                  {tabelaQuebra && dadosExtratoQuebra.length > 0 && (
                    
                    <ActionListaQuebra dadosExtratoQuebra={dadosExtratoQuebra} dadosVendas={dadosVendas} dadosTotalFaturas={dadosTotalFaturas} dadosTotalDespesas={dadosTotalDespesas} dadosTotalAdiantamentos={dadosTotalAdiantamentos}/>
                  )}
                  {tabelaTotalDepositos && dadosTotalDepositos.length > 0 && (
                    
                   <ActionListaTotalDeposito dadosTotalDepositos={dadosTotalDepositos} dadosVendas={dadosVendas} dadosTotalFaturas={dadosTotalFaturas} dadosTotalDespesas={dadosTotalDespesas} dadosTotalAdiantamentos={dadosTotalAdiantamentos} dadosExtratoQuebra={dadosExtratoQuebra}/>
                  )}
                  {tabelaAjuste && dadosAjusteExtrato.length > 0 && (
                    
                    <ActionListaAjuste dadosAjusteExtrato={dadosAjusteExtrato} dadosVendas={dadosVendas}/> 
                  )}
                </Fragment>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Fragment>
  );
};

// import React, { Fragment, useState } from "react";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Accordion} from "react-bootstrap";
// import { toFloat } from "../../../../../utils/toFloat";
// import { formatMoeda } from "../../../../../utils/formatMoeda";

// export const ActionTabelaMainExtrato = ({
//   dadosExtratoLojaPeriodo,
//   dadosVendas,
//   dadosExtratoQuebra,
//   dadosTotalDepositos,
//   dadosTotalFaturas,
//   dadosTotalDespesas,
//   dadosTotalAdiantamentos,
//   dadosAjusteExtrato,
//   dadosExtratoLoja,
//   saldoAnteriorVendas,
//   saldoAnteriorDespesas,
// }) => {
//   const [tabelaVendas, setTabelaVendas] = useState(true);
//   const [tabelaTotalFaturas, setTabelaTotalFaturas] = useState(true);
//   const [tabelaDespesas, setTabelaDespesas] = useState(true);
//   const [tabelaAdiantamentos, setTabelaAdiantamentos] = useState(true);
//   const [tabelaQuebra, setTabelaQuebra] = useState(true);
//   const [tabelaTotalDepositos, setTabelaTotalDepositos] = useState(true);
//   const [tabelaAjuste, setTabelaAjuste] = useState(true);
//   const [calcularSaldoVendas, setCalcularSaldoVendas] = useState();

//   const dados = dadosExtratoLojaPeriodo.map((item) => {
//     let saldoAnterior = 0;
//     const saldoAnteriorVendas = saldoAnterior + parseFloat(item.venda.VRRECDINHEIRO ?? 0);
//     const saldoAnteriorFaturas = parseFloat(saldoAnteriorVendas) + parseFloat(item.totalFaturas[0]?.VRRECEBIDO ?? 0);
//     const saldoAnteriorDespesas = saldoAnteriorFaturas - parseFloat(item.despesas[0]?.VRDESPESA ?? 0);
//     const saldoAnteriorAdiantamentos = saldoAnteriorDespesas - parseFloat(item.adiantamentos.VRVALORDESCONTO ?? 0);

//     const calcularTotalDinheiroInformado = () => {
//       if (item.quebracaixa[0]?.VRAJUSTDINHEIRO > 0) {
//         return toFloat(item.quebracaixa[0].VRAJUSTDINHEIRO);
//       } else {
//         return toFloat(item.quebracaixa[0]?.VRRECDINHEIRO);
//       }
//     };

//     const totalQuebraCaixa = calcularTotalDinheiroInformado() - toFloat(item.quebracaixa[0]?.VRFISICODINHEIRO ?? 0);
//     const saldoAnteriorQuebra = saldoAnteriorAdiantamentos + totalQuebraCaixa ?? 0;
//     const saldoAnteriorDepositos = saldoAnteriorQuebra - parseFloat(item.totalDepositos[0]?.VRDEPOSITO ?? 0);

//     const calcularSaldoExtrato = () => {
//       let saldoAnteriorExtrato = 0;
//       if (item.ajusteextrato[0]?.STCANCELADO === 'False') {
//         saldoAnteriorExtrato += parseFloat(item.ajusteextrato[0]?.VRCREDITO);
//       } else {
//         saldoAnteriorExtrato -= parseFloat(item.ajusteextrato[0]?.VRDEBITO);
//       }
//       return saldoAnteriorExtrato;
//     };

//     const totalSaldoAnteriorExtrato = calcularSaldoExtrato();
//     return {
//       VRRECDINHEIRO: item.venda.VRRECDINHEIRO,
//       DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,
//       DTPROCESSAMENTOFORMATADA: item.totalFaturas[0]?.DTPROCESSAMENTOFORMATADA,
//       VRRECEBIDO: item.totalFaturas[0]?.VRRECEBIDO,
//       saldoAnteriorFaturas: toFloat(saldoAnteriorFaturas),
//       IDAJUSTEEXTRATO: item.ajusteextrato[0]?.IDAJUSTEEXTRATO,
//       DTCADASTROFORMATADA: item.ajusteextrato[0]?.DTCADASTROFORMATADA,
//       VRDEBITO: item.ajusteextrato[0]?.VRDEBITO,
//       VRCREDITO: item.ajusteextrato[0]?.VRCREDITO,
//       HISTORICO: item.ajusteextrato[0]?.HISTORICO,
//       STCANCELADO: item.ajusteextrato[0]?.STCANCELADO,
//       totalSaldoAnteriorExtrato: totalSaldoAnteriorExtrato,
//       DTDESPESAFORMATADA: item.despesas[0]?.DTDESPESAFORMATADA,
//       DSHISTORIO: item.despesas[0]?.DSHISTORIO,
//       DSCATEGORIA: item.despesas[0]?.DSCATEGORIA,
//       VRDESPESA: item.despesas[0]?.VRDESPESA,
//       DSPAGOA: item.despesas[0]?.DSPAGOA,
//       saldoAnteriorDespesas: saldoAnteriorDespesas,
//       DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
//       NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
//       DSMOTIVO: item.adiantamentos.DSMOTIVO,
//       VRVALORDESCONTO: item.adiantamentos.VRVALORDESCONTO,
//       saldoAnteriorAdiantamentos: saldoAnteriorAdiantamentos,
//       IDMOV: item.quebracaixa[0]?.IDMOV,
//       DTMOVCAIXA: item.quebracaixa[0]?.DTMOVCAIXA,
//       FUNCIONARIOMOV: item.quebracaixa[0]?.FUNCIONARIOMOV,
//       VRFISICODINHEIRO: item.quebracaixa[0]?.VRFISICODINHEIRO,
//       VRRECDINHEIRO: item.quebracaixa[0]?.VRRECDINHEIRO,
//       VRAJUSTDINHEIRO: item.quebracaixa[0]?.VRAJUSTDINHEIRO,
//       totalQuebraCaixa: totalQuebraCaixa,
//       saldoAnteriorQuebra: saldoAnteriorQuebra,
//       IDDEPOSITOLOJA: item.totalDepositos[0]?.IDDEPOSITOLOJA,
//       DTDEPOSITOFORMATADA: item.totalDepositos[0]?.DTDEPOSITOFORMATADA,
//       DTMOVIMENTOCAIXAFORMATADA: item.totalDepositos[0]?.DTMOVIMENTOCAIXAFORMATADA,
//       FUNCIONARIO: item.totalDepositos[0]?.FUNCIONARIO,
//       VRDEPOSITO: item.totalDepositos[0]?.VRDEPOSITO,
//       DSBANCO: item.totalDepositos[0]?.DSBANCO,
//       STCANCELADO: item.totalDepositos[0]?.STCANCELADO,
//       STCONFERIDO: item.totalDepositos[0]?.STCONFERIDO,
//       NUDOCDEPOSITO: item.totalDepositos[0]?.NUDOCDEPOSITO,
//       saldoAnteriorDepositos: saldoAnteriorDepositos,
//       saldoAnteriorVendas: saldoAnteriorVendas,
//     };
//   });

//   return (
//     <Fragment>
//       <div className="row">
//         <Accordion defaultActiveKey="0" className="col-xl-12">
//           <Accordion.Item eventKey="0" id="panel-1" className="panel">
//             <Accordion.Header className="panel-hdr">
//               <h2>Lista de Extrato do Dia</h2>
//             </Accordion.Header>
//             <Accordion.Body className="panel-container show">
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTHORAFECHAMENTOFORMATADA" header="Dt. Lançamento" />
//                 <Column
//                   body={(item) => `Mov. Dinheiro do Caixa ${item.DTHORAFECHAMENTOFORMATADA}`}
//                   header="Histórico"
//                 />
//                 <Column body={() => "Vendas Dinheiro"} header="Pago A" />
//                 <Column body={() => null} header="Despesa" />
//                 <Column body={() => "0,00"} header="Débito" />
//                 <Column field="VRRECDINHEIRO" header="Crédito" />
//                 <Column field="saldoAnteriorVendas" header="Saldo" />
//                 <Column body={() => null} header="Situação" />
//               </DataTable>
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTPROCESSAMENTOFORMATADA" header="Dt. Lançamento" />
//                 <Column
//                   body={(item) => `Mov. Fatura ${item.DTPROCESSAMENTOFORMATADA}`}
//                   header="Histórico"
//                 />
//                 <Column body={() => "Recebimento de Faturas"} header="Pago A" />
//                 <Column body={() => null} header="Despesa" />
//                 <Column body={() => "0,00"} header="Débito" />
//                 <Column field="VRRECEBIDO" header="Crédito" />
//                 <Column field="saldoAnteriorFaturas" header="Saldo" />
//                 <Column body={() => null} header="Situação" />
//               </DataTable>
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTDESPESAFORMATADA" header="Dt. Lançamento" />
//                 <Column field="DSHISTORIO" header="Histórico" />
//                 <Column field="DSPAGOA" header="Pago A" />
//                 <Column field="DSCATEGORIA" header="Despesa" />
//                 <Column field="VRDESPESA" header="Débito" />
//                 <Column body={() => "0,00"} header="Crédito" />
//                 <Column field="saldoAnteriorDespesas" header="Saldo" />
//                 <Column body={() => null} header="Situação" />
//               </DataTable>
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTLANCAMENTOADIANTAMENTO" header="Dt. Lançamento" />
//                 <Column body={() => "Adiantamento de Salário"} header="Histórico" />
//                 <Column field="NOFUNCIONARIO" header="Pago A" />
//                 <Column field="DSMOTIVO" header="Despesa" />
//                 <Column field="VRVALORDESCONTO" header="Débito" />
//                 <Column body={() => "0,00"} header="Crédito" />
//                 <Column field="saldoAnteriorAdiantamentos" header="Saldo" />
//                 <Column body={() => null} header="Situação" />
//               </DataTable>
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTMOVCAIXA" header="Dt. Lançamento" />
//                 <Column
//                   body={(item) => `Quebra Caixa Mov.: ${item.IDMOV}`}
//                   header="Histórico"
//                 />
//                 <Column body={(item) => `Operador: ${item.FUNCIONARIOMOV}`} header="Pago A" />
//                 <Column body={() => null} header="Despesa" />
//                 <Column body={() => "0,00"} header="Débito" />
//                 <Column
//                   body={(item) => formatMoeda(item.totalQuebraCaixa)}
//                   header="Crédito"
//                 />
//                 <Column field="saldoAnteriorQuebra" header="Saldo" />
//                 <Column body={() => null} header="Situação" />
//               </DataTable>
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTDEPOSITOFORMATADA" header="Dt. Lançamento" />
//                 <Column
//                   body={(item) =>
//                     `${item.FUNCIONARIO} Dep. Dinh  - Data do Movimento: ${item.DTMOVIMENTOCAIXAFORMATADA}`
//                   }
//                   header="Histórico"
//                 />
//                 <Column
//                   body={(item) => `${item.DSBANCO} ${item.NUDOCDEPOSITO}`}
//                   header="Pago A"
//                 />
//                 <Column body={() => null} header="Despesa" />
//                 <Column field="VRDEPOSITO" header="Débito" />
//                 <Column body={() => "0,00"} header="Crédito" />
//                 <Column
//                   body={(item) => formatMoeda(item.saldoAnteriorDepositos)}
//                   header="Saldo"
//                 />
//                 <Column
//                   body={(item) =>
//                     item.STCONFERIDO === 'False' || !item.STCONFERIDO
//                       ? 'Sem Conferir'
//                       : 'Conferido'
//                   }
//                   header="Situação"
//                   style={(item) => ({
//                     color:
//                       item.STCONFERIDO === 'False' || !item.STCONFERIDO
//                         ? 'red'
//                         : 'blue',
//                   })}
//                 />
//               </DataTable>
//               <DataTable value={dados} responsiveLayout="scroll">
//                 <Column field="DTCADASTROFORMATADA" header="Dt. Lançamento" />
//                 <Column field="HISTORICO" header="Histórico" />
//                 <Column body={() => "Ajuste de Extrato"} header="Pago A" />
//                 <Column
//                   field="VRDEBITO"
//                   header="Débito"
//                   body={(item) => <span style={{ color: 'red' }}>{item.VRDEBITO}</span>}
//                 />
//                 <Column
//                   field="VRCREDITO"
//                   header="Crédito"
//                   body={(item) => <span style={{ color: 'red' }}>{item.VRCREDITO}</span>}
//                 />
//                 <Column body={() => "0,00"} header="Saldo" />
//                 <Column
//                   body={(item) => formatMoeda(item.totalSaldoAnteriorExtrato)}
//                   header="Saldo"
//                 />
//                 <Column
//                   body={(item) => (item.STCANCELADO === 'False' ? 'Ativo' : 'Cancelado')}
//                   header="Situação"
//                   style={(item) => ({
//                     color: item.STCANCELADO === 'False' ? 'blue' : 'red',
//                   })}
//                 />
//               </DataTable>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       </div>
//     </Fragment>
//   );
// };
