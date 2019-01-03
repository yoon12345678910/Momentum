import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  opacity: 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
`;

const StyledPopup = styled.div`
  display: none;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 200px;
  padding: 0;
  border-radius: 4px;
  box-sizing: border-box;
  background: rgba(15,15,15,.925);
  text-align: left;
  text-shadow: none;
`;


const Popup = ({
  children
}) => {
  return (
    <StyledWrapper>
      <StyledPopup>
        {children}
      </StyledPopup>
    </StyledWrapper>
  );
};

Popup.defaultProps = {
};

Popup.propTypes = {
};


export default Popup;