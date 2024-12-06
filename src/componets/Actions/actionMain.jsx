import React, { Fragment } from "react"
import { ButtonType } from "../Buttons/ButtonType";
import { MdAdd } from "react-icons/md";
import { AiOutlineSave, AiOutlineSearch } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GoDownload, GoUpload } from "react-icons/go";
import { InputFieldCheckBox } from "../Inputs/InputChekBox";
import { HeadTitleComponent } from "../HeadTitle";
import AsyncSelectAction from "../Select/AsyncSelectAction";
import { MenuTreeSelect } from "../Inputs/menuDropDown";
import { Menu } from "primereact/menu";



export const ActionMain = ({
  title,
  subTitle,
  linkComponentAnterior,
  linkComponent,

  buttonHeader,
  onClickButtonTypeHeader,
  textButtonHeader,
  disabledBTNHeader,
  iconSizeHeader,
  iconHeader,
  corHeader,

  readOnlyDescricao,

  valueSelectEmpresa,
  valueSelectMarca,
  valueSelectUF,
  valueSelectComissoes,
  valueSelectQuebra,
  valueSelectGrupo,
  valueSelectSubGrupo,
  valueSelectPagamento,
  valueSelectFuncionario,
  valueSelectCondicoesPagamentos,
  valueSelectFornecedor,
  valueSelectFabricante,
  valueSelectComprador,
  valueSelectSituacao,
  valueSelectCampanha,
  valueSelectTipoPedido,

  defaultOptionsEmpresasAsync,
  defaultOptionsMarcaAsync,
  defaultOptionsFornecedoresAsync,
  defaultOptionsFabricantesAsync,
  defaultOptionsCompradoresAsync,

  valueSelectEmpresaAsync,
  valueSelectMarcaAsync,
  valueSelectFornecedoresAsync,
  valueSelectFabricantesAsync,
  valueSelectCompradoresAsync,
  
  valueMultSelectGrupo,
  valueMultSelectSubGrupo,
  valueMultSelectMarca,
  valueMultSelectFornecedor,
  valueMultSelectEmpresa,
  valueMultSelectFuncionario,

  defaultValueMultSelectGrupo,

  defaultValueSelectFornecedor,
  
  isMultiSelectGrupo,
  isMultiSelectMarca,

  valueSelectGrade,



  valueDTCosulta,
  valueInputFieldDTInicio,
  valueInputFieldDTFim,
  valueInputFieldDTFimA,
  valueInputFieldDTFimB,
  valueInputFieldDTFimC,
  valueInputFieldDTInicioA,
  valueInputFieldDTInicioB,
  valueInputFieldDTInicioC,

  valueInputFieldDescricao,
  valueInputQuantidade,
  valueInputField,  
  valueInputFieldCodBarra,
  valueInputFieldNumeroVoucher,
  valueInputFieldNumeroNF,
  valueInputFieldLojaOrigem,
  valueInputFieldVendedor,
  valueInputFieldTelefone,
  valueInputFieldVendaCPFCNPJ,
  valueInputFieldEndereco,
  valueInputFieldComplemento,
  valueInputFieldUF,
  valueInputFieldCep,
  valueInputFieldBairro,
  valueInputFieldCidade,
  valueInputFieldSerie,
                        
  

  valueTextAreaFieldComponent,
  
  nomeSelectGrupo,
  
  onChangeTextAreaFieldComponent,
  
 
  onChangeInputFieldLojaOrigem,
  onChangeInputFieldNumeroNF,
  onChangeInputFieldDescricao,
  onChangeInputFieldDTConsulta,
  onChangeInputFieldDTInicio,
  onChangeInputFieldDTInicioA,
  onChangeInputFieldDTInicioB,
  onChangeInputFieldDTInicioC,
  onChangeInputFieldDTFimA,
  onChangeInputFieldDTFimB,
  onChangeInputFieldDTFimC,
  onChangeInputFieldDTFim,
  onChangeInputQuantidade,
  onChangeInputField,
  onChangeInputFieldCodBarra,
  onChangeInputFieldNumeroVoucher,
  onChangeInputFieldVendedor,
  onChangeInputFieldVendaCPFCNPJ,
  onChangeInputFieldTelefone,
  onChangeInputFieldEndereco,
  onChangeInputFieldComplemento,
  onChangeInputFieldUF,
  onChangeInputFieldCep,
  onChangeInputFieldBairro,
  onChangeInputFieldCidade,
  onChangeInputFieldSerie,

  onChangeSelectEmpresa,
  onChangeSelectMarcas,
  onChangeSelectUF,
  onChangeSelectComissoes,
  onChangeSelectQuebra,
  onChangeSelectGrupo,
  onChangeSelectSubGrupo,
  onChangeSelectPagamento,
  onChangeSelectFuncionario,
  onChangeSelectCondicoesPagamentos,
  onChangeSelectFornecedor,
  onChangeSelectFabricante,
  onChangeSelectComprador,
  onChangeSelectSituacao,
  onChangeSelectCampanha,
  onChangeSelectTipoPedido,
  onChangeSelectGrade,

  
  onChangeSelectEmpresaAsync,
  onChangeSelectMarcaAsync,
  onChangeSelectFornecedoresAsync,
  onChangeSelectFabricantesAsync,
  onChangeSelectCompradoresAsync,

  onChangeMultSelectGrupo,
  onChangeMultSelectSubGrupo,
  onChangeMultSelectMarca,
  onChangeMultSelectFornecedor,
  onChangeMultSelectEmpresa,
  onChangeMultSelectFuncionario,

  // Selects
  options,
  optionsSelectUF,
  optionsSelectCampanha,
  optionsMarcas,
  optionsEmpresas,
  optionsComissoes,
  optionsQuebra,
  optionsGrupos,
  optionsSubGrupos,
  optionsLojas,
  optionsFornecedores,
  optionsGrades,
  optionsFabricantes,
  optionsCompradores,
  optionsSituacao,
  optionsNFE,
  optionsSaldo,
  optionsFilial,
  optionsFrete,
  optionsUsoPrinicipal,
  optionsPagamento,
  optionsTipoNF,
  optionsFilialCNPJ,
  optionsContaBanco,
  optionsFuncionarios,
  optionsFiscal,
  optionsSelectEnviar,
  optionsCondicoesPagamentos,
  optionsTipoPedido,
  optionsSelectTransportadora,
  optionsSelectRotina,
  optionsFieldLojaOrigemComponent,
  
  optionsEmpresasAsync,
  optionsMarcaAsync,
  optionsFornecedoresAsync,
  optionsFabricantesAsync,
  optionsCompradoresAsync,

  loadOptionsEmpresasAsync,
  loadOptionsMarcaAsync,
  loadOptionsFornecedoresAsync,
  loadOptionsFabricantesAsync,
  loadOptionsCompradoresAsync,

  optionsMultSelectGrupo,
  optionsMultSelectSubGrupo,
  optionsMultSelectMarca,
  optionsMultSelectFornecedor,
  optionsMultSelectEmpresa,
  optionsMultSelectFuncionario,

  // Multi Selects
  MultSelectGrupoComponent,
  MultSelectSubGrupoComponent,
  MultSelectMarcaComponent,
  MultSelectFornecedorComponent,
  MultSelectEmpresaComponent,
  MultSelectFuncionarioComponent,

  animatedComponentsGrupo,
  animatedComponentsSubGrupo,
  animatedComponentsMarca, 
  animatedComponentsFornecedor,
  animatedComponentsEmpresa,
  animatedComponentsFuncionario,

  // Inputs Fields
  InputFieldComponent,
  InputFieldUFComponent,
  InputFieldComplementoComponent,
  InputFieldEnderecoComponent,
  InputFieldBairroComponent,
  InputFieldCidadeComponent,
  InputFieldCepComponent,
  InputFieldTelefoneComponent ,
  InputFieldNumeroNFComponent,
  InputFieldDTInicioComponent,
  InputFieldDTInicioAComponent,
  InputFieldDTInicioBComponent,
  InputFieldDTInicioCComponent,
  InputFieldDTFimComponent,
  InputFieldDTFimAComponent,
  InputFieldDTFimBComponent,
  InputFieldDTFimCComponent,
  InputFieldDTConsultaComponent,
  InputFieldCodBarraComponent,
  InputFieldVendaCPFCNPJComponent,
  InputFieldNumeroVoucherComponent,
  InputFieldSerieComponent,
  InputFieldModeloNFComponent,
  InputFieldChaveNFComponent,
  InputFieldNFCEComponent,
  InputFieldLojaOrigemComponent,
  InputFieldLojaDestinoComponent,
  InputFieldDescricaoComponent,
  InputFieldQuantidadeComponent,
  InputFieldStatusComponent,
  InputFieldObsFornecedor,
  InputFieldObsInterna,
  InputFieldVendedor,
  InputFieldEmailVendedor,
  

  InputFieldTotalAntesDescontoComponent,
  InputFieldDescontoComponent,
  InputFieldDescontoComponent1,
  InputFieldDescontoComponent2,
  InputFieldDescontoComponent3,
  InputFieldComissao,
  InputFieldTotalLiq,
  InputFieldAdiantamentoTotalComponent,
  InputFieldDespesasAdicionaisComponent,
  InputFieldImpostoComponent,
  InputFieldImpostoRetidoComponent,
  InputFieldTotaPagarComponent,
  InputFieldSaldoComponent,
  InputFieldValorAplicadoComponent,

  TextAreaFieldComponent,


  // Inputs Selects
  InputSelectEmpresaComponent,
  InputSelectCampanhaComponent,
  InputSelectMarcasComponent,
  InputSelectUFComponent,
  InputSelectComissoesComponent,
  InputSelectQuebraComponent,
  InputSelectGrupoComponent,
  InputSelectSubGrupoComponent,
  InputSelectLojasComponent,
  InputSelectFornecedorComponent,
  InputSelectGradeComponent,
  InputSelectFabricanteComponent,
  InputSelectCompradorComponent,
  InputSelectPagamentoComponent,
  InputSelectUsoPrinicipalComponent,
  InputSelectFreteComponent,
  InputSelectSaldoComponent,
  InputSelectFilialComponent,
  InputSelectNFEComponent,
  InputSelectSituacaoComponent,
  InputSelectFilialCNPJComponent,
  InputSelectTipoNFComponent,
  InputSelectContaBancoComponent,
  InputSelectFuncionarioComponent,
  InputSelectFiscalComponent,
  InputSelectEnviarComponent,
  InputSelectCondicoesPagamentos,
  InputSelectTipoPedido,
  InputSelectTransportadora,
  InputSelectRotina,
  
  // Selects Async
  InputSelectEmpresaComponentAync,
  InputSelectMarcaComponentAync,
  InputSelectFonecedoresComponentAync,
  InputSelectFabricantesComponentAync,
  InputSelectCompradoresComponentAync,


  // Inputs CheckBox
  CheckBoxComponent,
  CheckBoxComponent1,
  CheckBoxComponent2,
  CheckBoxComponent3,
  CheckBoxComponent4,
  CheckBoxComponent5,

  // Buttons
  ButtonSearchComponent,
  ButtonModalComponent,
  ButtonTypeCadastro,
  ButtonTypeCancelar,
  ButtonTypeSalvar,
  ButtonTypeExportar,
  ButtonTypeImportar,
  ButtonTypeVendasEstrutura,
  ButtonTypeVendasVendedor,
  ButtonTypeProdutoVendidos,
  ButtonTypeVendasResumida,
  ButtonTypeVendasPorPeriodo,
  ButtonTypeVendasPorProduto,
  ButtonTypeBalanco,
  ButtonTypeSaldo,
  ButtonTypeLoja,
  ButtonTypeVincular,

  // Labels
  labelInputField,
  labelInputFieldDTFim,
  labelInputDTFimA,
  labelInputDTFimB,
  labelInputDTFimC,
  labelInputFieldDTInicio,
  labelInputDTInicioA,
  labelInputDTInicioB,
  labelInputDTInicioC,
  labelInputFieldDTConsulta,
  labelInputFieldCodBarra,
  labelInputFieldNVoucherNVendaCPFCNPJ,
  labelInputFieldVendaCPFCNPJ,
  labelInputFieldNumeroVoucher,
  labelInputFieldSerie,
  labelInputFieldNFCE,
  labelInputFieldStatus,
  labelInputFieldLojaOrigem,
  labelInputFieldLojaDestino,
  labelInputFieldDescricao,
  labelInputFieldQuantidade,
  labelInputFieldNumeroNF,
  labelInputFieldModeloNF,
  labelInputFieldChaveNF,
  labelInputFieldUF,
  labelInputFieldComplemento,
  labelInputFieldEndereco,
  labelInputFieldBairro,
  labelInputFieldCidade,
  labelInputFieldCep,
  labelInputFieldObsFornecedor,
  labelInputFieldObsInterna,
  labelInputFieldVendedor,
  labelInputFieldEmailVendedor,
  labelInputFieldComissao,
  labelInputFieldTotalLiq,
  labelInputFieldTelefone,

  labelTextAreaField,
  labelInputFieldTotalAntesDesconto,
  labelInputFieldDesconto,
  labelInputFieldDesconto1,
  labelInputFieldDesconto2,
  labelInputFieldDesconto3,
  labelInputFieldAdiantamentoTotal,
  labelInputFieldDespesasAdicionais,
  labelInputFieldImposto,
  labelInputFieldImpostoRetido,
  labelInputFieldTotaPagar,
  labelInputFieldSaldo,
  labelInputFieldValorAplicado,

  placeHolderInputFieldDescricao,
  placeHolderInputFieldComponent,
  placeHolderInputFieldCodBarra,
  placeHolderInputFieldNumeroNF,
  placeHolderInputFieldSerie,
  placeHolderInputFieldTelefone,
  placeHolderInputFieldVendaCPFCNPJ,
  placeHolderInputFieldQuantidade,
  
  labelMultSelectGrupo,
  labelMultSelectSubGrupo,
  labelMultSelectMarca,
  labelMultSelectFornecedor,
  labelMultSelectEmpresa,
  labelMultSelectFuncionario,

  labelSelectUF,
  labelSelectComissoes,
  labelSelectMarcas,
  labelSelectEmpresa,
  labelSelectQuebra,
  labelSelectGrupo,
  labelSelectSubGrupo,
  labelSelectLojas,
  labelSelectFornecedor,
  labelSelectGrade,
  labelSelectFabricantes,
  labelSelectFilialCNPJ,
  labelSelectTipoNF,
  labelSelectCampanha,
  labelSelectContaBanco,
  labelSelectFiscal,
  labelSelectEnviar,
  labelSelectCondicoesPagamentos,
  labelSelectTipoPedido,
  labelSelectTransportadora,
  labelSelectRotina,
  
  labelSelectEmpresaAsync,
  labelSelectMarcaAsync,
  labelSelectFornecedoresAsync,
  labelSelectFabricantesAsync,
  labelSelectCompradoresAsync,


  // Label CheckBox
  labelCheckBox1,
  labelCheckBox2,
  labelCheckBox3,
  labelCheckBox4,
  labelCheckBox5,

  linkNome,
  linkNomeVincular,
  linkNomeModal,
  linkCancelar,
  linkExportar,
  linkImportar,
  linkNomeSearch,
  linkNomeVendasResumido,
  linkNomeVendasPorPeriodo,
  linkNomeVendasPorProduto,
  linkNomeVendasEstrutura,
  linkNomeVendasVendedor,
  linkNomeProdutoVendido,
  linkNomeLoja,
  linkNomeSaldo,
  linkNomeBalanco,
  labelSelectPagamento,
  labelSelectUsoPrinicipal,
  labelSelectFrete,
  labelSelectSaldo,
  labelSelectFilial,
  labelSelectNFE,
  labelSelectSituacao,
  labelSelectFuncionario,
  // labelSelectFornecedor,
  // labelSelectFabricantes,
  labelSelectComprador,
  // labelSelectGrade,
  // labelSelectNFE,
  // labelSelectSituacao,

  styleSituacao, 
  id,

  isDisabledEmpresa,

  // Funções

  onButtonClickSearch,
  onButtonClickSalvar,
  onButtonClickCancelar,
  onButtonClickCadastro,
  onClickCriarVoucher,
  onClickVendaCPFCNPJ,
  onButtonClickModal,
  onButtonClickVendasEstrutura,
  onButtonClickVendasVendedor,
  onButtonClickLoja,
  onButtonClickSaldo,
  onButtonClickExportar,
  onButtonClickImportar,
  onButtonClickTypeBalanco,
  onButtonClickVincular,
  onButtonClickVendaPeriodo,
  onButtonClickVendaProduto,
  onButtonClickProdutoVendido,
  onButtonClickVendasResumido,

  iconVendasEstrutura,
  iconVendasVendedor,
  iconProdutoVendido,
  iconVendasResumida,
  IconCadastro,
  IconCancelar,
  IconSearch,
  iconTypeSaldo,
  iconSizeCadastro,

  corCadastro,
  corCancelar,
  corSalvar,
  corSearch,
  corVendasEstrutura,
  corVendasVendedor,
  corTypeSaldo,
  corProdutoVendido,

  MenuTreeSelectComponent,
  valueTreeSelect,
  optionsTreeSelect,
  onChangeTreeSelect,
  placeholderTreeSelect,
  onNodeTreeSelect,
  onNodeTreeUnselect,

  idCheckBox,
  labelCheckBox,
  nomeChekBox,
  isChekedBox,
  onChangeCheckBox
}) => {
  const Options = [
    { value: 0, label: "Todos" },
    // Adicione outras opções conforme necessário
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Fragment>
      <form action="#" onSubmit={handleSubmit} style={{zIndex: 9999}} >
        <HeadTitleComponent
          tittuloComponent={title}
          nomeLoja={subTitle}
          linkComponentAnterior={linkComponentAnterior}
          linkComponent={linkComponent}
          buttonHeader={buttonHeader}
          onClickButtonTypeHeader={onClickButtonTypeHeader}
          textButtonHeader={textButtonHeader}
          disabledBTNHeader={disabledBTNHeader}
          iconSize={iconSizeHeader}
          Icon={iconHeader}
          cor={corHeader}
        />
        <div className="row">
          <div className="col-xl-12">
            <div id="panel-1" className="panel">
              <div className="panel-container show ">


                <div className="panel-tag" style={{paddingBottom: '5rem'}}>
                  <div className="row">
                    {MenuTreeSelectComponent && (

                      <MenuTreeSelectComponent
                      valueMenuSelect={valueTreeSelect}
                      onChangeMenuSelect={onChangeTreeSelect}
                      optionsMenuSelect={optionsTreeSelect}
                      placeholderMenuSelect={placeholderTreeSelect}
                      onNodeMenuSelect={onNodeTreeSelect} 
                      onNodeMenuUnselect={onNodeTreeUnselect} 
                      />
                    )}
                  </div>
                  <div className="row">
                    {InputFieldDTInicioAComponent && (
                      <InputFieldDTInicioAComponent
                        label={labelInputDTInicioA}
                        type="date"
                        id={id}
                        name="dtconsultainicio"
                        value={valueInputFieldDTInicioA}
                        onChange={onChangeInputFieldDTInicioA}

                      />
                    )}
                    {InputFieldDTFimAComponent && (
                      <InputFieldDTFimAComponent
                        label={labelInputDTFimA}
                        type="date"
                        id={id}
                        name="dtconsultafim"
                        value={valueInputFieldDTFimA}
                        onChange={onChangeInputFieldDTFimA}
                      />
                    )}
                    
                    {InputFieldDTInicioBComponent && (
                      <InputFieldDTInicioBComponent
                        label={labelInputDTInicioB}
                        type="date"
                        id={id}
                        name="dtconsultainicio"
                        value={valueInputFieldDTInicioB}
                        onChange={onChangeInputFieldDTInicioB}

                      />
                    )}

                    {InputFieldDTFimBComponent && (
                      <InputFieldDTFimBComponent
                        label={labelInputDTFimB}
                        type="date"
                        id={id}
                        name="dtconsultafim"
                        value={valueInputFieldDTFimB}
                        onChange={onChangeInputFieldDTFimB}
                      />
                    )}

                    {InputFieldDTInicioCComponent && (
                      <InputFieldDTInicioCComponent
                        label={labelInputDTInicioC}
                        type="date"
                        id={id}
                        name="dtconsultainicio"
                        value={valueInputFieldDTInicioC}
                        onChange={onChangeInputFieldDTInicioC}
                      />
                    )}


                    {InputFieldDTFimCComponent && (
                      <InputFieldDTFimCComponent
                        label={labelInputDTFimC}
                        type="date"
                        id={id}
                        name="dtconsultafim"
                        value={valueInputFieldDTFimC}
                        onChange={onChangeInputFieldDTFimC}
                      />
                    )}
                  </div>
                 
                  <div className="row">

                    {/* Inputs Datas */}


                    {InputFieldDTInicioComponent && (
                      <InputFieldDTInicioComponent
                        label={labelInputFieldDTInicio}
                        type="date"
                        id={id}
                        name="dtconsultainicio"
                        value={valueInputFieldDTInicio}
                        onChange={onChangeInputFieldDTInicio}
                      />
                    )}
                    {/* {InputFieldDTInicioComponent && (
                      <InputFieldDTInicioComponent
                        label={labelInputFieldDTInicio}                     
                        id={id}
                        value={valueInputFieldDTInicio}
                        onChange={onChangeInputFieldDTInicio}
                      />
                    )} */}
                    {InputFieldDTFimComponent && (
                      <InputFieldDTFimComponent
                      label={labelInputFieldDTFim}
                      type="date"
                      id={id}
                      name="dtconsultafim"
                      value={valueInputFieldDTFim}
                      onChange={onChangeInputFieldDTFim}
                        
                      />

                    )}

                    {InputFieldDTConsultaComponent && (
                      <InputFieldDTConsultaComponent
                        label={labelInputFieldDTConsulta}
                        type="date"
                        id={id}
                        name="dtconsultafim"
                        value={valueDTCosulta}
                        onChange={onChangeInputFieldDTConsulta}
                      />
                    )}

                    {InputFieldComissao && (
                      <InputFieldComissao
                        label={labelInputFieldComissao}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />
                    )}

                    {InputFieldObsFornecedor && (
                      <InputFieldObsFornecedor
                        label={labelInputFieldObsFornecedor}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />

                    )}

                    {InputFieldObsInterna && (
                      <InputFieldObsInterna
                        label={labelInputFieldObsInterna}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />
                    )}

                    {InputFieldVendedor && (
                      <InputFieldVendedor
                        label={labelInputFieldVendedor}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value={valueInputFieldVendedor}
                        onChange={onChangeInputFieldVendedor}
                      />
                    )}

                    {InputFieldEmailVendedor && (
                      <InputFieldEmailVendedor
                        label={labelInputFieldEmailVendedor}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />
                    )}


                    {InputFieldDescontoComponent1 && (
                      <InputFieldDescontoComponent1
                        label={labelInputFieldDesconto1}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />
                    )}
                    {InputFieldDescontoComponent2 && (
                      <InputFieldDescontoComponent2
                        label={labelInputFieldDesconto2}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />
                    )}

                    {InputFieldDescontoComponent3 && (
                      <InputFieldDescontoComponent3
                        label={labelInputFieldDesconto3}
                        type="text"
                        id={id}
                        name="dtconsultafim"
                        value=""
                      />
                    )}

                    {InputFieldLojaOrigemComponent && (
                      <InputFieldLojaOrigemComponent
                        label={labelInputFieldLojaOrigem}
                        type="input"
                        id={id}
                        options={optionsFieldLojaOrigemComponent}
                        value={valueInputFieldLojaOrigem}
                        onChange={onChangeInputFieldLojaOrigem}
                        readOnly={true}
                      />
                    )}




                    {/* Selects */}


                    {InputSelectEmpresaComponentAync && (                
                      <AsyncSelectAction
                        label={labelSelectEmpresaAsync}
                        valueSelectAsync={valueSelectEmpresaAsync}
                        filtroOptions={optionsEmpresasAsync}
                        id={id}
                        onChangeSelectAsync={onChangeSelectEmpresaAsync}
                        loadOptions={loadOptionsEmpresasAsync}
                        defaultOptionsAsync={defaultOptionsEmpresasAsync}
                    
                      />
                    )}
                    {InputSelectMarcaComponentAync && (                
                      <InputSelectMarcaComponentAync
                        label={labelSelectMarcaAsync}
                        value={valueSelectMarcaAsync}
                        filterOption={optionsMarcaAsync}
                        onChange={onChangeSelectMarcaAsync}
                        loadOptions={loadOptionsMarcaAsync}
                        defaultOptions={defaultOptionsMarcaAsync}
                        
                      />
                    )} 
                    {InputSelectFonecedoresComponentAync && (                
                      <InputSelectFonecedoresComponentAync
                        label={labelSelectFornecedoresAsync}
                        valueSelectAsync={valueSelectFornecedoresAsync}
                        filtroOptions={optionsFornecedoresAsync}
                        onChangeSelectAsync={onChangeSelectFornecedoresAsync}
                        loadOptions={loadOptionsFornecedoresAsync}
                        defaultOptionsAsync={defaultOptionsFornecedoresAsync}
                        
                      />
                    )}
                    {InputSelectFabricantesComponentAync && (                
                      <InputSelectFabricantesComponentAync
                        label={labelSelectFabricantesAsync}
                        valueSelectAsync={valueSelectFabricantesAsync}
                        filtroOptions={optionsFabricantesAsync}
                        onChangeSelectAsync={onChangeSelectFabricantesAsync}
                        loadOptions={loadOptionsFabricantesAsync}
                        defaultOptionsAsync={defaultOptionsFabricantesAsync}
                        
                      />
                    )}
                    {InputSelectCompradoresComponentAync && (                
                      <InputSelectCompradoresComponentAync
                        label={labelSelectCompradoresAsync}
                        valueSelectAsync={valueSelectCompradoresAsync}
                        filtroOptions={optionsCompradoresAsync}
                        onChangeSelectAsync={onChangeSelectCompradoresAsync}
                        loadOptions
                        defaultOptionsAsync={defaultOptionsCompradoresAsync}
                        
                      />
                    )} 


                    {InputSelectEmpresaComponent && (
                      <InputSelectEmpresaComponent
                        label={labelSelectEmpresa}
                        isDisabled={isDisabledEmpresa}
                        id={id}
                        options={optionsEmpresas}
                        value={valueSelectEmpresa}
                        defaultValue={[valueSelectEmpresa]}
                        onChange={onChangeSelectEmpresa}
                        filtroOptions={optionsEmpresas}
                      />
                    )}

                    {InputSelectGrupoComponent && (
                      <InputSelectGrupoComponent
                        label={labelSelectGrupo}
                        nome={nomeSelectGrupo}
                       
                        options={optionsGrupos}
                        value={valueSelectGrupo}
                        onChange={onChangeSelectGrupo}
                      />
                    )}
                    {InputSelectSubGrupoComponent && (
                      <InputSelectSubGrupoComponent
                        label={labelSelectSubGrupo}
                        nome="idmarca"
                       
                        options={optionsSubGrupos}
                        value={valueSelectSubGrupo}
                        onChange={onChangeSelectSubGrupo}
                      />
                    )}


                    {InputSelectMarcasComponent && (
                      <InputSelectMarcasComponent
                        label={labelSelectMarcas}
                        nome="idloja"
                        id={id}
                        options={optionsMarcas}
                        onChange={onChangeSelectMarcas}
                        value={valueSelectMarca}
                        
                        type="select"
                      />
                    )}

                    {InputSelectFuncionarioComponent && (
                      <InputSelectFuncionarioComponent
                        label={labelSelectFuncionario}
                        nome="funcionario"
                        id={id}
                        options={optionsFuncionarios}
                        value={valueSelectFuncionario}
                        onChange={onChangeSelectFuncionario}
                               
                      />
                    )}

                    {InputSelectUFComponent && (
                      <InputSelectUFComponent
                        label={labelSelectUF}
                        nome="idloja"
                        id={id}
                        options={optionsSelectUF}
                        value={valueSelectUF}
                        onChange={onChangeSelectUF}
                      />
                    )}
                    {InputSelectComissoesComponent && (
                      <InputSelectComissoesComponent
                        label={labelSelectComissoes}
                        nome="idloja"
                        id={id}
                        options={optionsComissoes}
                        value={valueSelectComissoes}
                        onChange={onChangeSelectComissoes}
                      />
                    )}

                    {InputSelectQuebraComponent && (
                      <InputSelectQuebraComponent
                        label={labelSelectQuebra}
                        nome="idloja"
                        id={id}
                        options={optionsQuebra}
                        value={valueSelectQuebra}
                        onChange={onChangeSelectQuebra}
                      />
                    )}

                    {InputSelectFornecedorComponent && (
                      <InputSelectFornecedorComponent
                        label={labelSelectFornecedor}
                        nome="Fornecedor"
                        id={id}
                        options={optionsFornecedores}
                        onChange={onChangeSelectFornecedor}
                        value={valueSelectFornecedor}
                        defaultValue={defaultValueSelectFornecedor}
                      />

                    )}

                    {InputSelectFabricanteComponent && (
                      <InputSelectFabricanteComponent
                        label={labelSelectFabricantes}
                        nome="idloja"
                        id={id}
                        options={optionsFabricantes}
                        defaultValue={valueSelectFabricante}
                        onChange={onChangeSelectFabricante}
                      />
                    )}

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

                    {InputSelectSituacaoComponent && (
                      <InputSelectSituacaoComponent
                        label={labelSelectSituacao}
                        nome="idloja"
                        id={id}
                        options={optionsSituacao}
                        defaultValue={valueSelectSituacao}
                        onChange={onChangeSelectSituacao}
                        styles={styleSituacao}
                      />
                    )}
                    {InputSelectGradeComponent && (
                      <InputSelectGradeComponent
                        label={labelSelectGrade}
                        nome="idloja"
                        id={id}
                        options={optionsGrades}
                        value={valueSelectGrade}
                        onChange={onChangeSelectGrade}
                      />
                    )}

                    {InputSelectFilialCNPJComponent && (
                      <InputSelectFilialCNPJComponent
                        label={labelSelectFilialCNPJ}
                        nome="idloja"
                        id={id}
                        options={optionsFilialCNPJ}
                      />
                    )}

                    {InputSelectTipoNFComponent && (
                      <InputSelectTipoNFComponent
                        label={labelSelectTipoNF}
                        nome="idloja"
                        id={id}
                        options={optionsTipoNF}
                      />
                    )}

                    {InputSelectContaBancoComponent && (
                      <InputSelectContaBancoComponent
                        label={labelSelectContaBanco}
                        nome="idloja"
                        id={id}
                        options={optionsContaBanco}
                      />

                    )}

                    {InputSelectTransportadora && (
                      <InputSelectTransportadora
                        label={labelSelectTransportadora}
                        nome="idloja"
                        id={id}
                        options={optionsSelectTransportadora}
                      />
                    )}

                    {InputSelectFreteComponent && (

                      <InputSelectFreteComponent
                        label={labelSelectFrete}
                        nome="idloja"
                        id={id}
                        options={optionsFrete}
                      />
                    )}

                    {InputSelectRotina && (
                      <InputSelectRotina
                        label={labelSelectRotina}
                        nome="idloja"
                        id={id}
                        options={optionsSelectRotina}
                      />
                    )}


                    {/* Multi Select */}

                    {MultSelectGrupoComponent && (
                      <MultSelectGrupoComponent
                        label={labelMultSelectGrupo}
                        nome="Grupo"
                        optionsMultSelect={optionsMultSelectGrupo}
                        id={id}
                        isMulti
                        defaultValue={valueMultSelectGrupo}
                        // value={valueMultSelectGrupo}
                        onChange={onChangeMultSelectGrupo}
                        animatedComponents={animatedComponentsGrupo}
                      />

                    )}

                    {MultSelectSubGrupoComponent && (
                      <MultSelectSubGrupoComponent
                        label={labelMultSelectSubGrupo}
                        nome="Grupo"
                        id={id}
                        isMulti
                        optionsMultSelect={optionsMultSelectSubGrupo}
                        defaultValue={valueMultSelectSubGrupo}
                        onChange={onChangeMultSelectSubGrupo}
                        animatedComponents={animatedComponentsSubGrupo}
                      />

                    )}
                    {MultSelectMarcaComponent && (
                      <MultSelectMarcaComponent
                        label={labelMultSelectMarca}
                        id={id}
                        isMulti
                        optionsMultSelect={optionsMultSelectMarca}
                        defaultValue={valueMultSelectMarca}
                        onChange={onChangeMultSelectMarca}
                        animatedComponents={animatedComponentsMarca}
                      />

                    )}
                    {MultSelectEmpresaComponent && (
                      <MultSelectEmpresaComponent
                        label={labelMultSelectEmpresa}
                        nome={labelMultSelectEmpresa}
                        id={id}
                        isMulti={true}
                        optionsMultSelect={optionsMultSelectEmpresa}
                        defaultValue={valueMultSelectEmpresa}
                        onChange={onChangeMultSelectEmpresa}
                        animatedComponents={animatedComponentsEmpresa}
                      />

                    )}
                    {MultSelectFornecedorComponent && (
                      <MultSelectFornecedorComponent
                        label={labelMultSelectFornecedor}
                        nome="Fornecedor"
                        id={id}
                        isMulti={true}
                        optionsMultSelect={optionsMultSelectFornecedor}
                        defaultValue={valueMultSelectFornecedor}
                        onChange={onChangeMultSelectFornecedor}
                        animatedComponents={animatedComponentsFornecedor}
                      />

                    )}
                    {MultSelectFuncionarioComponent && (
                      <MultSelectFuncionarioComponent
                        label={labelMultSelectFuncionario}
                        nome="Funcionario"
                        id={id}
                        isMulti={true}
                        optionsMultSelect={optionsMultSelectFuncionario}
                        defaultValue={valueMultSelectFuncionario}
                        onChange={onChangeMultSelectFuncionario}
                        animatedComponents={animatedComponentsFuncionario}
                      />

                    )}


                    {/* Inputs Text */}


                    {InputFieldCodBarraComponent && (
                      <InputFieldCodBarraComponent
                        label={labelInputFieldCodBarra}
                        type="input"
                        id={id}
                        placeHolder={placeHolderInputFieldCodBarra}
                        value={valueInputFieldCodBarra}
                        onChange={onChangeInputFieldCodBarra}
                      />
                    )}

                    {InputFieldComponent && (
                      <InputFieldComponent
                        label={labelInputField}
                        type="input"
                        id={id}
                        placeHolder={placeHolderInputFieldComponent}
                        value={valueInputField}
                        onChange={onChangeInputField}
                      />
                    )}

                    {InputFieldNumeroNFComponent && (
                      <InputFieldNumeroNFComponent
                        label={labelInputFieldNumeroNF}
                        type="input"
                        id={id}
                        name=""
                        value={valueInputFieldNumeroNF}
                        onChange={onChangeInputFieldNumeroNF}
                        placeHolder={placeHolderInputFieldNumeroNF}
                      />
                    )}

       
                    {InputFieldDescricaoComponent && (
                      <InputFieldDescricaoComponent
                        label={labelInputFieldDescricao}
                        type="input"
                        id={id}
                        placeHolder={placeHolderInputFieldDescricao}
                        readOnly={readOnlyDescricao}
                        value={valueInputFieldDescricao}
                        onChange={onChangeInputFieldDescricao}
                      />
                    )}
                    {InputFieldQuantidadeComponent && (
                      <InputFieldQuantidadeComponent
                        label={labelInputFieldQuantidade}
                        type="number"
                        id={id}
                        name="dtcodbarra"
                        value={valueInputQuantidade}
                        onChange={onChangeInputQuantidade}
                        placeHolder={placeHolderInputFieldQuantidade}
                      />
                    )}
                    {InputFieldVendaCPFCNPJComponent && (
                      <InputFieldVendaCPFCNPJComponent
                        label={labelInputFieldVendaCPFCNPJ}
                        onChange={onChangeInputFieldVendaCPFCNPJ}
                        type="input"
                        id={id}
                        value={valueInputFieldVendaCPFCNPJ}
                        placeHolder={placeHolderInputFieldVendaCPFCNPJ}
                      />
                    )}
                     {InputFieldTelefoneComponent && (
                      <InputFieldTelefoneComponent
                        label={labelInputFieldTelefone}
                        id={id}
                        placeHolder={placeHolderInputFieldTelefone}
                        value={valueInputFieldTelefone}
                        onChange={onChangeInputFieldTelefone}
                      />
                    )}
                    {InputFieldSerieComponent && (
                      <InputFieldSerieComponent
                        label={labelInputFieldSerie}
                        placeHolder={placeHolderInputFieldSerie}
                        value={valueInputFieldSerie}
                        onChange={onChangeInputFieldSerie}
                        type="input"
                        id={id}

                      />
                    )}
                    {InputFieldNFCEComponent && (
                      <InputFieldNFCEComponent
                        label={labelInputFieldNFCE}
                        type="input"
                        id={id}
                      />
                    )}
                    {InputFieldNumeroVoucherComponent && (
                      <InputFieldNumeroVoucherComponent
                        label={labelInputFieldNumeroVoucher}
                        type="input"
                        id={id}
                        value={valueInputFieldNumeroVoucher}
                        onChange={onChangeInputFieldNumeroVoucher}
                      />
                    )}

                    {/* {InputFieldLojaOrigemComponent && (
                      <InputFieldLojaOrigemComponent
                        label={labelInputFieldLojaOrigem}
                        type="input"
                        id={id}
                        options={optionsFieldLojaOrigemComponent}
                        value={valueInputFieldLojaOrigem}
                        onChange={onChangeInputFieldLojaOrigem}
                        readOnly={true}
                      />
                    )} */}
                    {InputFieldLojaDestinoComponent && (
                      <InputFieldLojaDestinoComponent
                        label={labelInputFieldLojaDestino}
                        type="input"
                        id={id}
                        options={options}
                      />
                    )}

                    {InputSelectPagamentoComponent && (
                      <InputSelectPagamentoComponent
                        label={labelSelectPagamento}
                        type="select"
                        id={id}
                        options={optionsPagamento}
                        value={valueSelectPagamento}
                        onChange={onChangeSelectPagamento}
                      />
                    )}

                    {InputSelectUsoPrinicipalComponent && (
                      <InputSelectUsoPrinicipalComponent
                        label={labelSelectUsoPrinicipal}
                        type="select"
                        id={id}
                        options={optionsUsoPrinicipal}
                      />
                    )}

                    {InputSelectFreteComponent && (
                      <InputSelectFreteComponent
                        label={labelSelectFrete}
                        type="select"
                        id={id}
                        options={optionsFrete}
                      />
                    )}

                    {InputSelectSaldoComponent && (
                      <InputSelectSaldoComponent
                        label={labelSelectSaldo}
                        type="select"
                        id={id}
                        options={optionsSaldo}
                      />
                    )}

                    {InputSelectFilialComponent && (
                      <InputSelectFilialComponent
                        label={labelSelectFilial}
                        type="select"
                        id={id}
                        options={optionsFilial}
                      />
                    )}

                    {InputSelectNFEComponent && (
                      <InputSelectNFEComponent
                        label={labelSelectNFE}
                        type="select"
                        id={id}
                        options={optionsNFE}
                      />
                    )}

                    {InputSelectCampanhaComponent && (
                      <InputSelectCampanhaComponent
                        label={labelSelectCampanha}
                        type="select"
                        id={id}
                        options={optionsSelectCampanha}
                        value={valueSelectCampanha}
                        onChange={onChangeSelectCampanha}
                      />
                    )}

                    {InputSelectFiscalComponent && (
                      <InputSelectFiscalComponent
                        label={labelSelectFiscal}
                        type="select"
                        id={id}
                        options={optionsFiscal}
                      />

                    )}

                    {InputSelectEnviarComponent && (
                      <InputSelectEnviarComponent
                        label={labelSelectEnviar}
                        type="select"
                        id={id}
                        options={optionsSelectEnviar}
                      />
                    )}

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



                    {/* Buttons */}
                  </div>
                 
                  {/* Selects */}
                  <div className="row">

                   
                    {InputFieldTotalAntesDescontoComponent && (
                      <InputFieldTotalAntesDescontoComponent
                        label={labelInputFieldTotalAntesDesconto}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldDescontoComponent && (
                      <InputFieldDescontoComponent
                        label={labelInputFieldDesconto}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldAdiantamentoTotalComponent && (
                      <InputFieldAdiantamentoTotalComponent
                        label={labelInputFieldAdiantamentoTotal}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldDespesasAdicionaisComponent && (
                      <InputFieldDespesasAdicionaisComponent
                        label={labelInputFieldDespesasAdicionais}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldImpostoComponent && (
                      <InputFieldImpostoComponent
                        label={labelInputFieldImposto}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldImpostoRetidoComponent && (
                      <InputFieldImpostoRetidoComponent
                        label={labelInputFieldImpostoRetido}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldTotaPagarComponent && (
                      <InputFieldTotaPagarComponent
                        label={labelInputFieldTotaPagar}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldSaldoComponent && (
                      <InputFieldSaldoComponent
                        label={labelInputFieldSaldo}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldValorAplicadoComponent && (
                      <InputFieldValorAplicadoComponent
                        label={labelInputFieldValorAplicado}
                        id={id}
                        name=""
                        value=""
                        readOnly={true}
                      />
                    )}

                    {InputFieldUFComponent && (
                      <InputFieldUFComponent
                        label={labelInputFieldUF}
                        id={id}
                        name=""
                        value={valueInputFieldUF}
                        onChange={onChangeInputFieldUF}
                      />
                    )}

                    {InputFieldComplementoComponent && (
                      <InputFieldComplementoComponent
                        label={labelInputFieldComplemento}
                        id={id}
                        name=""
                        value={valueInputFieldComplemento}
                        onChange={onChangeInputFieldComplemento}
                      />
                    )}

                    {InputFieldEnderecoComponent && (
                      <InputFieldEnderecoComponent
                        label={labelInputFieldEndereco}
                        id={id}
                        name=""
                        value={valueInputFieldEndereco}
                        onChange={onChangeInputFieldEndereco}
                      />
                    )}

                    {InputFieldBairroComponent && (
                      <InputFieldBairroComponent
                        label={labelInputFieldBairro}
                        id={id}
                        name=""
                        value={valueInputFieldBairro}
                        onChange={onChangeInputFieldBairro}
                        
                      />
                    )}

                    {InputFieldCidadeComponent && (
                      <InputFieldCidadeComponent
                        label={labelInputFieldCidade}
                        id={id}
                        name=""
                        value={valueInputFieldCidade}
                        onChange={onChangeInputFieldCidade}
                      />
                    )}

                    {InputFieldCepComponent && (
                      <InputFieldCepComponent
                        label={labelInputFieldCep}
                        id={id}
                        name=""
                        value={valueInputFieldCep}
                        onChange={onChangeInputFieldCep}
                      />
                    )}
                    



                  </div>
                 
                  {/* textArea */}
                  <div className="row">
                    {TextAreaFieldComponent && (
                      <TextAreaFieldComponent
                        label={labelTextAreaField}
                        id={id}
                        name=""
                        value={valueTextAreaFieldComponent}
                        onChange={onChangeTextAreaFieldComponent}
                      />
                    )}

                  </div>
               
                  {/* CheckBox */}
                  <div className="row">
                    {CheckBoxComponent && (
                      <CheckBoxComponent
                        id={idCheckBox}
                        label={labelCheckBox}
                        cheked={isChekedBox}
                      
                        onChange={onChangeCheckBox}
                       
                      />
                    )}

                    {CheckBoxComponent1 && (
                      <CheckBoxComponent1
                        label={labelCheckBox1}
                        id={id}
                        name=""
                        value=""
                        readOnly={false}
                      />
                    )}

                    {CheckBoxComponent2 && (
                      <InputFieldCheckBox
                        label={labelCheckBox2}
                        id={id}
                        name=""



                      />
                    )}

                    {CheckBoxComponent3 && (
                      <CheckBoxComponent3
                        label={labelCheckBox3}
                        id={id}
                        name=""
                        value=""
                        readOnly={false}
                      />
                    )}

                    {CheckBoxComponent4 && (
                      <CheckBoxComponent4
                        label={labelCheckBox4}
                        id={id}
                        name=""
                        value=""
                        readOnly={false}
                      />
                    )}

                    {CheckBoxComponent5 && (
                      <CheckBoxComponent5
                        label={labelCheckBox5}
                        id={id}
                        name=""
                        value=""
                        readOnly={false}
                      />
                    )}

                  </div>
                
                  {/* Buttons */}
                  <div className="row">

                    {ButtonSearchComponent && (
                      <ButtonSearchComponent
                        textButton={linkNomeSearch}
                        onClickButtonType={onButtonClickSearch}
                        // cor="primary"
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
                        iconSize={iconSizeCadastro || 16}
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
                    {ButtonTypeVendasEstrutura && (
                      <ButtonType
                        // nome="Vendas por Estrutura"
                        textButton={linkNomeVendasEstrutura}
                        onClickButtonType={onButtonClickVendasEstrutura}
                        // cor="danger"
                        cor={corVendasEstrutura}
                        tipo="button"
                        Icon={iconVendasEstrutura}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}
                    {ButtonTypeVendasVendedor && (
                      <ButtonType
                        // nome="Vendas por Vendedor"
                        textButton={linkNomeVendasVendedor}
                        onClickButtonType={onButtonClickVendasVendedor}
                        // cor="success"
                        cor={corVendasVendedor}
                        tipo="button"
                        Icon={iconVendasVendedor}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}
                    {ButtonTypeProdutoVendidos && (
                      <ButtonType
                        // nome="Produtos mais Vendidos"
                        textButton={linkNomeProdutoVendido}
                        onClickButtonType={onButtonClickProdutoVendido}
                        cor={corProdutoVendido}
                        tipo="button"
                        Icon={iconProdutoVendido}
                        iconColor="#212529"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeVendasResumida && (
                      <ButtonType
                        // nome="Vendas Resumida"
                        textButton={linkNomeVendasResumido}
                        onClickButtonType={onButtonClickVendasResumido}
                        cor="primary"
                        tipo="button"
                        Icon={iconVendasResumida}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeVendasPorPeriodo && (
                      <ButtonType
                        // nome="Vendas por Período"
                        textButton={linkNomeVendasPorPeriodo}
                        onClickButtonType={onButtonClickVendaPeriodo }
                        cor="danger"
                        tipo="button"
                        Icon={AiOutlineSearch}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeVendasPorProduto && (
                      <ButtonType
                        // nome="Vendas por Produto"
                        textButton={linkNomeVendasPorProduto}
                        onClickButtonType={onButtonClickVendaProduto}
                        cor="success"
                        tipo="button"
                        Icon={AiOutlineSearch}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeLoja && (
                      <ButtonTypeLoja
                        // nome="Vendas por Produto"
                        textButton={linkNomeLoja}
                        onClickButtonType={onButtonClickLoja}
                        cor="info"
                        tipo="button"
                        Icon={AiOutlineSearch}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeSaldo && (
                      <ButtonTypeSaldo
                        // nome="Vendas por Produto"
                        textButton={linkNomeSaldo}
                        onClickButtonType={onButtonClickSaldo}
                        // cor="warning"
                        cor={corTypeSaldo}
                        tipo="button"
                        Icon={iconTypeSaldo}
                        iconColor="#212529"
                        iconSize={16}
                      />

                    )}

                    {ButtonTypeBalanco && (
                      <ButtonType
                        // nome="Vendas por Produto"
                        textButton={linkNomeBalanco}
                        onClickButtonType={onButtonClickTypeBalanco}
                        cor="warning"
                        tipo="button"
                        Icon={AiOutlineSearch}
                        iconColor="#212529"
                        iconSize={16}
                      />
                    )}
                    {ButtonTypeSalvar && (
                      <ButtonTypeSalvar
                        // nome="Vendas por Produto"
                        textButton={linkNome}
                        onClickButtonType={onButtonClickSalvar}
                        cor="info"
                        tipo="button"
                        Icon={AiOutlineSave}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeExportar && (
                      <ButtonTypeExportar
                        // nome="Vendas por Produto"
                        textButton={linkExportar}
                        onClickButtonType={onButtonClickExportar}
                        cor="info"
                        tipo="button"
                        Icon={GoDownload}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}


                    {ButtonTypeImportar && (
                      <ButtonTypeImportar
                        // nome="Vendas por Produto"
                        textButton={linkImportar}
                        onClickButtonType={onButtonClickImportar}
                        cor="success"
                        tipo="button"
                        Icon={GoUpload}
                        iconColor="#fff"
                        iconSize={16}
                      />
                    )}

                    {ButtonTypeVincular && (
                      <ButtonType

                        textButton={linkNomeVincular}
                        onClickButtonType={onButtonClickVincular}
                        cor="warning"
                        tipo="button"
                        Icon={AiOutlineSave}
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