import Swal from "sweetalert2";
import { post, put } from "../../../../../api/funcRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAlterarVendaVendedor = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [vendedorSelecionado, setVendedorSelecionado] = useState('')
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [ipUsuario, setIpUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
        try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
        } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
        }
    } else {
        navigate('/');
    }
    }, [navigate]);

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

    const alterarVendaVendedor = async () => {
    if(selectedIds.length === 0) {
        Swal.fire({
        icon: 'warning',
        title: 'Selecione uma Venda!',
        text: 'Favor selecionar ao menos uma venda!',
        confirmButtonText: 'OK',
        customClass: {
            container: 'custom-swal', 
        },
        });
        return;
    }
    if (vendedorSelecionado === '') {
        Swal.fire({
        icon: 'warning',
        title: 'Selecione um Vendedor!',
        text: 'Selecione um vendedor para alterar a venda',
        confirmButtonText: 'OK',
        customClass: {
            container: 'custom-swal', 
        },
        });
        return;
    }

    const putData = {
        IDVENDADETALHE:  selectedIds,
        IDVENDEDOR: vendedorSelecionado,
    }

    try {

        const response = await put('/venda-vendedor/:id', putData)
        const textDados = JSON.stringify(putData)
        let textFuncao = 'ADMINISTRATIVO / VENDAS / ALTERAR VENDA VENDEDOR';
    
        const postDataEditarCaixa = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textFuncao,
        DADOS: textDados,
        IP: ipUsuario
        }
    
        const responseEditarCaixa = await post('/log-web', postDataEditarCaixa)
    
        Swal.fire({
        icon: 'success',
        title: 'Venda Alterada com Sucesso!',
        text: 'Venda alterada com sucesso!',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
            container: 'custom-swal', 
        },
        });
        
        handleClose();
        return responseEditarCaixa.data;
    } catch (error) {
        let textFuncao = 'ADMINISTRATIVO / VENDAS / ERRO ALTERAR VENDA VENDEDOR';
    
        const postDataEditarCaixa = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textFuncao,
        DADOS: 'Erro ao alterar a venda',
        IP: ipUsuario
        }
    
        const responseEditarCaixa = await post('/log-web', postDataEditarCaixa)
    
        Swal.fire({
        icon: 'error',
        title: 'Erro ao alterar a venda!',
        text: 'Erro ao alterar a venda!',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
            container: 'custom-swal', 
        },
        });
        console.error('Erro ao alterar a venda:', error);
        return responseEditarCaixa.data;
    }
    }
    
}