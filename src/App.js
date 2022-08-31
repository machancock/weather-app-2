import React, { useState } from "react";
import axios from 'axios';
import './App.css';

//const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=8c2ed5fc9965b36aaa3b0bda6d4e874a`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <h1>The Weather App 2.0</h1>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter City Name'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h3>{data.name}</h3>
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°</h2> : null}
          </div>
          <div className="description">
            {data.weather ? <h5>{data.weather[0].main}</h5> : null}
            {data.main ? <h5>H:{data.main.temp_max.toFixed()}°  L:{data.main.temp_min.toFixed()}°</h5> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
            <h6>Feels Like <span>🌡</span></h6>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°</p> : null}
            </div>
            <div className="humidity">
              <h6>Humidity <span>💦</span></h6>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <h6>Wind Speed <span>💨</span></h6>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        }
      </div>
    </div>
  );
};


export default App;