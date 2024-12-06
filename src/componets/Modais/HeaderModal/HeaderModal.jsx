import { Fragment } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { ButtonType } from "../../Buttons/ButtonType"


export const HeaderModal = ({ 
  title,
  subTitle, 
  handleClose, 
  textButton,
  onClickButtonType,
  id,
  className,
  cor,
  tipo,
  Icon,
  iconColor,
  iconSize
}) => {
  let btnClasses = "btn waves-effect waves-themed";

  if(cor === "primary") {
    btnClasses += " btn-primary";
  } else if(cor === "secondary") {
    btnClasses += " btn-secondary";
  } else if (cor === "success") {
    btnClasses += " btn-success";
  } else if (cor === "danger") {
    btnClasses += " btn-danger";
  } else if (cor === "warning") {
    btnClasses += " btn-warning";
  } else if (cor === "info") {
    btnClasses += " btn-info";
  }

  const typeButton = tipo === "button" ? "button" : "submit"

  return (
    <Fragment >
      <div className="modal-header">
        <h4
          style={{ fontWeight: "bold", color: "#000", fontSize: "20px" }}
        >
          {/* Adiantamento de Salário Principal   */}
          {title}
          <small
            style={{ fontWeight: 500, color: "#666666" }}
          >
            {subTitle}
            {/* Lançar Adiantamento de Salário */}
          </small>
        </h4>
        {/* <ButtonType
          nome=""
          onClickButtonType={handleClose}
          cor=""
          tipo="button"
          Icon={AiOutlineCloseCircle}
          iconColor="#ff0000"
          iconSize={30}
        /> */}
        <button
         
         id={id}
         className={`${btnClasses} ${className}`}
         type={typeButton}
         onClick={handleClose}
       >
         <AiOutlineCloseCircle size={"32px"}  color={"#ff0000"} />
         

         {textButton}
        
       </button>

      </div>
    </Fragment>
  )
}