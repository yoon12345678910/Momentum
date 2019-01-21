import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { WidgetPopup } from 'containers/Base';
import { Popup, Header, Details } from 'components/Weather';
import { Dashboard, LocationSearch, WeatherForecast } from 'containers/Weather';
import { loadLocalStorage } from 'lib/api/weather';
import moment from 'moment';


class Weather extends Component {
  constructor(props) {
    super(props);

    this.popupRef = React.createRef();
    this.timeoutID = null;
    this.intervalID = null;
  }

  componentDidMount() {
    const loadedCoords = loadLocalStorage();
    if (loadedCoords === null) {
      this.askForCoords();
    } else {
      this.searchWeather(loadedCoords);
    }

    this.keepWeahterUpToDate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
    clearInterval(this.intervalID);
  }

  keepWeahterUpToDate = () => {
    // API 3시간간격으로 최신화된 날씨 제공. (15, 18, 21...)
    // get initialTime
    const MINUTE = 60000;
    const time = moment();
    const h = MINUTE * 60 * (3 - parseInt(time.format('HH')) % 3);
    const ms = parseInt(time.format('mm')) * MINUTE + parseInt(time.format('ss'));
    const searchWeather = () => {
      this.searchWeather({
        locationName: this.props.foundLocationName
      });
    };
    
    this.timeoutID = setTimeout(() => {
      searchWeather();
      clearTimeout(this.timeoutID);

      this.intervalID = setInterval(() => {
        searchWeather();
      }, MINUTE * 60 * 3);
    }, h - ms + MINUTE); // "60000" is Additional delays
  }

  askForCoords = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      this.searchWeather(coords);
    } catch (error) {
      alert(`Can't access geo location ${error}`);
    }
  }

  searchWeather = (searchData) => {
    const { WeatherActions } = this.props;
    WeatherActions.getCurrentWeather(searchData);
    WeatherActions.getWeatherForecast(searchData);
  }

  render() {
    const detailedWeatherJS = this.props.detailedWeather.toJS();

    return (
      <Fragment>
        <Dashboard popupRef={this.popupRef}/>
        <Popup 
          innerRef={this.popupRef}
          isVisible={this.props.isVisiblePopup}
          isDisplayed={this.props.isDisplayedPopup}>
          <Header>
            <LocationSearch/>
          </Header>
          <Details
            isTodaySelected={this.props.isTodaySelected}
            data={detailedWeatherJS}/>
          <WeatherForecast/>
        </Popup>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    foundLocationName: state.weather.get('foundLocationName'),
    isVisiblePopup: state.weather.get('isVisiblePopup'),
    isTodaySelected: state.weather.get('isTodaySelected'),
    detailedWeather: state.weather.get('detailedWeather')
  }),
  (dispatch) => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(WidgetPopup(Weather));