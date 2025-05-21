import { Fragment } from "react"
import { useForm } from "react-hook-form";
import { useCadastroClienteVoucherCPF } from "../../Hooks/useCadastroClienteVoucherCPF";
import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal";
import { FooterModal } from "../../../Modais/FooterModal/footerModal";
import { InputFieldModal } from "../../../Buttons/InputFieldModal";
import { mascaraCPF } from "../../../../utils/formatCPF";
import { mascaraTelefone } from "../../../../utils/mascaraTelefone";
import Select from 'react-select';
import { dataFormatada } from "../../../../utils/dataFormatada";

export const FormularioCadastroCPF = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {
    idCliente,
    tipo,
    dataCadastro,
    cpf,
    nomeClienteRazao,
    sobreNome,
    dataNascimento,
    telefoneCliente,
    numeroComercial,
    email,
    tipoIndicacaoIE,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    nuIBGE,
    cidade,
    estado,
    cpfFuncionario,
    empresa,
    usuarioLogado,
    setIdCliente,
    setTipo,
    setDataCadastro,
    setCpf,
    setNomeClienteRazao,
    setSobreNome,
    setDataNascimento,
    setTelefoneCliente,
    setNumeroComercial,
    setEmail,
    setTipoIndicacaoIE,
    setCep,
    setEndereco,
    setNumero,
    setComplemento,
    setBairro,
    setNuIBGE,
    setCidade,
    setEstado,
    setCpfFuncionario,
    setEmpresa,
    InscricaoEstadual,
    onSubmit,
  } = useCadastroClienteVoucherCPF();
  
  return (
    <Fragment>
      <form >

        <div className="form-group" >
          <div className="row mt-2" style={{ width: '100%' }}>

            <div className="col-sm-2 col-md-2 col-xl-1">
              <InputFieldModal
                label={"ID"}
                type="text"
                id={"idClienteEmpresa"}
                readOnly={true}
                value={idCliente}
                onChangeModal={(e) => setIdCliente(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="col-sm-2 col-md-2 col-xl-1">
              <InputFieldModal
                label={"Tipo *"}
                type="text"
                id={"tipoClienteEmpresa"}
                readOnly={true}
                placeholder={"CPF"}
                value={tipo}
                onChangeModal={(e) => setTipo(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="col-sm-3 col-md-3 col-xl-2">
              <InputFieldModal
                label={"Data do Cadastro *"}
                type="date"
                id={"dataCadastro"}
                value={dataCadastro}
                onChangeModal={(e) => setDataCadastro(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                readOnly={true}
              />
            </div>

            <div className="col-sm-5 col-md-2 col-xl-2" >
              <InputFieldModal
                label={"CPF*"}
                type="text"
                id={"CPFCNPJ"}
                value={mascaraCPF(cpf)}
                onChangeModal={(e) => setCpf(e.target.value)}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                readOnly={cpf.length >= 10 }
              />  
            </div>


            <div className="col-sm-6 col-md-3 col-xl-3">
              <InputFieldModal
                label={"Nome*"}
                type="text"
                id={"nome"}
                value={nomeClienteRazao}
                onChangeModal={(e) => setNomeClienteRazao(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="col-sm-6 col-md-3 col-xl-3">
              <InputFieldModal
                label={"Sobrenome*"}
                type="text"
                id={"sobrenome"}
                value={sobreNome}
                onChangeModal={(e) => setSobreNome(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>


          <div className="row mt-3">

            <div className="col-sm-3 col-md-2 col-xl-2">
              <InputFieldModal
                label={"Data de Nascimento*"}
                type="date"
                id={"dataNascimento"}
                value={dataNascimento}
                onChangeModal={(e) => setDataNascimento(e.target.value)}
              />
            </div>


            <div className="col-sm-4 col-md-3 col-xl-3">
              <InputFieldModal
                label={"Telefone"}
                type="text"
                id={"TelefoneCliente"}
                value={mascaraTelefone(telefoneCliente)}
                onChangeModal={(e) => setTelefoneCliente(e.target.value)}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                {...register("telefoneCliente", { required: true })}
              />
            </div>

            <div className="col-sm-5 col-md-4 col-xl-4">
              <InputFieldModal
                label={"E-mail"}
                type="email"
                id={"email"}
                value={email}
                onChangeModal={(e) => setEmail(e.target.value)}
                styleInputFieldModal={{  }}
                {...register("email", { 
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "E-mail inválido"
                  } 
                })}
              />
            </div>

            <div className="col-sm-5 col-md-3 col-xl-3">
              
              <label> Tipo Indicação IE </label>
              <Select
                options={InscricaoEstadual.map((item) => {
                    return {
                      value: item.value,
                      label: item.label
                    }
                })}
                value={tipoIndicacaoIE}
                onChange={(e) => setTipoIndicacaoIE(e)}
                isDisabled={true}
              />
            
            </div>

          </div>
        </div>

        <div className="form-group" >

          <div className="row">
            <div className="col-sm-2 col-md-2 col-xl-2">
              <InputFieldModal
                label={"CEP*"}
                type="text"
                id={"NuCEP"}
                value={cep}
                onChangeModal={(e) => setCep(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="col-sm-4 col-md-4 col-xl-4">
              <InputFieldModal
                label={"Endereço*"}
                type="text"
                id={"Endereco"}
                value={endereco}
                onChangeModal={(e) => setEndereco(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="col-sm-2 col-md-2 col-xl-2">
              <InputFieldModal
                label={"Número*"}
                type="text"
                id={"NuEndereco"}
                value={numero}
                onChangeModal={(e) => setNumero(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="col-sm-4 col-md-4 col-xl-4">
              <InputFieldModal
                label={"Complemento"}
                type="text"
                id={"Complemento"}
                value={complemento}
                onChangeModal={(e) => setComplemento(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>

          <div className="row mt-3" >

            <div className="col-sm-4 col-md-4 col-xl-4">
              <InputFieldModal
                label={"Bairro*"}
                type="text"
                id={"Bairro"}
                value={bairro}
                onChangeModal={(e) => setBairro(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                readOnly={true}
              />
            </div>

            <div className="col-sm-2 col-md-2 col-xl-2">
              <InputFieldModal
                label={"Nº IBGE*"}
                type="text"
                id={"NuIBGE"}
                value={nuIBGE}
                onChangeModal={(e) => setNuIBGE(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                readOnly={true}
              />
            </div>

            <div className="col-sm-4 col-md-4 col-xl-4">
              <InputFieldModal
                label={"Cidade*"}
                type="text"
                id={"Cidade"}
                value={cidade}
                onChangeModal={(e) => setCidade(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                readOnly={true}
              />
            </div>

            <div className="col-sm-2 col-md-2 col-xl-2">
              <InputFieldModal
                label={"Estado*"}
                type="text"
                id={"estado"}
                value={estado}
                onChangeModal={(e) => setEstado(e.target.value.toUpperCase())}
                styleInputFieldModal={{ textTransform: 'uppercase' }}
                readOnly={true}
              />
            </div>

          </div>
        </div>
      </form>

      <FooterModal
        ButtonTypeConfirmar={ButtonTypeModal}
        textButtonConfirmar={"Confirmar"}
        onClickButtonConfirmar={handleSubmit(onSubmit)}
        corConfirmar="success"

        ButtonTypeFechar={ButtonTypeModal}
        onClickButtonFechar={handleClose}
        textButtonFechar={"Fechar"}
        corFechar="secondary"
      />
    </Fragment>
  )
}