import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { Widget } from 'components/Base';
import { Popup, Header, Details } from 'components/Weather';
import { Dashboard, Location, WeatherForecast } from 'containers/Weather';
import { loadLocalStorage } from 'lib/api/weather';


class Weather extends Component {
  constructor(props) {
    super(props);

    this.popupRef = React.createRef();
  }

  componentDidMount() {
    const loadedCoords = loadLocalStorage();
    if (loadedCoords === null) {
      this.askForCoords();
    } else {
      this.searchWeather(loadedCoords);
    }
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
    return (
      <Widget>
        <Dashboard popupRef={this.popupRef}/>
        <Popup 
          innerRef={this.popupRef}
          isVisible={this.props.isVisiblePopup}>
          <Header>
            <Location/>
          </Header>
          <Details
            isTodaySelected={this.props.isTodaySelected}
            data={this.props.detailedWeather.toJS()}/>
          <WeatherForecast/>
        </Popup>
      </Widget>
    );
  }
}

export default connect(
  (state) => ({
    isVisiblePopup: state.weather.get('isVisiblePopup'),
    isTodaySelected: state.weather.get('isTodaySelected'),
    detailedWeather: state.weather.get('detailedWeather')
  }),
  (dispatch) => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(Weather);