import React, {useState} from 'react';
import AlertDialog from './components/alert'

function App() {
const [alert, setAlert] = useState({disable: false, message: '', title: ''})
const [id, setId]=useState(null)

const [user, setUser]=useState(
  {
    id_usuario: 0,
    nombre: "",
    telefono: ""
  }
)

async function consultarId (e) {
  e.preventDefault()
  if (!id){
    setAlert({disable: true, message: 'Id no digitado', title: 'Error'})
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

}
console.log(alert.disable)
  return (
    <>
      <AlertDialog options={alert} setAlert={setAlert}/>
      <div className="text-center mt-4 mb-5 text-danger bg-danger bg-opacity-25 shadow">
        
        <h1>SCOTIABANK</h1>
      </div>

      <div className="container">
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

      <div className="container text-center">
        <div className="row row-cols-3 row-cols-lg-3 mt-3">
          <div className="col">
            <button type="button" className="btn btn-outline-danger btn-lg shadow">Consultas</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-outline-danger btn-lg shadow">2</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-outline-danger btn-lg shadow">3</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-outline-danger btn-lg shadow">4</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-outline-danger btn-lg shadow">5</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-outline-danger btn-lg shadow">6</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
