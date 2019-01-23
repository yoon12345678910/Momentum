import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { TodoItem as TodoItemComponent } from 'components/Todo';
import { focusContenteditable, animateCSS } from 'lib/utils';


class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.title,
      disabledInput: true,
      isHoverDeleteButton: false,
    };

    this.isClickOrBlur = false;
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleHoverDeleteButton = this.handleHoverDeleteButton.bind(this);
  }

  componentDidUpdate() {
    if (this.isClickOrBlur) {
      this.animateInput();
      this.focusInput();
      this.isClickOrBlur = false;
    }
  }

  animateInput = () => {
    animateCSS(this.inputRef.current, 'pulse');
  }

  focusInput = () => {
    if (!this.state.disabledInput) {
      focusContenteditable(this.inputRef.current, true);
    }
  }

  handleChange = (e) => {
    this.isClickOrBlur = false;
    this.props.resizeList();
    this.setState({
      value: e.target.value
    });
  }

  handleDoubleClick = () => {
    if (this.state.disabledInput) {
      this.isClickOrBlur = true;
      this.setState({
        disabledInput: false
      });
    }
  }

  handleChangeTitle = () => {
    const value = this.state.value;
    const enteredValue = this.props.title;

    this.isClickOrBlur = true;
    const trim = value.replace(/(^\s*)|(\s*$)/, '');

    if (!trim.length || trim === enteredValue) {
      this.setState({
        value: enteredValue,
        disabledInput: true
      });
    } else {
      this.setState({
        enteredValue: value,
        disabledInput: true
      });
      this.props.TodoActions.updateTodoTitle({
        id: this.props.id,
        title: value,
        isMainFocus: this.props.isMainFocus
      });
    }
  }

  handleChangeCheckbox = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.props.TodoActions.updateTodoDone({
      id: this.props.id,
      isDone: !this.props.isDone,
      isMainFocus: this.props.isMainFocus
    });
  }

  handleDelete = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.props.TodoActions.deleteTodo({
      id: this.props.id,
      isMainFocus: this.props.isMainFocus
    });
  }

  handleHoverDeleteButton = (isHoverDeleteButton) => {
    this.setState({
      isHoverDeleteButton
    });
  }

  render() {    
    return (
      <TodoItemComponent
        innerRef={this.inputRef}
        value={this.state.value}
        isDone={this.props.isDone}
        disabled={this.state.disabledInput}
        onChange={this.handleChange}
        onDoubleClick={this.handleDoubleClick}
        onChangeTitle={this.handleChangeTitle}
        onChangeCheckbox={this.handleChangeCheckbox}
        onDelete={this.handleDelete}
        isHoverDeleteButton={this.state.isHoverDeleteButton}
        onHoverDeleteButton={this.handleHoverDeleteButton}
      />
    );
  }
}

export default connect(
  (state) => ({
    todos: state.todo.get('todos')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoItem);