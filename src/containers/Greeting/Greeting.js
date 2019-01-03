import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { Widget, MoreBox, Dropdown } from 'components/Base';
import { Content, Side } from 'components/Greeting';
import { GreetingMessage, MantraMessage, UserName } from 'containers/Greeting';
import { animateCSS } from 'lib/utils';


class Greeting extends Component {
  constructor(props) {
    super(props);

    this.AUTO_TIME = {
      MANTRA: 6000 * 2,
      GREETING: 6000 * 2
    }
    this.greetingTimeoutID = null;
    this.mantraTimeoutID = null;
    this.handleClickDocument = null;
    this.handleClickMoreButton = this.handleClickMoreButton.bind(this);
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
    return await animateCSS(this.contentRef, 'fadeOut')
      .then(() => {
        animateCSS(this.contentRef, 'fadeIn');
      });
  }

  handleClickMoreButton = () => {
    const { isActiveDropdown, GreetingActions } = this.props;
    const onToggle = () => GreetingActions.toggleDropdown();
    const outsideClickListener = (e) => {
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
    const { mode, isHiddenUserName, isActiveDropdown } = this.props;
    const roundStyle = { size: 30 };
    const iconStyle = { size: 20 };

    return (
        <Widget isFlex={true}>
          <Side/>
          <Content
            innerRef={node => this.contentRef = node}>
            { mode === 'GREETING' ? <GreetingMessage /> : null }
            { mode === 'MANTRA' ? <MantraMessage /> : null }
            { isHiddenUserName ? null : <UserName /> }
          </Content>
          <Side>
            <MoreBox
              onClick={this.handleClickMoreButton}
              isActive={isActiveDropdown}
              roundStyle={roundStyle}
              iconStyle={iconStyle}>
                { isActiveDropdown ?
                  <Dropdown
                    innerRef={node => this.dropdownRef = node}
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
