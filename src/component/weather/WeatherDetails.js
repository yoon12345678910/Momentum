import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';

const WeatherDetails = ({ isTodayWeather, weatherData }) => {
  return (
    <div className="weather-details">
      <span className="weather-conditions">
        {weatherData.weather.main}
      </span> 
      <WeatherIcon
        icon={weatherData.weather.icon}
      />
      <WeatherTemp
        temp={weatherData.temp}
      />
      {
        isTodayWeather ?
          null :  <WeatherTemp
                    className={"weather-temp-low"}
                    temp={weatherData.temp_min}
                  />
      }
    </div>
  )
}

WeatherDetails.propTypes = {
  isTodayWeather: PropTypes.bool.isRequired,
  weatherData: PropTypes.shape({
    weather: PropTypes.shape({
      main: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
    temp: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
  }).isRequired
}

export default WeatherDetails
