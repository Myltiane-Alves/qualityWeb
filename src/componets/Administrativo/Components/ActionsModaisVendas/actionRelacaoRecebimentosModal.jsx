import { Fragment, useEffect, useRef, useState } from "react"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal"
import Modal from 'react-bootstrap/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatMoeda } from "../../../../utils/formatMoeda";
import { toFloat } from "../../../../utils/toFloat";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { ButtonType } from "../../../Buttons/ButtonType";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { post, put } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { set, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";

export const ActionRelacaoRecebimentosModal = ({ dadosPagamentoModal, show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [incluirCartao2, setIncluirCartao2] = useState(false);
  const [incluirCartao3, setIncluirCartao3] = useState(false);
  const [incluirPos2, setIncluirPos2] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const [valorDinheiro, setValorDinheiro] = useState(0);
  const [valorPix, setValorPix] = useState(0);
  const [nuChavePix, setNuChavePix] = useState('');
  const [dsTipoPagamentoTEF, setDsTipoPagamentoTEF] = useState('');
  const [nuOperacao, setNuOperacao] = useState('');
  const [nuAutorizacao, setNuAutorizacao] = useState('');
  const [vrCartao, setVrCartao] = useState('');
  const [qtdParcelas, setQtdParcelas] = useState('');
  const [dataParcela2, setDataParcela2] = useState('');
  const [dsTipoPagamentoTEF2, setDsTipoPagamentoTEF2] = useState('');
  const [nuOperacao2, setNuOperacao2] = useState('');
  const [nuAutorizacao2, setNuAutorizacao2] = useState('');
  const [vrCartao2, setVrCartao2] = useState(0);
  const [qtdParcelas2, setQtdParcelas2] = useState('');
  const [dataParcela3, setDataParcela3] = useState('');
  const [dsTipoPagamentoTEF3, setDsTipoPagamentoTEF3] = useState('');
  const [nuOperacao3, setNuOperacao3] = useState('');
  const [nuAutorizacao3, setNuAutorizacao3] = useState('');
  const [vrCartao3, setVrCartao3] = useState(0);
  const [qtdParcelas3, setQtdParcelas3] = useState('');
  const [dsTipoPagamentoPOS, setDsTipoPagamentoPOS] = useState('');
  const [nuOperacaoPOS, setNuOperacaoPOS] = useState('');
  const [nuAutorizacaoPOS, setNuAutorizacaoPOS] = useState('');
  const [vrPos, setVrPos] = useState(0);
  const [qtdParcelasPOS, setQtdParcelasPOS] = useState('');
  const [dataParcelaPOS, setDataParcelaPOS] = useState('');
  const [dsTipoPagamentoPOS2, setDsTipoPagamentoPOS2] = useState('');
  const [nuOperacaoPOS2, setNuOperacaoPOS2] = useState('');
  const [nuAutorizacaoPOS2, setNuAutorizacaoPOS2] = useState('');
  const [vrPos2, setVrPos2] = useState(0);
  const [qtdParcelasPOS2, setQtdParcelasPOS2] = useState('');
  const [dataParcelaPOS2, setDataParcelaPOS2] = useState('');
  const [vrVoucher, setVrVoucher] = useState(0);
  const [nuVoucher, setNuVoucher] = useState('');
  const [motivoAlteracao, setMotivoAlteracao] = useState('');
  const [dataParcela1, setDataParcela1] = useState('');
  const [pagamentos, setPagamentos] = useState(false);
  const navigate = useNavigate();
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const dataTableRef = useRef();
  const [size, setSize] = useState('small')

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Relação de Produtos ',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['VR. Dinheiro', 'Vr. Cartão', 'Vr. POS', 'Vr. PIX', 'Vr. MP', 'Vr. Convênio', 'Vr. Voucher']],
      body: dadosVendas.map(item => [
        item.contador,
        item.CPROD,
        item.XPROD,
        item.CEAN,
        toFloat(item.QTD),
        formatMoeda(item.VUNCOM),
        formatMoeda(item.VRTOTALLIQUIDO)

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('relacao_recebimentos_venda.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosVendas);
    const workbook = XLSX.utils.book_new();
    const header = ['VR. Dinheiro', 'Vr. Cartão', 'Vr. POS', 'Vr. PIX', 'Vr. MP', 'Vr. Convênio', 'Vr. Voucher'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'VR. Dinheiro' },
      { wpx: 250, caption: 'Vr. Cartão' },
      { wpx: 100, caption: 'Vr. POS' },
      { wpx: 100, caption: 'Vr. PIX' },
      { wpx: 100, caption: 'Vr. MP' },
      { wpx: 100, caption: 'Vr. Convênio' },
      { wpx: 100, caption: 'Vr. Voucher' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relação de Produtos');
    XLSX.writeFile(workbook, 'relacao_recibimentos_venda.xlsx');
  }

  const exportToPDFProduto = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Pagamento', 'Parcelas', 'NSU_CTF', 'Autorizador', 'Valor Recebido', 'Valor Liquido']],
      body: dados.map(item => [
        item.contador,
        item.DSTIPOPAGAMENTO,
        item.NOTEF,
        item.NOAUTORIZADOR,
        item.NUAUTORIZACAO,
        item.NPARCELAS,
        formatMoeda(item.VALORRECEBIDO),
        formatMoeda(item.VALORLIQUIDO)

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('relacao_pagamento.pdf');
  };

  const exportToExcelProduto = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Pagamento', 'Parcelas', 'NSU_CTF', 'Autorizador', 'Valor Recebido', 'Valor Liquido'];
    worksheet['!cols'] = [
      { wpx: 100, caption: 'Pagamento' },
      { wpx: 100, caption: 'Parcelas' },
      { wpx: 250, caption: 'NSU_CTF' },
      { wpx: 100, caption: 'Autorizador' },
      { wpx: 100, caption: 'Valor Recebido' },
      { wpx: 100, caption: 'Valor Liquido' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relação de Pagamentos');
    XLSX.writeFile(workbook, 'relacao_pagamentos.xlsx');
  }


  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataParcela1(dataAtual);
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

  const dadosVendas = dadosPagamentoModal.map((item) => {

    return {
      IDVENDA: item.venda?.IDVENDA,
      IDEMPRESA: item.venda?.IDEMPRESA,
      IDCAIXAWEB: item.venda?.IDCAIXAWEB,
      IDOPERADOR: item.venda?.IDOPERADOR,
      VRDINHEIRO: item.venda?.VRDINHEIRO,
      VRRECCARTAO: item.venda?.VRRECCARTAO,
      VRRECPOSVENDA: item.venda?.VRRECPOSVENDA,
      VRRECPOS: item.venda?.VRRECPOS,
      VRRECPIX: item.venda?.VRRECPIX,
      VRRECMOOVPAY: item.venda?.VRRECMOOVPAY,
      VRRECCONVENIO: item.venda?.VRRECCONVENIO,
      VRRECVOUCHER: item.venda?.VRRECVOUCHER,
      VRTOTALVENDA: item.venda?.VRTOTALVENDA,
      ULTNITEM: item.venda?.ULTNITEM,

    }
  });

  const dadosPagamentos = dadosPagamentoModal.flatMap((item) =>

    item.vendaPagamento.map((pagamento) => ({

      DSTIPOPAGAMENTO: pagamento.pag.DSTIPOPAGAMENTO,
      NPARCELAS: pagamento.pag.NPARCELAS,
      NUOPERACAO: pagamento.pag.NUOPERACAO,
      NSUAUTORIZADORA: pagamento.pag.NSUAUTORIZADORA,
      VALORRECEBIDO: pagamento.pag.VALORRECEBIDO
    }))
  );

  const colunasPagamento = [
    {
      field: 'VRDINHEIRO',
      header: 'VR. Dinheiro',
      body: row => formatMoeda(row.VRDINHEIRO),
      sortable: true,
    },
    {
      field: 'VRRECCARTAO',
      header: 'Vr. Cartão',
      body: row => formatMoeda(row.VRRECCARTAO),
      sortable: true,

    },
    {
      field: 'VRRECPOS',
      header: 'Vr. POS',
      body: row => formatMoeda(row.VRRECPOS),
      sortable: true,

    },
    {
      field: 'VRRECPIX',
      header: 'Vr. PIX',
      body: row => formatMoeda(row.VRRECPIX),
      sortable: true,

    },
    {
      field: 'VRRECMOOVPAY',
      header: 'Vr. MP',
      body: row => formatMoeda(row.VRRECMOOVPAY),
      sortable: true,

    },
    {
      field: 'VRRECCONVENIO',
      header: 'Vr. Convênio',
      body: row => formatMoeda(row.VRRECCONVENIO),
      sortable: true,

    },
    {
      field: 'VRRECVOUCHER',
      header: 'Vr. Voucher',
      body: row => formatMoeda(row.VRRECVOUCHER),
      sortable: true,
    },
  ]

  const colunasPagPos = [
    {
      field: 'DSTIPOPAGAMENTO',
      header: 'Pagamento',
      body: row => row.DSTIPOPAGAMENTO,
      sortable: true,
    },
    {
      field: 'NPARCELAS',
      header: 'Parcelas',
      body: row => toFloat(row.NPARCELAS),
      sortable: true,
    },
    {
      field: 'NUOPERACAO',
      header: 'NSU_CTF',
      body: row => toFloat(row.NUOPERACAO),
      sortable: true,
    },
    {
      field: 'NSUAUTORIZADORA',
      header: 'Autorização',
      body: row => toFloat(row.NSUAUTORIZADORA),
      sortable: true,
    },
    {
      field: 'VALORRECEBIDO',
      header: 'Vr. Recebido',
      body: row => formatMoeda(row.VALORRECEBIDO),
      sortable: true,
    },
  ]


  const somaValoresTotais = () => {


    const somavalores = toFloat(valorDinheiro) + toFloat(valorPix) + toFloat(vrCartao) + toFloat(vrCartao2) + toFloat(vrCartao3) + toFloat(vrPos) + toFloat(vrPos2) + toFloat(vrVoucher);
    const somadifere = toFloat(valorDistribuir) - somavalores;

    console.log('somavalores', somavalores);
    console.log('somadifere', somadifere);

    // Atualizar o valor de vrDistribuir
    setValorDistribuir(somadifere.toFixed(2)); // Arredondando para 2 casas decimais, se necessário

    return somadifere;
  };
  const [valorDistribuir, setValorDistribuir] = useState(dadosPagamentoModal[0]?.venda.VRTOTALVENDA);


  useEffect(() => {
    somaValoresTotais();
  }, [valorDinheiro, valorPix, vrCartao, vrCartao2, vrCartao3, vrPos, vrPos2, vrVoucher]);


  const cancelarVendaPagamento = () => {


    if (valorDistribuir > 0) {

      alertaValorMenorVenda();
      return false;
    } else {
      const dados = [{
        "IDVENDA": dadosPagamentos[0].IDVENDA,
        "STCANCELADO": 'True',
        "DTULTIMAALTERACAO": new Date().toISOString(), // Use a data atual
        "IDFUNCIONARIOCANCELA": usuarioLogado.id,
        "TXTMOTIVOCANCELA": motivoAlteracao
      }];
      put('/alterar-venda-pagamento', dados)
        .then(() => {
          console.log("Venda cancelada com sucesso");
          // funcSucessUpdateVendaPagamento pode ser chamada aqui se existir
        })
        .catch((e) => {
          console.error(e);
          // funcError pode ser chamada aqui se existir
        });
    }
  };

  const onSubmit = async (IDVENDA) => {

    if (valorDinheiro > 0) {
      const dadosDinheiro = {
        "IDVENDAPAGAMENTO": '',
        "IDVENDA": '',
        "NITEM": '',
        "TPAG": '000',
        "DSTIPOPAGAMENTO": 'DINHEIRO',
        "VALORRECEBIDO": parseFloat(valorDinheiro),
        "VALORDEDUZIDO": 0,
        "VALORLIQUIDO": parseFloat(valorDinheiro),
        "DTPROCESSAMENTO": getDataAtual(),
        "STCANCELADO": 'False',
        "IDFUNCIONARIO": usuarioLogado.id,

      }

      const response = await post('/alterar-venda-pagamento', dadosDinheiro)
    }





    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

      .catch(error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      })

  }

  const handleClickCartão2 = () => {
    setIncluirCartao2(prev => !prev)
  }
  const handleClickCartão3 = () => {
    setIncluirCartao3(prev => !prev)
  }

  const handleClickPos2 = () => {
    setIncluirPos2(prev => !prev)
  }

  const alterarPagamentoVisivel = () => {
    setPagamentos(prev => !prev);
  }


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
            title={"Detalhe da Venda"}
            subTitle={"Relação de Recebimentos da Venda"}
            handleClose={handleClose}
          />

          <Modal.Body>

            <div className="panel">
              <div className="panel-hdr">
                <h2>{`Lista de Produtos da Venda Nº  ${dadosPagamentos[0]?.IDVENDA} `}</h2>

              </div>
              <div style={{ marginBottom: "1rem" }}>
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
                  value={dadosVendas}
                  size={size}

                  showGridlines
                  stripedRows
                  emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                >
                  {colunasPagamento.map(coluna => (
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

            <div className="panel">
              <div className="panel-hdr">
                <h2>{`Lista de Pagamentos da Venda `}</h2>
              </div>
              <div>
                <HeaderTable

                  globalFilterValue={globalFilterValue}
                  onGlobalFilterChange={onGlobalFilterChange}
                  handlePrint={handlePrint}
                  exportToExcel={exportToExcelProduto}
                  exportToPDF={exportToPDFProduto}
                />
              </div>
              <div className="mt-4" ref={dataTableRef}>

                <DataTable
                  title="Vendas por Loja"
                  value={dadosPagamentos}
                  size={size}
                  sortOrder={-1}
                  showGridlines
                  stripedRows
                  emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
                >
                  {colunasPagPos.map(coluna => (
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
            <div className="pt-5">
              <ButtonType
                cor={pagamentos ? 'warning' : 'success'}
                textButton={'Alterar Pagamentos'}

                onClickButtonType={alterarPagamentoVisivel}
              />
              <hr />
            </div>
            {pagamentos && (
              <>
                <form action="">
                  <div class="form-group">
                    <div class="row">

                      <div class="col-sm-6 col-md-3 col-xl-4">
                        <InputFieldModal
                          className="form-control input"
                          readOnly={true}
                          id="vrDistribuir"
                          label="Restante a Distribuir (menos Voucher)"
                          value={valorDistribuir}
                          onChangeModal={(e) => setValorDistribuir(e.target.value)}
                          {...register("vrDistribuir", { required: true, minLength: 8 })}
                        />


                      </div>

                    </div>
                    <div class="row mt-4">

                      <div class="col-sm-3 col-md-3 col-xl-4">

                        <InputFieldModal
                          className="form-control input"
                          id="vrDinheiro"
                          label="Valor Dinheiro"
                          value={valorDinheiro}
                          onChangeModal={(e) => setValorDinheiro(e.target.value)}
                          {...register("vrDinheiro", { required: true })}
                        />
                        {errors.valorDinheiro && (
                          <span className="text-danger">Qual Valor em Dinheiro</span>
                        )}
                      </div>
                    </div>
                    <hr />

                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-6 col-md-2 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="vrPix"
                          label="Valor PIX"
                          value={valorPix}
                          onChangeModal={(e) => setValorPix(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-9">

                        <InputFieldModal
                          className="form-control input"
                          id="nuChavePix"
                          label="Nº Chave PIX"
                          value={nuChavePix}
                          onChangeModal={(e) => setNuChavePix(e.target.value)}
                        />
                      </div>

                    </div>
                    <hr />

                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-6 col-md-6 col-xl-6">

                        <InputFieldModal
                          className="form-control input"
                          id="dsTipoPagamaentoTEF"
                          label="Descrição Cartão TEF"
                          value={dsTipoPagamentoTEF}
                          onChangeModal={(e) => setDsTipoPagamentoTEF(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="nuOperacao"
                          label="NSU_CTF"
                          value={nuOperacao}
                          onChangeModal={(e) => setNuOperacao(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="nuAutorizacao"
                          label="Nº Autorização"
                          value={nuAutorizacao}
                          onChangeModal={(e) => setNuAutorizacao(e.target.value)}
                        />
                      </div>

                    </div>

                  </div>
                  <hr />
                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-6 col-md-3 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="vrCartao"
                          label="Valor Cartão"
                          value={vrCartao}
                          onChangeModal={(e) => setVrCartao(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="qtdParcelas"
                          label="Qtd Parcelas"
                          value={qtdParcelas}
                          onChangeModal={(e) => setQtdParcelas(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          type={'date'}
                          id="dataParcela1"
                          label="Data 1ª Parcela"
                          value={dataParcela1}
                          onChangeModal={(e) => setDataParcela1(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <ButtonType
                          cor={incluirCartao2 ? 'success' : 'danger'}
                          textButton={incluirCartao2 ? 'Retirar Cartão 2' : 'Incluir Cartão 2'}

                          onClickButtonType={handleClickCartão2}
                        />
                      </div>

                    </div>

                  </div>

                  <hr />

                  {/* Início Cartão 2 */}
                  {incluirCartao2 && (
                    <>
                      <div className="form-group">
                        <div className="row">
                          <div class="col-sm-6 col-md-6 col-xl-6">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="dsTipoPagamaentoTEF2"
                              label="Descrição Cartão TEF 2"
                              value={dsTipoPagamentoTEF2}
                              onChangeModal={(e) => setDsTipoPagamentoTEF2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="nuOperacao2"
                              label="NSU_CTF 2"
                              value={nuOperacao2}
                              onChangeModal={(e) => setNuOperacao2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="nuAutorizacao2"
                              label="Nº Autorização 2"
                              value={nuAutorizacao2}
                              onChangeModal={(e) => setNuAutorizacao2(e.target.value)}
                            />
                          </div>

                        </div>

                      </div>
                      <hr />
                      <div className="form-group">
                        <div className="row">
                          <div class="col-sm-6 col-md-3 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              id="vrCartao2"
                              label="Valor Cartão 2"
                              value={vrCartao2}
                              onChangeModal={(e) => setVrCartao2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'number'}
                              id="qtdParcelas2"
                              label="Qtd Parcelas 2"
                              value={qtdParcelas2}
                              onChangeModal={(e) => setQtdParcelas2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'date'}
                              id="dataParcela2"
                              label="Data 1ª Parcela 2"
                              value={dataParcela2}
                              onChangeModal={(e) => setDataParcela2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <ButtonType
                              cor={incluirCartao3 ? 'warning' : 'success'}
                              textButton={incluirCartao3 ? 'Retirar Cartão 3' : 'Incluir Cartão 3'}

                              onClickButtonType={handleClickCartão3}
                            />
                          </div>

                        </div>

                      </div>
                      <hr />
                    </>
                  )}

                  {/* Fim Cartão 2 */}

                  {/* Início Cartão 3 */}

                  {incluirCartao3 && (
                    <>
                      <div className="form-group">
                        <div className="row">
                          <div class="col-sm-6 col-md-6 col-xl-6">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="dsTipoPagamaentoTEF3"
                              label="Descrição Cartão TEF 3"
                              value={dsTipoPagamentoTEF3}
                              onChangeModal={(e) => setDsTipoPagamentoTEF3(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="nuOperacao3"
                              label="NSU_CTF 3"
                              value={nuOperacao3}
                              onChangeModal={(e) => setNuOperacao3(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="nuAutorizacao3"
                              label="Nº Autorização 3"
                              value={nuAutorizacao3}
                              onChangeModal={(e) => setNuAutorizacao3(e.target.value)}
                            />
                          </div>

                        </div>

                      </div>
                      <hr />
                      <div className="form-group">
                        <div className="row">
                          <div class="col-sm-6 col-md-3 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'text'}
                              id="vrCartao3"
                              label="Valor Cartão 3"
                              value={vrCartao3}
                              onChangeModal={(e) => setVrCartao3(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'number'}
                              id="qtdParcelas3"
                              label="Qtd Parcelas 3"
                              value={qtdParcelas3}
                              onChangeModal={(e) => setQtdParcelas3(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'date'}
                              id="dataParcela3"
                              label="Data 1ª Parcela 3"
                              value={dataParcela3}
                              onChangeModal={(e) => setDataParcela3(e.target.value)}
                            />
                          </div>

                        </div>

                      </div>
                      <hr />
                    </>
                  )}

                  {/* Fim Cartão 3 */}

                  {/* Início POS  */}

                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-6 col-md-6 col-xl-6">

                        <InputFieldModal
                          className="form-control input"
                          type={'text'}
                          id="dsTipoPagamaentoPOS"
                          label="Descrição POS"
                          value={dsTipoPagamentoPOS}
                          onChangeModal={(e) => setDsTipoPagamentoPOS(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          type={"text"}
                          id="nuOperacaoPOS"
                          label="NSU_CTF "
                          value={nuOperacaoPOS}
                          onChangeModal={(e) => setNuOperacaoPOS(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          type={"text"}
                          id="nuAutorizacaoPOS"
                          label="Nº Autorização "
                          value={nuAutorizacaoPOS}
                          onChangeModal={(e) => setNuAutorizacaoPOS(e.target.value)}
                        />
                      </div>

                    </div>

                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-6 col-md-3 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="vrPos"
                          type={"text"}
                          label="Valor POS"
                          value={vrPos}
                          onChangeModal={(e) => setVrPos(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          id="qtdParcelasPOS"
                          type={"number"}
                          label="Qtd Parcelas"
                          value={qtdParcelasPOS}
                          onChangeModal={(e) => setQtdParcelasPOS(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <InputFieldModal
                          className="form-control input"
                          type={'date'}
                          id="dataParcelaPOS"
                          label="Data 1ª Parcela"
                          value={dataParcelaPOS}
                          onChangeModal={(e) => setDataParcelaPOS(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-6 col-xl-3">

                        <ButtonType
                          cor={incluirPos2 ? 'warning' : 'success'}
                          textButton={incluirPos2 ? 'Retirar POS 2' : 'Incluir POS 2'}

                          onClickButtonType={handleClickPos2}
                        />
                      </div>

                    </div>

                  </div>

                  {/* Fim POS  */}
                  <hr />

                  {/* Início POS  2*/}

                  {incluirPos2 && (
                    <>

                      <div className="form-group">
                        <div className="row">
                          <div class="col-sm-6 col-md-6 col-xl-6">

                            <InputFieldModal
                              className="form-control input"
                              type={"text"}
                              id="dsTipoPagamaentoPOS2"
                              label="Descrição POS 2"
                              value={dsTipoPagamentoPOS2}
                              onChangeModal={(e) => setDsTipoPagamentoPOS2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={"text"}
                              id="nuOperacaoPOS2"
                              label="NSU_CTF 2"
                              value={nuOperacaoPOS2}
                              onChangeModal={(e) => setNuOperacaoPOS2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={"text"}
                              id="nuAutorizacaoPOS2"
                              label="Nº Autorização 2"
                              value={nuAutorizacaoPOS2}
                              onChangeModal={(e) => setNuAutorizacaoPOS2(e.target.value)}
                            />
                          </div>

                        </div>

                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div class="col-sm-6 col-md-3 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={"text"}
                              id="vrPos2"
                              label="Valor POS 2"
                              value={''}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={"number"}
                              id="qtdParcelasPOS2"
                              label="Qtd Parcelas 2"
                              value={qtdParcelasPOS2}
                              onChangeModal={(e) => setQtdParcelasPOS2(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6 col-md-6 col-xl-3">

                            <InputFieldModal
                              className="form-control input"
                              type={'date'}
                              id="dataParcelaPOS2"
                              label="Data 1ª Parcela 2"
                              value={dataParcelaPOS2}
                              onChangeModal={(e) => setDataParcelaPOS2(e.target.value)}
                            />
                          </div>


                        </div>

                      </div>
                    </>
                  )}

                  {/* Fim POS  2*/}

                  <hr />
                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-6 col-md-4 col-xl-4">

                        <InputFieldModal
                          className="form-control input"
                          readOnly={true}
                          label="Valor Voucher"
                          value={vrVoucher}
                          onChangeModal={(e) => setVrVoucher(e.target.value)}
                        />
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-4">

                        <InputFieldModal
                          className="form-control input"
                          readOnly={true}
                          label="Nº Voucher"
                          value={nuVoucher}
                          onChangeModal={(e) => setNuVoucher(e.target.value)}
                        />
                      </div>


                    </div>

                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div class="col-sm-12">

                        <InputFieldModal
                          className="form-control input"
                          id={"motivoAlteracao"}
                          type={"text"}
                          label="Motivo da Alteração"
                          value={motivoAlteracao}
                          onChangeModal={(e) => setMotivoAlteracao(e.target.value)}
                        />
                      </div>



                    </div>

                  </div>

                </form>
              </>
            )}
          </Modal.Body>

          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}

            ButtonTypeCadastrar={ButtonTypeModal}
            onClickButtonCadastrar={''}
            textButtonCadastrar={"Finalizar Alteração de Pagamentos"}
            corCadastrar={"success"}
          />
        </div>
      </Modal>
    </Fragment>
  )
}