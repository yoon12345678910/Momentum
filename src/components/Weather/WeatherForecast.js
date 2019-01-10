import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';


const Wrapper = styled.div`
  display: flex;
  clear: both;
  padding-top: 8px;
  margin-top: 10px;
  border-top: 1px solid rgba(255,255,255,.15);
  font-size: 11px;
  transition: opacity .2s ease;
  opacity: 1;
`;

const Item = styled.div`
  flex: 1 1 11.111%;
  margin-left: 0;
  margin: 0 1.5px;
  border-radius: 2px;
  background: ${props => props.isSelected ? 'rgba(255,255,255,.09)' : ''};
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,.09);
  }
`;

const Label = styled.div`
  margin: 7px 0 1px 0;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  opacity: .6;
`;

const StyledIcon = styled(WeatherIcon)`
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 3px;
  font-size: 19px;
  line-height: 90%;
  vertical-align: -20%;
  opacity: .85;
`;

const StyledTempMax = styled(WeatherTemp)`
  opacity: .85;
`;

const StyledTempMin = styled(WeatherTemp)`
  opacity: .4;
  padding-left: 3px;
`;

const WeatherForecast = ({
  data,
  selectedDate,
  onClick
}) => {
  const WeatherForecastList = Object.keys(data)
    .map((key) => {
      const itemInfo = data[key];
      return (
        <Item
          key={key}
          isSelected={itemInfo.date === selectedDate}
          onClick={() => onClick(itemInfo.date)}
          title={itemInfo.main}>
          <Label>
            {itemInfo.day.slice(0, 3)}
          </Label>
          <StyledIcon>
            {itemInfo.icon}
          </StyledIcon>
          <StyledTempMax>
            {itemInfo.tempMax}
          </StyledTempMax>
          <StyledTempMin>
            {itemInfo.tempMin}
          </StyledTempMin>
        </Item>
      )
    });

  return (
    <Wrapper>
      {WeatherForecastList}
    </Wrapper>
  )
}

WeatherForecast.defaultProps = {
  data: {
    day: '',
    main: '',
    icon: '',
    tempMax: '',
    tempMin: ''
  },
  selectedDate: -1,
  onClick: () => console.warn('onClick not defined')
}

WeatherForecast.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      day: PropTypes.string,
      main: PropTypes.string,
      icon: PropTypes.string,
      tempMax: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      tempMin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ),
  selectedDate: PropTypes.number,
  onClick: PropTypes.func,
};

export default WeatherForecast;
