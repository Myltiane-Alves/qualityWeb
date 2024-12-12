import { Fragment, useState } from "react"
import { Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import Select from 'react-select';
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../../Modais/HeaderModal/HeaderModal";
import { ActionListaVisualizarDetalhe } from "./actionListaVisualizarDetalhe";


export const ActionDetalhesAlteracaoPrecos = ({ show, handleClose, dadosVisualizarDetalhe }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [statusSelecionado, setStatusSelecionado] = useState([])

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value)
  }

  const optionsStatus = [
    { value: 'True', label: 'CANCELADA' },
    { value: 'False', label: 'EM ESPERA' },
    { value: 'FINALIZADA', label: 'FINALIZADA' }
  ]

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
          title={"Edição de Alteração de Preços"}
          subTitle={`Alteração de Preço Nº: ${dadosVisualizarDetalhe[0]?.alteracaoPreco.IDRESUMOALTERACAOPRECOPRODUTO}`}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form action="">
            <div className="form-group">
              <div className="row">
                <div className="col-sm-3 col-xl-2">
                  <InputFieldModal
                    label={"Data Criação *"}
                    type={"text"}

                    id={"dtCreateListaPreco"}
                    value={dadosVisualizarDetalhe[0]?.alteracaoPreco.DATACRIACAOFORMATADA}
                    onChangeModal={""}
                    readOnly={true}
                    {...register("dtCreateListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>
                <div className="col-sm-3 col-xl-2">
                  <InputFieldModal
                    label={"Data Alteração *"}
                    type={"text"}

                    id={"dtAlterListaPreco"}
                    value={dadosVisualizarDetalhe[0]?.alteracaoPreco.AGENDAMENTOALTERACAOFORMATADO}
                    onChangeModal={""}

                    {...register("dtAlterListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>

                <div className="col-sm-3 col-xl-2">

                  <label htmlFor="">Status Alteração *</label>
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
                </div>
                <div className="col-sm-3 col-xl-1">
                  <InputFieldModal
                    label={"Alteração "}
                    type={"text"}

                    id={"idListaPreco"}
                    value={''}
                    onChangeModal={""}

                    {...register("idListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>
                <div className="col-sm-2 col-xl-3">
                  <InputFieldModal
                    label={"Lista Alvo de Alteração *"}
                    type={"text"}

                    id={"nomeListaPreco"}
                    value={''}
                    onChangeModal={""}

                    {...register("nomeListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>

                <div className="col-sm-3 col-xl-2">
                  <InputFieldModal
                    label={"Qtd. Produtos"}
                    type={"text"}

                    id={"idListaPreco"}
                    value={""}
                    onChangeModal={""}

                    {...register("idListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>

              </div>


              <div className="row mt-4">
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Responsável "}
                    type={"text"}

                    id={"nomeListaPreco"}
                    value={""}
                    onChangeModal={""}

                    {...register("nomeListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>

              </div>

            </div>

            <ActionListaVisualizarDetalhe dadosVisualizarDetalhe={dadosVisualizarDetalhe} />
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

          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}