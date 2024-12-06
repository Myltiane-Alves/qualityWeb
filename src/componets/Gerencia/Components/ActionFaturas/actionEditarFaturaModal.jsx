import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { post, put } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import Swal from "sweetalert2";
import axios from "axios";

export const ActionEditarFaturaModal = ({ show, handleClose, dadosDetalheFatura }) => {
  const { register, handleSubmit, errors } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [empresa, setEmpresa] = useState('')
  const [codAutorizacao, setCodAutorizacao] = useState('')
  const [valorFatura, setValorFatura] = useState(0)
  const [valorFaturaAntigo, setValorFaturaAntigo] = useState(0)
  const [numeroMovimento, setNumeroMovimento] = useState('')
  const [ipUsuario, setIpUsuario] = useState('')
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
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if(response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }

  useEffect(() => {
    if(dadosDetalheFatura && dadosDetalheFatura[0]?.NUCODAUTORIZACAO) {
      setCodAutorizacao(dadosDetalheFatura[0]?.NUCODAUTORIZACAO)
      
    }
  }, [dadosDetalheFatura])

  useEffect(() => {
    if(dadosDetalheFatura && dadosDetalheFatura[0]?.VRRECEBIDO) {
      setValorFatura(dadosDetalheFatura[0]?.VRRECEBIDO)
    }
  }, [dadosDetalheFatura])

  useEffect(() => {
    if(dadosDetalheFatura && dadosDetalheFatura[0]?.NUCODAUTORIZACAO) {
      setCodAutorizacao(dadosDetalheFatura[0]?.NUCODAUTORIZACAO)
    }
  }, [dadosDetalheFatura])

  const onSubmit = async () => {
    const putData = {
      IDDETALHEFATURA: dadosDetalheFatura[0]?.IDDETALHEFATURA,
      NUCODAUTORIZACAO: codAutorizacao,
      VRRECEBIDO: valorFatura,
    }

    try {
      const response = await put('/fatura-loja-atualizar', putData);

      Swal.fire({
        title: 'Atualização',
        text: 'Atualização Realizada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      });

      const textDados = JSON.stringify(putData)
      let textoFuncao = 'GERENCIA/ATUALIZAR FATURA';
  
  
      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }
  
      const responsePost = await post('/log-web', postData)
  
      
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        title: 'Cadastro',
        text: 'Erro ao Tentar Confimar Alteração',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      });

      console.log(error);
    }
  }


  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        id="CadadiantamentoSalario"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <HeaderModal
          title={"Faturas dos Caixas"}
          subTitle={"Editar Fatura de Caixa da Loja"}
          handleClose={handleClose}
        />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} >

            <div class="form-group">
              <div class="row">

                <div class="col-sm-6 col-xl-6">
                  <InputFieldModal
                    className="form-control input"
                    readOnly={true}
                    label="Empresa"
                    value={usuarioLogado?.NOFANTASIA}
                    onChangeModal={(e) => setEmpresa(e.target.value)}
                   

                  />
                 
                </div>
                <div class="col-sm-6 col-xl-6">
                  <InputFieldModal
                    className="form-control input"
                    readOnly={true}
                    label="Caixa - Cód. Autorização da Fatura"
                    value={`${dadosDetalheFatura[0]?.IDDETALHEFATURA} - ${dadosDetalheFatura[0]?.DSCAIXA} - ${dadosDetalheFatura[0]?.NUCODAUTORIZACAO}`}
                    onChangeModal={(e) => setNumeroMovimento(e.target.value)}
                    

                  />
               
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">


                <div class="col-sm-6 col-xl-4">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    readOnly={false}
                    label="Código Autorização"
                    value={codAutorizacao}
                    onChangeModal={(e) => setCodAutorizacao(e.target.value)}
               
                  />
                  
                </div>
                <div class="col-sm-6 col-xl-4">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    readOnly={false}
                    label="Valor Antigo da Fatura"
                    value={dadosDetalheFatura[0]?.VRRECEBIDO}
                    onChangeModal={(e) => setValorFaturaAntigo(e.target.value)}
                    

                  />
                  
                </div>
                <div class="col-sm-6 col-xl-4">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    readOnly={false}
                    label="Valor Atual da Fatura"
                    value={valorFatura}
                    onChangeModal={(e) => setValorFatura(e.target.value)}
                    placeholder={"0"}
                    {...register("valorFatura", { required: true })}

                  />
                  
                </div>
              </div>
            </div>

            <FooterModal
            

              ButtonTypeConfirmar={ButtonTypeModal}
              textButtonConfirmar={"Confirmar Alteração"}
              onClickButtonConfirmar={onSubmit}
              corConfirmar="success"

              ButtonTypeFechar={ButtonTypeModal}
              textButtonFechar={"Fechar"}
              onClickButtonFechar={handleClose}
              corFechar="secondary"
            />

          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}