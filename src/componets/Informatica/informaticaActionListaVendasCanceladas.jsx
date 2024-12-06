import React, { Fragment, useEffect, useState } from "react"
import TabelaPrincipal from "../Tables/TabelaMain"
import { ButtonType } from "../Buttons/ButtonType"
import { InputSelectAction } from "../Inputs/InputSelectAction"
import { InputField } from "../Buttons/Input"
import { ActionMain } from "../Actions/actionMain"
import axios from "axios"


export const InformaticaActionListaVendasCanceladas = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const [dadosExemplos, setDadosExemplos] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    getTabelas()
  }, [])

  const getTabelas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/ListaVendas")
      if (response.data) {
        setDadosExemplos(response.data)
        // console.log(response.data, 'get tabelas')
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const colunasExemplo = [
    '#',
    'Empresa',
    'Caixa',
    'Nº Venda',
    'NFC-e',
    'Abertura',
    'Operador',
    'Valor',
    'Nota',
    'Cancelado Por',
    'Função',
    'Motivo',
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
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dadosExemplos.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  const handlePaginaClicada = (pagina) => {
    setPaginaAtual(pagina);
  }

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
    { value: 0, label: "Todas" },
    { value: 1, label: "Free Center" },
    { value: 2, label: "Tesoura" },
    { value: 3, label: "Magazine" },
  ]

  return (

    <Fragment>

    <ActionMain
       linkComponentAnterior={["Home"]}
       linkComponent={["Clientes"]}
       title="Listagem de Clientes"
       subTitle="Nome da Loja"

       InputFieldDTInicioComponent={InputField}
       labelInputFieldDTInicio={"Data Início"}

       InputFieldDTFimComponent={InputField}
       labelInputFieldDTFim={"Data Fim"}

       InputSelectEmpresaComponent={InputSelectAction}
       labelSelectEmpresa={"Empresa"}
       optionsEmpresas={optionsEmpresasF}

       InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marcas"}
        optionsMarcas={optionsEmpresasF}

       ButtonSearchComponent={ButtonType}
       linkNomeSearch={"Pesquisar"}
       onButtonClickSearch={handleClick}

     />
  
     {tabelaVisivel && (
       <TabelaPrincipal
         id=""
         colunas={colunasExemplo}
         data={dadosPaginados}
         handleEdit={handleEdit}
         handleSave={handleSave}
         handleCancel={handleCancel}
         paginaAtual={paginaAtual}
         itensPorPagina={itensPorPagina}
         onPaginaAnterior={handlePaginaAnterior}
         onProximaPagina={handleProximaPagina}
         onPaginaClicada={handlePaginaClicada}

       />
     )}
   </Fragment>
  )
}


