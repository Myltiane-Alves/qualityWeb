import { useEffect, useState } from "react";
import { post, put } from "../../../../api/funcRequest";
import axios from "axios";
import Swal from "sweetalert2";

export const useUpdatePromocao = ({ usuarioLogado, optionsModulos }) => {
  const [dataFim, setDataFim] = useState('')
  const [ipUsuario, setIpUsuario] = useState('')

  useEffect(() => {
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/');
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  };


  const onSubmit = async (IDRESUMOPROMOCAOMARKETING, DTHORAFIM) => {
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
        return;
    }

    try {
        Swal.fire({
            title: 'Alterar Data Fim',
            html: `<input type="date" id="dtfim" name="dtfim" class="form-control" value="${DTHORAFIM}" >`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const dtFim = document.getElementById('dtfim').value;
                const putData = {
                    IDRESUMOPROMOCAOMARKETING,
                    DTHORAFIM: dtFim + ' 23:59:59',
                };

                await put('/promocoes-ativas/:id', putData);

                const textDados = JSON.stringify(putData);
                const createData = {
                    IDFUNCIONARIO: usuarioLogado?.id,
                    PATHFUNCAO: 'PROMOCAO/ALTERAR DATA FIM PROMOÇÃO',
                    DADOS: textDados,
                    IP: ipUsuario,
                };

                await post('/log-web', createData);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Atualização realizado com sucesso!',
                    customClass: {
                        container: 'custom-swal',
                    },
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelado', 'Operação cancelada', 'error');
            }
        });
    } catch (error) {
        const errorLogData = {
            IDFUNCIONARIO: usuarioLogado?.id,
            PATHFUNCAO: 'PROMOCAO/ERRO AO ALTERAR DATA FIM PROMOÇÃO',
            DADOS: JSON.stringify({ error: error.message }),
            IP: ipUsuario,
        };

        try {
            await post('/log-web', errorLogData);
        } catch (logError) {
            console.error('Erro ao salvar log de erro:', logError);
        }

        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Erro ao Cadastrar Promoção!',
            customClass: {
                container: 'custom-swal',
            },
            showConfirmButton: false,
            timer: 1500,
        });
    }
  };

  return {
    dataFim,
    setDataFim,
    onSubmit
  }
}