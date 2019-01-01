import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadedImage, ImageLoader } from 'components/Background';
import * as backgroundActions from 'redux/modules/background';


class Background extends Component {
  componentDidMount() {
    this.props.BackgroundActions.getImage();
  }

  handleLoad = () => {
    this.props.BackgroundActions.loadedImage();
  }

  render() {
    const { loaded, currentImage } = this.props;

    if (currentImage.isEmpty()) {
      return null;
    }

    const currentImageJS = currentImage.toJS();
    const imageUrl = currentImageJS.urls.regular;

    return (
      <div>
        {loaded
          ? <LoadedImage
              imageUrl={imageUrl}
            /> 
            : <ImageLoader
                imageUrl={imageUrl}
                onLoad={this.handleLoad}
              />
        }
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