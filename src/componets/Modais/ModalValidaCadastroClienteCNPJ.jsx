import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "./HeaderModal/HeaderModal";
import { FooterModal } from "./FooterModal/footerModal";
import { InputFieldModal } from "../Buttons/InputFieldModal";

export default function ModalValidaCadastroClienteCNPJ({ show, handleCloseModalValidaCadastroClientCNPJ, showModalValidaCadastroCNPJ}) {
  return (
    <Fragment>

      <Modal show={show} onHide={handleCloseModalValidaCadastroClientCNPJ}  size="xl">
        
        <HeaderModal
          title={"Cadastro do Cliente"}
          subTitle={"Cadastro e atualização de dados do Cliente"}
          handleClose={handleCloseModalValidaCadastroClientCNPJ}
        />
        <form id="formDetClienteVoucher" name="formDetClienteVoucher" method="post" enctype="multipart/form-data" onsubmit="return false;">
          <Modal.Body>
            <div id="notificacaoModalCadastroCliente"></div>
            <div className="modal-body" id="resultadoModalCadCliente"><div className="form-group" onsubmit="return false">

              <div className="input-group">
                <input type="hidden" id="idEmpresa" name="idEmpresa" className="form-control input" value="" />
              </div>

              <div className="row">
                <div className="col-sm-5 col-xl-2">
                  <InputFieldModal
                    label={"ID"}
                    type={"text"}
                    id={"idClienteEmpresa"}
                    readOnly={true}
                  />
                </div>
                <div className="col-sm-3 col-xl-3">
                  <InputFieldModal
                    label={"Tipo *"}
                    value={"CNPJ"}
                    type={"text"}
                    id={"idClienteEmpresa"}
                    readOnly={true}
                  />
                </div>
                <div className="col-sm-3 col-xl-3">
                  <InputFieldModal
                    label={"Data do Cadastro*"}
                    type="date"
                    id={"DataCadastro"}
                    readOnly={true}
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
              
                <InputFieldModal
                  label={"CNPJ*"}
                  type="text"
                  id={"CPFCNPJ"}
                  
                />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-3 col-xl-3">         
                  <InputFieldModal
                    label={"Inscrição Estadual"}
                    type="text"
                    id={"IE"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-3">
                
                  <InputFieldModal
                    label={"Inscrição Municipal"}
                    type="text"
                    id={"IM"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"CNAE*"}
                    type="text"
                    id={"CNAE"}
                    value={""}
                  />
                </div>
                
              </div>

              <div className="row mt-3">
                <div className="col-sm-4 col-xl-4">
                  <InputFieldModal
                    label={"Razão Social"}
                    type="text"
                    id={"NomeClienteRazao"}
                    value={""}
                  />
                </div>
                <div className="col-sm-4 col-xl-4">
                  <InputFieldModal
                    label={"Nome Fantasia*"}
                    type="text"
                    id={"sobrenomeNomeFan"}
                    value={""}
                  />
                </div>
                <div className="col-sm-2 col-xl-3">
                  <InputFieldModal
                    label={"Data de Criação*"}
                    type="date"
                    id={"DataNascimentoCriacao"}
                    value={""}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-3 col-xl-3">
                  <InputFieldModal
                    label={"Telefone"}
                    type="text"
                    id={"TelefoneCliente"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-3">
                  <InputFieldModal
                    label={"Telefone Comercial"}
                    type="text"
                    id={"TelefoneClienteEmpresaComercial"}
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
                  <div className="col-sm-2 col-xl-3">
               
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
                  <div className="col-sm-5 col-xl-5">
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
                  <div className="col-sm-2 col-xl-4">
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
            {/* <div className="modal-footer" id="footerdetClienteVoucher">
              <button id="CadCliente" type="button" className="btn btn-success" onclick="Valida_Cadastro_Cliente()">Cadastrar</button>
              <button type="button" onClick={handleCloseModalValidaCadastroClientCNPJ} className="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div> */}

            <FooterModal handleClose={handleCloseModalValidaCadastroClientCNPJ}/>
          </Modal.Body>
        </form>
      </Modal>
    </Fragment>
  )
}