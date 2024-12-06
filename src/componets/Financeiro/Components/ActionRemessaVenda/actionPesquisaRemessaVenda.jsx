import { Fragment, useEffect, useState } from "react";
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get } from "../../../../api/funcRequest";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { getDataAtual } from "../../../../utils/dataAtual";
import { AiOutlineDownload, AiOutlineSearch } from "react-icons/ai";
import { GoDownload } from "react-icons/go";
import { ActionListaRemessaVenda } from "./actionListaRemessaVenda";
import { useQuery } from 'react-query';
import Swal from 'sweetalert2'
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useFetchData, useFetchEmpresas } from "../../../../hooks/useFetchData";


export const ActionPesquisaRemessaVenda = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [estabelecimento] = useState('')
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [isLoadingPesquisa, setIsLoadingPesquisa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [arquivoGerado, setArquivoGerado] = useState(false); 

  useEffect(() => {
    const dataInicial = getDataAtual();
    const dataFinal = getDataAtual();
    setDataPesquisaInicio(dataInicial);
    setDataPesquisaFim(dataFinal);
  }, []);

  const { data: optionsMarcas = [], error: errorMarcas, isLoading: isLoadingMarcas } = useFetchData('marcasLista', '/marcasLista');
  const { data: optionsEmpresas = [],} = useFetchEmpresas(marcaSelecionada); 

  const fetchListaEstabelecimentos = async () => {
    try {
      const urlApi = `/estabelecimento?idGrupo=${marcaSelecionada}&idEmpresa=${empresaSelecionada}`;
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

  const { data: dadosEstabelecimentos = [], error: errorVendasConciliacao, isLoading: isLoadingVendasConciliacao, refetch: refecthEstabelecimentos } = useQuery(
    ['estabelecimento', marcaSelecionada, empresaSelecionada,  currentPage, pageSize],
    () => fetchListaEstabelecimentos(marcaSelecionada, empresaSelecionada,  currentPage, pageSize),
    { enabled: false }
  );

  const fetchListaRemessaVendas = async () => {
    try {
      const urlApi = `/remessa-vendas?idGrupo=${marcaSelecionada}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&idEmpresa=${empresaSelecionada}`;
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

  const { data: dadosRemessaVendas = [], error: errorRemessaVendas, isLoading: isLoadingRemessaVendas, refetch: refecthRemessaVendas } = useQuery(
    ['remessa-vendas', marcaSelecionada, dataPesquisaInicio, dataPesquisaFim, empresaSelecionada,  currentPage, pageSize],
    () => fetchListaRemessaVendas(marcaSelecionada, empresaSelecionada,  currentPage, pageSize),
    { enabled: false }
  );


  const handleSelectEmpresa = (e) => {
    const selectId = e.value;
    if (selectId) {
      setEmpresaSelecionada(selectId);
    }
  };

  const handleSelectMarca = (e) => {
    const selectId = e.value;
    if (selectId) {
      setMarcaSelecionada(selectId);
    }
  };

  const handleClick = () => {
    setTabelaVisivel(true);
    Swal.fire({
      title: 'Carregando os Dados',
      text: 'Aguarde um momento',
    })
    try {
      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      refecthEstabelecimentos()
      Swal.close()
    } catch (error) {
      Swal.fire('Erro ao Carregar os dados')
    }
  };

  const handleClickRemessaVendas = async () => {    
    Swal.fire({
      title: "Gerando arquivo...",
      html: "Aguarde um momento...",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    try {
      setIsLoadingPesquisa(true);
      setCurrentPage(+1);
      const remessaData = await refecthRemessaVendas();
      await gerarArquivoTxt(remessaData);
      setArquivoGerado(true);
      Swal.close();
    } catch (error) {
      Swal.fire("Erro", "Erro ao gerar arquivo", "error");
    }
  };

  const gerarArquivoTxt = (data) => {
    const txtData = data.map(item => JSON.stringify(item)).join('\n');
    const blob = new Blob([txtData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'remessa_vendas.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Remessa de vendas"]}
        title="Remessa de vendas por Grupos e Período"

        InputFieldDTInicioComponent={InputField}
        valueInputFieldDTInicio={dataPesquisaInicio}
        labelInputFieldDTInicio={"Data Início"}
        onChangeInputFieldDTInicio={(e) => setDataPesquisaInicio(e.target.value)}

        InputFieldDTFimComponent={InputField}
        labelInputFieldDTFim={"Data Fim"}
        valueInputFieldDTFim={dataPesquisaFim}
        onChangeInputFieldDTFim={(e) => setDataPesquisaFim(e.target.value)}

        InputSelectEmpresaComponent={InputSelectAction}
        onChangeSelectEmpresa={handleSelectEmpresa}
        valueSelectEmpresa={empresaSelecionada}
        optionsEmpresas={[
          { value: '0', label: 'Todas Empresas' },
          ...optionsEmpresas.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          }))
        ]}
        labelSelectEmpresa={"Empresa"}

        InputSelectMarcasComponent={InputSelectAction}
        labelSelectMarcas={"Marca"}
        optionsMarcas={[
          // { value: '0', label: 'Selecione uma loja' },
          ...optionsMarcas.map((marca) => ({
            value: marca.IDGRUPOEMPRESARIAL,
            label: marca.DSGRUPOEMPRESARIAL
          }))
        ]}
        valueSelectMarca={marcaSelecionada}
        onChangeSelectMarcas={handleSelectMarca}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Códigos Estabelecimentos"}
        onButtonClickSearch={handleClick}
        IconSearch={AiOutlineSearch}
        corSearch={"primary"}

        ButtonTypeCadastro={ButtonType}
        linkNome={arquivoGerado ? "Baixar Arquivo" : "Gerar Arquivo"} 
        onButtonClickCadastro={handleClickRemessaVendas}
        corCadastro={"info"}
        IconCadastro={arquivoGerado ? AiOutlineDownload : GoDownload} 
        iconSizeCadastro={20}
        
      />

      {tabelaVisivel && (      
        <div className="panel" style={{marginTop: '8rem'}}>
          <ActionListaRemessaVenda dadosEstabelecimentos={dadosEstabelecimentos} />
        </div>
      )}
    </Fragment>
  );
};
