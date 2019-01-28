import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import moment from 'moment';


class GreetingPrinter extends Component {
  constructor(props) {
    super(props);

    this.timeoutID = null;
  }

  componentDidMount() {
    this.props.GreetingActions.setLoadedMode();
    this.getGreeting();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  getGreeting = () => {
    const t = moment();
    const curHour = parseInt(t.format('H'));
    const calcNextInterval = (nextHour) => {
      const hour = nextHour - curHour < 0 ? 24 - curHour + nextHour : nextHour - curHour;
      const ms = (parseInt(t.format('mm')) * 60000 + parseInt(t.format('ss')));
      return hour * 60 * 60000 - ms;
    };
    let greeting;
    let nextInterval;

    if (curHour >= 5 && curHour < 12) {
      greeting = 'Good morning';
      nextInterval = calcNextInterval(12);
    }
    else if (curHour >= 12 && curHour < 17) {
      greeting = 'Good afternoon';
      nextInterval = calcNextInterval(17);
    }
    else {
      greeting = 'Good evening';
      nextInterval = calcNextInterval(5);
    }

    this.props.GreetingActions.setGreeting({ greeting });
    
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.getGreeting();
    }, nextInterval);
  }

  render() {
    return (
      <span>
        {`${this.props.greeting}, `}
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
)(GreetingPrinter);