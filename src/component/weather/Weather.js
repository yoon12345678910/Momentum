import React from 'react';
import moment from 'moment';
import Dashboard from './Dashboard';
import WeatherDetails from './WeatherDetails';
import LocationNameInput from './LocationNameInput';
import Forecast from './Forecast';
import './Weather.css'

export default class Weather extends React.Component {
  constructor() {
    super();

    this.LS_KEY = 'weather';
    this.API_KEY = '4514b9d5bb75f12330b26b56f8731058';
    this.SEARCH_KEY = {
      COORDS: 'coords',
      CITY: 'city'
    };
    this.WEEKS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.state = {
      isShownPopup: false,
      locationName: '',
      foundLocationName: '',
      currentWeather: null,
      weatherForecast: null,
      selectedDate: -1
    };
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.handleSubmitLocationName = this.handleSubmitLocationName.bind(this);
    this.handleChangeLocationName = this.handleChangeLocationName.bind(this);
    this.handleClickForecastedDay = this.handleClickForecastedDay.bind(this);
  }

  componentDidMount() {
    const loadedCoords= JSON.parse(localStorage.getItem(this.LS_KEY));
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
      const { latitude, longitude } = position.coords;
      const searchReq = {
        key: this.SEARCH_KEY.COORDS,
        lat: latitude,
        lon: longitude
      };
      this.searchWeather(searchReq);
    } catch (error) {
      console.error('Cant access geo location ' + error);
    }
  }

  searchWeather = async (searchReq) => {
    const searchQuery = searchReq.key === this.SEARCH_KEY.COORDS ? 
      `lat=${searchReq.lat}&lon=${searchReq.lon}`
      : `q=${searchReq.locationName}`;
    const currentWeather = await this.callCurrentWeather(searchQuery);
    const forecast = await this.callForecast(searchQuery);
    
    if (currentWeather && forecast) {
      forecast[currentWeather.date] = currentWeather;
      this.setState({
        locationName: currentWeather.locationName,
        foundLocationName: currentWeather.locationName,
        currentWeather,
        forecast,
        selectedDate: -1,
      });
      localStorage.setItem(this.LS_KEY, JSON.stringify({
        key: this.SEARCH_KEY.CITY,
        locationName: currentWeather.locationName
      }));
    } else {
      this.setState({
        locationName: this.state.foundLocationName
      });
    }
  }

  parseWeatherData = (obj) => {
    const timestamp = obj.dt * 1000
    const d = moment(timestamp)
    return {
      dt: timestamp,
      date: parseInt(d.format('YYYYMMDD')),
      hours: parseInt(d.format('H')),
      day: this.WEEKS[d.day()],
      temp: obj.main.temp,
      temp_min: obj.main.temp_min,
      temp_max: obj.main.temp_max,
      pressure: obj.main.pressure,
      humidity: obj.main.humidity,
      weather: obj.weather[0],
      wind: obj.wind
    }
  }

  callCurrentWeather = (searchQuery) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?${searchQuery}&appid=${this.API_KEY}&units=metric&lang=kr`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') return false;
        const currentWeather = this.parseWeatherData(json);
        currentWeather.coords = json.coord;
        currentWeather.locationName = `${json.name}, ${json.sys.country}`;
        return currentWeather;
      })
      .catch(err => console.error(err));
  }

  callForecast = (searchQuery) => {
    const cnt = (() => {
      const REQUEST_MAX_CNT = 39;
      return REQUEST_MAX_CNT - Math.floor(moment().format('H') / 3);
    })();

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchQuery}&appid=${this.API_KEY}&units=metric&lang=kr&cnt=${cnt}`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') return false;
        return json.list
          .map(f => this.parseWeatherData(f))
          .reduce((acc, f) => {
            let item = acc[f.date] || f;
            if (f.hours >= 12 && f.hours <= 15) {
              item = f;
            }
            item.temp_max = Math.max(item.temp_max, f.temp_max);
            item.temp_min = Math.min(item.temp_min, f.temp_min);
            acc[f.date] = item;
            return acc;
          }, {});
      })
      .catch(err => console.error(err));
  }

  isTodayWeather = () => {
    return this.state.selectedDate === -1
      || this.state.selectedDate === this.state.currentWeather.date;
  }

  getWeatherDataToPrint = () => {
    return this.state.selectedDate === -1 ? 
      this.state.currentWeather : this.state.forecast[this.state.selectedDate];
  }

  handleTogglePopup = () => {
    this.setState({
      isShownPopup: this.state.isShownPopup ? false : true
    });
  }

  handleSubmitLocationName = (isVerified) => {
    if (isVerified) {
      const searchReq = {
        key: this.SEARCH_KEY.CITY,
        locationName: this.state.locationName
      };
      this.searchWeather(searchReq);
    } else {
      this.setState({
        locationName: this.state.foundLocationName
      });
    }
  }

  handleChangeLocationName = (e) => {
    this.setState({
      locationName: e.target.value
    });
  }

  handleClickForecastedDay = (selectedDate) => {
    const isSelected = this.state.selectedDate === selectedDate;
    this.setState({
      selectedDate: isSelected ? -1 : selectedDate
    });
  }

  render() {
    return (
      <div id="weather" className={"widget-container weather " +  (this.state.isShownPopup ? "show" : "")}>
        {this.state.currentWeather ?
        (<div>
          <Dashboard
            isShownPopup={this.state.isShownPopup}
            currentWeather={this.state.currentWeather}
            clickVerifier={(el) => { return !!this.popupWrapperRef.contains(el); }}
            onTogglePopup={this.handleTogglePopup}
          /> 
          <div
            ref={node => this.popupWrapperRef = node}
            className={"widget-wrapper nipple-top-right " + (this.state.isShownPopup ? "show-fade-in" : "")}>
            <div className="widget-popup">
              <div className="weather-current">
                <div className="weather-header">
                  <span className="weather-location">
                    <LocationNameInput
                      locationName={this.state.locationName}
                      foundLocationName={this.state.foundLocationName}
                      onSubmit={this.handleSubmitLocationName}
                      onChange={this.handleChangeLocationName}
                    />
                    <span className="day">
                      {this.isTodayWeather() ? "" : this.getWeatherDataToPrint().day}
                    </span>
                  </span>
                </div>
                <WeatherDetails
                  isTodayWeather={this.isTodayWeather()}
                  weatherData={this.getWeatherDataToPrint()} 
                />
              </div>
              <Forecast
                selectedDate={this.state.selectedDate}
                onClick={this.handleClickForecastedDay}
                forecast={this.state.forecast}
              />
            </div>
          </div>
        </div>) : null}
      </div>
    )
  }
}
