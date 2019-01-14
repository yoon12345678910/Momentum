import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledWidgets = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity .5s ease;
  opacity: ${props => props.isVisibleWidgets ? 1 : 0};
`;

const Widgets = ({
  isVisibleWidgets,
  children
}) => {
  return (
    <StyledWidgets
      isVisibleWidgets={isVisibleWidgets}>
      {children}
    </StyledWidgets>
  );
};

Widgets.defaultProps = {
  isVisibleWidgets: true
};

Widgets.propTypes = {
  isVisibleWidgets: PropTypes.bool
};

export default Widgets;