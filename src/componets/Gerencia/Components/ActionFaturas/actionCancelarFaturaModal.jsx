import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { post, put } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import Select from 'react-select';
import Swal from "sweetalert2";

export const ActionCancelarFaturaModal = ({ show, handleClose, dadosCancelarFatura }) => {
  const { register, handleSubmit, errors } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [empresa, setEmpresa] = useState('')
  const [motivo, setMotivo] = useState('')
  const [numeroMovimento, setNumeroMovimento] = useState('')

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




  const onSubmit = async () => {
    const putData = {
      IDDETALHEFATURA: dadosCancelarFatura[0]?.IDDETALHEFATURA,
      TXTMOTIVOCANCELAMENTO: motivo,
      STCANCELADO:'True',
      IDUSRCACELAMENTO: usuarioLogado.id,
      
    }
    try {

      const response = await put('/atualizar-detalhe-fatura-loja', putData)
      Swal.fire({
        title: 'Atualização',
        text: 'Atualização Realizada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      const textDados = JSON.stringify(putData)
      let textoFuncao = 'GERENCIA/ATUALIZAR FATURA CANCELAMENTO';
  
  
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
      })
      console.error('Erro ao parsear o usuário do localStorage:', error);
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
          subTitle={"Cancelar Fatura de Caixa da Loja"}
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
                    {...register("empresa", { required: true })}

                  />

                </div>
                <div class="col-sm-6 col-xl-6">
                  <InputFieldModal
                    className="form-control input"
                    readOnly={true}
                    label="Caixa - Cód. Autorização da Fatura"
                    value={`${dadosCancelarFatura[0]?.IDDETALHEFATURA} - ${dadosCancelarFatura[0]?.DSCAIXA} - ${dadosCancelarFatura[0]?.NUCODAUTORIZACAO}`}
                    onChangeModal={(e) => setNumeroMovimento(e.target.value)}
                    {...register("numeroMovimento", { required: true })}

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
                    label="Motivo do Cancelamento"
                    value={motivo}
                    onChangeModal={(e) => setMotivo(e.target.value)}
                    placeholder={"Motivo"}
                    {...register("valorFatura", { required: true })}

                  />
                </div>
              </div>
            </div>

            <FooterModal
              ButtonTypeCadastrar={ButtonTypeModal}
              onClickButtonCadastrar={onSubmit}
              textButtonCadastrar={"Confirmar Cancelamento"}
              corCadastrar="success"

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