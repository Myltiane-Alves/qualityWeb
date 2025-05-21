import { Fragment } from "react"
import { InputFieldModal } from "../../../../Buttons/InputFieldModal"
import { FooterModal } from "../../../../Modais/FooterModal/footerModal"
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal"
import { useCadastrarBonificaoca } from "../hooks/useCadastrarBonificacao"
import Select from 'react-select'
import { useForm } from "react-hook-form"

export const FormularioCadastrar = ({ handleClose, usuarioLogado, funcionarioSelecionado, setFuncionarioSelecionado, optionsModulos }) => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const {
        funcionario,
        setFuncionario,
        valorBonificao,
        setValorBonificacao,
        tipoSelecionado,
        txtHistorico,
        OptionsStatus,
        setTipoSelecionado,
        setTxtHistorico,
        dadosFuncionarios,
        onSubmit,
    } = useCadastrarBonificaoca({handleClose, usuarioLogado, funcionarioSelecionado, setFuncionarioSelecionado, optionsModulos});

    return (
        <Fragment>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-12">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                options={dadosFuncionarios.map((item) => {
                                    return { value: item.IDFUNCIONARIO, label: ` ${item.NOFUNCIONARIO}` }
                                })}
                                defaultValue={funcionarioSelecionado}
                                onChange={(e) => setFuncionarioSelecionado(e.value)}
                                // value={funcionarioSelecionado}
                            />

                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-6">
                            <label htmlFor="">Tipo</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                // value={tipoSelecionado}
                                defaultValue={tipoSelecionado}
                                onChange={(e) => setTipoSelecionado(e.value)}
                                options={OptionsStatus}
                            />
                        </div>
                        <div className="col-sm-6 col-xl-6">
                            <InputFieldModal
                                type="text"
                                className="form-control input"
                                label="Valor (R$)"
                                value={valorBonificao}
                                onChangeModal={(e) => setValorBonificacao(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="">
                    
                    <InputFieldModal
                        id="VrValorDesconto"
                        type="text"
                        className="form-control input"
                        label="Histórico"
                        placeholder="digite o histórico do depósito..."
                        value={txtHistorico}
                        onChangeModal={(e) => setTxtHistorico(e.target.value)}
                    />
                 
                </div>
                <FooterModal

                    ButtonTypeFechar={ButtonTypeModal}
                    onClickButtonFechar={handleClose}
                    textButtonFechar={"Fechar"}
                    corFechar={"secondary"}

                    ButtonTypeCadastrar={ButtonTypeModal}
                    onClickButtonCadastrar={handleSubmit(onSubmit)}
                    textButtonCadastrar={"Cadastrar"}
                    corCadastrar={"success"}

                />
            </form>
        </Fragment>
    )
}