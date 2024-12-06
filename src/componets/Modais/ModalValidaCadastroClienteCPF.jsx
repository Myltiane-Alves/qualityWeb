import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { InputFieldModal } from "../Buttons/InputFieldModal";
import { FooterModal } from "./FooterModal/footerModal";
import { HeaderModal } from "./HeaderModal/HeaderModal";

export default function ValidaCadastroClienteCPFModal({ show, handleCloseModalValidaCadastroClientCPF}) {
  return (
    <Fragment>

      <Modal show={show} onHide={handleCloseModalValidaCadastroClientCPF} size="lg">
        <HeaderModal
          title={"Cadastro do Cliente"}
          subTitle={"Cadastro e atualização de dados do Cliente"}
          handleClose={handleCloseModalValidaCadastroClientCPF}
        />
        <form id="formDetClienteVoucher" name="formDetClienteVoucher" method="post" enctype="multipart/form-data" onsubmit="return false;">
          <Modal.Body>
            <div id="notificacaoModalCadastroCliente"></div>
            <div className="modal-body" id="resultadoModalCadCliente"><div className="form-group" onsubmit="return false">

              <div className="input-group">
                <input type="hidden" id="idEmpresa" name="idEmpresa" className="form-control input" value="" />
              </div>

              <div className="row">
                <div className="col-sm-3 col-xl-2">
                  <InputFieldModal
                    label={"ID"}
                    type="text"
                    id={"idClienteEmpresa"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-3">
                  <InputFieldModal
                    label={"Tipo *"}
                    type="text"
                    id={"tipoClienteEmpresa"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"CPF*"}
                    type="text"
                    id={"CPFCNPJ"}
                    value={""}
                  />
                </div>

               
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Nome*"}
                    type="text"
                    id={"CPFCNPJ"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Sobrenome*"}
                    type="text"
                    id={"CPFCNPJ"}
                    value={""}
                  />
                </div>

              </div>

              <div className="row mt-3">
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Data do Cadastro*"}
                    type="date"
                    id={"DataCadastro"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Data de Nascimento*"}
                    type="date"
                    id={"DataCadastro"}
                    value={""}
                  />
                </div>
              
              </div>

              <div className="row mt-3">
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Telefone"}
                    type="text"
                    id={"TelefoneCliente"}
                    value={""}
                  />
                </div>
               
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"E-mail"}
                    type="email"
                    id={"email"}
                    value={""}
                  />
                </div>
              </div>
            </div> 

              <div className="form-group" onsubmit="return false">
                <div className="row">
                  <div className="col-sm-2 col-xl-2">
                    <InputFieldModal
                    label={"CEP*"}
                    type="text"
                    id={"NuCEP"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                    label={"Endereço*"}
                    type="text"
                    id={"Endereco"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-1 col-xl-2">
                    <InputFieldModal
                    label={"Número*"}
                    type="text"
                    id={"NuEndereco"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-5 col-xl-4">
                    <InputFieldModal
                    label={"Complemento"}
                    type="text"
                    id={"Complemento"}
                    value={""}
                  />
                  </div>
                </div>

                <div className="row mt-3" >
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                    label={"Bairro*"}
                    type="text"
                    id={"Bairro"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-2 col-xl-2">
                    <InputFieldModal
                    label={"Nº IBGE*"}
                    type="text"
                    id={"NuIBGE"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                    label={"Cidade*"}
                    type="text"
                    id={"Cidade"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-2 col-xl-2">
                    <InputFieldModal
                    label={"Estado*"}
                    type="text"
                    id={"Estado"}
                    value={""}
                  />
                  </div>
                </div>

                <small><b>Campos Obrigatórios*</b></small>

              </div></div>
 
            <FooterModal handleClose={handleCloseModalValidaCadastroClientCPF} />
          </Modal.Body>
        </form>
      </Modal>
    </Fragment>
  )
}