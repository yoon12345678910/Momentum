import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { MainFocusPrompt } from 'components/MainFocus';
import { animateCSS } from 'lib/utils';


class Prompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.wrapperRef = React.createRef();
    this.inputRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    animateCSS(this.wrapperRef.current, 'fadeIn');
    this.inputRef.current.focus();
  }

  handleClick = () => {
    this.inputRef.current.focus();
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const trim = this.state.value.replace(/\s/gi, '');
      if (trim.length) {
        this.setState({
          value: ''
        });
        this.props.TodoActions.addTodo({
          title: this.state.value,
          isMainFocus: true
        });
      }
    } 
  }

  render() {
    return (
      <MainFocusPrompt
        wrapperRef={this.wrapperRef}
        inputRef={this.inputRef}
        value={this.state.value}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}/>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Prompt);