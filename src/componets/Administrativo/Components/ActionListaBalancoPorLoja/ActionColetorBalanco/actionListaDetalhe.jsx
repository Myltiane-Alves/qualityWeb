import { Fragment, useRef, useState } from "react";
import HeaderTable from "../../../../Tables/headerTable";
import { ButtonTable } from "../../../../ButtonsTabela/ButtonTable";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { FaCheck, FaMinus } from "react-icons/fa";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { GrAdd } from "react-icons/gr";
import Swal from "sweetalert2";
import { post, put } from "../../../../../api/funcRequest";
import { useForm } from "react-hook-form";

export const ActionListaDetalhe = ({ dadosDetalhesBalanco, setTabelaDetalhe, setTabelaResumo }) => {
    const { register, handleSubmit, errors } = useForm();
    const [globalFilterValueDetalhe, setGlobalFilterValueDetalhe] = useState('');
    const [quantidade, setQuantidade] = useState(0)
    const dataTableRef = useRef();
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
                if (row.STCONSOLIDADO != 'True') {
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

                                    }}
                                />
                            </div>
                            {row.NUMEROCOLETOR != 100 && (

                                <div >
                                    <ButtonTable
                                        titleButton={"Excluir quantidade"}
                                        cor={"danger"}
                                        Icon={BsTrash3}
                                        iconSize={22}
                                        onClickButton={() => {
                                            onSubmitExcluir(row.IDDETALHEBALANCO, 0);
                                            handleClickResumoBalanco(row)
                                        }}
                                    />
                                </div>
                            )}

                        </div>

                    )

                }
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
                title: 'Erro ao Alterar',
                icon: 'success',
                showConfirmButton: false,
                customClass: {
                    container: 'custom-swal',
                }
            })
            return responsePost.data;
        }
    }
    const onSubmitExcluir = async (IDDETALHEBALANCO, TOTALCONTAGEMGERAL) => {

        const putData = {
            IDDETALHEBALANCO: IDDETALHEBALANCO,
            TOTALCONTAGEMGERAL: 0,
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
                title: 'Erro ao Alterar',
                icon: 'success',
                showConfirmButton: false,
                customClass: {
                    container: 'custom-swal',
                }
            })
            return responsePost.data;
        }
    }

    return (
        <Fragment>
            <form onSubmit={''}>
                <div className="panel mt-4">

                    <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
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
                            size="small"
                            // sortOrder={-1}
                            paginator={true}
                            rows={10}
                            rowsPerPageOptions={[10, 20, 50, 100, dadosDetalhe.length]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
                            filterDisplay="menu"
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
    )
}