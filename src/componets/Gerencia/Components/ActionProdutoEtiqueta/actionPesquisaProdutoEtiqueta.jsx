import { Fragment, useEffect, useState } from "react"
import { InputField } from "../../../Buttons/Input"
import { ActionMain } from "../../../Actions/actionMain"
import { get } from "../../../../api/funcRequest"
import { AiOutlineSearch } from "react-icons/ai"
import { ActionListaProdutoEtiqueta } from "./actionListaProdutoEtiqueta"
import { ButtonType } from "../../../Buttons/ButtonType"
import { useFetchData } from "../../../../hooks/useFetchData"
import { useNavigate } from "react-router-dom"
import { MdOutlineLocalPrintshop } from "react-icons/md"
import { GoDownload } from "react-icons/go"
import Swal from "sweetalert2"
import { BsTrash3 } from "react-icons/bs"


export const ActionPesquisaProdutoEtiqueta = () => {
  const [dadosListaPrecosSap, setDadosListaPrecosSap] = useState([])
  const [descricaoProduto, setDescricaoProduto] = useState('')
  const [codBarrasProduto, setCodBarrasProduto] = useState('')
  const [idProduto, setIDProduto] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null)
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

  const { data: dadosListaPrecos = [] } = useFetchData('listasDePrecosSAP', '/listasDePrecosSAP');

  const getListaProdutosSAP = async () => {
    try {
      const response = await get(`/listaProdutosEtiquetaSAP?idLista=${usuarioLogado?.IDEMPRESA}&idProduto=${idProduto}&descricao=${descricaoProduto}&codBarras=${codBarrasProduto}`)
      if (response.data) {
       
        setDadosListaPrecosSap(response.data)
    
      }
      return response.data;
    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const handleClick = () => {
    if(!idProduto && !descricaoProduto && !codBarrasProduto) {

      alert('teste')
    } else {
      getListaProdutosSAP();
    }
  }

  return (

    <Fragment>

      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={[""]}
        title="Etiquetagem"
        subTitle={usuarioLogado?.NOFANTASIA}

        InputFieldCodBarraComponent={InputField}
        labelInputFieldCodBarra={"Lista de Preços"}
        valueInputFieldCodBarra={usuarioLogado?.NOFANTASIA}
        isDisabledCodBarra={true}


        InputFieldComponent={InputField}
        labelInputField={"Cód.Barras "}
        valueInputField={codBarrasProduto}
        onChangeInputField={(e) => setCodBarrasProduto(e.target.value)}
        placeHolderInputFieldComponent={"Cód.Barras / Nome Produto"}

        InputFieldNumeroNFComponent={InputField}
        labelInputFieldNumeroNF={"Id. Produto"}
        valueInputFieldNumeroNF={idProduto}
        onChangeInputFieldNumeroNF={(e) => setIDProduto(e.target.value)}
        placeHolderInputFieldNumeroNF={"Id. Produto"}

        InputFieldDescricaoComponent={InputField}
        labelInputFieldDescricao={"Descrição"}
        valueInputFieldDescricao={descricaoProduto}
        onChangeInputFieldDescricao={(e) => setDescricaoProduto(e.target.value)}
        placeHolderInputFieldDescricao={"Descrição do Produto"}

        
        ButtonSearchComponent={ButtonType}
        linkNomeSearch={"Pesquisar"}
        onButtonClickSearch={handleClick}
        corSearch={"primary"}
        IconSearch={AiOutlineSearch}

        ButtonTypeCadastro={ButtonType}
        linkNome={'Guardar'}
        onButtonClickCadastro={''}
        corCadastro={"success"}
        IconCadastro={GoDownload}

        ButtonTypeCancelar={ButtonType}
        onButtonClickCancelar={''}
        linkCancelar={"Imprimir"}
        corCancelar={"info"}
        IconCancelar={MdOutlineLocalPrintshop}

        ButtonTypeVendasEstrutura={ButtonType}
        onButtonClickVendasEstrutura={''}
        linkNomeVendasEstrutura={"Cancelar"}
        corVendasEstrutura={"danger"}
        iconVendasEstrutura={BsTrash3}

      />
   
      <ActionListaProdutoEtiqueta dadosListaPrecosSap={dadosListaPrecosSap} />
    </Fragment>
  )
}
  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') {
  //       handleClick();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);