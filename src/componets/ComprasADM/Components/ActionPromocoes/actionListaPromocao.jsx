import { Fragment, useState } from "react"
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { BsTrash3 } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { dataFormatada } from "../../../../utils/dataFormatada";
import { get } from "../../../../api/funcRequest";
import { ActionDetalheProdutoPromocao } from "./actionDetalheProdutoPromocao";
import { ActionDetalheEmpresaPromocao } from "./actionDetalheEmpresaPromocao";
import { FaProductHunt, FaRegBuilding } from "react-icons/fa";


export const ActionListaPromocao = ({ dadosListaPromocao }) => {
  const [dadosListaPromocaoEmpresa, setDadosListaPromocaoEmpresa] = useState([])
  const [modalVisivel, setModalVisivel] = useState(false)
  const [dadosProdutoOrigem, setDadosProdutoOrigem] = useState([])
  const [dadosProdutoDestino, setDadosProdutoDestino] = useState([])
  const [modalDetalhePromocaoVisivel, setModalDetalhePromocaoVisivel] = useState(false)
  
  const dadosPromocao = dadosListaPromocao.map((item, index) => {
    let contador = index + 1;

    return {
      IDRESUMOPROMOCAOMARKETING: item.IDRESUMOPROMOCAOMARKETING,
      DSPROMOCAOMARKETING: item.DSPROMOCAOMARKETING,
      DTHORAINICIOFORMAT2: item.DTHORAINICIOFORMAT2,
      DTHORAFIMFORMAT2: item.DTHORAFIMFORMAT2,
      TPAPLICADOA: item.TPAPLICADOA,
      APARTIRDEQTD: item.APARTIRDEQTD,
      APARTIRDOVLR: item.APARTIRDOVLR,
      TPFATORPROMO: item.TPFATORPROMO,
      FATORPROMOVLR: item.FATORPROMOVLR,
      FATORPROMOPERC: item.FATORPROMOPERC,
      TPAPARTIRDE: item.TPAPARTIRDE,
      VLPRECOPRODUTO: item.VLPRECOPRODUTO,
      contador
    }
  });

  const colunasPromocao = [
    {
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
      width: '5%'
    },
    {
      header: 'Descrição',
      body: row => row.DSPROMOCAOMARKETING,
      sortable: true,
      width: '10%'
    },
    {
      header: 'Data Início',
      body: row => dataFormatada(row.DTHORAINICIOFORMAT2),
      sortable: true,
    },
    {
      header: 'Data Fim',
      body: row => dataFormatada(row.DTHORAFIMFORMAT2),
      sortable: true,
    },
    {
      header: 'TP Aplicação',
      body: row => row.TPAPLICADOA,
      sortable: true,
      width: '15%'
    },
    {
      header: 'QTD Apartir',
      body: row => parseFloat(row.APARTIRDEQTD),
      sortable: true,
    },
    {
      header: 'Vr. Apartir',
      body: row => formatMoeda(row.APARTIRDOVLR),
      sortable: true,
    },
    {
      header: 'Vr. Fator',
      body: row => formatMoeda(row.FATORPROMOVLR),
      sortable: true,
    },
    {
      header: 'Fator %',
      body: row => formatMoeda(row.FATORPROMOPERC),
      sortable: true,
    },
    {
      header: 'TP Apartir',
      body: row => row.TPAPARTIRDE,
      sortable: true,
    },
    {
      header: 'Vr. Produto',
      body: row => formatMoeda(row.VLPRECOPRODUTO),
      sortable: true,
    },
    {
      header: 'Opções',
      width: '10%',
      button: true,    
      body: (row) => (
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Empresas da Promoção"}
              onClickButton={() => handleClickDetalhar(row)}
              Icon={FaRegBuilding}
              iconSize={18}
              iconColor={"#fff"}
              cor={"success"} 

            />
            
          </div>
          <div className="p-1">
            <ButtonTable
              titleButton={"Detalhar Produtos da Promoção"}
              onClickButton={() => handleClickDetalharProduto(row)}
              Icon={FaProductHunt}
              iconSize={18}
              iconColor={"#fff"}
              cor={"info"}
            />

          </div>

        </div>

      ),
    },
    
  ]

  const handleDetalhar = async (IDRESUMOPROMOCAOMARKETING) => {

    try {
      const response = await get(`/listaEmpresaPromocoes?idResumoPromocoes${IDRESUMOPROMOCAOMARKETING}`)
      if (response.data && response.data.length > 0) {
        setDadosListaPromocaoEmpresa(response.data)
    
        setModalVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickDetalhar = (row) => {
    if (row && row.IDRESUMOPROMOCAOMARKETING) {
      handleDetalhar(row.IDRESUMOPROMOCAOMARKETING);
    }
  };

  const handleDetalharProduto = async (IDRESUMOPROMOCAOMARKETING) => {

    try {
      const response = await get(`/listaProdutosOrigemPromocoes?idResumoPromocoes${IDRESUMOPROMOCAOMARKETING}`)
      const response2 = await get(`/listaProdutoDestinoPromocoes?idResumoPromocoes${IDRESUMOPROMOCAOMARKETING}`)
      setDadosProdutoDestino(response2.data)
      if (response.data && response.data.length > 0) {
        setDadosProdutoOrigem(response.data)
        setModalDetalhePromocaoVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickDetalharProduto = (row) => {
    if (row && row.IDRESUMOPROMOCAOMARKETING) {
      handleDetalharProduto(row.IDRESUMOPROMOCAOMARKETING);
    }
  };

  return (
    <Fragment>
      <div className="card">
        <DataTable
          title="Vendas por Loja"
          value={dadosPromocao}
          // header={header}
          sortField="VRTOTALPAGO"
          sortOrder={-1}
          paginator={true}
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          showGridlines
          stripedRows
          emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
        >
          {colunasPromocao.map(coluna => (
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

      <ActionDetalheEmpresaPromocao 
        show={modalVisivel}
        handleClose={() => setModalVisivel(false)}
        dadosListaPromocaoEmpresa={dadosListaPromocaoEmpresa}
        dadosListaPromocao={dadosListaPromocao}
      />

      <ActionDetalheProdutoPromocao 
        show={modalDetalhePromocaoVisivel}
        handleClose={() => setModalDetalhePromocaoVisivel(false)}
        dadosProdutoOrigem={dadosProdutoOrigem}
        dadosProdutoDestino={dadosProdutoDestino}
        dadosListaPromocao={dadosListaPromocao}
      />
    </Fragment>
  )
}