import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';

const Forecast = ({ selectedDate, onClick, forecast }) => {
  const listItems = Object.keys(forecast)
    .map((key) => {
      const dayInfo = forecast[key];
      return (
        <div
          key={key}
          data-date={dayInfo.date}
          data-day={dayInfo.day}
          onClick={() => onClick(dayInfo.date)}
          title={dayInfo.weather.main}
          className={"weather-forecast-item " + (dayInfo.date === selectedDate ? "selected" : "")}>
          <div 
            className="weather-forecast-label">
            {dayInfo.day.substr(0, 3)}
          </div>
          <WeatherIcon 
            icon={dayInfo.weather.icon}
          />
          <WeatherTemp
            className="weather-forecast-high"
            temp={dayInfo.temp_max}
          />
          <WeatherTemp
            className="weather-forecast-low"
            temp={dayInfo.temp_min}
          />
        </div>
      )
    });

  return (
    <div className={"weather-forecast " + (listItems ? "show" : "") }>
      {listItems}
    </div>
  )
}

Forecast.propTypes = {
  selectedDate: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  forecast: PropTypes.objectOf(
    PropTypes.shape({
      weather: PropTypes.shape({
        main: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired
    })
  ).isRequired
}

export default Forecast
