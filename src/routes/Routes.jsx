import { Routes, Route, Navigate } from "react-router-dom";
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
import { useQuery } from "react-query";
import { get } from "../api/funcRequest";
import { DashBoardMalotes } from "../pages/DashBoardMalotes";
import { DashBoardVoucher } from "../pages/DashBoardVoucher";
import { DashBoardPromocao } from "../pages/DashBoardPromocao";
import { Permissoes } from "../pages/Permissoes";
import { ModuloTeste } from "../pages/ModuloTeste";
import { DashBoardRecursosHumanos } from "../pages/DashBoardRecursosHumanos";
import { DashBoardResumoVendas } from "../pages/DashBoardResumoVendas";


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
        
        {/* <Route path="/" element={<Home />} />
        <Route path="/modulo" element={usuarioLogado ? <ModuloTeste usuarioLogado={usuarioLogado}  /> : <Navigate to="/"  />} />
        <Route path="/DashBoardPermissoes" element={usuarioLogado ? <Permissoes usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardFinanceiro" element={usuarioLogado ? <DashBoardFinanceiro componentToShow={componentToShow} handleShowComponent={handleShowComponent}  usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardAdministrativo" element={usuarioLogado ? <DashBoardAdministrativo componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>} />
        <Route path="/DashBoardGerencia" element={<DashBoardGerencia componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> } />
        <Route path="/DashBoardInformatica" element={usuarioLogado ? <DashBoardInformatica componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado}  /> : <Navigate to="/"/> } />
        <Route path="/DashBoardRecursosHumanos" element={usuarioLogado ? <DashBoardRecursosHumanos componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardContabilidade" element={usuarioLogado ? <DashBoardContabilidade componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>} />
        <Route path="/DashBoardMarketing" element={usuarioLogado ? <DashBoardMarketing componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>} />
        <Route path="/DashBoardMalotes" element={usuarioLogado ? <DashBoardMalotes componentToShow={componentToShow} handleShowComponent={handleShowComponent}  usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        
        <Route path="/DashBoardVouchers" element={usuarioLogado ? <DashBoardVoucher componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>} /> */}
        {/* <Route path="/DashBoardPromocao" element={usuarioLogado ? <DashBoardPromocao componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>}  /> */}


        {/* <Route path="/DashBoardExpedicao" element={usuarioLogado ? <DashBoardExpedicao componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardConferenciaCega" element={usuarioLogado ? <DashBoardConferenciaCega componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>} />
        <Route path="/DashBoardCadastro" element={usuarioLogado ? <DashBoardCadastro componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/>} />
        <Route path="/DashBoardCompras" element={usuarioLogado ? <DashBoardCompras componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/ResumoVendas" element={usuarioLogado ? <DashBoardResumoVendas componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardComprasDM" element={usuarioLogado ? <DashBoardComprasDM componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardComercial" element={usuarioLogado ? <DashBoardComercial componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } />
        <Route path="/DashBoardEtiquetagem" element={usuarioLogado ? <DashBoardEtiquetagem componentToShow={componentToShow} handleShowComponent={handleShowComponent} usuarioLogado={usuarioLogado} /> : <Navigate to="/"/> } /> */}

      </Routes>
  );
};