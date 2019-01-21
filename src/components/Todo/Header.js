import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  position: relative;
  height: 47px;
`;

const ListRow = styled.div`
  display: flex;
  position: relative;
  height: 47px;
`;

const Header = ({
  innerRef,
  children
}) => {
  return (
    <Wrapper ref={innerRef}>
      <ListRow>
        {children}
      </ListRow>
    </Wrapper>
  );
};

Header.defaultProps = {
  innerRef: null,
  children: null
};

Header.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  children: PropTypes.element
};

export default Header;