import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Content = styled.div`
  display: ${props => props.isVisible ? 'block' : 'none'};
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
  isVisible,
  className,
  children
}) => {
  return (
    <Content
      className={className}
      isVisible={isVisible}>
      {children}
    </Content>
  );
};

Popup.defaultProps = {
  isVisible: false,
  children: null
};

Popup.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node
};

export default Popup;