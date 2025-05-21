import React, { useEffect, useState } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { DashBoardPromocao } from './pages/DashBoardPromocao';

function App() {
  const [componentToShow, setComponentToShow] = useState("");
   
  
    const handleShowComponent = (componentName) => {
      setComponentToShow(componentName);
    };
  return (
    <DashBoardPromocao componentToShow={componentToShow} handleShowComponent={handleShowComponent}  />
  )
}

export default App;