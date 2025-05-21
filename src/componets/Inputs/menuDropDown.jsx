import React from 'react';
import { TreeSelect } from 'primereact/treeselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

export const MenuTreeSelect = ({
  valueMenuSelect,
  optionsMenuSelect,
  onChangeMenuSelect,
  placeholderMenuSelect,

}) => {
  
  return (
    <div className="col-sm-6 col-md-3 col-xl-3 mt-4">

      <div cclassName="card flex justify-content-center ">

        <TreeSelect
          value={valueMenuSelect}
          options={optionsMenuSelect}
          onChange={(e) => onChangeMenuSelect(e)}
          placeholder={placeholderMenuSelect}
          display="chip"
          selectionMode="checkbox"
          // className="md:w-20rem w-full"
          style={{ 
            maxWidth: '300px', 
            width: '100%',
            maxHeight: '300px',
            height: '100%', 
          }}
        />

      </div>
    </div>
  );
};


