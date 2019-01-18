import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { TodoEmpty as TodoEmptyComponent, TodoEmptyLinkMessage, TodoEmptyDescMessage } from 'components/Todo';


class TodoEmpty extends Component {
  render() {
    const { 
      isVisibleAddTodo, 
      selectedListChooserId, 
      listChoosers,
      TodoActions
    } = this.props;
    const listChoosersJS = listChoosers.toJS();

    if (listChoosers.isEmpty()) {
      return null;
    }
    const emptyInfo = listChoosersJS[selectedListChooserId].empty;

    return (
      <TodoEmptyComponent
        isVisibleAddTodo={isVisibleAddTodo}
        title={emptyInfo.title}
        onToggleAddTodo={() => this.props.TodoActions.toggleAddTodo()}>
        {emptyInfo.targetLink ?
          <TodoEmptyLinkMessage
            onClickListChooser={() => TodoActions.changeListChooser({ listChooserId: emptyInfo.targetLink })}
            message={emptyInfo.message}/> 
          : <TodoEmptyDescMessage
              message={emptyInfo.message}/>
        }
      </TodoEmptyComponent>
    );
  }
}

export default connect(
  (state) => ({
    isVisibleAddTodo: state.todo.get('isVisibleAddTodo'),
    selectedListChooserId: state.todo.get('selectedListChooserId'),
    listChoosers: state.todo.get('listChoosers')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoEmpty);