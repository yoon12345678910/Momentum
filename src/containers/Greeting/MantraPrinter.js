import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { getRandomMantra } from 'lib/api/greeting';


class MantraPrinter extends Component {
  componentDidMount() {
    const { setLoadedMode, setMantra } = this.props.GreetingActions;

    setLoadedMode();
    setMantra({...getRandomMantra()});
  }

  render() {
    return (
      <span>
        {this.props.mantra}
      </span>
    )
  }
}

export default connect(
  (state) => ({
    mantra: state.greeting.get('mantra'),
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(MantraPrinter);