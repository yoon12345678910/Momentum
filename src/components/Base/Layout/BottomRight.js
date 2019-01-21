import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledBottomRight = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  position: relative;
  justify-content: flex-start;
  text-align: right;
`;

const BottomRight = ({
  children
}) => {
  return (
    <StyledBottomRight>
      {children}
    </StyledBottomRight>
  );
};

BottomRight.defaultProps = {
  children: null
};

BottomRight.propTypes = {
  children: PropTypes.node
};

export default BottomRight;