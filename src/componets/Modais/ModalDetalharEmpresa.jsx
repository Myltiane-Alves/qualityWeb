import React, { Fragment } from "react"
import { HeaderModal } from "./HeaderModal/HeaderModal"
import Modal from 'react-bootstrap/Modal';
import { FooterModal } from "./FooterModal/footerModal";
import { InputSelect } from "../Buttons/InputSelect";
import { InputFieldModal } from "../Buttons/InputFieldModal";

export const ModalDetalharEmpresa = ({ handleClose, show }) => {

  const options = [
    { value: 0, label: "Opção 1" },
    { value: 1, label: "Opção 2" },
    // Adicione outras opções conforme necessário
  ]


  return (

    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade"
        id="detalheEmpresa"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        data-backdrop="static"
        size="lg"
      >



        <HeaderModal
          title="Dados da Empresa aqui"
          subTitle="Nome da Loja"
          handleClose={handleClose}
        />
        {/* <form id="formDetalharEmpresa" name="formDetalharEmpresa" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
        <form id="formDetalharEmpresa" name="formDetalharEmpresa" method="post" encType="multipart/form-data" >

          <div class="modal-body" id="resultadoModalDetalheEmpresa">

            <div class="row">
              <div class="col-sm-4 col-xl-4">
                <InputSelect
                  name="IdGrupoEmpresarial"
                  id="IdGrupoEmpresarial"
                  label="Grupo Empresarial"
                  options={options}
                  readOnly={true}
                />
              </div>
              <div class="col-sm-4 col-xl-4">
                <InputSelect
                  name="IdGrupoEmpresarial"
                  id="IdGrupoEmpresarial"
                  label="Situação"
                  options={options}
                  readOnly={true}
                />
              </div>
              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="dataCriacao"
                  type="date"
                  className="form-control input"
                  readOnly={true}
                  label="Data de Criação"
                />
              </div>
            </div>

    

            <div class="row mt-4">
              <div class="col-sm-12 col-xl-12">
                <InputFieldModal
                  id="nomeFantasia"
                  type="text"
                  readOnly={true}
                  label="Nome Fantasia"
                />
              </div>
            </div>

            <div className="row mt-4">
              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="cep"
                  type="text"
                  readOnly={true}
                  label="CEP"
                />
              </div>
              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="endereco"
                  type="text"
                  readOnly={true}
                  label="Endereço"
                />
              </div>
              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="complemento"
                  type="text"
                  readOnly={true}
                  label="Complemento"
                />
              </div>

            </div>

            <div className="row mt-4">

              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="bairro"
                  type="text"
                  readOnly={true}
                  label="Bairro"
                />
              </div>
              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="cidade"
                  type="text"
                  readOnly={true}
                  label="Cidade"
                />
              </div>
              <div class="col-sm-4 col-xl-4">
                <InputFieldModal
                  id="estado"
                  type="text"
                  readOnly={true}
                  label="Estado"
                />
              </div>
            </div>
            <div className="row mt-4">


              <div class="col-sm-6 col-xl-6">
                <InputFieldModal
                  id="email"
                  type="text"
                  readOnly={true}
                  label="E-mail"
                />
              </div>

              <div class="col-sm-6 col-xl-6">
                <InputFieldModal
                  id="telefone"
                  type="text"
                  readOnly={true}
                  label="Telefone"
                />
              </div>
            </div>
      
          </div>


          <FooterModal handleClose={handleClose} />
        </form>


      </Modal>
    </Fragment>
  )

}