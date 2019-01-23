import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Content = styled.div`
  // display: block;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 200px;
  padding: 0;
  border-radius: 4px;
  box-sizing: border-box;
  background: rgba(15,15,15,.925);
  text-align: left;
  text-shadow: none;
  transition: all .15s ease;
`;

const Popup = ({
  className,
  children
}) => {
  return (
    <Content
      className={className}>
      {children}
    </Content>
  );
};

Popup.defaultProps = {
  children: null
};

Popup.propTypes = {
  children: PropTypes.node
};

export default Popup;