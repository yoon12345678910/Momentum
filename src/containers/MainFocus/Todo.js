import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { MainFocusTodo } from 'components/MainFocus';
import { animateCSS } from 'lib/utils';


class Prompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };

    this.wrapperRef = React.createRef();
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleHover = this.handleToggleHover.bind(this);
  }

  componentDidMount() {
    animateCSS(this.wrapperRef.current, 'fadeIn');
  }

  changePromptMode = () => {
    this.props.TodoActions.changeMainFocusMode({
      mode: 'PROMPT'
    });
  }

  handleChangeCheckbox = () => {
    const { id, isDone, isMainFocus } = this.props.data;
    this.props.TodoActions.updateTodoDone({
      id,
      isDone: !isDone,
      isMainFocus
    });
  }

  handleDelete = () => {
    const { id, isMainFocus } = this.props.data;
    this.props.TodoActions.deleteTodo({
      id,
      isMainFocus
    });
  }

  handleToggleHover = (isHover) => {
    this.setState({
      isHover
    });
  }

  render() {
    const { title, isDone } = this.props.data;

    return (
      <MainFocusTodo
        wrapperRef={this.wrapperRef}
        title={title}
        isDone={isDone}
        isHover={this.state.isHover}
        onChangeCheckbox={this.handleChangeCheckbox}
        onDelete={this.handleDelete}
        onToggleHover={this.handleToggleHover}
        changePromptMode={this.changePromptMode}/>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Prompt);