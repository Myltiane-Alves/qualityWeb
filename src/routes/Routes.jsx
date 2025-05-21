import { Routes, Route,  } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashBoardPromocao } from "../pages/DashBoardPromocao";



export const RoutesMain = () => {
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
      <Routes>
        <Route path="/" element={<DashBoardPromocao componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> }  />
      </Routes>
  );
};