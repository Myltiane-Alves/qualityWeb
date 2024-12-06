import React, { Fragment, useEffect, useState, lazy, Suspense } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import AuthProvider from './Providers/AuthContext';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Modulo } from './pages/Modulo';
import { DashBoardAdministrativo } from './pages/DashBoardAdministrativo';
import { DashBoardFinanceiro } from './pages/DashBoardFinanceiro';
import { DashBoardCadastro } from './pages/DashBoardCadastro';
import { DashBoardComercial } from './pages/DashBoardComercial';
import { DashBoardCompras } from './pages/DashBoardCompras';
import { DashBoardConferenciaCega } from './pages/DashBoardConferenciaCega';
import { DashBoardContabilidade } from './pages/DashBoardContabilidade';
import { DashBoardExpedicao } from './pages/DashBoardExpedicao';
import { DashBoardGerencia } from './pages/DashBoardGerencia';
import { DashBoardInformatica } from './pages/DashBoardInformatica';
import { DashBoardRecursosHumanos } from './pages/DashBoardRecursosHumanos';
import { DashBoardMarketing } from './pages/DashBoardMarketing';
import { DashBoardComprasDM } from './pages/DashBoardComprasDm';
import { DashBoardEtiquetagem } from './pages/DashBoardEtiquetagem';
import { DashBoardVoucher } from './pages/DashBoardVoucher';
import { ModuloTeste } from './pages/ModuloTeste';

// const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
// const Modulo = lazy(() => import('./pages/Modulo').then(module => ({ default: module.Modulo })));
// const DashBoardFinanceiro = lazy(() => import('./pages/DashBoardFinanceiro').then(module => ({ default: module.DashBoardFinanceiro })));
// const DashBoardAdministrativo = lazy(() => import('./pages/DashBoardAdministrativo').then(module => ({ default: module.DashBoardAdministrativo })));
// const DashBoardCadastro = lazy(() => import('./pages/DashBoardCadastro').then(module => ({ default: module.DashBoardCadastro })));
// const DashBoardComercial = lazy(() => import('./pages/DashBoardComercial').then(module => ({ default: module.DashBoardComercial })));
// const DashBoardCompras = lazy(() => import('./pages/DashBoardCompras').then(module => ({ default: module.DashBoardCompras })));
// const DashBoardConferenciaCega = lazy(() => import('./pages/DashBoardConferenciaCega').then(module => ({ default: module.DashBoardConferenciaCega })));
// const DashBoardContabilidade = lazy(() => import('./pages/DashBoardContabilidade').then(module => ({ default: module.DashBoardContabilidade })));
// const DashBoardExpedicao = lazy(() => import('./pages/DashBoardExpedicao').then(module => ({ default: module.DashBoardExpedicao })));
// const DashBoardGerencia = lazy(() => import('./pages/DashBoardGerencia').then(module => ({ default: module.DashBoardGerencia })));
// const DashBoardInformatica = lazy(() => import('./pages/DashBoardInformatica').then(module => ({ default: module.DashBoardInformatica })));
// const DashBoardMarketing = lazy(() => import('./pages/DashBoardMarketing').then(module => ({ default: module.DashBoardMarketing })));
// const DashBoardComprasDM = lazy(() => import('./pages/DashBoardComprasDm').then(module => ({ default: module.DashBoardComprasDM })));
// const DashBoardEtiquetagem = lazy(() => import('./pages/DashBoardEtiquetagem').then(module => ({ default: module.DashBoardEtiquetagem })));

function App() {
  const [componentToShow, setComponentToShow] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);


  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      const parsedUsuario = JSON.parse(usuarioArmazenado);
      setUsuarioLogado(parsedUsuario);
    }
  }, [])

  useEffect(() => {

  }, [usuarioLogado])

  function handleShowComponent(componentName) {
    setComponentToShow(componentName);
  }


  return (
    <>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modulo" element={usuarioLogado ? <Modulo /> : <Navigate to="/" />} />
        <Route path="/FINANCEIRO" element={<DashBoardFinanceiro componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/ADMINISTRATIVO" element={<DashBoardAdministrativo componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/GERENCIA" element={<DashBoardGerencia componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/INFORMATICA" element={<DashBoardInformatica componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/RECURSOSHUMANOS" element={<DashBoardRecursosHumanos componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/MARKETING" element={<DashBoardMarketing componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/DashBoardContabilidade" element={<DashBoardContabilidade componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/Vouchers" element={<DashBoardVoucher componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />


        <Route path="/DashBoardExpedicao" element={<DashBoardExpedicao componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/DashBoardConferenciaCega" element={<DashBoardConferenciaCega componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />
        <Route path="/DashBoardCadastro" element={<DashBoardCadastro componentToShow={componentToShow} handleShowComponent={handleShowComponent} />} />

        {/* 
              <Route path="/DashBoardComercial" element={  <DashBoardComercial componentToShow={componentToShow} handleShowComponent={handleShowComponent} />  } />
              <Route path="/DashBoardCompras" element={  <DashBoardCompras componentToShow={componentToShow} handleShowComponent={handleShowComponent} />  } />
              <Route path="/DashBoardComprasDM" element={  <DashBoardComprasDM componentToShow={componentToShow} handleShowComponent={handleShowComponent} />  } />
              <Route path="/DashBoardEtiquetagem" element={ <DashBoardEtiquetagem componentToShow={componentToShow} handleShowComponent={handleShowComponent} />  } />
               */}
      </Routes>




    </>

  )
}

export default App;
