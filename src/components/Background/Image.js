import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  imageUrl
}) => {
  return (
    <li
      className="fadeIn"
      style={{ backgroundImage: 'url(' + imageUrl + ')' }}>
    </li>
  );
};

Image.defaultProps = {
  imageUrl: ''
};

Image.propTypes = {
  imageUrl: PropTypes.string
};

export default Image;