import Swal from "sweetalert2";
import { post } from "../../../../../api/funcRequest";
import { useEffect, useState } from "react";
import axios from "axios"
import { useFetchData } from "../../../../../hooks/useFetchData";

export const useCadastrarBonificaoca = ({ handleClose, usuarioLogado, funcionarioSelecionado, setFuncionarioSelecionado, optionsModulos }) => {
  const [ipUsuario, setIpUsuario] = useState('');
  const [funcionario, setFuncionario] = useState(funcionarioSelecionado);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [valorBonificao, setValorBonificacao] = useState('');
  const [txtHistorico, setTxtHistorico] = useState('');


  useEffect(() => {
    getIPUsuario();
  }, [usuarioLogado]);

  const { data: dadosFuncionarios = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('funcionarios', '/funcionarios');

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }


  const onSubmit = async () => {
    if (optionsModulos[0]?.ALTERAR == 'False') {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Você não tem permissão para cadastrar!',
        timer: 3000,
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-danger btn-lg",
        },
      })
      return;
    }

    try {
      if (tipoSelecionado == '') {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Informe o tipo de movimento!',
          timer: 3000,
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
            cancelButton: "btn btn-danger btn-lg",
          },
        })
        return;
      }

      if (funcionario == '') {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Informe o funcionário!',
          timer: 3000,
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
            cancelButton: "btn btn-danger btn-lg",
          },
        })
        return;
      }

      if (valorBonificao == '' || valorBonificao == '0') {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Informe o valor da bonificação!',
          timer: 3000,
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
            cancelButton: "btn btn-danger btn-lg",
          },
        })
        return;
      }

      if (txtHistorico == '') {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Informe o histórico!',
          timer: 3000,
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
            cancelButton: "btn btn-danger btn-lg",
          },
        })
        return;
      }

      const data = {
        IDFUNCIONARIO: funcionarioSelecionado.value,
        TIPOMOVIMENTO: tipoSelecionado,
        VRMOVIMENTO: valorBonificao,
        OBSERVACAO: txtHistorico,
        IDFUNCIONARIORESP: usuarioLogado.id
      }

      const response = await post('/movimento-saldo-bonificacao', data)

      const textDados = JSON.stringify(data)
      let textoFuncao = 'FINANCEIRO/CADASTRO DE BONIFICACAO';

      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }


      const responsePost = await post('/log-web', postData)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })

      handleClose();
      return responsePost;
    } catch (error) {
      let textoFuncao = 'FINANCEIRO/ERRO NO CADASTRO DE BONIFICACAO';

      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: 'ERRRO AO CADASTRAR BONIFICACAO',
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', postData)

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
        showConfirmButton: false,
        timer: 1500
      });

      return responsePost.data;
    }
  }

  const OptionsStatus = [

    { id: 0, value: "True", label: "Crédito" },
    { id: 1, value: "False", label: "Débito" },
  ]

  return {
    funcionario,
    setFuncionario,
    valorBonificao,
    setValorBonificacao,
    tipoSelecionado,
    txtHistorico,
    OptionsStatus,
    setTipoSelecionado,
    setTxtHistorico,
    dadosFuncionarios,
    onSubmit,

  }
}