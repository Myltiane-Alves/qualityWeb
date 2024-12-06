import { Fragment } from "react"
import { ButtonTypeModal } from "../../Buttons/ButtonTypeModal"

export const FooterModal = ({ 
  ButtonTypeConfirmar,
  textButtonConfirmar,
  onClickButtonConfirmar,
  corConfirmar,

  ButtonTypeFechar,
  onClickButtonFechar,
  textButtonFechar,
  corFechar,

  ButtonTypeCadastrar,
  onClickButtonCadastrar,
  textButtonCadastrar,
  corCadastrar,

  handleClose,
  handleClick, 
  disabled
}) => {
  return (
    <Fragment >
      <div
        style={{ display: "flex", justifyContent: "end", }}
        className="modal-footer"
        id="footerdeposito"
      >
        {ButtonTypeCadastrar && ( 
          <ButtonTypeCadastrar
            textButton={textButtonCadastrar}
            onClickButtonType={onClickButtonCadastrar}
            cor={corCadastrar}
            tipo="submit"
            disabled={disabled}
          />

        )}
        {ButtonTypeFechar && ( 
          <ButtonTypeFechar
            textButton={textButtonFechar}
            onClickButtonType={onClickButtonFechar}
            cor={corFechar}
            tipo="button"
          />

        )}
        {ButtonTypeConfirmar && ( 
          <ButtonTypeConfirmar
            textButton={textButtonConfirmar}
            onClickButtonType={onClickButtonConfirmar}
            cor={corConfirmar}
            tipo="button"
          />

        )}
        {/* <ButtonTypeModal
          textButton={"Cadastrar "}
          onClickButtonType={handleClick}
          cor="success"
          tipo="button"
        />
        <ButtonTypeModal textButton={"Fechar"} onClickButtonType={handleClose} cor="secondary" tipo="button" /> */}
      </div>
    </Fragment>
  )
}