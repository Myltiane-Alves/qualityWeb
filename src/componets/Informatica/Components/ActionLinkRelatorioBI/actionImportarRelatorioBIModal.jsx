import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from '../../../Modais/HeaderModal/HeaderModal';
import { InputFieldModal } from '../../../Buttons/InputFieldModal';
import { FooterModal } from '../../../Modais/FooterModal/footerModal';
import { ButtonTypeModal } from '../../../Buttons/ButtonTypeModal';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';
import { get } from '../../../../api/funcRequest';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ActionImportarRelatorioBIModal = ({ show, handleClose, relatorioSelecionadoTabela }) => {
  const { register, handleSubmit, errors } = useForm();
  const [statusSelecionado, setStatus] = useState('');
  const [linkRelatorioBI, setLinkRelatorioBI] = useState('');
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
    const postData = {
      IDRELATORIOBI: relatorioSelecionadoTabela?.IDRELATORIOBI,
      IDEMPRESA: relatorioSelecionadoTabela?.IDEMPRESA,
      LINK: linkRelatorioBI,
      STATIVO: 'True',

    }

    const response = await put('/atualizarRelatorio', postData)

      .then(response => {
  
        console.log(response, 'dados atualizados')
      })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Relatório atualizado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })


      .catch(error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Erro ao atualizar Relatório!',
          showConfirmButton: false,
          timer: 1500
        });

        console.log(error)
      })

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
          subTitle={"Cadastrar / Alterar"}
          handleClose={handleClose}
        />


        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
               
                <div className="col-sm-6">
                  <label className="form-label" htmlFor={""}>Relatório</label>

                  <Select
                    closeMenuOnSelect={false}
                    // defaultValue={dadosListaBI[0]?.DSRELATORIOBI}
                    defaultValue={relatorioSelecionadoTabela?.DSRELATORIOBI || ''}
                    isMulti
                    options={dadosBI.map((item) => ({
                      value: item.IDRELATORIOBI,
                      label: item.DSRELATORIOBI
                    }))}
                  />
                </div>
              
      
                
                <div className="col-sm-6">

                  <InputFieldModal
                    label={"Arquivo "}
                    type="file"
                    id={"linkrelatoriobi"}
                    // value={linkRelatorioBI || (dadosListaBI.length > 0 && dadosListaBI[0]?.LINK) || ''}
                    value={linkRelatorioBI}
                    onChangeModal={(e) => setLinkRelatorioBI(e.target.value)}
                  />

                </div>

              </div>
            </div>
            {/* https://app.powerbi.com/view?r=eyJrIjoiZWRkOTVkNmYtNGM2MS00YjVlLTkxYzQtZTcwY2FmN2IxNjQ0IiwidCI6ImRmNDJhNzdjLWVlY2ItNDEyNC1iOTRiLWU4NjhlNmQ5MDkwYSJ9 */}
          </form>
        </Modal.Body>

        <FooterModal
          ButtonTypeConfirmar={ButtonTypeModal}
          textButtonConfirmar={"Importar"}
          onClickButtonConfirmar={handleSubmit(onSubmit)}
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