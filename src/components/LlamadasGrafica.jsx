import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import ResponsiveAppBar from "./Navbar";

function generarDatosHistorialLlamadas(cantidad) {
  const estados = ["Recibidos", "Finalizados"];
  const datos = [];

  for (let i = 0; i < cantidad; i++) {

    const estado = estados[Math.floor(Math.random() * estados.length)];

    datos.push({
      estado: estado
    });
  }

  return datos;
}

const datos = generarDatosHistorialLlamadas(100);

export default function LlamadasGrafica() {
  const refPastel = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    

    const datosGraficoPastel = {
      labels: ["Recibidos", "Finalizados"],
      datasets: [
        {
          data: [
            datos.filter((d) => d.estado === "Recibidos").length,
            datos.filter((d) => d.estado === "Finalizados").length
          ],
          backgroundColor: [
            "rgba(255, 193, 7, 0.2)", // Amarillo dorado para llamadas entrantes
            "rgba(75, 192, 192, 0.2)", // Verde agua para llamadas salientes
          ],
          borderColor: [
            "rgba(255, 193, 7, 1)", // Amarillo dorado para llamadas entrantes
            "rgba(75, 192, 192, 1)", // Verde agua para llamadas salientes
          ], 
          borderWidth: 2,
        },
      ],
    };

    

    // Crear los gráficos

    const pastelChart = new window.Chart(refPastel.current.getContext("2d"), {
      type: "pie",
      data: datosGraficoPastel,
      options: {
        responsive: true 
        },
      
    });


    return () => {
      // Destruir los gráficos antes de desmontar el componente
      pastelChart.destroy();
    };
  }, []);


  return (
    <>
    <ResponsiveAppBar/>
      <section className="mt-5 w-100 d-flex justify-content-center">
        <article className="w-25 h-60 shadow-xl d-flex justify-content-center">
          <canvas ref={refPastel}></canvas>
        </article>
      </section>
    </>
  )};
