import React from 'react';
import PropTypes from 'prop-types';

const WeatherIcon = ({ icon }) => {
  // icon mapping (openweathermap{d:day,n:night} : meteocons)
  const MAPPING_ICON = {
      '01d': 'B', '01n': '2', // clear sky
      '02d': 'H', '02n': '4', // few clouds
      '03d': 'N', '03n': '5', // scattered clouds
      '04d': 'Y', '04n': '%', // broken clouds
      '09d': 'T', '09n': '!', // shower rain
      '10d': 'R', '10n': '8', // rain
      '11d': '0', '11n': '&', // thunderstorm
      '13d': 'W', '13n': '#', // snow
      '50d': 'M', '50n': 'M'  // mist
    }
  return (
    <span
      data-icon={MAPPING_ICON[icon]}
      className="icon icon-weather">
    </span>
  )
}

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired
}

export default WeatherIcon
