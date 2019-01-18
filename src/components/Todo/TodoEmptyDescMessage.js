import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const MessageBox = styled.div`
  margin-bottom: 16px;
  font-size: 87.5%;
  opacity: .45;
`;

const TodoEmptyDescMessage = ({
  message,
}) => {
  return (
    <MessageBox>{message}</MessageBox>
  );
};

TodoEmptyDescMessage.defaultProps = {
  message: ''
};

TodoEmptyDescMessage.propTypes = {
  message: PropTypes.string
};

export default TodoEmptyDescMessage;