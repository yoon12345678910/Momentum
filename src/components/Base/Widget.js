import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledWidget = styled.div`
  display: inline-block;
  position: relative;
  transition: opacity .5s ease;
  user-select: none;
`;

const Widget = ({
  className,
  children
}) => {
  return (
    <StyledWidget className={className}>
      {children}
    </StyledWidget>
  );
};

Widget.defaultProps = {
  children: null
};

Widget.propTypes = {
  children: PropTypes.node
};

export default Widget;