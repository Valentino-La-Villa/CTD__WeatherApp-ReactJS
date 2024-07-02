import React, { useRef, useState } from 'react'
import './styles/weatherApp.css'

export const WeatherApp = () => {

    const baseURL = `https://api.openweathermap.org/data/2.5/weather`
    const API_KEY = import.meta.env.VITE_API_KEY
    const lang = 'en'
    const kelvinDegreeDiff = 273.15


    const [weatherData, setWeatherData] = useState(null)
    const cityInputRef = useRef()

    const fetchWeatherData = async () => {
        try {
            const res = await fetch(`${baseURL}?q=${cityInputRef.current.value}&appid=${API_KEY}&lang=${lang}`)
            const data = await res.json()
            setWeatherData(data)
        }
        catch (err) {

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }


    return (
        <main className='container'>
            <h1>Weather app</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Search for a city'
                    ref={cityInputRef}
                />
                <button type='submit'>Search</button>
            </form>


            {weatherData &&
                <section>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Current temperature is {Math.round(weatherData.main.temp - kelvinDegreeDiff)}ºC</p>
                    <p>Current climate condition is: {weatherData.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                </section>
            }
        </main>
    )
}
