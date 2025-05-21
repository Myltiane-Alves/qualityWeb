import React, { Fragment, useEffect, useState } from "react"
import { useAuth } from "../Providers/AuthContext";;
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { get } from "../api/funcRequest";
import { useQuery } from "react-query";
import Select from 'react-select';
import { InputListaMenus } from "../componets/ActionPermissoes/inputListaMenus";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../utils/animationCarregamento";
import { ButtonType } from "../componets/Buttons/ButtonType";
import { FaRegSave } from "react-icons/fa";
// import { Funcoes } from '../../funcoes.json';
import { TreeSelect } from 'primereact/treeselect';
import { NodeService } from "../../funcoes";
import { useEditarPermissaoUsuario } from "../componets/ActionPermissoes/hooks/useEditarPermissaoUsuario";
import { useForm } from "react-hook-form";

export const Permissoes = ({}) => {
    const {
        moduloSelecionado,
        setModuloSelecionado,
        funcionarioSelecionado,
        setFuncionarioSelecionado,
        menuPaiSelecionado,
        setMenuPaiSelecionado,
        menuFilhoSelecionado,
        setMenuFilhoSelecionado,
        funcaoSelecionada,
        setFuncaoSelecionada,
        alterar,
        setAlterar,
        criar,
        setCriar,
        nivel1,
        setNivel1,
        nivel2,
        setNivel2,
        nivel3,
        setNivel3,
        nivel4,
        setNivel4,
        administrador,
        setAdministrador,
        usuarioLogado,
        handleSubmit
    } = useEditarPermissaoUsuario();

    const [menuVisivel, setMenuVisivel] = useState(false)
    const [menusPermitidos, setMenusPermitidos] = useState([moduloSelecionado]);
    const [moduloSelecionadoObj, setModuloSelecionadoObj] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1000);
    const navigate = useNavigate();


    const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
        'menus-usuario',
        async () => {
            const response = await get(`/menus-usuario?idUsuario=${usuarioLogado?.id}`);

            return response.data;
        },
        { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000,}
        // { enabled: Boolean(usuarioLogado?.id), staleTime: Infinity, cacheTime: Infinity, }
    );


    useEffect(() => {
        if (moduloSelecionado) {
            const modulo = optionsModulos[0]?.modulos.find((item) => item.ID === moduloSelecionado);
            setModuloSelecionadoObj(modulo || null);
            setMenusPermitidos(modulo?.menuPai?.menuFilho || []); // Atualiza os menus permitidos
            setMenuPaiSelecionado(modulo?.menuPai?.IDMENU); // Atualiza os menus permitidos

            const menuFilhoIds = modulo?.menuPai?.menuFilho?.map((menu) => menu.ID) || [];
            setMenuFilhoSelecionado(menuFilhoIds);
            setMenuVisivel(true);
        } else {
            setMenuVisivel(false);
        }
    }, [moduloSelecionado, optionsModulos]);

    const fetchListaFuncionarios = async () => {
        try {
            const urlApi = `/funcionarios-loja-ativos?`;
            const response = await get(urlApi);

            if (response.data.length && response.data.length === pageSize) {

                let allData = [...response.data];
                animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);

                async function fetchNextPage(currentPage) {
                    try {
                        currentPage++;
                        const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
                        if (responseNextPage.data.length) {
                            allData.push(...responseNextPage.data);
                            return fetchNextPage(currentPage);
                        } else {
                            return allData;
                        }
                    } catch (error) {
                        console.error('Erro ao buscar próxima página:', error);
                        throw error;
                    }
                }

                await fetchNextPage(currentPage);
                return allData;
            } else {

                return response.data;
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            throw error;
        } finally {
            fecharAnimacaoCarregamento();
        }
    };

    const { data: dadosFuncionarios = [], error: errorFuncionario, isLoading: isLoadingFuncionario } = useQuery(
        ['funcionarios-loja-ativos'],
        () => fetchListaFuncionarios(),
        {
            enabled: Boolean(usuarioLogado?.id), staleTime: Infinity, cacheTime: Infinity,
        }
    );

    return (

        <Fragment>

            <main className="page-content page-inner bg-brand-gradient overflow-hidden" style={{ overflow: "hidden" }}>
                {/* <main className="page-content page-inner bg-brand-gradient overflow-hidden" style={{ overflow: "hidden" }}> */}
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: '2rem 0rem 4rem 0rem' }} className="">
                        <div className="text-center">

                            <h1 className=" " style={{ color: "#fff", fontWeight: 600 }}>
                                Modulo Permissões de Acesso Usuário
                            </h1>
                        </div>
                        <div className="text-center py-3 d-flex justify-content-center">
                            <a href="javascript:void(0)" className="page-logo-link press-scale-down d-flex align-items-center" >
                                <img src="img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo" />
                                <span className="page-logo-text mr-1">Softquality </span>
                            </a>
                        </div>
                    </div>

                    <div className="row" >
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 " style={{ marginTop: "20px" }}>
                            <div className="row">

                                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                    <div style={{ width: '100%' }} className="mb-2 ">

                                        <label style={{ color: '#fff', fontSize: '1.5rem' }} htmlFor="">Selecione um Módulo</label>
                                    </div>

                                    <Select
                                        options={[
                                            { value: '', label: 'Selecione...' },
                                            ...(Array.isArray(optionsModulos[0]?.modulos)
                                                ? optionsModulos[0].modulos.map((item) => ({
                                                    value: item.ID,
                                                    label: `${item.NOME}`,
                                                }))
                                                : [])
                                        ]}
                                        value={moduloSelecionado ? { value: moduloSelecionado, label: moduloSelecionadoObj?.NOME } : null}
                                        onChange={(e) => {
                                            setModuloSelecionado(e.value);
                                            // setModuloSelecionadoObj(nodes.find((node) => node.moduloId === e.value) || null);
                                        }}
                                    />
                                </div>

                                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6  ">
                                    <div style={{ width: '100%' }} className="mb-2 ">

                                        <label style={{ color: '#fff', fontSize: '1.5rem' }} htmlFor="">Selecione um Funcionário</label>
                                    </div>

                                    <Select
                                        options={dadosFuncionarios?.map((item) => ({
                                            value: item.ID,
                                            label: item.NOFUNCIONARIO
                                        }))}
                                        value={funcionarioSelecionado}
                                        onChange={(e) => setFuncionarioSelecionado(e)}
                                    />
                                </div>

                                {/* <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                    <div style={{ width: '100%' }} className="mb-2 ">

                                        <label style={{ color: '#fff', fontSize: '1.5rem' }} htmlFor="">Selecione uma Função</label>
                                    </div>

                                    <div className="card flex justify-content-center">
                                        <TreeSelect 
                                            value={funcaoSelecionada} 
                                            onChange={(e) => setFuncaoSelecionada(e.value)} 
                                            options={filteredNodes}
                                            metaKeySelection={false} 
                                            className="md:w-20rem w-full"
                                            selectionMode="checkbox" 
                                            display="chip" 
                                            placeholder="Select Items"
                                        >
                                            Selecione
                                            </TreeSelect>
                                    </div> 
                                </div> */}



                            </div>

                            <div className="row mt-6">



                                <div style={{ marginTop: '2rem' }} className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <head style={{ display: 'block' }}>
                                        <h3 style={{ color: '#fff' }}>Nível de Permissão do Módulo</h3>

                                    </head>
                                    <div className="form-group form-check" style={{ justifyContent: 'center', marginTop: '2rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={administrador == 'True'}
                                            onChange={(e) => setAdministrador(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block " htmlFor="">Administrador</label>
                                    </div>
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            checked={nivel1 == 'True'}
                                            onChange={(e) => setNivel1(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block " htmlFor="">Nível Permissão 1</label>
                                    </div>
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            checked={nivel2 == 'True'}
                                            onChange={(e) => setNivel2(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block " htmlFor="">Nível Permissão 2</label>
                                    </div>
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            checked={nivel3 == 'True'}
                                            onChange={(e) => setNivel3(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block " htmlFor="">Nível Permissão 3</label>
                                    </div>
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            checked={nivel4 == 'True'}
                                            onChange={(e) => setNivel4(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block " htmlFor="">Nível Permissão 4</label>
                                    </div>

                                </div>

                                <div style={{ marginTop: '2rem' }} className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <head style={{ display: 'block' }}>
                                        <h2 style={{ color: '#fff' }}>Tipo de Permissão do Usuário</h2>

                                    </head>
                                    <div className="form-group form-check" style={{ justifyContent: 'center', marginTop: '2rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={alterar == 'True'}
                                            onChange={(e) => setAlterar(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block " htmlFor="">Permissão Para Alterar</label>
                                    </div>
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            checked={criar === 'True'}
                                            onChange={(e) => setCriar(e.target.checked ? 'True' : 'False')}
                                            className="form-check-input"
                                        />
                                        <label style={{ color: '#fff', fontSize: '1rem' }} className="form-check-label d-inline-block" htmlFor="">
                                            Permissão Para Criar
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {menuVisivel && (

                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 " >
                                <head style={{ display: 'block', textAlign: 'center' }}>

                                    <span style={{ color: '#000', fontSize: '28px', fontWeight: 600 }} className="text-center">{`MENU:`}</span>
                                    <span style={{ color: '#fff', fontSize: '32px', textTransform: 'uppercase' }} className="text-center h6 fw-600">{` ${moduloSelecionadoObj?.NOME || ''}`}</span>

                                </head>


                                <InputListaMenus
                                    menusPermitidos={menusPermitidos}
                                    moduloSelecionadoObj={moduloSelecionadoObj}
                                    menuFilhoSelecionado={menuFilhoSelecionado}
                                    setMenuFilhoSelecionado={setMenuFilhoSelecionado}
                                />

                                <div className="row ">

                                    <ButtonType
                                        textButton="Salvar"
                                        onClickButtonType={handleSubmit}
                                        cor="success"
                                        Icon={FaRegSave}
                                        iconColo="#FFF"
                                        iconSize={20}
                                    />
                                    <ButtonType
                                        textButton="Voltar"
                                        onClickButtonType={() => navigate(-1)}
                                        cor="primary"
                                        Icon={IoMdArrowBack}
                                        iconColo="#FFF"
                                        iconSize={20}
                                    />


                                </div>
                            </div>
                        )}
                    </div>

                </form>
            </main>
        </Fragment >
    )
}
