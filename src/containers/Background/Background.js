import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadedImage, ImageLoader } from 'components/Background';
import * as backgroundActions from 'redux/modules/background';


class Background extends Component {
  constructor(props) {
    super(props);

    this.intervalID = null;
  }

  componentDidMount() {
    this.props.BackgroundActions.changeImage();
  }

  componentDidUpdate() {
    if (this.props.loaded) {
      clearInterval(this.intervalID);
      this.autoChangeImage();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  
  autoChangeImage = () => {
    this.intervalID = setInterval(() => {
      this.props.BackgroundActions.changeImage();
    }, 60000 * 3);
  }
  
  handleLoad = () => {
    this.props.BackgroundActions.loadedImage();
  }
  
  render() {
    const { loaded, currentImage } = this.props;
    const currentImageJS = currentImage.toJS();
    let imageUrl;

    if (currentImage.isEmpty()) {
      return null;
    }

    imageUrl = currentImageJS.urls.full;

    return (
      <div>
        {loaded
          ? <LoadedImage imageUrl={imageUrl}/>
            : <ImageLoader
                imageUrl={imageUrl}
                onLoad={this.handleLoad}
              />}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loaded: state.background.get('loaded'),
    currentImage: state.background.get('currentImage')
  }),
  (dispatch) => ({
    BackgroundActions: bindActionCreators(backgroundActions, dispatch)
  })
)(Background);