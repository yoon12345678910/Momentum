import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-color: transparent;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const LoadedImage = ({
  imageUrl
}) => {
  return (
    <Image
      className="fadeIn"
      imageUrl={imageUrl}
    />
  );
};

Image.defaultProps = {
  imageUrl: ''
};

Image.propTypes = {
  imageUrl: PropTypes.string
};

export default LoadedImage;