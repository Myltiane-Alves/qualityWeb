import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { post } from "../../../../../api/funcRequest";
import { getDataAtual, getHoraAtual } from "../../../../../utils/dataAtual";
import { toFloat } from "../../../../../utils/toFloat";

export const useCreateDeposito = ({ handleClose, optionsModulos, usuarioLogado, empresaSelecionada }) => {
    const [ipUsuario, setIpUsuario] = useState('');
    const [historico, setHistorico] = useState('');
    const [vrDeposito, setVrDeposito] = useState('');
    const [contaSelecionada, setContaSelecionada] = useState('');
    const [documento, setDocumento] = useState('');
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')

    useEffect(() => {
        const dataAtual = getDataAtual()
        const horaAtual = getHoraAtual()
        setData(dataAtual)
        setHora(horaAtual)
        getIPUsuario();
    }, [usuarioLogado]);

    const getIPUsuario = async () => {
        const response = await axios.get('http://ipwho.is/')
        if (response.data) {
            setIpUsuario(response.data.ip);
        }
        return response.data;
    }

    const submit = async () => {
        if(optionsModulos[0]?.CRIAR == 'False'){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro!',
                text: 'Você não tem permissão para criar ajuste de extrato!',
                customClass: {
                    container: 'custom-swal',
                },
                showConfirmButton: false,
                timer: 4000 
            });
            return
        }
        const postData = {
            IDEMPRESA: empresaSelecionada,
            IDUSR: usuarioLogado.id,
            IDCONTABANCO: contaSelecionada,
            DTDEPOSITO: data,
            DTMOVIMENTOCAIXA: hora,
            DSHISTORIO: historico,
            NUDOCDEPOSITO: documento,
            VRDEPOSITO: vrDeposito,
            STATIVO: 'True',
            STCANCELADO: 'False',
            
        }

        try {

            const response = await post('/cadastrar-deposito-loja', postData)
            const textDados = JSON.stringify(postData)
            let textoFuncao = 'FINANCEIRO/CADASTRO DEPOSITO PELO EXTRATO DE CONTAS';


            const postLogData = {
                IDFUNCIONARIO: usuarioLogado.id,
                PATHFUNCAO: textoFuncao,
                DADOS: textDados,
                IP: ipUsuario
            }
    
            const responsePost = await post('/log-web', postLogData)

            Swal.fire({
                position: 'center',
                title: 'Sucesso',
                text: 'Ajuste criado com Sucesso',
                icon: 'success',
                timer: 3000,
                customClass: {
                container: 'custom-swal',
                }
            })
            handleClose()
            return responsePost.data
        } catch (error) {
            const postLogData = {
                IDFUNCIONARIO: usuarioLogado.id,
                PATHFUNCAO: `FINANCEIRO/ERRO AO CRIAR AJUSTE EXTRATO`,
                DADOS: postData,
                IP: ipUsuario
            }
    
            const responsePost = await post('/log-web', postLogData)
            handleClose()

             Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao Criar Ajuste de Extrato!',
                customClass: {
                container: 'custom-swal',
                },
                showConfirmButton: false,
                timer: 4000 
            });

            return responsePost.data
            
        }

    }

    return {
        dataMovimento,
        hora,
        historico,
        vrDeposito,
        documento,
        contaSelecionada,
        setVrDeposito,
        setContaSelecionada,
        setDocumento,
        setHistorico,
        setDataMovimento,
        setHora,
        submit,
    }
}