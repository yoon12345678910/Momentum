import React from 'react';
import moment from 'moment';
import CurrentTime from './CurrentTime';
import Meridiem from './Meridiem';
import './Clock.css';

export default class Clock extends React.Component {
  constructor() {
    super()
    this.LS_KEY = 'hour12clock'
    this.FORMAT = {
      hour12: 'h:mm:ss',
      hour24: 'H:mm:ss'
    }
    this.state = {
      hour12clock: true
    }
    this.timerID = null
    // Meridiem.. First unconditionally hidden
    this.isOnMeridiem = false
    this._handleDoubleClick = this._handleDoubleClick.bind(this)
  }

  componentWillMount() {
    const savedFormat = JSON.parse(localStorage.getItem(this.LS_KEY))

    if (savedFormat) {
      this._getTime(savedFormat)   
    } else {
      this._getTime(this.state.hour12clock)
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this._getTime(this.state.hour12clock), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  _getTime = (hour12clock) => {
    const now = moment()
    this.setState({
      hour12clock,
      meridiem: now.format('a'),
      currentTime: now.format(hour12clock ? this.FORMAT.hour12 : this.FORMAT.hour24)
    })
  }

  _handleDoubleClick = () => {
    const hour12clock = this.state.hour12clock ? false : true
    this.isOnMeridiem = true
    this._getTime(hour12clock)
    localStorage.setItem(this.LS_KEY, hour12clock)
  }

  render() {
    return (
      <div id="clock" className="widget-container clock">
        <CurrentTime
          onDoubleClick={this._handleDoubleClick}>
          {this.state.currentTime}
        </CurrentTime>
        <Meridiem
          isOnMeridiem={this.isOnMeridiem}
          hour12clock={this.state.hour12clock}>
          {this.state.meridiem}
        </Meridiem>
      </div>
    )
  }
}

