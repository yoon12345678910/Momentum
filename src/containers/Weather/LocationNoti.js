import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { LocationNotiMessage } from 'components/Weather';


class LocationNoti extends Component {
  constructor(props) {
    super(props);

    this.timeoutID = null;
  }

  componentDidUpdate() {
    const currentWeatherJS = this.props.currentWeather.toJS();

    if (currentWeatherJS.status === 'FAILURE') {
      clearTimeout(this.timeoutID);
      
      this.timeoutID = setTimeout(() => {
        this.props.WeatherActions.clearLocationNoti();
        clearTimeout(this.timeoutID);
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  render() {
    return (
      <LocationNotiMessage>
        {this.props.locationNoti}
      </LocationNotiMessage>
    );
  }
}

export default connect(
  (state) => ({
    locationNoti: state.weather.get('locationNoti'),
    currentWeather: state.weather.get('currentWeather')
  }),
  (dispatch) => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(LocationNoti);