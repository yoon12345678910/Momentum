import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RoundIcon2 } from 'components/Base/Icon';


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

const StyledRoundIcon = styled(RoundIcon2)`
  font-size: 30px;
`;

const MoreBox = ({
  isActive,
  onClick,
  children
}) => {
  return (
    <Wrapper>
      <Toggle 
        isActive={isActive}
        onClick={onClick}>
        <StyledRoundIcon
          isActive={isActive}
          faClassName={'fa fa-ellipsis-h'}/>
      </Toggle>
      {children}
    </Wrapper>
  );
};

MoreBox.defaultProps = {
  isActive: false,
  onClick: () => console.warn('onClick not defined'),
  children: null
};

MoreBox.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default MoreBox;