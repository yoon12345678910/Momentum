import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { LocationMessage } from 'components/Weather';


class LocationNoti extends Component {
  constructor(props) {
    super(props);
    this.timeoutID = null;
  }

  componentDidUpdate() {
    if (this.props.currentWeather.toJS().status === 'FAILURE') {
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
      <LocationMessage>
        {this.props.locationNoti}
      </LocationMessage>
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