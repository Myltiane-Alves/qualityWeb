import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from '../../../Modais/HeaderModal/HeaderModal';
import { InputFieldModal } from '../../../Buttons/InputFieldModal';
import { FooterModal } from '../../../Modais/FooterModal/footerModal';
import { ButtonTypeModal } from '../../../Buttons/ButtonTypeModal';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';
import { get, post } from '../../../../api/funcRequest';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ActionCadastrarRelatorioBIModal = ({show, handleClose}) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [linkRelatorioBI, setLinkRelatorioBI] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState([])
  const [relatorioSelecionado, setRelatorioSelecionado] = useState([])
  const [statusSelecionado, setStatusSelecionado] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);
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
    const response = await axios.get('http://ipwho.is/');
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  };



  const { data: dadosEmpresas = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresa } = useQuery(
    'listaEmpresasIformatica',
    async () => {
      const response = await get(`/listaEmpresasIformatica`);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000
    }
  );

  const { data: dadosBI = [], error: errorListaBI, isLoading: isLoadingBI, refetch } = useQuery(
    'relatorioInformaticaBI?status=True',
    async () => {
      const response = await get(`/relatorioInformaticaBI?status=True`);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000
    }
  );

  const onSubmit = async (data) => {
    if(!empresaSelecionada || !relatorioSelecionado || !statusSelecionado || !linkRelatorioBI) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Preencha todos os campos!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const postData = {
      IDRELATORIOBI: relatorioSelecionado,
      IDEMPRESA: empresaSelecionada,
      LINK: linkRelatorioBI,
      STATIVO: statusSelecionado,

    }

    try {
      const response = await post('/criarlinkRelatorioBI', postData)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Relatório atualizado com sucesso!',
        customClass: {
          container: 'custom-swal', 
        },
        showConfirmButton: false,
        timer: 1500
      })
  
      const textDados = JSON.stringify(postData);
      let textoFuncao = 'INFORMATICA/ATUALIZAR LINK RELATORIO BI';
  
      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario,
      };
  
      const responsePost = await post('/log-web', createData);
  
      return responsePost.data;
       

    } catch (error) {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro ao atualizar Relatório!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });
    }

     
  }


  const optionsStatus = [
    { value: "True", label: "Ativo" },
    { value: "False", label: "Inativo" },
  ]

  return (
    <Fragment>
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"

    >

      <HeaderModal
        title={"Link Relatório BI"}
        subTitle={"Cadastrar "}
        handleClose={handleClose}
      />


      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-xl-">

                <label className="form-label" htmlFor={""}>Filíal</label>

                <Select
                  closeMenuOnSelect={false}
                  options={dadosEmpresas.map((item) => ({
                    value: item.IDEMPRESA,
                    label: item.NOFANTASIA
                  }))}
                  value={dadosEmpresas.find(option => option.value === empresaSelecionada)}
                  onChange={(selectedOption) => setEmpresaSelecionada(selectedOption.value)}
                />
              </div>

              <div className="col-sm-6 col-xl-6">
                <label className="form-label" htmlFor={""}>Relatório</label>

                <Select
                  closeMenuOnSelect={false}
                  options={dadosBI.map((item) => ({
                    value: item.IDRELATORIOBI,
                    label: item.DSRELATORIOBI
                  }))}
                  value={dadosBI.find(option => option.value === relatorioSelecionado)}
                  onChange={(selectedOption) => setRelatorioSelecionado(selectedOption.value)}
                />
              </div>


            </div>
            <div className="row mt-4">
              <div className="col-sm-6 col-xl-3">
                <label className="form-label" htmlFor={""}>Status</label>
            
                <Select
                  closeMenuOnSelect={false}
                  options={optionsStatus}
                  value={optionsStatus.find((obj) => obj.value === statusSelecionado)}
                  onChange={(selectedOption) => setStatusSelecionado(selectedOption.value)}
                />
              </div>
              <div className="col-sm-6 col-xl-12">

                <InputFieldModal
                  label={"Link "}
                  type="text"
                  id={"linkrelatoriobi"}
                  value={linkRelatorioBI}
                  onChangeModal={(e) => setLinkRelatorioBI(e.target.value)}
                  {...register("link", { required: "Campo obrigatório Informe o Link do Relatório", })}
                />
                {errors.link && <span className="text-danger">{errors.link.message}</span>}
              </div>

            </div>
          </div>
      
        </form>
      </Modal.Body>

      <FooterModal
      
        ButtonTypeCadastrar={ButtonTypeModal}
        onClickButtonCadastrar={onSubmit}
        textButtonCadastrar={"Cadastrar"}
        corCadastrar={"success"}

        ButtonTypeFechar={ButtonTypeModal}
        textButtonFechar={"Fechar"}
        onClickButtonFechar={handleClose}
        corFechar="secondary"

      />
    </Modal>
  </Fragment>
  )
}