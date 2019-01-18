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

  componentDidMount() {
    this.resizeList();
  }

  componentDidUpdate() {
    this.resizeList();
  }

  resizeList = () => {
    const setValue = (value) => {
      this.wrapperRef.current.style.minHeight = `${value}px`;
      this.wrapperRef.current.style.maxHeight = `${value}px`;
      this.listRef.current.style.minHeight = `${value}px`;
      this.listRef.current.style.maxHeight = `${value}px`;
    };
    
    // Prevent issue 
    // When a pop-up is turned on and you click outside of the widget, the list becomes zero.
    if (this.originalListHieght > 0 && this.listRef.current.offsetHeight === 0) {
      setValue(this.originalListHieght);
      return;
    };

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
    setValue(toBeHeight);
  }

  paintTodoList = () => {
    const todosJS = this.props.todos.toJS();
    const content = todosJS.length ? 
      (todosJS.map(todo => {
        return <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  // listChooserId={todo.listChooserId}
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
    todos: state.todo.get('todos'),
    dropdownHeight: state.todo.get('dropdownHeight')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoList);