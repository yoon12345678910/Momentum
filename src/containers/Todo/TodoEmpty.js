import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { TodoEmpty as TodoEmptyComponent, TodoEmptyLinkMessage, TodoEmptyDescMessage } from 'components/Todo';


class TodoEmpty extends Component {
  constructor(props) {
    super(props);

    this.handleToggleAddTodo = this.handleToggleAddTodo.bind(this);
    this.handleClickListChooser = this.handleClickListChooser.bind(this);
  }

  handleToggleAddTodo = () => {
    this.props.TodoActions.toggleAddTodo();
  }

  handleClickListChooser = (targetLink) => {
    this.props.TodoActions.changeListChooser({
      listChooserId: targetLink
    });
  }

  render() {
    const { 
      isVisibleAddTodo, 
      selectedListChooserId, 
      listChoosers
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
        onToggleAddTodo={this.handleToggleAddTodo}>
        {emptyInfo.targetLink ?
          <TodoEmptyLinkMessage
            onClickListChooser={this.handleClickListChooser}
            targetLink={emptyInfo.targetLink}
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