import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWidget = styled.div`
  display: inline-block;
  position: relative;
  transition: opacity .5s ease;
  -moz-user-select: none;
  user-select: none;
`;

const Widget = ({
  children
}) => {
  return (
    <StyledWidget>
      {children}
    </StyledWidget>
  );
};

Widget.propTypes = {
  children: PropTypes.node.isRequired
};

export default Widget;