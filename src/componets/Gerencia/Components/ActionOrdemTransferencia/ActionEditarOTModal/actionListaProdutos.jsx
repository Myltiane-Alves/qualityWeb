import { useRef, useState } from "react";
import { FaMinus, FaRegTrashAlt } from "react-icons/fa";
import { ButtonTable } from "../../../../ButtonsTabela/ButtonTable";
import HeaderTable from "../../../../Tables/headerTable"
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../../utils/formatMoeda";

export const ActionListaProdutos = ({dadosProdutos}) => {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const dataTableRef = useRef();

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const handlePrint = useReactToPrint({
        content: () => dataTableRef.current,
        documentTitle: 'Controle de Transferência',
    });

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dados);
        const workbook = XLSX.utils.book_new();
        const header = ['Produto', 'Cód. Barras', 'Descrição', 'R$ Venda', 'QTD'];
        worksheet['!cols'] = [
            { wpx: 100, caption: 'Produto' },
            { wpx: 100, caption: 'Cód. Barras' },
            { wpx: 100, caption: 'Descrição' },
            { wpx: 100, caption: 'R$ Venda' },
            { wpx: 100, caption: 'QTD' },
        ];
        XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Controle de Transferência');
        XLSX.writeFile(workbook, 'controle_transferencia.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Produto', 'Cód. Barras', 'Descrição', 'R$ Venda', 'QTD']],
            body: dados.map(item => [
                item.IDPRODUTO,
                item.NUCODBARRAS,
                item.DSNOME,
                item.VLRUNITVENDA,
                item.QTDEXPEDICAO,
            ]),
            horizontalPageBreak: true,
            horizontalPageBreakBehaviour: 'immediately'
        });
        doc.save('controle_transferencia.pdf');
    };


    const [dados, setDados] = useState(dadosProdutos.map((item, index) => {
        let contador = index + 1;
        let quantidade = 1;
        return {
            IDRESUMOOT: item.IDRESUMOOT,
            IDPRODUTO: item.IDPRODUTO,
            IDEMPRESAORIGEM: item.IDEMPRESAORIGEM,
            NUCODBARRAS: item.NUCODBARRAS,
            DSNOME: item.DSNOME,
            PRECOVENDA: item.PRECOVENDA,
            PRECOCUSTO: item.PRECOCUSTO,
            QTDEXPEDICAO: parseInt(item.QTDEXPEDICAO),
            QTDRECEPCAO: parseInt(item.QTDRECEPCAO),
            QTDDIFERENCA: parseInt(item.QTDDIFERENCA),
            QTDAJUSTE: parseInt(item.QTDAJUSTE),
            IDEMPRESADESTINO: item.IDEMPRESADESTINO,
            QTDCONFERENCIA: parseInt(item.QTDCONFERENCIA),
            IDSTATUSOT: parseInt(item.IDSTATUSOT),
            quantidade,
            contador
        }
    }))
    
    const colunasDetalheTransferencia = [
        {
            field: 'IDPRODUTO',
            header: 'Produto',
            body: row => <th>{row.IDPRODUTO}</th>,
            sortable: true,
        },
        {
            field: 'NUCODBARRAS',
            header: 'Cód. Barras',
            body: row => <th>{row.NUCODBARRAS}</th>,
            sortable: true,
        },
        {
            field: 'DSNOME',
            header: 'Descrição',
            body: row => <th>{row.DSNOME}</th>,
            sortable: true,
        },
        {
            field: 'PRECOVENDA',
            header: 'R$ Venda',
            body: row => <th>{formatMoeda(row.PRECOVENDA)}</th>,
            sortable: true,
        },
        {
            field: 'quantidade',
            header: 'QTD',
            body: row => <th>{row.quantidade}</th>,
            sortable: true,
        },
        {
            field: 'IDSTATUSOT',
            header: 'Opções',
            button: true,
            body: (row) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <div className="mr-2">

                            <ButtonTable
                                titleButton={"Diminuir Quantidade"}
                                onClickButton={() => handleDiminuirQuantidade(row)}
                                Icon={FaMinus}
                                iconSize={16}
                                iconColor={"#fff"}
                                cor={"info"}
            
                            />
                        </div>

                        <div>

                            <ButtonTable
                                titleButton={"Excluir Produto"}
                                onClickButton={() => handleExcluirProduto(row)}
                                Icon={FaRegTrashAlt}
                                iconSize={16}
                                iconColor={"#fff"}
                                cor={"danger"}
                    
                            />
                        </div>
                    </div>

                )
            }
        }
    ]

    const handleDiminuirQuantidade = (row) => {
        setDados((prevDados) =>
            prevDados.map((item) => {
                if (item.IDPRODUTO === row.IDPRODUTO) {
                    return { ...item, quantidade: Math.max(item.quantidade - 1, 0) }; // Não permitir quantidade negativa
                }
                return item;
            })
        );
    };

  
    const handleExcluirProduto = (row) => {
        setDados((prevDados) =>
            prevDados.filter((item) => item.IDPRODUTO !== row.IDPRODUTO)
        );
    };

    return (
        <div className="panel mt-4">
            <div className="panel-hdr">
                <h2>
                    Lista de Ordem de Transferência
                </h2>
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
                    title="Vendas por Loja"
                    value={dados}
                    sortField="VRTOTALPAGO"
                    sortOrder={-1}
                    paginator={true}
                    rows={10}
                    showGridlines
                    stripedRows
                    emptyMessage="Sem Registros para Exibir"
                >
                    {colunasDetalheTransferencia.map(coluna => (
                        <Column
                            key={coluna.field}
                            field={coluna.field}
                            header={coluna.header}

                            body={coluna.body}
                            footer={coluna.footer}
                            sortable={coluna.sortable}
                            headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                            footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                            bodyStyle={{ fontSize: '0.8rem' }}

                        />
                    ))}
                </DataTable>
            </div>
        </div>
    )
}