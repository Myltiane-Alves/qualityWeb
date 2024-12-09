import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ActionListaCampanha } from "./actionListaCampanha"
import { MdAdd } from "react-icons/md"
import { getDataAtual } from "../../../../utils/dataAtual"
import { MultSelectAction } from "../../../Select/MultSelectAction"
import { get } from "../../../../api/funcRequest"
import { useQuery } from "react-query"
import { ActionCadastrarCampanhaModal } from "./actionCadastrarCampanhaModal"

export const ActionPesquisaCampanha = () => {
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [desconto, setDesconto] = useState('')
  const [descricao, setDescricao] = useState('')
  const [modalCadastrarCampanha, setModalCadastrarCampanha] = useState(false)

  useEffect(() => {
    const dataInicial = getDataAtual()
    const dataFinal = getDataAtual()
    setDataPesquisaInicio(dataInicial)
    setDataPesquisaFim(dataFinal)
   
    
  }, [])

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas, refetch: refetchMarcas } = useQuery(
    'marcasLista',
    async () => {
      const response = await get(`/marcasLista`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
  
  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery(
    ['listaEmpresaComercial', marcaSelecionada],
    async () => {
      if (marcaSelecionada) {
        const response = await get(`/listaEmpresaComercial?idMarca=${marcaSelecionada}`);
        return response.data;
      } else {
        return [];
      }
    },
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );


  useEffect(() => {
    if (marcaSelecionada) {
      refetchEmpresas();
    }
    refetchMarcas()
  }, [marcaSelecionada, refetchEmpresas]);

  const { data: dadosListaCampanha = [], error: errorPromocao, isLoading: isLoadingPromocao, refetch: refetchPromocao } = useQuery(
    'campanha',
    async () => {
      const response = await get(`/campanha`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );




  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
  }

  const handleClick = () => {
    refetchPromocao();
  }


  const handleChangeEmpresa = (e) => {
    const selectedEmpresa = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionadaNome(selectedEmpresa.NOFANTASIA);
    setEmpresaSelecionada(e.value);
  }

  return (

    <Fragment>




      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Cadastro de Campanhas"]}
        title="Cadsatro de Campanhas"
        subTitle={empresaSelecionadaNome}

        // InputFieldDTInicioComponent={InputField}
        // labelInputFieldDTInicio={"Data Início"}
        // valueInputFieldDTInicio={dataPesquisaInicio}
        // onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        // InputFieldDTFimComponent={InputField}
        // labelInputFieldDTFim={"Data Fim"}
        // valueInputFieldDTFim={dataPesquisaFim}
        // onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        
        // InputSelectMarcasComponent={InputSelectAction}
        // labelSelectMarcas={"Por Marca"}
        // optionsMarcas={[
        //   { value: "", label: "Selecione uma Marca" },
        //   ...optionsMarcas.map((item) => {
        //     return {
        //       value: item.IDGRUPOEMPRESARIAL,
        //       label: item.GRUPOEMPRESARIAL
        //     }
        //   })
        // ]}
        // valueSelectMarcas={marcaSelecionada}
        // onChangeSelectMarcas={(e) => setMarcaSelecionada(e.value)}
        
        // MultSelectEmpresaComponent={MultSelectAction}
        // optionsMultSelectEmpresa={[
        //   { value: null, label: 'Selecione uma loja' },
        //     ...optionsEmpresas.map((empresa) => ({
        //     value: empresa.IDEMPRESA,
        //     label: empresa.NOFANTASIA,
        //   }))
        // ]}
        // labelMultSelectEmpresa={"Empresa"}
        // valueMultSelectEmpresa={empresaSelecionada}
        // onChangeMultSelectEmpresa={handleEmpresaChange}

        // InputFieldCodBarraComponent={InputField}
        // labelInputFieldCodBarra={"% Desconto"}
        // placeHolderInputFieldCodBarra={"% Desconto"}
        // valueInputFieldCodBarra={desconto}
        // onChangeInputFieldCodBarra={(e) => setDesconto(e.target.value)}

        // InputFieldComponent={InputField}
        // labelInputField={"Descrição da Capanha"}
        // placeHolderInputFieldComponent={"Descrição da Campanha"}
        // valueInputField={descricao}
        // onChangeInputField={(e) => setDescricao(e.target.value)}

        ButtonTypeCadastro={ButtonType}
        onButtonClickCadastro={(e) => setModalCadastrarCampanha(true)}
        linkNome={"Cadastrar Campanha"}
        corCadastro={"success"}
        IconCadastro={MdAdd}

      />


      <ActionListaCampanha dadosListaCampanha={dadosListaCampanha} />

      <ActionCadastrarCampanhaModal 
        show={modalCadastrarCampanha} 
        handleClose={(e) => setModalCadastrarCampanha(false)} 
        refetchPromocao={refetchPromocao} 
      />
    </Fragment >
  )
}