import { Fragment, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from '../../../../utils/formatMoeda';
import { ButtonTable } from '../../../ButtonsTabela/ButtonTable';
import { GrFormView } from 'react-icons/gr';
import HeaderTable from '../../../Tables/headerTable';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useReactToPrint } from "react-to-print";
import { get } from '../../../../api/funcRequest';
import { retornaDiasEntreDatas } from '../../../../utils/retornoEntreDias';
import { Checkbox } from "primereact/checkbox";
import Swal from 'sweetalert2';
import { useAuthFuncionarioCreate } from '../../Hooks/useAuthFuncionarioCreate';

export const ActionListaVendaCLiente = ({ 
  dadosVendasClientes, 
  tabelaPrincipal, 
  setTabelaPrincipal, 
  tabelaSecundaria, 
  setTabelaSecundaria, 
  btnVisivel, 
  setBtnVisivel,
  colunaSelecionada, 
  setColunaSelecionada
}) => {
  const [dadosVisualizarProdutos, setDadosVisualizarProdutos] = useState([])
  const [rowClick, setRowClick] = useState(true);
  const [selectedRows, setSelectedRows] = useState([])
  const [quantidade, setQuantidade] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [trocaSelecionada, setTrocaSelecionada] = useState('');
  const dataTableRef = useRef();

  

  // const onRowSelect = (row, checked) => {
  //   if (checked) {
  //     setSelectedRows([...selectedRows, row]); // Adiciona a linha selecionada
  //   } else {
  //     setSelectedRows(selectedRows.filter(selectedRow => selectedRow.IDVENDA !== row.IDVENDA)); // Remove a linha desmarcada
  //   }
  // };

  const onRowSelect = (row, checked) => {
    if (checked) {
      // Adiciona a linha selecionada ao estado
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
    } else {
      // Remove apenas a linha desmarcada do estado
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((selectedRow) => selectedRow.contadorIndex !== row.contadorIndex)
      );
    }
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };
  
  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Vouchers Emitidos',
  });
  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Nº Venda', 'Cliente', 'CPF/CNPJ' , 'Loja', 'Valor Pago', 'Data', 'Situação']
    worksheet['!cols'] = [
      { wpx: 50,  caption: 'Nº' },
      { wpx: 100, caption: 'Nº Venda' },
      { wpx: 200, caption: 'Cliente' },
      { wpx: 100, caption: 'CPF/CNPJ' },
      { wpx: 200, caption: 'Loja' },
      { wpx: 100, caption: 'Valor Pago' },
      { wpx: 100, caption: 'Data' },
      { wpx: 100, caption: 'Situação' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vouchers Emitidos');
    XLSX.writeFile(workbook, 'venda_cliente_vouchers.xlsx');
  };
  
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Nº Venda', 'Cliente', 'CPF/CNPJ' , 'Loja', 'Valor Pago', 'Data', 'Situação']],
      body: dados.map(item => [
        item.contador,
        item.IDVENDA,
        item.nomeClienteVenda,
        item.DEST_CPF,
        item.NOFANTASIA,
        formatMoeda(item.VRTOTALPAGO),
        item.DTHORAFECHAMENTO,
        item.STCANCELADO == 'True' ? 'Ativa' : 'Cancelada'
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('venda_cliente_vouchers.pdf');
  };

  const dados = dadosVendasClientes.map((item, index) => {
    let contador = index + 1;
    const nomeClienteVenda = item.venda.DEST_CPF ? item.venda.DSNOMERAZAOSOCIAL + ' - ' + item.venda.DSAPELIDONOMEFANTASIA : item.venda.DSNOMERAZAOSOCIAL;
    return {
      contador,
      IDVENDA: item.venda.IDVENDA,
      nomeClienteVenda: nomeClienteVenda,
      DEST_CPF: item.venda.DEST_CPF,
      NOFANTASIA: item.venda.NOFANTASIA,
      VRTOTALPAGO: item.venda.VRTOTALPAGO,
      DTHORAFECHAMENTO: item.venda.DTHORAFECHAMENTO,
      STCANCELADO: item.venda.STCANCELADO,
      DSNOMERAZAOSOCIAL: item.venda.DSNOMERAZAOSOCIAL,
      DSAPELIDONOMEFANTASIA: item.venda.DSAPELIDONOMEFANTASIA,
      DEST_CNPJ: item.venda.DEST_CNPJ,
    }
  });
  
  const colunasVouchers = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th style={{color: 'blue'}}>{row.contador}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Nº Venda',
      // body: row => <th style={{color: 'blue'}}>{ocultaParteDosDadosVoucher(row.NUVOUCHER)}</th>,
      body: row => <th style={{color: 'blue'}}>{row.IDVENDA}</th>,
      sortable: true,
    },
    {
      field: 'nomeClienteVenda',
      header: 'Cliente',
      body: row => <th style={{color: 'blue'}}>{row.nomeClienteVenda}</th>,
      sortable: true,
    },
    {
      field: 'DEST_CPF',
      header: 'CPF/CNPJ',
      body: row => <th style={{color: 'blue'}}>{row.DEST_CPF}</th>,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <th style={{color: 'blue'}}>{row.NOFANTASIA}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALPAGO',
      header: 'Valor Pago',
      body: row => <th style={{color: 'blue'}}>{formatMoeda(row.VRTOTALPAGO)}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Data',
      body: row => <th style={{color: 'green'}}>{row.DTHORAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'STCANCELADO',
      header: 'Situação',
      body: row => <th style={{color: row.STCANCELADO == 'False' ? 'blue' : 'red'}}>{row.STCANCELADO == 'False' ? 'Ativa' : 'Cancelada'}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Opções',
      body: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around", width: '7rem' }}>
          <div>

            <ButtonTable
              titleButton={"Visualizar Detalhes"}
              onClickButton={() => handleTipoTroca(row)}
              Icon={GrFormView}
              iconSize={30}
              iconColor={"#fff"}
              cor={"success"}
              width="40px"
              height="40px"
            />
          </div>
        </div>
      ),
    }

  ]

  const handleTipoTroca = async (row) => {
    const { value: tipoTroca } = await Swal.fire({
      title: 'Tipo da troca?',
      input: 'select',
      inputOptions: {
        '': 'Selecione',
        'CORTESIA': 'CORTESIA',
        'DEFEITO': 'DEFEITO',
      },
      width: '25rem',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#7a59ad',
      cancelButtonText: 'Sair',
      cancelButtonColor: '#FD429A',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,

      preConfirm: () => {
        if(row.IDVENDA) {
          handleDetalhar(row.IDVENDA)
        }
      }
    });
  
    if (tipoTroca) {
      setTrocaSelecionada(tipoTroca);
      return tipoTroca;
    }
  
    return false;
  };

  const handleClickDetalhar = async (row) => {
    if (row.IDVENDA) {
      handleDetalhar(row.IDVENDA)
    }

  }

  const handleDetalhar = async (IDVENDA) => {
    try {
      const response = await get(`/lista-venda-cliente?idVenda=${IDVENDA}`)
      if (response.data) {
        setDadosVisualizarProdutos(response.data)
        setTabelaPrincipal(false)
        setTabelaSecundaria(true)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }
  

  const dadosProdutos = dadosVisualizarProdutos.flatMap((item) => {
    const { venda, detalhe } = item;
    
    return detalhe.map((detalheItem, index) => {
      const contadorIndex = index + 1;
      return {

        CPROD: detalheItem.det.CPROD,
        IDVENDADETALHE: detalheItem.det.IDVENDADETALHE,
        XPROD: detalheItem.det.XPROD,
        NUCODBARRAS: detalheItem.det.NUCODBARRAS,
        QTD: detalheItem.det.QTD,
        VRTOTALLIQUIDO: detalheItem.det.VRTOTALLIQUIDO,
        VUNTRIB: detalheItem.det.VUNTRIB,
        VPROD: detalheItem.det.VPROD,
        STTROCA: detalheItem.det.STTROCA,
        VENDEDOR_MATRICULA: detalheItem.det.VENDEDOR_MATRICULA,
        STCANCELADO: detalheItem.det.STCANCELADO,
        contadorIndex: contadorIndex,

      };
    });
  });
  
  const dadosProdutosVenda = dadosVisualizarProdutos.flatMap((item) => {
    let dataVenda =  item.venda?.DTHORAFECHAMENTOFORMATEUA;
    let diferenciaDias =  retornaDiasEntreDatas(dataVenda);
    let dataAutorizada = trocaSelecionada == 'CORTESIA' ? 32 : 90;

    return {
      IDVENDA: item.venda?.IDVENDA,
      DTHORAFECHAMENTO: item.venda?.DTHORAFECHAMENTO,
      DTHORAFECHAMENTOFORMATEUA: item.venda?.DTHORAFECHAMENTOFORMATEUA,
      diferenciaDias,
      dataAutorizada,
    };

  });

  const colunasVouchers2 = [
    {
      field: 'contadorIndex',
      header: 'Nº',
      body: row => <p >{row.contadorIndex}</p>,
      sortable: true,
    },
    {
      field: 'contadorIndex',
      header: 'Selecione',
      body: row => (
        <Checkbox 
        onChange={(e) => {
          onRowSelect(row, e.checked)
          setBtnVisivel(e.checked || selectedRows.length > 1)
  
          setColunaSelecionada((prev) => {
            if (e.checked) {
              return [...prev, row];
            } else {
              return prev.filter((item) => item.contadorIndex !== row.contadorIndex);
            }
          });
        }}
          checked={selectedRows.some(selectedRow => selectedRow.contadorIndex === row.contadorIndex)} 
        />
      ),
      sortable: true,
    },
    {
      field: 'CPROD',
      header: 'Codigo Produto',
      body: row => <th >{row.CPROD}</th>,
      sortable: true,
    },
    {
      field: 'XPROD',
      header: 'Produto',
      body: row => <th >{row.XPROD}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Codigo Barras',
      body: row => <th >{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'Quantidade',
      body: row => {
        const isCheckboxChecked = selectedRows.some(selectedRow => selectedRow.contadorIndex === row.contadorIndex);
         const isDisabled = !isCheckboxChecked || row.QTD > 1; 
         
        return (

          <div className="">
            <input 
              type="number" 
              name="quantidadeProduto" 
              value={row.QTD} 
              style={{ width: '100px', textAlign: 'center' }} 
              onChange={(e) => setQuantidade(e.target.value)} 
              disabled={isDisabled}
            />

          </div>
        )
      },
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Valor',
      body: row => <th style={{}} >{row.VRTOTALLIQUIDO} </th>,
      sortable: true,
    },
  ]

  return (
    <Fragment>
      {tabelaPrincipal && (
        <div className="panel">
          <div className="panel-hdr">
            <h2>Vouchers Venda Clientes </h2>
          </div>
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <HeaderTable
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={onGlobalFilterChange}
              handlePrint={handlePrint}
              exportToExcel={exportToExcel}
              exportToPDF={exportToPDF}
            />

          </div>
          <div className="card" ref={dataTableRef}>
            <DataTable
              title="Vouchers"
              size="small"
              value={dados}
              globalFilter={globalFilterValue} 
              sortOrder={-1}
              paginator={true}
              rows={10}
              rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
              showGridlines
              stripedRows
              emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
            >
              {colunasVouchers.map(coluna => (
                <Column
                  key={coluna.field}
                  field={coluna.field}
                  header={coluna.header}
                  body={coluna.body}
                  footer={coluna.footer}
                  sortable={coluna.sortable}
                  headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '1rem' }}
                  footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                  bodyStyle={{ fontSize: '1rem' }}
                />
              ))}
      
            </DataTable>
          </div>
        </div>
      )}

      {tabelaSecundaria && (
        <Fragment>
          <div className="panel">
            <div className="panel-hdr">
              <h2>Lista Vendas </h2>
 
              {+dadosProdutosVenda[0]?.diferenciaDias > dadosProdutosVenda[0]?.dataAutorizada && (
                <Fragment>

                                    {/* <h2>

                                      Produtos - Vendas {dadosProdutosVenda[0]?.IDVENDA} &nbsp; - &nbsp;
                                      <span style={{ color: '#fd3995' }}>
                                        Dias Passados Após a Compra <b><u>{dadosProdutosVenda[0]?.diferenciaDias} DIAS</u></b>
                                      </span>
                                    </h2> */}

                    <span class="fw-500">
                      <i> Produtos - Venda: {dadosProdutosVenda[0]?.IDVENDA}</i>  &#160;&#160; 
                      <i class="text-danger h4">Venda Fora do Prazo de <u><b/>{dadosProdutosVenda[0]?.dataAutorizada} DIAS</u><b/> 
                        Para Troca do Tipo <u><b/>{trocaSelecionada}</u><b/>. 
                        Dias Passados Após a Compra: <u><b/>{dadosProdutosVenda[0]?.diferenciaDias} DIAS<b/></u></i>
                    </span>
                </Fragment>
              )}

            </div>

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <HeaderTable
                globalFilterValue={globalFilterValue}
                onGlobalFilterChange={onGlobalFilterChange}
                handlePrint={handlePrint}
                exportToExcel={exportToExcel}
                exportToPDF={exportToPDF}
              />

            </div>
            <div className="card">

              <DataTable
                title="Vendas Voucher por Loja"
                value={dadosProdutos}
                globalFilter={globalFilterValue}
                size="small"
                sortOrder={-1}
                // selectionMode={rowClick ? null : 'checkbox'}
                paginator={true}
                rows={10}
                rowsPerPageOptions={[10, 20, 50, 100, dadosProdutos.length]}
                showGridlines
                stripedRows
                emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
              >
                {colunasVouchers2.map(coluna => (
                  <Column
                    key={coluna.field}
                    field={coluna.field}
                    header={coluna.header}
                    body={coluna.body}
                    footer={coluna.footer}
                    sortable={coluna.sortable}
                    headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '1rem' }}
                    footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '1rem' }}
                    bodyStyle={{ fontSize: '1rem' }}

                  />
                ))}
              </DataTable>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}