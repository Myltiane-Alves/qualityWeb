import React, { Fragment } from 'react';

export const ButtonType = ({ 
  textButton,
  onClickButtonType,
  id,
  className,
  cor,
  tipo,
  Icon,
  iconColor,
  iconSize,
  disabledBTN
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

  const typeButton = tipo === "button" ? "button" : "submit";


  return (
    <Fragment>
      <div className="">

        <button
          id={id}
          className={`${btnClasses} ${className}`}
          type={typeButton}
          onClick={() => onClickButtonType()}
          style={{ marginRight: "10px", marginLeft: "10px", marginTop: "20px" }}
          disabled={disabledBTN}
        >
          {Icon && <Icon size={iconSize}  color={iconColor} />}

          {textButton}
        </button>
      </div>
    </Fragment>
  );
};

