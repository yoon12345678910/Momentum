import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import moment from 'moment';


class GreetingMessage extends Component {
  constructor(props) {
    super(props);

    this.intervalID = null;
    this.GREETING = {
      MORNING: 'Good morning',
      AFTERNOON: 'Good afternoon',
      EVENING: 'Good evening'
    };
  }

  componentDidMount() {
    this.props.GreetingActions.setLoadedMode();
    this.getGreeting();
    
    this.intervalID = setInterval(() => {
      this.getGreeting();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getGreeting = () => {
    const hours = moment().format('H');
    let greeting;

    if (hours >= 5 && hours < 12) {
      greeting = this.GREETING.MORNING;
    } else if (hours >= 12 && hours < 17) {
      greeting = this.GREETING.AFTERNOON;
    } else {
      greeting = this.GREETING.EVENING;
    }

    this.props.GreetingActions.setGreeting({
      greeting: `${greeting}, `
    });
  }

  render() {
    return (
      <span>
        {this.props.greeting}
      </span>
    )
  }
}

export default connect(
  (state) => ({
    greeting: state.greeting.get('greeting'),
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(GreetingMessage);