import React, { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { ButtonType } from "../../../Buttons/ButtonType";
import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../../../../api/funcRequest";
import { ActionListaVoucher } from "./actionListaVoucher";
import Swal from 'sweetalert2'
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";

export const ActionPesquisaVoucherEmitido = () => {
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [numeroVoucherSelecionado, setNumeroVoucherSelecionado] = useState(0);
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [currentPage] = useState(1);
  const [pageSize] = useState(1000);

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
  }, [usuarioLogado]);

  const fetchResumoVoucher = async () => {
    try {
      
      const urlApi = `detalhe-voucher?idVoucher=${numeroVoucherSelecionado}`;
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

  const { data: dadosVoucher = [], error: erroQuality, isLoading: isLoadingQuality, refetch: refetchResumoVoucher } = useQuery(
    'detalheVoucherDados',
    () => fetchResumoVoucher(numeroVoucherSelecionado, currentPage, pageSize),
    { enabled: false, staleTime: 5 * 60 * 1000 }
  );

  const handleClick = () => {
    if(numeroVoucherSelecionado == '') {
      Swal.fire({
        icon: 'error',
        title: 'Atenção!',
        text: 'Informe o Número do Voucher.',
        timer: 3000
      })
      
      return;
    } else {
      refetchResumoVoucher()
      setTabelaVisivel(true);
    } 
  }

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Vouchers "]}
        title="Vouchers Emitidos"
        subTitle={usuarioLogado?.NOFANTASIA}

        InputFieldComponent={InputField}
        labelInputField={"Nº do Voucher"}
        valueInputField={numeroVoucherSelecionado}
        onChangeInputField={(e) => setNumeroVoucherSelecionado(e.target.value)}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

      />

    {tabelaVisivel && (
      <ActionListaVoucher dadosVoucher={dadosVoucher} /> 
    )}

    </Fragment>
  )
}

