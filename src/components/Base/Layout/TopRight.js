import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTopRight = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  position: relative;
  justify-content: flex-start;
  text-align: right;
`;

const TopRight = ({
  children
}) => {
  return (
    <StyledTopRight>
      {children}
    </StyledTopRight>
  );
};

TopRight.defaultProps = {
  children: null
};

TopRight.propTypes = {
  children: PropTypes.node
};

export default TopRight;