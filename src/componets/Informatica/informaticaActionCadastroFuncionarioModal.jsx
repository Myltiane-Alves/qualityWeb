import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';

import { InputFieldModal } from "../Buttons/InputFieldModal";
import { FooterModal } from "../Modais/FooterModal/footerModal";
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal";
import { InputSelect } from "../Buttons/InputSelect";

export const InformaticaActionCadastroFuncionarioModal = ({ show, handleClose}) => {
  const options = [
    { value: 0, label: "Todos" },
    { value: 1, label: "Administrador" },
  ]
  return (
    <Fragment>

      <Modal show={show} handleClose={handleClose} size="lg">
        <HeaderModal
          title={"Dados do Funcionário"}
          subTitle={"Cadastrar ou Atualizar informações do Funcionário"}
          handleClose={handleClose}
        />
        
          <Modal.Body>
          

              <div className="row">
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Empresa"}
                    type="text"
                    id={"idEmpresa"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
                  <InputSelect
                      options={options}   
                      label={"Função"}
                      type="select"
                      id=""
                      
                  />
                </div>
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"Tipo *"}
                    type="text"
                    id={"tipoClienteEmpresa"}
                    value={""}
                  />
                </div>

               
              </div>

              <div className="row mt-3">
                <div className="col-sm-3 col-xl-4">
                  <InputFieldModal
                    label={"CPF*"}
                    type="text"
                    id={"CPFCNPJ"}
                    value={""}
                  />
                </div>
                <div className="col-sm-3 col-xl-8">
                  <InputFieldModal
                    label={"Funcionário"}
                    type="text"
                    id={""}
                    value={""}
                  />
                </div>

              </div>         
        
              <div className="row mt-3">
                <div className="">
                  <InputFieldModal
                    label={"Motivo Desconto"}
                    type="text"
                    id={"TelefoneCliente"}
                    value={""}
                  />
                </div>
              </div>

              <div className="form-group" onsubmit="return false">
                <div className="row mt-3">
                  <div className="col-sm-2 col-xl-4">
                    <InputFieldModal
                    label={"Valor Salário"}
                    type="text"
                    id={"ValorSalario"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                    label={"% Desc. Convênio"}
                    type="text"
                    id={""}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-1 col-xl-4">
                    <InputFieldModal
                    label={"Valor Desconto."}
                    type="text"
                    id={""}
                    value={""}
                  />
                  </div>

                </div>

                <div className="row mt-3" >
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                    label={"Senha"}
                    type="text"
                    id={"senha"}
                    value={""}
                  />
                  </div>
                  <div className="col-sm-2 col-xl-4">
                    <InputFieldModal
                    label={"Repita a Senha*"}
                    type="text"
                    id={""}
                    value={""}
                  />
                  </div>

                  <div className="col-sm-2 col-xl-4">
                    <InputSelect
                    label={"Situação*"}
                    type="text"
                    id={"Estado"}
                  
                    options={options}
                  />
                  </div>
                </div>

                <div className="row mt-3">

                  <h4>Campos Obrigatórios*</h4>
                </div>

              </div>
            
 
            <FooterModal handleClose={handleClose} />
          </Modal.Body>
         
        </Modal>
    
    </Fragment>
  )
}