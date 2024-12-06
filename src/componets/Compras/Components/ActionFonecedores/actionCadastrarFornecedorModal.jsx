import { Fragment, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { useForm } from "react-hook-form";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import Select from 'react-select';
import { get } from "../../../../api/funcRequest";

export const ActionCadastrarFornecedorModal = ({ show, handleClose,  }) => {
  const { register, handleSubmit, errors } = useForm();
  const [dadosTransportadora, setDadosTransportadora] = useState([])
  const [dadosCondicoesPagamentos, setDadosCondicoesPagamentos] = useState([])
 
  useEffect(() => {
    getListaTransportadora()
    getListaCondicoesPagamento()
  },[])

  const getListaTransportadora = async () => {
    try {
      const response = await get('/transportadoras');
      setDadosTransportadora(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getListaCondicoesPagamento = async () => {
    try {
      const response = await get('/condicaoPagamento');
      setDadosCondicoesPagamentos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const options = [
    { value: 'True', label: 'Ativo' },
    { value: 'False', label: 'Inativo' },
  ]

  const optionsFrete = [
    { value: 'PAGO', label: 'PAGO - CIF' },
    { value: 'APAGAR', label: 'A PAGAR - FOB' },
  ]

  const optionsPedido = [
    { value: 'VESTUARIO', label: 'VESTUARIO' },
    { value: 'CALCADOS', label: 'CALÇADOS' },
    { value: 'ARTIGOS', label: 'ARTIGOS' },
  ]

  const optionsEnviar = [
    {value: 'NE', label: 'NÃO ENVIAR'},
    {value: 'ET', label: 'ETIQUETA'},
    {value: 'AR', label: 'ARQUIVO'},
  ]

  const optionsFiscal = [
    {value: 'S', label: 'Simples Nacional'},
    {value: 'N', label: 'Lucro Presumido'},
    {value: 'R', label: 'Lucro Real'},
  ]
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
          title={"Fornecedores"}
          subTitle={"Inclusão de Fornecedores "}
          handleClose={handleClose}
        />


        <Modal.Body>

          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-4">

                <InputFieldModal
                  label={"CNPJ *"}
                  type={"text"}
                  id={"cnpjforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  label={"Insc. Estadual"}
                  type={"text"}
                  id={"inscestadualforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  label={"Insc. Municipal"}
                  type={"text"}
                  id={"inscmuniforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-xl-4">

                <InputFieldModal
                  label={"Razão Social *"}
                  type={"text"}
                  id={"razaoforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-6 col-xl-4">

                <InputFieldModal
                  label={"Nome Fantasia *"}
                  type={"text"}
                  id={"fantasiaforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3 col-xl-2">

                <InputFieldModal
                  label={"CEP *"}
                  type={"text"}
                  id={"cepforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-5">
                <InputFieldModal
                  label={"Endereço *"}
                  type={"text"}
                  id={"enderecoforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-2">

                <InputFieldModal
                  label={"Nº *"}
                  type={"text"}
                  id={"numeroendforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-3">
                <InputFieldModal
                  label={"Complemento"}
                  type={"text"}
                  id={"complementoendforn"}
                  value={""}
                  readOnly={false}
                />

              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3 col-xl-4">
                <InputFieldModal
                  label={"Bairro *"}
                  type={"text"}
                  id={"bairroforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-4">
                <InputFieldModal
                  label={"Cidade *"}
                  type={"text"}
                  id={"cidadeforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-2">
                <InputFieldModal
                  label={"UF *"}
                  type={"text"}
                  id={"ufforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-2">
                <InputFieldModal
                  label={"Nº IBGE *"}
                  type={"text"}
                  id={"nibgeforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-xl-6">
                <InputFieldModal
                  label={"Nome Representante *"}
                  type={"text"}
                  id={"nomerepreforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-6 col-xl-6">
                <InputFieldModal
                  label={"E-mail"}
                  type={"text"}
                  id={"emailforn"}
                  value={""}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3 col-xl-3">
                <InputFieldModal
                  label={"Telefone 1 *"}
                  type={"text"}
                  id={"tel1forn"}
                  value={""}
                  readOnly={false}
                />

              </div>
              <div className="col-sm-3 col-xl-3">
                <InputFieldModal
                  label={"Telefone 2"}
                  type={"text"}
                  id={"tel2forn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-3">
                <InputFieldModal
                  label={"Telefone 3"}
                  type={"text"}
                  id={"tel3forn"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-3 col-xl-3">
                <label className="form-label" htmlFor="fornst">Situação *</label>
                <Select
                  options={options}
                  nome={"idtransportadora"}
                  id={"idtransportadora"}
                  
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <h3 className="form-label" htmlFor="vrfat">* Configuração Padrão *</h3>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-4">
    
                <label htmlFor="">Fiscal</label>
                <Select
                  options={optionsFiscal.map((item) => {
                    return {
                      value: item.value,
                      label: item.label
                    }
                  })}
                  nome={"idtransportadora"}
                  id={"idtransportadora"}
                  
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <label htmlFor="">Enviar</label>
                <Select
                  options={optionsEnviar.map((item) => {
                    return {
                      value: item.value,  
                      label: item.label
                    }
                  })}
                  nome={"idtransportadora"}
                  id={"idtransportadora"}
                  
                />
              </div>
              <div className="col-sm-4 col-xl-4">
                <label>Condições de Pagamento</label>
            
                <Select
                  options={
                    dadosCondicoesPagamentos.map((item) => {
                      
                      return {
                        
                        value: item.IDCONDICAOPAGAMENTO,
                        label: item.DSCONDICAOPAG
                      }
                    })
                  }
                  nome={"idtransportadora"}
                  id={"idtransportadora"}
                  
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-3">
                <label>Tipo Pedido</label>
               
                <Select
                  options={optionsPedido.map((item) => {
                    return {
                      value: item.value,
                      label: item.label
                    }
                  })}
                  nome={"idtransportadora"}
                  id={"idtransportadora"}
                  
                />
              </div>
              <div className="col-sm-4 col-xl-3">

                <InputFieldModal
                  label={"Vendedor"}
                  type={"text"}
                  id={"novendedor"}
                  value={""}
                  readOnly={false}
                />
              </div>
              <div className="col-sm-4 col-xl-6">

                <InputFieldModal
                  label={"E-mail Vendedor"}
                  type={"text"}
                  id={"emailvendedor"}
                  readOnly={false}
                />
              </div>

            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-8 col-xl-8">
              <label htmlFor="">Transportadora</label>
                <Select
                  options={[
                    { value: '', label: 'Selecione' },
                    ...dadosTransportadora.map((item) => {
                      return {
                        value: item.IDTRANSPORTADORA,
                        label: `${item.NUCNPJ} - ${item.NOFANTASIA}`
                      }
                    
                    })
                  ]}
                  nome={"idtransportadora"}
                  id={"idtransportadora"}
                  
                />

              </div>
              <div className="col-sm-4 col-xl-4">


                <label htmlFor="">Tipo Frete</label>
                <Select                  
                  options={optionsFrete.map((item) => {
                    return {
                      value: item.value,
                      label: item.label
                    }
                  })}
                  nome={"idtransportadora"}
                  id={"tpfrete"}
                  readOnly={false}
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

        </Modal.Body>


      </Modal>
    </Fragment>
  )
}
