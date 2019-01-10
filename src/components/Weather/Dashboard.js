import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dashboard as DefaultDashboard } from 'components/Base';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';


const StyledDashboard = styled(DefaultDashboard)`
  position: relative;
  padding-top: 14px;
  padding-right: 20px;
`;

const WeatherInfoWrapper = styled.div`
  font-size: 150%;
  font-weight: 500;
  line-height: 100%;
`;

const StyledWeatherIcon = styled(WeatherIcon)`
  margin-right: 6px;
`;

const LocationName = styled.span`
  display: inline-block;
  max-width: 110px;
  padding: 3px 0;
  margin: 0;
  font-size: 62.5%;
  font-weight: 500;
  outline: 0;
  text-transform: uppercase;
  vertical-align: top;
  overflow-wrap: break-word;
  opacity: .7;
  transition: opacity .5s ease;
`;

const Dashboard = ({
  currentWeather,
  foundLocationName,
  onClick
}) => {
  return (
    <StyledDashboard
      onClick={onClick}
      title={currentWeather.main}>
      <WeatherInfoWrapper>
        <StyledWeatherIcon>
          {currentWeather.icon}
        </StyledWeatherIcon>
        <WeatherTemp>
          {currentWeather.temp}
        </WeatherTemp>
      </WeatherInfoWrapper>
      <LocationName>
        {foundLocationName}
      </LocationName>
    </StyledDashboard>
  );
};

Dashboard.defaultProps = {
  currentWeather: {
    main: '',
    icon: '',
    temp: ''
  },
  foundLocationName: '',
  onClick: () => console.warn('onClick not defined')
};

Dashboard.propTypes = {
  currentWeather: PropTypes.shape({
    main: PropTypes.string,
    icon: PropTypes.string,
    temp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired,
  foundLocationName: PropTypes.string,
  onClick: PropTypes.func
};

export default Dashboard;