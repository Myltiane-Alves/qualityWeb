import React, { Fragment, useEffect, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { get, post } from "../../../../api/funcRequest";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaVoucherEmitido } from "./actionListaVoucherEmitido";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { ActionVoucherEmProcessamentoModal } from "./actionVoucherEmProcessamentoModal";
import { ActionListaDetalhesVoucherEmitido } from "./actionListaDetalhesVoucherEmitido";
import Swal from "sweetalert2";
import { ActionPesquisaCreateVoucherCliente } from "./actionPesquisaCreateVoucherCliente";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";

export const ActionPesquisaCreateVoucher = ({usuarioLogado, ID, optionsEmpresas }) => {
  const [actionPrincipal, setActionPrincipal] = useState(true);
  const [actionSecundaria, setActionSecundaria] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVisivelVoucherSelecionados, setTabelaVisivelVoucherSelecionados] = useState(false);
  const [tabelaVendasClientes, setTabelaVendasClientes] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [numeroVoucherSelecionado, setNumeroVoucherSelecionado] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [marcaSelecionado, setMarcaSelecionado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [dadosDetalheVoucherSelecionado, setDadosDetalheVoucherSelecionado] = useState([])
  const [isQueryData, setIsQueryData] = useState(false);


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
  }, []);

  const { data: optionsModulos = [], error: errorModulos, isLoading: isLoadingModulos, refetch: refetchModulos } = useQuery(
    'menus-usuario-excecao',
    async () => {
      const response = await get(`/menus-usuario-excecao?idUsuario=${usuarioLogado?.id}&idMenuFilho=${ID}`);

      return response.data;
    },
    { enabled: Boolean(usuarioLogado?.id), staleTime: 60 * 60 * 1000, }
  );

 
  const fetchListaVouchers = async () => {
    try {
      const idEmpresa = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDEMPRESA : empresaSelecionada;
      const idGrupoEmpresarial = optionsModulos[0]?.ADMINISTRADOR == false ? usuarioLogado?.IDGRUPOEMPRESARIAL : marcaSelecionado;
      const urlApi = `/detalheVoucherDados?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&dadosVoucher=${numeroVoucherSelecionado}&idSubGrupoEmpresa=${idGrupoEmpresarial}&idEmpresa=${idEmpresa}`;
      const response = await get(urlApi);
      
      if (response.data && response.data.length === pageSize) {
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
    ['detalheVoucherDados', dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaVouchers( dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(isQueryData), 
    }
  );


  const handleClick = () => {
    setIsQueryData(true);
    setTabelaVisivel(true);
    setTabelaVendasClientes(false);
    setTabelaVisivelVoucherSelecionados(false);
    setActionPrincipal(true);
    setActionSecundaria(false);
    setCurrentPage(prevPage => prevPage + 1);
    refetchListaVouchers()
   
  }

  const handleClickCadastro = () => {
    if(optionsModulos[0]?.CRIAR == 'True'){
      setActionPrincipal(false);
      setActionSecundaria(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Você não tem permissão para criar um novo voucher.',
        timer: 3000,
      });
    }
  }
 
  return (

    <Fragment>
      
      {actionPrincipal && (

        <ActionMain
          linkComponentAnterior={["Home"]}
          linkComponent={["Vouchers"]}
          title="Vouchers "
          subTitle="Nome da Loja"

          InputSelectPendenciaComponent={InputSelectAction}
          labelSelectPendencia="Selecione a Empresa"
          optionsPendencia={[
            { value: '', label: 'Todas' },
            ...optionsEmpresas?.map((empresa) => ({
              value: empresa.IDEMPRESA,
              label: empresa.NOFANTASIA,
              idGrupoEmpresarial: empresa.IDGRUPOEMPRESARIAL,
            }))
          ]}
          onChangeSelectPendencia={(e) => {
            const empresaSelecionadaObj = optionsEmpresas.find(empresa => empresa.IDEMPRESA === e.value);
            setMarcaSelecionado(empresaSelecionadaObj?.IDGRUPOEMPRESARIAL || '');
            setEmpresaSelecionada(e.value);
          }}
          valueSelectPendencia={empresaSelecionada}
          isVisible={{display: optionsModulos[0]?.ADMINISTRADOR == false ? "none" : "block"}}
  
          InputFieldDTInicioAComponent={InputField}
          valueInputFieldDTInicioA={dataPesquisaInicio}
          labelInputDTInicioA={"Data Início"}
          onChangeInputFieldDTInicioA={(e) => setDataPesquisaInicio(e.target.value)}
          
          InputFieldDTFimAComponent={InputField}
          labelInputDTFimA={"Data Fim"}
          valueInputFieldDTFimA={dataPesquisaFim}
          onChangeInputFieldDTFimA={(e) => setDataPesquisaFim(e.target.value)}

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

      {tabelaVisivel &&
        <ActionListaVoucherEmitido 
          dadosVoucher={dadosVoucher} 
          usuarioLogado={usuarioLogado}
          optionsModulos={optionsModulos}    
        />
      }

      {tabelaVisivelVoucherSelecionados && (

        <ActionListaDetalhesVoucherEmitido dadosDetalheVoucherSelecionado={dadosDetalheVoucherSelecionado} usuarioLogado={usuarioLogado} />
      )}
      
      {/* <ActionVoucherEmProcessamentoModal
        show={modalVoucher}
        handleClose={() => setModalVoucher(false)}
        dadosVoucherProcessamento={dadosVoucherProcessamento}
      />  */}


    </Fragment>
  )
}
