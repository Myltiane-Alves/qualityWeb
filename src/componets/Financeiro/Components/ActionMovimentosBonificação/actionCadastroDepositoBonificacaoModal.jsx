import React, { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { get, post } from "../../../../api/funcRequest";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import Select from 'react-select';


export const ActionCadastroDepositoBonificacaoModal = ({ show, handleClose, }) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [statusSelecionada, setStatusSelecionada] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [vrDesposito, setVrDesposito] = useState('');
  const [txtHistorico, setTxtHistorico] = useState('');
  const [optionsFuncionarios, setOptionsFuncionarios] = useState([]);

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

  useEffect(() => {
    getListaFuncionarios()
  }, [])

  const getListaFuncionarios = async () => {
    try {
      const response = await get(`funcionarios`,)
      if (response.data) {
        setOptionsFuncionarios(response.data)
      }
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }


  const getIPUsuario = async () => {
    const response = await fetch('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }


  const onSubmit = async () => {
    let textFuncao = 'INFORMATICA/EDIÇÃO DE ATUALIZAÇÃO DIÁRIA DOS PDVs DA EMPRESA';

    const data = {
      IDFUNCIONARIO: usuarioLogado.NOFUNCIONARIO,
      TIPOMOVIMENTO: tipoSelecionado,
      VRMOVIMENTO: vrDesposito,
      OBSERVACAO: txtHistorico,
      IDFUNCIONARIORESP: usuarioLogado.id
    }

   
    const response = await post('/movimento-saldo-bonificacao', data)
    .then(response => {
        
      console.log(response, 'despesa cadastrada com sucesso front end!')
    })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

    const postData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: `FINANCEIRO/EMPRESAS/ALTERACAO CONFIGURACAO PIX IDEMPRESA: ${dadosPixPDV[0]?.IDEMPRESA}`,
      DADOS: dados,
      IP: ipUsuario
    }

    .catch (error => {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
        showConfirmButton: false,
        timer: 1500 
      });
      console.log(error)
    })

    const responsePost = await post('/logWeb', postData)
    return responsePost;
  }

  const OptionsStatus = [
    
    { id: 0, value: "True", label: "Crédito" },
    { id: 1, value: "False", label: "Débito" },
  ]

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

        <div style={{ padding: "10px" }}>

          <HeaderModal
            title={"Dados do Depósito Funcionário"}
            subTitle={"Cadastrar Depósitos Bonificação Funcionário"}
            handleClose={handleClose}
          />

          <Modal.Body>

            <div class="form-group">
              <div class="row">
                <div class="col-sm-6 col-xl-12">
                  <InputFieldModal
                    className="form-control input"
                    readOnly={true}
                    label="Funcionário"
                    value={usuarioLogado?.NOFUNCIONARIO}
                  />

                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-sm-6 col-xl-6">
                  <label htmlFor="">Tipo</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={tipoSelecionado}
                    onChangeModal={(e) => setTipoSelecionado(e.target.value)}
                    name="color"
                    options={OptionsStatus}
                  />
                </div>
                <div class="col-sm-6 col-xl-6">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    label="Valor (R$)"
                    value={vrDesposito}
                    onChangeModal={(e) => setVrDesposito(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="col-12">
                <InputFieldModal
                  id="VrValorDesconto"
                  type="text"
                  className="form-control input"
                  label="Histórico"
                  placeholder="digite o histórico do depósito..."
                  value={txtHistorico}
                  onChangeModal={(e) => setTxtHistorico(e.target.value)}
                />
              </div>
            </div>

          </Modal.Body>
          <FooterModal

            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}

            ButtonTypeCadastrar={ButtonTypeModal}
            onClickButtonCadastrar={handleSubmit(onSubmit)}
            textButtonCadastrar={"Cadastrar"}
            corCadastrar={"success"}

          />
        </div>
      </Modal>
    </Fragment>
  )

}