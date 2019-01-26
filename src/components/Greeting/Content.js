import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledContents = styled.span`
  font-size: 337.5%;
  font-weight: 500;
  user-select: none;
  transition: transform .5s ease, opacity 1s ease;
`;

const Contents = ({
  innerRef,
  onHover,
  children
}) => {
  return (
    <StyledContents 
      ref={innerRef}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}>
      {children}
    </StyledContents>
  );
};

Contents.defaultTypes = {
  innerRef: null,
  onHover: () => console.warn('onHover not defined'),
  children: null
};

Contents.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  onHover: PropTypes.func,
  children: PropTypes.node
};

export default Contents;