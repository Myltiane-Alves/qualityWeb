import { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../Actions/actionMain"
import { InputSelect } from "../Buttons/InputSelect"
import { InputField } from "../Buttons/Input"
import { ButtonSearch } from "../Buttons/ButtonSearch"
import TabelaPrincipal from "../Tables/TabelaMain"
import axios from "axios"
import { InputSelectAction } from "../Inputs/InputSelectAction"
import { InputFieldCheckBox } from "../Inputs/InputChekBox"


export const ComprasActionDistribuicaoCompras = () => {
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [actionVisivel, setActionVisivel] = useState(true);

  useEffect(() => {
    getTabelas()
  }, [])

  const getTabelas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/ListaVendas")
      if(response.data) {
        setDadosExemplos(response.data)
        // console.log(response.data, 'get tabelas')
      }
    } catch(error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const colunasExemplo = [
    'Nº Pedido',
    'Empresa',
    'Data Fechamento Pedido',
    'Opções'
  ];

  const handleEdit = (item) => {
    // Lógica para manipular a edição do item
    console.log(`Editando item: ${item.id}`);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item editado
    console.log(`Salvando item: ${item.id}`);
  };

  const handleCancel = (item) => {
    // Lógica para cancelar a edição do item
    console.log(`Cancelando edição do item: ${item.id}`);
  };
  
  const handlePaginaAnterior = () => {
    if(paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dadosExemplos.length / itensPorPagina);
    if(paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  const handlePaginaClicada = (pagina) => {
    setPaginaAtual(pagina);
  }

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const dadosPaginados = dadosExemplos.slice(indiceInicial, indiceFinal);

  const handlePesquisar = () => {
    setClickContador(prevContador => prevContador + 1);

    if (clickContador % 2 === 0) {
      setTabelaVisivel(false)
    } else {
      setTabelaVisivel(true)
    }

  }
  const options = [
    { value: 0, label: "Opção 1" },
    { value: 1, label: "Opção 2" },
    // Adicione outras opções conforme necessário
  ];

  return (

    <Fragment>


      <ActionMain
        title="Planejamento"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Distribuição de Compras"]}

        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Inicial"}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Final"}

        InputSelectFornecedorComponent={InputSelect}
        optionsFornecedores={options}
        labelSelectFornecedor={"Fornecedor"}


        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handlePesquisar}
      />

    {tabelaVisivel && (
      <div className="resultado">
        <TabelaPrincipal
          colunas={colunasExemplo}
          data={dadosPaginados}
          onEditar={handleEdit}
          onSalvar={handleSave}
          onCancelar={handleCancel}
          itensPorPagina={itensPorPagina}
          paginaAtual={paginaAtual}
          onPaginaAnterior={handlePaginaAnterior}
          onProximaPagina={handleProximaPagina}
          onPaginaClicada={handlePaginaClicada}
  
        />
  
        <ActionMain
        title="Filtro VENDAS"
        subTitle=""
        linkComponentAnterior={["Home"]}
        linkComponent={["Distribuição de Compras"]}
  
        InputFieldDTInicioComponent={InputField}
        labelInputFieldDTInicio={"Data Inicial"}
  
        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Final"}
  
        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={options}
        labelSelectEmpresa={"Empresa"}

        InputSelectMarcasComponent={InputSelectAction}
        optionsMarcas={options}
        labelSelectMarcas={"Marca"}

        InputSelectFornecedorComponent={InputSelectAction}
        optionsFornecedores={options}
        labelSelectFornecedor={"Fornecedor"}
  
        CheckBoxComponent1={InputFieldCheckBox}
        labelCheckBox1={"Estrutura Mercadológica"}

        CheckBoxComponent2={InputFieldCheckBox}
        labelCheckBox2={"Categorias"}

        CheckBoxComponent3={InputFieldCheckBox}
        labelCheckBox3={"Tipo Tecido"}

        CheckBoxComponent4={InputFieldCheckBox}
        labelCheckBox4={"Cor"}

        CheckBoxComponent5={InputFieldCheckBox}
        labelCheckBox5={"Estilo"}
  
        ButtonSearchComponent={ButtonSearch}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch
      />

      </div>
    )}

    </Fragment>
  )
}
