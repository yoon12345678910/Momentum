import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Message = styled.span`
  margin-left: 10px;
  opacity: .5;
`;

const LocationMessage = ({
  children
}) => {
  if (children === '') {
    return null;
  }
  return (
    <Message>{children}</Message>
  );
}

LocationMessage.defaultProps = {
  children: ''
}

LocationMessage.propTypes = {
  children: PropTypes.string
}

export default LocationMessage;