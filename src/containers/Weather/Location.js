import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { LocationWrapper, LocationNameInput, LocationNotiMessage } from 'components/Weather';
import { LocationNoti } from 'containers/Weather';
import { setEndOfContenteditable, animateCSS } from 'lib/utils';


class LocationSearch extends Component {
  constructor(props) {
    super(props);

    this.isClickOrBlur = false;
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.isClickOrBlur) {
      this.isClickOrBlur = false;
      this.animateInput();
      this.focusInput();
    }
  }

  animateInput = () => {
    animateCSS(this.inputRef.current, 'pulse');
  }

  focusInput = () => {
    if (this.props.isFocusedLocationName) {
      setEndOfContenteditable(this.inputRef.current);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const {
      locationName,
      foundLocationName,
      WeatherActions
    } = this.props;

    this.isClickOrBlur = true;
    const trim = locationName.replace(/(^\s*)|(\s*$)/, '');

    if (!trim.length || trim === foundLocationName) {
      WeatherActions.setLocationName({
        locationName: foundLocationName
      });
    } else {
      WeatherActions.getCurrentWeather({ locationName: trim });
      WeatherActions.getWeatherForecast({ locationName: trim });
    }

    WeatherActions.blurLocationName();
  }

  handleChange = (e) => {
    this.isClickOrBlur = false;
    this.props.WeatherActions.setLocationName({
      locationName: e.target.value
    });
  }

  handleDoubleClick = () => {
    const { isFocusedLocationName, WeatherActions } = this.props;
    if (!isFocusedLocationName) {
      this.isClickOrBlur = true;
      WeatherActions.focusLocationName();
    }
  }

  render() {
    const {
      locationName,
      foundLocationName,
      isFocusedLocationName,
      detailedWeather,
      isTodaySelected
    } = this.props;

    return (
      <LocationWrapper
        isFocused={isFocusedLocationName}
        onDoubleClick={this.handleDoubleClick}
        title={foundLocationName}>
        <LocationNameInput
          innerRef={this.inputRef}
          html={locationName}
          disabled={!isFocusedLocationName}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}/>
        { isTodaySelected
            ? null :  <LocationNotiMessage>
                        {detailedWeather.toJS().day}
                      </LocationNotiMessage>
        }
        <LocationNoti/>
      </LocationWrapper>
    );
  }
}

export default connect(
  (state) => ({
    locationName: state.weather.get('locationName'),
    foundLocationName: state.weather.get('foundLocationName'),
    isFocusedLocationName: state.weather.get('isFocusedLocationName'),
    detailedWeather: state.weather.get('detailedWeather'),
    isTodaySelected: state.weather.get('isTodaySelected')
  }),
  (dispatch) => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(LocationSearch);