import { Fragment, useState } from "react"
import { dataFormatada } from "../../../utils/dataFormatada";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { formatMoeda } from "../../../utils/formatMoeda";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { toFloat } from "../../../utils/toFloat";

export const ActionListaMovimentacaoCaixaDia = ({ 
  dadosMovimentacaoCaixaDoDia, 
  dadosDespesas,
  dadosQuebraCaixa,
  dadosAdiantamentoSalarial 
}) => {
  
  const [size, setSize] = useState('small');
  const adiantamento = dadosAdiantamentoSalarial.map((item) => {
    return {
      VRADIANTAMENTO: item.VRADIANTAMENTO,
    }
  })

  const calcularTotalAdiantamento = () => {
    let total = 0
    for(let dados of adiantamento){
      total += toFloat(dados.VRADIANTAMENTO)
    }
    return total
  }

  const quebraCaixa = dadosQuebraCaixa.map((item) => {

    const quebraCaixaDinheiro = () => {
      if (item.VRAJUSTDINHEIRO > 0) {
        return toFloat(item.VRAJUSTDINHEIRO);
      } else {
        return toFloat(item.VRRECDINHEIRO);
      }
    };

    const quebraCaixaDinheiroTotal = quebraCaixaDinheiro();
    const totalQuebraCaixa = quebraCaixaDinheiroTotal - toFloat(item.VRFISICODINHEIRO)
   
    return {
      VRFISICODINHEIRO: item.VRFISICODINHEIRO,
      VRRECDINHEIRO: item.VRRECDINHEIRO,
      VRRECDINHEIROAJUSTE: item.VRRECDINHEIROAJUSTE,
      totalQuebraCaixa: totalQuebraCaixa,
    }
  })

  const calcularTotalQuebraCaixa = () => {
    let total = 0
    for(let dados of quebraCaixa){
      total += toFloat(dados.totalQuebraCaixa)
    }
    return total
  }

  const despesas = dadosDespesas.map((item) => {
    return {
      VRDESPESA: item.VRDESPESA,
    }
  })


  const calcularTotalDespesas = () => {
    let total = 0
    for(let dados of despesas){
      total += toFloat(dados.VRDESPESA)
    }
    return total
  }

  
  const calcularTotalVendido = (item) => {

    return (
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCARTAO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPOS) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCONVENIO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPIX) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOVOUCHER) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOMOOVPAY)

    );
  }
  const calcularTotalCaixa = (item) => {

    return (
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCARTAO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPOS) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCONVENIO) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPIX) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOVOUCHER) +
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOMOOVPAY)

    );
  }

  const calcularTotalVrDisponivel = (item) => {

    return (
      toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO) +
      toFloat(item.fatura[0]['fatura-movimento'].TOTALRECEBIDOFATURA)
    )
  }

  const calcularTotalPCJTotal = (item) => {

    // return (
    //   (toFloat(item.vendapcj[0]['venda-pcj'].TOTALPCJ18) /
    //   toFloat(item.vendapcj[0]['venda-pcj'].TOTALPCJ78)) * 100
    // )
    const vrPCJ18 = toFloat(item.vendapcj[0]['venda-pcj'].TOTALPCJ18);
    const vrPCJ78 = toFloat(item.vendapcj[0]['venda-pcj'].TOTALPCJ78);
    const totalPCJ = vrPCJ18 !== 0 ? (vrPCJ78 / vrPCJ18) * 100 : 0;
    return totalPCJ;

  }

  const calcularValorTotalFatura = (item) => {
    return (
      toFloat(item.fatura[0]['fatura-movimento'].TOTALRECEBIDOFATURA) +
      toFloat(item.faturapix[0]['fatura-movimento-pix'].TOTALRECEBIDOFATURAPIX)
    )
  }
  const dadosMovLojaDia = dadosMovimentacaoCaixaDoDia.map((item, index) => {
    const totalVendido = calcularTotalVendido(item);
    const vrDisponivel = calcularTotalVrDisponivel(item);
    const pcjTotal = calcularTotalPCJTotal(item)
    const vrTotalFatura = calcularValorTotalFatura(item);
    const vrTotalCaixa = calcularTotalCaixa(item);

  
    return {
      IDCAIXAWEB: item.caixa.IDCAIXAWEB,
      ID: item.caixa.ID,
      DSCAIXA: item.caixa.DSCAIXA,
      DTABERTURA: item.caixa.DTABERTURA,
      NOFUNCIONARIO: item.caixa.NOFUNCIONARIO,
      NUCPF: item.caixa.NUCPF,
      STFECHADO: item.caixa.STFECHADO,
      VRRECDINHEIRO: item.caixa.VRRECDINHEIRO,


      TOTALRECEBIDOFATURA: item.fatura[0]['fatura-movimento'].TOTALRECEBIDOFATURA,
      TOTALRECEBIDOFATURAPIX: item.faturapix[0]['fatura-movimento-pix'].TOTALRECEBIDOFATURAPIX,

      TOTALVENDIDODINHEIRO: toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDODINHEIRO),
      TOTALVENDIDOCARTAO: toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCARTAO),
      TOTALVENDIDOPOS: toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPOS),
      TOTALVENDIDOPIX: toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOPIX),
      TOTALVENDIDOMOOVPAY: toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOMOOVPAY),
      TOTALVENDIDOVOUCHER: item.venda[0]['venda-movimento'].TOTALVENDIDOVOUCHER,
      TOTALVENDIDOCONVENIO: toFloat(item.venda[0]['venda-movimento'].TOTALVENDIDOCONVENIO),
      TOTALVENDIDO: item.venda[0]['venda-movimento'].TOTALVENDIDO,
      TOTALNOTA: item.venda[0]['venda-movimento'].TOTALNOTA,

      TOTALPCJ18: item.vendapcj[0]['venda-pcj'].TOTALPCJ18,
      TOTALPCJ78: item.vendapcj[0]['venda-pcj'].TOTALPCJ78,

      totalVendido: totalVendido,
      vrDisponivel: vrDisponivel,
      pcjTotal: pcjTotal,
      vrTotalFatura: vrTotalFatura,
      vrTotalCaixa: vrTotalCaixa,
    };
  });

  const colunaCaixaDoDia = [
    {
      field: 'ID',
      header: 'Nº Movimento',
      body: row => <th>{row.ID}</th>,
      sortable: true,

    },
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: row => <th> {row.IDCAIXAWEB} - {row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'DTABERTURA',
      header: 'Abertura',
      body: row => <th>{row.DTABERTURA} </th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <th>{row.NOFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      field: 'TOTALRECEBIDOFATURA',
      header: 'Fatura',
      body: row => <th>{formatMoeda(row.TOTALRECEBIDOFATURA)}</th>,
      sortable: true,
    },
    {
      field: 'TOTALRECEBIDOFATURAPIX',
      header: 'Fatura PIX',
      body: row =>  <th>{formatMoeda(row.TOTALRECEBIDOFATURAPIX)}</th>,
      sortable: true,
    },

    {
      field: 'vrTotalFatura',
      header: 'Total Fatura',
      body: row => <th>{formatMoeda(row.vrTotalFatura)}</th>,
      sortable: true,
    },
    {
      field: 'TOTALVENDIDODINHEIRO',
      header: 'Dinheiro',
      body: row => <th>{formatMoeda(row.TOTALVENDIDODINHEIRO)}</th>,
      sortable: true,
    },
    {
      field: 'TOTALVENDIDOCARTAO',
      header: 'Cartao',
      body: row => <th>{formatMoeda(row.TOTALVENDIDOCARTAO)}</th>,
      sortable: true,
    },
    {

      field: 'pcjTotal',
      header: '% PCJ',
      body: row => (
        <th style={{ color: row.pcjTotal < 30 ? 'red' : 'blue' }}>
          {formatMoeda(row.pcjTotal)}
        </th>
      ),
      sortable: true,
    },
    {
      field: 'TOTALVENDIDOPOS',
      header: 'POS',
      body: row => <th>{formatMoeda(row.TOTALVENDIDOPOS)}</th>,
      sortable: true,
    },
    {
      field: 'TOTALVENDIDOPIX',
      header: 'PIX',
      body: row =>  <th>{formatMoeda(row.TOTALVENDIDOPIX)}</th>,
      sortable: true,
    },
    {
      field: 'TOTALVENDIDOVOUCHER',
      header: 'Voucher',
      body: row => <th>{formatMoeda(row.TOTALVENDIDOVOUCHER)}</th>,
      sortable: true,
    },
    {
      field: 'TOTALVENDIDOCONVENIO',
      header: 'Convênio',
      body: row => <th>{formatMoeda(row.TOTALVENDIDOCONVENIO)}</th>,
      sortable: true,
    },
    {
      field: 'totalVendido',
      header: 'Total',
      body: row => <th> {formatMoeda(row.totalVendido)}  </th>,
      sortable: true,
    },
    {
      field: 'vrDisponivel',
      header: 'Disponível',
      body: row => <th> {formatMoeda(row.vrDisponivel)}</th>,
      sortable: true,
    },
    {
      field: 'STCANCELADO',
      header: 'Situação',
      body: row => (
        <th style={{ color: row.STCANCELADO === 'FALSE' ? 'blue' : 'red' }}>
          {row.STCANCELADO === 'FALSE' ? 'ABERTO' : 'FECHADO'}
        </th>
      ),
      sortable: true,
    },

  ]

  const calcularTotalFatura = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALRECEBIDOFATURA)
    }
    return total
  }

  const calcularFaturaPix = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){

      total += toFloat(dados.TOTALRECEBIDOFATURAPIX)
    }
    return total
  }

  const calcularTotalFaturaTotal = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.vrTotalFatura)
    }
    return total
  } 

  const calcularTotalVendidoDinheiro = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALVENDIDODINHEIRO)
    }
    return total
  }

  const calcularTotalVendidoCartao = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALVENDIDOCARTAO)
    }
    return total
  }

  const calcularTotalPCJ = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.pcjTotal)
    }
    return total
  }

  const calcularTotalPOS = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALVENDIDOPOS)
    }
    return total
  }

  const calcularTotalPIX = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALVENDIDOPIX)
    }
    return total
  }

  const calcularTotalVendidoVoucher = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALVENDIDOVOUCHER)
    }
    return total
  }

  const calcularTotalVendidoConvenio = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.TOTALVENDIDOCONVENIO)
    }
    return total
  }

  const calcularTotalCaixaTotal = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.vrTotalCaixa)
    }
    return total
  }

  const calcularVRDisponivel = () => {
    let total = 0
    for(let dados of dadosMovLojaDia){
      total += toFloat(dados.vrDisponivel)
    }
    return total
  }

  const totalDisponivel = (calcularVRDisponivel() - calcularTotalDespesas() - calcularTotalAdiantamento()) + calcularTotalQuebraCaixa()

  const footerGroup = (
    <ColumnGroup>

      <Row>
        <Column footer="Total dos Caixas" colSpan={4} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalFatura())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularFaturaPix())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalFaturaTotal())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVendidoDinheiro())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVendidoCartao())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalPCJ())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalPOS())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalPIX())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVendidoVoucher())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVendidoConvenio())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalCaixaTotal())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularVRDisponivel())}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={''}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>
      <Row>
        <Column footer="Total Despesas: (-)" colSpan={4} style={{textAlign: 'center'}}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={""} colSpan={10}  footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalDespesas())}  footerStyle={{textAlign: 'center', color: 'red', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={""} colSpan={3}  footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>
      <Row>
        <Column footer="Total Quebra (só caixas fechados): (+)" colSpan={4} style={{textAlign: 'center'}}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer="" colSpan={10} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalQuebraCaixa())}  footerStyle={{textAlign: 'center', color: 'blue', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer="" colSpan={3} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>
      <Row>
        <Column footer="Total Disponível (Dinheiro + Faturas - Despesas - Adiantamentos - Quebra):" colSpan={4} style={{textAlign: 'center'}}footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={""} colSpan={10} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(totalDisponivel)} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        
        <Column footer="" colSpan={3} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
      </Row>
      
      
    </ColumnGroup>
  )

  return (
    <Fragment>
      <div className="row" >
        <Accordion defaultActiveKey="0" className="col-xl-12" >
          <Accordion.Item eventKey="0" id="panel-1" className="panel" >
            <header className="panel-hdr tituloListVendasCaixa" >
              <h2 id="TituloLoja" >
                Lista de Movimentação dos Caixas do Dia
              </h2>
            </header>
            <Accordion.Body className="panel-container show">
              <div className="card">
                <DataTable
                  title="Vendas por Loja"
                  value={dadosMovLojaDia}
                  size={size}
                  footerColumnGroup={footerGroup}
                  sortOrder={-1}
                  rows={true}
                  showGridlines
                  stripedRows
                  emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                >
                  {colunaCaixaDoDia.map(coluna => (
                    <Column
                      key={coluna.field}
                      field={coluna.field}
                      header={coluna.header}
                      body={coluna.body}
                      footer={coluna.footer}
                      sortable={coluna.sortable}
                      headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                      footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                      bodyStyle={{ fontSize: '0.8rem', }}

                    />
                  ))}
                </DataTable>
              </div>
            </Accordion.Body  >
          </Accordion.Item>
        </Accordion>
      </div>
    </Fragment>
  )
}