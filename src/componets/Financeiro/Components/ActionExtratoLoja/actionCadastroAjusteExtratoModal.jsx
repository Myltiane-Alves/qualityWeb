import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../../api/funcRequest";
import Swal from 'sweetalert2';
import { getDataAtual } from "../../../../utils/dataAtual";
import { getDataHoraAtual } from "../../../../utils/horaAtual";


export const ModalAjusteExtratoModal = ({ show, handleClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [vrDebito, setVrDebito] = useState('');

  const [dsHistorico, setDsHistorico] = useState('');
  const [vrCredito, setVrCredito] = useState('');
  const [dadosContaBanco, setDadosContaBanco] = useState([])
  const [contaSelecionada, setContaSelecionada] = useState([])
  const [dataMovimento, setDataMovimento] = useState('')
  const [horaMovimento, setHoraMovimento] = useState('')
  const [empresa, setEmpresa] = useState('')


  const navigate = useNavigate();

  useEffect(() => {
    const dataAtual = getDataAtual()
    const horaAtual = getDataHoraAtual()
    setDataMovimento(dataAtual)
    setHoraMovimento(horaAtual)
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


  const getListaBanco = async () => {
    try {
      const response = await get(`/contaBanco`)
      if (response.data) {
        setDadosContaBanco(response.data)
      }
      return response.data;
    } catch (error) {
      console.log(error, 'Erro ao buscar contas do bancos')
    }
  }

  const onSubmit = async (data) => {
    let postData = {
      IDEMPRESA: usuarioLogado.IDEMPRESA,
      HISTORICO: dsHistorico,
      VRDEBITO: vrDebito,
      VRCREDITO: vrCredito,
      STATIVO: 'True',
      STCANCELADO: 'False',
      IDOPERADOR: usuarioLogado.id,
      DATACADASTRO: dataMovimento,
    }


    const response = await post('/ajuste-extrato', postData)
      .then(response => {



        console.log(response, 'despesa cadastrada com sucesso front end!')
      })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })

      .catch(error => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      })

  }

  const handleChangeContaBanco = (selectedOption) => {
    setContaSelecionada(selectedOption);
  };

  return (

    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <HeaderModal
          title={"Dados do Ajuste da Loja"}
          subTitle={"Cadastrar Ajustes de Extrato da Loja"}
          handleClose={handleClose}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>

            <div class="form-group">
              <div className="row">

                <div class="col-sm-6 col-xl-6">
                  <InputFieldModal
                    className="form-control input"
                    readOnly={true}
                    label="Empresa"
                    value={usuarioLogado?.NOFANTASIA}
                    onChangeModal={(e) => setEmpresa(e.target.value)}
                  />

                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-sm-6 col-xl-6">

                  <InputFieldModal
                    type="date"
                    className="form-control input"
                    readOnly={true}
                    label="Data Depósito"
                    value={dataMovimento}
                    onChangeModal={(e) => setDataMovimento(e.target.value)}
                  />
                </div>
                <div class="col-sm-6 col-xl-4">
                  <InputFieldModal
                    type="time-local"
                    className="form-control input"
                    readOnly={true}
                    label="Hora Depósito"
                    value={horaMovimento}
                    onChangeModal={(e) => setHoraMovimento(e.target.value)}
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

                    label="Histórico"
                    value={dsHistorico}
                    onChangeModal={(e) => setDsHistorico(e.target.value)}
                  />
                </div>
                <div class="col-sm-6 col-xl-4">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    placeholder={"R$ 0,00"}
                    label="Valor Crédito"
                    value={vrCredito}
                    onChangeModal={(e) => setVrCredito(e.target.value)}
                  />
                </div>
                <div class="col-sm-6 col-xl-4">
                  <InputFieldModal
                    type="text"
                    className="form-control input"
                    label="Valor Débito"
                    placeholder={"R$ 0,00"}
                    value={vrDebito}
                    onChangeModal={(e) => setVrDebito(e.target.value)}
                  />
                </div>

              </div>
            </div>


            <FooterModal
              ButtonTypeFechar={ButtonTypeModal}
              onClickButtonFechar={handleClose}
              textButtonFechar={"Fechar"}
              corFechar={"secondary"}

              ButtonTypeCadastrar={ButtonTypeModal}
              onClickButtonCadastrar={onSubmit}
              textButtonCadastrar={"Cadastrar Ajuste"}
              corCadastrar={"success"}
            />
          </Modal.Body>
        </form>

      </Modal>
    </Fragment>
  )
}