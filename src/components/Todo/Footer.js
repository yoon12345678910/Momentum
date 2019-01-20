import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledFooter = styled.div`
  overflow: hidden;
  height: 41px;
`;

const Footer = ({
  innerRef,
  children
}) => {
  return (
    <StyledFooter ref={innerRef}>
      {children}
    </StyledFooter>
  );
};

Footer.defaultProps = {
  innerRef: null,
  children: null
};

Footer.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  children: PropTypes.element
};

export default Footer;