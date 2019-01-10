import React, { Component, Fragment } from 'react';
import './lib/utils';
import Background from 'containers/Background/Background';
import Clock from 'containers/Clock/Clock';
import { Greeting } from 'containers/Greeting';
import { Weather } from 'containers/Weather';
import Todo from './component/todo/Todo';


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
        <div id="widgets" 
          className="widgets show">
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
            <div className="bottom-left"></div>
            <div className="bottom-right">
              <Todo 
                refs={[this.topRowRef, this.bottomRowRef]}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;

