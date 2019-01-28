import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'components/Base/Icon';


const ChangeImageIcon = styled(Icon)`
  position: absolute;
  padding: 0;
  margin: 0 15px 23px 20px;
  bottom: 0;
  font-size: 17px;
  z-index: 1;
  transition: opacity .5s ease;
  user-select: none;
  cursor: pointer;
  &:hover {
    opacity: .85;
  }
`;

const ChangeImageButton = ({
  onClickChangeImage
}) => {
  return (
    <ChangeImageIcon
      onClick={onClickChangeImage}
      faClassName={'fa fa-refresh'}
      title={'Change Background'}/>
  );
};

ChangeImageButton.defaultProps = { 
  onClickChangeImage: () => console.warn('onClickChangeImage not defined')
};

ChangeImageButton.propTypes = {
  onClickChangeImage: PropTypes.func
};

export default ChangeImageButton;