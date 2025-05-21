import { Fragment, useEffect, useRef, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../../Modais/HeaderModal/HeaderModal";
import { useForm } from "react-hook-form";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../../../utils/formatMoeda";
import Swal from "sweetalert2";
import { get, put } from "../../../../../api/funcRequest";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { toFloat } from "../../../../../utils/toFloat";
import HeaderTable from "../../../../Tables/headerTable";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { useQuery } from "react-query";
import { GrAdd, GrFormView } from "react-icons/gr"
import { InputNumber } from 'primereact/inputnumber';
import { FaCheck, FaMinus } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FooterModal } from "../../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal";
import { ActionListaBalanco } from "./actionListaBalanco";
import { ActionListaDetalhe } from "./actionListaDetalhe";

export const ActionColetorBalancoModal = ({ show, handleClose, dadosColetorBalanco }) => {
  const { register, handleSubmit, errors } = useForm();
  const [modalResumo, setModalResumo] = useState(true)
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [globalFilterValueDetalhe, setGlobalFilterValueDetalhe] = useState('');
  const [dadosDetalhesBalanco, setDadosDetalhesBalanco] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [tabelaDetalhe, setTabelaDetalhe] = useState(false);
  const [tabelaColetor, setTabelaColetor] = useState(true);
  const [quantidade, setQuantidade] = useState(0);
  const dataTableRef = useRef();

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
      body: dadosColetorModal.map(item => [

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
    const worksheet = XLSX.utils.json_to_sheet(dadosColetorModal);
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


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  }

  const dados = dadosColetorBalanco.map((item, index) => {

    return {
      IDEMPRESA: item.IDEMPRESA,
      IDRESUMOBALANCO: item.IDRESUMOBALANCO,
      NUMEROCOLETOR: item.NUMEROCOLETOR,
      DSCOLETOR: item.DSCOLETOR,
      NUMITENS: item.NUMITENS,
      TOTALCUSTO: item.TOTALCUSTO,
      TOTALVENDA: item.TOTALVENDA,
      STCONSOLIDADO: item.STCONSOLIDADO,
      DSCOLETOR: item.DSCOLETOR,
    }
  })
  const calcularTotalPagina = (field) => {
    return dados.reduce((total, item) => total + parseFloat(item[field]), 0);
  };

  const calcularTotal = (field) => {
    const firstIndex = first * rows;
    const lastIndex = firstIndex + rows;
    const dataPaginada = dados.slice(firstIndex, lastIndex);
    return dataPaginada.reduce((total, item) => total + toFloat(item[field] || 0), 0);
  };

  const cacularTotalQtdItens = () => {
    const totalDinheiro = calcularTotal('NUMITENS');
    const totalVendas = calcularTotalPagina('NUMITENS');
    return `${totalDinheiro}   (${totalVendas} total)`;
  };

  const cacularTotalCusto = () => {
    const totalDinheiro = calcularTotal('TOTALCUSTO');
    const totalVendas = calcularTotalPagina('TOTALCUSTO');
    return `${formatMoeda(totalDinheiro)}   (${formatMoeda(totalVendas)} total)`;
  };

  const cacularTotalVenda = () => {
    const totalDinheiro = calcularTotal('TOTALVENDA');
    const totalVendas = calcularTotalPagina('TOTALVENDA');
    return `${formatMoeda(totalDinheiro)}   (${formatMoeda(totalVendas)} total)`;
  };


  const colunasColetor = [
    {
      field: 'DSCOLETOR',
      header: 'Coletor',
      body: row => <th>{row.NUMEROCOLETOR} {row.DSCOLETOR} </th>,
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
      body: row => <p>{formatMoeda(row.TOTALCUSTO)}</p>,
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
                onClickButton={() => handleClickResumoBalanco(row)}
              />
            </div>
          )

        }
      },
    },
  ]



  const handleEditPreviaBalanco = async (IDRESUMOBALANCO) => {
    if (usuarioLogado && usuarioLogado.IDEMPRESA) {
      try {
        const response = await get(`/novoPreviaBalanco?idResumo=${IDRESUMOBALANCO}&idEmpresa=${usuarioLogado.IDEMPRESA}`)
        if (response.data) {
          setDadosPreviaBalancoModal(response.data)
        }
      } catch (error) {
        console.log(error, "não foi possivel pegar os dados da tabela ")
      }
    }

  }

  const handleClickExcluir = async (row) => {

    const data = {
      IDRESUMOBALANCO: row.IDRESUMOBALANCO,
      NUMEROCOLETOR: row.NUMEROCOLETOR
    }

    try {

      Swal.fire({

        title: 'Deseja excluir o Coletor?',
        text: 'Caso exclua, será necessário subir novamente pelo PDV!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Excluido!',
            'O coletor foi excluido com sucesso.',
            'success'
          )
          const response = put(`/excluirColetorBalanco`, data)
          return response;
        }
      })
      handleClose()

    } catch (error) {
      console.log(error, "não foi possivel excluir o coletor ")
    }


  }


  const footerGroup = (
    <ColumnGroup>

      <Row>
        <Column footer="Total " colSpan={1} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem', textAlign: 'center' }} />
        <Column footer={cacularTotalQtdItens()} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={cacularTotalCusto()} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={cacularTotalVenda()} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={''} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />

      </Row>
    </ColumnGroup>
  )


  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
    'empresas',
    async () => {
      const response = await get(`/balanco-loja?idEmpresa=${dadosColetorBalanco[0]?.IDEMPRESA}&idResumo=${dadosColetorBalanco[0]?.IDRESUMOBALANCO}&descricaoProduto=${descricao}`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const handleEditResumoBalanco = async (IDRESUMOBALANCO, NUMEROCOLETOR) => {

    try {
      const response = await get(`/detalhe-balanco?idResumo=${IDRESUMOBALANCO}&numeroColetor=${NUMEROCOLETOR}`);
      if (response.data) {
        setDadosDetalhesBalanco(response.data)
      }
      return response.data;
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const handleClickResumoBalanco = async (row) => {
    if (row.IDRESUMOBALANCO && row.NUMEROCOLETOR) {
      setTabelaDetalhe(true)
      setModalResumo(false)
      handleEditResumoBalanco(row.IDRESUMOBALANCO, row.NUMEROCOLETOR)
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
    doc.save('coletor_balanco.pdf');
  };

  const exportToExcelDetalhe = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosDetalhe);
    const workbook = XLSX.utils.book_new();
    const header = ['ID Detalhe', 'Código', 'Produto', 'Cod. Barras', 'Qtd Itens'];
    worksheet['!cols'] = [
      { wpx: 150, caption: 'ID Detalhe' },
      { wpx: 100, caption: 'Código' },
      { wpx: 200, caption: 'Produto' },
      { wpx: 100, caption: 'Cod. Barras' },
      { wpx: 100, caption: 'Qtd Itens' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detalhe Resumo Balanço');
    XLSX.writeFile(workbook, 'detalhe_balanco.xlsx');
  };

  const dadosDetalhe = dadosDetalhesBalanco.map((item) => {


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
      body: row => <th style={{ fontSize: '18px' }}>{row.IDDETALHEBALANCO}</th>,
      sortable: true,
    },
    {
      field: 'IDPRODUTO',
      header: 'Código',
      body: row => <th style={{ fontSize: '18px' }}>{row.IDPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Produto',
      body: row => <th style={{ fontSize: '18px' }}>{row.DSNOME}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Código de Barras',
      body: row => <th style={{ fontSize: '18px' }}>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'TOTALCONTAGEMGERAL',
      header: 'QTD Itens',
      body: row => (
        <div className=""
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            

          }}>
          <InputNumber
            inputId="horizontal-buttons"
            buttonLayout="vertical"
            style={{ width: '3rem', color: 'green', fontSize: '16px' }}
            decrementButtonClassName=""
            incrementButtonClassName=""
            incrementButtonIcon={GrAdd}
            decrementButtonIcon={FaMinus}
            value={row.TOTALCONTAGEMGERAL}
            onValueChange={(e) => setQuantidade(e.value)}
            showButtons
          />
        </div>
      ),
      sortable: true,
    },

    {
      field: 'IDRESUMOBALANCO',
      header: 'Opções',
      body: row => {
        const itemQuantidade = quantidade
        return (
          <div className=""
            style={{ justifyContent: "space-between", display: "flex" }}
          >

            <div >
              <ButtonTable
                titleButton={"Alterar Quantidade"}
                cor={"success"}
                Icon={FaCheck}
                iconSize={22}
                onClickButton={() => {
                  onSubmit(row.IDDETALHEBALANCO, itemQuantidade)
                  handleClickResumoBalanco(row)
                }}
              />
            </div>
            <div >
              <ButtonTable
                titleButton={"Excluir quantidade"}
                cor={"danger"}
                Icon={BsTrash3}
                iconSize={22}
                onClickButton={() => {
                  onSubmit(row.IDDETALHEBALANCO, 0);
                  handleClickResumoBalanco(row)
                }}
              />
            </div>

          </div>

        )
      },
      sortable: true,
    },
  ]

  const onSubmit = async (IDDETALHEBALANCO, TOTALCONTAGEMGERAL) => {

    const putData = {
      IDDETALHEBALANCO: IDDETALHEBALANCO,
      TOTALCONTAGEMGERAL: TOTALCONTAGEMGERAL,
    }

    try {
      const response = await put('/detalhe-balanco/:id', putData)

      const textDados = JSON.stringify(putData)
      let textoFuncao = 'ADMNISTRATIVO/ALTERAR QUANTIDADE DE PRODUTO NO BALANÇO';


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

      return responsePost.data;
    } catch (error) {
      let textoFuncao = 'ADMNISTRATIVO/ERRO AO ALTERAR QUANTIDADE DE PRODUTO NO BALANÇO';


      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: 'ERRO AO ALTERAR QUANTIDADE DE PRODUTO NO BALANÇO',
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', postData)
      Swal.fire({
        title: 'Atualizado com Sucesso!',
        text: 'Atualizado com Sucesso',
        icon: 'success',
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal',
        }
      })
      return responsePost.data;
    }
  }

  const handleCloseWrapper = () => {
    setModalResumo(true);
    setTabelaDetalhe(false);
    if (handleClose) {
      handleClose();
    }
  };

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

        <HeaderModal
          title={"Resumo do Balanço"}
          subTitle={"Relação dos Coletores"}
          handleClose={() => { handleClose(), setTabelaDetalhe(false); setModalResumo(true) }}
        />
        <Modal.Body>
          
          <ActionListaBalanco dadosColetorBalanco={dadosColetorBalanco} />
           
        </Modal.Body>
        <FooterModal
          ButtonTypeFechar={ButtonTypeModal}
          textButtonFechar={"Fechar"}
          onClickButtonFechar={handleCloseWrapper}
          corFechar={"secondary"}
        />
      </Modal>
    </Fragment>
  )
}