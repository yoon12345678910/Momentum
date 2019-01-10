import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Icon = styled.span`
  &:before {
    font-family: 'MeteoconsRegular';
	  content: attr(data-icon);
  }
`;

const WeatherIcon = ({
  children,
  className
}) => {
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
    '50d': 'M', '50n': 'M', // mist
    '':''                   // default
  };
  return (
    <Icon 
      className={className}
      data-icon={MAPPING_ICON[children]}/>
  );
}

WeatherIcon.defaultProps = {
  children: ''
};

WeatherIcon.propTypes = {
  children: PropTypes.string
};

export default WeatherIcon;
