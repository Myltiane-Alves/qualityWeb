import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/funcRequest';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  // Recupera usuário do localStorage ao carregar a aplicação
  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioObj = JSON.parse(usuarioStorage);
      setUsuario(usuarioObj.NOFUNCIONARIO || '');
    }
    setLoading(false);
  }, []);

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    const data = {
      usuario: usuario,
      senha: senha,
    };

    try {
      const response = await post('/login2', data);

      if (response && response.token) {
        localStorage.clear();
        localStorage.setItem('token', response?.token);
        localStorage.setItem('usuario', JSON.stringify(response));
        setUsuario(response.NOFUNCIONARIO);
        setSenha('');
        navigate('/modulo', { replace: true });
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario('');
    setSenha('');
    // Verifica e mostra no console se o token foi removido
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token removido do localStorage com sucesso.');
    } else {
      console.log('Token ainda existe no localStorage:', token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        senha,
        loading,
        handleSenhaChange,
        handleUsuarioChange,
        loginSubmit,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}