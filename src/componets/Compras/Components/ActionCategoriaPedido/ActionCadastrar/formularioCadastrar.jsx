import { Fragment } from "react"
import { InputFieldModal } from "../../../../Buttons/InputFieldModal";
import { useForm } from "react-hook-form"
import Select from 'react-select';
import { FooterModal } from "../../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal";
import { useCadastrarCategoriaPedido } from "../../../hooks/useCadastrarCategoriaPedido";

export const FormularioCadastrar = ({handleClose}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {
        optionsStatus,
        optionsTipoCategoria,
        statusSelecionado,
        setStatusSelecionado,
        descricao,
        setDescricao,
        tipoCategoriaSelecionado,
        setTipoCategoriaSelecionado,
        cadastrar
    } = useCadastrarCategoriaPedido();

    return (
        <Fragment>
            <form onSubmit={handleSubmit(cadastrar)}>
                <div className="form-group">
                    <div className="row">

                        <div className="col-sm-6 col-lg-6">

                            <InputFieldModal
                                label={"Descrição *"}
                                type={"text"}
                                id={"desccatpedido"}
                                value={descricao}
                                onChangeModal={(e) => setDescricao(e.target.value)}
                                {...register("desccatpedido", { required: "Campo obrigatório Informe a Descrição da Categoria do Pedido.", })}
                                required={true}
                                placeholder={"Informe a Descrição da Categoria do Pedido."}
                                readOnly={false}
                            />
                        </div>
                        <div className="col-sm-6 col-lg-6">

                            <label htmlFor="">Tipo Categoria *</label>
                            <Select
                                value={tipoCategoriaSelecionado}
                                options={optionsTipoCategoria.map((item) => {
                                    return {
                                        value: item.value,
                                        label: item.label
                                    }
                                })}
                                onChangeModal={(e) => setTipoCategoriaSelecionado(e)}
                            />
                        </div>

                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-lg-6">

                            <label htmlFor="">Situação *</label>
                            <Select
                                defaultValue={statusSelecionado}
                                options={optionsStatus.map((item) => {
                                    return {
                                        value: item.value,
                                        label: item.label
                                    }
                                })}
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
                    onClickButtonCadastrar={cadastrar}
                    textButtonCadastrar={"Incluir"}
                    corCadastrar={"success"}
                />
            </form>
        </Fragment>
    )
}