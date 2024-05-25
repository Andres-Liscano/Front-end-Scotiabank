import React, { useEffect, useState } from 'react';


function ConsultaCupoDebito({ idUsuario }) {
    const [dataCupo, setDataCupo] = useState(null)

    async function fetchDataTarjeta(id) {
        const response = await fetch(`http://localhost:3001/tarjetas/${id}`)
        const userTarjeta = await response.json()
        console.log('userData', userTarjeta)
        await fetchDataCupo(userTarjeta[0].id_cliente)
    }

    async function fetchDataCupo(id) {
        const response = await fetch(`http://localhost:3001/tarjetas/cupo-debito/${id}`)
        const cupoTarjeta = await response.json()
        setDataCupo(cupoTarjeta)
    }


    useEffect(() => {
        fetchDataTarjeta(idUsuario)
    }, [idUsuario])


    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <label className="font-weight-bold">Consulta Cupo Debito</label>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Tipo de Tarjeta</th>
                                <th scope="col">Saldo Disponible</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataCupo?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.tipo_tarjeta}</td>
                                        <td>{item?.saldo_actual}</td>
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

export default ConsultaCupoDebito;