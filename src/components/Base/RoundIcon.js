import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { default as DefaultIcon } from './Icon';


const Icon = styled(DefaultIcon)`
  font-size: 0.666667em;
`;

const RoundWarpper = styled.div`
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

  &:after {
    background: ${props => props.isActive ? `rgba(255,255,255,.12)` : ''};
  }

  &:hover {
    &:after {
      background: rgba(255,255,255,.24);
    }
  }
  &:hover ${Icon} {
    opacity: .8;
  }

  ${Icon} {
    opacity: ${props => props.isActive ? .6 : ''};
  }
`;

const RounIcon = ({
  isActive,
  faClassName,
  className,
}) => {
  return (
    <RoundWarpper
      isActive={isActive}
      className={className}>
      <Icon
        faClassName={faClassName}>
      </Icon>
    </RoundWarpper>
  );
};

RounIcon.defaultProps = {
  faClassName: '',
};

RounIcon.propTypes = {
  faClassName: PropTypes.string
};

export default RounIcon;