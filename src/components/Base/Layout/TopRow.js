import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTopRow = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

const TopRow = ({
  innerRef,
  children
}) => {
  return (
    <StyledTopRow ref={innerRef}>
      {children}
    </StyledTopRow>
  );
};

TopRow.defaultProps = {
  innerRef: null,
  children: null
};

TopRow.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  children: PropTypes.node
};

export default TopRow;