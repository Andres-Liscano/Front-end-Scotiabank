import React, { useState, useEffect } from 'react'
import AlertDialog from './alert'



export default function ConsultarId({fetchTarjetas}) {
    const [alert, setAlert] = useState({ disable: false, message: '', title: '' })
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
            setAlert({ disable: true, message: 'Campo vacio', title: 'Error' })
            return
        }

        const response = await fetch(`http://localhost:3001/user/${id}`)
        const userData = await response.json()
        console.log('llegando datos', userData)
        if (!userData) {
            setAlert({ disable: true, message: 'Usuario no encontrado', title: 'Error' })
            return
        }

        setUser(userData)
        await fetchTarjetas(id)

    }
    return (

        <>

            <AlertDialog options={alert} setAlert={setAlert} />

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
                                    <td><button className="btn btn-primary btn-sm">Edit</button></td>
                                    <td><a href="#" className="btn btn-danger btn-sm">Delete</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>

    )
}
