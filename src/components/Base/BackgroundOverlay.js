import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import overlayVignette from 'static/images/overlay-vignette.png';


const StyledWidgets = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${overlayVignette});
  background-size: 100% 100%;
  opacity: ${props => props.isVisibleWidgets ? 1 : 0};
  transition: opacity .3s ease-out;
  z-index: 2;
`;

const BackgroundOverlay = ({
  isVisibleWidgets
}) => {
  return <StyledWidgets isVisibleWidgets={isVisibleWidgets}/>
};

BackgroundOverlay.defaultProps = {
  isVisibleWidgets: false,
};

BackgroundOverlay.propTypes = {
  isVisibleWidgets: PropTypes.bool
};

export default BackgroundOverlay;