import { Fragment, useState } from "react"
import { ButtonTable } from "../../ButtonsTabela/ButtonTable";
import { dataFormatada } from "../../../utils/dataFormatada";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get } from "../../../api/funcRequest";
import Accordion from 'react-bootstrap/Accordion';
import { GrView } from "react-icons/gr";
import { formatMoeda } from "../../../utils/formatMoeda";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { ActionRelacaoProdutosModal } from "./Components/actionRelacaoRecebimentosModal";

export const ActionListaVendasDescontoFuncionario = ({ dadosVendasConvenioFuncionario }) => {
  const [modalPagamentoVisivel, setModalPagamentoVisivel] = useState(false)
  const [dadosPagamentoModal, setDadosPagamentoModal] = useState([])


  const dadosConvenioVendasDescontoFuncionario = dadosVendasConvenioFuncionario.map((item, index) => {
    let contador = index + 1;
    let vrTotalFaturaLoja = 0;
    vrTotalFaturaLoja + item.TOTALVENDAPROD;

    return {
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: item.DSCAIXA,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOCONVENIADO: item.NOCONVENIADO,
      CPFCONVENIADO: item.CPFCONVENIADO,

      VRBRUTOPAGO: item.VRBRUTOPAGO,
      VRDESPAGO: item.VRDESPAGO,
      VRLIQPAGO: item.VRLIQPAGO,
      contador,
      vrTotalFaturaLoja
    };
  });

  const calcularTotalVrBruto = () => {
    let total = 0;
    for (let dados of dadosConvenioVendasDescontoFuncionario) {
      total += parseFloat(dados.VRBRUTOPAGO);
    }
    return total;
  }

  const calcularTotalVrDesconto = () => {
    let total = 0;
    for (let dados of dadosConvenioVendasDescontoFuncionario) {
      total += parseFloat(dados.VRDESPAGO);
    }
    return total;
  }

  const calcularTotalVrLiq = () => {
    let total = 0;
    for (let dados of dadosConvenioVendasDescontoFuncionario) {
      total += parseFloat(dados.VRLIQPAGO);
    }
    return total;
  }

  const colunaVendasConvenioDescontoFuncionario = [
    {
      field: 'contador',
      header: '*',
      body: row => <th> {row.contador}</th>,
      sortable: true,
      width: "5%"
    },
    {
      field: 'IDCAIXAWEB',
      header: 'Caixa ',
      body: row => <th> {row.IDCAIXAWEB + row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda ',
      body: row => <th> {parseFloat(row.IDVENDA)}</th>,
      sortable: true,
    },
    {
      field: 'NFE_INFNFE_IDE_NNF',
      header: 'NFCe ',
      body: row => <th> {row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Abertura',
      body: row => <th> {row.DTHORAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <th> {row.NOFUNCIONARIO}</th>,
      sortable: true,
    },
    {
      field: 'NOCONVENIADO',
      header: 'Conveniado',
      body: row => <th> {row.NOCONVENIADO}</th>,
      footer: 'Total Vendas Convenio Desconto',
      sortable: true,
    },
    {
      field: 'CPFCONVENIADO',
      header: 'CPF',
      body: row => <th> {parseFloat(row.CPFCONVENIADO)}</th>,
      sortable: true,
    },
    {
      field: 'VRBRUTOPAGO',
      header: 'Valor Bruto',
      body: row => <th> {formatMoeda(row.VRBRUTOPAGO)}</th>,
      footer: formatMoeda(calcularTotalVrBruto()),
      sortable: true,
    },
    {
      field: 'VRDESPAGO',
      header: 'Desconto',
      body: row => <th> {formatMoeda(row.VRDESPAGO)}</th>,
      footer: formatMoeda(calcularTotalVrDesconto()),
      sortable: true,
    },
    {
      field: 'VRLIQPAGO',
      header: 'Valor Liq',
      body: row => <th> {formatMoeda(row.VRLIQPAGO)}</th>,
      footer: formatMoeda(calcularTotalVrLiq()),
      sortable: true,
    },
    {

      header: 'Opções',
      body: row => (
        <div>
          <ButtonTable
            titleButton={"Detalhar Recebimentos"}
            Icon={GrView}
            cor={"primary"}
            iconSize={18}
            onClickButton={() => handleClickPagamento(row)}
          />

        </div>
      ),
      sortable: true,
    },
  ]

  const handleEditPagamento = async (IDVENDA) => {
    try {
      const response = await get(`/vendas-recebimentos?idVenda=${IDVENDA}`)
      if (response.data) {
        setDadosPagamentoModal(response.data)
        setModalPagamentoVisivel(true)
        
      }
    } catch (error) {
      console.log(error, 'não foi possivel pegar os dados da tabela')
    }
  }
  const handleClickPagamento = (row) => {
    if (row.IDVENDA) {
      handleEditPagamento(row.IDVENDA)
    }
  }

  
  const footerGroup = (
    <ColumnGroup>

      <Row>
        <Column footer="Total Vendas Convenio Desconto" colSpan={8} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalVrBruto())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalVrDesconto())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalVrLiq())} colSpan={2} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
    

      </Row>


    </ColumnGroup>
  )

  return (
    <Fragment>
      <Accordion defaultActiveKey="0" className="col-xl-12" >
        <Accordion.Item eventKey="0" id="panel-1" className="panel" >
          <header className="panel-hdr tituloListVendasCaixa" >
            <h2 id="TituloLoja" >
              Lista de Vendas Com Desconto Funcionários e PN
            </h2>
          </header>
          <Accordion.Body className="panel-container show">


            <div className="card">
              <DataTable
                title="Vendas por Loja"
                value={dadosConvenioVendasDescontoFuncionario}
                sortField="VRTOTALPAGO"
                sortOrder={-1}
                paginator={true}
                footerColumnGroup={footerGroup}
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                showGridlines
                stripedRows
                emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
              >
                {colunaVendasConvenioDescontoFuncionario.map(coluna => (
                  <Column
                    key={coluna.field}
                    field={coluna.field}
                    header={coluna.header}
                    body={coluna.body}

                    sortable={coluna.sortable}
                    headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                    footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                    bodyStyle={{ fontSize: '0.8rem' }}

                  />
                ))}
              </DataTable>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ActionRelacaoProdutosModal 
        show={modalPagamentoVisivel}
        handleClose={() => setModalPagamentoVisivel(false)}
        dadosPagamentoModal={dadosPagamentoModal}
      />
    </Fragment>
  )
}