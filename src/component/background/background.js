import React from 'react';
import ImageLoader from './ImageLoader';
import './Background.css';

export default class Background extends React.Component {
  constructor() {
    super()

    this.IMG_MAX = 40
    this.state = {
      loaded: false
    }
    this._handleLoadedImage = this._handleLoadedImage.bind(this)
  }

  componentWillMount() {
    this._changeImage(Math.floor(Math.random() * this.IMG_MAX) + 1)
  }

  _handleLoadedImage = () => {
    this.setState({
      loaded: true
    })
  }

  _changeImage = (image) => {
    this.setState({
      loaded: false,
      image
    })
  }

  _imageUrl = () => `/asset/images/${this.state.image}.jpg`

  render() {
    return (
      <ul id="background" 
        className="background">
        {
          this.state.loaded ?
          <li className="fadeIn"
            style={{backgroundImage: 'url(' + this._imageUrl() + ')'}}>
          </li>
         : <ImageLoader 
              imageUrl={this._imageUrl()} 
              onLoad={this._handleLoadedImage} 
            />
          }
      </ul>
    )
  }
}
