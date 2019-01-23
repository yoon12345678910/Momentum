import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledBottomLeft = styled.div`
  flex: 1 0 auto;
  position: relative;
`;

const BottomLeft = ({
  children
}) => {
  return (
    <StyledBottomLeft>
      {children}
    </StyledBottomLeft>
  );
};

BottomLeft.defaultProps = {
  children: null
};

BottomLeft.propTypes = {
  children: PropTypes.node
};

export default BottomLeft;