import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ButtonType } from "../../Buttons/ButtonType";
import { get } from "../../../api/funcRequest";
import { MdAdd, MdMenu } from "react-icons/md";
import { useQuery } from "react-query";
import { ActionMainPromocao } from "../../Actions/ActionMainPromocao";
import { InputSelectAction } from "../../Inputs/InputSelectAction";
import { InputFieldAction } from "../../Buttons/InputAction";
import { InputSelectActionPromocao } from "../../Inputs/InputSelectActionPromocao";
import { useCreatePromocaoAtiva } from "./hook/useCreatePromocaoAtiva";
import { MultSelectAction } from "../../Select/MultSelectAction";
import Swal from "sweetalert2";
import { GrView } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";


export const ActionPesquisaPromocao = ({usuarioLogado }) => {

  const  {
    mecanicaSelecionada,
    setMecanicaSelecionada,
    aplicacaoDestinoSelecionada,
    setAplicacaoDestinoSelecionada,
    tipoDescontoSelecionado,
    setTipoDescontoSelecionado,
    fornecedorSelecionado,
    setFornecedorSelecionado,
    subGrupoSelecionado,
    setSubGrupoSelecionado,
    grupoSelecionado,
    setGrupoSelecionado,
    marcaSelecionada,
    setMarcaSelecionada,
    empresaSelecionada,
    setEmpresaSelecionada,
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    qtdInicio,
    setQtdInicio,
    qtdFim,
    setQtdFim,
    vrDesconto,
    setVrDesconto,
    porcentoDesconto,
    setPorcentoDesconto,
    valorInicio,
    setValorInicio,
    valorFim,
    setValorFim,
    produtoOrigem,
    setProdutoOrigem,
    fileProdutoOrigem,
    setFileProdutoOrigem,
    produtoDestino,
    setProdutoDestino,
    fileProdutoDestino,
    setFileProdutoDestino,
    descricao,
    setDescricao,
    precoPrdouto,
    setPrecoProduto,
    dadosFornecedorProduto,
    dadosGrupo,
    optionsMarcas,
    optionsEmpresas,
    optionsMecanica,
    handleFileUpload, 
    mostrarProdutosSelecionados,
    onSubmit
  } = useCreatePromocaoAtiva({ usuarioLogado });

  const styleQTDInicio = useMemo(() => (mecanicaSelecionada == 1 ? { display: "none" } : {}), [mecanicaSelecionada]);
  const styleQTDFim = useMemo(() => (mecanicaSelecionada == 1 ? { display: "none" } : {}), [mecanicaSelecionada]);
  const styleVrInicio = useMemo(() => (mecanicaSelecionada == 1 ? { display: "block" } : {display: "none"}), [mecanicaSelecionada]);
  const styleVrFim = useMemo(() => (mecanicaSelecionada == 2 ? { display: "block" } : {display: "none"}), [mecanicaSelecionada]);
  const styleDesconto2 = useMemo(() => (mecanicaSelecionada == 2 ? { display: "block" } : {display: "none"}), [mecanicaSelecionada]);
  
  const { data: optionsPromocao = [], error: errorPromocao, isLoading: isLoadingPromocao, refetch: refetchPromocao } = useQuery(
    'promocoes-ativas',
    async () => {
      const response = await get(`/promocoes-ativas`);
      return response.data;
    },
    { enabled: true, staleTime: 60 * 60 * 1000,}
  );
  
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
    }),
  };
  
  const handleEmpresaChange = useCallback((selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  }, [setEmpresaSelecionada]);
  
  const handleChangeMecanica = useCallback((selectedValue) => {

  
  const selectedOption = optionsMecanica.find(option => option.value === selectedValue);
  
  if (selectedOption) {

    setMecanicaSelecionada(selectedOption.mecanica);
    setAplicacaoDestinoSelecionada(selectedOption.aplicacaoDestino);
    setTipoDescontoSelecionado(selectedOption.tipoDesconto);
  } else {
    console.log('Nenhuma opção encontrada para o valor:', selectedValue);
  }
}, [mecanicaSelecionada, setMecanicaSelecionada, setAplicacaoDestinoSelecionada, setTipoDescontoSelecionado, ]);

  const styleDesconto1 = useMemo(() => (mecanicaSelecionada == 2 && aplicacaoDestinoSelecionada == 1 && tipoDescontoSelecionado == 2 ? { display: "none" } : {}), [mecanicaSelecionada]);



  const handleCadastrar = () => {
      onSubmit();
    
  }

  const empresasFiltradas = useMemo(() => {
    if (!marcaSelecionada || marcaSelecionada === "all") return optionsEmpresas;
    if (Array.isArray(marcaSelecionada)) {
      return optionsEmpresas.filter(empresa =>
        marcaSelecionada.includes(empresa.IDGRUPOEMPRESARIAL)
      );
    }
    return optionsEmpresas.filter(empresa => empresa.IDGRUPOEMPRESARIAL === marcaSelecionada);
  }, [optionsEmpresas, marcaSelecionada]);

  return (
    <Fragment>
      <ActionMainPromocao
        linkComponentAnterior={["Home"]}
        linkComponent={["Cadastro de Promoções"]}
        title="Cadastro de Promoções"

        tituloPromocao={'Promoção'}

        InputSelectMecanicaComponent={InputSelectActionPromocao}
        labelSelectMecanica={"Mecanica"}
        optionsMecanica={optionsMecanica}
        valueSelectMecanica={mecanicaSelecionada}
        onChangeSelectMecanica={(e) => handleChangeMecanica(e.value)}
        styleMecanica={customStyles}

        InputFieldQTDInicioComponent={InputFieldAction}
        labelInputQTDInicio={"QTD Aparti de"}
        valueInputFieldQTDInicio={qtdInicio}
        onChangeInputFieldQTDInicio={(e) => setQtdInicio(e.target.value)}
        readOnlyQTDInicio={mecanicaSelecionada == 1 ? true : false}
        // styleQTDInicio={styleQTDInicio}

        InputFieldQTDFimComponent={InputFieldAction}
        labelInputQTDFim={"Preço Produto"}
        valueInputFieldQTDFim={precoPrdouto}
        onChangeInputFieldQTDFim={(e) => setPrecoProduto(e.target.value)}
        readOnlyQTDFim={mecanicaSelecionada == 2 ? true : false}

        InputFieldDescontoComponent1={InputFieldAction}
        labelInputFieldDesconto1={"Valor Desconto "}
        valueInputFieldDesconto1={vrDesconto}
        onChangeInputFieldDesconto1={(e) => setVrDesconto(e.target.value)}
        readOnlyDesconto1={mecanicaSelecionada == 2 ? true : false}
        // styleDesconto1={styleDesconto1}

        InputFieldDescontoComponent2={InputFieldAction}
        labelInputFieldDesconto2={"Desconto %"}
        valueInputFieldDesconto2={porcentoDesconto}
        onChangeInputFieldDesconto2={(e) => setPorcentoDesconto(e.target.value)}
        readOnlyDesconto2={mecanicaSelecionada == 1 ? true : false}
        // styleDesconto2={styleDesconto2}

        InputFieldVrInicio={InputFieldAction}
        labelInputFieldVrInicio={"Vr Apartir de"}
        valueInputFieldVrInicio={valorInicio}
        onChangeInputFieldVrInicio={(e) => setValorInicio(e.target.value)}
        readOnlyVrInicio={mecanicaSelecionada == 2 ? true : false}
        // styleVrInicio={styleVrInicio}

        
        InputFieldDTInicioComponent={InputFieldAction}
        labelInputDTInicio={"Data Inicio"}
        valueInputFieldDTInicio={dataInicio}
        onChangeInputFieldDTInicio={(e) => setDataInicio(e.target.value)}

        InputFieldDTFimComponent={InputFieldAction}
        labelInputDTFim={"Data Fim"}
        valueInputFieldDTFim={dataFim}
        onChangeInputFieldDTFim={(e) => setDataFim(e.target.value)}

        InputFieldDescription={InputFieldAction}
        labelInputFieldDescription={"Descrição"}
        valueInputFielDescription={descricao}
        onChangeInputFieldDescription={(e) => setDescricao(e.target.value)}
        styleDescription={{ textTransform: "uppercase" }}


        InputSelectMarcasComponent={InputSelectActionPromocao}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          { value: "all", label: "Selecionar Todas" },
          ...optionsMarcas.map((marca) => ({ value: marca.IDGRUPOEMPRESARIAL, label: marca.GRUPOEMPRESARIAL }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={(e) => {
          if (e.value === "all") {
          const allValues = optionsMarcas.map((marca) => marca.IDGRUPOEMPRESARIAL);
          setMarcaSelecionada(allValues);
          } else {
          setMarcaSelecionada(e.value);
          }
        }}


          InputSelectEmpresaComponentAync={MultSelectAction}
          labelSelectEmpresaAsync={"Empresa"}
          optionsEmpresasAsync={[
            { value: "all", label: "Selecionar Todas" },
            ...empresasFiltradas.map((empresa) => ({
              value: empresa.IDEMPRESA,
              label: empresa.NOFANTASIA
            }))
          ]}
          valueSelectEmpresaAsync={[empresaSelecionada]}
          defaultValueSelectEmpresa={empresaSelecionada}
          onChangeSelectEmpresaAsync={(selectedOptions) => {
            if (selectedOptions.some((option) => option.value === "all")) {
             
              const allValues = empresasFiltradas.map((empresa) => empresa.IDEMPRESA);
              setEmpresaSelecionada(console.log(allValues));
            } else {
              handleEmpresaChange(selectedOptions);
            }
          }}

          InputFieldProdutoOigem={InputFieldAction}
          labelInputFieldProdutoOigem={"Produto Origem"}
          valueInputFieldProdutoOigem={produtoOrigem}
          onChangeInputFieldProdutoOigem={(e) => setProdutoOrigem(e.target.value)}
          readOnlyProdutoOigem={fileProdutoOrigem.length > 0 ? true : false}

          InputFileProdutoOigem={InputFieldAction}
          labelInputFileProdutoOigem={"Produto Origem"}
          acceptFileProdutoOigem=".csv, .xls, .xlsx"
          onChangeInputFileProdutoOigem={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0], true); 
            setProdutoOrigem(''); 
          }
        }}
        readOnlyFileProdutoOigem={produtoOrigem.length > 0 ? true : false}
        
        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Visualizar Produtos Origem"}
        onButtonClickCancelar={() => {
          mostrarProdutosSelecionados('origem');
        }}
        corCancelar={"danger"}
        IconCancelar={GrView}


        InputFieldProdutoDestino={InputFieldAction}
        labelInputFieldProdutoDestino={"Produto Destino"}
        valueInputFieldProdutoDestino={produtoDestino}
        onChangeInputFieldProdutoDestino={(e) => setProdutoDestino(e.target.value)}
        readOnlyProdutoDestino={fileProdutoDestino.length > 0 ? true : false}

        InputFileProdutoDestino={InputFieldAction}
        labelInputFileProdutoDestino={"Produto Destino"}
        acceptFileProdutoDestino=".csv, .xls, .xlsx"
        onChangeInputFileProdutoDestino={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0], false); 
            setProdutoDestino('')
          }
        } }
        readOnlyFileProdutoDestino={produtoDestino.length > 0 ? true : false}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Visualizar Produtos Destino"}
        onButtonClickCadastro={() => {
          mostrarProdutosSelecionados('destino');
        }}
        corCadastro={"success"}
        IconCadastro={GrView}
        

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Cadastrar Promoção"}
        onButtonClickSearch={handleCadastrar}
        corSearch={"primary"}
        IconSearch={IoIosSend}
      />
    </Fragment>
  )
}