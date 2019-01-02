import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { Widget } from 'components/Widget';
import { GreetingContent } from 'components/Greeting';
import { GreetingMessage, MantraMessage, UserName } from 'containers/Greeting';
import { animateCSS } from 'lib/utils';


class Greeting extends Component {
  constructor(props) {
    super(props);

    this.greetingTimeoutID = null;
    this.mantraTimeoutID = null;
  }

  componentDidMount() {
    this.props.GreetingActions.changeMode({mode: 'GREETING'});
  }

  componentWillUnmount() {
    this.clearAutoChangeMode();
  }

  componentDidUpdate() {
    if (this.props.isChangedMode) {
      this.clearAutoChangeMode();
      this.prepareAutoChangeMode();
    }
  }

  prepareAutoChangeMode = () => {
    const { mode, GreetingActions} = this.props;

    if (mode === 'GREETING') {
      this.mantraTimeoutID = setTimeout(() => {
        this.animateContentPromise()
          .then(() => {
            GreetingActions.changeMode({mode: 'MANTRA'});
          });
      }, 1000 * 3);
    } else {
      this.greetingTimeoutID = setTimeout(() => {
        this.animateContentPromise()
          .then(() => {
            GreetingActions.changeMode({mode: 'GREETING'});
          });
      }, 1000 * 3);
    }
  }
  
  clearAutoChangeMode = () => {
    clearTimeout(this.greetingTimeoutID);
    clearTimeout(this.mantraTimeoutID);
  }

  animateContentPromise = async () => {
    return await animateCSS(this.contentRef, 'fadeOut')
      .then(() => {
        animateCSS(this.contentRef, 'fadeIn');
      });
  }

  render() {
    const { mode, isUserNameHidden } = this.props;

    return (
      <div>
        <Widget>
          <GreetingContent
            innerRef={node => this.contentRef = node}>
            { mode === 'GREETING' ? <GreetingMessage /> : null }
            { mode === 'MANTRA' ? <MantraMessage /> : null }
            { isUserNameHidden ? null : <UserName /> }
          </GreetingContent>
        </Widget>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    mode: state.greeting.get('mode'),
    isChangedMode: state.greeting.get('isChangedMode'),
    isUserNameHidden: state.greeting.get('isUserNameHidden')
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(Greeting);
