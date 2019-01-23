import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledCenterBelow = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  top: 70.5%;
  left: 0;
  transform: none;
  text-align: center;

  @media screen and (max-height: 400px) {
    top: 52%;
  }

  @media screen and (max-height: 550px) {
    top: 70.5%;
    font-size: 80%;
  }

  @media screen and (max-height: 600px) {
    top: 71.5%;
    font-size: 90%;
  }
`;

const CenterBelow = ({
  children
}) => {
  return (
    <StyledCenterBelow>
      {children}
    </StyledCenterBelow>
  );
};

CenterBelow.defaultProps = {
  children: null
};

CenterBelow.propTypes = {
  children: PropTypes.node
};

export default CenterBelow;