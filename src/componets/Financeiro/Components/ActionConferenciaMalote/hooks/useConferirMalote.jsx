import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import axios from "axios";
import { post, put } from "../../../../../api/funcRequest";

export const useConferirMalote = ({salvarDadosMalotes, checkedItems, handleClick, optionsModulos, usuarioLogado}) => {
  const [observacaoFinanceiro, setObservacaoFinanceiro] = useState('');
  const [observacaoLoja, setObservacaoLoja] = useState('');
  const [pendenciasMalotes, setPendenciasMalotes] = useState([]);
  const [ipUsuario, setIpUsuario] = useState('');

  useEffect(() => {
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }


  // console.log('Itens selecionados:', checkedItems);
  // console.log(salvarDadosMalotes, 'salvarDadosMalotes');

  
  const onSalvarMalote = async (status) => {
    if(optionsModulos[0]?.ALTERAR == 'False') {
      Swal.fire({
        title: 'Erro!',
        text: `${usuarioLogado?.NOFUNCIONARIO},\nVocê não tem permissão para alterar o Malote!`,
        icon: 'error',
        customClass: {
          container: 'custom-swal',
        },
      });
      return;
    }

    if(!usuarioLogado?.id || !salvarDadosMalotes[0]?.IDEMPRESA) {
      if (!salvarDadosMalotes[0]?.IDEMPRESA) {
        Swal.fire({
          title: 'Erro!',
          text: `Erro ao tentar recuperar os dados da Sessão do Usuário ${usuarioLogado?.NOFUNCIONARIO}, faça o logoff e entre novamente no sistema!`,
          icon: 'error',
          customClass: {
            container: 'custom-swal',
          },
        });
        return;
      }
    }

    if(salvarDadosMalotes[0]?.STATUSMALOTE == 'Devolvido' && !observacaoFinanceiro.length && !checkedItems.length) {
      Swal.fire({
        title: 'Erro!',
        text: `${usuarioLogado?.NOFUNCIONARIO},\nPara devolver o malote é necessário selecionar as pendências e/ou informar a observação!`,
        icon: 'error',
        customClass: {
          container: 'custom-swal',
        },
      });
      return;
    }

    const putData = {
      IDMALOTE: salvarDadosMalotes[0]?.IDMALOTE,
      STATUS: status,
      OBSERVACAOADMINISTRATIVO: observacaoFinanceiro,
      PENDENCIAS: checkedItems,
      IDUSERULTIMAALTERACAO: usuarioLogado?.id
    };
    
    Swal.fire({
      icon: 'question',
      title: `Deseja realmente enviar o Malote?`,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#FD1381',
      confirmButtonColor: '#7352A5',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      customClass: {
        container: 'custom-swal',
      },

    }).then(async (result) => {
      if (result.isConfirmed) {
        // Abrir uma textarea para o usuário inserir a observação
        const { value: observacao } = await Swal.fire({
          title: 'Observação',

          showCancelButton: true,
          cancelButtonColor: '#FD1381',
          confirmButtonColor: '#7352A5',
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Cancelar',
          customClass: {
            container: 'custom-swal',
          },
        });
        
        if (observacao) {
          putData.OBSERVACAOLOJA = observacao; 
          
          try {
            const response = await put(`/malotes-loja/:id`, putData);
            console;log(`/malotes-loja/:id`, putData);
            console.log(response, 'response');
  
            const textDados = JSON.stringify(putData);
            let textoFuncao = 'FINANCEIRO / CONFERÊNCIA DE MALOTE';
  
            const createData = {
              IDFUNCIONARIO: usuarioLogado.id,
              PATHFUNCAO: textoFuncao,
              DADOS: textDados,
              IP: ipUsuario,
            };
  
            const responsePost = await post('/log-web', createData);
  
            Swal.fire({
              title: 'Sucesso!',
              text: `${usuarioLogado?.NOFUNCIONARIO} \n Malote Recebido com Sucesso!`,
              icon: 'success',
              customClass: {
                container: 'custom-swal',
              },
            });
  
            return responsePost.data;
          } catch (error) {

            const textDados = JSON.stringify(putData);
            let textoFuncao = 'FINANCEIRO / ERRO AO ENVIAR MALOTE';
  
            const createData = {
              IDFUNCIONARIO: usuarioLogado.id,
              PATHFUNCAO: textoFuncao,
              DADOS: textDados,
              IP: ipUsuario,
            };
  
            const responsePost = await post('/log-web', createData);
  
            Swal.fire({
              title: 'Erro!',
              text: `${usuarioLogado?.NOFUNCIONARIO} \n Erro ao Enviar Malote!`,
              icon: 'error',
              customClass: {
                container: 'custom-swal',
              },
            });


            return responsePost.data;
          }
        } else {
          Swal.fire({
            title: 'Erro!',
            text: `${usuarioLogado?.NOFUNCIONARIO} \n Necessário preencher a Observação!`,
            icon: 'error',
            customClass: {
              container: 'custom-swal',
            },
          });
        }
      }
    });
  };

  return {
    usuarioLogado,
    observacaoFinanceiro,
    setObservacaoFinanceiro,
    observacaoLoja,
    setObservacaoLoja,
    onSalvarMalote,
  };
};