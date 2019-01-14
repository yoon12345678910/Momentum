import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Info } from 'components/Background';
import * as authActions from 'redux/modules/auth';
import * as backgroundActions from 'redux/modules/background';


class Background extends Component {
  constructor(props){
    super(props);

    this.timeoutID = null;
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  handleMouseEnter = () => {
    this.timeoutID = setTimeout(() => {
      this.props.AuthActions.toggleVisibleWidgets();
    }, 3000);
  }

  handleMouseLeave = () => {
    const { isVisibleWidgets, AuthActions } = this.props;
    if (!isVisibleWidgets) {
      AuthActions.toggleVisibleWidgets();
    }
    clearTimeout(this.timeoutID);
  }

  render() {
    const { loaded, currentImage } = this.props;
    const currentImageJS = currentImage.toJS();
    
    if (!loaded) {
      return null;
    }

    return (
      <Info
        title={currentImageJS.slug.replace(/-/gi, ' ')}
        userName={currentImageJS.user.name}
        link={currentImageJS.links.html}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

export default connect(
  (state) => ({
    isVisibleWidgets: state.auth.get('isVisibleWidgets'),
    loaded: state.background.get('loaded'),
    currentImage: state.background.get('currentImage')
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BackgroundActions: bindActionCreators(backgroundActions, dispatch)
  })
)(Background);