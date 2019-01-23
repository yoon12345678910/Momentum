import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { Dashboard as DashboardComponent } from 'components/Todo';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
  }

  initTodo = () => {
    if (this.props.status === 'INIT') {
      this.props.TodoActions.initTodo();
    }
  }

  handleClick = () => {
    const onToggle = () => {
      this.initTodo();
      this.props.TodoActions.toggleDashboard();
    };
    const outsideClickListener = (e) => {
      if (!this.props.popupRef.current.contains(e.target)) {
        onToggle();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };

    onToggle();
    
    if (this.props.isVisiblePopup) {
      removeClickListener();
    } else {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }
  }

  render() {
    return (
      <DashboardComponent
        isVisiblePopup={this.props.isVisiblePopup}
        onClick={this.handleClick}/>
    );
  }
}

export default connect(
  (state) => ({
    status: state.todo.get('status'),
    isVisiblePopup: state.todo.get('isVisiblePopup')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Dashboard);