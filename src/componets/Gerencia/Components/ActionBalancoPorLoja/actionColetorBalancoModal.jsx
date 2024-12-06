import { Fragment, useEffect, useRef, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { useForm } from "react-hook-form";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GrAdd, GrFormView } from "react-icons/gr";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { get, post, put } from "../../../../api/funcRequest";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import HeaderTable from "../../../Tables/headerTable";
import { BsTrash3 } from "react-icons/bs";
import { FaCheck, FaMinus } from "react-icons/fa";
import { InputNumber } from "primereact/inputnumber";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";


export const ActionColetorBalancoModal = ({ show, handleClose, dadosResumoBalancoModal }) => {
  const { register, handleSubmit, errors } = useForm();
  const [modalResumo, setModalResumo] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [globalFilterValueDetalhe, setGlobalFilterValueDetalhe] = useState('');
  const [detalhesBalanco, setDetalhesBalanco] = useState([]);
  const [modalDetalhesBalanco, setModalDetalhesBalanco] = useState(false);
  const [size, setSize] = useState('small');
  const [tabelaDetalhe, setTabelaDetalhe] = useState(false);
  const [tabelaColetor, setTabelaColetor] = useState(true);
  const [quantidade, setQuantidade] = useState(0);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [ipUsuario, setIpUsuario] = useState('')
  const dataTableRef = useRef();
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
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if(response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }


  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Coletor Resumo Balanço',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Coletor', 'Qtd Itens', 'Total Custo', 'Total Venda']],
      body: dados.map(item => [

        item.DSCOLETOR,
        parseFloat(item.NUMEROCOLETOR),
        item.IDEMPRESA,
        item.NUMITENS,
        item.TOTALCUSTO,
        item.TOTALVENDA,
        item.IDRESUMOBALANCO,
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('coletor_balanco.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Coletor', 'Qtd Itens', 'Total Custo', 'Total Venda'];
    worksheet['!cols'] = [
      { wpx: 150, caption: 'Nº' }, 
      { wpx: 50, caption: 'Qtd Itens' },
      { wpx: 100, caption: 'Total Custo' },
      { wpx: 100, caption: 'Total Venda' },
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Coletor Resumo Balanço');
    XLSX.writeFile(workbook, 'coletor_balanco.xlsx');
  };

  const dados = dadosResumoBalancoModal.map((item, index) => {
    
    
    return {
      IDEMPRESA: item.IDEMPRESA,
      IDRESUMOBALANCO: item.IDRESUMOBALANCO,
      NUMEROCOLETOR: item.NUMEROCOLETOR,
      NUMITENS: item.NUMITENS,
      TOTALCUSTO: item.TOTALCUSTO,
      TOTALVENDA: item.TOTALVENDA,
      STCONSOLIDADO: item.STCONSOLIDADO,

    }
  })

  const cacularTotalQtdItens = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.NUMITENS), 0);
  }
  
  const cacularTotalCusto = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.TOTALCUSTO), 0);
  }

  const cacularTotalVenda = () => {
    return dados.reduce((total, dados) => total + parseFloat(dados.TOTALVENDA), 0);
  }

  const colunasColetor = [
    {
      field: 'NUMEROCOLETOR',
      header: 'Coletor',
      body: row => <th>{row.NUMEROCOLETOR}</th>,
      sortable: true
    },
    {
      field: 'NUMITENS',
      header: 'Qtd Itens',
      body: row => <th>{parseFloat(row.NUMITENS)}</th>,
      footer: cacularTotalQtdItens(),
      sortable: true
    },
    {
      field: 'TOTALCUSTO',
      header: 'Total Custo',
      body: row => <th>{formatMoeda(row.TOTALCUSTO)}</th>,
      footer: formatMoeda(cacularTotalCusto()),
      sortable: true
    },
    {
      field: 'TOTALVENDA',
      header: 'Total Venda',
      body: row => <th>{formatMoeda(row.TOTALVENDA)}</th>,
      footer: formatMoeda(cacularTotalVenda()),
      sortable: true
    },
    {
      field: 'STCONSOLIDADO',
      header: 'Opções',
      body: row => {
        if (row.STCONSOLIDADO == 'False') {
          return (
            <div className="p-1">
              <ButtonTable
                titleButton={"Exclusão do Coletor e Produtos Relacionados"}
                cor={"danger"}
                Icon={GrFormView}
                iconSize={18}
                onClickButton={() => handleClickExcluir(row)}
              />
            </div>
          )
        } else {
          return (
            <div>
              <ButtonTable
                titleButton={"Listagem Produtos do Balanço"}
                cor={"primary"}
                iconColor={"#fff"}
                Icon={GrFormView}
                iconSize={18}
                onClickButton={() => handleClickDetalheBalanco(row)}
              />
            </div>
          )

        }
      },

    },

  ]

  const handleEditDetalheBalanco = async (IDRESUMOBALANCO, NUMEROCOLETOR) => {
    
    try {
      const response = await get(`/detalhe-balanco?idResumo=${IDRESUMOBALANCO}&numeroColetor=${NUMEROCOLETOR}`);
      if (response.data) {
        setDetalhesBalanco(response.data)
      
      }
      return response.data;
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickDetalheBalanco = async (row) => {
    if (row.IDRESUMOBALANCO && row.NUMEROCOLETOR) {
      setTabelaDetalhe(true)
      setTabelaColetor(false)
      handleEditDetalheBalanco(row.IDRESUMOBALANCO, row.NUMEROCOLETOR)
    }
  }

  const onGlobalFilterChangeDetalhe = (e) => {
    setGlobalFilterValueDetalhe(e.target.value);
  };

  const handlePrintDetalhe = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Detalhe Resumo Balanço',
  });

  const exportToPDFDetalhe = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID Detalhe', 'Código', 'Produto', 'Cod. Barras', 'Qtd Itens']],
      body: dadosDetalhe.map(item => [
        item.IDDETALHEBALANCO,
        item.IDPRODUTO,
        item.DSNOME,
        item.NUCODBARRAS,
        item.TOTALCONTAGEMGERAL,
        
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('detalhe_balanco.pdf');
  };

  const exportToExcelDetalhe = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosDetalhe);
    const workbook = XLSX.utils.book_new();
    const header = ['ID Detalhe', 'Código', 'Produto', 'Cod. Barras', 'Qtd Itens'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'ID Detalhe' }, 
      { wpx: 100, caption: 'Código' },
      { wpx: 300, caption: 'Produto' },
      { wpx: 100, caption: 'Cod. Barras' },
      { wpx: 50, caption: 'Qtd Itens' },
    ]; 
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detalhe Resumo Balanço');
    XLSX.writeFile(workbook, 'detalhe_balanco.xlsx');
  };

  const dadosDetalhe = detalhesBalanco.map((item) => {
   

    return {
      IDDETALHEBALANCO: item.IDDETALHEBALANCO,
      IDPRODUTO: item.IDPRODUTO,
      DSNOME: item.DSNOME,
      NUCODBARRAS: item.NUCODBARRAS,
      TOTALCONTAGEMGERAL: item.TOTALCONTAGEMGERAL,
      STCONSOLIDADO: item.STCONSOLIDADO,
      IDRESUMOBALANCO: item.IDRESUMOBALANCO,
      NUMEROCOLETOR: item.NUMEROCOLETOR,
    }
  });

  const colunasDetalhe = [
    {
      field: 'IDDETALHEBALANCO',
      header: 'ID Detalhe',
      body: row => row.IDDETALHEBALANCO,
      sortable: true,
    },
    {
      field: 'IDPRODUTO',
      header: 'Código',
      body: row => row.IDPRODUTO,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Produto',
      body: row => row.DSNOME,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Código de Barras',
      body: row => row.NUCODBARRAS,
      sortable: true,
    },
    {
      field: 'TOTALCONTAGEMGERAL',
      header: 'QTD Itens',
      body: row => (
        <div className="card flex justify-content-center" style={{width: 50}}> 
          <input type="number" readOnly={true} value={row.TOTALCONTAGEMGERAL} onValueChange={(e) => console.log(e.value)}   />
          </div>
      ),
      sortable: true,
    },

   
  ]

  const onSubmit = async (IDDETALHEBALANCO, TOTALCONTAGEMGERAL) => {

    const putData = {
      IDDETALHEBALANCO: IDDETALHEBALANCO,
      TOTALCONTAGEMGERAL: TOTALCONTAGEMGERAL,
    }
    const response = await put('/detalhe-balanco/:id', putData)
      .then(response => {
    
      })
    
    const textDados = JSON.stringify(putData)
    let textoFuncao = 'FINANCEIRO/CADASTRO DEPOSITO PELO EXTRATO DE CONTAS';


    const postData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: textoFuncao,
      DADOS: textDados,
      IP: ipUsuario
    }

    const responsePost = await post('/log-web', postData)

    Swal.fire({
      title: 'Atualizado com Sucesso!',
      text: 'Atualizado com Sucesso',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      customClass: {
        container: 'custom-swal', 
      }
    })

    
      .catch(error => {
        Swal.fire({
          title: 'Atualizado com Sucesso!',
          text: 'Atualizado com Sucesso',
          icon: 'success',
          showConfirmButton: false,
          customClass: {
            container: 'custom-swal', 
          }
        })
        console.error('Erro ao Tentar Cadastrar Depósito: ', error);
      })
      return responsePost.data;
  }


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

        {modalResumo && (
          <Fragment>
            <HeaderModal
              title={"Resumo do Balanço"}
              subTitle={"Relação dos Coletores"}
              handleClose={() => { handleClose(), setTabelaDetalhe(false); setTabelaColetor(true) }}
            />
            <Modal.Body>

              {tabelaColetor && (
                <Fragment>
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
                      title="Vendas por Loja"
                      value={dados}
                      globalFilter={globalFilterValue}
                      sortField="VRTOTALPAGO"
                      sortOrder={-1}
                      paginator={true}
                      rows={10}
                      rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
                      showGridlines
                      stripedRows
                      emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                    >
                      {colunasColetor.map(coluna => (
                        <Column
                          key={coluna.field}
                          field={coluna.field}
                          header={coluna.header}

                          body={coluna.body}
                          footer={coluna.footer}
                          sortable={coluna.sortable}
                          headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                          footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                          bodyStyle={{ fontSize: '0.8rem' }}

                        />
                      ))}
                    </DataTable>
                  </div>

                </Fragment>
              )}

              {tabelaDetalhe && (
                 <Fragment>
                 <form onSubmit="">
                 <div className="panel">
                   <div className="panel-hdr">
                     <h2>
                       Detalhe do Balanço Nº {detalhesBalanco[0]?.IDRESUMOBALANCO} - {detalhesBalanco[0]?.NOFANTASIA}
                     </h2>
                   </div>

                   
                   <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                     <HeaderTable
                       globalFilterValue={globalFilterValueDetalhe}
                       onGlobalFilterChange={onGlobalFilterChangeDetalhe}
                       handlePrint={handlePrintDetalhe}
                       exportToExcel={exportToExcelDetalhe}
                       exportToPDF={exportToPDFDetalhe}
                     />

                   </div>
                   <div className="card" ref={dataTableRef}>
                       <DataTable
                         title="Vendas por Loja"
                         value={dadosDetalhe}
                         globalFilter={globalFilterValueDetalhe}
                         size={size}
                         sortOrder={-1}
                         paginator={true}
                         rows={10}
                         rowsPerPageOptions={[10, 20, 50, 100, dadosDetalhe.length]}
                         showGridlines
                         stripedRows           
                         emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                       >
                         {colunasDetalhe.map(coluna => (
                           <Column
                             key={coluna.field}
                             field={coluna.field}
                             header={coluna.header}

                             body={coluna.body}
                             footer={coluna.footer}
                             sortable={coluna.sortable}
                             headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                             footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                             bodyStyle={{ fontSize: '0.8rem' }}

                           />
                         ))}
                       </DataTable>
                   </div>
                    
                 </div>
                 </form>
               </Fragment>
              )}
            </Modal.Body>
          </Fragment>
        )}

        <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            textButtonFechar={"Fechar"}
            onClickButtonFechar={() => { handleClose(), setTabelaDetalhe(false); setTabelaColetor(true) }}
            corFechar="secondary"
          />
      </Modal>
    </Fragment>
  )
}