import axios from "axios";
import { useEffect, useState } from "react";
import { post, put } from "../../../../../api/funcRequest";
import Swal from "sweetalert2";

export const useAtivarCancelar = ({usuarioLogado, optionsModulos}) => {
    const [ipUsuario, setIpUsuario] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getIPUsuario();
    }, [usuarioLogado]);
    
    const getIPUsuario = async () => {
        const response = await axios.get('http://ipwho.is/')
        if(response.data) {
            setIpUsuario(response.data.ip);
        }
        return response.data;
    }
    
     const handleCancelar = async (IDQUEBRACAIXA, status) => {
        if(optionsModulos[0]?.ALTERAR == 'False') {
            Swal.fire({
                title: 'Atenção',
                text: `Você não tem permissão para alterar o status da Quebra de Caixa`,
                icon: 'warning',
                timer: 3000,
                customClass: {
                container: 'custom-swal',
                }
            })
            return;
        }
        
        setIsSubmitting(true);
        const putData = {  
          IDQUEBRACAIXA: IDQUEBRACAIXA,
          STATIVO: status ? 'True' : 'False'
        }
        try {
          const response = await put('/atualizar-status-quebra', putData)
          Swal.fire({
            title: 'Sucesso',
            text: `Quebra de Caixa ${status ? 'Ativada' : 'Cancelada'} com Sucesso`,
            icon: 'success',
            timer: 3000,
            customClass: {
              container: 'custom-swal',
            }
          })
    
          const textDados = JSON.stringify(putData)
          let textoFuncao = status ? 'FINANCEIRO/ATIVADO QUEBRA DE CAIXA' : 'FINANCEIRO/CANCELAMENTO DE QUEBRA DE CAIXA';
    
        
      
          const postData = {  
            IDFUNCIONARIO: usuarioLogado.id,
            PATHFUNCAO:  textoFuncao,
            DADOS: textDados,
            IP: ipUsuario
          }
    
          const responsePost = await post('/log-web', postData)
      
          return responsePost.data;
    
        } catch (error) {
            let textoFuncao = status ? 'FINANCEIRO/ERRO ALTERAR QUEBRA DE CAIXA' : 'FINANCEIRO/CANCELAMENTO DE QUEBRA DE CAIXA';
      
            const postData = {  
              IDFUNCIONARIO: usuarioLogado.id,
              PATHFUNCAO:  textoFuncao,
              DADOS: textDados,
              IP: ipUsuario
            }
      
            const responsePost = await post('/log-web', postData)

            Swal.fire({
                title: 'Erro',
                text: `Erro ao Tentar ${status ? 'Ativar' : 'Cancelar'} a Quebra de Caixa`,
                icon: 'error',
                timer: 3000,
                customClass: {
                container: 'custom-swal',
                }
            })
            responsePost.data;
        } finally {
          setIsSubmitting(false);
        }
        
      }

    return {
        handleCancelar
    }

}