import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { Popup, Header, Footer } from 'components/Todo';
import { WidgetPopup } from 'containers/Base';
import { Dashboard, ListChooser, TodoList, AddTodo } from 'containers/Todo';
 

class Todo extends Component {
  constructor(props) {
    super(props);

    this.popupRef = React.createRef();
    this.header = React.createRef();
    this.footerRef = React.createRef();
    this.popupHeightRefs = [];
  }

  componentDidMount() {
    this.props.TodoActions.initTodo();
    this.popupHeightRefs = [
      ...this.props.layoutRef,
      this.header, 
      this.footerRef
    ];
  }

  render() {
    return (
      <Fragment>
        <Popup
          innerRef={this.popupRef}
          isVisible={this.props.isVisiblePopup}
          isDisplayed={this.props.isDisplayedPopup}>
          <Header innerRef={this.header}>
            <ListChooser/>
          </Header>
          <TodoList popupHeightRefs={this.popupHeightRefs}/>
          <Footer innerRef={this.footerRef}>
            { this.props.isVisibleAddTodo? <AddTodo/> : null }
          </Footer>
        </Popup>
        <Dashboard popupRef={this.popupRef}/>
      </Fragment>
    );
  }
}

export default connect( 
  (state) => ({
    isVisiblePopup: state.todo.get('isVisiblePopup'),
    isVisibleAddTodo: state.todo.get('isVisibleAddTodo')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(WidgetPopup(Todo));
