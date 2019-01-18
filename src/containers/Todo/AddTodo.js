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

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
        this.props.TodoActions.addTodo({
          title: this.state.value
        });
        this.setState({
          value: ''
        });
      }
    } 
  }

  render() {
    return (
      <AddTodoForm
        innerRef={this.props.innerRef}
        isVisible={this.props.isVisibleAddTodo}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}

export default connect(
  (state) => ({
    isVisibleAddTodo: state.todo.get('isVisibleAddTodo')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(AddTodo);