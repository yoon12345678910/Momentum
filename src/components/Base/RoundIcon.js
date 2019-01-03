import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Icon = styled.i`
  margin: 0 10px;
  font-size: ${props => `${props.iconStyle.size}px`};
  opacity: .5;
`;

const RoundWarpper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  -moz-user-select: none;
  user-select: none;

  &:after {
    display: block;
    position: absolute;
    width: ${props => `${props.roundStyle.size}px`};
    height: ${props => `${props.roundStyle.size}px`};
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
  faIconClassName,
  roundStyle,
  iconStyle
}) => {
  return (
    <RoundWarpper
      isActive={isActive}
      roundStyle={roundStyle}>
      <Icon
        iconStyle={iconStyle}
        className={faIconClassName}
        aria-hidden="true">
      </Icon>
    </RoundWarpper>
  );
};

RounIcon.defaultProps = {
  faIconClassName: '',
  roundStyle: {
    size: 25,
    padding_h: 0,
    padding_v: 0,
  },
  iconStyle: {
    size: 17,
  }
}

RounIcon.propTypes = {
  faIconClassName: PropTypes.string,
  roundStyle: PropTypes.objectOf(PropTypes.number),
  iconStyle: PropTypes.objectOf(PropTypes.number)
};

export default RounIcon;