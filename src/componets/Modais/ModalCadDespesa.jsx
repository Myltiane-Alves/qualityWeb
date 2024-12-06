import React, { Fragment, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "./HeaderModal/HeaderModal";
import { InputFieldModal } from "../Buttons/InputFieldModal";
import { InputSelect } from "../Buttons/InputSelect";
import { FooterModal } from "./FooterModal/footerModal";


export const ModalCadDespesa = ({ show, handleClose }) => {
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
              title={"Dados da Despesa da Loja"}
              subTitle={"Cadastrar Despesas da Loja"}
              handleClose={handleClose}
            />
            {/* <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" >
              <Modal.Body>

                <div id="resultadodespesa"></div>

                <div className="form-group">
                  {/* <input type="hidden" name="STAtivoDespesa" id="STAtivoDespesa" value="True" />
                  <input type="hidden" name="STCancelaDespesa" id="STCancelaDespesa" value="False" />
                  <input type="hidden" name="IDEmpresaDespesa" id="IDEmpresaDespesa" value="" />
                  <input type="hidden" name="IDFuncDespesa" id="IDFuncDespesa" value="" /> */}
                  <div className="row">
                    <div className="col-sm-6 col-xl-10">
            
                      <InputFieldModal
                        label={"Empresa"}
                        type="text"
                        // id="nomeempDespesa"
                        readOnly={true}
                        
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-3">
                      <InputFieldModal
                        label={"Data Despesa"}
                        type="date"
                        // id="DTDespesa"
                        readOnly={true}
                        
                      />
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <InputFieldModal
                        label={"Hora Despesa"}
                        type="time"
                        // id="HRDespesa"
                        readOnly={true}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">
                    
                      <InputSelect
                        label={"Despesa"}
                        type="select"
                        // id="IDContaBanco"
                        options={options}
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
                        // id="DsHistorioDespesa"
                        readOnly={false}      
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">
                      <InputFieldModal
                        label={"Pago á"}
                        type="text"
                        // id="DsPagoA"
                        readOnly={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-xl-2">
                      
                      <InputSelect
                        label={"Tipo Nota"}
                        type="select"
                        // id="TPNota"
                        options={options}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6" id="1" style={{ display: "none" }}>
                      <label className="form-label" for="nnota">Nº Chave da Nota</label>
                      <div className="input-group">
                        <input type="text" id="NuNotaFiscal" name="NuNotaFiscal" className="form-control input" value="" />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      
                      <InputFieldModal
                        label={"Valor Despesa"}
                        type="text"
                        // id="VrDespesaDespesa"
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

                <FooterModal handleClose={handleClose} />
              </Modal.Body>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  )

}
