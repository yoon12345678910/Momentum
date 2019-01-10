import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { Dropdown } from 'components/Base';
import { MoreBox } from 'components/Greeting';


class MoreAction extends Component {
  constructor(props) {
    super(props);

    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const onToggle = () => this.props.GreetingActions.toggleDropdown();
    const outsideClickListener = () => {
      onToggle();
      removeClickListener();
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };
    onToggle();
    if (this.props.isActiveDropdown) {
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
    const { isActiveDropdown } = this.props;

    return (
      <MoreBox
        onClick={this.handleClick}
        isActive={isActiveDropdown}>
          { isActiveDropdown ?
            <Dropdown
              data={this.generateDropdownData()}
              isActiveDropdown={isActiveDropdown}
            /> : null
          }
      </MoreBox>
    )
  }
}

export default connect(
  (state) => ({
    mode: state.greeting.get('mode'),
    isActiveDropdown: state.greeting.get('isActiveDropdown')
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(MoreAction);
