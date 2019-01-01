import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  display: hidden;
  width: 0;
  height: 0;
`;

const ImageLoader = ({
  imageUrl,
  onLoad,
}) => {
  return (
    <Image
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