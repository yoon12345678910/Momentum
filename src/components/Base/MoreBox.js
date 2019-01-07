import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RoundIcon from './RoundIcon';


const Wrapper = styled.span`
  margin-top: 5px;
  position: absolute;
`;

const Toggle = styled.span`
  margin-top: 15px;
  margin-left: 5px;
  cursor: pointer;

  opacity : ${props => props.isActive ? 1 : 0};
  &:hover { 
    opacity: 1;
  };
`;

const MoreBox = ({
  isActive,
  roundStyle,
  iconStyle,
  onClick,
  children
}) => {
  return (
    <Wrapper>
      <Toggle 
        isActive={isActive}
        onClick={onClick}>
        <RoundIcon
          isActive={isActive}
          roundStyle={roundStyle}
          iconStyle={iconStyle}
          faIconClassName={'fa fa-ellipsis-h'}/>
      </Toggle>
      {children}
    </Wrapper>
  );
};

MoreBox.defaultProps = {
  isActive: false,
  roundStyle: {
    style: 0,
    padding_v: 0,
    padding_h: 0
  },
  iconStyle: {
    style: 0
  },
  onClick: () => console.warn('onClick not defined'),
  children: null
};

MoreBox.propTypes = {
  isActive: PropTypes.bool,
  roundStyle: PropTypes.objectOf(PropTypes.number),
  iconStyle:PropTypes.objectOf(PropTypes.number),
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default MoreBox;