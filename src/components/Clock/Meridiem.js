import React from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Format = styled.span`
  position: absolute;
  left: 101%;
  bottom: 9%;
  font-size: 150%;
  text-transform: uppercase;
  opacity: 0;

  ${props => props.isShown && css`
    opacity: 1;
    animation: fadeOut 4s ease 4s 1 normal;
    animation-fill-mode: forwards;
  `}
`;

const Meridiem = ({
  isShown,
  children
}) => {
  return (
    <Format isShown={isShown}>
      {children}
    </Format>
  )
}

Meridiem.defaultProps = {
  isShown: false,
  children: ''
}

Meridiem.propTypes = {
  isShown: PropTypes.bool,
  children: PropTypes.string
}

export default Meridiem
