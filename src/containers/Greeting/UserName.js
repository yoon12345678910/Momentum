import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserNameInput } from 'components/Greeting';
import * as greetingActions from 'redux/modules/greeting';
import { setEndOfContenteditable, animateCSS } from 'lib/utils';

class UserName extends Component {
  constructor(props) {
    super(props)

    this.LS_KEY = 'userName';
    this.randomName = ['lovely', 'good looking', 'sexy', 'rockstar', 'gorgeous', 'friends', 'pal', 'superstar'];
    this.enteredName = '';
    this.animating = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSubmitUserName = this.handleSubmitUserName.bind(this);
  }

  componentDidMount() {
    const currentUser = localStorage.getItem(this.LS_KEY);
    let userName;

    if (currentUser === null) {
      userName = this.randomName[Math.floor(Math.random() * this.randomName.length)];
    } else {
      userName = currentUser;
    }
    this.props.GreetingActions.setUserName({userName});
    this.enteredName = userName;
  }

  componentDidUpdate() {
    if (this.animating) {
      const el = this.inputRef;
      setEndOfContenteditable(el);
      animateCSS(el, 'pulse');
      this.animating = false;
    }
  }

  handleSubmitUserName = (e) => {
    e.preventDefault();
    this.animating = true;

    const { userName } = this.props;
    const trim = userName.replace(/\s/gi, '');

    if (!trim.length || trim === this.enteredName) {
      this.props.GreetingActions.setUserName({
        userName: this.enteredName
      });
    } else {
      this.enteredName = userName;
      localStorage.setItem(this.LS_KEY, userName);
    }

    this.props.GreetingActions.setInputDisabled({
      isDisabledInput: true
    });
  }

  handleChange = (e) => {
    this.props.GreetingActions.setUserName({
      userName: e.target.value
    });
  }

  handleDoubleClick = () => {
    if (this.props.isDisabledInput) {
      this.animating = true;
    }
    this.props.GreetingActions.setInputDisabled({
      isDisabledInput: false
    });
  }

  render() {
    return (
      <UserNameInput
        innerRef={node => this.inputRef = node}
        isDisabledInput={this.props.isDisabledInput}
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
    isDisabledInput: state.greeting.get('isDisabledInput')
  }),
  (dispatch) => ({
    GreetingActions: bindActionCreators(greetingActions, dispatch)
  })
)(UserName);