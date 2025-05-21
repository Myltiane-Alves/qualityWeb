import React, { Fragment, useEffect, useState, useRef } from "react"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ActionMain } from "../../../Actions/actionMain"
import { get} from "../../../../api/funcRequest"
import Swal from 'sweetalert2'
import { MdAdd } from "react-icons/md"
import { useQuery } from "react-query"
import { ActionListaCliente } from "./actionListaCliente"
import { ActionCadastrarClienteModal } from "./ActionCadastrarCliente/actionCadastrarClienteModal"

export const ActionPesquisaCliente = () => {
  const [modalCadastrarCliente, setModalCadastrarCliente] = useState(false)
  const [cpf, setCPF] = useState('')


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

