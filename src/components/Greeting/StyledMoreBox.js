import React from 'react';
import PropTypes from 'prop-types';
import { MoreBox } from 'components/Base';


const StyledMoreBox = ({
  isActive,
  onClick,
  children
}) => {
  const roundStyle = { size: 30 };
  const iconStyle = { size: 20 };

  return (
    <MoreBox
      isActive={isActive}
      roundStyle={roundStyle}
      iconStyle={iconStyle}
      onClick={onClick}>
      {children}
    </MoreBox>
  );
};

export default StyledMoreBox;