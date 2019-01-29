import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { Icon } from 'components/Base/Icon';


const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const ChangeImageIcon = styled(Icon)`
  position: absolute;
  padding: 0;
  margin: 0 15px 23px 20px;
  bottom: 0;
  font-size: 17px;
  z-index: 1;
  transition: opacity .5s ease;
  user-select: none;
  transition: all .3s ease;
  animation: ${props => props.loaded ? '': css`${rotate} 3s linear infinite`};
  cursor: pointer;
  &:hover {
    opacity: .85;
  }
`;

const ChangeImageButton = ({
  loaded,
  onClickChangeImage
}) => {
  return (
    <ChangeImageIcon
      loaded={loaded}
      onClick={onClickChangeImage}
      faClassName={'fa fa-refresh'}
      title={loaded ? 'Change Background' : 'Loading...'}/>
  );
};

ChangeImageButton.defaultProps = { 
  loaded: false,
  onClickChangeImage: () => console.warn('onClickChangeImage not defined')
};

ChangeImageButton.propTypes = {
  loaded: PropTypes.bool,
  onClickChangeImage: PropTypes.func
};

export default ChangeImageButton;