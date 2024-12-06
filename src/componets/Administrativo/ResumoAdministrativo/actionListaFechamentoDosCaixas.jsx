import React, { Fragment, useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Accordion from 'react-bootstrap/Accordion';
import { toFloat } from "../../../utils/toFloat";
import { ButtonTable } from "../../ButtonsTabela/ButtonTable";
import { GrView } from "react-icons/gr";
import { formatMoeda } from "../../../utils/formatMoeda";
import { FaCashRegister } from "react-icons/fa";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { post, put } from "../../../api/funcRequest";
import Swal from "sweetalert2";


export const ActionListaFechamentoDosCaixas = ({ dadosCaixaFechados }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [ipUsuario, setIpUsuario] = useState('')
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

  const calcularTotalQuebraCaixa = (item) => {
    return (
      toFloat(item.TOTALFECHAMENTODINHEIRO) -
      toFloat(item.TOTALFECHAMENTODINHEIROFISICO)
    )
  }

  const dados = dadosCaixaFechados.map((item, index) => {


    const totalQuebraCaixa = calcularTotalQuebraCaixa(item);
    return {
      IDMOVIMENTO: item.IDMOVIMENTO,
      IDCAIXAFECHAMENTO: item.IDCAIXAFECHAMENTO,
      DSCAIXAFECHAMENTO: item.DSCAIXAFECHAMENTO,
      DTHORAABERTURACAIXA: item.DTHORAABERTURACAIXA,
      DTHORAFECHAMENTOCAIXA: item.DTHORAFECHAMENTOCAIXA,
      OPERADORFECHAMENTO: item.OPERADORFECHAMENTO,
      TOTALFECHAMENTODINHEIROFISICO: item.TOTALFECHAMENTODINHEIROFISICO,
      TOTALFECHAMENTODINHEIRO: item.TOTALFECHAMENTODINHEIRO,
      TOTALFECHAMENTOCARTAO: item.TOTALFECHAMENTOCARTAO,
      TOTALFECHAMENTOPOS: item.TOTALFECHAMENTOPOS,
      TOTALFECHAMENTOVOUCHER: item.TOTALFECHAMENTOVOUCHER,
      TOTALFECHAMENTOFATURA: item.TOTALFECHAMENTOFATURA,
      TOTALFECHAMENTOCONVENIO: item.TOTALFECHAMENTOCONVENIO,
      TOTALFECHAMENTOPIX: item.TOTALFECHAMENTOPIX,
      TOTALFECHAMENTOCPL: item.TOTALFECHAMENTOCPL,
      STCONFERIDO: item.STCONFERIDO,
      TOTALFECHAMENTODINHEIROAJUSTE: item.TOTALFECHAMENTODINHEIROAJUSTE,
      TOTALFECHAMENTOCARTAO: item.TOTALFECHAMENTOCARTAO,
      TOTALFECHAMENTOPOS: item.TOTALFECHAMENTOPOS,
      TOTALFECHAMENTOVOUCHER: item.TOTALFECHAMENTOVOUCHER,

      totalQuebraCaixa: totalQuebraCaixa

    };
  });
  
  const calcularTotalDinheiroFisico = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.TOTALFECHAMENTODINHEIROFISICO);
    }
    return total;
  }
  
  const calcularTotalDinheiroInformado = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.TOTALFECHAMENTODINHEIRO);
    }
    return total;
  }

  const calcularTotalQuebraCaixaTotal = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.totalQuebraCaixa);
    }
    return total;
  }
  
  const calcularTotalCartao = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.TOTALFECHAMENTOCARTAO);
    }
    return total;
  }
  
  const calcularTotalPos = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.TOTALFECHAMENTOPOS);
    }
    return total;
  }
  
  const calcularTotalVoucher = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.TOTALFECHAMENTOVOUCHER);
    }
    return total;
  }
  
  const calcularTotalFatura = () => {
    let total = 0;
    for(let resultado of dados){
      total += parseFloat(resultado.TOTALFECHAMENTOFATURA);
    }
    return total;
  }
  const colunaDetalheDespesas = [
    {
      field: 'IDMOVIMENTO',
      header: 'Nº Movimento',
      body: row => <th> {row.IDMOVIMENTO}</th>,
      sortable: true,
    },
    {
      field: 'IDCAIXAFECHAMENTO',
      header: 'Caixa',
      body: row => <th> {row.IDCAIXAFECHAMENTO} - {row.DSCAIXAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAABERTURACAIXA',
      header: 'Abertura',
      body: row => <th> {row.DTHORAABERTURACAIXA} </th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTOCAIXA',
      header: 'Fechamento',
      body: row => <th> {row.DTHORAFECHAMENTOCAIXA} </th>,
      sortable: true,
    },
    {
      field: 'OPERADORFECHAMENTO',
      header: 'Operador',
      body: row => <th> {row.OPERADORFECHAMENTO} </th>,
      footer: 'Total dos Fechamentos',
      sortable: true,
    },
    {
      field: 'TOTALFECHAMENTODINHEIROFISICO',
      header: 'Venda Dinheiro',
      body: row => <th> {formatMoeda(row.TOTALFECHAMENTODINHEIROFISICO)} </th>,
      footer: formatMoeda(calcularTotalDinheiroFisico()),
      sortable: true,
    },
    {
      field: 'TOTALFECHAMENTODINHEIRO',
      header: 'Dinheiro Informado',
      body: row => <th> {formatMoeda(row.TOTALFECHAMENTODINHEIRO)} </th>,
      footer: formatMoeda(calcularTotalDinheiroInformado()),
      sortable: true,
    },
    {
      field: 'totalQuebraCaixa',
      header: 'Quebra Caixa',
      body: row => <th style={{ color: row.totalQuebraCaixa > 0 ? 'blue' : 'red' }}> {formatMoeda(row.totalQuebraCaixa) > 0 ? formatMoeda(row.totalQuebraCaixa) : formatMoeda(row.totalQuebraCaixa)} </th>,
      footer: formatMoeda(calcularTotalQuebraCaixaTotal()),
      sortable: true,
    },
    {
      field: 'TOTALFECHAMENTOCARTAO',
      header: 'Cartao',
      body: row => <th style={{ color: row.TOTALFECHAMENTOCARTAO }}> {formatMoeda(row.TOTALFECHAMENTOCARTAO)} </th>,
      footer: formatMoeda(calcularTotalCartao()),
      sortable: true,
    },
    {
      field: 'TOTALFECHAMENTOPOS',
      header: 'POS',
      body: row => <th > {formatMoeda(row.TOTALFECHAMENTOPOS)} </th>,
      footer: formatMoeda(calcularTotalPos()),
      sortable: true,
    },
    {
      field: 'TOTALFECHAMENTOVOUCHER',
      header: 'Voucher',
      body: row => <th > {formatMoeda(row.TOTALFECHAMENTOVOUCHER)} </th>,
      footer: formatMoeda(calcularTotalVoucher()),
      sortable: true,
    },
    {
      field: 'TOTALFECHAMENTOFATURA',
      header: 'Fatura',
      body: row => <th > {formatMoeda(row.TOTALFECHAMENTOFATURA)} </th>,
      footer: formatMoeda(calcularTotalFatura()),
      sortable: true,
    },
    {
      field: 'STCONFERIDO',
      header: 'Situação',
      body: row => <th style={{ color: row.STCONFERIDO == 'True' ? 'blue' : 'red' }} >{row.STCONFERIDO == 'True' ? 'Conferido' : 'Sem Conferir'}</th>,
      sortable: true,
    },
    {
      field: 'STCONFERIDO',
      header: 'Opções',
      body: row => {
        if (row.STCONFERIDO > 0) {
          return (


            <div>

              <ButtonTable
                onClickButton={() => handleConferir(row) }
                titleButton="Abertura do Caixa na Web"
                cor="danger"
                Icon={FaCashRegister}
                iconSize={18}
              />

            </div>
          )

        } else {
          return (
            <div>


              <ButtonTable
                onClickButton={() => handleConferir(row)}
                titleButton="Confirmar Conferencia do Caixa"
                cor="success"
                Icon={FaCashRegister}
                iconSize={18}
              />

            </div>
          )
        }
      },
      sortable: true,
    },
  ]

  const handleConferir = async (row) => {

    
    Swal.fire({
      icon: 'question',
      title: `Confimar Conferencia do Caixa `,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#FD1381',
      confirmButtonColor: '#7352A5',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'custom-swal',
      },
      preConfirm: async () => {
        try {
          let stConferidoValue;
          let textoFuncao = '';
          
          if(row.STCONFERIDO == 0) {
            stConferidoValue = 1;
            textoFuncao = 'ADMINISTRATIVO/ABERTURA DO MOVIMENTO DE CAIXA';
          }else{
            stConferidoValue = 0;
            textoFuncao = 'ADMINISTRATIVO/CONFIMAR CONFERENCIA DO MOVIMENTO DE CAIXA';
          }
          const putData = {
            IDSUPERVISOR: usuarioLogado.id,
            STCONFERIDO: stConferidoValue,
            ID: row.IDMOVIMENTO,
          };
      
          const textDados = JSON.stringify(putData)

          await put('/atualizacao-status', putData);
          
          const postData = {
            IDFUNCIONARIO: usuarioLogado.id,
            PATHFUNCAO: textoFuncao,
            DADOS: textDados,
            IP: ipUsuario
          }
      
          const responsePost = await post('/log-web', postData)

          Swal.fire('Sucesso!', 'Recompra atualizada com sucesso.', 'success');

          responsePost.data;
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao atualizar recompra.', 'error');
        }
      }
    });

    
  };


  const footerGroup = (
    <ColumnGroup>
      <Row> 
        <Column footer="Total dos Fechamentos" colSpan={5} footerStyle={{textAlign: 'center', color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }} />
        <Column footer={formatMoeda(calcularTotalDinheiroFisico())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalDinheiroInformado())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalQuebraCaixaTotal())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalCartao())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalPos())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalVoucher())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={formatMoeda(calcularTotalFatura())} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
        <Column footer={""} colSpan={2} footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}/>
      </Row>
    </ColumnGroup>
  )

  return (

    <Fragment>
      <div className="row" >
        <Accordion defaultActiveKey="0" className="col-xl-12" >
          <Accordion.Item eventKey="0" id="panel-1" className="panel" >
            <header className="panel-hdr " >
              <h2>
                Lista de Fechamento dos Caixas
              </h2>
            </header>
            <div className="card">
              <DataTable
                title="Vendas por Loja"
                value={dados}
                sortField="VRTOTALPAGO"
                footerColumnGroup={footerGroup}
                sortOrder={-1}
                paginator={true}
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                showGridlines
                stripedRows
                emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
              >
                {colunaDetalheDespesas.map(coluna => (
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
          </Accordion.Item>
        </Accordion>
      </div>
    </Fragment>
  )
}

