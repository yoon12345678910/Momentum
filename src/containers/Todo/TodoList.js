import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { TodoList as TodoListComponent } from 'components/Todo';
import { TodoItem, TodoEmpty } from 'containers/Todo';


class TodoList extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.listRef = React.createRef();
    this.originalListHieght = 0; 
  }

  componentDidUpdate() {
    // Prevent issue 
    // When a pop-up is turned on and you click outside of the widget, the list becomes zero.
    if (this.originalListHieght > 0 && this.listRef.current.offsetHeight === 0) {
      this.setListSize(this.originalListHieght);
    } else {
      const toBeHeight = this.calculateListSize();
      this.setListSize(toBeHeight);
    }
  }

  calculateListSize = () => {
    this.listRef.current.style.minHeight = null;
    this.listRef.current.style.maxHeight = null;

    // External element size to get maximum pop-up size
    const externalHeight = this.props.popupHeightRefs.reduce((acc, ref) => {
      return acc + ref.current.offsetHeight;
    }, 0);
    const maxHeight = window.innerHeight - externalHeight; 
    const listHeight = this.listRef.current.offsetHeight + 2;
    const toBeHeight = Math.min(Math.max(listHeight, this.props.dropdownHeight), maxHeight);
    this.originalListHieght = Math.min(listHeight, maxHeight);
    return toBeHeight;
  }

  setListSize = (height) => {
    this.wrapperRef.current.style.minHeight = `${height}px`;
    this.wrapperRef.current.style.maxHeight = `${height}px`;
    this.listRef.current.style.minHeight = `${height}px`;
    this.listRef.current.style.maxHeight = `${height}px`;
  }

  paintTodoList = () => {
    const todosJS = this.props.todos.toJS();
    const content = todosJS.length ? 
      (todosJS.map(todo => {
        return <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  resizeList={this.resizeList}
                  isDone={todo.isDone}
                  />;
      })) : <TodoEmpty/>;
    return content;
  }

  render() {
    return (
      <TodoListComponent
        wrapperRef={this.wrapperRef}
        listRef={this.listRef}>
        {this.paintTodoList()}
      </TodoListComponent>
    );
  }
}

export default connect(
  (state) => ({
    // isVisiblePopup: state.todo.get('isVisiblePopup'),
    todos: state.todo.get('todos'),
    dropdownHeight: state.todo.get('dropdownHeight')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoList);