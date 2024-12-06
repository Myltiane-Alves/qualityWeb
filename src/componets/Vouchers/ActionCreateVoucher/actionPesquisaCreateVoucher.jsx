import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai";
import { ActionListaVoucherEmitido } from "./actionListaVoucherEmitido";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../utils/animationCarregamento";
import { ActionListaDetalhesVoucherEmitido } from "./actionListaDetalhesVoucherEmitido";
import { ActionPesquisaCreateVoucherCliente } from "./actionPesquisaCreateVoucherCliente";
import { ActionMain } from "../../Actions/actionMain";
import { InputField } from "../../Buttons/Input";
import { ButtonType } from "../../Buttons/ButtonType";
import { get } from "../../../api/funcRequest";
import { getDataAtual } from "../../../utils/dataAtual";

export const ActionPesquisaCreateVoucher = () => {
  const [actionPrincipal, setActionPrincipal] = useState(true);
  const [actionSecundaria, setActionSecundaria] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelVoucherSelecionados, setTabelaVisivelVoucherSelecionados] = useState(false);
  const [tabelaVendasClientes, setTabelaVendasClientes] = useState(false);
  const [modalVoucher, setModalVoucher] = useState(true);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [numeroVoucherSelecionado, setNumeroVoucherSelecionado] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [dadosDetalheVoucherSelecionado, setDadosDetalheVoucherSelecionado] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioAutorizado, setUsuarioAutorizado] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const dadosArmazenadosVoucher = localStorage.getItem('dadosDetalheVoucher');
    if(dadosArmazenadosVoucher) {
      const dadosArmazenadosVoucherParse = JSON.parse(dadosArmazenadosVoucher);
      setDadosDetalheVoucherSelecionado(dadosArmazenadosVoucherParse);
      setTabelaVisivelVoucherSelecionados(true);
      setTabelaVisivel(false);
  
    }
  }, [])


  useEffect(() => {
    const dataInicio = getDataAtual()
    const dataFim = getDataAtual()
    setDataPesquisaInicio(dataInicio)
    setDataPesquisaFim(dataFim)

    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
  
  }, [usuarioLogado]);

  // const fetchListaVouchersProcessamento = async () => {
  //   try {
  //     const urlApi = `/detalheVoucherDados?idEmpresa=${usuarioLogado?.IDEMPRESA}&stStatus='EM ANALISE'`;
  //     const response = await get(urlApi);
      
  //     if (response.data.length && response.data.length === pageSize) {
  //       let allData = [...response.data];
  //       animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
  //       async function fetchNextPage(currentPage) {
  //         try {
  //           currentPage++;
  //           const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
  //           if (responseNextPage.length) {
  //             allData.push(...responseNextPage.data);
  //             return fetchNextPage(currentPage);
  //           } else {
  //             return allData;
  //           }
  //         } catch (error) {
  //           console.error('Erro ao buscar próxima página:', error);
  //           throw error;
  //         }
  //       }
  
  //       await fetchNextPage(currentPage);
  //       return allData;
  //     } else {
       
  //       return response.data;
  //     }
  
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     throw error;
  //   } finally {
  //     fecharAnimacaoCarregamento();
  //   }
  // };
   
  // const { data: dadosVoucherProcessamento = [], error: errorVouchersProcessamento, isLoading: isLoadingVouchersProcessamnto, refetch: refetchVouchersProcessamento } = useQuery(
  //   ['detalheVoucherDados', usuarioLogado?.IDEMPRESA, currentPage, pageSize],
  //   () => fetchListaVouchersProcessamento(usuarioLogado?.IDEMPRESA, currentPage, pageSize),
  //   {
  //     enabled: Boolean(usuarioLogado?.IDEMPRESA), 
  //     staleTime: 5 * 60 * 1000,
  //     cacheTime: 5 * 60 * 1000
  //   }
  // );

  const fetchListaVouchers = async () => {
    try {
      const urlApi = `/detalheVoucherDados?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dadosVoucher=${numeroVoucherSelecionado}&idSubGrupoEmpresa=${usuarioLogado.IDGRUPOEMPRESARIAL}&idEmpresa=${usuarioLogado.IDEMPRESA}`;
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(currentPage) {
          try {
            currentPage++;
            const responseNextPage = await get(`${urlApi}&page=${currentPage}`);
            if (responseNextPage.length) {
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
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };
   
  const { data: dadosVoucher = [], error: errorVouchers, isLoading: isLoadingVouchers, refetch: refetchListaVouchers } = useQuery(
    ['detalheVoucherDados', usuarioLogado?.IDEMPRESA, usuarioLogado?.IDGRUPOEMPRESARIAL, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVouchers(usuarioLogado?.IDEMPRESA, usuarioLogado?.IDGRUPOEMPRESARIAL, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: false, 
    }
  );


  const handleClick = () => {
    
    setCurrentPage(+1);
    refetchListaVouchers()
    setTabelaVisivel(true);
    setTabelaVendasClientes(false);
    setTabelaVisivelVoucherSelecionados(false);
    setActionPrincipal(true);
    setActionSecundaria(false);
   
  }

  const handleClickCadastro = () => {
    setActionPrincipal(false);
    setActionSecundaria(true);
    
  }

  return (

    <Fragment>
      
      {actionPrincipal && (
        <Fragment>

          <ActionMain
            linkComponentAnterior={["Home"]}
            linkComponent={["Vouchers"]}
            title="Vouchers "
            subTitle="Nome da Loja"

          
            InputFieldDTInicioComponent={InputField}
            labelInputFieldDTInicio={"Data Início"}
            valueInputFieldDTInicio={dataPesquisaInicio}
            onChangeInputFieldDTInicio={e => setDataPesquisaInicio(e.target.value)}

            InputFieldDTFimComponent={InputField}
            labelInputFieldDTFim={"Data Fim"}
            valueInputFieldDTFim={dataPesquisaFim}
            onChangeInputFieldDTFim={e => setDataPesquisaFim(e.target.value)}

            InputFieldNumeroVoucherComponent={InputField}
            valueInputFieldNumeroVoucher={numeroVoucherSelecionado}
            onChangeInputFieldNumeroVoucher={(e) => setNumeroVoucherSelecionado(e.target.value)}
            labelInputFieldNumeroVoucher={"Nº Voucher / Nº Venda CPF/CNPJ"}

            ButtonSearchComponent={ButtonType}
            linkNomeSearch={"Pesquisar"}
            onButtonClickSearch={handleClick}
            corSearch={"primary"}
            IconSearch={AiOutlineSearch}

            ButtonTypeCadastro={"Criar Voucher"}
            linkNome={"Criar Voucher"}
            onButtonClickCadastro={handleClickCadastro}
            corCadastro={"success"}
            IconCadastro={MdAdd}

          />
     
          {tabelaVisivel &&
            <ActionListaVoucherEmitido dadosVoucher={dadosVoucher} usuarioLogado={usuarioLogado}/>
            }

          {tabelaVisivelVoucherSelecionados && (

            <ActionListaDetalhesVoucherEmitido dadosDetalheVoucherSelecionado={dadosDetalheVoucherSelecionado} usuarioLogado={usuarioLogado} />
          )}
        </Fragment>
      )}

      {actionSecundaria && (
        <div className="">
          <ActionPesquisaCreateVoucherCliente 
            actionSecundaria={actionSecundaria}
            setActionSecundaria={setActionSecundaria}
            actionPrincipal={actionPrincipal} 
            setActionPrincipal={setActionPrincipal}
          />
        </div>
        )}

      {/* <ActionVoucherEmProcessamentoModal
        show={modalVoucher}
        handleClose={() => setModalVoucher(false)}
        dadosVoucherProcessamento={dadosVoucherProcessamento}
      />  */}


    </Fragment>
  )
}
