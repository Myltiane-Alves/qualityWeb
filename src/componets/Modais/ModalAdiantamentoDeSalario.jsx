import React, { Fragment, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import Modal from 'react-bootstrap/Modal';
import AsyncSelect from 'react-select/async';
// import { InputSelect } from "../../Buttons/InputSelect";
// import { ButtonFechar } from "../../Buttons/ButtonType";
// import { ButtonCadastrar } from "../../Buttons/ButtonCadastrar";
import { InputFieldModal } from "../Buttons/InputFieldModal";
import ModalFooter from "react-bootstrap/esm/ModalFooter";
import { FooterModal } from "./FooterModal/footerModal";
import AsyncSelectAction from "../Select/AsyncSelectAction";
import { HeaderModal } from "./HeaderModal/HeaderModal";

export const ModalAdiantamentoDeSalario = ({ show, handleClose }) => {
  const [empresas, setEmpresas] = useState([])
  const options = [
    {value: "Funcionario 1", label: "Funcionario 1"},
    {value: "Funcionario 2", label: "Funcionario 2"},
  ]

  const filterTipoTroca = (inputValue) => {
    
    return empresas.filter((item) =>
    item.STATIVO.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = filterTipoTroca(inputValue);
      const options = filteredOptions.map((item) => ({
        value: item.STATIVO,
        label: item.STATIVO,
      }));
      callback(options);
    }, 1000);
  };

  return (

    <Fragment>
      <Modal 
        show={show} 
        onHide={handleClose} 
        size="lg" 
        className="modal fade" 
        id="CadadiantamentoSalario" 
        tabIndex={-1} 
        role="dialog" 
        aria-hidden="true"
      >
          
        <div className="" role="document">
          <div className="">

            <HeaderModal
              title={"Adiantamento de Salário"}
              subTitle={"Lançar Adiantamento de Salário"}
            />
            {/* <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data" onsubmit="return false;"> */}
            <form id="formAdiantamentoSalario" name="formAdiantamentoSalario" method="post" encType="multipart/form-data">
              <Modal.Body>
               
                <div class="modal-body" id="resulmodaladiantamentosalario">
                  <div id="resultadoadiantamentosalario"></div>

                  <div class="form-group">
                    <div class="row">
                      <input type="hidden" name="STAtivoAdiantamento" id="STAtivoAdiantamento" value="True" />
                      <input type="hidden" name="IDEmpresaAdiantamento" id="IDEmpresaAdiantamento" value="1" />

                      <div class="col-sm-6 col-xl-10">
                      <InputFieldModal 
                        id="nomeempAdiantamento"
                        className="form-control input"
                        readOnly={true}
                        label="Empresa"
                      />
                   
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-xl-8">
                        <label className="form-label" htmlFor={""}>Funcionários</label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        isSearchable
                      />

                      </div>
                      <div class="col-sm-6 col-xl-4">
                        <InputFieldModal 
                          id="IDLancamento"
                          type="date"
                          className="form-control input"
                          readOnly={true}
                          label="Data Lançamento"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">

                      <div class="col-sm-6 col-xl-12">
                        <InputFieldModal 
                          id="TXTMotivo"
                          type="text"
                          className="form-control input"
                          readOnly={false}
                          label="Descrição - Motivo *"
                        />
                      
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-xl-4">
                        <InputFieldModal 
                          id="VrValorDesconto"
                          type="text"
                          className="form-control input"
                          readOnly={false}
                          label="Valor *"
                          placeholder="R$ 0,00"
                        />
                      
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <span 
                      style={{fontWeight: 600, color: "#ff0000", fontSize: "16px"}}
                    >* Campos Obrigatórios *</span>
                   
                  </div>


                </div>
                <FooterModal handleClose={handleClose}/>
              </Modal.Body>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  )

}
