import React, { Fragment, useState } from "react"

import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "./HeaderModal/HeaderModal";
import { FooterModal } from "./FooterModal/footerModal";
import { InputSelect } from "../Buttons/InputSelect";
import { InputFieldModal } from "../Buttons/InputFieldModal";

export const ModalCadValeTransporte = ({ show, handleClose }) => {
  const options = [
    { value: "Funcionario 1", label: "Funcionario 1" },
    { value: "Funcionario 2", label: "Funcionario 2" },
  ]
  return (

    <Fragment>
      <Modal show={show} onHide={handleClose} size="lg" className="modal fade" id="CadadiantamentoSalario" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="" role="document">
          <div className="">
            <HeaderModal
              title="Dados do Vale Transporte"
              subTitle="Cadastrar Vale Transporte da Loja"
              handleClose={handleClose}
            />
            {/* <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" >
              <Modal.Body>

                <div id="resultadovaletransp"></div>

                <div className="form-group">

                  <div className="row">
                    
                    <InputFieldModal
                        label={"Empresa"}
                        type="text"
                        // id="nomeempValeTransp"
                        readOnly={true}
                      />
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-3">
                    
                      <InputFieldModal
                        label={"Data do Vale"}
                        type="date"
                        // id="DTDespesaValeTransp"
                        readOnly={false}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <InputFieldModal
                        label={"Hora do Vale"}
                        type="time"
                        // id="HRDespesaValeTransp"
                        readOnly={false}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">
                      <InputFieldModal
                        label={"Despesa"}
                        type="text"
                        // id="IDCategoriaReceitaDespesaValeTransp"
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-6">
                
                      <InputFieldModal
                        label={"Histórico"}
                        type="text"
                        // id="DsHistorioValeTransp"
                        readOnly={false}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">
                     
                      <InputSelect
                        label={"Funcionário"}
                        type="select"
                        // id="IDFuncionario"
                        options={options}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-4">              
                      <InputFieldModal
                        label={"Valor do Vale Transporte"}
                        type="text"
                        value={"R$ 0,00"}
                        // id="VrDespesaValeTransp"
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

                {/* <div className="modal-footer" id="footeradiantamentosalario">
                  <button id="buttonadiantamentosal" type="button" className="btn btn-success" onclick="cadastrar_adiantamento()">Cadastrar</button>
                  <button id="buttonadiantamentosal" type="button" className="btn btn-success" >Cadastrar Vale Transporte</button>
                  <button type="button" onClick={handleClose} className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div> */}

                <FooterModal
                  handleClose={handleClose}
                />
              </Modal.Body>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  )

}
