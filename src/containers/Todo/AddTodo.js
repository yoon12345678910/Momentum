import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { AddTodoForm } from 'components/Todo';


class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    if (this.props.todos.isEmpty()) {
      this.inputRef.current.focus();
    }
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
          isMainFocus: false,
        });
      }
    } 
  }

  render() {
    return (
      <AddTodoForm
        innerRef={this.inputRef}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}/>
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
)(AddTodo);