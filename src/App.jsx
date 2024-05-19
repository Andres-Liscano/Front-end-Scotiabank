import React, {useState, useEffect} from 'react';
import ResponsiveAppBar from './components/Navbar';
import Consulta from './components/ConsultaTarjeta';
import ConsultarId from './components/ConsultarId';
import TiposConsulta from './components/TiposConsulta';

function App() {
const [userTarjetaData, setUserTarjetaData] = useState(null)
const [tipoConsulta, setTipoConsulta] = useState(null)


async function fetchData(id){
  const response = await fetch(`http://localhost:3001/tarjetas/${id}`)
  const userTarjeta = await response.json()
  setUserTarjetaData(userTarjeta)
}

const handleTipoConsulta=(data)=>{
setTipoConsulta(data)
}


  return (
    <>
      <ResponsiveAppBar/>
      <ConsultarId fetchTarjetas={fetchData}/>
      <TiposConsulta handleTipoconsulta={handleTipoConsulta} />
      { tipoConsulta === 'general' &&   <Consulta  tarjetaData={userTarjetaData}/>}
      
    
    </>
  );
}

export default App;
