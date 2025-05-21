import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { post, put } from "../../../../../api/funcRequest";
import { formataStringComEspaco } from "../../../../../utils/formataStringComEspaco";

export const useEnviarMalote = ({salvarDadosMalotes, handleClick, optionsModulos}) => {
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

 
  const criarPostData = () => ({

    IDEMPRESA: usuarioLogado?.IDEMPRESA,
    DATAMOVIMENTOCAIXA: salvarDadosMalotes?.DTHORAFECHAMENTOFORMATADA,
    VRDINHEIRO: salvarDadosMalotes?.VALORTOTALDINHEIRO,
    VRCARTAO: salvarDadosMalotes?.VALORTOTALCARTAO,
    VRPOS: salvarDadosMalotes?.VALORTOTALPOS,
    VRPIX: salvarDadosMalotes?.VALORTOTALPIX,
    VRCONVENIO: salvarDadosMalotes?.VALORTOTALCONVENIO,
    VRVOUCHER: salvarDadosMalotes?.VALORTOTALVOUCHER,
    VRFATURA: salvarDadosMalotes?.VALORTOTALFATURA,
    VRFATURAPIX: salvarDadosMalotes?.VALORTOTALFATURAPIX,
    VRDESPESA: salvarDadosMalotes?.vrTotalDespesa,
    VRTOTALRECEBIDO: salvarDadosMalotes?.vrTotalVendido,
    VRDISPONIVEL: salvarDadosMalotes?.vrDisponivel,
    OBSERVACAOLOJA: '',
    IDUSERCRIACAO: usuarioLogado?.id,
    IDUSERULTIMAALTERACAO: usuarioLogado?.id,
    IDUSERENVIO: usuarioLogado?.id,
  });

  const exibirModalConfirmacao = async () => {
    return await Swal.fire({
      icon: 'question',
      text: `Deseja realmente enviar o Malote?`,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#FD1381',
      confirmButtonColor: '#7352A5',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      customClass: {
        container: 'custom-swal',
      },
    });
  };

  const exibirModalObservacao = async () => {
    return await Swal.fire({
      icon: 'info',
      text: 'Caso deseje adicionar uma observação, \n Digite e clique em "Enviar"!',
      input: 'textarea',
      inputPlaceholder: 'Digite sua observação aqui...',
      inputAttributes: {
        'aria-label': 'Digite sua observação aqui',
      },
      showCancelButton: true,
      cancelButtonColor: '#FD1381',
      confirmButtonColor: '#1dc9b7',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar Envio',
    });
  };

  const enviarMalote = async (postData) => {
    if(optionsModulos[0]?.CRIAR == 'False') {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Usuário sem permissão para enviar malote!',
        customClass: {
          container: 'custom-swal',
        },
        timer: 3000,
      });
      return;
    }
    const response = await post('/criar-malotes-por-loja', postData);
    const textDados = JSON.stringify(postData);
    const createData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: 'GERENCIA / ENVIO DE MALOTE',
      DADOS: textDados,
      IP: ipUsuario,
    };
    await post('/log-web', createData);

    Swal.fire({
      title: 'Sucesso!',
      text: 'Malote Enviado com Sucesso!',
      icon: 'success',
      customClass: {
        container: 'custom-swal',
      },
    });

    return response.data;
  };

  const reenviarMalote = async (observacao) => {
    if(optionsModulos[0]?.ALTERAR == 'False') {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Usuário sem permissão para reenviar malote!',
        customClass: {
          container: 'custom-swal',
        },
        timer: 3000,
      });
      return;
    }
    const putData = [
      {
        IDMALOTE: salvarDadosMalotes?.IDMALOTE,
        STATUS: 'Reenviado',
        OBSERVACAOLOJA: formataStringComEspaco(observacao).trim()?.toUpperCase(),
        IDUSERULTIMAALTERACAO: usuarioLogado?.id,
      },
    ];

    const response = await put('/malotes-por-loja/:id', putData);
    const textDados = JSON.stringify(putData);
    const createData = {
      IDFUNCIONARIO: usuarioLogado.id,
      PATHFUNCAO: 'GERENCIA / REENVIO DE MALOTE',
      DADOS: textDados,
      IP: ipUsuario,
    };
    await post('/log-web', createData);

    Swal.fire({
      title: 'Sucesso!',
      text: 'Malote Reenviado com Sucesso!',
      icon: 'success',
      customClass: {
        container: 'custom-swal',
      },
    });

    return response.data;
  };

  const onSalvarMalote = async () => {
    if (!usuarioLogado?.id || !usuarioLogado?.IDEMPRESA) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao tentar recuperar os dados da Sessão do Usuário, faça o logoff e entre novamente no sistema!',
        customClass: {
          container: 'custom-swal',
        },
        timer: 3000,
      });
      return;
    }

    const postData = criarPostData();
    const result = await exibirModalConfirmacao();

    if (result.isConfirmed) {
      const { value: observacao } = await exibirModalObservacao();

      if (!salvarDadosMalotes?.IDMALOTE) {
        postData.OBSERVACAOLOJA = formataStringComEspaco(observacao).trim()?.toUpperCase();
        await enviarMalote(postData);
        handleClick();
      } else {
        await reenviarMalote(observacao);
        handleClick();
      }
    }
  };

  // const onSalvarMalote = async () => {

  //   if (usuarioLogado?.id || usuarioLogado?.IDEMPRESA) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Erro!',
  //       text: 'Erro ao tentar recuperar os dados da Sessão do Usuário, faça o logoff e entre novamente no sistema!',
  //       customClass: {
  //         container: 'custom-swal',
  //       },
  //       timer: 3000,
  //     });
  //     return;
  //   }
  

  //   const postData = {
  //     IDEMPRESA: usuarioLogado?.IDEMPRESA,
  //     DATAMOVIMENTOCAIXA: salvarDadosMalotes?.DTHORAFECHAMENTOFORMATADA,
  //     VRDINHEIRO: salvarDadosMalotes?.VALORTOTALDINHEIRO,
  //     VRCARTAO: salvarDadosMalotes?.VALORTOTALCARTAO,
  //     VRPOS: salvarDadosMalotes?.VALORTOTALPOS,
  //     VRPIX: salvarDadosMalotes?.VALORTOTALPIX,
  //     VRCONVENIO: salvarDadosMalotes?.VALORTOTALCONVENIO,
  //     VRVOUCHER: salvarDadosMalotes?.VALORTOTALVOUCHER,
  //     VRFATURA: salvarDadosMalotes?.VALORTOTALFATURA,
  //     VRFATURAPIX: salvarDadosMalotes?.VALORTOTALFATURAPIX,
  //     VRDESPESA: salvarDadosMalotes?.vrTotalDespesa,
  //     VRTOTALRECEBIDO: salvarDadosMalotes?.vrTotalVendido,
  //     VRDISPONIVEL: salvarDadosMalotes?.vrDisponivel,
  //     OBSERVACAOLOJA: '',
  //     IDUSERCRIACAO: usuarioLogado?.id,
  //   };
  
  //   Swal.fire({
  //     icon: 'question',
  //     title: `${usuarioLogado?.NOFUNCIONARIO} \n Deseja realmente enviar o Malote?`,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     cancelButtonColor: '#FD1381',
  //     confirmButtonColor: '#7352A5',
  //     confirmButtonText: 'Sim',
  //     cancelButtonText: 'Não',
  //     customClass: {
  //       container: 'custom-swal',
  //     },
  //   }).then(async (result) => {
  //     try {
  //       if (result.isConfirmed) {
        
  //         const { value: observacao } = await Swal.fire({
  //           title: 'Caso deseje adicionar uma observação, Digite e clique em "Enviar"!',
  //           input: 'textarea',
  //           inputPlaceholder: 'Digite sua observação aqui...',
  //           inputAttributes: {
  //             'aria-label': 'Digite sua observação aqui',
  //           },
  //           showCancelButton: true,
  //           cancelButtonColor: '#FD1381',
  //           confirmButtonColor: '#7352A5',
  //           confirmButtonText: 'Salvar',
  //           cancelButtonText: 'Cancelar Envio',
  //         });
    
  //         if (observacao) {
  //           postData.OBSERVACAOLOJA = formataStringComEspaco(observacao).trim()?.toUpperCase(); 
    
  //           const response = await post('/criar-malotes-por-loja', postData);
  
  //           const textDados = JSON.stringify(postData);
  //           let textoFuncao = 'GERENCIA / ENVIO DE MALOTE';
  
  //           const createData = {
  //             IDFUNCIONARIO: usuarioLogado.id,
  //             PATHFUNCAO: textoFuncao,
  //             DADOS: textDados,
  //             IP: ipUsuario,
  //           };
  
  //           const responsePost = await post('/log-web', createData);
  
  //           Swal.fire({
  //             title: 'Sucesso!',
  //             text: 'Malote Reenviado com Sucesso!',
  //             icon: 'success',
  //             customClass: {
  //               container: 'custom-swal',
  //             },
  //           });
  
  //           return responsePost.data;

            
  //         } else {

  //           const putData = [
  //             {
  //               IDMALOTE: salvarDadosMalotes?.IDMALOTE,
  //               STATUS: 'Reenviado',
  //               OBSERVACAOLOJA: formataStringComEspaco(observacao).trim()?.toUpperCase(),
  //               IDUSERULTIMAALTERACAO: usuarioLogado?.id,
  //             }
  //           ]

  //           const response = await put('/malotes-por-loja/:id', putData);

  //           const textDados = JSON.stringify(putData);
  //           let textoFuncao = 'GERENCIA / REENVIO DE MALOTE';
  
  //           const createData = {
  //             IDFUNCIONARIO: usuarioLogado.id,
  //             PATHFUNCAO: textoFuncao,
  //             DADOS: textDados,
  //             IP: ipUsuario,
  //           };
  
  //           const responsePost = await post('/log-web', createData);
  
  //           Swal.fire({
  //             title: 'Sucesso!',
  //             text: ' Malote Reenviado com Sucesso!',
  //             icon: 'error',
  //             customClass: {
  //               container: 'custom-swal',
  //             },
  //           });


  //           return responsePost.data;
  //         }
  //       }
        
  //     } catch (error) {
  //       console.error('Erro ao enviar o malote:', error);
  //       Swal.fire({
  //         title: 'Erro!',
  //         text: 'Necessário preencher a Observação!',
  //         icon: 'error',
  //         customClass: {
  //           container: 'custom-swal',
  //         },
  //       });
  //     }
  //   });
  // };

  return {
    usuarioLogado,
    setUsuarioLogado,
    onSalvarMalote,
  };
};