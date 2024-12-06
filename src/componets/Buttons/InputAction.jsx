import { Fragment } from "react"

export const InputFieldAction = ({ label, type, id, nome, value, readOnly, placeHolder, onChange }) => {
  return (

    <Fragment>

      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-group">

        <input
          className="form-control"
          id={id}
          type={type}
          name={nome}
          value={value}
          readOnly={readOnly}
          placeHolder={placeHolder}
          onChange={onChange}

        />
      </div>

    </Fragment>
  )
}