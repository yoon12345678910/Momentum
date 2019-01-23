import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: ${props => props.isDisplayed ? 'block': 'none'};
  position: relative;
  opacity: ${props => props.isVisible ? 1 : 0};
  z-index: 2;
  transition: all .15s ease;
`;

const PopupWrapper = ({
  innerRef,
  isVisible,
  isDisplayed,
  className,
  children
}) => {
  return (
    <Wrapper
      ref={innerRef}
      isVisible={isVisible}
      isDisplayed={isDisplayed}
      className={className}>
        {children}
    </Wrapper>
  );
};

PopupWrapper.defaultProps = {
  innerRef: null,
  isVisible: false,
  isDisplayed: false,
  children: null
};

PopupWrapper.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  isVisible: PropTypes.bool,
  isDisplayed: PropTypes.bool,
  children: PropTypes.node
};

export default PopupWrapper;