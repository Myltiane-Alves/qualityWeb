import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { toFloat } from "../../../../utils/toFloat";


export const ActionDetalheFechamentoLojaModal = ({ show, handleClose, dadosDetalheFechamento }) => {
  
  const calcularTotalDisponivel = (item) => {

    return (
      toFloat(item.VALORTOTALDINHEIRO) +
      toFloat(item.VALORTOTALFATURA) -
      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    )
  }

  const calcularTotalDespesasAdiantamento = (item) => {

    return (
      toFloat(item.VALORTOTALDESPESA) +
      toFloat(item.VALORTOTALADIANTAMENTOSALARIAL)
    );
  }

  const calcularTotalQuebraCaixa = (item) => {
    return (
      // toFloat(item.totalDinheiroInformado) -
      toFloat(item.VALORTOTALDINHEIRO)
    )
  }


  const dadosFechamento = dadosDetalheFechamento.map((item, index) => {
    // const totalDinheiroInformado = calcularTotalDinheiroInformado(item);
    const totalQuebraCaixa = calcularTotalQuebraCaixa(item);
    // const quebraCaixa = totalDinheiroInformado - item.VALORTOTALDINHEIRO;
    const quebraCaixa = item.VALORTOTALDINHEIRO;
    const totalDespesasAdiantamento = calcularTotalDespesasAdiantamento(item);
    const totalDisponivel = calcularTotalDisponivel(item);

    return {

      DSCAIXA: item.DSCAIXA,
      IDCAIXAWEB: item.IDCAIXAWEB,
      IDEMPRESA: item.IDEMPRESA,
      IDMOVIMENTOCAIXAWEB: item.IDMOVIMENTOCAIXAWEB,
      NOFANTASIA: item.NOFANTASIA,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      DINHEIRO: item.VALORINFORMADO.DINHEIRO,
      DINHEIROAJUSTE: item.VALORINFORMADO.DINHEIROAJUSTE,
      CARTAO: item.VALORINFORMADO.CARTAO,
      POS: item.VALORINFORMADO.POS,
      FATURA: item.VALORINFORMADO.FATURA,

      VALORTOTALADIANTAMENTOSALARIAL: item.VALORTOTALADIANTAMENTOSALARIAL,
      VALORTOTALCARTAO: item.VALORTOTALCARTAO,
      VALORTOTALCONVENIO: item.VALORTOTALCONVENIO,
      VALORTOTALDESPESA: item.VALORTOTALDESPESA,
      VALORTOTALDINHEIRO: item.VALORTOTALDINHEIRO,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      VALORTOTALPOS: item.VALORTOTALPOS,
      VALORTOTALVOUCHER: item.VALORTOTALVOUCHER,
      totalQuebraCaixa: parseFloat(totalQuebraCaixa).toFixed(2),
      quebraCaixa: parseFloat(quebraCaixa).toFixed(2),
      // totalDinheiroInformado: totalDinheiroInformado,

      VRDEPOSITO: item.DEPOSITOS[0]?.VRDEPOSITO,
      NUDOCDEPOSITO: item.DEPOSITOS[0]?.NUDOCDEPOSITO,
      DSHISTORIO: item.DEPOSITOS[0]?.DSHISTORIO,

      totalDespesasAdiantamento: formatMoeda(totalDespesasAdiantamento),
      totalDisponivel: totalDisponivel,
    }
  });

  const calcularTotalDinheiroColuna = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.VALORTOTALDINHEIRO);
    }
    return total;
  }
  const calcularTotalCartaoColuna = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.VALORTOTALCARTAO);
    }
    return total;
  }
  const calcularTotalPosColuna = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.VALORTOTALPOS);
    }
    return total;
  }
  const calcularTotalFaturaColuna = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.VALORTOTALFATURA);
    }
    return total;
  }
 
  // const calcularTotalDinheiroInformado = () => {
  //   let total = 0;
  //   for (let venda of dadosFechamento ? dadosFechamento : []) {
  //     total += parseFloat(venda?.totalDinheiroInformado);
  //   }
  //   return total;
  // }

  const calcularTotalCartao = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.CARTAO);
    }
    return total;
  }
  const calcularTotalPos = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.POS);
    }
    return total;
  }
  const calcularTotalFatura = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.FATURA);
    }
    return total;
  }
  const calcularTotalQuebra = () => {
    let total = 0;
    for (let venda of dadosFechamento) {
      total += parseFloat(venda.quebraCaixa);
    }
    return total;
  }

  const colunasFechamento = [
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: (row) => row.DSCAIXA,
      sortable: true
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: (row) => row.NOFUNCIONARIO,
      sortable: true,
      'footer': 'Total'
    },
    {
      field: 'VALORTOTALDINHEIRO',
      header: 'Receb. DIN',
      body: (row) => formatMoeda(row.VALORTOTALDINHEIRO),
      sortable: true,
      footer: formatMoeda(calcularTotalDinheiroColuna())
    },
    {
      field: 'VALORTOTALCARTAO',
      header: 'Receb. CART',
      body: (row) => formatMoeda(row.VALORTOTALCARTAO),
      sortable: true,
      footer: formatMoeda(calcularTotalCartaoColuna())
    },
    {
      field: 'VALORTOTALPOS',
      header: 'Receb. POS',
      body: (row) => formatMoeda(row.VALORTOTALPOS),
      sortable: true,
      footer: formatMoeda(calcularTotalPosColuna())
    },
    {
      field: 'VALORTOTALFATURA',
      header: 'Receb. FAT',
      body: (row) => formatMoeda(row.VALORTOTALFATURA),
      sortable: true,
      footer: formatMoeda(calcularTotalFaturaColuna())
    },
    // {
    //   field: 'totalDinheiroInformado',
    //   header: 'Inf. DIN',
    //   body: (row) => formatMoeda(row.totalDinheiroInformado),
    //   sortable: true,
    //   footer: formatMoeda(calcularTotalDinheiroInformado())
    // },
    {
      field: 'CARTAO',
      header: 'Inf. CART',
      body: (row) => formatMoeda(row.CARTAO),
      sortable: true,
      footer: formatMoeda(calcularTotalCartao())
    },
    {
      field: 'POS',
      header: 'Inf. POS',
      body: (row) => formatMoeda(row.POS),
      sortable: true,
      footer: formatMoeda(calcularTotalPos())
    },
    {
      field: 'FATURA',
      header: 'Inf. FAT',
      body: (row) => formatMoeda(row.FATURA),
      sortable: true,
      footer: formatMoeda(calcularTotalFatura())
    },
    {
      field: 'quebraCaixa',
      header: 'Quebra',
      body: (row) => {
        return (
          <div style={{color: row.quebraCaixa > 0 ? 'blue' : 'red' }}>
            {`${row.quebraCaixa > 0 ? ' + ' : ' - '}${row.quebraCaixa}`}
          </div>
        )
      },
      sortable: true,
      footer: formatMoeda(calcularTotalQuebra())
    },
 
  ]

  return (

    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"

      >

        <div style={{ padding: "10px" }}>

          <HeaderModal
            title={"Detalhe de Fechamento"}
            subTitle={"Relação de Recibimentos do Fechamento da Loja"}
            handleClose={handleClose}
          />

          <Modal.Body>
            <Fragment>
              <div className="card">
                <DataTable
                  title="Vendas por Loja"
                  value={dadosFechamento}
                  sortField="VRTOTALPAGO"
                  sortOrder={-1}
                  // paginator={true}
                  rows={50}
                  // rowsPerPageOptions={[5, 10, 20, 50]}
                  showGridlines
                  stripedRows
                  emptyMessage="Sem Registros para Exibir"
                >
                  {colunasFechamento.map(coluna => (
                    <Column
                      key={coluna.field}
                      field={coluna.field}
                      header={coluna.header}
                      
                      body={coluna.body}
                      footer={coluna.footer}
                      sortable={coluna.sortable}
                      headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
                      footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                      bodyStyle={{ fontSize: '0.8rem' }}

                    />
                  ))}
                </DataTable>
              </div>
            </Fragment>

            {dadosFechamento.length > 0 && (
              <Fragment >
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                  }}>
                  <h2 style={{ fontWeight: 700 }}>Relação de Depósitos</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    marginTop: "20px",
                    justifyContent: "space-around",

                    width: "100%",
                  }}>

                  <div className="col-sm-4 col-xl-2" >
                    <span style={{ fontSize: "15px", fontWeight: 400 }}>Valor Depositado (R$) </span>
                    <p style={{ fontSize: "16px", fontWeight: 600 }}>{formatMoeda(dadosFechamento[0]?.VRDEPOSITO)} </p>
                  </div>

                  <div className="col-sm-4 col-xl-2">
                    <span style={{ fontSize: "16px", fontWeight: 400 }}>

                      Histórico
                      <p style={{ fontSize: "16px", fontWeight: 600 }}>

                        {dadosFechamento[0]?.DSHISTORIO}
                      </p>
                    </span>
                  </div>

                  <div className="col-sm-4 col-xl-2">
                    <span style={{ fontSize: "16px", fontWeight: 400 }}>

                      Documento:
                    </span>
                    <p style={{ fontSize: "16px", fontWeight: 600 }}>

                      {parseFloat(dadosFechamento[0]?.NUDOCDEPOSITO)}
                    </p>
                  </div>

                </div>

              </Fragment>
            )}

          </Modal.Body>

          <FooterModal

            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}
          />
        </div>
      </Modal>
    </Fragment>
  )
}
