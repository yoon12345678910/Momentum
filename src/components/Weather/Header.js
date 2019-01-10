import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  /* align-items: center; */
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const Header = ({
  children
}) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

Header.propTypes = {
  children: PropTypes.node
};

export default Header;