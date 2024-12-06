import React, { Fragment, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { post } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import { mascaraCPF, removerMascaraCPF } from "../../../../utils/formatCPF";
import { get } from "../../../../api/funcRequest";
import { useForm } from "react-hook-form";
import axios from "axios";
export const ActionCadastroClienteVoucherCNPJ = ({show, handleClose}) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [idCliente, setIdCliente] = useState('');
  const [tipo, setTipo] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeClienteRazao, setNomeClienteRazao] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [numeroComercial, setNumeroComercial] = useState('');
  const [email, setEmail] = useState('');
  const [tipoIndicacaoIE, setTipoIndicacaoIE] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState(''); 
  const [nuIBGE, setNuIBGE] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cpfFuncionario, setCpfFuncionario] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [IE, setIE] = useState('');
  const [IM, setIM] = useState('');
  const [cnae, setCNAE] = useState('');
  const [telefoneComercial, setTelefoneCormercial] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataAtual = getDataAtual()
    setDataCadastro(dataAtual)
   
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
  
  }, [usuarioLogado]);

  useEffect(() => {
    if (cep.length === 8) {
      getCEP();
    }

  }, [cep]);

  const getCEP = async () => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    if (response.data) {
      setCep(response.data.cep);
      setEndereco(response.data.logradouro);
      setComplemento(response.data.complemento);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
      setNuIBGE(response.data.ibge);
   
    }
    return response.data;
  };

  const { data: optionsCPF = [], error: errorCPF, isLoading: isLoadingCPF } = useQuery(
    ['clientes', cpf],
    async () => {
      const response = await get(`/clientes?cpfoucnpj=${removerMascaraCPF(cpf)}`);
      console.log(response.data, 'response.data');
      return response.data;
    },
    { enabled: cpf?.length >= 8, staleTime: 5 * 60 * 1000 }
  );
  useEffect(() => {
    if(optionsCPF.length > 0) {
      setIdCliente(optionsCPF[0]?.IDCLIENTE);
      setEmpresa(optionsCPF[0]?.IDEMPRESA);
      setDataCadastro(optionsCPF[0]?.DTCADASTRO);
      setCpf(optionsCPF[0]?.NUCPFCNPJ);
      setNomeClienteRazao(optionsCPF[0]?.DSNOMERAZAOSOCIAL);
      setSobrenome(optionsCPF[0]?.DSAPELIDONOMEFANTASIA);
      setDataNascimento(optionsCPF[0]?.DTNASCFUNDACAO);
      setTelefoneCliente(optionsCPF[0]?.NUTELCELULAR);
      setEmail(optionsCPF[0]?.EEMAIL);
      setCep(optionsCPF[0]?.NUCEP);
      setEndereco(optionsCPF[0]?.EENDERECO);
      setNumero(optionsCPF[0]?.NUENDERECO);
      setComplemento(optionsCPF[0]?.ECOMPLEMENTO);
      setBairro(optionsCPF[0]?.EBAIRRO);
      setNuIBGE(optionsCPF[0]?.NUIBGE);
      setCidade(optionsCPF[0]?.ECIDADE);
      setEstado(optionsCPF[0]?.SGUF);
    }
  }, [optionsCPF])

 

  useEffect(() => {
    if (optionsCPF && optionsCPF.length > 0) {
      Swal.fire({
        title: 'Cliente já cadastrado!',
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'custom-swal',
        }
      });
    }
  }, [optionsCPF]);


  const onSubmit = async () => {
    const cpfSemMascara = removerMascaraCPF(cpfFuncionario);

    const putData = {
      IDCLIENTE: parseInt(idCliente),
      IDEMPRESA: parseInt(usuarioLogado?.IDEMPRESA),
      DSNOMERAZAOSOCIAL: cpf - nomeClienteRazao - sobrenome - nomeClienteRazao,
      DSAPELIDONOMEFANTASIA: cpf - sobrenome,
      TPCLIENTE: tipo,
      NUCPFCNPJ: cpfSemMascara.substring(0, 5),
      NURGINSCESTADUAL: IE,
      NUINSCMUNICIPAL: IM,
      NUINSCRICAOSUFRAMA: '',
      TPINDICADORINSCESTADUAL: '',
      STOPTANTESIMPLES: '',
      NUCEP: cep.replace(/\D/g, ""),
      NUIBGE: parseInt(nuIBGE),
      EENDERECO: endereco,
      NUENDERECO: numero,
      ECOMPLEMENTO: complemento,
      EBAIRRO: bairro,
      ECIDADE: cidade,
      SGUF: estado,
      EEMAIL: email,
      NUTELCOMERCIAL: numeroComercial,
      NUTELCELULAR: telefoneCliente.replace(/\D/g, ""),
      DTNASCFUNDACAO: dataNascimento,
      DSOBSERVACAO: '',
      NOCONTATOCLIENTE01: '',
      EEMAILCONTATOCLIENTE01: '',
      FONECONTATOCLIENTE01: '',
      DSCARGOCONTATOCLIENTE01: '',
      NOCONTATOCLIENTE02: '',
      EEMAILCONTATOCLIENTE02: '',
      FONECONTATOCLIENTE02: '',
      DSCARGOCONTATOCLIENTE02: '',
      STATIVO: 'True',
      DTULTALTERACAO: dataCadastro,
    }
    const response = await post('/cadastrar-deposito-loja', putData)
      .then(response => {
    
      })

    const textDados = JSON.stringify(putData)
    let textoFuncao = 'GERENCIA/CADASTRO DE CLIENTE';


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
          title={"Cadastro do Cliente Jurídico"}
          subTitle={"Cadastro e atualização de dados do Cliente"}
          handleClose={handleClose}
        />
       
          <Modal.Body>
      
            <form >
              
              <div className="form-group" >



              <div className="row mt-2" style={{ width: '100%'}}>
                <div className="col-sm-2 col-md-2 col-xl-2">
                  <InputFieldModal
                    label={"ID"}
                    type="text"
                    id={"idClienteEmpresa"}
                    readOnly={true}
                    value={idCliente}
                    onChangeModal={(e) => setIdCliente(e.target.value)}
                  />
                </div>
                <div className="col-sm-2 col-md-2 col-xl-2">
                  <InputFieldModal
                    label={"Tipo *"}
                    type="text"
                    id={"tipoClienteEmpresa"}
                    readOnly={true}
                    placeholder={"CNPJ"}
                    value={tipo}
                    onChangeModal={(e) => setTipo(e.target.value)}
                  />
                </div>
                <div className="col-sm-3 col-md-3 col-xl-2">
                  <InputFieldModal
                    label={"Data do Cadastro *"}
                    type="date"
                    id={"dataCadastro"}
                    value={dataCadastro}
                    onChangeModal={(e) => setDataCadastro(e.target.value)}
                  />
                </div>
                <div className="col-sm-5 col-md-5 col-xl-5" >
                  <InputFieldModal
                    label={"CNPJ*"}
                    type="text"
                    id={"CPFCNPJ"}
                    value={mascaraCPF(cpf)}
                    onChangeModal={(e) => setCpf(e.target.value)}

                  />
                </div>


              </div>

              <div className="row mt-3">
                <div className="col-sm-2 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Inscrição Estadual*"}
                    type="text"
                    id={"Inscrição Estadual"}
                    value={IE}
                    onChangeModal={(e) => setIE(e.target.value)}
                  />
                </div>
                <div className="col-sm-2 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Inscrição Municipal*"}
                    type="text"
                    id={"Inscrição Municipal"}
                    value={IM}
                    onChangeModal={(e) => setIM(e.target.value)}
                  />
                </div>
                <div className="col-sm-5 col-md-3 col-xl-2">
                  <InputFieldModal
                    label={"CNAE*"}
                    type="text"
                    id={"cnae"}
                    value={cnae}
                    onChangeModal={(e) => setCNAE(e.target.value)}
                  />
                </div>

                <div className="col-sm-3 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Data do Cadastro *"}
                    type="date"
                    id={"dataCadastro"}
                    value={dataCadastro}
                    onChangeModal={(e) => setDataCadastro(e.target.value)}
                  />
                </div>

              </div>

              <div className="row mt-3">
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Razão Social*"}
                    type="text"
                    id={"nome"}
                    value={nomeClienteRazao}
                    onChangeModal={(e) => setNomeClienteRazao(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Nome Fantasia*"}
                    type="text"
                    id={"sobrenome"}
                    value={sobrenome}
                    onChangeModal={(e) => setSobrenome(e.target.value)}
                  />
                </div>

              </div>

              <div className="row mt-3">
            
         
                <div className="col-sm-4 col-md-3 col-xl-2">
                  <InputFieldModal
                    label={"Telefone"}
                    type="text"
                    id={"TelefoneCliente"}
                    value={telefoneCliente}
                    onChangeModal={(e) => setTelefoneCliente(e.target.value)}
                  />
                </div>
                <div className="col-sm-4 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Telefone Conmercial"}
                    type="text"
                    id={"TelefoneComercial"}
                    value={telefoneComercial}
                    onChangeModal={(e) => setTelefoneCormercial(e.target.value)}
                  />
                </div>

                <div className="col-sm-4 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"E-mail"}
                    type="email"
                    id={"email"}
                    value={email}
                    onChangeModal={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-sm-5 col-md-3 col-xl-4">
                  <InputFieldModal
                    label={"Tipo Indicação IE"}
                    type="text"
                    id={"tipoIndicacaoIE"}
                    value={tipoIndicacaoIE}
                    onChangeModal={(e) => setTipoIndicacaoIE(e.target.value)}
                  />
                </div>
              </div>
            </div>

              <div className="form-group" >
                <div className="row">
                  <div className="col-sm-2 cold-md-2 col-xl-2">
                    <InputFieldModal
                      label={"CEP*"}
                      type="text"
                      id={"NuCEP"}
                      value={cep}
                      onChangeModal={(e) => setCep(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4 cold-md-4 col-xl-4">
                    <InputFieldModal
                      label={"Endereço*"}
                      type="text"
                      id={"Endereco"}
                      value={endereco}
                      onChangeModal={(e) => setEndereco(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-1 cold-md-2 col-xl-2">
                    <InputFieldModal
                      label={"Número*"}
                      type="text"
                      id={"NuEndereco"}
                      value={numero}
                      onChangeModal={(e) => setNumero(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-5 cold-md-5 col-xl-4">
                    <InputFieldModal
                      label={"Complemento"}
                      type="text"
                      id={"Complemento"}
                      value={complemento}
                      onChangeModal={(e) => setComplemento(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-3" >
                  <div className="col-sm-4 cold-md-4 col-xl-4">
                    <InputFieldModal
                      label={"Bairro*"}
                      type="text"
                      id={"Bairro"}
                      value={bairro}
                      onChangeModal={(e) => setBairro(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2 cold-md-2 col-xl-2">
                    <InputFieldModal
                      label={"Nº IBGE*"}
                      type="text"
                      id={"NuIBGE"}
                      value={nuIBGE}
                      onChangeModal={(e) => setNuIBGE(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4 cold-md-4 col-xl-4">
                    <InputFieldModal
                      label={"Cidade*"}
                      type="text"
                      id={"Cidade"}
                      value={cidade}
                      onChangeModal={(e) => setCidade(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2 cold-md-2 col-xl-2">
                    <InputFieldModal
                      label={"Estado*"}
                      type="text"
                      id={"estado"}
                      value={estado}
                      onChangeModal={(e) => setEstado(e.target.value)}
                    />
                  </div>
                </div>



              </div>
            </form>

            <FooterModal
              ButtonTypeConfirmar={ButtonTypeModal}
              textButtonConfirmar={"Cadastrar"}
              onClickButtonConfirmar={""}
              corConfirmar="success"

              ButtonTypeFechar={ButtonTypeModal}
              onClickButtonFechar={handleClose}
              textButtonFechar={"Fechar"}
              corFechar="secondary"


            />
          </Modal.Body>
    
      </Modal>
    </Fragment>
  )

}




