import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Info, ChangeImageButton } from 'components/Background';
import * as authActions from 'redux/modules/auth';
import * as backgroundActions from 'redux/modules/background';
import { animateCSS } from 'lib/utils';


class Background extends Component {
  constructor(props){
    super(props);

    this.timeoutID = null;
    this.wrapperRef = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClickChangeImage = this.handleClickChangeImage.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  componentDidUpdate() {
    if (this.props.loaded) {
      animateCSS(this.wrapperRef.current, 'fadeIn');
    }
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

  handleClickChangeImage = () => {
    this.props.BackgroundActions.changeImage();
  }

  render() {
    const { loaded, currentImage } = this.props;
    const currentImageJS = currentImage.toJS();
    
    if (!loaded) {
      return <ChangeImageButton loaded={loaded} onClickChangeImage={this.handleClickChangeImage}/>
    }

    return (
      <Fragment>
        <ChangeImageButton loaded={loaded} onClickChangeImage={this.handleClickChangeImage}/>
        <Info
          innerRef={this.wrapperRef}
          title={currentImageJS.slug.replace(/-/gi, ' ')}
          userName={currentImageJS.user.name}
          link={currentImageJS.links.html}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}/>
      </Fragment>
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