import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  overflow: ${props => props.isVisible ? 'visible': 'hidden'};
  position: relative;
  opacity: ${props => props.isVisible ? 1 : 0};
  z-index: 2;
  transition: all .15s ease;
`;

const PopupWrapper = ({
  isVisible,
  innerRef,
  className,
  children
}) => {
  return (
    <Wrapper
      ref={innerRef}
      isVisible={isVisible}
      className={className}>
        {children}
    </Wrapper>
  );
};

PopupWrapper.defaultProps = {
  isVisible: false,
  children: null
};

PopupWrapper.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node
};

export default PopupWrapper;