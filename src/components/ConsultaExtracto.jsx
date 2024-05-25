import React, { useState, useEffect } from 'react';

const ExtractoTable = ({ idUsuario }) => {

    const [dataExtracto, setDataExtracto] = useState(null)

    async function fetchDataTarjeta(id) {
        const response = await fetch(`http://localhost:3001/tarjetas/${id}`)
        const userTarjeta = await response.json()
        console.log('userData', userTarjeta)
        await fetchDataExtracto(userTarjeta[0].id_tarjeta)
    }

    async function fetchDataExtracto(id) {
        const response = await fetch(`http://localhost:3001/extracto/${id}`)
        const cupoTarjeta = await response.json()
        setDataExtracto(cupoTarjeta)
    }


    useEffect(() => {
        fetchDataTarjeta(idUsuario)
    }, [idUsuario])
    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <label className="font-weight-bold">Extracto</label>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Fecha transaccion</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Cuotas</th>
                                <th scope="col">Tasa de interes</th>
                                <th scope="col">Saldo anterior</th>
                                <th scope="col">Pago minimo</th>
                                <th scope="col">Pago total</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Estado</th>

                            </tr>
                        </thead>

                        <tbody>
                            {dataExtracto?.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item?.fecha_transaccion}</td>
                                        <td>{item?.monto}</td>
                                        <td>{item?.cuotas}</td>
                                        <td>{item?.tasas_compras}</td>
                                        <td>{item?.saldo_anterior}</td>
                                        <td>{item?.pago_minimo}</td>
                                        <td>{item?.pago_total}</td>
                                        <td>{item?.descripcion}</td>
                                        <td>{item?.estado}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExtractoTable;
