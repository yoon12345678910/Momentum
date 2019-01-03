import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSide = styled.span`
  display: inline-flex;
  align-items: center;
  flex: 1 0 50px;
`;

const Side = ({
  children
}) => {
  return (
    <StyledSide>
      {children}
    </StyledSide>
  );
};

Side.defaultProps = {
  children: null
}

Side.propTypes = {
  children: PropTypes.node
};

export default Side;
