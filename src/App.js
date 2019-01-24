import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BackgroundOverlay, Widgets } from 'components/Base';
import * as Layout from 'components/Base/Layout';
import { Background, BackgroundInfo } from 'containers/Background';
import Clock from 'containers/Clock/Clock';
import { Greeting } from 'containers/Greeting';
import { Weather } from 'containers/Weather';
import { Todo } from 'containers/Todo';
import { MainFocus } from 'containers/MainFocus';
import { Search } from 'containers/Search';


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
        <BackgroundOverlay isVisibleWidgets={this.props.isVisibleWidgets}/>
        <Widgets isVisibleWidgets={this.props.isVisibleWidgets}>
          <Layout.TopRow innerRef={this.topRowRef}>
            <Layout.TopLeft>
              <Search/>
            </Layout.TopLeft>
            <Layout.TopRight>
              <Weather/>
            </Layout.TopRight>
          </Layout.TopRow>
          <Layout.Center>
            <Clock/>
            <Greeting/>
          </Layout.Center>
          <Layout.CenterBelow>
            <MainFocus/>
          </Layout.CenterBelow>
          <Layout.BottomRow innerRef={this.bottomRowRef}>
            <Layout.BottomLeft>
              <BackgroundInfo/>
            </Layout.BottomLeft>
            <Layout.BottomRight>
              <Todo layoutRef={[this.topRowRef, this.bottomRowRef]}/>
            </Layout.BottomRight>
          </Layout.BottomRow>
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