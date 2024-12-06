import { Fragment } from "react"
import { Modal } from "react-bootstrap"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal"
import { InputFieldModal } from "../../../Buttons/InputFieldModal"
import { BsTrash3 } from "react-icons/bs"
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { ActionCarregaImagem } from "./actionCarregaImagem"


export const ActionCadastroImagemProdutoModal = ({ show, handleClose }) => {
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        class="modal-content"
        size="xl"
        centered
      >

        <HeaderModal
          title={"Imagens"}
          subTitle={"Lista de Produtos Vinculados a Imagem"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <div className="row">
            <div className="col-sm-6 col-xl-3">
              <InputFieldModal
                label={"Referência *"}
                type={"text"}
                id={"refimagemprod"}
                value={""}
                onChangeModal
              />
            </div>
            <div className="col-sm-6 col-xl-6">
              <label class="form-label" htmlFor="imgprod">Imagem do Produto - Tamanho máximo do arquivo - 2Mb</label>
              <input

                type={"file"}
                id={"inputFiledToLoad"}
                value={""}
                onChange
              />
            </div>
            <div class="col-sm-6 col-xl-3 mt-4">

              <button class="btn btn-primary" type="button" onclick="LimparImagensProd()">
                <BsTrash3 /> Limpar Imagem
              </button>
            </div>
          </div>

          <div class="row mt-4">
            {/* <ActionCarregaImagem /> */}
            <div class="col-sm-6 col-xl-4">
              <label class="form-label" for="">Imagem Carregada</label>
              <div id="myImg">

              </div>

            </div>
            <div class="col-sm-6 col-xl-8">
              <label class="form-label" for="">Selecione os Produtos para a Imagem</label>
              <div id="ListProdutos">

              </div>
            </div>
          </div>

          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            onClickButtonFechar={handleClose}
            textButtonFechar={"Fechar"}
            corFechar={"secondary"}

            ButtonTypeCadastrar={ButtonTypeModal}
            onClickButtonCadastrar
            textButtonCadastrar={"Salvar"}
            corCadastrar={"success"}
          />
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}