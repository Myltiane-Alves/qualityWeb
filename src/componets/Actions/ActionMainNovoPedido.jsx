import { Fragment } from "react";
import { HeadTitleComponent } from "../HeadTitle";
import { ButtonType } from "../Buttons/ButtonType";

export const ActionMainNovoPedido = ({
  title,
  subTitle,
  linkComponentAnterior,
  linkComponent,
  id,


  InputFieldDTInicioComponent,
  InputFieldDTFimComponent,
  InputFieldObsFornecedor,
  InputFieldObsInterna,
  InputFieldVendedor,
  InputFieldEmailVendedor,
  InputFieldDescontoComponent1,
  InputFieldDescontoComponent2,
  InputFieldDescontoComponent3,
  InputFieldTotalLiq,
  InputFieldComissao,


  labelInputDTInicio,
  labelInputDTFim,
  labelInputFieldObsFornecedor,
  labelInputFieldObsInterna,
  labelInputFieldVendedor,
  labelInputFieldEmailVendedor,
  labelInputFieldDesconto1,
  labelInputFieldDesconto2,
  labelInputFieldDesconto3,
  labelInputFieldTotalLiq,
  labelInputFieldComissao,

  valueInputFieldDTInicio,
  valueInputFieldDTFim,
  valueInputFieldObsFornecedor,
  valueInputFieldObsInterna,
  valueInputFieldVendedor,
  valueInputFieldEmailVendedor,
  valueInputFieldDesconto1,
  valueInputFieldDesconto2,
  valueInputFieldDesconto3,
  valueInputFieldTotalLiq,
  valueInputFieldComissao,

  onChangeInputFieldDTInicio,
  onChangeInputFieldDTFim,
  onChangeInputFieldObsFornecedor,
  onChangeInputFieldObsInterna,
  onChangeInputFieldVendedor,
  onChangeInputFieldEmailVendedor,
  onChangeInputFieldDesconto1,
  onChangeInputFieldDesconto2,
  onChangeInputFieldDesconto3,
  onChangeInputFieldTotalLiq,
  onChangeInputFieldComissao,


  InputSelectCompradorComponent,
  InputSelectMarcasComponent,
  InputSelectFornecedorComponent,
  InputSelectFiscalComponent,
  InputSelectEnviarComponent,
  InputSelectCondicoesPagamentos,
  InputSelectTipoPedido,
  InputSelectTransportadora,
  InputSelectFreteComponent,


  labelSelectComprador,
  labelSelectMarcas,
  labelSelectFornecedor,
  labelSelectFiscal,
  labelSelectEnviar,
  labelSelectCondicoesPagamentos,
  labelSelectTipoPedido,
  labelSelectTransportadora,
  labelSelectFrete,


  optionsCompradores,
  optionsMarcas,
  optionsFornecedores,
  optionsFiscal,
  optionsSelectEnviar,
  optionsCondicoesPagamentos,
  optionsTipoPedido,
  optionsSelectTransportadora,
  optionsFrete,


  valueSelectComprador,
  valueSelectMarca,
  valueSelectFornecedor,
  valueSelectFiscal,
  valueSelectEnviar,
  valueSelectCondicoesPagamentos,
  valueSelectTipoPedido,
  valueSelectTransportadora,
  valueSelectFrete,


  onChangeSelectComprador,
  onChangeSelectMarcas,
  onChangeSelectFornecedor,
  onChangeSelectFiscal,
  onChangeSelectEnviar,
  onChangeSelectCondicoesPagamentos,
  onChangeSelectTipoPedido,
  onChangeSelectTransportadora,
  onChangeSelectFrete,

  ButtonSearchComponent,
  ButtonTypeCadastro,
  ButtonTypeCancelar,

  linkNomeSearch,
  linkNome,
  linkCancelar,

  onButtonClickSearch,
  onButtonClickCadastro,
  onButtonClickCancelar,

  corSearch,
  corCadastro,
  corCancelar,

  IconSearch,
  IconCadastro,
  IconCancelar
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Fragment>
      <form action="#" onSubmit={handleSubmit}>
        <HeadTitleComponent
          tittuloComponent={title}
          nomeLoja={subTitle}
          linkComponentAnterior={linkComponentAnterior}
          linkComponent={linkComponent}
        />
        <div className="row">
          <div className="col-xl-12">
            <div id="panel-1" className="panel">
              <div className="panel-container show">


                <div className="panel-tag">


                  <div className="row">
                    <div className="col-sm-6 col-xl-3 mt-2">

                      {InputFieldDTInicioComponent && (
                        <InputFieldDTInicioComponent
                          label={labelInputDTInicio}
                          type="date"
                          id={id}
                          name="dtconsultainicio"
                          value={valueInputFieldDTInicio}
                          onChange={onChangeInputFieldDTInicio}

                        />
                      )}
                    </div>
                    <div className="col-sm-6 col-xl-3 mt-2">
                      {InputFieldDTFimComponent && (
                        <InputFieldDTFimComponent
                          label={labelInputDTFim}
                          type="date"
                          id={id}
                          name="dtconsultafim"
                          value={valueInputFieldDTFim}
                          onChange={onChangeInputFieldDTFim}
                        />
                      )}
                    </div>
                    <div className="col-sm-6 col-xl-3 mt-2">
                      {InputSelectCompradorComponent && (
                        <InputSelectCompradorComponent
                          label={labelSelectComprador}
                          nome="idloja"
                          id={id}
                          options={optionsCompradores}
                          defaultValue={valueSelectComprador}
                          onChange={onChangeSelectComprador}
                        />
                      )}
                    </div>
                    <div className="col-sm-6 col-xl-3 mt-2">
                      {InputSelectMarcasComponent && (
                        <InputSelectMarcasComponent
                          label={labelSelectMarcas}
                          nome="idloja"
                          id={id}
                          options={optionsMarcas}
                          onChange={onChangeSelectMarcas}
                          value={valueSelectMarca}
                          defaultValue={valueSelectMarca}
                          type="select"
                        />
                      )}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div class="col-sm-6 col-xl-8 mt-2">

                      {InputSelectFornecedorComponent && (
                        <InputSelectFornecedorComponent
                          label={labelSelectFornecedor}
                          nome="Fornecedor"
                          id={id}
                          options={optionsFornecedores}
                          onChange={onChangeSelectFornecedor}
                          value={valueSelectFornecedor}

                        />

                      )}
                    </div>
                    <div class="col-sm-6 col-xl-2 mt-2">

                      {InputSelectFiscalComponent && (
                        <InputSelectFiscalComponent
                          label={labelSelectFiscal}
                          type="select"
                          id={id}
                          options={optionsFiscal}
                          onChange={onChangeSelectFiscal}
                          value={valueSelectFiscal}
                        />

                      )}
                    </div>

                    <div class="col-sm-6 col-xl-2 mt-2">

                      {InputSelectEnviarComponent && (
                        <InputSelectEnviarComponent
                          label={labelSelectEnviar}
                          type="select"
                          id={id}
                          options={optionsSelectEnviar}
                          value={valueSelectEnviar}
                          onChange={onChangeSelectEnviar}
                        />
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-sm-6 col-xl-4 mt-3">

                      {InputSelectCondicoesPagamentos && (
                        <InputSelectCondicoesPagamentos
                          label={labelSelectCondicoesPagamentos}
                          type="select"
                          id={id}
                          options={optionsCondicoesPagamentos}
                          value={valueSelectCondicoesPagamentos}
                          onChange={onChangeSelectCondicoesPagamentos}
                        />
                      )}
                    </div>

                    <div class="col-sm-6 col-xl-4 mt-3">

                      {InputFieldObsFornecedor && (
                        <InputFieldObsFornecedor
                          label={labelInputFieldObsFornecedor}
                          type="text"
                          id={id}
                          value={valueInputFieldObsFornecedor}
                          onChange={onChangeInputFieldObsFornecedor}
                        />

                      )}
                    </div>

                    <div class="col-sm-6 col-xl-4 mt-3">

                      {InputFieldObsInterna && (
                        <InputFieldObsInterna
                          label={labelInputFieldObsInterna}
                          type="text"
                          id={id}
                          value={valueInputFieldObsInterna}
                          onChange={onChangeInputFieldObsInterna}
                        />
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-sm-6 col-xl-3 mt-3">

                      {InputSelectTipoPedido && (
                        <InputSelectTipoPedido
                          label={labelSelectTipoPedido}
                          type="select"
                          id={id}
                          options={optionsTipoPedido}
                          value={valueSelectTipoPedido}
                          onChange={onChangeSelectTipoPedido}
                        />
                      )}
                    </div>
                    <div class="col-sm-6 col-xl-3 mt-3">

                      {InputFieldVendedor && (
                        <InputFieldVendedor
                          label={labelInputFieldVendedor}
                          type="text"
                          id={id}
                          value={valueInputFieldVendedor}
                          onChange={onChangeInputFieldVendedor}
                        />
                      )}
                    </div>
                    <div class="col-sm-6 col-xl-6 mt-3">

                      {InputFieldEmailVendedor && (
                        <InputFieldEmailVendedor
                          label={labelInputFieldEmailVendedor}
                          type="text"
                          id={id}
                          value={valueInputFieldEmailVendedor}
                          onChange={onChangeInputFieldEmailVendedor}
                        />
                      )}
                    </div>
                  </div>
                  <hr style={{}} />
                  <div className="row">
                    <div class="col-sm-6 col-xl-2 mt-2">

                      {InputFieldDescontoComponent1 && (
                        <InputFieldDescontoComponent1
                          label={labelInputFieldDesconto1}
                          type="text"
                          id={id}

                          value={valueInputFieldDesconto1}
                          onChange={onChangeInputFieldDesconto1}
                        />
                      )}
                    </div>
                    <div class="col-sm-6 col-xl-2 mt-2">

                      {InputFieldDescontoComponent2 && (
                        <InputFieldDescontoComponent2
                          label={labelInputFieldDesconto2}
                          type="text"
                          id={id}

                          value={valueInputFieldDesconto2}
                          onChange={onChangeInputFieldDesconto2}
                        />
                      )}
                    </div>

                    <div class="col-sm-6 col-xl-2 mt-2">

                      {InputFieldDescontoComponent3 && (
                        <InputFieldDescontoComponent3
                          label={labelInputFieldDesconto3}
                          type="text"
                          id={id}

                          value={valueInputFieldDesconto3}
                          onChange={onChangeInputFieldDesconto3}
                        />
                      )}
                    </div>

                    <div class="col-sm-6 col-xl-4 mt-2">

                      {InputFieldTotalLiq && (
                        <InputFieldTotalLiq
                          label={labelInputFieldTotalLiq}
                          type="text"
                          id={id}

                          value={valueInputFieldTotalLiq}
                          onChange={onChangeInputFieldTotalLiq}
                        />
                      )}
                    </div>
                    <div class="col-sm-6 col-xl-2 mt-2">

                      {InputFieldComissao && (
                        <InputFieldComissao
                          label={labelInputFieldComissao}
                          type="text"
                          id={id}

                          value={valueInputFieldComissao}
                          onChange={onChangeInputFieldComissao}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div class="col-sm-6 col-xl-8 mt-2">
                      {InputSelectTransportadora && (
                        <InputSelectTransportadora
                          label={labelSelectTransportadora}
                          nome="idloja"
                          id={id}
                          options={optionsSelectTransportadora}
                          value={valueSelectTransportadora}
                          onChange={onChangeSelectTransportadora}
                        />
                      )}

                    </div>

                    <div class="col-sm-6 col-xl-4 mt-2">

                      {InputSelectFreteComponent && (

                        <InputSelectFreteComponent
                          label={labelSelectFrete}
                          nome="idloja"
                          id={id}
                          options={optionsFrete}
                          value={valueSelectFrete}
                          onChange={onChangeSelectFrete}
                        />
                      )}
                    </div>

                  </div>

                  <div className="row">
                    
                  {ButtonSearchComponent && (
                      <ButtonType
                        textButton={linkNomeSearch}
                        onClickButtonType={onButtonClickSearch}
                        cor={corSearch}
                        tipo="button"
                        Icon={IconSearch}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                
                    {ButtonTypeCadastro && (
                      <ButtonType
                        textButton={linkNome}
                        onClickButtonType={onButtonClickCadastro}
                        cor={corCadastro}
                        tipo="button"
                        Icon={IconCadastro}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeCancelar && (
                      <ButtonType
                        textButton={linkCancelar}
                        onClickButtonType={onButtonClickCancelar}
                        // cor="danger"
                        cor={corCancelar}
                        tipo="button"
                        Icon={IconCancelar}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
    </Fragment>
  )
}