import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import WeatherTemp from './WeatherTemp';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const { isShownPopup, clickVerifier, onTogglePopup } = this.props;

    const outsideClickListener = (e) => {
      if (!clickVerifier(e.target)) {
        onTogglePopup();
        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    }

    onTogglePopup();

    if (!isShownPopup) {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    } else {
      removeClickListener();
    }
  }

  render() {
    const { currentWeather } = this.props;

    return (
      <div 
        onClick={this.handleClick}
        title={currentWeather.weather.main}
        className="widget-dash">
        <div className="metric-stat">
          <WeatherIcon 
            icon={currentWeather.weather.icon} 
          />
          <WeatherTemp
            temp={currentWeather.temp}
          />
        </div>
        <span className="location-name">
          {currentWeather.locationName}
        </span>
      </div>
    )
  }
}

Dashboard.propTypes = {
  isShownPopup: PropTypes.bool.isRequired,
  clickVerifier: PropTypes.func.isRequired,
  onTogglePopup: PropTypes.func.isRequired,
  currentWeather: PropTypes.shape({
    weather: PropTypes.shape({
      main: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
    temp: PropTypes.number.isRequired,
    locationName: PropTypes.string.isRequired
  }).isRequired
}
