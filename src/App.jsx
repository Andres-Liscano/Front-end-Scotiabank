import React, {useState, useEffect} from 'react';
import ResponsiveAppBar from './components/Navbar';
import ConsultarId from './components/ConsultarId';
import TiposConsulta from './components/TiposConsulta';
import ConsultaTarjeta from './components/ConsultaTarjeta'
import ConsultaCupoCredito from './components/ConsultaCupoCredito'
import ConsultaCupoDebito from './components/ConsultaCupoDebito'
import ExtractoTable from './components/ConsultaExtracto';


function App() {
const [tipoConsulta, setTipoConsulta] = useState(null)
const [idUsuario, setIdUsuario] = useState(null)

const handleTipoConsulta=(data)=>{
setTipoConsulta(data)
}


  return (
    <>
      <ResponsiveAppBar/>
      <ConsultarId setIdUsuario={setIdUsuario}/>
      <TiposConsulta handleTipoconsulta={handleTipoConsulta} />
      {( tipoConsulta === 'general' && idUsuario) &&  <ConsultaTarjeta  idUsuario={idUsuario}/>}
      {(tipoConsulta === 'cupo-credito' && idUsuario) && <ConsultaCupoCredito idUsuario={idUsuario}/>}
      {(tipoConsulta === 'cupo-debito' && idUsuario) && <ConsultaCupoDebito idUsuario={idUsuario}/>}
      {(tipoConsulta === 'extracto' && idUsuario) && <ExtractoTable idUsuario={idUsuario}/>}
  
   
    </>
  );
}

export default App;
