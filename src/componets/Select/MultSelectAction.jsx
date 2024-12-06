import { Fragment } from "react"
import Select from 'react-select'
export const MultSelectAction = ({ 
  label,
  nome,
  optionsMultSelect,
  defaultValue,
  value,
  id,
  animatedComponents, 
  isMulti,
  onChange 
}) => {

  return (

    <Fragment >
      <div className="col-sm-6 col-md-4 col-xl-6 mt-4" >
        <label className="form-label" htmlFor={id}>{label}</label>
        

        <Select
          defaultValue={[defaultValue]}
          value={value}
          onChange={onChange}
          components={animatedComponents}
          closeMenuOnSelect={false}
          isMulti={isMulti}
          name={nome}
          options={optionsMultSelect}
          onChange={onChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </Fragment>
  )
}
