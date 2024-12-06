import { Fragment } from "react"
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { put } from "../../../../api/funcRequest";
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";



export const ActionUpdateFuncionarioModal = ({ show, handleClose, dadosAtualizarFuncionarios, optionsEmpresas }) => {

  const funcoes = [
    {
      id: 0,
      label: "Selecione...",
      value: "Selecione..."
    },
    {
      id: 1,
      label: "Advogado",
      value: "Advogado"
    },
    {
      id: 2,
      label: "Analista De Rh",
      value: "Analista De Rh"
    },
    {
      id: 3,
      label: "Analista De Rh Pleno",
      value: "Analista De Rh Pleno"
    },
    {
      id: 4,
      label: "Analista De Suporte",
      value: "Analista De Suporte"
    },
    {
      id: 5,
      label: "Ass Controle De Qualidade Trainee",
      value: "Ass Controle De Qualidade Trainee"
    },
    {
      id: 6,
      label: "Assistente",
      value: "Assistente"
    },
    {
      id: 7,
      label: "Assistente De Atendimento (PCD)",
      value: "Assistente De Atendimento (PCD)"
    },
    {
      id: 8,
      label: "Assistente De Compras Trainee",
      value: "Assistente De Compras Trainee"
    },
    {
      id: 9,
      label: "Assistente De Loja",
      value: "Assistente De Loja"
    },
    {
      id: 10,
      label: "Assistente De Loja Pleno",
      value: "Assistente De Loja Pleno"
    },
    {
      id: 11,
      label: "Assistente De Loja-PCD",
      value: "Assistente De Loja-PCD"
    },
    {
      id: 12,
      label: "Assistente De Rh",
      value: "Assistente De Rh"
    },
    {
      id: 13,
      label: "Assistente Dept Fiscal",
      value: "Assistente Dept Fiscal"
    },
    {
      id: 14,
      label: "Aux De Servicos Gerais",
      value: "Aux De Servicos Gerais"
    },
    {
      id: 15,
      label: "Aux Serv Gerais",
      value: "Aux Serv Gerais"
    },
    {
      id: 16,
      label: "Auxiliar Administrativo",
      value: "Auxiliar Administrativo"
    },
    {
      id: 17,
      label: "Auxiliar De Deposito",
      value: "Auxiliar De Deposito"
    },
    {
      id: 18,
      label: "Auxiliar De Loja-PCD",
      value: "Auxiliar De Loja-PCD"
    },
    {
      id: 19,
      label: "Auxiliar De Servicos Gerais",
      value: "Auxiliar De Servicos Gerais"
    },
    {
      id: 20,
      label: "Auxiliar Juridico",
      value: "Auxiliar Juridico"
    },
    {
      id: 21,
      label: "Balconista",
      value: "Balconista"
    },
    {
      id: 22,
      label: "CLIENTE",
      value: "CLIENTE"
    },
    {
      id: 23,
      label: "Carga E Descarga",
      value: "Carga E Descarga"
    },
    {
      id: 24,
      label: "Pedido Compras",
      value: "Pedido Compras"
    },
    {
      id: 25,
      label: "Comprador Jr",
      value: "Comprador Jr"
    },
    {
      id: 26,
      label: "Compradora",
      value: "Compradora"
    },
    {
      id: 27,
      label: "Compradora Junior",
      value: "Compradora Junior"
    },
    {
      id: 28,
      label: "Compradora Pleno II",
      value: "Compradora Pleno II"
    },
    {
      id: 29,
      label: "Compradora Trainee",
      value: "Compradora Trainee"
    },
    {
      id: 30,
      label: "Conferente",
      value: "Conferente"
    },
    {
      id: 31,
      label: "Coordenador De Logistica",
      value: "Coordenador De Logistica"
    },
    {
      id: 32,
      label: "Coordenador Dept Fiscal",
      value: "Coordenador Dept Fiscal"
    },
    {
      id: 33,
      label: "Coordenador(a) De Arquivo",
      value: "Coordenador(a) De Arquivo"
    },
    {
      id: 34,
      label: "Costureira",
      value: "Costureira"
    },
    {
      id: 35,
      label: "Cozinheira",
      value: "Cozinheira"
    },
    {
      id: 36,
      label: "DIRETORA",
      value: "DIRETORA"
    },
    {
      id: 37,
      label: "Encarregado Administrativo",
      value: "Encarregado Administrativo"
    },
    {
      id: 38,
      label: "Encarregado De Obras",
      value: "Encarregado De Obras"
    },
    {
      id: 39,
      label: "Encarregado De Transportes",
      value: "Encarregado De Transportes"
    },
    {
      id: 40,
      label: "Encarregado Setor",
      value: "Encarregado Setor"
    },
    {
      id: 41,
      label: "Estoquista",
      value: "Estoquista"
    },
    {
      id: 42,
      label: "Financeiro",
      value: "Financeiro"
    },
    {
      id: 43,
      label: "Fiscal De Loja",
      value: "Fiscal De Loja"
    },
    {
      id: 44,
      label: "Fiscal De Loja 0004",
      value: "Fiscal De Loja 0004"
    },
    {
      id: 45,
      label: "Gerente",
      value: "Gerente"
    },
    {
      id: 46,
      label: "Gestor De Secao",
      value: "Gestor De Secao"
    },
    {
      id: 47,
      label: "Gestor De Secao Pleno-Nivel 2",
      value: "Gestor De Secao Pleno-Nivel 2"
    },
    {
      id: 48,
      label: "Gestor(a) De Secao",
      value: "Gestor(a) De Secao"
    },
    {
      id: 49,
      label: "Marketing",
      value: "Marketing"
    },
    {
      id: 50,
      label: "Mecanico",
      value: "Mecanico"
    },
    {
      id: 51,
      label: "Menor Aprendiz",
      value: "Menor Aprendiz"
    },
    {
      id: 52,
      label: "Motorista",
      value: "Motorista"
    },
    {
      id: 53,
      label: "Operador De Caixa",
      value: "Operador De Caixa"
    },
    {
      id: 54,
      label: "Operador(a) De Caixa",
      value: "Operador(a) De Caixa"
    },
    {
      id: 55,
      label: "Operadora De Caixa",
      value: "Operadora De Caixa"
    },
    {
      id: 56,
      label: "Prevencao e Perda",
      value: "Prevencao e Perda"
    },
    {
      id: 57,
      label: "Recepcionista",
      value: "Recepcionista"
    },
    {
      id: 58,
      label: "Socio Administrador",
      value: "Socio Administrador"
    },
    {
      id: 59,
      label: "Sub Gerente",
      value: "Sub Gerente"
    },
    {
      id: 60,
      label: "Supervisor",
      value: "Supervisor"
    },
    {
      id: 61,
      label: "Supervisor De Compras",
      value: "Supervisor De Compras"
    },
    {
      id: 62,
      label: "TI",
      value: "TI"
    },
    {
      id: 63,
      label: "Tecnico De Informatica",
      value: "Tecnico De Informatica"
    },
    {
      id: 64,
      label: "Tecnico(a) De Arquivo",
      value: "Tecnico(a) De Arquivo"
    },
    {
      id: 65,
      label: "Vendedor",
      value: "Vendedor"
    },
    {
      id: 66,
      label: "Vendedora",
      value: "Vendedora"
    }
  ]

  const localizacao = [
    {
      id: 1,
      label: "Loja",
      value: "True"
    },
    {
      id: 2,
      label: "Escritório",
      value: "False"
    }
  ]

  const situacao = [
    {
      id: 1,
      label: "Ativo",
      value: "True"
    },
    {
      id: 2,
      label: "Inativo",
      value: "False"
    }
  ]

  const onSubmit = async (data) => {
    const postData = {
      DATAULTIMAALTERACAO,
      STATIVO,
      DATA_DEMISSAO,
      ID

    }

    const response = await put('/inativarFuncionario', postData)
      .then(response => {

 
        console.log(response, 'despesa cadastrada com sucesso!')
      })
    alert('O formulário foi enviado com sucesso!')

      .catch(error => {
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        console.log(error)
      })

  }

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
          title={"Dados do Funcionário"}
          subTitle={"Cadastrar ou Atualizar Informações do Funcionário"}
          handleClose={handleClose}
        />


        <Modal.Body>

          <div className="form-group">

            <div className="row">
              <div className="col-sm-6 col-xl-4">
                <label className="form-label" htmlFor="empresaFuncionario">Empresa</label>

                <Select
                  className="basic-single"
                  classNamePrefix={"select"}
                  options={optionsEmpresas.map((item) => ({
                    value: item.IDEMPRESA,
                    label: item.NOFANTASIA

                  }))}
                  defaultValue={dadosAtualizarFuncionarios[0]?.NOFANTASIA}
                  // onChange={handleChangeEmpresa}
                // isSearchable
                />
              </div>
              <div className="col-sm-6 col-xl-4">

                <InputFieldModal
                  type="select"
                  className="form-control input"
                  readOnly={true}
                  value={dadosAtualizarFuncionarios[0]?.DSFUNCAO}
                  label={"Função"}
                />
                
              </div>
              <div className="col-sm-6 col-xl-4">

                <InputFieldModal
                  type="select"
                  className="form-control input"
                  readOnly={true}
                  value={dadosAtualizarFuncionarios[0]?.DSTIPO}
                  label={"Tipo"}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-4">
                <InputFieldModal
                  type="text"
                  className="form-control input"
                  readOnly={true}
                  label="CPF"
                  value={dadosAtualizarFuncionarios[0]?.NUCPF}
                  onChangeModal

                />
              </div>
              <div className="col-sm-8 col-xl-8">
                <InputFieldModal
                  type="text"
                  className="form-control input"
                  readOnly={true}
                  label="Funcionário"
                  value={dadosAtualizarFuncionarios[0]?.NOFUNCIONARIO}
                  onChangeModal

                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-4 col-xl-2">

                <InputFieldModal
                  type="text"
                  className="form-control input"
                  placeholder={"0,00"}
                  label="% Desconto"
                  value={dadosAtualizarFuncionarios[0]?.PERC}
                  readOnly={true}

                />
              </div>

              <div className="col-sm-4 col-xl-2">
                <InputFieldModal
                  type="text"
                  className="form-control input"
                  readOnly={true}
                  label="Valor"
                  value={dadosAtualizarFuncionarios[0]?.VALORDISPONIVEL}
       

                />
              </div>
              <div className="col-sm-4 col-xl-3">

                <InputFieldModal
                  type="password"
                  className="form-control input"
                  label="Senha"
                  value
                  onChangeModal

                />
              </div>
              <div className="col-sm-4 col-xl-3">
                <InputFieldModal
                  type="password"
                  className="form-control input"
                  label="Repita Senha"
                  value
                  onChangeModal

                />
              </div>
              <div className="col-sm-4 col-xl-2">
                <InputFieldModal
                  type="text"
                  className="form-control input"
                  label="Situação"
                  value={dadosAtualizarFuncionarios[0]?.STATIVO == 'True' ? 'Ativo' : 'Inativo'}
                  readOnly={true}

                />
              </div>
            </div>
          </div>

          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            textButtonFechar={"Fechar"}
            onClickButtonFechar={handleClose}
            corFechar="secondary"

            ButtonTypeCadastrar={ButtonTypeModal}
            textButtonCadastrar={"Atualizar"}
            onClickButtonCadastrar
            corCadastrar="success"

          />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

