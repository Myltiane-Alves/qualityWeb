import React, { Fragment, useState } from "react"
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal"
import { FooterModal } from "../Modais/FooterModal/footerModal"
import { ButtonTypeModal } from "../Buttons/ButtonTypeModal"
import Modal from 'react-bootstrap/Modal';
import { get } from "../../api/funcRequest";
import { InputFieldModal } from "../Buttons/InputFieldModal";

export const InformaticaActionUpdateFuncionarioModal = ({show, handleClose}) => {
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [optionsEmpresas, setOptionsEmpresas] = useState([]);


  useEffect(() => {
    getListaEmpresas();
  }, []);

  const getListaEmpresas = async () => {
    try {
      const response = await get(`/listaEmpresasIformatica`);
      if (response.data && response.data.length > 0) {
        setOptionsEmpresas(response.data);
        // console.log("response.data", response.data)
      }
      return response.data;
    } catch (error) {

    }
  }

  const filterTipoTroca = (inputValue) => {
    
    return optionsEmpresas.filter((item) =>
      item.NOFANTASIA.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = filterTipoTroca(inputValue);
      const options = filteredOptions.map((item) => ({
        value: item.IDEMPRESA,
        label: item.NOFANTASIA,
      }));
      callback(options);
    }, 1000);
  };

  const handleChangeEmpresa = (selectedOption) => {
    setEmpresaSelecionada(selectedOption); 
  };

  return (

    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <HeaderModal
          title={"Dados de Empresa"}
          subTitle={"Atualização Diária dos PDVs da Empresa"}
          handleClose={handleClose}
        />


        <Modal.Body>
        
          <div className="form-group">
          
            <div className="row">
              <div className="col-sm-6 col-xl-4">
                <label className="form-label" htmlFor="empresaFuncionario">Empresa</label>
            
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptions}
                  value={empresaSelecionada}
                  onChange={handleChangeEmpresa}
                  defaultOptions
                  isSearchable
                />
              </div>
              <div className="col-sm-6 col-xl-4">
                <label className="form-label" htmlFor="funcaoFuncionario">Função</label>
                <div className="input-group">
                  <select className="select2 form-control" name="funcaoFuncionario" id="funcaoFuncionario">
                    <option value="0">Selecione...</option>
          
                  </select>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <label className="form-label" htmlFor="tpFuncionario">Tipo</label>
                <div className="input-group">
                  <select className="select2 form-control" name="tipoFuncionario" id="tipoFuncionario">
                    <option value="0">Selecione...</option>
                    <option value="FUNCIONARIO">Funcionário</option>
                    <option value="PN">Parceiro de Negócios Apoio</option>
                    <option value="PN">Parceiro de Negócios PJ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  type="password"
                  className="form-control input"
                  readOnly={true}
                  label="CPF"
                  value
                  onChangeModal
                  
                />
              </div>
              <div className="col-sm-8 col-xl-8">
                <InputFieldModal
                  type="text"
                  className="form-control input"
                  readOnly={true}
                  label="Funcionário"
                  value
                  onChangeModal
                  
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-sm-12 col-xl-12">
                <InputFieldModal
                  type="password"
                  className="form-control input"
                  readOnly={true}
                  label="Motivo Desconto"
                  value
                  onChangeModal
                  
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  type="password"
                  className="form-control input"
                  readOnly={true}
                  label="Valor Salário"
                  value
                  onChangeModal
                  
                />
              </div>
              <div className="col-sm-4 col-xl-4">

                <InputFieldModal
                  type="password"
                  className="form-control input"
                  readOnly={true}
                  label="% Desc. Conv."
                  value
                  onChangeModal
                  
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  type="text"
                  className="form-control input"
                  readOnly={true}
                  label="Valor Desc."
                  value
                  onChangeModal
                  
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-4">

                <InputFieldModal
                  type="password"
                  className="form-control input"
                  readOnly={true}
                  label="Senha"
                  value
                  onChangeModal
                  
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  type="password"
                  className="form-control input"
                  readOnly={true}
                  label="Repita Senha"
                  value
                  onChangeModal
                  
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <label className="form-label" htmlFor="stativofuncionario">Situação</label>
                <div className="input-group">
                  <select className="select2 form-control" name="stativofunc" id="stativofunc">
                    <option value="True">ATIVO</option>
                    <option value="False">INATIVO</option>
                  </select>
                </div>
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
          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            textButtonFechar={"Fechar"}
            onClickButtonFechar={handleClose}
            cor="secondary"

        />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

