import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadedImage, ImageLoader } from 'components/Background';
import * as backgroundActions from 'redux/modules/background';
import { getRandomImage } from 'lib/api/background';


class Background extends Component {
  constructor(props) {
    super(props);

    this.intervalID = null;
  }

  componentDidMount() {
    this.setImage();
    this.autoChangeImage();
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  setImage = () => {
    const getImage = () => {
      const currentImageJS = this.props.currentImage.toJS();
      const image = getRandomImage();

      if (image.id === currentImageJS.id) {
        return getImage();
      } else {
        return image;
      }
    };

    this.props.BackgroundActions.setImage({
      currentImage: getImage()
    });
  }

  autoChangeImage = () => {
    this.intervalID = setInterval(() => {
      this.setImage();
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