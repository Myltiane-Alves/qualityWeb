import { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../Buttons/ButtonType"
import { InputField } from "../Buttons/Input"
import { InputSelectAction } from "../Inputs/InputSelectAction"
import axios from "axios"
import { ActionMain } from "../Actions/actionMain"

import TabelaPrincipal from "../Tables/TabelaMain"
import { MdArrowBack } from "react-icons/md";
import { TextAreaField } from "../TextArea/TextArea"

export const CadastroActionCadNFEntrada = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalVisivel, setModalVisivel] = useState(false);


  useEffect(() => {
    getTabelas()
  }, [])



  const getTabelas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allTabelas")
      if (response.data) {
        setDadosExemplos(response.data)
        console.log(response.data, 'get tabelas')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }

  }

  const colunasExemplo = [
    'ID Produto',
    'Produto',
    'Cod. Barras',
    'Quantidade',
    'Depósito',
    'Vr. Unitário',
    'Vr. Total',
    'Opções'
  ]

  const handleEdit = (item) => {
    // Lógica para manipular a edição do item

    if (item.editando) {
      return;
    }
    console.log(`Editando item: ${item.id}`);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item editado
    console.log(`Salvando item: ${item.id}`);
  };

  const handleCancel = (item) => {
    // Lógica para excluir item


    console.log(`Cancelando edição do item: ${item.id}`);
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dadosExemplos.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handlePaginaClicada = (pagina) => {
    setPaginaAtual(pagina);
  };

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const dadosPaginados = dadosExemplos.slice(indiceInicial, indiceFinal);

  const handleClick = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {

      setTabelaVisivel(true)
    }

  }

  const optionsEmpresasF = [
    { value: 'MG', label: 'MAGAZINE' },
    { value: 'TO', label: 'TESOURA' },
    { value: 'FC', label: 'FREE CENTER' }
  ]

  return (

    <Fragment>



      <div className="row">
        <div className="col-xl-12">
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              
              <ButtonType 
                
                linkNome={"Cadastrar"}
                onButtonClick
                Icon={MdArrowBack}
                iconColor={"#1dc9b7"}
                iconSize={30}
              />
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div id="panel-1" className="panel">
                  <div className="panel-container show">
                    <div className="panel-content">
                      <ActionMain
                        linkComponentAnterior={["Home"]}
                        linkComponent={["Notas Fiscais"]}
                        title="Lista de Notas Fiscais"
                        subTitle="Nome da Loja 1"
 
                        InputFieldDTInicioComponent={InputField}
                        labelInputFieldDTInicio={"Data Cadastro"}

                        InputFieldDTFimComponent={InputField}
                        labelInputFieldDTFim={"Data Emissão"}

                        InputSelectFornecedorComponent={InputSelectAction}
                        labelSelectFornecedor={"Fornecedor"}
                        optionsFornecedores={optionsEmpresasF}

                        InputSelectPagamentoComponent={InputSelectAction}
                        labelSelectPagamento={"Condições de Pagamento"}
                        optionsPagamento={optionsEmpresasF}

                        InputFieldComponent={InputField}
                        labelInputField={"Nº Pedido"}

                        InputSelectMarcasComponent={InputSelectAction}
                        labelSelectMarcas={"Marcas"}
                        optionsMarcas={optionsEmpresasF}

                        InputSelectCompradorComponent={InputSelectAction}
                        labelSelectComprador={"Comprador"}
                        optionsCompradores={optionsEmpresasF}

                        InputSelectUsoPrinicipalComponent={InputSelectAction}
                        labelSelectUsoPrinicipal={"Uso Principal"}
                        optionsUsoPrinicipal={optionsEmpresasF}

                        InputSelectFreteComponent={InputSelectAction}
                        labelSelectFrete={"Frete"}
                        optionsFrete={optionsEmpresasF}

                        InputFieldStatusComponent={InputField}
                        labelInputFieldStatus={"Status"}

                        InputSelectSaldoComponent={InputSelectAction}
                        labelSelectSaldo={"Saldo"}
                        optionsSaldo={optionsEmpresasF}

                        InputSelectFilialComponent={InputSelectAction}
                        labelSelectFilial={"Filial"}
                        optionsFilial={optionsEmpresasF}

                        InputSelectFilialCNPJComponent={InputSelectAction}
                        labelSelectFilialCNPJ={"CNPJ Filial"}
                        optionsFilialCNPJ={optionsEmpresasF}

                        InputSelectTipoNFComponent={InputSelectAction}
                        labelSelectTipoNF={"Tipo NF"}
                        optionsTipoNF={optionsEmpresasF}


                        InputFieldNumeroNFComponent={InputField}
                        labelInputFieldNumeroNF={"Nº NF"}


                        InputFieldSerieComponent={InputField}
                        labelInputFieldSerie={"Série NF"}

                        InputFieldModeloNFComponent={InputField}
                        labelInputFieldModeloNF={"Modelo NF"}

                        InputFieldChaveNFComponent={InputField}
                        labelInputFieldChaveNF={"Chave NF"}

                        TextAreaFieldComponent={TextAreaField}
                        labelTextAreaField={"Observações"}

                        InputFieldTotalAntesDescontoComponent={InputField}
                        labelInputFieldTotalAntesDesconto={"Total Antes Desconto"}

                        InputFieldDescontoComponent={InputField}
                        labelInputFieldDesconto={"Desconto"}

                        InputFieldAdiantamentoTotalComponent={InputField}
                        labelInputFieldAdiantamentoTotal={"Adiantamento Total"}

                        InputFieldDespesasAdicionaisComponent={InputField}
                        labelInputFieldDespesasAdicionais={"Despesas Adicionais"}

                        InputFieldImpostoComponent={InputField}
                        labelInputFieldImposto={"Imposto"}

                        InputFieldImpostoRetidoComponent={InputField}
                        labelInputFieldImpostoRetido={"Imposto Retido"}

                        InputFieldTotaPagarComponent={InputField}
                        labelInputFieldTotaPagar={"Total a Pagar"}

                        InputFieldSaldoComponent={InputField}
                        labelInputFieldSaldo={"Saldo"}

                        TextAreaFieldComponentComponent={TextAreaField}
                        labelTextAreaFieldComponent={"Observações"}

                        ButtonTypeCancelar={ButtonType}
                        linkCancelar={"Cancelar"}
                        onButtonClickSearch={handleClick}

                        ButtonTypeCadastro={ButtonType}
                        linkNome={"Cadastrar"}
                      />
                      

                    </div>
                  </div>
                </div>
              </div>

       
                  <div id="resultado">
                    <TabelaPrincipal
                      id="dt-basic-venda"
                      colunas={colunasExemplo}
                      data={dadosPaginados}
                      onEditar={handleEdit}
                      onSalvar={handleSave}
                      onCancelar={handleCancel}
                      itensPorPagina={itensPorPagina}
                      paginaAtual={paginaAtual}
                      handlePaginaAnterior={handlePaginaAnterior}
                      handleProximaPagina={handleProximaPagina}
                      handlePaginaClicada={handlePaginaClicada}
                    />
                  </div>
             

            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}
