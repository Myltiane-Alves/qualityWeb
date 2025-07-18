import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../Actions/actionMain";
import { InputField } from "../../Buttons/Input";
import { ButtonType } from "../../Buttons/ButtonType";
import { AiFillBackward, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../utils/animationCarregamento";
import { ActionListaPromocoesAtivas } from "./actionListaPromocaoAtivas";
import { getDataAtual } from "../../../utils/dataAtual";
import { get } from "../../../api/funcRequest";
import { ActionPesquisaPromocao } from "../ActionPromocao/actionPesquisaPromocao";
import { InputSelectAction } from "../../Inputs/InputSelectAction";
import { ActionEditarPromocaoAtiva } from "./actionEditarPromocaoAtiva";
import { ButtonTable } from "../../ButtonsTabela/ButtonTable";
import { CiEdit } from "react-icons/ci";
import { formatMoeda } from "../../../utils/formatMoeda";
import { dataFormatada, dataHoraFormatada } from "../../../utils/dataFormatada";
import { useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../Tables/headerTable";


export const ActionPesquisaPromocoesAtivas = ({usuarioLogado, ID}) => {
  const [tabelaCampanha, setTabelaCampanha] = useState(true);
  const [actionPromocaoAtiva, setActionPromocaoAtiva] = useState(true);
  const [actionCadastrarPromocao, setActionCadastrarPromocao] = useState(false);
  const [tabelaProduto, setTabelaProduto] = useState(false);
  const [isQueryData, setIsQueryData] = useState(false)
  const [statusSelecionado, setstatusSelecionado] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [editingRows, setEditingRows] = useState({});
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(true);
  const [dadosPromocao, setDadosPromocao] = useState([]);
  const dataTableRef = useRef();
  
  
    const onGlobalFilterChange = (e) => {
      setGlobalFilterValue(e.target.value);
    };
  
    const handlePrint = useReactToPrint({
      content: () => dataTableRef.current,
      documentTitle: 'Promoções Ativas',
    });
  
    const exportToPDF = () => {
      const doc = new jsPDF();
      doc.autoTable({
        head: [['ID', , 'Descrição', 'Vr Preço Produto', 'Data Início', 'Data Fim']],
        body: dados.map(item => [
          item.IDRESUMOPROMOCAOMARKETING,
          item.DSPROMOCAOMARKETING,
          formatMoeda(item.VLPRECOPRODUTO),
          dataHoraFormatada(item.DTHORAINICIO),
          dataHoraFormatada(item.DTHORAFIM),
        ]),
        horizontalPageBreak: true,
        horizontalPageBreakBehaviour: 'immediately'
      });
      doc.save('promocoes_ativas.pdf');
    };
  
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(dados);
      const workbook = XLSX.utils.book_new();
      const header = ['ID', 'Descrição', 'Vr Preço Produto', 'Data Início', 'Data Fim'];
      worksheet['!cols'] = [
        { wpx: 100, caption: 'ID Produto' },
        { wpx: 200, caption: 'Descrição' },
        { wpx: 100, caption: 'Vr Preço Produto' },
        { wpx: 100, caption: 'Data Início' },
        { wpx: 100, caption: 'Data Fim' },
      ];
      XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Promoções Ativas');
      XLSX.writeFile(workbook, 'promocoes_ativas.xlsx');
    };
  
  
  
   

  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataInicio(dataAtual)
    setDataFim(dataAtual)
  }, [])


  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);
      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
  );

  const fetchListaProdutosPromocao = async () => {
    try {
      const urlApi = `/promocoes-ativas?dataPesquisaInicio=${dataInicio}&dataPesquisaFim=${dataFim}&status=${statusSelecionado}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.page}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.data.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(currentPage);
            } else {
              return allData;
            }
          } catch (error) {
            console.error('Erro ao buscar próxima página:', error);
            throw error;
          }
        }
  
        await fetchNextPage(currentPage);
        return allData;
      } else {
       
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosListaPromocao = [], error: errorFuncionario, isLoading: isLoadingFuncionario, refetch: refetchListaProdutos } = useQuery(
    ['promocoes-ativas'],
    () => fetchListaProdutosPromocao(dataInicio, dataFim, currentPage, pageSize),
    {
      enabled: Boolean(isQueryData), staleTime: 5 * 60 * 1000, 
    }
  );
  
   const dados = dadosListaPromocao?.map((item, index) => {
      let contador = index + 1;
      return {
        contador,
        IDRESUMOPROMOCAOMARKETING: item.IDRESUMOPROMOCAOMARKETING,
        DSPROMOCAOMARKETING: item.DSPROMOCAOMARKETING,
        DTHORAINICIO: item.DTHORAINICIO,
        DTHORAFIM: item.DTHORAFIM,
        TPAPLICADOA: item.TPAPLICADOA,
        APARTIRDEQTD: item.APARTIRDEQTD,
        APARTIRDOVLR: item.APARTIRDOVLR,
        TPFATORPROMO: item.TPFATORPROMO,
        FATORPROMOVLR: item.FATORPROMOVLR,
        FATORPROMOPERC: item.FATORPROMOPERC,
        TPAPARTIRDE: item.TPAPARTIRDE,
        VLPRECOPRODUTO: formatMoeda(item.VLPRECOPRODUTO),
        STEMPRESAPROMO: item.STEMPRESAPROMO,
        STDETPROMOORIGEM: item.STDETPROMOORIGEM,
        STDETPROMODESTINO: item.STDETPROMODESTINO,
        STATIVO: item.STATIVO === 'True' ? 'ATIVO' : 'INATIVO',
      }
    });
  
    const colunasListaPromocao = [
      {
        field: 'IDRESUMOPROMOCAOMARKETING',
        header: 'ID',
        body: row => <th>{row.IDRESUMOPROMOCAOMARKETING}</th>,
        style: { width: '10%' },
        sortable: true,
      },
      {
        field: 'DSPROMOCAOMARKETING',
        header: 'Descrição',
        body: row => <th>{row.DSPROMOCAOMARKETING}</th>,
        style: { width: '30%' },
        sortable: true,
      },
    
      {
        field: 'DTHORAINICIO',
        header: 'Data Início',
        body: row => <th>{row.DTHORAINICIO}</th>,
        style: { width: '20%' },
        sortable: true,
      },
      {
        field: 'DTHORAFIM',
        header: 'Data Fim',
        body: row => <th>{row.DTHORAFIM}</th>,
        style: { width: '20%' },
        sortable: true,
      },
      {
        field: 'STATIVO',
        header: 'Status',
        body: row => <th >{row.STATIVO}</th>,
        style: { width: '10%' },
        bodyStyle: { textAlign: 'center' },
        sortable: true,
      },
      {
        field: 'TPAPARTIRDE',
        header: 'Tipo Aplicação',
        body: row => <th>{row.TPAPARTIRDE}</th>,
        style: { width: '20%' },
        sortable: true,
      },
      {
        field: 'IDRESUMOPROMOCAOMARKETING',
        header: 'Opções',
        width: "15%",
        body: row => {
  
          return (
            <div >
              <ButtonTable
                titleButton={"Editar "}
                onClickButton={() => handleEdit(row)}
                Icon={CiEdit}
                iconSize={25}
                width="35px"
                height="35px"
                iconColor={"#fff"}
                cor={"info"}
  
              />
            </div>
          )
        },
        sortable: true,
      },
    ]
  
  
  const handleEdit = async (row) => {
    try {
      const response = await get(`/promocoes-ativas?idResumoPromocao=${row.IDRESUMOPROMOCAOMARKETING}`);
      if (response.data && response.data.length > 0) {
        setDadosPromocao(response.data);
        setModalVisivel(true);
        setActionPromocaoAtiva(false);
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }

  }

  const handleClickIncluir = () => {
    setActionPromocaoAtiva(true)
    setModalVisivel(false)
  }
  const handleClickProduto = () => {
    setIsQueryData(true)
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaProdutos() 
    setTabelaCampanha(true)    
  }

  const options = [
    {value: 'True', label: 'Ativa'},
    {value: 'False', label: 'Inativa'},
  ]
  return (

    <Fragment>

      {actionPromocaoAtiva && (
        <>
        <ActionMain
          linkComponentAnterior={["Home"]}
          linkComponent={["Promoções Ativas"]}
          title="Lista de Promoções Ativas"
          
          InputFieldDTInicioAComponent={InputField}
          labelInputDTInicioA={"Data Início"}  
          valueInputFieldDTInicioA={dataInicio}
          onChangeInputFieldDTInicioA={(e) => setDataInicio(e.target.value)}
          
          InputFieldDTFimAComponent={InputField}
          labelInputDTFimA={"Data Fim"}
          valueInputFieldDTFimA={dataFim}
          onChangeInputFieldDTFimA={(e) => setDataFim(e.target.value)}
          
          InputSelectEmpresaComponent={InputSelectAction}
          onChangeSelectEmpresa={(e) => setstatusSelecionado(e.value)}
          valueSelectEmpresa={statusSelecionado}
          optionsEmpresas={[
            ...options.map((item) => ({
              value: item.value,
              label: item.label,
            }))
          ]}
          labelSelectEmpresa={"Status da Promoção"}

          ButtonSearchComponent={ButtonType}
          linkNomeSearch={"Pesquisar"}
          onButtonClickSearch={handleClickProduto}
          corSearch={"primary"}
          IconSearch={AiOutlineSearch}
    
          
          />


       
          {/* <div className="card">
            <ActionListaPromocoesAtivas 
              dadosListaPromocao={dadosListaPromocao} 
              optionsModulos={optionsModulos}
              usuarioLogado={usuarioLogado}
              actionPromocaoAtiva={actionPromocaoAtiva}
              setActionPromocaoAtiva={setActionPromocaoAtiva}
            />
          </div> */}
        
          <div className="panel">
            <div className="panel-hdr mb-4">
              <h2>Lista de Promoções</h2>

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
                title="Lista de Promoções"
                value={dados}
                size="small"
                dataKey="IDRESUMOPROMOCAOMARKETING"
                globalFilter={globalFilterValue}
                sortOrder={-1}
                paginator={true}
                rows={dados.length}
                rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
                filterDisplay="menu"
                showGridlines
                stripedRows
                emptyMessage={
                  <div className="dataTables_empty">Nenhum resultado encontrado</div>
                }
              >
                {colunasListaPromocao.map((coluna, index) => (
                  <Column
                    key={index}
                    {...coluna}
                    // key={coluna.field || 'selection'}
                    // field={coluna.field}
                    // header={coluna.header}
                    // // selectionMode={coluna.selectionMode}
                    // body={coluna.body}
                    // footer={coluna.footer}
                    // sortable={coluna.sortable}
                    headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '1rem' }}
                    footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '1rem' }}
                    bodyStyle={{ fontSize: '1rem', border: '1px solid #e9e9e9' }}
                  />

                ))}

              </DataTable>
            </div>
          </div>
        </>
      )}

      {modalVisivel && (

        <ActionEditarPromocaoAtiva
          modalVisivel={modalVisivel}
          setModalVisivel={setModalVisivel}
          dadosPromocao={dadosPromocao}
          handleClickIncluir={handleClickIncluir}
        />
      )}
    </Fragment >
  )
}