import { Fragment, useRef, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../../ButtonsTabela/ButtonTable";
import { GrFormView } from "react-icons/gr";
import { formatMoeda } from "../../../../../utils/formatMoeda";
import { toFloat } from "../../../../../utils/toFloat";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import HeaderTable from "../../../../Tables/headerTable";
import { useQuery } from "react-query";
import { get, put } from "../../../../../api/funcRequest";
import Swal from "sweetalert2";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { ActionListaDetalhe } from "./actionListaDetalhe";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const ActionListaBalanco = ({ dadosColetorBalanco }) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tabelaDetalhe, setTabelaDetalhe] = useState(false)
    const [modalResumo, setModalResumo] = useState(true)
    const [dadosDetalhesBalanco, setDadosDetalhesBalanco] = useState([])
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

    const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
        'empresas',
        async () => {
          const response = await get(`/balanco-loja?idEmpresa=${dadosColetorBalanco[0]?.IDEMPRESA}&idResumo=${dadosColetorBalanco[0]?.IDRESUMOBALANCO}&descricaoProduto=${descricao}`);
          return response.data;
        },
        { staleTime: 5 * 60 * 1000 }
    );

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

    return (
        <Fragment>
            {modalResumo && (
                <Fragment>

                    <div className="row">
                        <div className="col-sm-6 col-xl-10">

                            <label className="form-label" htmlFor="">Informe a Descrição ou Código de Barras do Produto, para Pesquisar nos Coletores</label>
                            <div className="input-group">

                                <input
                                    type="text"
                                    className="form-control input"
                                    placeHolder="Pesquisar"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >Pesquisar</button>
                            </div>
                        </div>
                    </div>

                    <div id="panel-1" className="panel" style={{ marginTop: '5rem' }}>
                        <div className="panel-hdr">
                            <h2 >
                                Lista de Balanço por Loja
                            </h2>

                        </div>
                        <div className="panel-container show">

                            <div className="panel-content">
                                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                                    <HeaderTable
                                        globalFilterValue={globalFilterValue}
                                        onGlobalFilterChange={onGlobalFilterChange}
                                        handlePrint={handlePrint}
                                        exportToExcel={exportToExcel}
                                        exportToPDF={exportToPDF}
                                    />

                                </div>
                            </div>
                        </div>


                        <div className="card">

                            <DataTable
                                title="Relação dos coletores"
                                size="small"
                                value={dados}
                                sortOrder={-1}
                                paginator={true}
                                globalFilter={globalFilterValue}
                                rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
                                footerColumnGroup={footerGroup}
                                first={first}
                                rows={rows}
                                onPage={onPageChange}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
                                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
                                filterDisplay="menu"
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
                    </div>
                </Fragment>
            )}

            {tabelaDetalhe && (
                <Fragment>
                    <div className="panel-hdr">
                        <h2>
                            Detalhe do Balanço Nº {dadosDetalhesBalanco[0]?.IDRESUMOBALANCO} - {dadosDetalhesBalanco[0]?.NOFANTASIA}
                        </h2>
                        
                        <button
                            className="btn btn-danger "
                            onClick={() => { setTabelaDetalhe(false); setModalResumo(true) }}
                        >
                            <AiOutlineArrowLeft size={22} />
                            VOLTAR
                        </button>
                    </div>
                    <ActionListaDetalhe 
                        dadosDetalhesBalanco={dadosDetalhesBalanco} 
                        setModalResumo={setModalResumo}
                        setTabelaDetalhe={setTabelaDetalhe}
                    />
                </Fragment>
            )}
        </Fragment>
    )
}