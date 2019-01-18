import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './Icon';
import RoundWrapper from './RoundWrapper';


const StyledIcon = styled(Icon)`
  font-size: 0.666667em;
`;

const StyledRoundIcon = styled(RoundWrapper)`
  &:after {
    background: ${props => props.isActive ? `rgba(255,255,255,.12)` : ''};
  }
  
  ${StyledIcon} {
    opacity: ${props => props.isActive ? .8 : .6};
  }

  &:hover ${StyledIcon} {
    opacity: .8;
  }
`;

const RounIcon1 = ({
  isActive,
  faClassName,
  ...rest
}) => {
  return (
    <StyledRoundIcon
      isActive={isActive}
      {...rest}>
      <StyledIcon faClassName={faClassName}/>
    </StyledRoundIcon>
  );
};

RounIcon1.defaultProps = {
  isActive: false,
  faClassName: ''
};

RounIcon1.propTypes = {
  isActive: PropTypes.bool,
  faClassName: PropTypes.string
};

export default RounIcon1;