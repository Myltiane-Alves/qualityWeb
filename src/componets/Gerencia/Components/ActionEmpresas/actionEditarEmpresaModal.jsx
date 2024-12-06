import { Fragment, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { put } from "../../../../api/funcRequest";
import { useForm } from "react-hook-form";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { dataFormatada } from "../../../../utils/dataFormatada";
import Swal from "sweetalert2";

export const ActionEditarEmpresaModal = ({ show, handleClose, dadosEmpresasDetalhe}) => {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('')


  const onSubmit = async (data) => {
  
    const putData = {
      STGRUPOEMPRESARIAL: dadosEmpresasDetalhe[0]?.IDGRUPOEMPRESARIAL,
      IDGRUPOEMPRESARIAL: dadosEmpresasDetalhe[0]?.IDGRUPOEMPRESARIAL,
      IDSUBGRUPOEMPRESARIAL: dadosEmpresasDetalhe[0]?.IDSUBGRUPOEMPRESARIAL,
      NORAZAOSOCIAL: dadosEmpresasDetalhe[0]?.NORAZAOSOCIAL,
      NOFANTASIA: dadosEmpresasDetalhe[0]?.NOFANTASIA,
      NUCNPJ: dadosEmpresasDetalhe[0]?.NUCNPJ,
      NUINSCESTADUAL: dadosEmpresasDetalhe[0]?.NUINSCESTADUAL,
      NUINSCMUNICIPAL: dadosEmpresasDetalhe[0]?.NUINSCMUNICIPAL,
      CNAE: dadosEmpresasDetalhe[0]?.CNAE,
      EENDERECO: dadosEmpresasDetalhe[0]?.EENDERECO,
      ECOMPLEMENTO: dadosEmpresasDetalhe[0]?.ECOMPLEMENTO,
      EBAIRRO: dadosEmpresasDetalhe[0]?.EBAIRRO,
      ECIDADE: dadosEmpresasDetalhe[0]?.ECIDADE,
      SGUF: dadosEmpresasDetalhe[0]?.SGUF,
      NUUF: dadosEmpresasDetalhe[0]?.NUUF === 'DF' ? 53 : 52,
      NUCEP: dadosEmpresasDetalhe[0]?.NUCEP,
      NUIBGE: dadosEmpresasDetalhe[0]?.NUIBGE,
      EEMAILPRINCIPAL: dadosEmpresasDetalhe[0]?.EEMAILPRINCIPAL,
      EEMAILCOMERCIAL: dadosEmpresasDetalhe[0]?.EEMAILCOMERCIAL,
      EEMAILFINANCEIRO: dadosEmpresasDetalhe[0]?.EEMAILFINANCEIRO,
      EEMAILCONTABILIDADE: dadosEmpresasDetalhe[0]?.EEMAILCONTABILIDADE,
      NUTELPUBLICO: dadosEmpresasDetalhe[0]?.NUTELPUBLICO,
      NUTELCOMERCIAL: dadosEmpresasDetalhe[0]?.NUTELCOMERCIAL,
      NUTELFINANCEIRO: dadosEmpresasDetalhe[0]?.NUTELFINANCEIRO,
      NUTELGERENCIA: dadosEmpresasDetalhe[0]?.NUTELGERENCIA,
      EURL: dadosEmpresasDetalhe[0]?.EURL,
      PATHIMG: dadosEmpresasDetalhe[0]?.PATHIMG,
      NUCNAE: dadosEmpresasDetalhe[0]?.NUCNAE,
      STECOMMERCE: dadosEmpresasDetalhe[0]?.STECOMMERCE,
      DTULTATUALIZACAO: dadosEmpresasDetalhe[0]?.DTULTATUALIZACAO,
      STATIVO: dadosEmpresasDetalhe[0]?.STATIVO,
      ALIQPIS: dadosEmpresasDetalhe[0]?.ALIQPIS,
      ALIQCOFINS: dadosEmpresasDetalhe[0]?.ALIQCOFINS,
      IDEMPRESA: dadosEmpresasDetalhe[0]?.IDEMPRESA,
    }


    const response = await put('/empresas', putData)
      .then(response => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Empresa atualizada com sucesso!',
          icon: 'success',
          timer: 3000,
          customClass: {
            container: 'custom-swal',
          }
        })
      })

      .catch(error => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar a empresa!',
          icon: 'error',
          timer: 3000,
          customClass: {
            container: 'custom-swal',
          }
        })

        console.log(error)
      })
    return response;
  }


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
          <form onSubmit={handleSubmit(onSubmit)} >

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


              <div className="row mt-3">

                <div className="col-sm-12 col-xl-12">

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
                  <div className="mt-3" style={{display:'flex'}}>
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

                  </div>
                  

                </div>
                <div className="row">
                  <div className="mt-3" style={{display:'flex'}}>

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
                  </div>

                </div>
                <div className="row">
                  <div className="mt-3" style={{display:'flex'}}>

                    <div className="col-sm-6 col-xl-6">
                      <InputFieldModal
                        label={"E-mail"}
                        type="email"
                        value={email || dadosEmpresasDetalhe[0]?.EEMAILPRINCIPAL}
                        onChangeModal={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6 col-xl-6">
                      <InputFieldModal
                        label={"Telefone"}
                        type="text"
                        value={telefone || dadosEmpresasDetalhe[0]?.NUTELCOMERCIAL}
                        onChangeModal={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <FooterModal
              ButtonTypeCadastrar={ButtonTypeModal}
              onClickButtonCadastrar={onSubmit}
              textButtonCadastrar={"Atualizar"}
              corCadastrar="success"

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