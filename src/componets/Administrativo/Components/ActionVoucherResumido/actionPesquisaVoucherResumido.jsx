import React, { Fragment, useState, useEffect } from "react"
import { ActionListaVouchersResumido } from "./actionListaVouchersResumido"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { getDataAtual } from "../../../../utils/dataAtual";
import { get } from "../../../../api/funcRequest";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { useQuery } from "react-query";


export const ActionPesquisaVoucherResumido = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('');
  const [dataPesquisaFim, setDataPesquisaFim] = useState('');
  const [numeroVoucher, setNumeroVoucher] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);


  const fetchListaResumoVoucher = async ( ) => {
    try {
      
      const urlApi = `/detalhe-voucher-dados-adm?dadosVoucher=${numeroVoucher}&dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}`;    
      const response = await get(urlApi);
      
      if (response.data.length && response.data.length === pageSize) {
        let allData = [...response.data];
        animacaoCarregamento(`Carregando... Página ${currentPage} de ${response.data.length}`, true);
  
        async function fetchNextPage(page) {
          try {
            page++;
            const responseNextPage = await get(`${urlApi}&page=${page}`);
            if (responseNextPage.data.length) {
              allData.push(...responseNextPage.data);
              return fetchNextPage(page);
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
   
  const { data: dadosVoucher = [], error: errorVouchers, isLoading: isLoadingVouchers, refetch: refetchListaResumoVoucher } = useQuery(
    ['detalheVoucherDados', numeroVoucher, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize],
    () => fetchListaResumoVoucher(numeroVoucher, dataPesquisaInicio, dataPesquisaFim, currentPage, pageSize),
    {
      enabled: Boolean(numeroVoucher), 
    }
  );

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1)
    refetchListaResumoVoucher()
    setIsLoading(true)
    setTabelaVisivel(true)
  }


  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vouchers Emitidos"]}
        title="Vouchers Emitidos"
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
        valueInputFieldNumeroVoucher={numeroVoucher}
        onChangeInputFieldNumeroVoucher={e => setNumeroVoucher(e.target.value)}
        labelInputFieldNumeroVoucher={"Voucher - Nº Venda ou CPF/CNPJ"}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

      {tabelaVisivel &&
        <ActionListaVouchersResumido dadosVoucher={dadosVoucher}/>
      }   
    </Fragment>
  )
}