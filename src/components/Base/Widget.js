import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledWidget = styled.div`
  display: inline-block;
  position: relative;
  transition: opacity .5s ease;
  user-select: none;
`;

const Widget = ({
  innerRef,
  className,
  children,
  ...rest
}) => {
  return (
    <StyledWidget
      ref={innerRef}
      className={className}
      {...rest}>
      {children}
    </StyledWidget>
  );
};

Widget.defaultProps = {
  innerRef: null,
  children: null
};

Widget.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  children: PropTypes.node
};

export default Widget;