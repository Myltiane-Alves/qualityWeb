import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthContext";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CardModulos } from "../componets/CardsModulos";
import { useQuery } from "react-query";
import { get } from "../api/funcRequest";


export const ModuloTeste = ({ usuarioLogado}) => {
  const { handleLogout, usuario } = useAuth();
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduloSelecionado, setModuloSelecionado] = useState(null);

  const navigate = useNavigate();


    const { data: optionsModulos = [], error: errorFuncionarios, isLoading: isLoadingFuncionarios, refetch: refetchFuncionarios } = useQuery(
      'menus-usuario',
      async () => {
        const response = await get(`/menus-usuario?idUsuario=${usuarioLogado?.id}`);
        
        return response.data;
      },
      { enabled: Boolean(usuarioLogado?.id), staleTime: 5 * 60 * 1000, }
    );
  
  
  useEffect(() => {
    const storedModule = JSON.parse(localStorage.getItem('moduloselecionado'));
    if (storedModule) {
      setSelectedModule(storedModule);
    }
  }, [usuarioLogado, navigate]);

  // const selecioneModulo = (event, moduloURL) => {
  //   event.preventDefault();
    
  //   const modulos = optionsModulos[0]?.modulos || [];
  //   const moduloEncontrado = modulos.find((modulo) => {
  //     console.log(modulo.DSMODULO, 'modulo');
  //     return modulo.DSMODULO === moduloURL; 
  //   });

    
  //   if (moduloEncontrado) {
  //     localStorage.setItem('moduloselecionado', JSON.stringify(moduloEncontrado));
  //     console.log(moduloEncontrado, 'moduloEncontrado')
  //     setSelectedModule(moduloEncontrado);
  //     setModuloSelecionado(moduloEncontrado);
  //     navigate(moduloEncontrado.DSMODULO);
  //     window.history.replaceState({}, document.title, window.location.pathname);
      
  //   }
  // };
  

  const selecioneModulo = (event, moduloURL) => {
    event.preventDefault();
    
    const modulos = optionsModulos[0]?.modulos || [];
    const moduloEncontrado = modulos.find(modulo => modulo.DSMODULO === moduloURL);

    if (moduloEncontrado) {
      localStorage.setItem('moduloselecionado', JSON.stringify(moduloEncontrado));
      setSelectedModule(moduloEncontrado);
      setModuloSelecionado(moduloEncontrado);
      navigate(`/${moduloEncontrado.DSMODULO}`);
    }
  };

  // console.log(optionsModulos, 'optionsModulos')
  const modulosDisponiveis = optionsModulos[0]?.modulos || [];
  useEffect(() => {
    if (moduloSelecionado) {
      refetchMenus();
    }
  }, [moduloSelecionado]);
  // console.log(modulosDisponiveis, 'modulosDisponiveis')

  
  const imageMap = {
    1: '../../public/img/icons/administrativo.png',
    2: '../../public/img/icons/gerencia.png',
    3: '../../public/img/icons/informatica.png',
    4: '../../public/img/icons/financeiro.png',
    5: '../../public/img/icons/comercial.png',
    6: '../../public/img/icons/compras.png',
    7: '../../public/img/icons/contabilidade.png',
    8: '../../public/img/icons/marketing.png',
    9: '../../public/img/icons/rh.png',
    10: '../../public/img/icons/compras.png',
    11: '../../public/img/icons/expedicao.png',
    12: '../../public/img/icons/conferenciaCega.png',
    13: '../../public/img/icons/cadastro.png',
    14: '../../public/img/icons/etiqueta.png',
    15: '../../public/img/icons/resumoVendas.png',
    16: '../../public/img/icons/voucher.png',
    17: '../../public/img/icons/malote.png',
    18: '../../public/img/icons/permissoes.png',
    19: '../../public/img/icons/promocao.png',

  };


  const isModuleSelected = selectedModule && window.location.pathname === selectedModule.DSMODULO;

  return (
    <Fragment>
      <main className="page-content page-inner bg-brand-gradient overflow-hidden" style={{ overflow: "hidden" }}>
        <div className="row mt-4">
          <div className="col-lg-6 col-xl-6 order-lg-1 order-xl-1 mt-6">
            <div className="mb-g rounded-top">
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="text-center">
                    <h1 className="mb-0" style={{ color: "#fff", fontWeight: 600, lineHeight: "25px", letterSpacing: "1px" }}>
                      Seja Bem-Vindo ao
                    </h1>
                  </div>
                  <div className="text-center py-3 d-flex justify-content-center">
                    <a href="javascript:void(0)" className="page-logo-link press-scale-down d-flex align-items-center">
                      <img src="img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo" />
                      <span className="page-logo-text mr-1">Softquality SAP</span>
                    </a>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex flex-column align-items-center justify-content-center p-4">
                    <img src="img/demo/avatars/avatar-m.png" className="rounded-circle shadow-2 img-thumbnail" alt="" />
                    <h5 className="mb-0 text-center mt-3" style={{ color: "#fff", fontWeight: 600, lineHeight: "25px", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {usuarioLogado?.NOFUNCIONARIO}
                      <small className="text-muted mb-0">{usuarioLogado?.NOFANTASIA}</small>
                    </h5>
                  </div>
                </div>
                <div className="col-12">
                  <h3 style={{ color: "#fff", textAlign: 'center' }}>
                    Software de Gestão Unificada <br />
                    Sistema de Gerenciamento e Controle integrado com o ERP SAP.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-6 order-lg-1 order-xl-1">
            <div className="mb-g">
              <div className="row">
                <div className="m-2">
                  <div className="text-left">
                    <a href="/" onClick={handleLogout} className="btn font-weight-bold" style={{ color: "#fff", fontSize: "22px" }}>
                      <IoMdArrowBack size={40} />
                    </a>
                  </div>
                </div>
                <div className="">
                  <div className="p-3">
                    <h1 className="mb-0" style={{ color: "#fff", fontSize: "32px" }}>
                      Selecione o Modulo
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
              {modulosDisponiveis.map((modulo) => (
                <Fragment key={modulo.id}>
                
                  <CardModulos
                    src={imageMap[modulo.ID] || 'path/to/default-image.png'}
                    alt={modulo.alt}
                    nome={modulo.DSMODULO}
                    isSelected={isModuleSelected && modulo.url === selectedModule.url}
                    handleClick={(event) => selecioneModulo(event, modulo.DSMODULO)}
                  />
                </Fragment>
              ))}
              </div>
          
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};