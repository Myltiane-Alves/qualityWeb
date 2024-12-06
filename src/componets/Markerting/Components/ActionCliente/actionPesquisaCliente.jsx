import React, { Fragment, useEffect, useState, useRef } from "react"
import { InputField } from "../../../Buttons/Input"
import { InputSelectAction } from "../../../Inputs/InputSelectAction"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ActionMain } from "../../../Actions/actionMain"
import { get} from "../../../../api/funcRequest"
import Swal from 'sweetalert2'
import { MdAdd } from "react-icons/md"
import { useQuery } from "react-query"
import { ActionListaCliente } from "./actionListaCliente"
import { ActionCadastrarClienteModal } from "./actionCadastrarClienteModal"

export const ActionPesquisaCliente = () => {
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [cep, setCep] = useState('')
  const [uf, setUf] = useState('')
  const [campanhaSelecionada, setCampanhaSelecionada] = useState('')
  const [clienteSelecionado, setClienteSelecionado] = useState('')
  const [modalCadastrarCliente, setModalCadastrarCliente] = useState(false)

  // useEffect(() => {
  //   const clienteArmazenado = localStorage.getItem('clienteSelecionado');
  //   if (clienteArmazenado) {
  //     try {
  //       const dadosCliente = JSON.parse(clienteArmazenado);
  //       setClienteSelecionado(dadosCliente);
  //       setCpf(dadosCliente[0].NUCPFCNPJ);
  //       setTelefone(dadosCliente[0].NUTELEFONE);
  //       setNome(dadosCliente[0].NOME);
  //       setEndereco(dadosCliente[0].EENDERECO);
  //       setComplemento(dadosCliente[0].ECOMPLEMENTO);
  //       setBairro(dadosCliente[0].EBAIRRO);
  //       setCidade(dadosCliente[0].ECIDADE);
  //       setCep(dadosCliente[0].NUCEP);
  //       setUf(dadosCliente[0].SGUF);
  //       setCampanhaSelecionada(dadosCliente[0].DSCAMPANHA);
  //     } catch (error) {
  //       console.error("Erro ao recuperar os dados do cliente selecionado:", error);
  //     }
  //   }

  // }, []);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', () => {
  //     localStorage.removeItem('clienteSelecionado');
  //   });

  // }, []);

  const { data: dadosCampanha = [], error: errorCampanha, isLoading: isLoadingCampanha, refetch: refetchCampanha } = useQuery(
    'campanha',
    async () => {
      const response = await get(`/campanha`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: dadosListaCampanhaCliente = [], error: errorCampanhaCliente, isLoading: isLoadingCampanhaCliente, refetch: refetchCampanhaCliente } = useQuery(
    ['campanha-cliente', cpf],
    async () => {

      const response = await get(`/campanha-cliente?cpf=${cpf}`);
      return response.data;

    },
    { enabled: true, staleTime: 5 * 60 * 1000 }
  );

  useEffect(() => {
    if (cpf > 10) {
      Swal.fire({
        title: 'Cliente já cadastrado!',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  }, [cpf]);





  return (

    <Fragment>


      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Cadastro de Clientes"]}
        title="Cadastro de Clientes"
        // subTitle="Nome da Loja"

        InputFieldVendaCPFCNPJComponent={InputField}
        labelInputFieldVendaCPFCNPJ={"Nr. CPF"}
        valueInputFieldVendaCPFCNPJ={cpf}
        onChangeInputFieldVendaCPFCNPJ={(e) => setCpf(e.target.value)}

        InputFieldTelefoneComponent={InputField}
        labelInputFieldTelefone={"Nr. Telefone"}
        valueInputFieldTelefone={telefone}
        onChangeInputFieldTelefone={(e) => setTelefone(e.target.value)}

        InputFieldDescricaoComponent={InputField}
        labelInputFieldDescricao={"Nome Cliente"}
        valueInputFieldDescricao={nome}
        onChangeInputFieldDescricao={(e) => setNome(e.target.value)}

        InputFieldEnderecoComponent={InputField}
        labelInputFieldEndereco={"Endereço"}
        valueInputFieldEndereco={endereco}
        onChangeInputFieldEndereco={(e) => setEndereco(e.target.value)}

        InputFieldComplementoComponent={InputField}
        labelInputFieldComplemento={"Complemento"}
        valueInputFieldComplemento={complemento}
        onChangeInputFieldComplemento={(e) => setComplemento(e.target.value)}

        InputFieldBairroComponent={InputField}
        labelInputFieldBairro={"Bairro"}
        valueInputFieldBairro={bairro}
        onChangeInputFieldBairro={(e) => setBairro(e.target.value)}

        InputFieldCidadeComponent={InputField}
        labelInputFieldCidade={"Cidade"}
        valueInputFieldCidade={cidade}
        onChangeInputFieldCidade={(e) => setCidade(e.target.value)}

        InputFieldCepComponent={InputField}
        labelInputFieldCep={"CEP"}
        valueInputFieldCep={cep}
        onChangeInputFieldCep={(e) => setCep(e.target.value)}

        InputFieldUFComponent={InputField}
        labelInputFieldUF={"UF"}
        valueInputFieldUF={uf}
        onChangeInputFieldUF={(e) => setUf(e.target.value)}

        InputSelectCampanhaComponent={InputSelectAction}
        labelSelectCampanha={"Campanha"}
        optionsSelectCampanha={dadosCampanha.map((item, index) => ({
          contador: index +1,
          value: item.IDCAMPANHA,
          label: `${index +1} - ${item.DSCAMPANHA} -> ${item.NOFANTASIA}`
        }))}
        valueSelectCampanha={campanhaSelecionada}
        onChangeSelectCampanha={(e) => setCampanhaSelecionada(e.value)}

        ButtonTypeCadastro={ButtonType}
        onButtonClickCadastro={() => setModalCadastrarCliente(true)}
        linkNome={"Cadastrar Cliente"}
        corCadastro={"success"}
        IconCadastro={MdAdd}
      />

      <ActionListaCliente dadosListaCampanhaCliente={dadosListaCampanhaCliente} dadosCampanha={dadosCampanha} />

      <ActionCadastrarClienteModal
        show={modalCadastrarCliente}
        handleClose={() => setModalCadastrarCliente(false)}
      />
    </Fragment >
  )
}

