import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { MoreBox, MoreBoxDropdown } from 'components/Greeting';


class MoreAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const onToggle = () => {
      this.setState({
        isActive: !this.state.isActive
      });
    };
    const outsideClickListener = () => {
      onToggle();
      removeClickListener();
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };

    onToggle();
    if (this.state.isActive) {
      removeClickListener();
    } else {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }
  }

  generateDropdownData = () => {
    const dropdownData = [
      { 
        activeMode: 'GREETING', 
        label: 'Show mantra', 
        onClick: () => this.props.changeMode()
      },
      { 
        activeMode: 'GREETING', 
        label: 'Edit your name', 
        onClick: () => this.props.GreetingActions.focuseUserName()
      },
      { 
        activeMode: 'MANTRA', 
        label: `Don't show again`, 
        onClick: () => this.props.changeMode() 
      },
    ];
    return dropdownData.filter(d => d.activeMode === this.props.mode);
  }

  render() {
    const { isActive } = this.state;

    return (
      <MoreBox
        isActive={isActive}
        isHover={this.props.isContentHover}
        onClick={this.handleClick}>
          { isActive ?
            <MoreBoxDropdown
              data={this.generateDropdownData()}
              isActive={isActive}
            /> : null
          }
      </MoreBox>
    )
  }
}

export default connect(
  (state) => ({
    mode: state.greeting.get('mode'),
    isContentHover: state.greeting.get('isContentHover')
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(MoreAction);
