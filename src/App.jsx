import React, { useEffect, useState } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { RoutesMain } from './routes/Routes';
import { DashBoardPromocao } from './pages/DashBoardPromocao';

function App() {
  const [componentToShow, setComponentToShow] = useState("");
    const [usuarioLogado, setUsuarioLogado] = useState(null);
  
    useEffect(() => {
      const usuarioArmazenado = localStorage.getItem('usuario');
      if (usuarioArmazenado) {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
      }
    }, []);
  
    useEffect(() => {
  
    }, [usuarioLogado]);
  
   
  
    const handleShowComponent = (componentName) => {
      setComponentToShow(componentName);
    };
  return (
    <DashBoardPromocao componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} />
  )
}

export default App;