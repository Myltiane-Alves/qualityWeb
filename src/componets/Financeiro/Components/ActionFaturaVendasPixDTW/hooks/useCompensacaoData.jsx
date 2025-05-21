import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { post, put } from "../../../../../api/funcRequest";

export const useCompensacaoData = ({ usuarioLogado, optionsModulos, handleClickVendasPix }) => {
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

    const handleDetalhar = async (IDDETALHEFATURA) => {
        if (optionsModulos[0]?.ALTERAR == 'False') {
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
        
        try {
            if (typeof IDDETALHEFATURA === 'string') {
                IDDETALHEFATURA = [IDDETALHEFATURA];
            }

            Swal.fire({
                title: 'Informe a Data de Compensação',
                html: '<input type="date" id="dtcompensacao" name="DTCompensacao" class="form-control" value="" >',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const dtCompensacao = document.getElementById('dtcompensacao').value;

                    const dados = IDVENDA.map(id => ({
                        "IDDETALHEFATURA": id,
                        "STCONFERIDO": 'True',
                        "DATA_COMPENSACAO": dtCompensacao
                    }));

                    await put("/atualizar-status-fatura-pix", dados);
                   

                    const textdados = JSON.stringify(dados);
                    const textoFuncao = 'FINANCEIRO/CONFIRMADA CONFERENCIA DA VENDA';
                    const dadosConfirmaDep = [{
                        "IDFUNCIONARIO": usuarioLogado.IDFUNCIONARIO,
                        "PATHFUNCAO": textoFuncao,
                        "DADOS": textdados,
                        "IP": ipUsuario
                    }];

                    await post("/log-web", dadosConfirmaDep);
                    handleClickVendasPix();
                    Swal.fire('Sucesso!', 'Venda detalhada com sucesso.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log('Ação cancelada pelo usuário.');
                }
            });
        } catch (error) {
            console.error('Erro ao buscar detalhes da venda: ', error);
        }
    };

    return { handleDetalhar };
}