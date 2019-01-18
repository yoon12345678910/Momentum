import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { Widget } from 'components/Base';
import { Popup } from 'components/Todo';
import { Dashboard, ListChooser, TodoList, AddTodo } from 'containers/Todo';

 
class Todo extends Component {
  constructor(props) {
    super(props);

    this.popupRef = React.createRef();
    this.todoListChooserRef = React.createRef();
    this.addTodoRef = React.createRef();
    this.popupHeightRefs = [];
  }

  componentDidMount() {
    this.props.TodoActions.initTodo();

    this.popupHeightRefs = [
      ...this.props.layoutRef,
      this.todoListChooserRef, 
      this.addTodoRef
    ];
  }

  render() {
    return (
      <Widget>
        <Popup
          innerRef={this.popupRef}
          isVisible={this.props.isVisiblePopup}>
          <ListChooser innerRef={this.todoListChooserRef}/>
          <TodoList popupHeightRefs={this.popupHeightRefs}/>
          <AddTodo innerRef={this.addTodoRef}/>
        </Popup>
        <Dashboard
          popupRef={this.popupRef}/>
      </Widget>
    );
  }
}

export default connect( 
  (state) => ({
    isVisiblePopup: state.todo.get('isVisiblePopup')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Todo);
