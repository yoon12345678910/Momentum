import React from 'react';
import PropTypes from 'prop-types';


const WeatherTemp = ({
  children,
  className
}) => {
  if (children === '') {
    return null;
  }
  return (
    <span className={className}>
      {`${Math.floor(children)}°`}
    </span>
  );
}

WeatherTemp.defaultProps = {
  children: ''
};

WeatherTemp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default WeatherTemp;
