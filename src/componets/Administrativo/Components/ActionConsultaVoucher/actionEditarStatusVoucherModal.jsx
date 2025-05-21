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

  const dados = dadosEditarVoucher.map((item) => {
    let funcaoFuncionario = usuarioLogado;
    let lojaLogada = usuarioLogado.loja;
    let empresaUsuarioAutorizador = usuarioLogado.empresa;
    if((funcaoFuncionario == "GERENTE" || "SUB GERENTE") && (lojaLogada == empresaUsuarioAutorizador && lojaLogada == item.voucher.IDEMPRESAORIGEM) || funcaoFuncionario == 'TI') {

    }
    return {
      NUCODBARRAS: item.detalhevoucher[0].det.NUCODBARRAS,
      DSPRODUTO: item.detalhevoucher[0].det.DSPRODUTO,
      VRUNIT: item.detalhevoucher[0].det.VRUNIT,
      QTD: item.detalhevoucher[0].det.QTD,
      VRTOTALBRUTO: item.detalhevoucher[0].det.VRTOTALBRUTO,
      VRDESCONTO: item.detalhevoucher[0].det.VRDESCONTO,
      VRTOTALLIQUIDO: item.detalhevoucher[0].det.VRTOTALLIQUIDO,
      IDRESUMOVENDAWEBDESTINO: item.voucher.IDRESUMOVENDAWEBDESTINO,
      IDRESUMOVENDAWEB: item.voucher.IDRESUMOVENDAWEB,
      STTIPOTROCA: item.voucher.STTIPOTROCA,
      VRVOUCHER: item.voucher.VRVOUCHER,
    }
  });

  const colunasVouchersModal = [
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
        size="xl"
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
                  <p>Valor Voucher: {formatMoeda(dados[0]?.VRVOUCHER)} </p>
                  <p>Venda Origem: {dadosEditarVoucher[0]?.voucher.IDRESUMOVENDAWEB ? dadosEditarVoucher[0]?.voucher.IDRESUMOVENDAWEB : 'Não Disponível'} </p>
                  <p>Motivo Troca: {dadosEditarVoucher[0]?.voucher.STCANCELADO == 'True' ? 'Motivo do Cancelamento/Negação' : dadosEditarVoucher[0]?.voucher.DSMOTIVOCANCELAMENTO ? '' : dadosEditarVoucher[0]?.voucher.MOTIVOTROCA ? '' : ''} </p>

                </div>
                <div className="row">
                  <div className="col-sm-6 mb-4">
                    <label>
                      Tipo Troca
                    </label>
                
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
                      value={statusSelecionado}
                      options={optionsStatus}
                      onChange={handleChangeStatus}
                      styles={customStyles}
                   />
                  </div>
                </div>
              </div>
            </form>


            <div className="mt-2 panel">
              <div className="panel-hdr">

                <h2 className="p-3">{`Produtos Venda de Origem:  ` ? dadosEditarVoucher[0]?.voucher.IDRESUMOVENDAWEB ? 'Produtos Venda de Origem: Não Disponível' : 'Produtos Venda de Origem: Não Disponível' : 'Produtos Venda de Origem: Não Disponível'}  </h2>
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
                    {colunasVouchersModal.map(coluna => (
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
                    {console.log(dadosEditarVoucher[0])}
                <h2 className="p-3">{`Produtos Venda de Destino: ` ? dadosEditarVoucher[0]?.voucher.IDRESUMOVENDAWEB ? 'Produtos Venda de Destino: Não Disponível' : 'Produtos Venda de Destino: Não Disponível' : 'Produtos Venda de Destino: Não Disponível'} </h2>
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
                    {colunasVouchersModal.map(coluna => (
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

            ButtonTypeModal={ButtonTypeModal}
            textButtonFechar={"Fechar"}
            onClickButtonFechar={handleClose}
            corFechar="secondary"
            tipo="button"



          />

        </div>
      </Modal>
    </Fragment>
  )
}