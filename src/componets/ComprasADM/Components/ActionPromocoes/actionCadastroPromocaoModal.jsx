import { Fragment, useState } from "react"
import { Modal } from "react-bootstrap"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal"
import { InputFieldModal } from "../../../Buttons/InputFieldModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import Select from 'react-select';

export const ActionCadastroPromocaoModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [descricao, setDescricao] = useState('')
  const [aplicacaoSelecionada, setAplicacaoSelecionada] = useState('')
  const [qtdAplicacao, setQtdAplicacao] = useState('')
  const [valor, setValor] = useState('')
  const [valorProduto, setValorProduto] = useState('')
  const [fatorSelecionado, setFatorSelecionado] = useState('')
  const [valorDesconto, setValorDesconto] = useState('')
  const [percentual, setPercentual] = useState('')

  const handleAplicacao = (e) => {
    setAplicacaoSelecionada(e.value)
  }

  const handleFator = (e) => {
    setFatorSelecionado(e.value)
  }

  const optionsAplicaocao = [
    { value: '1', label: 'Por QTD' },
    { value: '2', label: 'Por Valor' },
  ]

  const optionsFator = [
    { value: '0', label: 'Por Valor do Produto' },
    { value: '1', label: 'Valor de Desconto' },
    { value: '2', label: 'Por Percentual' },
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
          title={"Promoção"}
          subTitle={"Cadastrar Promoção"}
          handleClose={handleClose}
        />


        <Modal.Body>


          <div className="form-group">
            <div className="row">

              <div className="col-sm-6 col-lg-6">
                <InputFieldModal
                  label={"Descrição *"}
                  type={"text"}
                  id={"descricao"}
                  value={descricao}
                  onChangeModal={(e) => setDescricao(e.target.value)}
                  {...register("descricao", { required: "Campo obrigatório Informe a Descrição.", })}
                  required={true}
                  placeholder={"Informe a Descrição da Categoria do Pedido."}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-6 col-lg-3">

                <InputFieldModal
                  label={"Data Início *"}
                  type={"date"}
                  id={"dataInicio"}
                  value={dataInicio}
                  onChangeModal={(e) => setDataInicio(e.target.value)}
                  {...register("dataInicio", { required: "Campo obrigatório Informe a Data de Início.", })}
                  required={true}
                  placeholder={"Informe a Data de Início."}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-6 col-lg-3">
                <InputFieldModal
                  label={"Data Fim *"}
                  type={"date"}
                  id={"dataFim"}
                  value={dataFim}
                  onChangeModal={(e) => setDataFim(e.target.value)}
                  {...register("dataFim", { required: "Campo obrigatório Informe a Data de Fim.", })}
                  required={true}
                  placeholder={"Informe a Data de Fim."}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3 col-lg-4">
                <label className="form-label" htmlFor="promoaplicst">Aplicação Entrada*</label>
                <Select
                  defaultValue={aplicacaoSelecionada}
                  options={optionsAplicaocao.map((item) => {
                    return {
                      value: item.value,
                      label: item.label
                    }
                  })}
                  onChangeModal={handleAplicacao}
                />
              </div>
              <div className="col-sm-3 col-lg-4">

                <InputFieldModal
                  label={"QTD Apartir De"}
                  type={"text"}
                  id={"qtd"}
                  value={qtdAplicacao}
                  onChangeModal={(e) => setQtdAplicacao(e.target.value)}
                  {...register("qtd", { required: "Campo obrigatório Informe a Quantidade.", })}
                  required={true}
                  placeholder={"Informe a Quantidade."}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-lg-4">
                <InputFieldModal
                  label={"Valor Apartir De"}
                  type={"text"}
                  id={"vrAplicao"}
                  value={valor}
                  onChangeModal={(e) => setValor(e.target.value)}
                  {...register("vrAplicao", { required: "Campo obrigatório Informe o Valor.", })}
                  required={true}
                  placeholder={"Informe o Valor."}

                  readOnly={false}
                />
              </div>

            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3 col-lg-3">
                <label className="form-label" htmlFor="promofatorst">Fator *</label>
                <Select
                  defaultValue={fatorSelecionado}
                  options={optionsFator.map((item) => {
                    return {
                      value: item.value,
                      label: item.label
                    }
                  })}
                  onChangeModal={handleFator}
                />
              </div>
              <div className="col-sm-3 col-lg-3">

                <InputFieldModal
                  label={"Valor Produto"}
                  type={"text"}
                  id={"vrProduto"}
                  value={valorProduto}
                  onChangeModal={(e) => setValorProduto(e.target.value)}
                  {...register("vrProduto", { required: "Campo obrigatório Informe o Valor do Produto.", })}
                  required={true}
                  placeholder={"Informe o Valor do Produto."}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-lg-3">
                <InputFieldModal
                  label={"Valor Desconto"}
                  type={"text"}
                  id={"vrDesconto"}
                  value={valorDesconto}
                  onChangeModal={(e) => setValorDesconto(e.target.value)}
                  {...register("vrDesconto", { required: "Campo obrigatório Informe o Valor do Desconto.", })}
                  required={true}
                  placeholder={"Informe o Valor do Desconto."}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-lg-3">
                <InputFieldModal
                  label={"Percentual"}
                  type={"text"}
                  id={"percentual"}
                  value={percentual}
                  onChangeModal={(e) => setPercentual(e.target.value)}
                  {...register("percentual", { required: "Campo obrigatório Informe o Percentual.", })}
                  required={true}
                  placeholder={"Informe o Percentual."}
                  readOnly={false}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <h3 style={{ color: "red" }}>* Campos Obrigatórios *</h3>

            </div>
          </div>

        </Modal.Body>
        <FooterModal
          ButtonTypeFechar={ButtonTypeModal}
          textButtonFechar={"Fechar"}
          onClickButtonFechar={handleClose}
          corFechar="secondary"

          ButtonTypeCadastrar={ButtonTypeModal}
          textButtonCadastrar={"Cadastrar"}
          onClickButtonCadastrar
          corCadastrar="success"
        />

      </Modal>
    </Fragment>
  )
}



