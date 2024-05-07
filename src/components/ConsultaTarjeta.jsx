import React, { useEffect, useState } from 'react';


function Consulta({ tarjetaData }) {
    const [data, setData] = useState(tarjetaData)
    console.log(data)
    useEffect(() => {
        setData(tarjetaData)
    }, [tarjetaData])
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
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
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
                                        <td><button className="btn btn-primary btn-sm">Edit</button></td>
                                        <td><a href="#" className="btn btn-danger btn-sm">Delete</a></td>
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

export default Consulta;
