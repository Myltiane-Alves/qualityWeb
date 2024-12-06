import React, { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../Buttons/ButtonTypeModal";
import { FooterModal } from "../Modais/FooterModal/footerModal";
import Select from 'react-select';
import { InputFieldModal } from "../Buttons/InputFieldModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { post, put } from "../../api/funcRequest";
import { useForm } from "react-hook-form";
import { getDataAtual } from "../../utils/dataAtual";


export const InformaticaActionUpdateCaixaModal = ({show, handleClose, dadosListaCaixa}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [empresa, setEmpresa] = useState('');
  const [dsCaixa, setDSCaixa] = useState('');
  const [tipoEmissao, setTipoEmissao] = useState('');
  const [modeloImpressora, setModeloImpressora] = useState('');
  const [portaComunicacao, setPortaComunicacao] = useState('');
  const [numeroSerieProducao, setNumeroSerieProducao] = useState('');
  const [numeroUltimaNFCeProducao, setNumeroUltimaNFCeProducao] = useState('');
  const [tef, setTef] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const [statusLimpar, setStatusLimpar] = useState('');
  const [dataAlteracao, setDataAlteracao] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
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
    const response = await axios.get('http://ipwho.is/');
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  };
  

  useEffect(() => {
    const dataAtual = getDataAtual();
    setDataAlteracao(dataAtual);
    if (dadosListaCaixa) {
      setEmpresa(dadosListaCaixa[0]?.NOFANTASIA);
      setDSCaixa(dadosListaCaixa[0]?.DSCAIXA);
      setTipoEmissao(dadosListaCaixa[0]?.TBEMISSAOFISCAL);
      setModeloImpressora(dadosListaCaixa[0]?.NOIMPRESSORA);
      setPortaComunicacao(dadosListaCaixa[0]?.DSPORTACOMUNICACAO);
      setNumeroSerieProducao(dadosListaCaixa[0]?.NUSERIEPROD);
      setNumeroUltimaNFCeProducao(dadosListaCaixa[0]?.NUNFCEPROD);
      setTef(dadosListaCaixa[0]?.STTEF);
      setStatusSelecionado(dadosListaCaixa[0]?.STATUALIZA);
      setStatusLimpar(dadosListaCaixa[0]?.STLIMPA);
    }
  }, [dadosListaCaixa]);

  const onSubmit = async (data) => {
    const putData = {
      IDCAIXAWEB: dadosListaCaixa[0]?.IDCAIXAWEB,
      DSCAIXAWEB: dsCaixa,
      TBEMISSAOFISCAL: tipoEmissao,
      NOIMPRESSORA: modeloImpressora,
      DSPORTACOMUNICACAO: portaComunicacao,
      NUSERIEPROD: numeroSerieProducao,
      NUNFCEPROD: numeroUltimaNFCeProducao,
      DTULTALTERACAO: dataAlteracao,
      STTEF: tef,
      STATUALIZA: statusSelecionado,
      STLIMPA: statusLimpar
    };

    try {
      const response = await put('/lista-caixas/:id', putData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Caixa atualizado com sucesso!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });

      const textDados = JSON.stringify(putData);
      let textoFuncao = 'INFORMATICA/EDIÇÃO DE CAIXA';

      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario,
      };

      const responsePost = await post('/log-web', postData);

      return responsePost.data;
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro ao atualizar Caixa!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  const atualizacaoDiario = [
    { value: "True", label: "SIM" },
    { value: "False", label: "NÃO" }
  ]
 
  const optionsNota = [
    { value: "NFCE", label: "NFCE" },
    { value: "NFE", label: "NFCE" }
  ]

  const optionsImpressoras = [
    { value: "ppEscPosEpson", label: "ppEscPosEpson", selected: false },
    { value: "ppEscBematech", label: "ppEscBematech", selected: false },
    { value: "ppEscDaruma", label: "ppEscDaruma", selected: false },
    { value: "ppEscDiebold", label: "ppEscDiebold", selected: false },
    { value: "ppEscElgin", label: "ppEscElgin", selected: false },
    { value: "ppTexto", label: "ppTexto", selected: false }
  ];

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

        <HeaderModal
          title={"Dados do Caixa - PDV"}
          subTitle={"Atualizar informações do Caixa - PDV"}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form  onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">

              <div className="row">
                <div className="col-sm-6 col-md-6 col-xl-6">
                
                  <InputFieldModal 
                    type="text"
                    className="form-control input"
                    label="Empresa"
                    readOnly={false}
                    value={empresa}
                    onChangeModal={(e) => setEmpresa(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 col-md-6 col-xl-6">
                  <InputFieldModal 
                    type="text"
                    className="form-control input"
                    label="Nº - Descrição do Caixa"
                    readOnly={false}
                    value={dsCaixa}
                    onChangeModal={(e) => setDSCaixa(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-md-12 col-xl-12">
                  <div className="alert alert-primary" role="alert"><strong>Controles Fiscais</strong></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <label className="form-label" htmlFor="tipemissao">Tipo de Emissão da Nota</label>

                  <Select
                    closeMenuOnSelect={false}
                    options={optionsNota.map((item) => {
                      return {
                        value: item.value, 
                        label: item.label
                      };
                    })}
                    value={optionsNota.find(option => option.value === tipoEmissao)}
                    onChange={(selectedOption) => setTipoEmissao(selectedOption?.value)}
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-xl-4">
                  <label className="form-label" htmlFor="modimpressao">Modelos de Impressoras</label>
                
                  <Select
                      closeMenuOnSelect={false}
                      options={optionsImpressoras.map((item) => {
                        return {
                          value: item.value, 
                          label: item.label
                        };
                      })}
                      value={optionsImpressoras.find(option => option.value === modeloImpressora)}
                      onChange={(selectedOption) => setModeloImpressora(selectedOption?.value)}
                  />
                </div>
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal 
                    type="text"
                    className="form-control input"
                    label="Porta Comunicação"
                    readOnly={false}
                    value={portaComunicacao}
                    onChangeModal={(e) => setPortaComunicacao(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal 
                    type="text"
                    className="form-control input"
                    readOnly={false}
                    label="Nº Série Produção"
                    value={numeroSerieProducao}
                    onChangeModal={(e) => setNumeroSerieProducao(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal 
                    type="text"
                    className="form-control input"
                    readOnly={false}
                    value={numeroUltimaNFCeProducao}
                    onChangeModal={(e) => setNumeroUltimaNFCeProducao(e.target.value)}
                    label="Nº Última NFCe Produção"
                  />
                </div>
                <div className="col-sm-6 col-md-2 col-xl-2">
                  <label className="form-label" htmlFor="sttef">TEF</label>
      
                  <Select
                     closeMenuOnSelect={false}
                     options={atualizacaoDiario.map((item) => {
                       return {
                         value: item.value, 
                         label: item.label
                       };
                     })}
                     value={atualizacaoDiario.find(option => option.value === tef)}
                     onChange={(selectedOption) => setTef(selectedOption?.value)}
                  />
                </div>
                <div className="col-sm-6 col-md-2 col-xl-2">
                  <label className="form-label" htmlFor="statualiza">Atualizar</label>
                  <Select
                     closeMenuOnSelect={false}
                     options={atualizacaoDiario.map((item) => {
                       return {
                         value: item.value, 
                         label: item.label
                       };
                     })}
                     value={atualizacaoDiario.find(option => option.value === statusSelecionado)}
                     onChange={(selectedOption) => setStatusSelecionado(selectedOption?.value)}
                  />
                </div>
                <div className="col-sm-6 col-md-2 col-xl-2">
                  <label className="form-label" htmlFor="stlimpa">Limpar</label>
              
                  <Select
                     closeMenuOnSelect={false}
                     options={atualizacaoDiario.map((item) => {
                       return {
                         value: item.value, 
                         label: item.label
                       };
                     })}
                     value={atualizacaoDiario.find(option => option.value === statusLimpar)}
                     onChange={(selectedOption) => setStatusLimpar(selectedOption?.value)}
                  />
                </div>
              </div>
            </div>
      
        </form>
      </Modal.Body>
      <FooterModal
        ButtonTypeCadastrar={ButtonTypeModal}
        textButtonCadastrar={"Atualizar"}
        onClickButtonCadastrar={onSubmit}
        corCadastrar="success"

        ButtonTypeFechar={ButtonTypeModal}
        textButtonFechar={"Fechar"}
        onClickButtonFechar={handleClose}
        corFechar="secondary"

      />
      </Modal>
    </Fragment>
  )
}                      
