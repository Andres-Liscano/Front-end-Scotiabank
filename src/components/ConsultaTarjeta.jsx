import React, { useEffect, useState } from 'react';


function ConsultaTarjeta({ idUsuario }) {
    const [data, setData] = useState(null)

    async function fetchData(id){
        const response = await fetch(`http://localhost:3001/tarjetas/${id}`)
        const userTarjeta = await response.json()
        setData(userTarjeta)
      }


    useEffect(() => {
        fetchData(idUsuario)
    }, [idUsuario])

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                <label className="font-weight-bold">Consulta general Saldo</label>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Saldo Actual</th>
                                <th scope="col">Tipo de Tarjeta</th>
                                <th scope="col">Ultimos movimientos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.id_cliente}</td>
                                        <td>{item?.saldo_actual}</td>
                                        <td>{item?.tipo_tarjeta}</td>
                                        <td>{item?.ultimos_movimientos}</td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>




    )
}

export default ConsultaTarjeta;
