import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import * as mainFocusActions from 'redux/modules/mainFocus';
import { TodoItem as TodoItemComponent } from 'components/Todo';
import { focusContenteditable, animateCSS } from 'lib/utils';


class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
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
      title: e.target.value
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

  handleChangeTitle = async () => {
    const title = this.state.title;
    const enteredTitle = this.props.title;

    this.isClickOrBlur = true;
    const trim = title.replace(/(^\s*)|(\s*$)/, '');

    if (!trim.length || trim === enteredTitle) {
      this.setState({
        title: enteredTitle,
        disabledInput: true
      });
    } else {
      const { 
        id, 
        isMainFocus, 
        TodoActions, 
        MainFocusActions
      } = this.props;
      this.setState({
        enteredTitle: title,
        disabledInput: true
      });

      try {
        if (isMainFocus) {
          await MainFocusActions.updateTodoTitle({
            id,
            title,
            isMainFocus
          });
        }
        TodoActions.updateTodoTitle({
          id,
          title,
          isMainFocus
        });
      } catch (e) {}
    }
  }

  handleChangeCheckbox = async (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const { 
      id, 
      isDone, 
      isMainFocus, 
      TodoActions, 
      MainFocusActions 
    } = this.props;

    try {
      if (isMainFocus) {
        await MainFocusActions.updateTodoDone({
          id,
          isDone: !isDone,
          isMainFocus: isMainFocus
        });
      }
      TodoActions.updateTodoDone({
        id,
        isDone: !isDone,
        isMainFocus: isMainFocus
      });
    } catch (e) {}
  }

  handleDelete = async (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const { 
      id, 
      isMainFocus,
      TodoActions,
      MainFocusActions
    } = this.props;

    try {
      if (isMainFocus) {
        MainFocusActions.deleteTodo({ id, isMainFocus }); 
      }
      TodoActions.deleteTodo({ id, isMainFocus });  
    } catch (e) {}
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
        title={this.state.title}
        isDone={this.props.isDone}
        isMainFocus={this.props.isMainFocus}
        disabled={this.state.disabledInput}
        onChange={this.handleChange}
        onDoubleClick={this.handleDoubleClick}
        onChangeTitle={this.handleChangeTitle}
        onChangeCheckbox={this.handleChangeCheckbox}
        onDelete={this.handleDelete}
        isHoverDeleteButton={this.state.isHoverDeleteButton}
        onHoverDeleteButton={this.handleHoverDeleteButton}/>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch),
    MainFocusActions: bindActionCreators(mainFocusActions, dispatch)
  })
)(TodoItem);