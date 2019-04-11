import React from 'react';
import ReactDOM from 'react-dom';

import { hot } from 'react-hot-loader/root'

import './utils/utils';
import Background from './component/background/Background';
import Clock from './component/clock/Clock';
import Greeting from './component/greeting/Greeting';
import Weather from './component/weather/Weather';
import Todo from './component/todo/Todo';


class App extends React.Component {
  constructor() {
    super();

    this.interval;
    this.state = {
      display: true,
      init: false,
    }

    this.topRowRef = React.createRef();
    this.bottomRowRef = React.createRef();
    // this.interval = setInterval(() => {

    // }, 1000);
  }

  render() {
    if (!this.state.init) {
      return (
        <React.Fragment>
          <Background />
          <div id="widgets" 
            className={"widgets " + (this.state.display ? 'show' : 'hide')}>
            <div 
              ref={this.topRowRef}
              className="top-row">
              <div className="top-left"></div>
              <div className="top-right">
                <Weather />
              </div>
            </div>
            <div className="center">
              <Clock />
              <Greeting />
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
        </React.Fragment>
      )
    } else {
      return 'loading'
    }
  }
}

export default hot(App)
ReactDOM.render(<App />, document.getElementById('momentum'))
