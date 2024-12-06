import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from '../../../Modais/HeaderModal/HeaderModal';
import { InputFieldModal } from '../../../Buttons/InputFieldModal';
import { FooterModal } from '../../../Modais/FooterModal/footerModal';
import { ButtonTypeModal } from '../../../Buttons/ButtonTypeModal';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';
import { get, post, put } from '../../../../api/funcRequest';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';

export const ActionCadastrarClienteModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [cpf, setCPF] = useState('')
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [cep, setCEP] = useState('')
  const [uf, setUF] = useState('')
  const [campanhaSelecionada, setCampanhaSelecionada] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [ipUsuario, setIpUsuario] = useState('');
  const [dadosCEP, setDadosCEP] = useState('');
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

  useEffect(() => {
    if (cep.length === 8) {
      getCEP();
    }

  }, [cep]);

  const getCEP = async () => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    if (response.data) {
      setDadosCEP(response.data);
      setEndereco(response.data.logradouro);
      setComplemento(response.data.complemento);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setUF(response.data.uf);
   
    }
    return response.data;
  };

  const { data: dadosCampanha = [], error: errorCampanha, isLoading: isLoadingCampanha, refetch: refetchCampanha } = useQuery(
    'campanha',
    async () => {
      const response = await get(`/campanha`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
 

  const onSubmit = async (data) => {
    if (!cpf || !telefone || !nome ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Preencha os campos! CPF e Telefone e Nome`,
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    const postData = {
      IDCAMPANHA: campanhaSelecionada,
      NOME: nome,
      NUCPFCNPJ: cpf,
      EENDERECO: endereco,
      ECOMPLEMENTO: complemento,
      EBAIRRO: bairro,
      ECIDADE: cidade,
      SGUF: uf,
      NUCEP: cep,
      NUTELEFONE: telefone,
    };

    try {
      const response = await post('/cadastrar-campanha-cliente', postData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });

      const textDados = JSON.stringify(postData);
      let textoFuncao = 'MARKETING/CADASTRO DE CLIENTE';

      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario,
      };

      const responsePost = await post('/log-web', createData);
      handleClose();
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erro ao Cadastrar Cleinte!',
        customClass: {
          container: 'custom-swal',
        },
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };



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
          title={"Atualizar Cliente"}
          subTitle={"Atualizar Cliente"}
          handleClose={handleClose}
        />

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-xl-6">
                  <InputFieldModal
                    label={"Nome Cliente"}
                    type="text"
                    id={"nomecliente"}
                    value={nome}
                    onChangeModal={(e) => setNome(e.value)}
                    {...register("nomeCliente", { required: "Campo obrigatório Informe o Nome", })}
                  />

                  {errors.nomeCliente && <span className="text-danger">{errors.nomeCliente.message}</span>}
                </div>

                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"CPF"}
                    type="text"
                    id={"nrcpf"}
                    value={cpf}
                    onChangeModal={(e) => setCPF(e.value)}
                    {...register("nrcpf", { required: "Campo obrigatório Informe o CPF", })}
                  />
                  {errors.nrcpf && <span className="text-danger">{errors.nrcpf.message}</span>}
                </div>
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Telefone"}
                    type="text"
                    id={"nrtelefone"}
                    value={telefone}
                    onChangeModal={(e) => setTelefone(e.value)}
                    {...register("nrtelefone", { required: "Campo obrigatório Informe o Telefone", })}
                  />
                  {errors.nrtelefone && <span className="text-danger">{errors.nrtelefone.message}</span>}
                </div>


              </div>
              <div className="row">
                <div className="col-sm-6 col-md-6 col-xl-6">
                  <InputFieldModal
                    label={"Endereço"}
                    type="text"
                    id={"enderecoCliente"}
                    value={endereco}
                    onChangeModal={(e) => setEndereco(e.value)}
                    {...register("enderecoCliente", { required: "Campo obrigatório Informe o Endereço", })}
                  />
               
                </div>
                <div className="col-sm-6 col-md-6 col-xl-6">
                  <InputFieldModal
                    label={"Complemento"}
                    type="text"
                    id={"complementoCliente"}
                    value={complemento}
                    onChangeModal={(e) => setComplemento(e.value)}
                    {...register("complementoCliente", { required: "Campo obrigatório Informe o Complemento", })}
                  />
                
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Bairro"}
                    type="text"
                    id={"bairroCliente"}
                    value={bairro}
                    onChangeModal={(e) => setBairro(e.value)}
                    {...register("bairroCliente", { required: "Campo obrigatório Informe o Bairro", })}
                  />

                </div>

                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"Cidade"}
                    type="text"
                    id={"cidadeCliente"}
                    value={cidade}
                    onChangeModal={(e) => setCidade(e.value)}
                    {...register("cidadeCliente", { required: "Campo obrigatório Informe a Cidade", })}
                  />
               
                </div>
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"CEP"}
                    type="text"
                    id={"cepCliente"}
                    value={cep}
                    onChangeModal={(e) => setCEP(e.target.value)}
                    {...register("cepCliente", { required: "Campo obrigatório Informe o CEP", })}
                  />
              
                </div>
                <div className="col-sm-6 col-md-3 col-xl-3">
                  <InputFieldModal
                    label={"UF"}
                    type="text"
                    id={"ufCliente"}                   
                    value={uf}
                    onChangeModal={(e) => setUF(e.value)}
                    {...register("ufCliente", { required: "Campo obrigatório Informe o UF", })}
                  />
             
                </div>

              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6 col-xl-3">
                <label className="form-label" htmlFor={""}>Campanha</label>
                <Select
                  closeMenuOnSelect={false}
                  options={dadosCampanha.map((item, index) => ({
                    contador: index + 1,
                    value: item.IDCAMPANHA,
                    label: `${index + 1} - ${item.DSCAMPANHA} -> ${item.NOFANTASIA}`
                  }
                  ))}
                  value={dadosCampanha.find(option => option.value === campanhaSelecionada)}
                  onChange={(e) => setCampanhaSelecionada(e.value)}
                />
              </div>

            </div>

          </form>
        </Modal.Body>

        <FooterModal
          ButtonTypeConfirmar={ButtonTypeModal}
          textButtonConfirmar={"Atualizar"}
          onClickButtonConfirmar={onSubmit}
          corConfirmar={"success"}

          ButtonTypeFechar={ButtonTypeModal}
          textButtonFechar={"Fechar"}
          onClickButtonFechar={handleClose}
          corFechar="secondary"
        />
      </Modal>
    </Fragment>
  );
};