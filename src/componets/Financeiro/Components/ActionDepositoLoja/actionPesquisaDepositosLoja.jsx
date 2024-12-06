import { Fragment, useEffect, useState } from "react"
import { get } from "../../../../api/funcRequest";
import { MultSelectAction } from "../../../Select/MultSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { InputField } from "../../../Buttons/Input";
import { ActionMain } from "../../../Actions/actionMain";
import { getDataAtual } from "../../../../utils/dataAtual";
import { ActionListaDepositosLoja } from "./actionListaDepositosLoja";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from 'react-query';
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData } from "../../../../hooks/useFetchData";

export const ActionPesquisaDepositosLoja = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('');
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);

  const navigate = useNavigate();
  useEffect(() => {
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
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
 
  }, [])


  const { data: optionsEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useFetchData('listaEmpresasIformatica', '/listaEmpresasIformatica');
  
  useEffect(() => {
    if (errorEmpresas) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao buscar empresas!',
      });
    }
  }, [errorEmpresas]);


  const fetchListaDepositosLoja = async () => {
    try {

      const urlApi = `/deposito-loja?idEmpresa=${empresaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;
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
      console.error('Erro ao buscar dados:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }
  };

  const { data: dadosListaDepositosLoja = [], error: errorListaDepositosLoja, isLoading: isLoadingListaDepositosLoja, refetch: refetchListaDepositosLoja } = useQuery(
    ['depositoLoja', empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaDepositosLoja(empresaSelecionada, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const handleEmpresaChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEmpresaSelecionada(values);
    setEmpresaSelecionadaNome(selectedOptions[0].label);
  }


  const handleClick = () => {
    setTabelaVisivel(true)
    setIsLoadingPesquisa(true);
    setCurrentPage(+1);
    refetchListaDepositosLoja();
    
  }
  return (
    <Fragment>
      {/* {usuarioLogado && usuarioLogado.IDPERFIL == 1 ? (
        <>
          <ActionMain
            linkComponentAnterior={["Home"]}
            linkComponent={["Lista de Depósitos"]}
            title="Depósitos por Lojas e Período"
            InputFieldDTInicioComponent={InputField}
            labelInputFieldDTInicio={"Data Início"}
            valueInputFieldDTInicio={dataPesquisaInicio}
            onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}
            InputFieldDTFimComponent={InputField}
            labelInputFieldDTFim={"Data Fim"}
            valueInputFieldDTFim={dataPesquisaFim}
            onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}
            MultSelectEmpresaComponent={MultSelectAction}
            optionsMultSelectEmpresa={[
              { value: '', label: 'Selecione uma loja' },
              ...optionsEmpresas.map((empresa) => ({
                value: empresa.IDEMPRESA,
                label: empresa.NOFANTASIA,
              })),
            ]}
            labelMultSelectEmpresa={"Empresa"}
            valueMultSelectEmpresa={[empresaSelecionada]}
            onChangeMultSelectEmpresa={handleEmpresaChange}
            ButtonSearchComponent={ButtonType}
            linkNomeSearch={"Pesquisar"}
            onButtonClickSearch={handleClick}
            IconSearch={AiOutlineSearch}
            corSearch={"primary"}
          />
          {tabelaVisivel && (
            <div className="card">
              <ActionListaDepositosLoja dadosListaDepositosLoja={dadosListaDepositosLoja} />
            </div>
          )}
        </>
      ) : (
        alert('Usuário sem perfil para acessar esse Menu', 'error')
      )} */}

<>
          <ActionMain
            linkComponentAnterior={["Home"]}
            linkComponent={["Lista de Depósitos"]}
            title="Depósitos por Lojas e Período"
            subTitle={empresaSelecionadaNome}

            InputFieldDTInicioComponent={InputField}
            labelInputFieldDTInicio={"Data Início"}
            valueInputFieldDTInicio={dataPesquisaInicio}
            onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

            InputFieldDTFimComponent={InputField}
            labelInputFieldDTFim={"Data Fim"}
            valueInputFieldDTFim={dataPesquisaFim}
            onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

            MultSelectEmpresaComponent={MultSelectAction}
            optionsMultSelectEmpresa={[
              ...optionsEmpresas.map((empresa) => ({
                value: empresa.IDEMPRESA,
                label: empresa.NOFANTASIA,
              })),
            ]}
            labelMultSelectEmpresa={"Empresa"}
            valueMultSelectEmpresa={[empresaSelecionada]}
            onChangeMultSelectEmpresa={handleEmpresaChange}

            ButtonSearchComponent={ButtonType}
            linkNomeSearch={"Pesquisar"}
            onButtonClickSearch={handleClick}
            IconSearch={AiOutlineSearch}
            corSearch={"primary"}

          />
          {tabelaVisivel && (
            <div className="card">
              <ActionListaDepositosLoja dadosListaDepositosLoja={dadosListaDepositosLoja} />
            </div>
          )}
        </>
    </Fragment>
  );
}

