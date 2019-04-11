import React from 'react';
import PropTypes from 'prop-types';

const ImageLoader = ({ imageUrl, onLoad }) => {
  return (
    <img
      src={imageUrl}
      onLoad={onLoad}
    />
  )
}

ImageLoader.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired
}

export default ImageLoader
