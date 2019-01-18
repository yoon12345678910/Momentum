import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledWrapper = styled.ul`
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: absolute;
  border-radius: 4px;
  background: #333;
  box-shadow: 0 1px 8px rgba(0,0,0,.25);
  z-index: 5;
`;

const Wrapper = ({
  innerRef,
  isVisible,
  children,
  ...rest
}) => {
  return (
    <StyledWrapper
      ref={innerRef}
      isVisible={isVisible}
      {...rest}>
      {children}
    </StyledWrapper>
  );
};

Wrapper.defaultProps = {
  // innerRef: null,
  isVisible: false,
  // children : null
};

Wrapper.propTypes = {
  // innerRef: PropTypes.element,
  isVisible: PropTypes.bool,
  // children: PropTypes.element
};

export default Wrapper;