import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { WeatherForecast as WeatherForecastComponent } from 'components/Weather';


class WeatherForecast extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (selectedDate) => {
    this.props.WeatherActions.showForecastDay({ selectedDate });
  }

  render() {
    const { 
      selectedDate, 
      currentWeather, 
      weatherForecast
    } = this.props;

    // 오늘날씨는 현재날씨로 대체.
    // - API에 오늘의 데이터가 없거나 날씨가 다를 수 있음.
    const currentWeatherJS = currentWeather.toJS();
    const weatherForecastJS = weatherForecast.toJS();
    let forecastData = {};
      
    if (currentWeatherJS.data.date) {
      forecastData = weatherForecastJS.data;
      forecastData[currentWeatherJS.data.date] = currentWeatherJS.data;
    }

    return (
      <WeatherForecastComponent
        data={forecastData}
        selectedDate={selectedDate}
        onClick={this.handleClick}/>
    );
  }
}

export default connect(
  (state) => ({
    selectedDate: state.weather.get('selectedDate'),
    currentWeather: state.weather.get('currentWeather'),
    weatherForecast: state.weather.get('weatherForecast')
  }),
  (dispatch) => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(WeatherForecast);