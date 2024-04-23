import React, {useState} from 'react';
import AlertDialog from './components/alert'
import ResponsiveAppBar from './components/Navbar';
import SelectLabels from './components/Consulta';
import Consulta from './components/tarjetas';

function App() {
const [alert, setAlert] = useState({disable: false, message: '', title: ''})
const [id, setId] = useState(null)
const [userTarjetaData, setUserTarjetaData] = useState(null)

const [user, setUser]=useState(
  {
    id_usuario: 0,
    nombre: "",
    telefono: ""
  }
)

async function fetchData(){
  const response = await fetch(`http://localhost:3001/tarjetas/${id}`)
  const userTarjeta = await response.json()
  setUserTarjetaData(userTarjeta)
}

async function consultarId (e) {
  e.preventDefault()
  if (!id){
    setAlert({disable: true, message: 'Campo vacio', title: 'Error'})
    return
  }

  const response = await fetch(`http://localhost:3001/user/${id}`)
  const userData = await response.json()
  console.log('llegando datos', userData)
  if (!userData){
    setAlert({disable: true, message: 'Usuario no encontrado', title: 'Error'})
    return
  }

setUser(userData)
await fetchData()

}
console.log(alert.disable)
  return (
    <>
      <AlertDialog options={alert} setAlert={setAlert}/>
      <ResponsiveAppBar />

      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label>Identificación</label>
                  <input type="text" className="form-control mb-3" onChange={(e)=>{setId(e.target.value)}}/>
                </div>
                <div className="col">
                  <button className="btn btn-primary mb-3 mt-4" type="submit" onClick={(e)=>{consultarId(e)}}>
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.id_usuario}</td>
                  <td>{user.nombre}</td>
                  <td>{user.telefono}</td>
                  <td><button className="btn btn-primary btn-sm">Edit</button></td>
                  <td><a href="#" className="btn btn-danger btn-sm">Delete</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/* <SelectLabels />  */}
    <Consulta  tarjetaData={userTarjetaData}/>
    </>
  );
}

export default App;
