import React, { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import Modal from 'react-bootstrap/Modal';
import { InputFieldModal } from "../Buttons/InputFieldModal";
import { InputSelect } from "../Buttons/InputSelect";
import { ButtonType } from "../Buttons/ButtonType";
import { ButtonTypeModal } from "../Buttons/ButtonTypeModal";
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../Modais/FooterModal/footerModal";

export const ModalCadastroDeDepositoDaLoja = ({ show, handleClose }) => {
  const options = [
    { value: "Funcionario 1", label: "Funcionario 1" },
    { value: "Funcionario 2", label: "Funcionario 2" },
  ]
  return (

    <Fragment>
      <Modal show={show} onHide={handleClose} size="lg" className="modal fade" id="cadDeposito" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="" role="document">
          <div className="modal-content">

              <HeaderModal 
                title={"Dados do Depósito da Loja"}
                subTitle={"Cadastrar Depósitos da Loja"}
                handleClose={handleClose}
              />
            
            {/* <form id="formDepositoLoja" name="formDepositoLoja" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formDepositoLoja" name="formDepositoLoja" method="post" encType="multipart/form-data" >
              <Modal.Body>

                <div id="resultadodeposito"></div>

                <div className="form-group">
                  <div className="row">
                    <input type="hidden" name="STAtivoDeposito" id="STAtivoDeposito" value="True" />
                    <input type="hidden" name="STCancelaDeposito" id="STCancelaDeposito" value="False" />
                    <input type="hidden" name="IDEmpresaDeposito" id="IDEmpresaDeposito" value="" />
                    <input type="hidden" name="IDFuncDeposito" id="IDFuncDeposito" value="" />
                    <input type="hidden" name="IDDeposito" id="IDDeposito" value="" />
                    <div className="col-sm-6 col-xl-10">
                    
                      <InputFieldModal
                        label={"Empresa"}
                        type="text"
                        // id={id}
                        readOnly={true}
                        
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-3">
                 
                      <InputFieldModal
                        label={"Data Depósito"}
                        type="date"
                        // id="dtdeposito"
                        readOnly={true}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-3">
                    
                      <InputFieldModal
                        label={"Hora Depósito"}
                        type="time"
                        // id="idhrdeposito"
                        readOnly={true}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">   
                      <InputSelect
                        label={"Conta"}
                        type="select"
                        // id="IDContaBanco"
                        options={options}
                      />
                      
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-8">
                     
                      <InputFieldModal
                        label={"Histórico"}
                        type="text"
                        // id="DsHistorio"
                        readOnly={false}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-4">
                     
                      <InputFieldModal
                        label={"Nº Doc Depósito"}
                        type="text"
                        // id="NuDocDeposito"
                        readOnly={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-4">
                      
                      <InputFieldModal
                        label={"Valor Depósito"}
                        type="text"
                        value={"R$ 0,00"}
                        // id="VrDeposito"
                        readOnly={false}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-4">
                     
                      <InputFieldModal
                        label={"Data Movimento de Caixa"}
                        type="date"
                        // id="DTMovimentoCaixa"
                        readOnly={false}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-4">
                   
                      <InputFieldModal
                        label={"Hora Movimento de Caixa"}
                        type="time"
                        // id="HRMovimentoCaixa"
                        readOnly={false}
                      />
                    
                    
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-12">
                      <div id="tudo"></div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
             <FooterModal handleClose={handleClose} />
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  )

}
