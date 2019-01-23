import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainFocusActions from 'redux/modules/mainFocus';
import * as todoActions from 'redux/modules/todo';
import { MainFocusPrompt } from 'components/MainFocus';
import { animateCSS } from 'lib/utils';


class Prompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.wrapperRef = React.createRef();
    this.inputRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    animateCSS(this.wrapperRef.current, 'fadeIn');
    this.handleClick();
  }

  handleClick = () => {
    this.inputRef.current.focus();
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const trim = this.state.title.replace(/\s/gi, '');

      if (trim.length) {
        this.setState({ title: '' });
        this.props.MainFocusActions.createTodo({
          title: this.state.title
        });
      }
    } 
  }

  render() {
    return (
      <MainFocusPrompt
        wrapperRef={this.wrapperRef}
        inputRef={this.inputRef}
        title={this.state.title}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}/>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    MainFocusActions: bindActionCreators(mainFocusActions, dispatch),
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Prompt);