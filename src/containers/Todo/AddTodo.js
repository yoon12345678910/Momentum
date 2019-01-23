import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { AddTodoForm } from 'components/Todo';


class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
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
      title: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const { title } = this.state;
      const trim = title.replace(/\s/gi, '');
      if (trim.length) {
        this.setState({
          title: ''
        });
        this.props.TodoActions.addTodo({
          title: title,
          isMainFocus: false,
        });
      }
    } 
  }

  render() {
    return (
      <AddTodoForm
        innerRef={this.inputRef}
        title={this.state.title}
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