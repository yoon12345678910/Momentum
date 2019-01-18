import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledRoundWarpper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  font-size: 25px;
  -moz-user-select: none;
  user-select: none;

  &:after {
    display: block;
    position: absolute;
    width: 1em;
    height: 1em;
    border-radius: 50px;
    box-sizing: border-box;
    content: '';
    z-index: 0;
  }
`;

const RoundWrapper = ({
  className,
  children
}) => {
  return (
    <StyledRoundWarpper
      className={className}>
      {children}
    </StyledRoundWarpper>
  );
};

RoundWrapper.defaultProps = {
  className: ''
};

RoundWrapper.propTypes = {
  className: PropTypes.string
};

export default RoundWrapper;