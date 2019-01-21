import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTopLeft = styled.div`
  flex: 1 0 auto;
  position: relative;
`;

const TopLeft = ({
  children
}) => {
  return (
    <StyledTopLeft>
      {children}
    </StyledTopLeft>
  );
};

TopLeft.defaultProps = {
  children: null
};

TopLeft.propTypes = {
  children: PropTypes.node
};

export default TopLeft;