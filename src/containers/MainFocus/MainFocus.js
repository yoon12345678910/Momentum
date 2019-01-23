import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainFocusActions from 'redux/modules/mainFocus';
import { Widget } from 'components/MainFocus';
import { Prompt, Todo } from 'containers/MainFocus';


class MainFocus extends Component {
  componentDidMount() {
    this.props.MainFocusActions.initTodo();
  }

  render() {
    const { mode, todos } = this.props;
    const todosJS = todos.toJS();
    const mainTodo = todosJS[todosJS.length - 1];

    if (mode === 'INIT') {
      return null;
    }

    return (
      <Widget>
        { mode === 'TODO' 
          ? <Todo data={mainTodo}/> : <Prompt/> }
      </Widget>
    );
  }
}

export default connect(
  (state) => ({
    mode: state.mainFocus.get('mode'),
    todos: state.mainFocus.get('todos')
  }),
  (dispatch) => ({
    MainFocusActions: bindActionCreators(mainFocusActions, dispatch)
  })
)(MainFocus);