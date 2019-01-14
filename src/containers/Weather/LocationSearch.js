import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { LocationWrapper, LocationNameInput, LocationMessage } from 'components/Weather';
import { SearchStatus } from 'containers/Weather';
import { focusContenteditable, animateCSS } from 'lib/utils';


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
      this.animateInput();
      this.focusInput();
      this.isClickOrBlur = false;
    }
  }

  animateInput = () => {
    animateCSS(this.inputRef.current, 'pulse');
  }

  focusInput = () => {
    if (this.props.isFocusedLocationName) {
      focusContenteditable(this.inputRef.current, false);
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
            ? null :  <LocationMessage>
                        {detailedWeather.toJS().day}
                      </LocationMessage>}
        <SearchStatus/>
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