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
    this.resizeList = this.resizeList.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeList);
  }

  componentDidUpdate() {
    if (this.props.isVisiblePopup || this.listRef.current.offsetHeight) {
      this.resizeList();
    }
  }

  resizeList() {
    // External element size to get maximum pop-up size 
    const externalHeight = this.props.popupHeightRefs.reduce((acc, ref) => {
      return acc + ref.current.offsetHeight;
    }, 0);
    const maxHeight = window.innerHeight - externalHeight; 

    this.listRef.current.style.minHeight = null;
    this.listRef.current.style.maxHeight = `${maxHeight}px`;

    const listHeight = this.listRef.current.offsetHeight + 2;
    const toBeHeight = Math.min(Math.max(listHeight, this.props.dropdownHeight), maxHeight);

    this.wrapperRef.current.style.minHeight = `${toBeHeight}px`;
    this.wrapperRef.current.style.maxHeight = `${toBeHeight}px`;
    this.listRef.current.style.minHeight = `${toBeHeight}px`;
    this.listRef.current.style.maxHeight = `${toBeHeight}px`;
  }

  render() {
    const todosJS = this.props.todos.toJS();
    const content = todosJS.length ? 
      (todosJS.map(todo => {
        return  <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  resizeList={this.resizeList}
                  isDone={todo.isDone}
                  isMainFocus={todo.isMainFocus}/>;
      })) : <TodoEmpty/>;

    return (
      <TodoListComponent
        wrapperRef={this.wrapperRef}
        listRef={this.listRef}>
        {content}
      </TodoListComponent>
    );
  }
}

export default connect(
  (state) => ({
    isVisiblePopup: state.todo.get('isVisiblePopup'),
    todos: state.todo.get('todos'),
    dropdownHeight: state.todo.get('dropdownHeight')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoList);