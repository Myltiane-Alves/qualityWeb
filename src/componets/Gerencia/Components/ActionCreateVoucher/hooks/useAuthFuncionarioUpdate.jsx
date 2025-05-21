import { useState } from 'react';
import Swal from 'sweetalert2';
import { post } from '../../../../api/funcRequest';


export const useAuthFuncionarioUpdate = (usuarioLogado) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioAutorizado, setUsuarioAutorizado] = useState([]);
  const funcAutorizadasAcesso = [
    'TI',
    'SUPERVISOR',
    'GERENTE',
    'SUB GERENTE',
    'FISCAL DE CAIXA',
    'OPERADORA DE CAIXA',
    'OPERADOR DE CAIXA',
    'OPERADOR(A) DE CAIXA'
  ];


  const openSwal = async (callback, row) => {
    if (!funcAutorizadasAcesso.includes(usuarioLogado?.DSFUNCAO)) {
        Swal.fire({
          icon: 'error',
          title: 'Acesso Negado!',
          text: 'ACESSO NEGADO! Usuário Sem Permissão!',
        });
        return;
      }

      
    const { value: formValues } = await Swal.fire({
      title: 'Autorização',
      html: `
        <div>
          <label class="form-label" for="matricula">Matrícula</label>
          <input type="text" id="matricula" class="swal2-input" placeholder="Matrícula" style="text-align: center;" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <label class="form-label" for="senha">Senha</label>
          <input type="password" id="senha" class="swal2-input" placeholder="Senha">
        </div>      
      `,
      width: '25rem',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Entrar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const swalContainer = Swal.getPopup();
        swalContainer.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            Swal.clickConfirm();
          }
        });
      },
      preConfirm: async () => {
        const usuario = document.getElementById('matricula').value;
        const senha = document.getElementById('senha').value;
    
        const data = { 
          MATRICULA: usuario, 
          SENHA: senha, 
          IDEMPRESALOGADA: usuarioLogado.IDEMPRESA,
          IDGRUPOEMPRESARIAL: usuarioLogado.IDGRUPOEMPRESARIAL, 
          IDVOUCHER: row.IDVOUCHER,
        }; 

        try {
          const response = await post('/auth-funcionario-update-voucher', data);
        
          if (response.data) {
            return response.data;
          } else {
            Swal.showValidationMessage(`Credenciais inválidas`);
          }
        } catch (error) {
          Swal.showValidationMessage(`Erro ao autenticar: ${error.message}`);
        }
      }
    });
  
    if (formValues) {
      setIsLoggedIn(true);
      setUsuarioAutorizado(formValues);
      callback();
    }
  };

  return { openSwal, isLoggedIn, usuarioAutorizado };
};