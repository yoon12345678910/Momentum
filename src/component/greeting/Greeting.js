import React from 'react';
import moment from 'moment';
import UserNameInput from './UserNameInput'
import './Greeting.css';


export default class Greeting extends React.Component {
  constructor() {
    super()

    this.GREETING = {
      MORNING: 'Good morning',
      AFTERNOON: 'Good afternoon',
      EVENING: 'Good evening'
    }
    this.state = {
      greeting: this._getGreeting()
    }
    this.timerID = null
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        greeting: this._getGreeting()
      })
    }, 1000)
  }

  _getGreeting = () => {
    const hours = moment().format('H')
    let greeting

    if (hours >= 5 && hours < 12) {
      greeting = this.GREETING.MORNING;
    } else if (hours >= 12 && hours < 17) {
      greeting = this.GREETING.AFTERNOON;
    } else {
      greeting = this.GREETING.EVENING;
    }

    return `${greeting}, `
  }

  render() {
    return (
      <div id="greeting" className="widget-container greeting bold">
        <span className="content">
          <span className="message">{this.state.greeting}</span>
          <UserNameInput />
        </span>
      </div>
    )
  }
}
