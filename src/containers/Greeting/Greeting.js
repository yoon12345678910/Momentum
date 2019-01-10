import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { Widget, Content, Side } from 'components/Greeting';
import { GreetingPrinter, MantraPrinter, UserName, MoreAction } from 'containers/Greeting';
import { animateCSS } from 'lib/utils';


class Greeting extends Component {
  constructor(props) {
    super(props);

    this.TIMER = {
      GREETING: 60000 * 2,
      MANTRA: 60000 * 5
    };
    this.contentRef = React.createRef();
    this.timeoutID = null;
  }

  componentDidMount() {
    this.prepareAutoChangeMode();
  }

  componentDidUpdate() {
    if (this.props.isChangedMode) {
      this.prepareAutoChangeMode();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  animateContentPromise = async () => {
    return await animateCSS(this.contentRef.current, 'fadeOut')
      .then(() => {
        animateCSS(this.contentRef.current, 'fadeIn');
      });
  }

  changeMode = () => {
    this.animateContentPromise()
      .then(() => {
        this.props.GreetingActions.changeMode({
          mode: (this.props.mode === 'GREETING' ? 'MANTRA' : 'GREETING')
        });
      });
  }

  prepareAutoChangeMode = () => {
    const timeset = this.props.mode === 'GREETING'
      ? this.TIMER.MANTRA : this.TIMER.GREETING;

    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.changeMode();
    }, timeset);
  }

  render() {
    return (
      <Widget>
        <Side/>
        <Content innerRef={this.contentRef}>
          { 
            this.props.mode === 'GREETING' 
              ? <GreetingPrinter/> : <MantraPrinter/> 
          }
          { 
            this.props.isHiddenUserName ? null : <UserName/> 
          }
        </Content>
        <Side>
          <MoreAction changeMode={this.changeMode}/>
        </Side>
      </Widget>
    )
  }
}

export default connect(
  (state) => ({
    mode: state.greeting.get('mode'),
    isChangedMode: state.greeting.get('isChangedMode'),
    isHiddenUserName: state.greeting.get('isHiddenUserName'),
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(Greeting);
