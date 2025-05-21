import { Fragment } from "react";
import { HeadTitleComponent } from "../HeadTitle";
import { ButtonType } from "../Buttons/ButtonType";


export const ActionMainPromocao = ({
  title,
  subTitle,
  linkComponentAnterior,
  linkComponent,
  id,


  InputFieldDTInicioComponent,
  InputFieldDTFimComponent,
  InputFieldDescontoComponent1,
  InputFieldDescontoComponent2,
  InputFieldQTDInicioComponent,
  InputFieldQTDFimComponent,
  InputFieldProdutoOigem,
  InputFieldProdutoDestino,
  InputFileProdutoOigem,
  InputFileProdutoDestino,
  InputFieldVrInicio,
  InputFieldVrFim,
  InputFieldDescription,
  InputFieldPrecoComponent,

  labelInputDTInicio,
  labelInputDTFim,
  labelInputFieldDesconto1,
  labelInputFieldDesconto2,
  labelInputQTDInicio,
  labelInputQTDFim,
  labelInputFieldProdutoOigem,
  labelInputFieldProdutoDestino,
  labelInputFileProdutoOigem,
  labelInputFileProdutoDestino,
  labelInputFieldVrInicio,
  labelInputFieldVrFim,
  labelInputFieldDescription,
  labelInputPreco,

  valueInputFieldDTInicio,
  valueInputFieldDTFim,
  valueInputFieldDesconto1,
  valueInputFieldDesconto2,
  valueInputFieldQTDInicio,
  valueInputFieldQTDFim,
  valueInputFieldProdutoOigem,
  valueInputFieldProdutoDestino,
  valueInputFileProdutoOigem,
  valueInputFileProdutoDestino,
  valueInputFieldVrInicio,
  valueInputFieldVrFim,
  valueInputFielDescription,
  valueInputFieldPreco,

  onChangeInputFieldDTInicio,
  onChangeInputFieldDTFim,
  onChangeInputFieldDesconto1,
  onChangeInputFieldDesconto2,
  onChangeInputFieldQTDInicio,
  onChangeInputFieldQTDFim,
  onChangeInputFieldProdutoOigem,
  onChangeInputFieldProdutoDestino,
  onChangeInputFileProdutoOigem,
  onChangeInputFileProdutoDestino,
  onChangeInputFieldVrInicio,
  onChangeInputFieldVrFim,
  onChangeInputFieldDescription,
  onChangeInputFieldPreco,

  InputSelectCategoriaComponent,
  InputSelectMarcasComponent,
  InputSelectFornecedorComponent,
  InputSelectEmpresaComponent,
  InputSelectMecanicaComponent,
  InputSelectAplicacaoDestino,
  InputSelectTipoDesconto,
  InputSelectEmpresaComponentAync,


  labelSelectCategoria,
  labelSelectMarcas,
  labelSelectFornecedor,
  labelSelectEmpresa,
  labelSelectMecanica,
  labelSelectAplicacaoDestino,
  labelSelectTipoDesconto,
  labelSelectEmpresaAsync,

  optionsCategorias,
  optionsMarcas,
  optionsFornecedores,
  optionsSelectEmpresa,
  optionsMecanica,
  optionsAplicacaoDestino,
  optionsTipoDesconto,
  optionsEmpresasAsync,

  valueSelectMarca,
  valueSelectFornecedor,
  valueSelectEmpresa,
  valueSelectMecanica,
  valueSelectAplicacaoDestino,
  valueSelectTipoDesconto,
  valueSelectEmpresaAsync,

  onChangeSelectCategoria,
  onChangeSelectMarcas,
  onChangeSelectFornecedor,
  onChangeSelectEmpresa,
  onChangeSelectMecanica,
  onChangeSelectAplicacaoDestino,
  onChangeSelectTipoDesconto,
  onChangeSelectEmpresaAsync,

  acceptFileProdutoOigem,
  acceptFileProdutoDestino,

  ButtonSearchComponent,
  ButtonTypeCadastro,
  ButtonTypeCancelar,
  ButtonTypePedido,
  ButtonTypeTXT,

  linkNomeSearch,
  linkNome,
  linkCancelar,
  linkPedido,
  linkTXT,

  onButtonClickSearch,
  onButtonClickCadastro,
  onButtonClickCancelar,
  onButtonClickPedido,
  onButtonClickTXT,

  corSearch,
  corCadastro,
  corCancelar,
  corPedido,
  corTXT,

  IconSearch,
  IconCadastro,
  IconCancelar,
  IconPedido,
  IconTXT,

  readOnlyDTInicio,
  readOnlyDTFim,
  readOnlyMarcas,
  readOnlyFornecedor,
  readOnlyEmpresa,
  readOnlyDesconto1,
  readOnlyDesconto2,
  readOnlyComprador,
  readOnlyQTDInicio,
  readOnlyQTDFim,
  readOnlyMecanica,
  readOnlyProdutoOigem,
  readOnlyProdutoDestino,
  readOnlyFileProdutoOigem,
  readOnlyFileProdutoDestino,
  readOnlyVrInicio,
  readOnlyVrFim,
  readOnlyDescription,
  readOnlyAplicacaoDestino,
  readOnlyPreco,
  readOnlyTipoDesconto,

  loadOptionsEmpresasAsync,

  defaultValueSelectCategoria,
  defaultValueSelectMarca,
  defaultValueSelectFornecedor,
  defaultValueSelectEmpresa,
  defaultValueSelectMecanica,
  defaultValueSelectAplicacaoDestino,
  defaultValueSelectTipoDesconto,
  defaultOptionsEmpresasAsync,

  styleQTDInicio,
  styleQTDFim,
  styleDesconto1,
  styleDesconto2,
  styleVrInicio,
  styleVrFim,
  tituloPromocao,
  styleMecanica,
  styleDescription,
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
                  <h2>{tituloPromocao}</h2>
                  {/* INICIO MECANICA */}
                  <div className="row mt-3">
                      {InputSelectMecanicaComponent && (
                        <InputSelectMecanicaComponent
                          label={labelSelectMecanica}
                          readOnly={readOnlyMecanica}
                          id={id}
                          options={optionsMecanica}
                          onChange={onChangeSelectMecanica}
                          value={valueSelectMecanica}
                          defaultValue={defaultValueSelectMecanica}
                          styles={styleMecanica}

                        />

                      )}
                    {/* <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                      {InputSelectMecanicaComponent && (
                        <InputSelectMecanicaComponent
                          label={labelSelectMecanica}
                          readOnly={readOnlyMecanica}
                          id={id}
                          options={optionsMecanica}
                          onChange={onChangeSelectMecanica}
                          value={valueSelectMecanica}
                          defaultValue={defaultValueSelectMecanica}

                        />

                      )}

                    </div> */}
                  </div>

                   <div className="row mt-3">
                    <div className="col-sm-6 col-md-12 col-xl-12 ">
                      {InputFieldDescription && (
                        <InputFieldProdutoDestino
                          label={labelInputFieldDescription}
                          type="text"
                          value={valueInputFielDescription}
                          onChange={onChangeInputFieldDescription}
                          readOnly={readOnlyDescription}
                          style={styleDescription}
                        />
                      )}

                    </div>
                  </div>
                  
                  <div className="row mt-3">
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      {InputSelectAplicacaoDestino && (
                        <InputSelectAplicacaoDestino
                          label={labelSelectAplicacaoDestino}
                          readOnly={readOnlyAplicacaoDestino}
                          options={optionsAplicacaoDestino}
                          onChange={onChangeSelectAplicacaoDestino}
                          value={valueSelectAplicacaoDestino}
                          defaultValue={defaultValueSelectAplicacaoDestino}

                        />

                      )}
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      {InputSelectTipoDesconto && (
                        <InputSelectTipoDesconto
                          label={labelSelectTipoDesconto}
                          readOnly={readOnlyTipoDesconto}
                          options={optionsTipoDesconto}
                          onChange={onChangeSelectTipoDesconto}
                          value={valueSelectTipoDesconto}
                          defaultValue={defaultValueSelectTipoDesconto}

                        />

                      )}
                    </div>

                  </div>
                  <div className="row mt-3">
                    <div class="col-sm-6 co-md-6 col-xl-6">

                      {InputFieldQTDInicioComponent && (
                        <InputFieldQTDInicioComponent
                          label={labelInputQTDInicio}
                          type="text"
                          id={id}
                          value={valueInputFieldQTDInicio}
                          onChange={onChangeInputFieldQTDInicio}
                          readOnly={readOnlyQTDInicio}
                          style={styleQTDInicio}
                        />
                      )}
                    </div>
                    <div class="col-sm-6 col-md-6 col-xl-6">

                      {InputFieldQTDFimComponent && (
                        <InputFieldQTDFimComponent
                          label={labelInputQTDFim}
                          type="text"
                          id={id}
                          value={valueInputFieldQTDFim}
                          onChange={onChangeInputFieldQTDFim}
                          readOnly={readOnlyQTDFim}
                          style={styleQTDFim}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row mt-3">

                    <div className="col-sm-6 col-md-4 col-xl-4 ">

                      {InputFieldDescontoComponent1 && (
                        <InputFieldDescontoComponent1
                          label={labelInputFieldDesconto1}
                          type="text"
                          value={valueInputFieldDesconto1}
                          onChange={onChangeInputFieldDesconto1}
                          readOnly={readOnlyDesconto1}
                          style={styleDesconto1}
                        />
                      )}
                    </div>

                    <div className="col-sm-6 col-md-4 col-xl-4 ">
                      {InputFieldDescontoComponent2 && (
                        <InputFieldDescontoComponent2
                          label={labelInputFieldDesconto2}
                          type="text"
                          value={valueInputFieldDesconto2}
                          onChange={onChangeInputFieldDesconto2}
                          readOnly={readOnlyDesconto2}
                          style={styleDesconto2}
                        />
                      )}
                    </div>

                    <div className="col-sm-6 col-md-4 col-xl-4 ">
                      {InputFieldVrInicio && (
                        <InputFieldVrInicio
                          label={labelInputFieldVrInicio}
                          type="text"
                          value={valueInputFieldVrInicio}
                          onChange={onChangeInputFieldVrInicio}
                          readOnly={readOnlyVrInicio}
                          style={styleVrInicio}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-sm-6 col-md-6 col-xl-4 ">
                      {InputFieldVrFim && (
                        <InputFieldVrFim
                          label={labelInputFieldVrFim}
                          type="text"
                          value={valueInputFieldVrFim}
                          onChange={onChangeInputFieldVrFim}
                          readOnly={readOnlyVrFim}
                          style={styleVrFim}
                          // disabled={readOnlyVrFim}
                        />
                      )}
                    </div>


                   
                    
                  </div>    
                  <div className="row mt-3">
                    <div className="col-sm-6 col-md-6 col-xl-6 ">
                      {InputFieldDTInicioComponent && (
                        <InputFieldDTInicioComponent
                          label={labelInputDTInicio}
                          type="date"
                          id={id}
                          value={valueInputFieldDTInicio}
                          onChange={onChangeInputFieldDTInicio}
                          readOnly={readOnlyDTInicio}
                        />
                      )}
                    </div>

                    <div className="col-sm-6 col-md-6 col-xl-6 ">
                      {InputFieldDTFimComponent && (
                        <InputFieldDTFimComponent
                          label={labelInputDTFim}
                          type="date"
                          id={id}
                          value={valueInputFieldDTFim}
                          onChange={onChangeInputFieldDTFim}
                          readOnly={readOnlyDTFim}
                        />
                      )}
                    </div>
                  </div>

                 

                  {/* <hr style={{ borderColor: 'black', width: '100%', height: '10px' }} /> */}
                  {/* FIM MECANICA */}
                  
                  {/* <h2>Fonecedor</h2> */}

                  {/* INICIO FORNECEDOR */}
                  <div className="row mt-3">
                      {InputSelectFornecedorComponent && (
                        <InputSelectFornecedorComponent
                          label={labelSelectFornecedor}
                          readOnly={readOnlyFornecedor}
                          id={id}
                          options={optionsFornecedores}
                          onChange={onChangeSelectFornecedor}
                          value={valueSelectFornecedor}
                          defaultValue={defaultValueSelectFornecedor}

                        />

                      )}
                    
                  </div>

                  {/* FIM FORNECEDOR */}
                  <hr style={{ borderColor: 'black', width: '100%', height: '10px' }} />
                  
                  <div className="row mt-3" >


                    {/* {InputSelectCategoriaComponent && (
                      <InputSelectCategoriaComponent
                        label={labelSelectCategoria}
                        readOnly={readOnlyComprador}
                        id={id}
                        options={optionsCategorias}
                        value={defaultValueSelectCategoria}
                        onChange={onChangeSelectCategoria}
                      />
                    )} */}
                    <div className="col-sm-6 col-md-6 col-xl-6 ">

                      {InputSelectMarcasComponent && (
                        <InputSelectMarcasComponent
                          label={labelSelectMarcas}
                          readOnly={readOnlyMarcas}
                          id={id}
                          options={optionsMarcas}
                          onChange={onChangeSelectMarcas}
                          value={valueSelectMarca}
                          defaultValue={defaultValueSelectMarca}
                          type="select"
                        />
                      )}
                    </div>

                    {/* {InputSelectEmpresaComponent && (
                      <InputSelectEmpresaComponent
                        label={labelSelectEmpresa}
                        type="select"
                        id={id}
                        readOnly={readOnlyEmpresa}
                        options={optionsSelectEmpresa}
                        value={valueSelectEmpresa}
                        onChange={onChangeSelectEmpresa}
                        defaultValue={defaultValueSelectEmpresa}
                      />
                    )} */}

                      {InputSelectEmpresaComponentAync && (
                        <InputSelectEmpresaComponentAync
                          label={labelSelectEmpresaAsync}
                          defaultValue={valueSelectEmpresaAsync}
                          optionsMultSelect={optionsEmpresasAsync}
                          onChange={onChangeSelectEmpresaAsync}
                          // loadOptions={loadOptionsEmpresasAsync}
                          // defaultOptionsAsync={defaultOptionsEmpresasAsync}
                          isMulti={true}
                        />
                      )}
                     
                  </div>


                  <hr style={{ borderColor: 'black', width: '100%', height: '10px' }} />

                  {/* INICIO PRODUTO ORIGEM */}
                    <h2>Produto Origem</h2>
                  <div className="row mt-3">

                    <div className="col-sm-6 col-md-6 col-xl-6 ">
                      {InputFieldProdutoOigem && (
                        <InputFieldProdutoOigem
                          label={labelInputFieldProdutoOigem}
                          type="text"
                          value={valueInputFieldProdutoOigem}
                          onChange={onChangeInputFieldProdutoOigem}
                          readOnly={readOnlyProdutoOigem}
                        />
                      )}
                    </div>
                    <div className="col-sm-6 col-md-6 col-xl-6">
                      {InputFileProdutoOigem && (
                        <InputFileProdutoOigem
                          label={labelInputFileProdutoOigem}
                          type="file"
                          accpet={acceptFileProdutoOigem}
                          value={valueInputFileProdutoOigem}
                          onChange={onChangeInputFileProdutoOigem}
                          readOnly={readOnlyFileProdutoOigem}
                          disabled={readOnlyFileProdutoOigem}
                        />
                      )}

                      {ButtonTypeCancelar && (
                        <ButtonTypeCancelar
                          textButton={linkCancelar}
                          onClickButtonType={onButtonClickCancelar}
                          cor={corCancelar}
                          tipo="button"
                          Icon={IconCancelar}
                          iconColor="#fff"
                          iconSize={16}
                        />
                      )}
                    </div>

                  </div>
                  <hr style={{ borderColor: 'black', width: '100%', height: '10px' }} />

                  {/* FIM PRODUTO ORIGEM */}

                  {/* INICIO PRODUTO DESTINO  */}
                  <h2>Produto Destino</h2>
                  <div className="row mt-3">
                    <div className="col-sm-6 col-md-6 col-xl-6 ">

                      {InputFieldProdutoDestino && (
                        <InputFieldProdutoDestino
                          label={labelInputFieldProdutoDestino}
                          type="text"
                          value={valueInputFieldProdutoDestino}
                          onChange={onChangeInputFieldProdutoDestino}
                          readOnly={readOnlyProdutoDestino}
                        />
                      )}
                    </div>

                    <div className="col-sm-6 col-md-6 col-xl-6 ">
                      {InputFileProdutoDestino && (
                        <InputFileProdutoDestino
                          label={labelInputFileProdutoDestino}
                          type="file"
                          accpet={acceptFileProdutoDestino}
                          value={valueInputFileProdutoDestino}
                          onChange={onChangeInputFileProdutoDestino}
                          readOnly={readOnlyFileProdutoDestino}
                          disabled={readOnlyFileProdutoDestino}
                        />
                      )}

                      {ButtonTypeCadastro && (
                        <ButtonTypeCadastro
                          textButton={linkNome}
                          onClickButtonType={onButtonClickCadastro}
                          cor={corCadastro}
                          tipo="button"
                          Icon={IconCadastro}
                          iconColor="#fff"
                          iconSize={16}
                        />
                      )} 
                      
                    </div>

                  </div>
                  {/* FIM PRODUTO DESTINO */}

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



                    {ButtonTypePedido && (
                      <ButtonTypePedido
                        textButton={linkPedido}
                        onClickButtonType={onButtonClickPedido}
                        // cor="danger"
                        cor={corPedido}
                        tipo="button"
                        Icon={IconPedido}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}
                    {ButtonTypeTXT && (
                      <ButtonTypeTXT
                        textButton={linkTXT}
                        onClickButtonType={onButtonClickTXT}
                        // cor="danger"
                        cor={corTXT}
                        tipo="button"
                        Icon={IconTXT}
                        iconColor="#000"
                        iconSize={16}
                        style={{ color: 'white' }}
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