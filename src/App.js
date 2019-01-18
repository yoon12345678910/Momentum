import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import './lib/utils';
import { Widgets } from 'components/Base';
import { Background, BackgroundInfo } from 'containers/Background';
import Clock from 'containers/Clock/Clock';
import { Greeting } from 'containers/Greeting';
import { Weather } from 'containers/Weather';
import LegacyTodo from './component/todo/Todo';
import { Todo } from 'containers/Todo';


class App extends Component {
  constructor() {
    super();

    this.topRowRef = React.createRef();
    this.bottomRowRef = React.createRef();
  }

  render() {
    return (
      <Fragment>
        <Background/>
        <Widgets
          isVisibleWidgets={this.props.isVisibleWidgets}>
          <div 
            ref={this.topRowRef}
            className="top-row">
            <div className="top-left"></div>
            <div className="top-right">
              <Weather/>
            </div>
          </div>
          <div className="center">
            <Clock/>
            <Greeting/>
          </div>
          <div ref={this.bottomRowRef}
            className="bottom-row">
            <div className="bottom-left">
              <BackgroundInfo/>
            </div>
            <div className="bottom-right">
              <LegacyTodo 
                refs={[this.topRowRef, this.bottomRowRef]}
              />
              <Todo
                layoutRef={[this.topRowRef, this.bottomRowRef]}/>
            </div>
          </div>
        </Widgets>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    isVisibleWidgets: state.auth.get('isVisibleWidgets')
  })
)(App);

