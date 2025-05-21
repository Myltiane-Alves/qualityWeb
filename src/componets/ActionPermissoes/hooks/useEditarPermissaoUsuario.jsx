import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { post, put } from "../../../api/funcRequest";

export const useEditarPermissaoUsuario = () => {
  const [moduloSelecionado, setModuloSelecionado] = useState('');
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [menuPaiSelecionado, setMenuPaiSelecionado] = useState('');
  const [menuFilhoSelecionado, setMenuFilhoSelecionado] = useState([]);
  const [funcaoSelecionada, setFuncaoSelecionada] = useState('');
  const [alterar, setAlterar] = useState('False');
  const [criar, setCriar] = useState('False');
  const [nivel1, setNivel1] = useState('False');
  const [nivel2, setNivel2] = useState('False');
  const [nivel3, setNivel3] = useState('False');
  const [nivel4, setNivel4] = useState('False');
  const [administrador, setAdministrador] = useState('False');

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
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


  // if (moduloSelecionado == '') {
  //   Swal.fire({
  //     type: 'error',
  //     title: 'Atenção',
  //     text: 'Selecione um módulo',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }

  // if (funcionarioSelecionado == '') {
  //   Swal.fire({
  //     type: 'error',
  //     title: 'Atenção',
  //     text: 'Selecione um funcionário',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }

  // if (menuPaiSelecionado == '') {
  //   Swal.fire({
  //     type: 'error',
  //     title: 'Atenção',
  //     text: 'Selecione um menu pai',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }

  // if (menuFilhoSelecionado?.length == 0) {
  //   Swal.fire({
  //     type: 'error',
  //     title: 'Atenção',
  //     text: 'Selecione um menu filho',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }

  // if (funcaoSelecionada == '') {
  //   Swal.fire({
  //     type: 'error',
  //     title: 'Atenção',
  //     text: 'Selecione uma função',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payload = {
    //   perfilUsuario: {
    //     IDUSUARIO: funcionarioSelecionado.value,
    //     IDMODULOADMINISTRATIVO: moduloSelecionado == 1 ? moduloSelecionado : '',
    //     IDMODULOGERENCIA: moduloSelecionado == 2 ? moduloSelecionado : '',
    //     IDMODULOINFORMATICA: moduloSelecionado == 3 ? moduloSelecionado : '',
    //     IDMODULOFINANCEIRO: moduloSelecionado == 4 ? moduloSelecionado : '',
    //     IDMODULOCOMERCIAL: moduloSelecionado == 5 ? moduloSelecionado : '',
    //     IDMODULOCOMPRAS: moduloSelecionado == 6 ? moduloSelecionado : '',
    //     IDMODULOCONTABILIDADE: moduloSelecionado == 7 ? moduloSelecionado : '',
    //     IDMODULOMARKETING: moduloSelecionado == 8 ? moduloSelecionado : '',
    //     IDMODULORH: moduloSelecionado == 9 ? moduloSelecionado : '',
    //     IDMODULOCOMPRASADM: moduloSelecionado == 10 ? moduloSelecionado : '',
    //     IDMODULOEXPEDICAO: moduloSelecionado == 11 ? moduloSelecionado : '',
    //     IDMODULOCONFERENCIACEGA: moduloSelecionado == 12 ? moduloSelecionado : '',
    //     IDMODULOCADASTRO: moduloSelecionado == 13 ? moduloSelecionado : '',
    //     IDMODULOETIQUETAGEM: moduloSelecionado == 14 ? moduloSelecionado : '',
    //     IDMODULORESUMOVENDAS: moduloSelecionado == 15 ? moduloSelecionado : '',
    //     IDMODULOVOUCHER: moduloSelecionado == 16 ? moduloSelecionado : '',
    //     IDMODULOMALOTE: moduloSelecionado == 17 ? moduloSelecionado : '',
    //     IDPERMISSAO: menuFilhoSelecionado == 18 ? menuFilhoSelecionado : '',
    //     IDMENU: menuPaiSelecionado,
    //     IDMENUFILHO: menuFilhoSelecionado,
    //     CRIAR: criar,
    //     ALTERAR: alterar,
    //     ADMINISTRADOR: administrador,
    //     N1: nivel1,
    //     N2: nivel2,
    //     N3: nivel3,
    //     N4: nivel4,
    //     IDUSERULTIMAALTERACAO: usuarioLogado.id,
    //   },
    //   menuFilhoUsuario: {
    //     IDMENUFILHO: menuFilhoSelecionado,
    //     CRIAR: criar,
    //     ALTERAR: alterar,
    //     ADMINISTRADOR: administrador,
    //     N1: nivel1,
    //     N2: nivel2,
    //     N3: nivel3,
    //     N4: nivel4,
    //   },
    // };

    const payload = {
      IDUSUARIO: funcionarioSelecionado.value,
      IDMODULOADMINISTRATIVO: moduloSelecionado == 1 ? moduloSelecionado : '',
      IDMODULOGERENCIA: moduloSelecionado == 2 ? moduloSelecionado : '',
      IDMODULOINFORMATICA: moduloSelecionado == 3 ? moduloSelecionado : '',
      IDMODULOFINANCEIRO: moduloSelecionado == 4 ? moduloSelecionado : '',
      IDMODULOCOMERCIAL: moduloSelecionado == 5 ? moduloSelecionado : '',
      IDMODULOCOMPRAS: moduloSelecionado == 6 ? moduloSelecionado : '',
      IDMODULOCONTABILIDADE: moduloSelecionado == 7 ? moduloSelecionado : '',
      IDMODULOMARKETING: moduloSelecionado == 8 ? moduloSelecionado : '',
      IDMODULORH: moduloSelecionado == 9 ? moduloSelecionado : '',
      IDMODULOCOMPRASADM: moduloSelecionado == 10 ? moduloSelecionado : '',
      IDMODULOEXPEDICAO: moduloSelecionado == 11 ? moduloSelecionado : '',
      IDMODULOCONFERENCIACEGA: moduloSelecionado == 12 ? moduloSelecionado : '',
      IDMODULOCADASTRO: moduloSelecionado == 13 ? moduloSelecionado : '',
      IDMODULOETIQUETAGEM: moduloSelecionado == 14 ? moduloSelecionado : '',
      IDMODULORESUMOVENDAS: moduloSelecionado == 15 ? moduloSelecionado : '',
      IDMODULOVOUCHER: moduloSelecionado == 16 ? moduloSelecionado : '',
      IDMODULOMALOTE: moduloSelecionado == 17 ? moduloSelecionado : '',
      IDPERMISSAO: menuFilhoSelecionado == 18 ? menuFilhoSelecionado : '',
      IDMENU: menuPaiSelecionado,
      IDMENUFILHO: menuFilhoSelecionado,
      CRIAR: criar,
      ALTERAR: alterar,
      ADMINISTRADOR: administrador,
      N1: nivel1,
      N2: nivel2,
      N3: nivel3,
      N4: nivel4,
      IDUSERULTIMAALTERACAO: usuarioLogado.id,
    }

    const response = await put(`/perfil-usuario/:id `, payload);

    const textDados = JSON.stringify(payload);
    let textoFuncao = 'PERMISSÕES USUARIO / ALTERAÇÃO DE PERMISSÕES';

    const createData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: textoFuncao,
      DADOS: textDados,
      IP: ipUsuario,
    };

    await post('/log-web', createData);

    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Permissão editada com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

    return response.data;
  }

  return {
    moduloSelecionado,
    setModuloSelecionado,
    funcionarioSelecionado,
    setFuncionarioSelecionado,
    menuPaiSelecionado,
    setMenuPaiSelecionado,
    menuFilhoSelecionado,
    setMenuFilhoSelecionado,
    funcaoSelecionada,
    setFuncaoSelecionada,
    alterar,
    setAlterar,
    criar,
    setCriar,
    nivel1,
    setNivel1,
    nivel2, 
    setNivel2,
    nivel3,
    setNivel3,
    nivel4,
    setNivel4,
    administrador,
    setAdministrador,
    usuarioLogado,
    handleSubmit
  }
}