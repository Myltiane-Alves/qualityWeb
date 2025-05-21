import { Fragment } from "react"
import { FooterModal } from "../../../../Modais/FooterModal/footerModal"
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal"
import { useEditarTecido } from "../../../hooks/useEditarTecidos"
import { useForm } from "react-hook-form"
import { InputFieldModal } from "../../../../Buttons/InputFieldModal"
import Select from 'react-select';

export const FormularioEditarTecido = ({ show, handleClose, dadosDetalheTipoTecido }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {
        descricao,
        setDescricao,
        statusSelecionado,
        setStatusSelecionado,
        usuarioLogado,
        ipUsuario,
        navigate,
        getIPUsuario,
        optionsStatus,
        onSubmit,
    } = useEditarTecido({dadosDetalheTipoTecido})

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-6">
                            <InputFieldModal
                                label={"Descrição *"}
                                type={"text"}
                                id={"DSTIPOTEIDO"}
                                value={descricao}
                                onChangeModal={(e) => setDescricao(e.target.value)}

                                {...register("DSTIPO TEIDO", { required: "Campo obrigatório Informe a Descrição do Tipo de Tecido", })}
                                required={true}
                            />
                        </div>

                        <div className="col-sm-6 col-xl-6">

                            <label htmlFor="">Situação *</label>
                            <Select
                                options={optionsStatus.map((item) => {
                                    return {
                                        value: item.value,
                                        label: item.label
                                    }
                                })}
                                value={statusSelecionado}
                                onChange={(e) => setStatusSelecionado(e)}
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
                    textButtonCadastrar={"Salvar"}
                    corCadastrar={"success"}
                />

            </form>
        </Fragment>
    )
}