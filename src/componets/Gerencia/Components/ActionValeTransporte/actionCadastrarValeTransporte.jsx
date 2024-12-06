import { Fragment, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { get, post } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import Select from 'react-select';
import { getHoraAtual } from "../../../../utils/dataAtual";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "react-query";

export const ActionCadastrarValeTransporte = ({show, handleClose}) => {
  const { register, handleSubmit, errors } = useForm();
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [dsHistorio, setDSHistorio] = useState('');
  const [dsPagoA, setDsPagoA] = useState('');
  const [vrDespesa, setVrDespesa] = useState('');
  const [horarioAtual, setHorarioAtual] = useState('');
  const [dtDespesa, setDtDespesa] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState()
  const [ipUsuario, setIpUsuario] = useState('')
  const navigate = useNavigate();


  useEffect(() => { 
    const hora = getHoraAtual()
    setHorarioAtual(hora)
  }, [])
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

  const { data: dadosFuncionarios = [], error: errorGrupo, isLoading: isLoadingGrupo } = useQuery(
    'todos-funcionario',
    async () => {
      const response = await get(`/todos-funcionario?idEmpresa=${usuarioLogado.IDEMPRESA}`);
      console.log('response', response.data)
      return response.data;
    },
    {enabled: true, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );


  
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

  const onSubmit = async (data) => {
    const postData = {
      IDEMPRESA: usuarioLogado.IDEMPRESA,
      IDUSR: usuarioLogado.id,
      DTDESPESA: dtDespesa,
      IDCATEGORIARECEITADESPESA: 248,
      DSHISTORIO: dsHistorio,
      DSPAGOA: '',
      IDFUNCIONARIO: usuarioSelecionado,
      TPNOTA: '',
      NUNOTAFISCAL: '',
      VRDESPESA: vrDespesa,
      STATIVO: 'True',
      STCANCELADO: 'False'

    }

    try {
      
      const response = await post('/cadastrar-despesa-loja', postData)

      Swal.fire({
        title: 'Cadastro',
        text: 'Cadastro Realizada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      const textDados = JSON.stringify(postData)
      let textoFuncao = 'GERENCIA/CADASTRO DE VALE TRANSPORTE';
  
  
      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }
  
      const responsePost = await post('/log-web', createData)
  
      
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        title: 'Cadastro',
        text: 'Erro ao Tentar Cadastrar',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
      console.error('Erro ao parsear o usuário do localStorage:', error);
    }

  }
 
  const handleChangeUsuario = (e) => {
    setUsuarioSelecionado(e.value);
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
            title={"Dados do Vale Trasnporte da Loja"}
            subTitle={"Cadastrar Vale Trasnporte da Loja"}
            handleClose={handleClose}
          />
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

              <div class="form-group">
                <div class="row">

                  <div class="col-sm-6 col-xl-10">
                    <InputFieldModal
                      className="form-control input"
                      readOnly={true}
                      label="Empresa"
                      value={usuarioLogado?.NOFANTASIA}
                    />

                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">

                  <div class="col-sm-6 col-xl-4">
                    <InputFieldModal
                      type="datetime"
                      className="form-control input"
                      readOnly={true}
                      label="Data do Vale"
                      value={usuarioLogado?.DATA_HORA_SESSAO}
                    />
                  </div>
                  <div class="col-sm-6 col-xl-4">
                    <InputFieldModal
                      type="time"
                      className="form-control input"
                      readOnly={true}
                      label="Hora do Vale"
                      value={horarioAtual}
                    />
                  </div>
                  <div class="col-sm-6 col-xl-4">
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={true}
                      label="Despesa"
                      onChangeModal={(e) => setDsPagoA(e.target.value)}
                      value={"248 - Pgto Vale Transporte"}
                      // value={`${dadosFuncionarios[0].IDCATEGORIARECDESP} - ${dadosReceitaDespesas[2].DSCATEGORIA}`}
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 col-xl-6">
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={false}
                      value={dsHistorio}
                      onChangeModal={(e) => setDSHistorio(e.target.value)}
                      label="Histórico"
                    />

                  </div>

                  <div class="col-sm-6 col-xl-6">
                    <label className="form-label" htmlFor={""}>Funcionário</label>
                    <Select
                      defaultValue={usuarioSelecionado}
                      options={[
                        { value: '', label: 'Selecione...' },
                        ...dadosFuncionarios.map((item) => {
                          return {
                            value: item.ID,
                            label: `${item.ID} - ${item.NOFUNCIONARIO}`
                          }
                        })]}
                      onChange={handleChangeUsuario}
                    />

                  </div>

                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 col-xl-6">
                    <InputFieldModal
                      type="text"
                      className="form-control input"
                      readOnly={false}
                      label="Valor do Vale Transporte"
                      value={vrDespesa}
                      onChangeModal={(e) => setVrDespesa(e.target.value)}
                      placeholder="R$ 0,00"
                    />

                  </div>
                </div>
              </div>

              <FooterModal
                ButtonTypeCadastrar={ButtonTypeModal}
                onClickButtonCadastrar={""}
                textButtonCadastrar={"Cadastrar"}
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