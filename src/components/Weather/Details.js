import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';


const WeatherConditions = styled.div`
  margin: 0 0 12px;
  line-height: 125%;
  opacity: .7;
`;

const StyledWeatherIcon = styled(WeatherIcon)`
  margin-right: 4px;
  font-size: 60px;
  line-height: 60px;
`;
const StyledWeatherTemp = styled(WeatherTemp)`
  margin-left: 5px;
  font-size: 60px;
`;
const StyledWeatherTempMin = styled(WeatherTemp)`
  margin-left: 2px;
  font-size: 37.2px;
  opacity: .6;
`;

const Details = ({
  isTodaySelected,
  data
}) => {
  return (
    <div>
      <WeatherConditions>
        {data.main}
      </WeatherConditions>
      <StyledWeatherIcon>
        {data.icon}
      </StyledWeatherIcon>
      <StyledWeatherTemp>
        {data.temp}
      </StyledWeatherTemp>
      {
        isTodaySelected ? 
          null : <StyledWeatherTempMin>
                  {data.tempMin}
                </StyledWeatherTempMin>
      }
    </div>
  );
};

Details.defaultProps = {
  isTodaySelected: true,
  data: {
    main: '',
    icon: '',
    temp: '',
    tempMin: ''
  }
};

Details.propTypes = {
  isTodaySelected: PropTypes.bool,
  data: PropTypes.shape({
    main: PropTypes.string,
    icon: PropTypes.string,
    temp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    tempMin: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })
};

export default Details;