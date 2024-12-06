import { Fragment, useState } from "react";;
import { Accordion } from "react-bootstrap";
import { toFloat } from "../../../../utils/toFloat";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { FaLockOpen } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ModalCadastroDeDepositoDaLoja } from "./modalCadastroDeDepositoDaLoja";
// import { ModalAjusteExtratoModal } from "./actionCadastroAjusteExtratoModal";
import { ActionListaDespesas } from "./actionListaDespesas";
import { ActionListaVendas } from "./actionListaVendas";
import { ActionListaFaturas } from "./actionListaFaturas";
import { ActionListaAdiantamentos } from "./actionListaAdiantamentos";
import { ActionListaQuebraCaixa } from "./actionListaQuebraCaixa";
import { ActionListaDepositos } from "./actionListaDepositos";
import { ActionListaAjusteExtratos } from "./actionListaAjusteExtratos";

export const ActionListaExtratoContaCorrenteLoja = ({
  dadosExtratoLojaPeriodo,
}) => {
  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalAjuste, setModalAjuste] = useState(false)

  const dados = Array.isArray(dadosExtratoLojaPeriodo) ? dadosExtratoLojaPeriodo.map((item) => {
    let saldoAnterior = 0
    const saldoAnterior2 = toFloat(item.primeiraVendaSaldo.SALDO) + toFloat(item.primeiraVendaSaldo.TOTALQUEBRA);
    const saldoAnteriorVendas = saldoAnterior2 + toFloat(item.venda.VRRECDINHEIRO)

    const totalFaturas = item.totalFaturas.reduce((acc, fatura) => {
        return acc + toFloat(fatura.VRRECEBIDO);
    }, 0);
    const saldoAnteriorFaturas = toFloat(saldoAnteriorVendas) + totalFaturas;

    const totalDespesas = item.despesas.reduce((acc, despesa) => {
        return acc + toFloat(despesa.VRDESPESA);
    }, 0);
    const saldoAnteriorDespesas = toFloat(saldoAnteriorFaturas)  - totalDespesas;
    const saldoAnteriorAdiantamentos = toFloat(saldoAnteriorDespesas) - toFloat(item.adiantamentos.VRVALORDESCONTO)
    
    const calcularTotalDinheiroInformado = () => {
        const totalVRAJUSTDINHEIRO = item.quebracaixa.reduce((acc, quebracaixa) => {
          return acc + toFloat(quebracaixa.VRAJUSTDINHEIRO);
        }, 0);
  
        const totalVRRECDINHEIRO = item.quebracaixa.reduce((acc, quebracaixa) => {
          return acc + toFloat(quebracaixa.VRRECDINHEIRO);
        }, 0);
  
        return totalVRAJUSTDINHEIRO > 0 ? totalVRAJUSTDINHEIRO : totalVRRECDINHEIRO;
    };
    
    const totalQuebra = item.quebracaixa.reduce((acc, quebracaixa) => {
        return acc + toFloat(quebracaixa.VRFISICODINHEIRO);
    }, 0);

    const dinheiroInformado = calcularTotalDinheiroInformado()
    const totalQuebraCaixa = calcularTotalDinheiroInformado() - totalQuebra;

    const totalDepositos = item.totalDepositos.reduce((acc, deposito) => {
        return acc + toFloat(deposito.VRDEPOSITO);
    }, 0);
    const saldoAnteriorQuebra = toFloat(saldoAnteriorAdiantamentos) + toFloat(totalQuebraCaixa);
    const saldoAnteriorDepositos = saldoAnteriorQuebra - totalDepositos;

    const calcularSaldoExtrato = () => {
      const totalVRCREDITO = item.ajusteextrato.reduce((acc, ajuste) => {
        return acc + toFloat(ajuste.VRCREDITO);
      }, 0);
      
      const totalVRDEBITO = item.ajusteextrato.reduce((acc, ajuste) => {
        return acc + toFloat(ajuste.VRDEBITO);
      }, 0);
      
        if(item.STCANCELADO == 'False') {
         return totalVRCREDITO 
        } else {
          return totalVRDEBITO;
        }
        // return totalVRCREDITO - totalVRDEBITO;
    };
    const totalSaldoAnteriorExtrato = calcularSaldoExtrato();

    return {

      VRRECDINHEIRO: toFloat(item.venda.VRRECDINHEIRO),
      DTHORAFECHAMENTOFORMATADA: item.venda.DTHORAFECHAMENTOFORMATADA,

      DTPROCESSAMENTOFORMATADA: item.totalFaturas[0]?.DTPROCESSAMENTOFORMATADA,
      VRRECEBIDO: toFloat(item.totalFaturas[0]?.VRRECEBIDO),
      
      IDAJUSTEEXTRATO: item.ajusteextrato[0]?.IDAJUSTEEXTRATO,
      DTCADASTROFORMATADA: item.ajusteextrato[0]?.DTCADASTROFORMATADA,
      VRDEBITO: item.ajusteextrato[0]?.VRDEBITO,
      VRCREDITO: item.ajusteextrato[0]?.VRCREDITO,
      HISTORICO: item.ajusteextrato[0]?.HISTORICO,
      STCANCELADO: item.ajusteextrato[0]?.STCANCELADO,
      
      DTDESPESAFORMATADA: item.despesas[0]?.DTDESPESAFORMATADA,
      DSHISTORIO: item.despesas[0]?.DSHISTORIO,
      DSCATEGORIA: item.despesas[0]?.DSCATEGORIA,
      VRDESPESA: toFloat(item.despesas[0]?.VRDESPESA),
      DSPAGOA:  toFloat(item.despesas[0]?.DSPAGOA),
      
      DTLANCAMENTOADIANTAMENTO: item.adiantamentos.DTLANCAMENTOADIANTAMENTO,
      NOFUNCIONARIO: item.adiantamentos.NOFUNCIONARIO,
      DSMOTIVO: item.adiantamentos.DSMOTIVO,
      VRVALORDESCONTO: toFloat(item.adiantamentos.VRVALORDESCONTO),
      
      IDMOV: item.quebracaixa[0]?.IDMOV,
      DTMOVCAIXA: item.quebracaixa[0]?.DTMOVCAIXA,
      FUNCIONARIOMOV: item.quebracaixa[0]?.FUNCIONARIOMOV,
      VRFISICODINHEIRO: toFloat(item.quebracaixa[0]?.VRFISICODINHEIRO),
      VRRECDINHEIROQUEBRA: toFloat(item.quebracaixa[0]?.VRRECDINHEIRO),
      VRAJUSTDINHEIRO: toFloat(item.quebracaixa[0]?.VRAJUSTDINHEIRO),
      
      IDDEPOSITOLOJA: item.totalDepositos[0]?.IDDEPOSITOLOJA,
      DTDEPOSITOFORMATADA: item.totalDepositos[0]?.DTDEPOSITOFORMATADA,
      DTMOVIMENTOCAIXAFORMATADA: item.totalDepositos[0]?.DTMOVIMENTOCAIXAFORMATADA,
      FUNCIONARIO: item.totalDepositos[0]?.FUNCIONARIO,
      VRDEPOSITO: toFloat(item.totalDepositos[0]?.VRDEPOSITO),
      DSBANCO: item.totalDepositos[0]?.DSBANCO,
      STCANCELADO: item.totalDepositos[0]?.STCANCELADO,
      STCONFERIDO: item.totalDepositos[0]?.STCONFERIDO,
      NUDOCDEPOSITO: item.totalDepositos[0]?.NUDOCDEPOSITO,
      
      dinheiroInformado: toFloat(dinheiroInformado),
      totalQuebraCaixa: toFloat(totalQuebraCaixa),
      saldoAnterior2: toFloat(saldoAnterior2),
      saldoAnteriorVendas: toFloat(saldoAnteriorVendas),
      saldoAnteriorFaturas: toFloat(saldoAnteriorFaturas),
      saldoAnteriorDespesas: toFloat(saldoAnteriorDespesas),
      saldoAnteriorAdiantamentos: toFloat(saldoAnteriorAdiantamentos),
      saldoAnteriorQuebra: toFloat(saldoAnteriorQuebra),
      saldoAnteriorDepositos: toFloat(saldoAnteriorDepositos),
      totalSaldoAnteriorExtrato: toFloat(totalSaldoAnteriorExtrato),
    }
  }) : []

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
                  style={{ marginRight: '10px' }}
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
                      <th>
                        Opção
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <ActionListaVendas dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
                    <ActionListaFaturas dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />                 
                    <ActionListaDespesas dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
                    <ActionListaAdiantamentos dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />                
                    <ActionListaQuebraCaixa dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
                    <ActionListaDepositos  dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
                    <ActionListaAjusteExtratos dadosExtratoLojaPeriodo={dadosExtratoLojaPeriodo} dados={dados} />
                  
                    
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

      {/* <ModalAjusteExtratoModal
        show={modalAjuste}
        handleClose={() => setModalAjuste(false)}
      /> */}
    </Fragment>
  );
};