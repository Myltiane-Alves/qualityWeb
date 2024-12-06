import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoardAdministrativo } from "../pages/DashBoardAdministrativo";
import { DashBoardCadastro } from "../pages/DashBoardCadastro";
import { DashBoardComercial } from "../pages/DashBoardComercial";
import { DashBoardCompras } from "../pages/DashBoardCompras";
import { DashBoardConferenciaCega } from "../pages/DashBoardConferenciaCega";
import { DashBoardContabilidade } from "../pages/DashBoardContabilidade";
import { DashBoardExpedicao } from "../pages/DashBoardExpedicao";
import { DashBoardFinanceiro } from "../pages/DashBoardFinanceiro";
import { DashBoardGerencia } from "../pages/DashBoardGerencia";
import { DashBoardInformatica } from "../pages/DashBoardInformatica";
import { DashBoardMarketing } from "../pages/DashBoardMarketing";
import { Fragment, useEffect, useState } from "react";
import AuthProvider from "../Providers/AuthContext";
import { Home } from "../pages/Home";
import { Modulo } from "../pages/Modulo";
import { DashBoardComprasDM } from "../pages/DashBoardComprasDm";
import { DashBoardEtiquetagem } from "../pages/DashBoardEtiquetagem";

import { SidebarProviderCopia } from "../componets/Sidebar/SidebarContextCopia";
import PrivateRoute from "./PrivateRoute";


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
    console.log(usuarioLogado, 'routes.jsx');
  }, [usuarioLogado]);

  const handleShowComponent = (componentName) => {
    setComponentToShow(componentName);
    console.log(componentToShow, 'routes.jsx');
  };

  return (
    <Fragment>

      <BrowserRouter>
        <Routes>
          <Routes path="/" element={<Home />  } />
          <Route path="/Administrativo" 
            element={
              <PrivateRoute> 
                <DashBoardAdministrativo componentToShow={componentToShow} handleShowComponent={handleShowComponent} />
              </PrivateRoute>
            }
          />
          <Route path="/Cadastro" element={<DashBoardCadastro componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Comercial" element={<DashBoardComercial componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Compras" element={<DashBoardCompras componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/ComprasDM" element={<DashBoardComprasDM componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Etiquetagem" element={<DashBoardEtiquetagem componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/ConferenciaCega" element={<DashBoardConferenciaCega componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Contabilidade" element={<DashBoardContabilidade componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Expedicao" element={<DashBoardExpedicao componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Financeiro" element={<DashBoardFinanceiro componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Informatica" element={<DashBoardInformatica componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Gerencia" element={<DashBoardGerencia componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
          <Route path="/Marketing" element={<DashBoardMarketing componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
    
  );
};
