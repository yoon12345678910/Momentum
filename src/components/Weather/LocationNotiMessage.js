import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Message = styled.span`
  margin-left: 10px;
  opacity: .5;
`;

const LocationNotiMessage = ({
  children
}) => {
  if (children === '') {
    return null;
  }
  return (
    <Message>{children}</Message>
  );
}

LocationNotiMessage.defaultProps = {
  children: ''
}

LocationNotiMessage.propTypes = {
  children: PropTypes.string
}

export default LocationNotiMessage;