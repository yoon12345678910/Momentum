import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { Widget } from 'components/MainFocus';
import { Prompt, Todo } from 'containers/MainFocus';


class MainFocus extends Component {
  render() {
    return (
      <Widget>
        { this.props.mainFocusMode === 'TODO' ? <Todo/> : <Prompt/> }
      </Widget>
    );
  }
}

export default connect(
  (state) => ({
    mainFocusMode: state.todo.get('mainFocusMode')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(MainFocus);