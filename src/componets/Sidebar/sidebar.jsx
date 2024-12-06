import React, { Fragment, useEffect, useState } from 'react';
import { useSidebar } from './SidebarContext';
import { FaAngleDown } from "react-icons/fa";
import { useAuth } from '../../Providers/AuthContext';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

export const MenuSidebarAdmin = ({componentToShow, handleShowComponent }) => {
  const storedModule = localStorage.getItem('moduloselecionado');
  const selectedModule = JSON.parse(storedModule);
  const [activeLink, setActiveLink] = useState('');
  const { sidebarOpen, toggleSidebar } = useSidebar();


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


  const handleClick = (componentName) => {
    setActiveLink(componentName);
    handleShowComponent(componentName);

  };

  const renderSideBarItems = () => {
    const administrativoUser = selectedModule;
    if (administrativoUser) {
      const sideBarContents = administrativoUser.sideBar;
      
      
      if (sideBarContents && sideBarContents.length > 0) {
        
        return (
          <ul id="js-nav-menu" className="nav-menu">
            {sideBarContents.map((sidebarItem, index) => {
         
              if (!sidebarItem.url) {
                return null
              }
              return (
                <>
              
                  <li key={index} className={activeLink === sidebarItem.url ? "active" : ""} >
                    {/* <a href={'#'} onClick={() => handleClick(sidebarItem.url)}> */}
                    <a href="#" onClick={() => handleClick(sidebarItem.url)}>
                      {/* <img className='fal fa-info-circle' src={sidebarItem.icons} alt='' /> */}

                      <span className="nav-link-text">
                        {sidebarItem.linkText}
                      </span>

                    </a>
                  </li>
                </>

              )
            })}
          </ul>
        );
      } else {
        return <p>Sem conteúdo na sidebar para o usuário Administrativo.</p>;
      }
    } else {
      return <p>Usuário Administrativo não encontrado.</p>;
    }
  };

  // const renderSideBarItems = () => {
  //   const administrativoUser = selectedModule;
  //   if (administrativoUser) {
  //     const sideBarContents = administrativoUser;
           
  //     if (sideBarContents && sideBarContents.length > 0) {  
  //       return (
  //         <ul id="js-nav-menu" className="nav-menu">
  //           {sideBarContents.map((sidebarItem, index) => {
         
  //             if (!sidebarItem.URL) {
  //               return null
  //             }
  //             return (
  //               <>
              
  //                 <li key={index} className={activeLink === sidebarItem.URL ? "active" : ""} >
  //                   <a href="#" onClick={() => handleClick(sidebarItem.URL)}>
  //                     {/* <img className='fal fa-info-circle' src={sidebarItem.icons} alt='' /> */}

  //                     <span className="nav-link-text">
  //                       {/* {console.log(sidebarItem)} */}
  //                       {sidebarItem.DSNOME}
  //                     </span>

  //                   </a>
  //                 </li>
  //               </>

  //             )
  //           })}
  //         </ul>
  //       );
  //     } else {
  //       return <p>Sem conteúdo na sidebar para o usuário Administrativo.</p>;
  //     }
  //   } else {
  //     return <p>Usuário Administrativo não encontrado.</p>;
  //   }
  // };

  return (
    <Fragment>
      
      <aside className={`page-sidebar ${sidebarOpen ? 'sidebar' : ''}`}>
  
  
        <div className="page-logo" style={{justifyContent: 'space-around'}} >
          <a href="#" className="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
            {/* <img src="img/logo.png" alt="SoftQuality SAP" aria-roledescription="logo SoftQuality" /> */}
            <span className="page-logo-text mr-1">SoftQuality SAP </span>
            {/* <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span> */}
            {/* <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i> */}
            {/* <FaAngleDown className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300" size={0} colo="#fff" />  */}
          </a>

            {sidebarOpen ? (
              <Fragment>

                <button 
                  onClick={toggleSidebar} 
                  className="header-btn btn js-waves-off" 
                  data-action="toggle" 
                  data-className="nav-function-hidden"
                  style={{backgroundColor: '#fff'}}
                >
                  <AiOutlineMenuFold 
                    color={"#5d4286"}
                    
                    size={20} 
                  />
                </button>
              </Fragment>
              // <AiOutlineMenuUnfold className="fal fa-angle-down color-primary-300" size={40} />
            ) : (
              <Fragment>

                <button 
                  onClick={toggleSidebar} 
                  className="header-btn btn js-waves-off" 
                  data-action="toggle" 
                  data-className="nav-function-hidden"
                  style={{backgroundColor: '#fff'}}
                >
                  <AiOutlineMenuUnfold color={"#5d4286"}  size={20} />
                </button>
              </Fragment>
              // <AiOutlineMenuFold className="fal fa-angle-up color-primary-300" size={40} />
            )}
        </div>
  
        <nav id="js-primary-nav" className="primary-nav" role="navigation">
          {/* Restante do código... */}
  
          <div class="nav-filter">
            <div class="position-relative">
              <input type="text" id="nav_filter_input" placeholder="Filter menu" class="form-control" tabindex="0" />
              <a href="#" onclick="return false;" class="btn-primary btn-search-close js-waves-off" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar">
              <FaAngleDown size={25} color='#00ff' />
              </a>
             
          
            </div>
            
          </div>
          
          <div class="info-card">
            
            <img src="img/demo/avatars/avatar-admin.png" class="profile-image rounded-circle" alt="" />
            <div class="info-card-text">
              <a href="#" class="d-flex align-items-center text-white">
                <span class="text-truncate-lg d-inline-block NoFuncionarioTitulo">
                {usuarioLogado?.NOFUNCIONARIO}
                </span>
              </a>
              <span class="d-inline-block text-truncate-lg NoEmpresaTitulo">
                {usuarioLogado?.NOFANTASIA}
              </span>
            </div>
            <img src="img/card-backgrounds/cover-2-lg.png" class="cover" alt="cover" />
            <a href="#" onclick="return false;" class="pull-trigger-btn" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar" data-focus="nav_filter_input">
            <FaAngleDown size={15} color='#fff' />
            </a>
          </div>
  
  
          {renderSideBarItems()}
          <div className="filter-message js-filter-message bg-success-600"></div>
        </nav>
      </aside>
    </Fragment>


  );
};