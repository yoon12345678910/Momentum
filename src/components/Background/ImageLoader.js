import React from 'react';
import PropTypes from 'prop-types';

const ImageLoader = ({
  imageUrl,
  onLoad,
}) => {
  return (
    <img
      src={imageUrl}
      alt={imageUrl}
      onLoad={onLoad}
    />
  );
}

ImageLoader.defaultProps = {
  imageUrl: '',
  onLoad: () => console.warn('onLoad not defined')
};

ImageLoader.propTypes = {
  imageUrl: PropTypes.string,
  onLoad: PropTypes.func,
};

export default ImageLoader;