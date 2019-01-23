import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { Widget } from 'components/MainFocus';
import { Prompt, Todo } from 'containers/MainFocus';


class MainFocus extends Component {
  render() {
    const mainFocusTodosJS = this.props.mainFocusTodos.toJS();
    const mainFocusTodo = mainFocusTodosJS[mainFocusTodosJS.length - 1];

    return (
      <Widget>
        { this.props.mainFocusMode === 'TODO' 
          ? <Todo data={mainFocusTodo}/> : <Prompt/> }
      </Widget>
    );
  }
}

export default connect(
  (state) => ({
    mainFocusMode: state.todo.get('mainFocusMode'),
    mainFocusTodos: state.todo.get('mainFocusTodos')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(MainFocus);