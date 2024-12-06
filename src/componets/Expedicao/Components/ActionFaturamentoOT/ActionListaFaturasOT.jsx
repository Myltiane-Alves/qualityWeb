import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaCheck, FaExclamation, FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { MdOutlineLocalPrintshop } from "react-icons/md";


export const ActionListaFaturasOT = ({ dadosFaturaOT }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dadosDetalheTransferencia, setDadosDetalheTransferencia] = useState([]);
  const navigate = useNavigate();



  const dados = dadosFaturaOT.map((item, index) => {
    let contador = index + 1;
    console.log(item)
    return {
      IDRESUMOOT: item.IDRESUMOOT,
      DATAEXPEDICAOFORMATADA: item.DATAEXPEDICAOFORMATADA,
      EMPRESAORIGEM: item.EMPRESAORIGEM,
      EMPRESADESTINO: item.EMPRESADESTINO,
      NUMERONOTASEFAZ: item.NUMERONOTASEFAZ,
      QTDCONFERENCIA: item.QTDCONFERENCIA,
      IDSTATUSOT: item.IDSTATUSOT,
      DESCRICAOOT: item.DESCRICAOOT,
      IDSAPORIGEM: item.IDSAPORIGEM,
      IDSAPDESTINO: item.IDSAPDESTINO,
      ERRORLOGSAP: item.ERRORLOGSAP,
      CHAVESEFAZ: item.CHAVESEFAZ,
      MSGSEFAZ: item.MSGSEFAZ,
      CODIGORETORNOSEFAZ: item.CODIGORETORNOSEFAZ,
      DATAEMISSAOSEFAZFORMATADA: item.DATAEMISSAOSEFAZFORMATADA,
      DSOBSERVACAO: item.DSOBSERVACAO,
      contador
    }
  });

  const colunasFaturasOT = [
    {
      field: 'IDRESUMOOT',
      header: 'Nº OT',
      body: row => row.IDRESUMOOT,
      sortable: true,
    },
    {
      field: 'DATAEXPEDICAOFORMATADA',
      header: 'Data Criação',
      body: row => row.DATAEXPEDICAOFORMATADA,
      sortable: true,
    },
    {
      field: 'EMPRESAORIGEM',
      header: 'Loja Origem',
      body: row => row.EMPRESAORIGEM,
      sortable: true,
    },
    {
      field: 'EMPRESADESTINO',
      header: 'Loja Destino',
      body: row => row.EMPRESADESTINO,
      sortable: true,
    },
    {
      field: 'DATAEMISSAOSEFAZFORMATADA',
      header: 'Data Nota',
      body: row => row.DATAEMISSAOSEFAZFORMATADA,
      sortable: true,
    },
    {
      field: 'NUMERONOTASEFAZ',
      header: 'Número NF-E',
      body: row => row.NUMERONOTASEFAZ,
      sortable: true,
    },
    {
      field: 'DESCRICAOOT',
      header: 'Status',
      body: row => <p style={{color: row.DESCRICAOOT == 'CANCELADO' || 'red' && row.DESCRICAOOT == 'FECHADO' ? 'red' : ''}} >{row.DESCRICAOOT}</p>,
      sortable: true,
    },
    {
      field: 'IDSTATUSOT',
      header: 'Opções',
      body: (row) => {

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "15rem",
              
            }}
          >
          <div>

            <ButtonTable
              titleButton={"Visualizar"}
              // onClickButton={() => IDRESUMOOT + IDSTATUSOT + DSOBSERVACAO}
              onClickButton={() => handleClickDetalhar(row)}
              Icon={CiEdit}
              iconSize={16}
              iconColor={"#fff"}
              cor={"primary"}
              
            />
          </div>
          <div>

            <ButtonTable
              titleButton={"Cancelar"}
              onClickButton={() => handleClickDetalhar(row)}
              Icon={FaRegTrashAlt}
              iconSize={16}
              iconColor={"#fff"}
              cor={"danger"}
              disabledBTN={[1, 3].indexOf(row.IDSTATUSOT) >= 0}
            />
          </div>
          <div>

            <ButtonTable
              titleButton={"Processar Faturamento"}
              onClickButton={() => handleClickDetalhar(row)}
              Icon={FaCheck}
              iconSize={16}
              iconColor={"#fff"}
              cor={"warning"}
              disabledBTN={row.IDSTATUSOT === 3}
            />
          </div>
          <div>

            <ButtonTable
              titleButton={"Processar SEFAZ"}
              // onClickButton={() => IDSAPORIGEM}
              onClickButton={() => handleClickDetalhar(row)}
              Icon={FaCheck}
              iconSize={16}
              iconColor={"#fff"}
              cor={"info"}
              disabledBTN={row.IDSTATUSOT === 9}
            />
          </div>
            <div>

            <ButtonTable
              titleButton={"Imprimir Etiqueta"}
              // onClickButton={() => IDSAPORIGEM}
              onClickButton={() => handleClickDetalhar(row)}
              Icon={MdOutlineLocalPrintshop}
              iconSize={16}
              iconColor={"#fff"}
              cor={"dark"}
              
            />
            </div>
          

            <Fragment>
              
              { row.ERRORLOGSAP !== '' && row.ERRORLOGSAP !== null ? (
                <div>
                    <ButtonTable
                      titleButton={"Status Nota Fiscal"}
                      onClickButton={() => handleClickDetalhar(row)}
                      Icon={FaExclamation}
                      iconSize={16}
                      iconColor={"#fff"}
                      cor={"warning"}
                      
                    />
                </div>
              ) : (
                (row.ERRORLOGSAP === '' || row.ERRORLOGSAP === null) && row.IDSAPORIGEM > 0 && row.IDSAPDESTINO > 0 ? (
                <div>
                    <ButtonTable
                      titleButton={"Status Nota Fiscal"}
                      onClickButton={() => handleClickDetalhar(row)}
                      Icon={FaExclamation}
                      iconSize={16}
                      iconColor={"#fff"}
                      cor={"success"}
                      
                    />
                </div>
              ) : (
                <div>
                    <ButtonTable
                      titleButton={"Status Nota Fiscal"}
                      onClickButton={() => handleClickDetalhar(row)}
                      Icon={FaExclamation}
                      iconSize={16}
                      iconColor={"#fff"}
                      cor={"warning"}
                      
                    />
                </div>

                ) ) }

            </Fragment>
            <div>
              <ButtonTable
                titleButton={"Imprimir Nota Fiscal"}
                onClickButton={() => window.open(`http://164.152.244.96:3000/files/NFe${row.CHAVESEFAZ}.pdf`)}
                Icon={MdOutlineLocalPrintshop}
                iconSize={16}
                iconColor={"#fff"}
                cor={"success"}
                
              />  
            </div>
          </div>
        );
      }
    }

  ]

  const handleEdit = async (IDRESUMOOT) => {

    try {
      const response = await get(`/detalhe-ordem-transferencia?idResumoOT=${IDRESUMOOT}`)

      if (response.data && response.data.length > 0) {
        setDadosDetalheTransferencia(response.data);
        setModalVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEdit = (row) => {
    if (row && row.IDRESUMOOT) {
      handleEdit(row.IDRESUMOOT);
    }
  };


  const SelecionarRegistros = () => {
    let i = 0;

    Swal.fire({
      title: 'Selecionar OT',
      icon: 'info',
      html: `A rotina irá selecionar os <b>10 (dez) primeiros</b>, ' +
      'registros de acordo com a opção escolhida!`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Faturamento',
      cancelButtonText: 'SEFAZ',
      confirmButtonColor: '#ffc241',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value == true) {
        if(i < 10) {
          
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'SEFAZ',
          'Registros selecionados para SEFAZ!',
          'info'
        )
      }
    
    })
   }

  return (
    <Fragment>

      <DataTable
        title="Vendas por Loja"
        value={dados}
        sortField="VRTOTALPAGO"
        sortOrder={-1}
        paginator={true}
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        showGridlines
        stripedRows
        emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
      >
        {colunasFaturasOT.map(coluna => (
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

    </Fragment>
  )
}