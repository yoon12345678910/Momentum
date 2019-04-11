import React from 'react';
import PropTypes from 'prop-types';

const WeatherTemp = ({ className, temp }) => {
  return (
    <span className={className}>
      {`${Math.floor(temp)}°`}
    </span>
  )
}

WeatherTemp.defaultProps = {
  className: 'weather-temp'
}

WeatherTemp.propTypes = {
  className: PropTypes.string,
  temp: PropTypes.number.isRequired
}

export default WeatherTemp
