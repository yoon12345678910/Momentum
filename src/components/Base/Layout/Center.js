import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledCenter = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%,-50%);
  transform-origin: 50% 50%;
  z-index: 1;

  @media (max-height: 550px) {
    font-size: 80%;
  }

  @media (max-height: 600px) {
    font-size: 90%;
  }
`;

const Center = ({
  children
}) => {
  return (
    <StyledCenter>
      {children}
    </StyledCenter>
  );
};

Center.defaultProps = {
  children: null
};

Center.propTypes = {
  children: PropTypes.node
};

export default Center;