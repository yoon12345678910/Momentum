import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWidgets = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Widgets = ({
  children
}) => {
  return (
    <StyledWidgets>
      {children}
    </StyledWidgets>
  );
};

Widgets.defaultProps = {
  isShown: false
};

Widgets.propTypes = {
  isShown: PropTypes.bool
};


export default Widgets;