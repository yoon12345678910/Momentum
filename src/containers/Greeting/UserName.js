import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as greetingActions from 'redux/modules/greeting';
import { UserNameInput } from 'components/Greeting';
import { focusContenteditable, animateCSS } from 'lib/utils';
import { getRandomName } from 'lib/api/greeting';


class UserName extends Component {
  constructor(props) {
    super(props);

    this.LS_KEY = 'userName';
    this.enteredUserName = '';
    this.init = false;
    this.isEditing = false;
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSubmitUserName = this.handleSubmitUserName.bind(this);
  }

  componentDidMount() {
    const loadedUserName = localStorage.getItem(this.LS_KEY);
    this.enteredUserName = loadedUserName === null
      ? getRandomName() : loadedUserName;
    this.props.GreetingActions.setUserName({
      userName: this.enteredUserName
    });
  }

  componentDidUpdate() {
    if (!this.isEditing) {
      this.animateInput();
      this.focuseInput();
    }
  }

  animateInput = () => {
    if (!this.init) {
      this.init = true;
      return;
    }
    animateCSS(this.inputRef.current, 'pulse');
  }

  focuseInput = () => {
    if (this.props.isFocusedUserName) {
      focusContenteditable(this.inputRef.current);
    }
  }

  handleSubmitUserName = (e) => {
    e.preventDefault();
    this.isEditing = false;

    const { userName, GreetingActions } = this.props;
    const trim = userName.replace(/\s/gi, '');

    if (!trim.length || trim === this.enteredUserName) {
      GreetingActions.setUserName({
        userName: this.enteredUserName
      });
    } else {
      this.enteredUserName = userName;
      localStorage.setItem(this.LS_KEY, userName);
    }

    GreetingActions.blurUserName();
  }

  handleChange = (e) => {
    this.isEditing = true;
    this.props.GreetingActions.setUserName({
      userName: e.target.value
    });
  }

  handleDoubleClick = () => {
    const { isFocusedUserName, GreetingActions } = this.props;
    if (!isFocusedUserName) {
      this.isEditing = false;
      GreetingActions.focuseUserName();
    }
  }

  render() {
    return (
      <UserNameInput
        innerRef={this.inputRef}
        isDisabled={!this.props.isFocusedUserName}
        onChange={this.handleChange}
        onDoubleClick={this.handleDoubleClick}
        onSubmit={this.handleSubmitUserName}>
        {this.props.userName}
      </UserNameInput>
    )
  }
}

export default connect(
  (state) => ({
    userName: state.greeting.get('userName'),
    isFocusedUserName: state.greeting.get('isFocusedUserName')
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(UserName);