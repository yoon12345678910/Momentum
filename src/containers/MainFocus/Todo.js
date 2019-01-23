import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainFocusActions from 'redux/modules/mainFocus';
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
    this.props.TodoActions.createTodoMainFocus({ todo: this.props.data });
  }

  changePromptMode = () => {
    this.props.MainFocusActions.changeMode({ mode: 'PROMPT' });
  }

  handleChangeCheckbox = async () => {
    const { id, isDone, isMainFocus } = this.props.data;
    try {
      await this.props.MainFocusActions.updateTodoDone({
        id,
        isDone: !isDone,
        isMainFocus
      });
      await this.props.TodoActions.updateTodoDoneMainFocus({
        id,
        isDone: !isDone,
        isMainFocus,
        todo: this.props.data
      });
    } catch (e) {}
  }

  handleDelete = async () => {
    const { id, isMainFocus } = this.props.data;
    try {
      await this.props.MainFocusActions.deleteTodo({ id, isMainFocus });
      this.props.TodoActions.deleteTodoMainFocus({ id, isMainFocus });
    } catch (e) {}
  }

  handleToggleHover = (isHover) => {
    this.setState({ isHover });
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
    MainFocusActions: bindActionCreators(mainFocusActions, dispatch),
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Prompt);