import React, { Fragment,  useEffect, useMemo, useState } from "react"
import { ActionMain } from "../../../Actions/actionMain";
import { InputField } from "../../../Buttons/Input";
import { InputSelectAction } from "../../../Inputs/InputSelectAction";
import { ButtonType } from "../../../Buttons/ButtonType";
import { get, post } from "../../../../api/funcRequest";
import { ActionColetorBalancoModal } from "./actionColetorBalancoModal";
import { ActionListaBalancoAvulso } from "./actionListaBalancoAvulso";
import { AiOutlineSave, AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { animacaoCarregamento, fecharAnimacaoCarregamento } from "../../../../utils/animationCarregamento";
import { ActionListaProduto } from "./actionListaProduto";
import Swal from "sweetalert2";
import { useConfirmarBalancoAvulso } from "./hooks/useConfirmarBalancoAvulso";

export const ActionPesquisaBalancoAvulso = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [descricaoColetor, setDescricaoColetor] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaProduto, setTabelaProduto] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false)
  const [empresaSelecionada, setEmpresaSelecionada] = useState('')
  const [empresaSelecionadaNome, setEmpresaSelecionadaNome] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1000)
 
  
  
  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');
    
    if (usuarioArmazenado) {
      const parsedUsuario = JSON.parse(usuarioArmazenado);
      setUsuarioLogado(parsedUsuario);
    }
  }, [])
  
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setDescricaoColetor('COLETOR WEB - ' + usuarioLogado.NOFUNCIONARIO)
    }, 2000);
    
    return () => clearTimeout(timer);
    
  }, [usuarioLogado])
  
  const { data: dadosEmpresa = [], error: errorEmpresas, isLoading: isLoadingEmpresas } = useQuery(
    'empresas',
    async () => {
      const response = await get(`/empresas`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
  
  
  const { data: dadosBalancoAvulso = [], error: errorBalanco, isLoading: isLoadingBalanco, refetch } = useQuery(
    [ 'detalheBalancoAvulso', empresaSelecionada, usuarioLogado?.id],
    async () => {
      const response = await get(`/detalheBalancoAvulso?idFilial=${empresaSelecionada}&coletor=${usuarioLogado.id}`);
      return response.data;
    },
    {
      enabled: Boolean(empresaSelecionada), 
    }
  );
  
  const  { enviarConfirmacao, loading } = useConfirmarBalancoAvulso({ dadosBalancoAvulso});
  const handleConfirmarBalanco = async () => {
    await enviarConfirmacao();
  };

  const fetchListaColetorBalanco = async () => {
    try {
      const urlApi = `/listaProdutos?idEmpresa=${empresaSelecionada}&dsProduto=${descricaoProduto}`;
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
        console.log(response.data, 'response.data')
        
        return response.data;
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      fecharAnimacaoCarregamento();
    }  
  };
  
  const { data: dadosColetorBalanco = [], refetch: refetchListaColetorBalanco } = useQuery(
    ['listaProdutos', empresaSelecionada, descricaoProduto, currentPage, pageSize],
    () => fetchListaColetorBalanco(empresaSelecionada, descricaoProduto, currentPage, pageSize),
    { enabled: Boolean(descricaoProduto.length > 7) },
  );
  
  // console.log(dadosColetorBalanco, 'dadosColetorBalanco')
  const handleSelectEmpresa = (e) => {
    const empresa = dadosEmpresa.find((empresa) => empresa.IDEMPRESA === e.value);
    setEmpresaSelecionada(e.value);
    setEmpresaSelecionadaNome(empresa.NOFANTASIA);
    setTabelaVisivel(true)
  };
  // console.log(dadosBalancoAvulso, 'dadosBalancoAvulso pesquisa')


  const isDisabledEmpresa = empresaSelecionada ? true : false;


  const handleClosseModal = () => {
    setModalVisivel(false)
  }

  const handleClick = () => {   
    if(!empresaSelecionada) {
      
      Swal.fire({
        icon: 'info',
        text: 'Digite a descrição do produto ou o código de barras!',
        timer: 3000,
      })
    } else {
      setTabelaVisivel(false)
      setTabelaProduto(true)
      setCurrentPage(prevPage => prevPage + 1)
      refetchListaColetorBalanco(empresaSelecionada, descricaoProduto)
    }

  }

   

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Balanço Avulso por Loja"]}
        title="Balanço Avulso por Loja"
        subTitle={empresaSelecionadaNome}

        InputSelectEmpresaComponent={InputSelectAction}
        optionsEmpresas={[
          { value: 0, label: 'Selecione uma loja' },
          ...dadosEmpresa.map((empresa) => ({
            value: empresa.IDEMPRESA,
            label: empresa.NOFANTASIA,
          })),
        ]}

        labelSelectEmpresa={"Empresa"}
        isDisabledEmpresa={isDisabledEmpresa}
        valueSelectEmpresa={empresaSelecionada}
        onChangeSelectEmpresa={handleSelectEmpresa}

        InputFieldDescricaoComponent={InputField}
        labelInputFieldDescricao={"Descrição"}
        onChangeInputFieldDescricao={e => setDescricaoColetor(e.target.value)}
        valueInputFieldDescricao={descricaoColetor}
        readOnlyDescricao={true}

        InputFieldQuantidadeComponent={InputField}
        labelInputFieldQuantidade={"Quantidade"}
        onChangeInputQuantidade={e => setQuantidade(e.target.value)}
        valueInputQuantidade={quantidade}

        InputFieldComponent={InputField}
        labelInputField={"Produto"}
        onChangeInputField={e => setDescricaoProduto(e.target.value)}
        valueInputField={descricaoProduto}

        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={"Salvar"}
        onButtonClickCadastro={handleConfirmarBalanco}
        corCadastro={"success"}
        IconCadastro={AiOutlineSave}
      />
 
        {tabelaVisivel && (
          <ActionListaBalancoAvulso dadosBalancoAvulso={dadosBalancoAvulso} />
        )}

       
        {tabelaProduto && (

          <ActionListaProduto dadosColetorBalanco={dadosColetorBalanco} empresaSelecionada={empresaSelecionada} quantidade={quantidade}/>
        )}
    
    {console.log(dadosColetorBalanco, 'dadosColetorBalanco')}
      <ActionColetorBalancoModal 
        show={modalVisivel}
        handleClose={handleClosseModal}
        dadosColetorBalanco={dadosColetorBalanco}
      />
    

    </Fragment>
  )
}