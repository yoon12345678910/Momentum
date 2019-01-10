import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActions from 'redux/modules/weather';
import { Dashboard as DashboardComponent} from 'components/Weather';


class Weather extends Component {
  constructor(props) {
    super(props);

    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const onToggle = () => this.props.WeatherActions.toggleDashboard();
    const outsideClickListener = (e) => {
      if (!this.props.popupRef.current.contains(e.target)) {
        onToggle();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };
    onToggle();
    if (this.props.isVisiblePopup) {
      removeClickListener();
    } else {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }
  }

  render() {
    return (
      <DashboardComponent
        currentWeather={this.props.currentWeather.toJS().data}
        foundLocationName={this.props.foundLocationName}
        onClick={this.handleClick}/>
    );
  }
}

export default connect(
  (state) => ({
    isVisiblePopup: state.weather.get('isVisiblePopup'),
    currentWeather: state.weather.get('currentWeather'),
    foundLocationName: state.weather.get('foundLocationName')
  }),
  (dispatch) => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(Weather);