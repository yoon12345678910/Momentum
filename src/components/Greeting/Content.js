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
  children
}) => {
  return (
    <StyledContents 
      ref={innerRef}>
      {children}
    </StyledContents>
  );
};

Contents.propTypes = {
  children: PropTypes.node.isRequired
};

export default Contents;