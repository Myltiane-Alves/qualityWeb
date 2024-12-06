import React, { Fragment, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { InputFieldModal } from "../Buttons/InputFieldModal";
import { FooterModal } from "../Modais/FooterModal/footerModal";
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal";
import { InputSelect } from "../Buttons/InputSelect";
import { ButtonTypeModal } from "../Buttons/ButtonTypeModal";
import { get } from "../../api/funcRequest";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const InformaticaActionImportarLinkRelatorioBiModal = ({ show, handleClose }) => {
  const [linkRelatorioBI, setLinkRelatorioBI] = useState('');
  const [dadosEmpresas, setDadosEmpresas] = useState([]);
  const [dadosBI, setDadosBI] = useState([]);
  const animatedComponents = makeAnimated();

  const getListaRelatorioBI = async (empresaSelecionada = '', ) => {

    try {                                                                                 
      const response = await get(`/linkRelatorioBI?idRelatorio=${relatorioSelecionado}&idLoja=${empresaSelecionada}`)
      if (response.data) {
        setDadosBI(response.data)
      }
      return response.data;

    } catch (error) {
      console.log('Erro ao buscar empresas: ', error)
    }
  }

  const options = [
    { value: 0, label: "Todos" },
    { value: 1, label: "Administrador" },
  ]

  const optionsStatus = [
    { value: "True", label: "Ativo" },
    { value: "False", label: "Inativo" },
  ]
  return (

    <Fragment>
      <Modal show={show} handleClose={handleClose} size="lg">
        <HeaderModal
          title={"Link Relatório BI"}
          subTitle={"Importar Relatório Link BI"}
          handleClose={handleClose}
        />

        <Modal.Body>

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
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-xl-12">

                    <InputFieldModal
                      label={"Filial "}
                      type="text"
                      id={"linkrelatoriobi"}
                      readOnly={true}
                      value={dadosBI && dadosBI[0]?.NOFANTASIA}
                    />
                  </div>
                  <div className="col-sm-6 col-xl-9">
                    <label className="form-label" htmlFor={""}>Relatório</label>

                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={''}
                      isMulti
                      options={dadosBI.map((item) => ({
                        value: item.IDRELATORIOBI,
                        label: item.DSRELATORIOBI
                      }))}
                    />
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <label className="form-label" htmlFor={""}>Status</label>

                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={dadosBI && dadosBI[0]?.STATIVO}
                      isMulti
                      options={optionsStatus}
                    />
                  </div>
                  <div className="col-sm-6 col-xl-12">

                    <InputFieldModal
                      label={"Link "}
                      type="text"
                      id={"linkrelatoriobi"}
                      value={linkRelatorioBI || (dadosBI.length > 0 && dadosBI[0]?.LINK) || ''}
                      onChangeModal={(e) => setLinkRelatorioBI(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <FooterModal
              ButtonTypeConfirmar={ButtonTypeModal}
              textButtonConfirmar={"Atualizar"}
              onClickButtonConfirmar
              corCadastrar={"success"}

              ButtonTypeFechar={ButtonTypeModal}
              textButtonFechar={"Fechar"}
              onClickButtonFechar={handleClose}
              corFechar="secondary"

            />
          </Modal>
          <FooterModal handleClose={handleClose} />
        </Modal.Body>
      </Modal>

    </Fragment>
  )
}