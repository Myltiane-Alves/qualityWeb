// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { get, post } from '../../api/funcRequest';
// import { allModulos } from '../../../allUsers.json';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();
//   const [empresaUsuario, setEmpresaUsuario] = useState([]);
//   const [usuario, setUsuario] = useState('');
//   const [user, setUser] = useState('');
//   const [modulo, setModulo] = useState('');
//   const [moduloSelecionado, setModuloSelecionado] = useState('');
//   const [senha, setSenha] = useState('');
//   const [empresaSelecionada, setEmpresaSelecionada] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedRedirect, setSelectedRedirect] = useState('');

//   const handleSenhaChange = (e) => {
//     setSenha(e.target.value);
//   };

//   const handleUsuarioChange = (e) => {
//     setUsuario(e.target.value);
//   }

//   const handleModuloChange = (e) => {
//     const selectedValue = e.target.value;
//     setSelectedRedirect(selectedValue);
//     setModuloSelecionado(selectedValue);
//   };

//   const loginSubmit = async () => {
//     const data = {
//       usuario: usuario,
//       senha: senha,
//       modulo: moduloSelecionado,
//       empusuario: empresaSelecionada,
//     };

//     try {
//       const response = await post('/login', data);

//       if (response && response.user && response.user.token) {
//         const token = response.user.token;
//         localStorage.setItem('token', token);
//         navigate('/modulo');
//         console.log(navigate('/modulo'));
//         const selectedModule = allModulos.find((module) => module.id === parseInt(selectedRedirect));
//         localStorage.setItem('selectedModule', JSON.stringify(selectedModule));
//         if (selectedModule) {
 
//           navigate(selectedModule.name, { state: { selectedModule } });
//         }
//         localStorage.setItem('usuario', JSON.stringify(response.user));
//         setUsuario(response.user);
       
//       }
    
//       return response.user;
//     } catch (error) {
//       console.log(error);
//     }
    

//   };

//   const handleLogout = () => {
    
//     localStorage.removeItem('token');
//     localStorage.removeItem('usuario');
//     localStorage.removeItem('selectedModule');
//     navigate('/');
//   };

  
//   return (
//     <AuthContext.Provider
//       value={{
//         empresaUsuario,
//         usuario,
//         modulo,
//         moduloSelecionado,
//         senha,
//         empresaSelecionada,
//         loading,
//         selectedRedirect,
//         handleSenhaChange,
//         handleModuloChange,
//         handleUsuarioChange,
//         loginSubmit,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export default AuthProvider;


// export const useAuth = () => {
//   const context = useContext(AuthContext);
  
//   if (!context) {
//     throw new Error('useAuth deve ser usado dentro de um AuthProvider');
//   }
  
//   return context;
// }


import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/funcRequest';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [empresaUsuario, setEmpresaUsuario] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [loading, setLoading] = useState(true);
  const [modulo, setModulo] = useState('')

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const loginSubmit = async () => {
    const data = {
      usuario: usuario,
      senha: senha,
      empusuario: empresaSelecionada,
      modulo: modulo
    };

    try {
      const response = await post('/login', data);

      if (response && response.user && response.user.token) {
        const token = response.user.token;
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(response.user));
        setUsuario(response.user);
        navigate('/modulo');
      }

      return response.user;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        empresaUsuario,
        usuario,
        senha,
        empresaSelecionada,
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
