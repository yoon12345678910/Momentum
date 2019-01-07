import React from 'react';
import { MoreBox as DefaultMoreBox } from 'components/Base';


const MoreBox = ({
  ...rest
}) => {
  const roundStyle = { size: 30 };
  const iconStyle = { size: 20 };

  return (
    <DefaultMoreBox
      {...rest}
      roundStyle={roundStyle}
      iconStyle={iconStyle}/>
  );
};

export default MoreBox;