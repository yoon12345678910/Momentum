import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'components/Base';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';


const InfoWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const MainInfo = styled.div`
  flex: 1 1 50%;
`;

const WeatherConditions = styled.div`
  margin-bottom: 12px;
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

const ExtraInfo = styled.div`
  flex: 1 1 50%;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 85%;
`;

const Item = styled.div`
  line-height: 125%;
`;

const Title = styled.span`
  padding-right: 5px;
  text-transform: capitalize;
  opacity: .7;
`;

const Highlight = styled.span`
  opacity: .95;
`;

const WindDirection = styled(Icon)`
  transform: ${props => props.deg ? `rotate(${props.deg}deg)` : 0};
`;

const Details = ({
  data,
  isTodaySelected
}) => {
  return (
    <div>
      <WeatherConditions>
        {data.main}
      </WeatherConditions>
      <InfoWrapper>
        <MainInfo>
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
        </MainInfo>
        <ExtraInfo>
          <Item>
            <Title>{`humidity`}</Title>
            <Highlight>{`${data.humidity} %`}</Highlight>
          </Item>
          <Item>
            <Title>{`pressure`}</Title>
            <Highlight>{`${Math.floor(data.pressure)} hpa`}</Highlight>
          </Item>
          <Item>
            <Title>{`wind`}</Title>
            {data.wind
              ? <Highlight>
                  {`${Math.floor(data.wind.speed)} km/h`} 
                  <WindDirection 
                    deg={data.wind.deg}
                    faClassName={'fa fa-long-arrow-up'}/>
                </Highlight> 
                : null}
          </Item>
        </ExtraInfo>
      </InfoWrapper>
    </div>
  );
};

Details.defaultProps = {
  isTodaySelected: true,
  data: {
    main: '',
    icon: '',
    temp: '',
    tempMin: '',
    humidity: -1,
    pressure: -1,
    wind: {
      deg: 0,
      speed: 0
    }
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
    ]),
    humidity: PropTypes.number,
    pressure: PropTypes.number,
    wind: PropTypes.shape({
      deg: PropTypes.number,
      speed: PropTypes.number
    })
  })
};

export default Details;