import { Fragment, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import Select from 'react-select';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { InputSelect } from "../../../Buttons/InputSelect";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { get, post } from "../../../../api/funcRequest";

export const ActionCadastroCondicaoPagamentoModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [statusSelecionado, setStatusSelecionado] = useState('')
  const [descricao, setDescricao] = useState('')
  const [parceladoSelecionado, setParceladoSelecionado] = useState('')
  const [numeroParcelas, setNumeroParcelas] = useState('')
  const [dias1Pagamento, setDias1Pagamento] = useState('')
  const [qtdDiasPagamento, setQtdDiasPagamento] = useState('')
  const [tipoDocumentoSelecionado, setTipoDocumentoSelecionado] = useState('')
  const [listaTPDocumento, setListaTPDocumento] = useState([])
  const [condPagamento, setCondPagamento] = useState('')

  useEffect(()=> {
    getListaTPDocumento();
  },[])

  const getListaTPDocumento = async () => {
    try {
      const response = await get('/tipoDocumento');
      setListaTPDocumento(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async () => {
    const postData = {
      IDCONDICAOPAGAMENTO: condPagamento,
      IDGRUPOEMPRESARIAL: item.IDGRUPOEMPRESARIAL,
      IDEMPRESA: item.IDEMPRESA,
      DSCONDICAOPAG: item.DSCONDICAOPAG,
      STPARCELADO: item.STPARCELADO,
      NUPARCELAS: item.NUPARCELAS,
      NUNDIA1PAG: item.NUNDIA1PAG,
      NUNDIA2PAG: item.NUNDIA2PAG,
      NUNDIA3PAG: item.NUNDIA3PAG,
      NUNDIA4PAG: item.NUNDIA4PAG,
      NUNDIA5PAG: item.NUNDIA5PAG,
      NUNDIA6PAG: item.NUNDIA6PAG,
      NUNDIA7PAG: item.NUNDIA7PAG,
      NUNDIA8PAG: item.NUNDIA8PAG,
      NUNDIA9PAG: item.NUNDIA9PAG,
      NUNDIA10PAG: item.NUNDIA10PAG,
      NUNDIA11PAG: item.NUNDIA11PAG,
      NUNDIA12PAG: item.NUNDIA12PAG,
      DTULTALTERACAO: item.DTULTALTERACAO,
      QTDDIAS: item.QTDDIAS,
      DSTPDOCUMENTO: item.DSTPDOCUMENTO,
      STATIVO: statusSelecionado,
    }

    const response = await post('/cadastrarCondicaoPagamento', postData)
      .then(response => {

        // Limpar os campos do formulário


        console.log(response, 'despesa cadastrada com sucesso front end!')
      })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

      .catch(error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      })
  }

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value)
  }

  const handleChangeParcelado = (e) => {
    setParceladoSelecionado(e.value)
  }

  const handleChangeTipoDocumento = (e) => {
    setTipoDocumentoSelecionado(e.value)
  }

  const options = [
    { value: 'True', label: 'INATIVO' },
    { value: 'False', label: 'ATIVO' },

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
          title={"Condições de Pagamento"}
          subTitle={"Inclusão de Pagamento"}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form>
            <div className="form-group">
              <div className="row">

                <div className="col-sm-6 col-lg-6">

                  <InputFieldModal
                    label={"Descrição *"}
                    type={"text"}
                    id={"desccondpag"}
                    value={descricao}
                    onChangeModal={(e) => setDescricao(e.target.value)}
                    {...register("desccondpag", { required: "Campo obrigatório Informe a Descrição da condição de Pagamento", })}
                    required={true}
                    placeholder={"Informe a Descrição da condição de Pagamento"}
                    readOnly={false}
                  />
                </div>
                <div className="col-sm-6 col-lg-3">

                  <label htmlFor="">Parcelado *</label>
                  <Select
                    options={options.map((item) => {
                      return {
                        value: item.value,
                        label: item.label
                      }
                    })}
                    defaultValue={parceladoSelecionado}
                    onChangeModal={handleChangeParcelado}
                  />
                </div>
                <div className="col-sm-6 col-lg-3">

                  <InputFieldModal
                    label={"Número Parcelas *"}
                    type={"number"}
                    id={"numeroparcelacondpag"}
                    value={numeroParcelas}
                    onChangeModal={(e) => setNumeroParcelas(e.target.value)}
                    {...register("numeroparcelacondpag", { required: "Campo obrigatório Informe o Número de Parcelas", })}
                    required={true}
                    readOnly={false}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-lg-3">
                  <InputFieldModal
                    label={"Dias 1 Pagamento"}
                    type={"number"}
                    id={"dia1condpag"}
                    value={dias1Pagamento}
                    {...register("dia1condpag", { required: "Campo obrigatório Informe o Número de Dias para o 1º Pagamento", })}
                    required={true}
                    onChangeModal={(e) => setDias1Pagamento(e.target.value)}
                    readOnly={false}
                  />
                </div>
                <div className="col-sm-6 col-lg-3">

                  <InputFieldModal
                    label={"QTD Dias Pagamento"}
                    type={"number"}
                    id={"qtdcondpag"}
                    value={qtdDiasPagamento}
                    {...register("qtdcondpag", { required: "Campo obrigatório Informe o Número de Dias para o Pagamento", })}
                    required={true}
                    onChangeModal={(e) => setQtdDiasPagamento(e.target.value)}
                    readOnly={false}
                  />
                </div>
                <div className="col-sm-6 col-lg-6">

                  <label htmlFor="">Tipo Documentos</label>
                  <Select
                    defaultValue={tipoDocumentoSelecionado}
                    options={listaTPDocumento.map((item) => {
                      return {
                        value: item.IDTPDOCUMENTO,
                        label: `${item.IDTPDOCUMENTO} - ${item.DSTPDOCUMENTO}`
                      }
                    })}
                    onChangeModal={handleChangeTipoDocumento}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-lg-6">

                  <label htmlFor="">Situação *</label>
                  <Select
                    defaultValue={statusSelecionado}
                    options={options.map((item) => {
                      return {
                        value: item.value,
                        label: item.label
                      }
                    })}
                    onChange={handleChangeStatus}
                  />
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
          </form>

        </Modal.Body>


      </Modal>

    </Fragment>
  )
}

