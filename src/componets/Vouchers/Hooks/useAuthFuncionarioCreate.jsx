import { useState } from 'react';
import Swal from 'sweetalert2';
import { get, post } from '../../../api/funcRequest';
import { validarCPF, mascaraCPF } from '../../../utils/formatCPF';
import { mascaraCNPJ, validarCNPJ } from '../../../utils/mascaraCNPJ';

export const useAuthFuncionarioCreate = ({dadosVoucherLogin, usuarioLogado}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioAutorizado, setUsuarioAutorizado] = useState([]);
  const [motivoTroca, setMotivoTroca] = useState('');
  
  // if(usuarioLogado?.DSFUNCAO) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Acesso Negado!',
  //     text: 'ACESSO NEGADO! Usuário Sem Permissão!',
  //   });
  //   return;
  // }

  const onAuthFuncionarioCreate = async (callback, row) => {
    if(dadosVoucherLogin)  {
        
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
            const response = await post('/auth-funcionario-create-voucher', data);
          
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
  }

  const onMotivo = async (callback, row) => {
    if (dadosVoucherLogin) {
      const { value: motivo } = await Swal.fire({
        title: 'Motivo da troca?',
        html: `
          <div>
            <input 
              type="text" 
              id="motivo" 
              class="swal2-input" 
              placeholder="Digite o Motivo"  
              style="text-transform: uppercase"
            >
            <small class="fw-700">*Mínimo 10 caracteres</small>
          </div>      
        `,
        width: '25rem',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Sair',
        didOpen: () => {
          const swalContainer = Swal.getPopup();
          swalContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              Swal.clickConfirm();
            }
          });
        },
        preConfirm: () => {
          const motivo = document.getElementById('motivo').value.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s{2,}/g, ' ');
          if (!motivo || motivo.length < 10) {
            return Swal.showValidationMessage('O motivo deve ter no mínimo 10 caracteres');
          }

          if(motivo.length > 200) {
            return Swal.showValidationMessage('Motivo da Troca Está Muito Grande, Abrevie!');
          }
          return motivo;
        },
      });
  
      if (motivo) {
        setMotivoTroca(motivo);
  
        // Exibe o próximo modal para o CPF
        const { value: cpf } = await Swal.fire({
          title: 'Insira o CPF ou CNPJ do cliente',
          html: `
            <div>
              <input 
                type="text" 
                id="cpf" 
                class="swal2-input" 
                placeholder="Digite o CPF/CNPJ"  
                style="text-align: center;"
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              >
            </div>      
          `,
          width: '25rem',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Sair',
          didOpen: () => {
            const swalContainer = Swal.getPopup();
            swalContainer.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                Swal.clickConfirm();
              }
            });
          },
          // validarCPF
          preConfirm: () => {
            const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
            
            if (cpf?.length) {
             
              if(cpf?.length <= 11 && !validarCPF(cpf)) {

                mascaraCPF(cpf)
                Swal.showValidationMessage('CPF Inválido, verifique o CPF digitado e tente novamente');
              }
           
              if(cpf?.length > 11 && !validarCNPJ(cpf)) {

                mascaraCNPJ(cpf)
                Swal.showValidationMessage('CNPJ Inválido, verifique o CNPJ digitado e tente novamente');
              }
            }
            return cpf;
          },
        });
  
        if (cpf) {
          try {
            // Faz o GET na API para buscar os dados do cliente
            const response = await get(`/cliente-todos?numeroCpfCnpj=${cpf}`);
            if (!response.ok) {
              throw new Error('Erro ao buscar os dados do cliente');
            }
            const clienteData = await response.json();
  
            // Atualiza o estado com os dados do cliente
            setUsuarioAutorizado({ motivo, cpf, clienteData });
            setIsLoggedIn(true);
  
            // Executa o callback
            callback();
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: `Erro ao buscar os dados do cliente: ${error.message}`,
            });
          }
        }
      }
    }
  };

  return { onAuthFuncionarioCreate, isLoggedIn, usuarioAutorizado };
};