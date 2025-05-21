import { Fragment, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
// import './styles.css';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { BsTrash3 } from "react-icons/bs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import HeaderTable from "../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { ActionImprimirEtiquetaModal } from "./actionImprimirEtiquetaModal";
import Swal from "sweetalert2";
import { MdOutlineLocalPrintshop } from "react-icons/md";
export const ActionDetalharProdutosEtiquetaModal = ({ show, handleClose, produtosSelecionados }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [imprimirProduto, setImprimirProduto] = useState(false)
  const [tabelaVisivel, setTabelaVisivel] = useState(true)
  const [dadosAcumuladorEtiquetas, setDadosAcumuladorEtiquetas] = useState([]);
  const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);

  const dataTableRef = useRef();
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: "Lista de Etiquetas",
  });

   const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'Cod Barras', 'Descrição', 'Tamanho', 'QTD', 'Preço', 'Lista Preço', 'Estilo', 'Marca']],
      body: dados.map(item => [
        item.contador,
        item.NUCODBARRAS,
        item.DSNOME,
        item.TAMANHO,
        item.quantidade,
        formatMoeda(item.PRECOVENDA),
        item.DSLISTAPRECO,
        item.DSESTILO,
        item.MARCA
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('lista_produtos_selecionado.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'Cod Barras', 'Descrição', 'Tamanho', 'QTD', 'Preço', 'Lista Preço', 'Estilo', 'Marca'];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 100, caption: 'Cod Barras'},
      { wpx: 100, caption: 'Descrição' },
      { wpx: 200, caption: 'Tamanho' },
      { wpx: 100, caption: 'QTD' },
      { wpx: 100, caption: 'Preço' },
      { wpx: 200, caption: 'Lista Preço' },
      { wpx: 200, caption: 'Estilo' },
      { wpx: 100, caption: 'Marca' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Produtos');
    XLSX.writeFile(workbook, 'lista_produtos_selecionado.xlsx');
  };

  const produtosSalvos = JSON.parse(localStorage.getItem("produtosSelecionados"));

  const dados = Array.isArray(produtosSelecionados) ? produtosSelecionados.map((item, index) => {
    return {

      contador: index + 1,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      TAMANHO: item.TAMANHO,
      quantidade: item.quantidade,
      PRECOVENDA: item.PRECOVENDA,
      DSESTILO: item.DSESTILO,
      DSLISTAPRECO: item.DSLISTAPRECO,
      MARCA: item.MARCA,
      IDPRODUTO: item.IDPRODUTO,
    }
  }): [];


  const colunasListaProdEtiquetas = [
    {
      field: "contador",
      header: "Nº",
      body: (row) => <th>{row.contador}</th>,
      sortable: true,
    },
    {
      field: "NUCODBARRAS",
      header: "Cód. Barras",
      body: (row) => <th>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: "DSNOME",
      header: "Descrição",
      body: (row) => <p style={{ width: '300px', fontWeight: 600, margin: '0px' }}>{row.DSNOME}</p>,
      sortable: true,
    },
    {
      field: "TAMANHO",
      header: "Tamanho",
      body: (row) => <th>{row.TAMANHO}</th>,
      sortable: true,
    },
    {
      field: "quantidade",
      header: "QTD",
      body: (row) => <th>{row.quantidade}</th>,
      sortable: true,
    },
    {
      field: "PRECOVENDA",
      header: "Preço",
      body: (row) => <th>{formatMoeda(row.PRECOVENDA)}</th>,
      sortable: true,
    },
    {
      field: "DSLISTAPRECO",
      header: "Lista Preço",
      body: (row) => <p style={{ width: '150px', fontWeight: 600, margin: '0px'  }}>{row.DSLISTAPRECO}</p>,
      sortable: true,
    },
    {
      field: "DSESTILO",
      header: "Estilo",
      body: (row) => <p style={{ width: '200px',fontWeight: 600, margin: '0px'  }}>{row.DSESTILO}</p>,
      sortable: true,
    },
    {
      field: 'MARCA',
      header: 'Marca',
      body: row => <span style={{ fontWeight: 600, margin: '0px'  }}>{row.MARCA}</span>,
      sortable: true
    },
    {
      field: "rowIndex",
      header: "Excluir",
      body: (row) => (
        <ButtonTable
          titleButton="Excluir"
          onClickButton={() => handleExcluirEtiqueta(row.idEtiqueta)}
          Icon={BsTrash3}
          iconSize={20}
          iconColor="#fff"
          cor="danger"
        />
      ),
      sortable: true,
    },
  ];

  const handleAcumuladorEtiquetas = async () => {
    if (parseFloat(quantidadeEtiquetas) > 0) {
      try {
        const novasEtiquetas = produtosSelecionados.flatMap((produto) => 
          Array.from({ length: produto.quantidade }, () => ({
            quantidade: produto.quantidade,
            NUCODBARRAS: produto.NUCODBARRAS,
            DSNOME: produto.DSNOME,
            TAMANHO: produto.TAMANHO,
            PRECOVENDA: produto.PRECOVENDA,
            DSESTILO: produto.DSESTILO,
            DSLISTAPRECO: produto.DSLISTAPRECO,
            IDPRODUTO: produto.IDPRODUTO,
            MARCA: produto.MARCA,
          }))
        );
  
        setDadosAcumuladorEtiquetas(novasEtiquetas);
        setImprimirProduto(true);
        setTabelaVisivel(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Valor Inválido",
          text: "O valor deve ser maior que 0 para imprimir etiquetas!",
        });
      }
    }
  };
  

  const handleFecharModal = () => {
    handleClose();
    setTabelaVisivel(true)
    setImprimirProduto(false)
  }

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleFecharModal}
        size="xl"
        className="modal fade"
        role="dialog"
      >
        <HeaderModal
          title={"Etiquetas"}
          subTitle={"Etiquetas"}
          handleClose={handleFecharModal}
        />
        <Modal.Body>
          {tabelaVisivel && 
            <Fragment>

              <div className="panel">
                <div className="panel-hdr">
                  <h2>LISTA DE PRODUTOS PARA IMPRIMIR</h2>
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
                    value={dados}
                    globalFilterValue={globalFilterValue}
                    size="small"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
                    showGridlines
                    stripedRows
                    emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                  >
                    {colunasListaProdEtiquetas.map((coluna) => (
                      <Column
                        key={coluna.field}
                        field={coluna.field}
                        header={coluna.header}
                        body={coluna.body}
                        sortable={coluna.sortable}
                        headerStyle={{
                          color: "white",
                          backgroundColor: "#7a59ad",
                          border: "1px solid #e9e9e9",
                          fontSize: "1rem",
                        }}
                        bodyStyle={{ fontSize: "1rem" }}
                      />
                    ))}
                  </DataTable>
                </div>
              </div>
                <FooterModal
                  ButtonTypeCadastrar={ButtonTypeModal}
                  textButtonCadastrar={"Imprimir Etiqueta"}
                  onClickButtonCadastrar={handleAcumuladorEtiquetas}
                  corCadastrar={"primary"}
                  iconCadastrar={MdOutlineLocalPrintshop}
                  iconSizeCadastrar={20}
    
                  ButtonTypeFechar={ButtonTypeModal}
                  textButtonFechar={"Fechar"}
                  onClickButtonFechar={handleFecharModal}
                  corFechar="secondary"
                />
            </Fragment>
          }


          {imprimirProduto && 
                
            <ActionImprimirEtiquetaModal 
              setTabelaVisivel={setTabelaVisivel}
              dadosAcumuladorEtiquetas={dadosAcumuladorEtiquetas} 
              produtosSelecionados={produtosSelecionados}
            />
          }
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
