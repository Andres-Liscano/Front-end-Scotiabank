import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ResponsiveAppBar from "./Navbar";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}



export default function LlamadasGrafica() {

  const [llamadaEstado, setLlamadaEstado] = useState(null)
  const [llamadaProm, setLlamadaProm] = useState(null)

  async function fetchLlamadaEstado() {
    const response = await fetch(`http://localhost:3001/llamada/1`)
    const estado = await response.json()
    const labels = Object.keys(estado);
    const values = Object.values(estado)

    setLlamadaEstado({
      labels,
      values
    })
  }

  async function fetchLlamadaProm() {
    const response = await fetch(`http://localhost:3001/llamada-prom/1`)
    const prom = await response.json()
    setLlamadaProm(prom)

  }

  useEffect(() => {
    fetchLlamadaEstado()
    fetchLlamadaProm()
  }, [])


  const refPastel = useRef(null);
  const refBarra = useRef(null);
  const navigate = useNavigate();

  const [selectValue, setSelectValue] = useState("estado");

  useEffect(() => {
    let pastelChart, barraChart;

    const datosGraficoPastel = {
      labels: llamadaEstado?.labels,
      datasets: [
        {
          data: llamadaEstado?.values,
          backgroundColor: [
            "rgba(255, 193, 7, 0.2)", // Amarillo dorado para llamadas recibidas
            "rgba(75, 192, 192, 0.2)", // Verde agua para llamadas finalizadas
          ],
          borderColor: [
            "rgba(255, 193, 7, 1)", // Amarillo dorado para llamadas recibidas
            "rgba(75, 192, 192, 1)", // Verde agua para llamadas finalizadas
          ],
          borderWidth: 2,
        },
      ],
    };

    const processData = {
      labels: llamadaProm?.map(item => formatDate(new Date(item.fecha_atencion))),
      datasets: [
        {
        
          data: llamadaProm?.map(item => item.promedio_duracion),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 0.9)',
          borderWidth: 2
        }
      ]
    };


    if (selectValue === 'estado' && refPastel.current) {
      pastelChart = new window.Chart(refPastel.current.getContext("2d"), {
        type: "pie",
        data: datosGraficoPastel,
        options: {
          responsive: true
        },
      });
    }

    if (selectValue === 'duracion' && refBarra.current) {
      barraChart = new window.Chart(refBarra.current.getContext("2d"), {
        type: "bar",
        data: processData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Promedio de Tiempo de Llamada por Día'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      // Destruir los gráficos antes de desmontar el componente
      if (pastelChart) pastelChart.destroy();
      if (barraChart) barraChart.destroy();
    };
  }, [selectValue, llamadaEstado]);

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5
        }}
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 150,
            boxShadow: 8,
            color: '#ec131b'
          }}
          error
        >
          <InputLabel
            id="demo-simple-select-helper-label"
            sx={{ color: '#ec131b' }}
          >
            Consultas
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectValue}
            label="Graficas"
            autoWidth
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <MenuItem value="">
              <em>Tipos de consultas:</em>
            </MenuItem>
            <MenuItem value={"estado"}>Estado de llamadas</MenuItem>
            <MenuItem value={"duracion"}>Promedio Duración Llamadas</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectValue === 'estado' && (
        <section className="mt-5 w-100 d-flex justify-content-center">
          <article className="w-25 h-60 shadow-xl d-flex justify-content-center">
            <canvas ref={refPastel}></canvas>
          </article>
        </section>
      )}
      {selectValue === "duracion" && (
        <section className="mt-5 w-100 d-flex justify-content-center">
          <article className="w-75 h-60 shadow-xl d-flex justify-content-center">
            <canvas ref={refBarra}></canvas>
          </article>
        </section>
      )}
    </>
  );
}
