import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';



export default function ConsultarId({setIdUsuario}) {
    const [id, setId] = useState(null)
    const [user, setUser] = useState(
        {
            id_usuario: 0,
            nombre: "",
            telefono: ""
        }
    )
   

    async function consultarId(e) {
        e.preventDefault()
        if (!id) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Campo vacio",
                confirmButtonColor: "#ec111a"
              });
        }

        const response = await fetch(`http://localhost:3001/user/${id}`)
        const userData = await response.json()
        console.log('llegando datos', userData)
        if (!userData) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario no encontrado",
                confirmButtonColor: "#ec111a"
              });
            
        }

        setUser(userData)
        setIdUsuario(id)

    }
    return (

        <>


            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <div className="col">
                                    <label>Identificación</label>
                                    <input type="text" className="form-control mb-3" onChange={(e) => { setId(e.target.value) }} />
                                </div>
                                <div className="col">
                                    <button className="btn btn-primary mb-3 mt-4" type="submit" onClick={(e) => { consultarId(e) }}>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>

    )
}
