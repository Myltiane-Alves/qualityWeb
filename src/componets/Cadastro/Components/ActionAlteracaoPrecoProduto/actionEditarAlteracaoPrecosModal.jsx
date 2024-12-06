import { Fragment, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { get, put } from "../../../../api/funcRequest"
import { useForm } from "react-hook-form"
import Select from 'react-select';
import Swal from 'sweetalert2'
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const ActionEditarAlteracaoPrecosModal = ({ show, handleClose, dadosListaLoja }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [descricao, setDescricao] = useState('')
  const [statusSelecionado, setStatusSelecionado] = useState([])
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState("")
  const [listaGrupoEstrutura, setListaGrupoEstrutura] = useState([])
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [dadosEmpresas, setDadosEmpresas] = useState([])
  const [rowClick, setRowClick] = useState(true);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getListaGrupoEstrutura()
    getListaEmpresas()
  }, [])

  const getListaEmpresas = async () => {
    try {
      const response = await get(`/empresas`)
      if (response.data) {
        setDadosEmpresas(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

  const getListaGrupoEstrutura = async () => {
    try {
      const response = await get(`/grupoEstrutura`)
      if (response.data) {
        setListaGrupoEstrutura(response.data)
      }
    } catch (error) {
      console.log(error, "não foi possivel pegar os dados da tabela ")
    }
  }

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
    const response = await fetch('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data);
    }
    return response.data;
  }

  const onSubmit = async () => {
    const postData = {

      STATIVO: statusSelecionado,
    }

    const response = await put('/atualizarSubGrupoEstrutura', postData)
      .then(response => {

        // Limpar os campos do formulário


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

  const handleChangeStatus = (e) => {
    setStatusSelecionado(e.value)
  }

  const dados = dadosEmpresas.map((item, index) => {
    let contador = index + 1;
    return {

      IDEMPRESA: item.IDEMPRESA,
      NOFANTASIA: item.NOFANTASIA,
      STATIVO: item.STATIVO,
      contador

    }
  })

  const colunasEmpresas = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => row.contador,
      sortable: true,
    },
    {
      field: 'IDEMPRESA',
      header: 'ID Loja',
      body: row => row.IDEMPRESA,
      sortable: true,
    },
    {
      field: 'NOFANTASIA',
      header: 'Nome Loja',
      body: row => {
        return (
          <p>{row.NOFANTASIA}</p>
        )

      },
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: row => {
        return (
          <p style={{ color: row.STATIVO == 'True' ? 'blue' : 'red' }} >{row.STATIVO == 'True' ? 'ATIVA' : 'INATIVA'}</p>
        )
      },
      sortable: true,
    },
    {
      header: 'Selecione',
      selectionMode: 'multiple',
      selection: empresaSelecionada,
      width: '10px',
      sortable: true,
    },

  ]

  const optionsStatus = [
    { value: 'True', label: 'CANCELADA' },
    { value: 'False', label: 'EM ESPERA' },
    { value: 'FINALIZADA', label: 'FINALIZADA' }
  ]

  return (

    <Fragment>

      <Modal
        show={show}
        onHide={handleClose}
        class="modal-content"
        size="xl"
        centered
      >

        <HeaderModal
          title={"Edição de Lista de Preços"}
          subTitle={`Lista de Lojas: `}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form action="">
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Data Criação *"}
                    type={"date"}

                    id={"dtCreateListaPreco"}
                    value={""}
                    onChangeModal={""}
                    readOnly={true}
                    {...register("dtCreateListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Data Alteração *"}
                    type={"date"}

                    id={"dtAlterListaPreco"}
                    value={""}
                    onChangeModal={""}

                    {...register("dtAlterListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>

              </div>

              <div className="row mt-4">
                <div className="col-sm-6 col-xl-3">

                  <label htmlFor="">Status Alteração *</label>
                  <Select

                    defaultValue={statusSelecionado}
                    options={optionsStatus.map((item) => {
                      return {
                        value: item.value,
                        label: item.label
                      }
                    })}
                    onChange={handleChangeStatus}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Alteração "}
                    type={"text"}

                    id={"idListaPreco"}
                    value={dadosListaLoja[0]?.listaPreco.IDRESUMOLISTAPRECO}
                    onChangeModal={""}

                    {...register("idListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Lista Alvo de Alteração *"}
                    type={"text"}

                    id={"nomeListaPreco"}
                    value={dadosListaLoja[0]?.listaPreco.NOMELISTA}
                    onChangeModal={""}

                    {...register("nomeListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>

              </div>

              <div className="row mt-4">
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Qtd. Produtos"}
                    type={"text"}

                    id={"idListaPreco"}
                    value={""}
                    onChangeModal={""}

                    {...register("idListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
                  />
                </div>
                <div className="col-sm-6 col-xl-6">
                  <InputFieldModal
                    label={"Responsável "}
                    type={"text"}

                    id={"nomeListaPreco"}
                    value={""}
                    onChangeModal={""}

                    {...register("nomeListaPreco", { required: "Campo obrigatório Informe a Descrição do Grupo Estrutura Mercadológica", })}
                    required={true}
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
              onClickButtonCadastrar
              textButtonCadastrar={"Salvar"}
              corCadastrar={"success"}
            />

          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}