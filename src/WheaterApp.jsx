import React from 'react'
import { useState } from 'react'

export const WheaterApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '2b671d24e388f64b5e90f7ca0121f350'

 
    const [ciudad, setCiudad] = React.useState('') 
    const [dataClima, setDataClima] = React.useState(null)



    const handleCambioCiudad =  (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submit')
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error('Error al obtener los datos')
        }
    }

  return (
    <div className='container'>
        <h1>Aplicacion de clima</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" 
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type='submit'>Buscar</button>
        </form>

        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {dataClima.main.temp}</p>
                    <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
        }
    </div>
  )
}
