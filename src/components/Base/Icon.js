import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledIcon = styled.i`
  margin: 0 10px;
  opacity: .5;
`;

const Icon = ({
  faClassName,
  className,
  iconStyle,
  ...rest
}) => {
  return (
    <StyledIcon
      className={`${className} ${faClassName}`}
      aria-hidden="true"
      {...rest}
    />
  );
};

Icon.defaultProps = {
  faClassName: '',
};

Icon.propTypes = {
  faClassName: PropTypes.string,
};

export default Icon;