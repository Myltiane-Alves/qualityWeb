import { Fragment, useState } from "react"
import { dataFormatada } from "../../../utils/dataFormatada";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { ButtonTable } from "../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../utils/formatMoeda";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { get } from "../../../api/funcRequest";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { ActionRelacaoRecebimentosModal } from "../Components/ActionsModaisVendas/ActionRecebimentos/actionRelacaoRecebimentosModal";
import { ActionDetalheVendaProdutosModal } from "../Components/ActionsModaisVendas/actionDetalheVendaProdutosModal";
import { ActionDetalheVendaModal } from "../Components/ActionsModaisVendas/actionDetalheVendaModal";
import { toFloat } from "../../../utils/toFloat";
import { TbFileTypeXml } from "react-icons/tb";
import { ActionVendaXMLModal } from "./ActionVendasXML/actionVendaXMLModal";

export const ActionListaVendasCanceladas = ({ dadosVendasCanceladas, empresaSelecionada }) => {
  const [modalVendaVisivel, setModalVendaVisivel] = useState(false);
  const [modalProdutoVisivel, setModalProdutoVisivel] = useState(false);
  const [modalPagamentoVisivel, setModalPagamentoVisivel] = useState(false);
  const [dadosVendas, setDadosVendas] = useState([]);
  const [dadosProdutoModal, setDadosProdutoModal] = useState([]);
  const [dadosPagamentoModal, setDadosPagamentoModal] = useState([]);
  const [dadosDetalheVendasXML, setDadosDetalheVendasXML] = useState([]);
  const [modalXmlVisivel, setModalXmlVisivel] = useState(false);

  const dadosCanceladasVendas = dadosVendasCanceladas.map((item, index) => {
    let contador = index + 1; 
    // console.log(dadosVendasCanceladas, "item")
    return {
      IDCAIXAWEB: item.IDCAIXAWEB,
      DSCAIXA: `${item.IDCAIXAWEB} - ${item.DSCAIXA}`,
      IDVENDA: item.IDVENDA,
      NFE_INFNFE_IDE_NNF: item.NFE_INFNFE_IDE_NNF,
      DTHORAFECHAMENTO: item.DTHORAFECHAMENTO,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOFUNCIOCANCEL: item.NOFUNCIOCANCEL,
      TXTMOTIVOCANCELAMENTO: item.TXTMOTIVOCANCELAMENTO,
      VRTOTALPAGO: toFloat(item.VRTOTALPAGO),
      STCONTINGENCIA: item.STCONTINGENCIA,
      XML_FORMATADO: item.XML_FORMATADO || '',
      STCONFERIDO: item.STCONFERIDO,
      VRTOTALDESCONTO: toFloat(item.VRTOTALDESCONTO),
      VRTOTALVENDA: toFloat(item.VRTOTALVENDA),
      contador
    };
  });

  const calcularValorTotaPago = () => {
    let total = 0;
    for(let dados of dadosCanceladasVendas){
      total += parseFloat(dados.VRTOTALPAGO);
    }
    return total;
  }

  const colunaVendasCanceladas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,
      width: "5%"
    },
    {
      field: 'DSCAIXA',
      header: 'Caixa',
      body: row => <th>{row.DSCAIXA}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      body: row => <th>{row.IDVENDA}</th>,
      sortable: true,
    },
    {
      field: 'NFE_INFNFE_IDE_NNF',
      header: 'NFCe',
      body: row => <th>{row.NFE_INFNFE_IDE_NNF}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Abertura',
      body: row => <th>{row.DTHORAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Operador',
      body: row => <th>{row.NOFUNCIONARIO}</th>,
      footer: 'Total Vendas Cancelada',
      sortable: true,
    },
    {
      field: 'VRTOTALPAGO',
      header: 'Valor',
      body: row => <th>{formatMoeda(row.VRTOTALPAGO)}</th>,
      footer: formatMoeda(calcularValorTotaPago()),
      sortable: true,
    },
    {
      field: 'STCONTINGENCIA',
      header: 'Nota',
      body: row => (
        <th style={{color: row.STCONTINGENCIA == 'True' ? 'blue' : 'red'}}>
          {row.STCONTINGENCIA == 'True' ? 'Contigência' : 'Emitida'}
        </th>
      ),
      sortable: true,
    },
    {
      field: 'NOFUNCIOCANCEL',
      header: 'Cancelado Por',
      body: row => <th>{row.NOFUNCIOCANCEL}</th>,
      sortable: true,
    },
    {
      field: 'TXTMOTIVOCANCELAMENTO',
      header: 'Motivo',
      body: row => <th>{row.TXTMOTIVOCANCELAMENTO}</th>,
      sortable: true,
    },
  
    {
      field: 'STCONFERIDO',
      header: 'Opções',
      body: (row) => (
        <div className="p-1 "
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Venda"}
              onClickButton={() => handleClickVenda(row)}
              Icon={GrView}
              iconSize={20}
              cor={"info"}
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Produtos"}
              onClickButton={() => handleClickProduto(row)}
              Icon={FaProductHunt}
              iconSize={20}
              cor={"warning"}
            />
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Recebimentos"}
              onClickButton={() => handleClickPagamento(row)}
              Icon={MdOutlineAttachMoney}
              iconSize={20}
              cor={"success"}
            />
          </div>
          <div className="p-1">
             <ButtonTable
                titleButton={`${row.XML_FORMATADO?.length > 0 ? 'Visualizar Xml da Venda' : 'Venda Sem XML'}` }
                disabledBTN={row.XML_FORMATADO?.length === 0}
                onClickButton={() => clickDetalharVendaXML(row)}
                Icon={TbFileTypeXml}
                iconSize={20}
                iconColor={"#fff"}
                cor={"info"}
                width="30px"
                height="30px"

              />
          </div>
        </div>
      ),
    },

  ]

  const handleEditProduto = async (IDVENDA, empresaSelecionada) => {
    try {
      const response = await get(`/detalhe-venda?idVenda=${IDVENDA}&idEmpresa=${empresaSelecionada}`)
      if (response.data) {
        setDadosProdutoModal(response.data)
        setModalProdutoVisivel(true)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickProduto = async (row) => {
    if (row && row.IDVENDA && empresaSelecionada) {
      handleEditProduto(row.IDVENDA, empresaSelecionada)
    }
  }

  const handleClickVenda = async (row) => {
    if (row && row.IDVENDA && empresaSelecionada) {
      handleEditVenda(row.IDVENDA, empresaSelecionada);
    }
  }

  const handleEditVenda = async (IDVENDA, empresaSelecionada) => {
   
    try {
      const response = await get(`/resumo-venda-caixa-detalhado?idVenda=${IDVENDA}&idEmpresa=${empresaSelecionada}`);
      if (response.data) {
        setDadosVendas(response.data);
        setModalVendaVisivel(true);
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ");
    }
  }

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
    if (row && row.IDVENDA) {
      handleEditPagamento(row.IDVENDA)
    }
  }

  const clickDetalharVendaXML = (row) => {
    if (row && row.IDVENDA) {
      handleDetalharVendaXML(row.IDVENDA);
    }
  };

  const handleDetalharVendaXML = async (IDVENDA) => {
    try {
      const response = await get(`/venda-xml?idVenda=${IDVENDA}`);
      setModalXmlVisivel(true);
      setDadosDetalheVendasXML(response.data)
      
    } catch (error) {
      console.error(error);
    }
  }

  const footerGroup = (
    <ColumnGroup>
      <Row> 
        <Column footer="Total Vendas Cancelada " colSpan={6} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularValorTotaPago())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={""} colSpan={4} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
      </Row>
    </ColumnGroup>
  )

  return (
    <Fragment>

 
      <div className="panel" style={{marginTop: '2rem'}}>
          <header className="panel-hdr " >
            <h2 >
              Lista de Vendas Canceladas
            </h2>
          </header>

          <div className="card">
            <DataTable
              title="Vendas por Loja"
              value={dadosCanceladasVendas}
              size="small"
              footerColumnGroup={footerGroup}
              sortOrder={-1}
              paginator={true}
              rows={10}
              rowsPerPageOptions={[10, 20, 50, 100, dadosCanceladasVendas.length]}
              showGridlines
              stripedRows
              emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
            >
              {colunaVendasCanceladas.map(coluna => (
                <Column
                  key={coluna.field}
                  field={coluna.field}
                  header={coluna.header}
                  body={coluna.body}
                  // footer={coluna.footer}
                  sortable={coluna.sortable}
                  headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                  footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                  bodyStyle={{ fontSize: '0.8rem' }}

                />
              ))}
            </DataTable>
          </div>

      </div>


      {modalVendaVisivel && (
        <ActionDetalheVendaModal
          show={modalVendaVisivel}
          handleClose={() => setModalVendaVisivel(false)}
          dadosVendas={dadosVendas}
        />
      )}

      {modalProdutoVisivel && ( 

        <ActionDetalheVendaProdutosModal 
          show={modalProdutoVisivel}
          handleClose={() => setModalProdutoVisivel(false)}
          dadosProdutoModal={dadosProdutoModal}
        />
      )}

      {modalPagamentoVisivel && (
        <ActionRelacaoRecebimentosModal
          show={modalPagamentoVisivel}
          handleClose={() => setModalPagamentoVisivel(false)}
          dadosPagamentoModal={dadosPagamentoModal}
        />
      )}

    <ActionVendaXMLModal 
      show={modalXmlVisivel} 
      handleClose={() => setModalXmlVisivel(false)}
      dadosDetalheVendasXML={dadosDetalheVendasXML} 
    />
    </Fragment>
  )
}