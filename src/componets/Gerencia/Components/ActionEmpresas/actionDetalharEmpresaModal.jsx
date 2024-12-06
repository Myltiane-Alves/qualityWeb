import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { dataFormatada } from "../../../../utils/dataFormatada";

export const ActionDetalharEmpresaModal = ({ show, handleClose, dadosEmpresasDetalhe}) => {


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

        <HeaderModal
          title={"Dados da Empresa"}
          subTitle={"Detlhes da Empresa"}
          handleClose={handleClose}
        />
        <Modal.Body>
          <form onSubmit="">

            <div className="form-group">
              <input type="hidden" header="IDEmpresaAtualizar" id="IDEmpresaAtualizar" value="" />
              <div className="row">
                <div className="col-sm-4 col-xl-4">
                  <InputFieldModal
                    label={"Grupo Empresarial"}
                    type="text"
                    readOnly={true}
                    value={
                      dadosEmpresasDetalhe[0]?.IDGRUPOEMPRESARIAL == 1 ? "TO - TESOURA DE OURO" :
                        dadosEmpresasDetalhe[0]?.IDGRUPOEMPRESARIAL == 2 ? "MG - MAGAZINE" :
                          dadosEmpresasDetalhe[0]?.IDGRUPOEMPRESARIAL == 3 ? "YO - YORUS" :
                            dadosEmpresasDetalhe[0]?.IDGRUPOEMPRESARIAL == 4 ? "FC - FREE CENTER" : ""
                    }

                  />
                </div>
                <div className="col-sm-4 col-xl-4">
                  <InputFieldModal
                    label={"Situação"}
                    type="text"
                    readOnly={true}
                    value={
                      dadosEmpresasDetalhe[0]?.STATIVO == "True" ? "ATIVO" :
                        dadosEmpresasDetalhe[0]?.STATIVO == "False" ? "INATIVO" : ""

                    }

                  />
                </div>
                <div className="col-sm-4 col-xl-4">

                  <InputFieldModal
                    label={"Data Criação"}
                    type="datetime"
                    readOnly={true}
                    value={dataFormatada(dadosEmpresasDetalhe[0]?.DTULTATUALIZACAO)}

                  />
                </div>
              </div>


              <div className="row">

                <div className="col-sm-12 col-xl-12">

                  {console.log(dadosEmpresasDetalhe[0]?.STATIVO, 'modal')}
                  <InputFieldModal
                    label={"Nome Fantasia"}
                    type="text"
                    readOnly={true}
                    value={dadosEmpresasDetalhe[0]?.NOFANTASIA}

                  />
                </div>
              </div>


              <div className="form-group">
                <div className="row">
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                      label={"CEP"}
                      type="text"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.NUCEP}

                    />
                  </div>
                  <div className="col-sm-4 col-xl-4">

                    <InputFieldModal
                      label={"Endereço"}
                      type="text"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.EENDERECO}

                    />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                      label={"Complemento"}
                      type="text"
                      readOnly={true}
                      value={
                        dadosEmpresasDetalhe[0]?.ECOMPLEMENTO == '' ? "Atualizando" : ""

                      }

                    />
                  </div>

                  <div className="col-sm-4 col-xl-4">

                    <InputFieldModal
                      label={"Bairro"}
                      type="text"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.EBAIRRO}

                    />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                      label={"Cidade"}
                      type="text"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.ECIDADE}

                    />
                  </div>
                  <div className="col-sm-4 col-xl-4">
                    <InputFieldModal
                      label={"Estado"}
                      type="text"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.SGUF}

                    />
                  </div>

                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"E-mail"}
                      type="email"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.EEMAILPRINCIPAL}

                    />
                  </div>
                  <div className="col-sm-6 col-xl-6">
                    <InputFieldModal
                      label={"Telefone"}
                      type="text"
                      readOnly={true}
                      value={dadosEmpresasDetalhe[0]?.NUTELGERENCIA}

                    />
                  </div>
                </div>
              </div>
            </div>

            <FooterModal
              ButtonTypeFechar={ButtonTypeModal}
              textButtonFechar={"Fechar"}
              onClickButtonFechar={handleClose}
              corFechar="secondary"
            />

          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}