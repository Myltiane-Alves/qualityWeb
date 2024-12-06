import { Fragment } from "react"
import Select from 'react-select';

export const InputSelectAction = ({
  label,
  options,
  nome,
  id,
  defaultValue,
  value,
  isDisabled,
  isLoading,
  isClearable,
  isRtl,
  isSearchable,
  onChange
}) => {
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    })
  };

  return (

    <Fragment >
      <div className="col-sm-6 col-md-3 col-xl-3  mt-4">
        <label className="form-label" htmlFor={id}>{label}</label>
        <div className="" >
          <Select
            
            className="basic-multi-select"
            classNamePrefix="select"
            defaultValue={defaultValue}
            // value={value}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name={nome}
            options={options}
            onChange={onChange}
            styles={customStyles}
          />
        </div>
      </div>
    </Fragment>
  )
}