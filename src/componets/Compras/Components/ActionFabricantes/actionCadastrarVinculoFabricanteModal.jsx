import { Fragment } from "react"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import Swal from 'sweetalert2';
import Select from 'react-select';
import { post, put } from "../../../../api/funcRequest";

export const ActionCadastrarVinculoFabricanteModal = ({ show, handleClose }) => {
  
  const handleChangeFornecedor = (e) => {
    setFornecedorSelecionado(e.value)
  }

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value)
  }

  
  return (

    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        class="modal-content"
        size="lg"
        centered
      >

        <HeaderModal
          title={"Vínculo Fabricante / Fornecedor"}
          subTitle={"Inclusão e Alteração"}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form>
            <div className="form-group">
              <div className="row">

                <div className="col-sm-6 col-xl-4">

                  <InputFieldModal
                    label={"Fornecedor *"}
                    type={"text"}
                    nome={"nomeFabricante"}
                    readOnly={true}
                    value={dadosDetalheFornecedorFabricante[0]?.DSFORNECEDOR}
                    onChange={(e) => setNomeFabricante(e.target.value)}
                    required={true}
                    minLength={10}
                    register={register}
                  // aria-invalid={errors.nomeFabricante ? "true" : "false"}
                  // errors={errors.nomeFabricante && errors.nomeFabricante.message}
                  />
                  {/* {errors.nofabricantevinc && <span className="text-danger">Campo obrigatório</span>} */}
                </div>
                <div className="col-sm-6 col-xl-6">
                  <label htmlFor="fornecedor">Nome Fabricante *</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={dafaultValueFabricante}
                    // value={fornecedorSelecionado}
                    options={dadosFabricantes.map((item) => {
                      return {
                        value: item.IDFORNECEDOR,
                        label: `${item.IDFABRICANTE} - ${item.DSFABRICANTE}`
                      }
                    })}
                    onChange={handleChangeFornecedor}
                  />
                  {/* {errors.fornecedor && <p role="alert">{errors.fornecedor.message}</p>} */}

                </div>
                <div className="col-sm-6 col-xl-2">
                  <label htmlFor="situacao">Situação *</label>
                  <Select
                    defaultValue={statusSelecionado}
                    options={optionsStatus.map((item) => {
                      return {
                        value: item.value,
                        label: item.label
                      }
                    })}
                    onChange={handleChangeStatus}
                  />
                  {/* {errors.situacao && <p role="alert">{errors.situacao.message}</p>} */}
                </div>
              </div>
            </div>

          </form>

          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}

            ButtonTypeCadastrar={ButtonTypeModal}
            // onClickButtonCadastrar={handleSubmit(onSubmit)}
            textButtonCadastrar={"Salvar"}
            corCadastrar={"success"}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}
