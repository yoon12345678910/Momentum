import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RoundIcon2 } from 'components/Base/Icon';


const Wrapper = styled.span`
  position: absolute;
  margin-top: 4px;
`;

const Toggle = styled.span`
  cursor: pointer;
  opacity : ${props => props.isActive || props ? 1 : 0};
  &:hover { 
    opacity: 1;
  };
`;

const StyledRoundIcon = styled(RoundIcon2)`
  padding: 5px;
  font-size: 30px;
  &:after {
    background: ${props => props.isActive ? 'rgba(255,255,255,.12)' : ''};
  }
`;

const MoreBox = ({
  isActive,
  isHover,
  onClick,
  children
}) => {
  return (
    <Wrapper>
      <Toggle 
        isActive={isActive}
        onClick={onClick}>
        <StyledRoundIcon
          isActive={isActive || isHover}
          isHover={isHover}
          faClassName={'fa fa-ellipsis-h'}/>
      </Toggle>
      {children}
    </Wrapper>
  );
};

MoreBox.defaultProps = {
  isActive: false,
  isHover: false,
  onClick: () => console.warn('onClick not defined'),
  children: null
};

MoreBox.propTypes = {
  isActive: PropTypes.bool,
  isHover: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default MoreBox;