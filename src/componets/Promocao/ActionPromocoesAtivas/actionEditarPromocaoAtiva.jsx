import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { ButtonType } from "../../Buttons/ButtonType";
import { ActionMainPromocao } from "../../Actions/ActionMainPromocao";
import { InputFieldAction } from "../../Buttons/InputAction";
import { InputSelectActionPromocao } from "../../Inputs/InputSelectActionPromocao";
import { MultSelectAction } from "../../Select/MultSelectAction";
import { GrDocumentCsv, GrFormView, GrView } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { ButtonTypeModal } from "../../Buttons/ButtonTypeModal";
import { useUpdatePromocaoAtiva } from "./hook/useUpdatePromocao";
import { dataFormatada } from "../../../utils/dataFormatada";
import { ActionProdutoModal } from "./ActionProdutos/actionProdutoModal";
import { AiFillBackward } from "react-icons/ai";
import { FaRegFileExcel } from "react-icons/fa";
import { ActionDocumentacaoAtualizar } from "./ActionDocumentacao/documentacaoAtualizar";



export const ActionEditarPromocaoAtiva = ({ dadosPromocao, handleClickIncluir }) => {

  const {
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
    empresasSelecionadas,
    setEmpresasSelecionadas,
    // empresasFiltradas,
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
    precoProduto,
    setPrecoProduto,
    statusSelecionado,
    setStatusSelecionado,
    dadosFornecedorProduto,
    dadosGrupo,
    optionsMarcas,
    optionsEmpresas,
    optionsMecanica,
    dadosMecanicas,
    mecanicaSelecionadaEdicao,
    setMecanicaSelecionadaEdicao,
    handleFileUpload,
    mostrarProdutosSelecionados,
    dadosPromocoesAtivas,
    modalVisivel,
    setModalVisivel,
    handleSalvarMecanica,
    onSubmit,
    optionsEmpresasPromocoes,
    optionsStatus,
    mostrarEmpresasPromocao,
    mostrarProdutosPromocao,
    handlePesquisarProdutoDestino,
    handlePesquisarProdutoOrigem,
    modalProduto,
    setModalProduto,
    dadosProdutosPesquisa,
    modalDocumentacao,
    setModalDocumentacao,
  } = useUpdatePromocaoAtiva({ dadosPromocao });

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


    const selectedOption = dadosMecanicas.find(option => option.ID == selectedValue);

    if (selectedOption) {
      setMecanicaSelecionada(selectedOption.ID);
      setMecanicaSelecionadaEdicao(selectedOption.DESCRICAO)
      setAplicacaoDestinoSelecionada(selectedOption.APLICAODESTINO);
      setTipoDescontoSelecionado(selectedOption.TIPODESCONTO);
    } else {
      console.log('Nenhuma opção encontrada para o valor:', selectedValue);
    }
  }, [mecanicaSelecionada, mecanicaSelecionadaEdicao, setMecanicaSelecionada, setAplicacaoDestinoSelecionada, setTipoDescontoSelecionado,]);

  const handleEditarMecanica = () => {
    setMecanicaSelecionadaEdicao(mecanicaSelecionada);
  };


  useEffect(() => {
    if (tipoDescontoSelecionado == 0) {
      setVrDesconto(0);
      setValorInicio(0);
      setPorcentoDesconto(0)
    } else if (tipoDescontoSelecionado == 1) {
      setPorcentoDesconto(0)
      setPrecoProduto(0);
      setValorInicio(0);
    } else if (tipoDescontoSelecionado == 2) {
      setVrDesconto(0);
      setPrecoProduto(0);
      setValorInicio(0);
    }

    if (mecanicaSelecionada == 1) {
      setQtdInicio(0);
    }

  }, [mecanicaSelecionada, tipoDescontoSelecionado, setPrecoProduto, setVrDesconto, setValorInicio, setPorcentoDesconto]);

  const handleCadastrar = () => {
    onSubmit();
  }

  const mecanicaInicial = useMemo(() => {
    if (dadosPromocao && dadosPromocao[0] && optionsMecanica.length > 0) {
      const promocao = dadosPromocao[0];
      const mecanicaEncontrada = optionsMecanica.find(mecanica =>
        mecanica.aplicacaoDestino === promocao.TPAPARTIRDE &&
        mecanica.mecanica === promocao.TPAPLICADOA &&
        mecanica.tipoDesconto === promocao.TPFATORPROMO
      );

      return mecanicaEncontrada ? mecanicaEncontrada.value : null;
    }
    return null;
  }, [dadosPromocao]);


  const mecanicaCorrespondente = useMemo(() => {
    if (mecanicaInicial && dadosMecanicas.length > 0) {
      const mecanica = dadosMecanicas.find(m => {
        const mecanicaOriginal = optionsMecanica.find(opt => opt.value === mecanicaInicial);
        return mecanicaOriginal &&
          m.MECANICA === mecanicaOriginal.mecanica &&
          m.APLICACAODESTINO === mecanicaOriginal.aplicacaoDestino &&
          m.TIPODESCONTO === mecanicaOriginal.tipoDesconto;
      });

      if (mecanica) {
        if (!mecanicaSelecionada) {
          setMecanicaSelecionada(mecanica.ID);
          setMecanicaSelecionadaEdicao(mecanica.DESCRICAO);
          setAplicacaoDestinoSelecionada(mecanica.APLICACAODESTINO);
          setTipoDescontoSelecionado(mecanica.TIPODESCONTO);
        }
        return mecanica;
      }
    }
    return null;
  }, [mecanicaInicial, dadosMecanicas, optionsMecanica]);

  const handlePorcentoDesconto = (value) => {
    if (isNaN(value) || value == "" || typeof value !== "number") {
      setPorcentoDesconto(0);
      return;
    }
    const val = Math.max(0, Math.min(Number(value), 99));
    setPorcentoDesconto(val);
  }

  const handleValorProduto = (value) => {
    if (isNaN(value) || value == "" || typeof value !== "number") {
      setPrecoProduto(0);
      return;
    }

  }

  const valorSelecionado = useMemo(() => {
    if (mecanicaSelecionada && dadosMecanicas.length > 0) {
      const mecanica = dadosMecanicas.find(item => item.ID === mecanicaSelecionada);
      return mecanica ? {
        value: mecanica.ID,
        label: mecanica.DESCRICAO,
        APLICAODESTINO: mecanica.APLICAODESTINO,
        TIPODESCONTO: mecanica.TIPODESCONTO
      } : null;
    }
    return null;
  }, [mecanicaSelecionada, dadosMecanicas]);


  const empresasFiltradas = useMemo(() => {
    const empresasArray = Array.isArray(optionsEmpresas) ? optionsEmpresas : [];

    let filtradas = empresasArray;
    if (marcaSelecionada && marcaSelecionada !== "all") {
      if (Array.isArray(marcaSelecionada)) {
        filtradas = empresasArray.filter(empresa =>
          marcaSelecionada.includes(empresa.IDGRUPOEMPRESARIAL)
        );
      } else {
        filtradas = empresasArray.filter(empresa =>
          empresa.IDGRUPOEMPRESARIAL === marcaSelecionada
        );
      }
    }


    if (optionsEmpresasPromocoes?.length > 0) {
      const idsEmpresasPromocao = optionsEmpresasPromocoes.map(emp => emp.IDEMPRESA);
      return filtradas.map(emp => ({
        ...emp,
        selected: idsEmpresasPromocao.includes(emp.IDEMPRESA)
      }));
    }

    return filtradas;
  }, [optionsEmpresas, marcaSelecionada, optionsEmpresasPromocoes, setEmpresasSelecionadas]);
 

  useEffect(() => {
    if (optionsEmpresasPromocoes?.length > 0 && empresasSelecionadas.length === 0) {
      const defaults = optionsEmpresasPromocoes.map(emp => ({
        value: emp.IDEMPRESA,
        label: emp.NOFANTASIA
      }));
      setEmpresasSelecionadas(defaults);
    }
  }, [optionsEmpresasPromocoes, empresasSelecionadas, setEmpresasSelecionadas]);

  const downloadCSV = useCallback(() => {
    const url = "/documentacao.xlsx";
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const mostrarDocumentacao = useCallback(() => {
    setModalDocumentacao(true);
  }, []);

  return (
    <Fragment>

      <ActionMainPromocao
        linkComponentAnterior={["Home"]}
        linkComponent={["Cadastro de Promoções"]}
        title="Atualizar Promoção"

        InputSelectMecanicaComponent={InputSelectActionPromocao}
        labelSelectMecanica={"Mecanica"}
        optionsMecanica={dadosMecanicas.map((item) => ({
          value: item.ID,
          label: item.DESCRICAO,
          APLICAODESTINO: item.APLICAODESTINO,
          TIPODESCONTO: item.TIPODESCONTO
        }))}
        valueSelectMecanica={mecanicaSelecionada}
        onChangeSelectMecanica={(e) => handleChangeMecanica(e.value)}
        styleMecanica={customStyles}
        defaultValueSelectMecanica={valorSelecionado}


        InputFieldQTDInicioComponent={InputFieldAction}
        labelInputQTDInicio={"QTD Aparti de"}
        valueInputFieldQTDInicio={qtdInicio}
        onChangeInputFieldQTDInicio={(e) => setQtdInicio(e.target.value)}
        readOnlyQTDInicio={mecanicaSelecionada == 1 ? true : false}
       

        InputFieldQTDFimComponent={InputFieldAction}
        labelInputQTDFim={"Vr Apartir de"}
        valueInputFieldQTDFim={valorInicio}
        onChangeInputFieldQTDFim={(e) => setValorInicio(Number(e.target.value))}
        readOnlyQTDFim={mecanicaSelecionada == 1 ? false : true}

        InputFieldDescontoComponent1={InputFieldAction}
        labelInputFieldDesconto1={"Vr Desconto "}
        valueInputFieldDesconto1={vrDesconto}
        onChangeInputFieldDesconto1={(e) => setVrDesconto(Number(e.target.value))}
        readOnlyDesconto1={tipoDescontoSelecionado == 1 ? false : true}
      
        InputFieldDescontoComponent2={InputFieldAction}
        labelInputFieldDesconto2={"Desconto %"}
        valueInputFieldDesconto2={porcentoDesconto}
        onChangeInputFieldDesconto2={(e) => handlePorcentoDesconto(Number(e.target.value))}
        readOnlyDesconto2={tipoDescontoSelecionado == 2 ? false : true}
      
        InputFieldVrInicio={InputFieldAction}
        labelInputFieldVrInicio={"Vr Desconto Final"}
        valueInputFieldVrInicio={precoProduto}
        onChangeInputFieldVrInicio={(e) => {
          const valor = e.target.value.replace(/,/g, '.');
          setPrecoProduto(valor);
        }}
        readOnlyVrInicio={tipoDescontoSelecionado == 0 ? false : true}


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
          ...(Array.isArray(optionsMarcas)
            ? optionsMarcas.map((marca) => ({
              value: marca.IDGRUPOEMPRESARIAL,
              label: marca.DSGRUPOEMPRESARIAL
            }))
            : [])
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={(e) => {
          if (e.value === "all") {
            const allValues = optionsMarcas?.map((marca) => marca.IDGRUPOEMPRESARIAL);
            setMarcaSelecionada(allValues);
          } else {
            setMarcaSelecionada(e.value);
          }
        }}

        InputSelectStatus={InputSelectActionPromocao}
        labelSelectStatus={"Status"}
        optionsStatus={optionsStatus}
        valueSelectStatus={statusSelecionado}
        onChangeSelectStatus={(e) => setStatusSelecionado(e.value)}
        defaultValueSelectStatus={optionsStatus.find(option => option.value == "True") ? { value: "True", label: "ATIVO" } : { value: "False", label: "INATIVO" }}

        InputSelectEmpresaComponentAync={MultSelectAction}
        labelSelectEmpresaAsync={"Empresa"}
        optionsEmpresasAsync={[
          { value: "all", label: "Selecionar Todas" },
          ...empresasFiltradas?.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA
          }))
        ]}
        onChangeSelectEmpresaAsync={(selectedOptions) => {
          if(!selectedOptions || selectedOptions.length === 0) {
            setEmpresasSelecionadas([]);
            return;
          }
          if (selectedOptions.some((option) => option.value === "all")) {
            const allOptions = empresasFiltradas.map((empresa) => ({
              value: empresa.IDEMPRESA,
              label: empresa.NOFANTASIA
            }));
            setEmpresasSelecionadas(allOptions);
          } else {
            setEmpresasSelecionadas(selectedOptions);
          }
        }}
        valueSelectEmpresaAsync={empresasSelecionadas || []}

        ButtonTypeEmpresa={ButtonType}
        linkNomeEmpresa={"Visualizar Empresas"}
        onButtonClickEmpresa={() => {
          mostrarEmpresasPromocao()
        }}
        corEmpresa={"primary"}
        IconEmpresa={GrView}

        InputFieldProdutoOigem={InputFieldAction}
        labelInputFieldProdutoOigem={"Produto Origem"}
        valueInputFieldProdutoOigem={produtoOrigem}
        onChangeInputFieldProdutoOigem={(e) => setProdutoOrigem(e.target.value)}
        readOnlyProdutoOigem={fileProdutoOrigem.length > 0 ? true : false}

        ButtonTypeProdutoPesquisadoOrigem={ButtonType}
        linkNomeProdutoPesquisadoOrigem={"Visualizar Produto Pesquisado Origem"}
        onButtonClickProdutoPesquisadoOrigem={handlePesquisarProdutoOrigem}
        corProdutoPesquisadoOrigem={"warning"}
        IconProdutoPesquisadoOrigem={GrView}


        InputFileProdutoOigem={InputFieldAction}
        labelInputFileProdutoOigem={"Produto Origem"}
        acceptFileProdutoOigem=".csv, .xls, .xlsx"
        onChangeInputFileProdutoOigem={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0], true);
            setProdutoOrigem('');
          } else {
            setFileProdutoOrigem([]);
          }
        }}
        readOnlyFileProdutoOigem={produtoOrigem.length > 0 ? true : false}

        ButtonTypeCancelar={ButtonType}
        linkCancelar={"Visualizar Produtos Selecionados Origem"}
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

        ButtonTypeProdutoPesquisadoDestino={ButtonType}
        linkNomeProdutoPesquisadoDestino={"Visualizar Produto Pesquisado Destino"}
        onButtonClickProdutoPesquisadoDestino={handlePesquisarProdutoDestino}
        corProdutoPesquisadoDestino={"secondary"}
        IconProdutoPesquisadoDestino={GrView}

        InputFileProdutoDestino={InputFieldAction}
        labelInputFileProdutoDestino={"Produto Destino"}
        acceptFileProdutoDestino=".csv, .xls, .xlsx"
        onChangeInputFileProdutoDestino={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0], false);
            setProdutoDestino('')
          } else {
            setFileProdutoDestino([]);
          }
        }}
        readOnlyFileProdutoDestino={produtoDestino.length > 0 ? true : false}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Visualizar Produtos Selecionados Destino"}
        onButtonClickCadastro={() => {
          mostrarProdutosSelecionados('destino');
        }}
        corCadastro={"success"}
        IconCadastro={GrView}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Atualizar Promoção"}
        onButtonClickSearch={handleCadastrar}
        corSearch={"primary"}
        IconSearch={IoIosSend}

        ButtonTypeVisualizarProduto={ButtonType}
        linkNomeVisualizarProduto={"Visualizar Produtos da Promoção"}
        onButtonClickVisualizarProduto={() => {
          mostrarProdutosPromocao();
        }}
        corVisualizarProduto={"info"}
        IconVisualizarProduto={GrView}

        ButtonTypePedido={ButtonType}
        linkPedido={"Voltar para Pesquisa"}
        corPedido={"danger"}
        onButtonClickPedido={handleClickIncluir}
        IconPedido={AiFillBackward}

        ButtonTypeTXT={ButtonType}
        linkTXT={"Documentação"}
        onButtonClickTXT={mostrarDocumentacao}
        corTXT={"success"}
        IconTXT={GrFormView}
      />

      <ActionProdutoModal
        show={modalProduto}
        handleClose={() => setModalProduto(false)}
        dadosProdutosPesquisa={dadosProdutosPesquisa}
      />

      <ActionDocumentacaoAtualizar 
        show={modalDocumentacao}
        handleClose={() => setModalDocumentacao(false)}
      />
    </Fragment>
  )
}
