import { Fragment } from "react"
import { FooterModal } from "../../../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../../../Buttons/ButtonTypeModal";
import { InputFieldModal } from "../../../../Buttons/InputFieldModal";

export const Formulario = ({ }) => {
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>

        

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-10">

                            <InputFieldModal
                                label={"Empresa"}
                                type="text"
                                value={usuarioLogado?.NOFANTASIA ?? empresa}
                                onChangeModal={(e) => setEmpresa(e.target.value)}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-3">

                            <InputFieldModal
                                label={"Data Depósito"}
                                type="date"
                                id="dtdeposito"
                                value={data}
                                onChangeModal={(e) => setData(e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-sm-6 col-xl-3">

                            <InputFieldModal
                                label={"Hora Depósito"}
                                type="datetime-local"
                                id="hrdeposito"
                                value={hora}
                                onChangeModal={(e) => setHora(e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-sm-6 col-xl-6">

                            <label htmlFor="">Conta *</label>
                            <Select
                                defaultValue={contaSelecionada}
                                options={[
                                    { value: '', label: 'Selecione...' },
                                    ...dadosContaBanco.map((item) => {
                                        return {
                                            value: item.IDCONTABANCO,
                                            label: `${item.DSCONTABANCO} `
                                        }
                                    })]}
                                onChange={handleChangeConta}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-8">

                            <InputFieldModal
                                label={"Histórico"}
                                type="text"
                                id="historico"
                                value={historico}
                                onChangeModal={(e) => setHistorico(e.target.value)}
                                {...register("historico", { required: "Campo obrigatório Informe o Histórico", })}
                            />
                        </div>
                        <div className="col-sm-6 col-xl-4">

                            <InputFieldModal
                                label={"Nº Doc Depósito"}
                                type="text"
                                id="docDeposito"
                                readOnly={false}
                                value={documento}
                                onChangeModal={(e) => setDocumento(e.target.value)}
                                {...register("docDeposito", { required: "Campo obrigatório Informe o Nº Doc Depósito", })}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-xl-4">

                            <InputFieldModal
                                label={"Valor Depósito"}
                                type="number"
                                id="vrDeposito"
                                value={vrDeposito}
                                onChangeModal={(e) => {
                                    const valor = e.target.value.replace(".", "").replace(",", ".");
                                    setVrDeposito(valor);
                                }}
                                {...register("vrDeposito", { required: "Campo obrigatório Informe o Valor do Depósito" })}
                                readOnly={false}
                            />
                        </div>
                        <div className="col-sm-6 col-xl-4">

                            <InputFieldModal
                                label={"Data Movimento de Caixa"}
                                type="date"
                                id="dtMovimentoCaixa"
                                value={dataMovimento}
                                onChangeModal={(e) => setDataMovimento(e.target.value)}
                                {...register("dtMovimentoCaixa", { required: "Campo obrigatório Informe a Data Movimento", })}
                                readOnly={false}
                            />
                        </div>
                        <div className="col-sm-6 col-xl-4">

                            <InputFieldModal
                                label={"Hora Movimento de Caixa"}
                                type="datetime-local"
                                id="hrMovimentoCaixa"
                                value={horaMovimento}
                                onChangeModal={(e) => setHoraMovimento(e.target.value)}
                                {...register("hrMovimentoCaixa", { required: "Campo obrigatório Informe a Hora Movimento", })}
                                readOnly={false}
                            />


                        </div>
                    </div>
                </div>

                <FooterModal
                    ButtonTypeCadastrar={ButtonTypeModal}
                    onClickButtonCadastrar={onSubmit}
                    textButtonCadastrar={"Cadastrar Depósito"}
                    corCadastrar={"success"}

                    ButtonTypeFechar={ButtonTypeModal}
                    onClickButtonFechar={handleClose}
                    textButtonFechar={"Fechar"}
                    corFechar={"secondary"}
                />
            </form>
        </Fragment>
    )
}