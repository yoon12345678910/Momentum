import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';

import EmptyTodoList from './EmptyTodoList';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.resized = false;
    this.listWrapperRef = React.createRef();
    this.listRef = React.createRef();
    this.externalHeight = 0; // External element size to get maximum pop-up size
  }

  componentDidMount() {
    this.externalHeight = this.props.popupHeightRefs.reduce((acc, ref) => {
      return acc + ref.current.offsetHeight;
    }, 0);

    this.resizeList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = shallowCompare(this, nextProps, nextState);
    return shouldUpdate;
  }

  componentDidUpdate() {
    this.resizeList();
  }

  resizeList = () => {
    this.listRef.current.style.minHeight = null;
    this.listRef.current.style.maxHeight = null;
    
    const toBeHeight = Math.min(
      Math.max(this.listRef.current.offsetHeight + 2, this.props.dropdownHeight)
      , window.innerHeight - this.externalHeight);

    this.listWrapperRef.current.style.minHeight = `${toBeHeight}px`;
    this.listWrapperRef.current.style.maxHeight = `${toBeHeight}px`;

    this.listRef.current.style.minHeight = `${toBeHeight}px`;
    this.listRef.current.style.maxHeight = `${toBeHeight}px`;
  }

  paintTodoList() {
    const {
      todos, 
      listChooserEmptyInfo, 
      onSubmitTodoTitle, 
      onChangeTodoDone,
      onDeleteTodo,
      onClickListChooser,
      isShownFooter,
      onClickToggleFooter
    } = this.props;

    const content = todos.length ?
      (todos.map(todo => {
        return <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title} 
                  isDone={todo.isDone}
                  listChooserId={todo.listChooserId}
                  onSubmitTitle={onSubmitTodoTitle}
                  onChangeDone={onChangeTodoDone}
                  onDelete={onDeleteTodo}
                />
        })
      ): <EmptyTodoList
          listChooserEmptyInfo={listChooserEmptyInfo}
          onClickListChooser={onClickListChooser}
          isShownFooter={isShownFooter}
          onClickToggleFooter={onClickToggleFooter}
      />

    return content;
  }

  render() {
    return (
      <div
        ref={this.listWrapperRef}
        className="todo-list-wrapper">
        <ol 
          ref={this.listRef}
          className="todo-list">
          {this.paintTodoList()}
        </ol>
      </div>
    )
  }
}


TodoList.defaultProps = {
  dropdownHeight: 0
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id:                     PropTypes.string.isRequired,
      listChooserId:          PropTypes.string.isRequired,
      title:                  PropTypes.string.isRequired,
      isDone:                 PropTypes.bool.isRequired
    })
  ),
  listChooserEmptyInfo:       PropTypes.object.isRequired,
  onSubmitTodoTitle:          PropTypes.func.isRequired, 
  onChangeTodoDone:           PropTypes.func.isRequired,
  onDeleteTodo:               PropTypes.func.isRequired,
  onClickListChooser:         PropTypes.func.isRequired,
  isShownFooter:              PropTypes.bool.isRequired,
  onClickToggleFooter:        PropTypes.func.isRequired,
  dropdownHeight:             PropTypes.number.isRequired,
  popupHeightRefs:            PropTypes.arrayOf(
    PropTypes.shape({ 
      current:                PropTypes.instanceOf(Element) 
    }),
  )
}
