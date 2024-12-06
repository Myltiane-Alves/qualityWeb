import React, { Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../Modais/HeaderModal/HeaderModal";
import { InputFieldModal } from "../../Buttons/InputFieldModal";
import { ButtonTypeModal } from "../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../Modais/FooterModal/footerModal";
import { mascaraCPF } from "../../../utils/formatCPF";
import { useForm } from "react-hook-form";
import { useCadastroClienteVoucherCNPJ } from "../../../hooks/useCadastroClienteVoucherCNPJ";

export const ActionCadastroClienteVoucherCNPJ = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {
    idCliente,
    tipo,
    dataCadastro,
    cpf,
    nomeClienteRazao,
    sobrenome,
    telefoneCliente,
    email,
    tipoIndicacaoIE,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    nuIBGE,
    cidade,
    estado,
    IE,
    IM,
    cnae,
    telefoneComercial,
    setIdCliente,
    setTipo,
    setDataCadastro,
    setCpf,
    setNomeClienteRazao,
    setSobrenome,
    setTelefoneCliente,
    setEmail,
    setTipoIndicacaoIE,
    setCep,
    setEndereco,
    setNumero,
    setComplemento,
    setBairro,
    setNuIBGE,
    setCidade,
    setEstado,
    setIE,
    setIM,
    setCNAE,
    setTelefoneCormercial,
    onSubmit,
  } = useCadastroClienteVoucherCNPJ();

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
              <div className="row mt-2" style={{ width: '100%' }}>
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
            onClickButtonConfirmar={handleSubmit(onSubmit)}
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