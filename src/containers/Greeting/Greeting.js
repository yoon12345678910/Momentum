import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { Dropdown } from 'components/Base';
import { Widget, Content, Side, MoreBox } from 'components/Greeting';
import { GreetingPrinter, MantraPrinter, UserName } from 'containers/Greeting';
import { animateCSS } from 'lib/utils';


class Greeting extends Component {
  constructor(props) {
    super(props);

    this.AUTO_TIME = {
      MANTRA: 6000 * 2,
      GREETING: 6000 * 2
    };
    this.contentRef = React.createRef();
    this.greetingTimeoutID = null;
    this.mantraTimeoutID = null;
    this.handleClickDocument = null;
    this.handleClickMoreBox = this.handleClickMoreBox.bind(this);
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
    const { mode, GreetingActions } = this.props;

    if (mode === 'GREETING') {
      this.mantraTimeoutID = setTimeout(() => {
        this.animateContentPromise()
          .then(() => {
            GreetingActions.changeMode({mode: 'MANTRA'});
          });
      }, this.AUTO_TIME.MANTRA);
    } else {
      this.greetingTimeoutID = setTimeout(() => {
        this.animateContentPromise()
          .then(() => {
            GreetingActions.changeMode({mode: 'GREETING'});
          });
      }, this.AUTO_TIME.GREETING);
    }
  }
  
  clearAutoChangeMode = () => {
    clearTimeout(this.greetingTimeoutID);
    clearTimeout(this.mantraTimeoutID);
  }

  animateContentPromise = async () => {
    return await animateCSS(this.contentRef.current, 'fadeOut')
      .then(() => {
        animateCSS(this.contentRef.current, 'fadeIn');
      });
  }

  handleClickMoreBox = () => {
    const { isActiveDropdown, GreetingActions } = this.props;
    const onToggle = () => GreetingActions.toggleDropdown();
    const outsideClickListener = () => {
      onToggle();
      removeClickListener();
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };

    onToggle();
    if (isActiveDropdown) {
      removeClickListener();
    } else {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }
  }

  generateDropdownData = () => {
    const { mode, GreetingActions } = this.props;
    let data = [];
    if (mode === 'GREETING') {
      data = [
        {
          label: 'Show mantra',
          onClick: () => {
            this.animateContentPromise()
              .then(() => {
                GreetingActions.changeMode({mode: 'MANTRA'});
              });
          }
        },
        {
          label: 'Edit your name',
          onClick: () => {
            GreetingActions.focuseUserName();
          }
        }
      ];
    } else {
      data = [
        {
          label: `Don't show again`,
          onClick: () => {
            this.animateContentPromise()
              .then(() => {
                GreetingActions.changeMode({mode: 'GREETING'});
              });
          }
        }
      ];
    }
    return data;
  }

  render() {
    const { 
      mode, 
      isHiddenUserName, 
      isActiveDropdown
    } = this.props;

    if (mode === 'INIT') {
      return null;
    }

    return (
      <Widget>
        <Side/>
        <Content
          innerRef={this.contentRef}>
          { mode === 'GREETING' ? <GreetingPrinter/> : <MantraPrinter/> }
          { isHiddenUserName ? null : <UserName/> }
        </Content>
        <Side>
          <MoreBox
            onClick={this.handleClickMoreBox}
            isActive={isActiveDropdown}>
              { isActiveDropdown ?
                <Dropdown
                  data={this.generateDropdownData()}
                  isActiveDropdown={isActiveDropdown}
                /> : null
              }
          </MoreBox>
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
    isActiveDropdown: state.greeting.get('isActiveDropdown')
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(Greeting);
