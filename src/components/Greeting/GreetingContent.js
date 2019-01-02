import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Contents = styled.span`
  font-size: 337.5%;
  font-weight: 500;
  user-select: none;
  transition: transform .5s ease, opacity 1s ease;
`;

const GreetingContent = ({
  innerRef,
  children
}) => {
  return (
    <Contents 
      ref={innerRef}>
      {children}
    </Contents>
  );
};

GreetingContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default GreetingContent;