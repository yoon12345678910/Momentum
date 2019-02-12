import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Widget, CurrentTime, Meridiem } from 'components/Clock';
import * as clockActions from 'redux/modules/clock';


class Clock extends Component {
  constructor(props) {
    super(props);

    this.LS_KEY = 'hour12clock';
    this.HOUR_FORMAT = {
      hour12: 'h:mm',
      hour24: 'HH:mm'
    };
    this.timerID = null;
    this.isOnMeridiem = false; // Meridiem.. First unconditionally hidden
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    const loaedHour12clock = JSON.parse(localStorage.getItem(this.LS_KEY));
    if (loaedHour12clock !== null) {
      this.setTime(loaedHour12clock);
    } else {
      this.setTime(this.props.hour12clock);
    }
    this.timerID = setInterval(() => this.setTime(this.props.hour12clock), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  setTime = (hour12clock) => {
    const now = moment();
    this.props.ClockActions.setTime({
      hour12clock,
      meridiem: now.format('a'),
      currentTime: now.format(
        hour12clock? this.HOUR_FORMAT.hour12 : this.HOUR_FORMAT.hour24)
    });
  }

  handleDoubleClick = () => {
    const hour12clock = this.props.hour12clock ? false : true;
    this.isOnMeridiem = true;
    this.setTime(hour12clock);
    localStorage.setItem(this.LS_KEY, JSON.stringify(hour12clock));
  }

  render() {
    return (
      <Widget>
        <CurrentTime
          onDoubleClick={this.handleDoubleClick}>
          {this.props.currentTime}
        </CurrentTime>
        <Meridiem
          isShown={this.isOnMeridiem && this.props.hour12clock}>
          {this.props.meridiem}
        </Meridiem>
      </Widget>
    )
  }
}

export default connect(
  (state) => ({
    hour12clock: state.clock.get('hour12clock'),
    meridiem: state.clock.get('meridiem'),
    currentTime: state.clock.get('currentTime')
  }),
  (dispatch) => ({
    ClockActions: bindActionCreators(clockActions, dispatch)
  })
)(Clock);
