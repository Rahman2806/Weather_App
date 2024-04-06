import React, { useState } from 'react';
import search_icon from './Assets/search.png';
import clear from './Assets/clear.png';
import cloud from './Assets/cloud.png';
import drizzle from './Assets/drizzle.png';
import rain from './Assets/rain.png';
import snow from './Assets/snow.png';
import wind from './Assets/wind.png';
import humidityIcon from './Assets/humidity.png'; // Changed variable name

export const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloud); // Define state for weather icon
    const [humidity, setHumidity] = useState(""); // Define state for humidity
    const [windSpeed, setWindSpeed] = useState(""); // Define state for wind speed
    const [temperature, setTemperature] = useState(""); // Define state for temperature
    const [location, setLocation] = useState(""); // Define state for location

    const api_key = "63480f226caf4672d026eaee456fdb49";

    const search = async () => {
        const cityInput = document.getElementsByClassName("cityInput")[0].value;
        if (cityInput === "") return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            setHumidity(data.main.humidity + "%");
            setWindSpeed(data.wind.speed + " km/h");
            setTemperature(Math.floor(data.main.temp) + "°c");
            setLocation(data.name);

            switch (data.weather[0].icon) {
                case "01d":
                case "01n":
                    setWicon(clear);
                    break;
                case "02d":
                case "02n":
                    setWicon(cloud);
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    setWicon(drizzle);
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    setWicon(rain);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow);
                    break;
                default:
                    setWicon(cloud);
                    break;
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">{temperature}</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">{humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">{windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
