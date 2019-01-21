import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledBottomRow = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const BottomRow = ({
  innerRef,
  children
}) => {
  return (
    <StyledBottomRow ref={innerRef}>
      {children}
    </StyledBottomRow>
  );
};

BottomRow.defaultProps = {
  innerRef: null,
  children: null
};

BottomRow.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  children: PropTypes.node
};

export default BottomRow;