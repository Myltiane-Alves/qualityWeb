import { Fragment, useEffect, useState } from "react"
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const AdministrativoActionEstoqueRotatividade = () => {
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  
  useEffect(() => {
    getTabelas()
  },[])


  const getTabelas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allTabelas")
      if(response.data) {
        setDadosExemplos(response.data)
        console.log(response.data, 'get tabelas')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
    
  }

  const colunasExemplo = [
    'Dt. Lanç.',
    'Histórico',
    'Pago A',
    'Despesa',
    'Débito',
    'Crédito',
    'Saldo',
    'Situação',
    'Opções'
  ];



  const handleEdit = (item) => {
    // Lógica para manipular a edição do item
    
    if (item.editando) {
      return;
    }
    console.log(`Editando item: ${item.id}`);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item editado
    console.log(`Salvando item: ${item.id}`);
  };

  const handleCancel = (item) => {
    // Lógica para excluir item
  

    console.log(`Cancelando edição do item: ${item.id}`);
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dadosExemplos.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handlePaginaClicada = (pagina) => {
    setPaginaAtual(pagina);
  };

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const dadosPaginados = dadosExemplos.slice(indiceInicial, indiceFinal);

  return (

    <Fragment>

      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <h2>
                Relatório Estoque Rotatividade
              </h2>
              <div className="panel-toolbar">
                <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Recolher"></button>
              </div>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <div id="resultado">
                {/* <DataTable
                    title="Vendas por Loja"
                    value={dadosConvenioVendasDescontoFuncionario}
                    sortField="VRTOTALPAGO"
                    sortOrder={-1}
                    paginator={true}
                    rows={10}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    showGridlines
                    stripedRows
                    emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                  >
                    {colunaVendasConvenioDescontoFuncionario.map(coluna => (
                      <Column
                        key={coluna.field}
                        field={coluna.field}
                        header={coluna.header}
                        body={coluna.body}
                        footer={coluna.footer}
                        sortable={coluna.sortable}
                        headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem'}}
                        footerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9',fontSize: '0.8rem' }}
                        bodyStyle={{ fontSize: '0.8rem' }}

                      />
                    ))}
                  </DataTable> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}