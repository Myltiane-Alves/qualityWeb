import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import Select from 'react-select';
import { post, put } from "../../../../api/funcRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";


export const ActionEditarStatusVoucherModal = ({ show, handleClose, dadosEditarVoucher }) => {
  const [trocaSelecionado, setTrocaSelecionado] = useState('')
  const [statusSelecionado, setStatusSelecionado] = useState('')  
  const [motivoTroca, setMotivoTroca] = useState('')
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

  useEffect(() => {
    setStatusSelecionado(dadosEditarVoucher[0]?.voucher.STSTATUS)
    setTrocaSelecionado(dadosEditarVoucher[0]?.voucher.STTIPOTROCA)
  },[dadosEditarVoucher])
  const dados = dadosEditarVoucher.flatMap((item) => {
    let funcaoFuncionario = usuarioLogado;
    let lojaLogada = usuarioLogado?.loja;
    let empresaUsuarioAutorizador = usuarioLogado.empresa;
    if((funcaoFuncionario == "GERENTE" || "SUB GERENTE") && (lojaLogada == empresaUsuarioAutorizador && lojaLogada == item.voucher.IDEMPRESAORIGEM) || funcaoFuncionario == 'TI') {

    }
    let STTIPOTROCA = item.voucher?.STTIPOTROCA || 'CORTESIA';
    let IDRESUMOVENDAWEBDESTINO = item.voucher?.IDRESUMOVENDAWEBDESTINO;
    let IDRESUMOVENDAWEB = item.voucher?.IDRESUMOVENDAWEB;
    
    console.log(item.voucher, 'item')
    return item.detalhevoucher.map((detalhe) => ({
      
      NUCODBARRAS: detalhe.det.NUCODBARRAS,
      DSPRODUTO: detalhe.det.DSPRODUTO,
      VRUNIT: detalhe.det.VRUNIT,
      QTD: detalhe.det.QTD,
      VRTOTALBRUTO: detalhe.det.VRTOTALBRUTO,
      VRDESCONTO: detalhe.det.VRDESCONTO,
      VRTOTALLIQUIDO: detalhe.det.VRTOTALLIQUIDO,


    
    }));
  });
  const dadosDestino = dadosEditarVoucher.flatMap((item) => {

    return  item.detalhedestino.map((detalhe) => ({
      CODBARRAS: detalhe.vendadetdestino.NUCODBARRAS,
      DSNOMEPRODUTO: detalhe.vendadetdestino.DSPRODUTO,
      VUNCOM: detalhe.vendadetdestino.VUNCOM,
      QTDPRODUTO: detalhe.vendadetdestino.QTD,
      VRPROD: detalhe.vendadetdestino.VPROD,
      VRDESC: detalhe.vendadetdestino.VDESC,
      VRLIQUIDO: detalhe.vendadetdestino.VRTOTALLIQUIDO,
    }))
  });

  const colunasOrigem = [
    {
      field: 'NUCODBARRAS',
      header: 'Código Barras',
      body: row => <th>{row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSPRODUTO',
      header: 'Descrição',
      body: row => <th>{row.DSPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'VRUNIT',
      header: 'Vr Unit',
      body: row => <th>{formatMoeda(row.VRUNIT)}</th>,
      sortable: true,
    },
    {
      field: 'QTD',
      header: 'QTD',
      body: row => <th>{row.QTD}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALBRUTO',
      header: 'Vr Bruto',
      body: row => <th>{formatMoeda(row.VRTOTALBRUTO)}</th>,
      sortable: true,
    },
    {
      field: 'VRDESCONTO',
      header: 'Vr Desconto',
      body: row => <th>{formatMoeda(row.VRDESCONTO)}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALLIQUIDO',
      header: 'Vr Líquido',
      body: row => <th>{formatMoeda(row.VRTOTALLIQUIDO)}</th>,
      sortable: true,
    },
  ]

  const colunasDestino = [
    {
      field: 'CODBARRAS',
      header: 'Código Barras',
      body: row => <th>{row.CODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSNOMEPRODUTO',
      header: 'Descrição',
      body: row => <th>{row.DSNOMEPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'VUNCOM',
      header: 'Vr Unit',
      body: row => <th>{formatMoeda(row.VUNCOM)}</th>,
      sortable: true,
    },
    {
      field: 'QTDPRODUTO',
      header: 'QTD',
      body: row => <th>{row.QTDPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'VRPROD',
      header: 'Vr Bruto',
      body: row => <th>{formatMoeda(row.VRPROD)}</th>,
      sortable: true,
    },
    {
      field: 'VRDESC',
      header: 'Vr Desconto',
      body: row => <th>{formatMoeda(row.VRDESC)}</th>,
      sortable: true,
    },
    {
      field: 'VRLIQUIDO',
      header: 'Vr Líquido',
      body: row => <th>{formatMoeda(row.VRLIQUIDO)}</th>,
      sortable: true,
    },
  ]

  const onSubmit = async () => {

    const putData = {
      STATIVO: 'True',
      STCANCELADO: 'False',
      DSMOTIVOCANCELAMENTO: motivoTroca,
      IDUSRCANCELAMENTO: usuarioLogado.id,
      STSTATUS: statusSelecionado,
      STTIPOTROCA: trocaSelecionado,
      MOTIVOTROCA: motivoTroca,
      IDVOUCHER: dadosEditarVoucher[0]?.IDVOUCHER,
      IDVENDAWEB: dadosEditarVoucher[0]?.IDVENDAWEB,
    }
    const response = await put('/cadastrar-deposito-loja', putData)
      .then(response => {
    
      })

    const textDados = JSON.stringify(putData)
    let textoFuncao = 'FINANCEIRO/CADASTRO DEPOSITO PELO EXTRATO DE CONTAS';


    const postData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: textoFuncao,
      DADOS: textDados,
      IP: ipUsuario
    }

    const responsePost = await post('/log-web', postData)

      .catch(error => {
        Swal.fire({
          title: 'Cadastro',
          text: 'Depósito cadastrado com Sucesso',
          icon: 'success'
        })
        console.error('Erro ao Tentar Cadastrar Depósito: ', error);
      })
      handleClose();
      return responsePost.data;
  }

  const handleChangeTroca = (e) => {
    setTrocaSelecionado(e.value)
  }

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value)
  }

  const optionsTroca = [
    { value: 'CORTESIA', label: 'CORTESIA', color: 'blue' },
    { value: 'DEFEITO', label: 'DEFEITO', color: 'red' },
  ]

  const optionsStatus = [
    { value: 'NOVO', label: 'NOVO', color: 'blue' },
    { value: 'EM ANALISE', label: 'EM ANALISE', color: 'orange' },
    { value: 'LIBERADO PARA O CLIENTE', label: 'LIBERADO PARA O CLIENTE', color: 'green' },
    { value: 'FINALIZADO', label: 'FINALIZADO', color: 'red' },
    { value: 'NEGADO', label: 'NEGADO', color: 'red' },
    { value: 'CANCELADO', label: 'CANCELADO', color: 'red' },
  ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
    }),
  };


  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <div className="" role="document">
          <HeaderModal
            title={"Detalhes do Voucher"}
            subTitle={"Detalhes e Atualização de Status"}
            handleClose={handleClose}
          />

          <Modal.Body>
            <form action="">

              <div>
                <div>
                  <p>Cliente: {dadosEditarVoucher[0]?.voucher.DSNOMERAZAOSOCIAL} </p>
                </div>
                <div>
                  <p>CPF/CNPJ: {dadosEditarVoucher[0]?.voucher.NUCPFCNPJ} </p>
                </div>
                <div>
                  <p>Voucher: {dadosEditarVoucher[0]?.voucher.NUVOUCHER} </p>
                  <p>Valor Voucher: {formatMoeda(dadosEditarVoucher[0]?.voucher.VRVOUCHER)} </p>
                  <p>Venda Origem: {dadosEditarVoucher[0]?.voucher.IDRESUMOVENDAWEB ? 'Não Disponível' : 'Não Disponível'} </p>
                  <p>Motivo Troca: {dadosEditarVoucher[0]?.voucher.STCANCELADO == 'True' ? 'Motivo do Cancelamento/Negação' : dadosEditarVoucher[0]?.voucher.DSMOTIVOCANCELAMENTO ? '' : dadosEditarVoucher[0]?.voucher.MOTIVOTROCA ? '' : ''} </p>

                </div>
                <div className="row">
                  <div className="col-sm-6 mb-4">
                    <label>
                      Tipo Troca
                    </label>
                
                    {/* {console.log('trocaSelecionado', trocaSelecionado)} */}
                    <Select
                       value={optionsTroca.find(option => option.value === trocaSelecionado)}
                       options={optionsTroca}
                       onChange={handleChangeTroca}
                       isDisabled={trocaSelecionado == 'FINALIZADO' && usuarioLogado?.DSFUNCAO !== 'TI' ? 'disabled' : ''}
                       styles={customStyles}
                    />
                  </div>

                </div>
                <div className="row">

                  <div className="col-sm-6 mb-4">
                    <label>
                      Status do Voucher:
                    </label>
                    <Select
                      value={optionsStatus.find(option => option.value === statusSelecionado)}
                      options={optionsStatus}
                      onChange={handleChangeStatus}
                      styles={customStyles}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-4">
                    {statusSelecionado && (

                      <InputFieldModal
                      type="text"
                      label={"Motivo Troca"}
                      value={motivoTroca}
                      onChangeModal={(e) => setMotivoTroca(e.target.value)}
                      placeholder={"MOTIVO DA TROCA DE STATUS"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>


            <div className="mt-2 panel">
              <div className="panel-hdr">
              
                <h2 className="p-3">{`Produtos Venda de Origem:  ${dadosEditarVoucher[0]?.voucher.IDRESUMOVENDAWEB } ` }  </h2>
              </div>
              <div className="panel-container">
                <div className="panel-content">

                  <DataTable
                    value={dados}
                    sortOrder={-1}
                    rows={true}
                    showGridlines
                    stripedRows
                    emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
                  >
                    {colunasOrigem.map(coluna => (
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
            </div>

            <div className="mt-2 panel">
              <div className="panel-hdr">
                 
                <h2 className="p-3">{`Produtos Venda de Destino:  ${dadosEditarVoucher[0]?.detalhedestino[0].vendadetdestino.IDVENDA}` } </h2>
              </div>
              <div className="panel-container">
                <div className="panel-content">
                    

                  <DataTable
                    value={dadosDestino}
                    sortOrder={-1}
                    paginator={true}
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
                    showGridlines
                    stripedRows
                    emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado </div>}
                  >
                    {colunasDestino.map(coluna => (
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
            </div>
          </Modal.Body>

          <FooterModal
            ButtonTypeConfirmar={ButtonTypeModal}
            textButtonConfirmar={"Confirmar"}
            onClickButtonConfirmar={""}
            corConfirmar="success"

            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar="secondary"


          />

        </div>
      </Modal>
    </Fragment>
  )
}